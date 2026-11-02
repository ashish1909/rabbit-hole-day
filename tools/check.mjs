#!/usr/bin/env node
// Checks the site before you deploy it.
//
//   node tools/check.mjs            check every hole and test every link
//   node tools/check.mjs --offline  check the holes only, skip the links
//
// Needs Node 18 or newer. Uses nothing outside Node itself.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const SITE = join(dirname(fileURLToPath(import.meta.url)), "..", "site");
const OFFLINE = process.argv.includes("--offline");
const KINDS = ["interactive", "film", "video", "article", "map", "photo", "website"];
const HOLE_KEYS = ["slug", "title", "teaser", "intro", "ending", "cover", "stops"];
const STOP_KEYS = ["title", "by", "kind", "minutes", "url", "hook", "tip", "thread", "keep", "image", "tunnels"];
const TUNNEL_KEYS = ["title", "by", "url", "note"];
const PICTURE_KEYS = ["src", "alt", "caption", "title", "credit", "license", "licenseUrl", "source"];
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const errors = [];
const warnings = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const warn = (where, message) => warnings.push(`${where}: ${message}`);

// ------------------------------------------------------------ load the holes

const files = readdirSync(join(SITE, "holes"))
  .filter((f) => f.endsWith(".js"))
  .sort();
const sandbox = { window: {} };
vm.createContext(sandbox);
const holes = []; // { file, hole }

for (const file of files) {
  const before = (sandbox.window.HOLES || []).length;
  try {
    vm.runInContext(readFileSync(join(SITE, "holes", file), "utf8"), sandbox, { filename: file });
  } catch (e) {
    fail(file, `could not run this file: ${e.message}`);
    continue;
  }
  const added = (sandbox.window.HOLES || []).slice(before);
  if (added.length === 0) fail(file, "doesn't add a hole to window.HOLES");
  for (const hole of added) holes.push({ file, hole });
}

// Every hole file needs a script tag, or the site never loads it.
const index = readFileSync(join(SITE, "index.html"), "utf8");
for (const file of files) {
  if (!index.includes(`src="holes/${file}"`)) {
    fail("index.html", `add <script src="holes/${file}"></script> next to the other hole scripts`);
  }
}
if (index.includes("YOUR-DOMAIN")) {
  warn("index.html", "og:image still says YOUR-DOMAIN. Put your real domain there so link previews show the image.");
}

// ------------------------------------------------------------ check fields

const isText = (v) => typeof v === "string" && v.trim().length > 0;
const slugs = new Map();

function unknownKeys(where, object, allowed) {
  for (const key of Object.keys(object)) {
    if (!allowed.includes(key)) warn(where, `unknown field "${key}" (typo?)`);
  }
}

function checkUrl(where, url, field = "url") {
  if (!isText(url)) return fail(where, `${field} is missing`);
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return fail(where, `${field} isn't a valid address: ${url}`);
  }
  if (parsed.protocol === "http:") warn(where, `${field} uses http, not https: ${url}`);
  else if (parsed.protocol !== "https:") fail(where, `${field} must start with https:// (${url})`);
}

// A picture needs its file, a description, and everything the credits line shows.
function checkPicture(where, picture) {
  if (!picture || typeof picture !== "object") return fail(where, "must be an object");
  unknownKeys(where, picture, PICTURE_KEYS);
  if (!isText(picture.src)) fail(where, "src is missing");
  else if (/^[a-z]+:/i.test(picture.src) || picture.src.startsWith("/")) {
    fail(where, `src should be a file in site/, like "img/photo.jpg" (got ${picture.src})`);
  } else if (!existsSync(join(SITE, picture.src))) {
    fail(where, `no file at site/${picture.src}`);
  }
  for (const key of ["alt", "caption", "title", "credit", "license"]) {
    if (!isText(picture[key])) fail(where, `${key} is missing`);
  }
  checkUrl(where, picture.source, "source");
  if (picture.licenseUrl !== undefined) checkUrl(where, picture.licenseUrl, "licenseUrl");
}

