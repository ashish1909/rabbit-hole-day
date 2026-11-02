# Rabbit Hole Day

The internet is still wonderful. Find something worth getting lost in.

Each rabbit hole is a short route through real pages on the web. You open a stop in a new tab, get lost there, and when you come back the next stop is waiting. The page works like an explorer's notebook: the route is inked in behind you, each stop notes the time you were there, and each one leaves a fact worth keeping. At the bottom you get everything you kept in one list. Progress stays in your own browser. There are no accounts.

It's a plain static site: HTML, CSS and a little JavaScript. No build step, no framework, no server code, nothing to install.

## What's in here

```
site/                     the website; this folder is what you deploy
  index.html              the page
  404.html                shown for addresses that don't exist
  _headers                security headers (Cloudflare Workers reads this file)
  favicon.ico             browser tab icon for browsers that want an .ico
  css/style.css           the whole look: paper, ink, type, layout
  js/app.js               picks a hole, inks the route, remembers progress, lists the rest
  holes/                  one file per rabbit hole
  img/                    photographs, icons and the link-preview image
    thumbs/               small copies of the cover pictures, for the list
tools/
  check.mjs               checks every hole, picture and link before you deploy
  share-image.html        redraws og.png, apple-touch-icon.png and favicon.ico
```

## Look at it on your computer

Double-click `site/index.html`. That's it.

Or run it from a local server, which is closer to how it behaves online:

```bash
python3 -m http.server 8000 --directory site
```

Then open http://localhost:8000.

## Add a rabbit hole

1. Copy `site/holes/how-big-is-the-universe.js` to `site/holes/<your-slug>.js`. The comment at the top of that file explains every field.
2. Rewrite everything in the copy: slug, title, stops, and a `keep` fact for each stop.
3. In `site/index.html`, add `<script src="holes/<your-slug>.js"></script>` next to the other hole scripts, above the one for `js/app.js`. Their order doesn't matter.
4. Run the checker (below).
5. Commit and push to `main`. Once Workers Builds is connected (below), Cloudflare deploys the update automatically.

Every hole is live after its push to `main` deploys successfully. The front page picks one at random on every visit, preferring holes the visitor hasn't started and never showing the same one twice in a row, and puts its address in the address bar. The rest are listed below it as cards with their cover pictures: holes the visitor is partway through first, then the new ones in a random order, then the ones they've finished. Any hole can be opened directly at `/?hole=<your-slug>`.

A good hole: 5 to 9 stops, each one bigger or stranger than the last, a mix of kinds (an interactive, a film, an article, a map), a `thread` on every stop that makes people want the next one, and a `keep` fact that's worth remembering on its own. Write it in your own voice.

### Pictures

A hole can have a `cover` picture beside its title, and any stop can have an `image` that appears with its fact when people come back. Only use pictures you're allowed to use: public domain (most NASA images), or a Creative Commons license whose terms you follow. Put the file in `site/img/`, keep it under about 300 KB, and fill in the credit fields; the footer lists every picture on the page with its credit and license automatically, folded under "Picture credits".

A cover is shown square beside the title, so crop it square. The list of holes uses a small copy of each cover from `site/img/thumbs/`, with the same file name. On a Mac, make one with:

```bash
sips -s format jpeg -s formatOptions 68 -z 480 480 site/img/<cover>.jpg --out site/img/thumbs/<cover>.jpg
```

If the small copy is missing, the list falls back to the full picture and the checker warns you.

The four pictures in the universe hole (`how-big-is-the-universe.js`) come from Wikimedia Commons:

- Hubble Ultra Deep Field: NASA and ESA, public domain.
- Hubble Deep Field: R. Williams (STScI), the Hubble Deep Field Team and NASA, public domain.
- Pale Blue Dot Revisited: NASA/JPL-Caltech, free to use with that credit.
- Observable universe logarithmic illustration: Unmismoobjetivo, CC BY-SA 3.0, which requires the credit and license link shown in the footer.

## Check before you deploy

```bash
node tools/check.mjs
```

It needs Node 18 or newer. It catches missing fields, typos in field names, duplicate slugs, hole files without a script tag, picture files that don't exist or lack credits, and dead links. A few sites (neal.fun, for example) block automated checks; those show up as warnings, not errors, so open them in a browser to be sure. Run it again every few weeks: links die.

Use `node tools/check.mjs --offline` to skip the link test.

## Deploy with Cloudflare Workers

The site deploys to Cloudflare Workers through **Workers Builds** on every push to `main`, once this GitHub repository is connected in Cloudflare. Wrangler reads the repository's `wrangler.jsonc` and uploads `site/` as static assets. There is no build step or Worker script. Missing pages use `site/404.html`, and Workers applies the security headers in `site/_headers` to static asset responses.

1. In the Cloudflare dashboard, go to **Workers & Pages**, create a Worker, and connect this GitHub repository using Workers Builds. Grant Cloudflare access to this repository.
2. Set the Worker name to `rabbit-hole-day`, matching `wrangler.jsonc`.
3. Set the production branch to `main` and the root directory to the repository root (where `wrangler.jsonc` lives).
4. Leave the build command blank and set the deploy command to `npx -y wrangler@latest deploy`.
5. Save and deploy. Subsequent pushes to `main` deploy automatically. For an existing Worker, manage the repository connection and build settings under **Settings > Build**.

These settings are managed in Cloudflare; adding `wrangler.jsonc` alone does not connect GitHub or enable automatic deployments. See the [Workers Builds configuration documentation](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).

Validate locally without deploying:

```bash
node tools/check.mjs --offline
npx -y wrangler@latest deploy --dry-run
```

### Your domain

In the `rabbit-hole-day` Worker, open **Settings > Domains & Routes**, add a **Custom Domain**, and enter `rabbithole.day`. Manage the domain and DNS in Cloudflare; routes and custom domains are intentionally absent from `wrangler.jsonc`.

The production origin is `https://rabbithole.day`. URL audit:

- Canonical URL: no canonical tag is currently present.
- `og:url`: no tag is currently present.
- Sitemap URLs: no sitemap is currently present.
- Robots URLs: no `robots.txt` is currently present. `site/404.html` has a `noindex` robots meta tag, which contains no URL.
- `og:image`: `https://rabbithole.day/img/og.png` in `site/index.html` is already correct.

No existing URLs needed correction. If these metadata tags or files are added later, use `https://rabbithole.day` as their origin.

## Change the look

- Colors, type sizes and spacing are at the top of `site/css/style.css`.
- The typeface is Literata, loaded from Google Fonts. It was designed for reading books on screens.
- Icons are from Tabler Icons (MIT License).
- The link-preview image and icons are drawn by `tools/share-image.html`. Open it in a browser, edit the text in the file if you want, and download the images to where each button says.