for (const { file, hole } of holes) {
  const where = `${file}`;
  if (!hole || typeof hole !== "object") {
    fail(where, "a hole must be an object");
    continue;
  }
  unknownKeys(where, hole, HOLE_KEYS);

  if (!isText(hole.slug) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(hole.slug)) {
    fail(where, "slug must be lowercase letters, numbers and single dashes");
  } else if (slugs.has(hole.slug)) {
    fail(where, `slug "${hole.slug}" is already used in ${slugs.get(hole.slug)}`);
  } else {
    slugs.set(hole.slug, file);
  }
  for (const key of ["title", "teaser", "intro"]) {
    if (!isText(hole[key])) fail(where, `${key} is missing`);
  }
  if (hole.ending !== undefined) {
    if (!isText(hole.ending)) fail(where, "ending must be text");
    else if (!hole.ending.includes("{start}") && !hole.ending.includes("{now}")) {
      warn(where, "ending has no {start} or {now}, so it won't show any times");
    }
  }
  if (hole.cover !== undefined) {
    checkPicture(`${where} cover`, hole.cover);
    // The list of holes shows a small copy of the cover.
    const thumb = isText(hole.cover.src) ? hole.cover.src.replace(/^img\//, "img/thumbs/") : null;
    if (thumb && thumb !== hole.cover.src && !existsSync(join(SITE, thumb))) {
      warn(`${where} cover`, `no small copy at site/${thumb}, so the list loads the full picture (see the README)`);
    }
  }
  if (!Array.isArray(hole.stops) || hole.stops.length === 0) {
    fail(where, "stops must be a list with at least one stop");
    continue;
  }
  if (hole.stops.length > 12) warn(where, `${hole.stops.length} stops is a lot; most holes feel right at 5 to 9`);

  hole.stops.forEach((stop, i) => {
    const at = `${file} stop ${i + 1}`;
    if (!stop || typeof stop !== "object") return fail(at, "a stop must be an object");
    unknownKeys(at, stop, STOP_KEYS);
    for (const key of ["title", "by", "hook"]) {
      if (!isText(stop[key])) fail(at, `${key} is missing`);
    }
    if (!KINDS.includes(stop.kind)) fail(at, `kind must be one of: ${KINDS.join(", ")}`);
    if (!Number.isInteger(stop.minutes) || stop.minutes < 1 || stop.minutes > 600) {
      fail(at, "minutes must be a whole number of minutes");
    }
    checkUrl(at, stop.url);
    for (const key of ["tip", "thread", "keep"]) {
      if (stop[key] !== undefined && !isText(stop[key])) fail(at, `${key} must be text`);
    }
    if (!isText(stop.thread)) warn(at, "no thread, so coming back from this stop has nothing to lead into the next one");
    if (!isText(stop.keep)) warn(at, "no keep, so this stop leaves nothing in the list at the bottom");
    if (stop.image !== undefined) checkPicture(`${at} image`, stop.image);
    if (stop.tunnels !== undefined) {
      if (!Array.isArray(stop.tunnels)) return fail(at, "tunnels must be a list");
      stop.tunnels.forEach((tunnel, j) => {
        const tat = `${at} tunnel ${j + 1}`;
        if (!tunnel || typeof tunnel !== "object") return fail(tat, "a tunnel must be an object");
        unknownKeys(tat, tunnel, TUNNEL_KEYS);
        if (!isText(tunnel.title)) fail(tat, "title is missing");
        checkUrl(tat, tunnel.url);
      });
    }
  });
}

// ------------------------------------------------------------ test the links

async function checkLink(url) {
  const signal = AbortSignal.timeout(20000);
  const youtube = url.match(/^https:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})/);
  try {
    if (youtube) {
      // YouTube answers 200 even for deleted videos, so ask its oEmbed endpoint instead.
      const res = await fetch(
        `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${youtube[1]}`)}`,
        { signal }
      );
      if (res.ok) {
        const info = await res.json();
        return { ok: true, note: `"${info.title}" by ${info.author_name}` };
      }
      if (res.status === 401 || res.status === 403) return { ok: true, warn: "video exists but YouTube restricts it" };
      return { ok: false, note: `YouTube says the video isn't available (${res.status})` };
    }
    const res = await fetch(url, {
      redirect: "follow",
      signal,
      headers: { "User-Agent": BROWSER_UA, Accept: "text/html,application/xhtml+xml,*/*;q=0.8" },
    });
    res.body?.cancel();
    if (res.ok) return { ok: true, note: res.redirected ? `redirects to ${res.url}` : "" };
    if ([401, 403, 429, 503].includes(res.status)) {
      return { ok: true, warn: `answered ${res.status}. Some sites block scripts like this one; open it in a browser to be sure` };
    }
    return { ok: false, note: `answered ${res.status}` };
  } catch (e) {
    return { ok: false, note: e.name === "TimeoutError" ? "timed out after 20s" : e.message };
  }
}

async function checkAllLinks() {
  const where = new Map();
  const add = (url, label) => {
    if (!isText(url)) return;
    if (!where.has(url)) where.set(url, []);
    where.get(url).push(label);
  };
  const addPicture = (picture, label) => {
    if (!picture) return;
    add(picture.source, `${label} source`);
    add(picture.licenseUrl, `${label} license`);
  };
  for (const { file, hole } of holes) {
    addPicture(hole.cover, `${file} cover`);
    (hole.stops || []).forEach((stop, i) => {
      add(stop && stop.url, `${file} stop ${i + 1}`);
      addPicture(stop && stop.image, `${file} stop ${i + 1} image`);
      ((stop && stop.tunnels) || []).forEach((t, j) => add(t && t.url, `${file} stop ${i + 1} tunnel ${j + 1}`));
    });
  }

  const urls = [...where.keys()];
  console.log(`Testing ${urls.length} links...`);
  let next = 0;
  async function worker() {
    while (next < urls.length) {
      const url = urls[next++];
      const result = await checkLink(url);
      const label = where.get(url)[0];
      if (!result.ok) {
        fail(label, `broken link ${url}: ${result.note}`);
        console.log(`  ✗ ${url}  ${result.note}`);
      } else if (result.warn) {
        warn(label, `${url} ${result.warn}`);
        console.log(`  ? ${url}  ${result.warn}`);
      } else {
        console.log(`  ✓ ${url}${result.note ? `  ${result.note}` : ""}`);
      }
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
}

// ------------------------------------------------------------ report

if (!OFFLINE && holes.length) await checkAllLinks();

console.log("");
console.log(`${holes.length} hole${holes.length === 1 ? "" : "s"} checked${OFFLINE ? " (links skipped)" : ""}.`);
for (const message of warnings) console.log(`warning  ${message}`);
for (const message of errors) console.log(`ERROR    ${message}`);
if (errors.length) {
  console.log(`\n${errors.length} error${errors.length === 1 ? "" : "s"}. Fix ${errors.length === 1 ? "it" : "them"} before you deploy.`);
  process.exit(1);
}
console.log(warnings.length ? "\nNo errors. Read the warnings above." : "\nAll good.");
