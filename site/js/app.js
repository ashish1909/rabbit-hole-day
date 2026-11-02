// Rabbit Hole Day
//
// Shows the latest rabbit hole as a notebook that fills in as you go: the
// route is inked in behind you, each stop records when you were there, and
// each one leaves a fact worth keeping. Progress lives in this browser's
// localStorage. There are no accounts.

(function () {
  "use strict";

  // Icons from Tabler Icons (MIT License), https://tabler.io/icons
  var ICONS = {
    out: '<path d="M17 7l-10 10"/><path d="M8 7l9 0l0 9"/>',
    down: '<path d="M12 5l0 14"/><path d="M18 13l-6 6"/><path d="M6 13l6 6"/>',
    check: '<path d="M5 12l5 5l10 -10"/>',
    link: '<path d="M9 15l6 -6"/><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"/><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"/>',
    share: '<path d="M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1"/><path d="M12 14v-11"/><path d="M9 6l3 -3l3 3"/>',
  };

  var KIND_NOUNS = {
    interactive: "interactive page",
    film: "film",
    video: "video",
    article: "article",
    map: "map",
    photo: "photo",
    website: "website",
  };

  // "Watch on youtube.com", "Visit info.cern.ch": say where the link goes.
  var KIND_ACTIONS = {
    interactive: "Explore on {host}",
    film: "Watch on {host}",
    video: "Watch on {host}",
    article: "Read on {host}",
    map: "Explore on {host}",
    photo: "See it on {host}",
    website: "Visit {host}",
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
  var dayTimeFormat = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  var els = {
    opening: document.getElementById("opening"),
    route: document.getElementById("route"),
    more: document.getElementById("more"),
    credits: document.getElementById("credits"),
    announce: document.getElementById("announce"),
  };

  var holes = (window.HOLES || []).filter(isUsable);
  var latest = pickLatest();
  var picked = pickFromUrl();
  var hole = picked.hole;

  var state = null;
  var showAll = false; // showing the stops ahead
  var away = null; // { i, at } while a stop is open in another tab
  var arriving = null; // the stop (or "bottom") that just came into view
  var returned = null; // the stop they just came back from

  init();

  // ------------------------------------------------------------ setup

  function init() {
    if (!hole) {
      els.opening.innerHTML =
        '<p class="notice">No rabbit holes found. Every file in holes/ needs a script tag in index.html.</p>';
      return;
    }

    state = load(hole.slug);

    // If the browser closed this tab to save memory while they were off
    // exploring, the page reloads when they come back. Treat that as a return.
    var visitedAt = state.visited[state.step];
    if (!state.finished && visitedAt && !state.back[state.step] && Date.now() - visitedAt > 1500) {
      state.back[state.step] = true;
      save();
    }

    if (picked.fromUrl) document.title = hole.title + " · Rabbit Hole Day";

    els.route.innerHTML =
      '<header class="route-head">' +
      '<h2 id="route-title">The route</h2>' +
      '<p class="route-progress"></p>' +
      "</header>" +
      '<div class="trail">' +
      '<div class="pencil" aria-hidden="true"></div>' +
      '<div class="ink still" aria-hidden="true"></div>' +
      '<ol class="stops"></ol>' +
      "</div>" +
      '<p class="route-tools"></p>';
    els.progress = els.route.querySelector(".route-progress");
    els.trail = els.route.querySelector(".trail");
    els.pencil = els.route.querySelector(".pencil");
    els.ink = els.route.querySelector(".ink");
    els.stops = els.route.querySelector(".stops");
    els.tools = els.route.querySelector(".route-tools");

    render();
    renderCredits();
    drawRoute(false);

    // Fonts and pictures change the page's height as they load; keep the route lined up.
    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        drawRoute(true);
      }).observe(els.stops);
    }
    window.addEventListener("load", function () {
      drawRoute(false);
    });

    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onAuxClick);
    document.addEventListener("visibilitychange", checkReturn);
    window.addEventListener("focus", checkReturn);
  }

  function isUsable(h) {
    return (
      !!h &&
      typeof h.slug === "string" &&
      typeof h.title === "string" &&
      Array.isArray(h.stops) &&
      h.stops.length > 0 &&
      h.stops.every(function (s) {
        return s && typeof s.title === "string" && typeof s.url === "string";
      })
    );
  }

  function dateOf(h) {
    return typeof h.date === "string" ? h.date : "0000-00-00";
  }

  function newestFirst(a, b) {
    return dateOf(b).localeCompare(dateOf(a));
  }

  function oldestFirst(a, b) {
    return dateOf(a).localeCompare(dateOf(b));
  }

  // The latest hole is the newest one whose date has arrived.
  function pickLatest() {
    var day = localDay(new Date());
    var live = holes
      .filter(function (h) {
        return dateOf(h) <= day;
      })
      .sort(newestFirst);
    return live[0] || holes.slice().sort(oldestFirst)[0] || null;
  }

  function pickFromUrl() {
    var wanted = null;
    try {
      wanted = new URLSearchParams(location.search).get("hole");
    } catch (e) {}
    if (!wanted) return { hole: latest, fromUrl: false, missing: false };
    var found = holes.find(function (h) {
      return h.slug === wanted;
    });
    if (found) return { hole: found, fromUrl: true, missing: false };
    return { hole: latest, fromUrl: false, missing: true };
  }

  // ------------------------------------------------------------ progress

  function storageKey(slug) {
    return "rhd:v1:" + slug;
  }

  function freshState() {
    return { started: null, step: 0, visited: {}, back: {}, finished: null };
  }

  function readStored(slug) {
    try {
      var raw = JSON.parse(localStorage.getItem(storageKey(slug)) || "null");
      return raw && typeof raw === "object" ? raw : null;
    } catch (e) {
      return null;
    }
  }

  function load(slug) {
    var raw = readStored(slug);
    var s = freshState();
    if (!raw) return s;
    var n = hole.stops.length;
    s.started = number(raw.started);
    s.step = Math.min(Math.max(parseInt(raw.step, 10) || 0, 0), n);
    s.visited = plainObject(raw.visited);
    s.back = plainObject(raw.back);
    if (s.step === n) s.finished = number(raw.finished) || s.started || Date.now();
    return s;
  }

  function save() {
    try {
      localStorage.setItem(storageKey(hole.slug), JSON.stringify(state));
    } catch (e) {
      // Private browsing or storage turned off: progress lasts until reload.
    }
  }

  function number(value) {
    return typeof value === "number" && isFinite(value) ? value : null;
  }

  function plainObject(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  }

  // ------------------------------------------------------------ rendering

  function render() {
    var focused = document.activeElement;
    var focusAct = focused && focused.dataset ? focused.dataset.act : null;
    var focusIndex = focused && focused.dataset ? focused.dataset.i : null;

    renderOpening();
    renderRoute();
    renderMore();
    arriving = null;
    returned = null;

    // Re-rendering replaced the button that had focus; put focus back on its twin.
    if (focusAct && document.activeElement === document.body) {
      var selector = '[data-act="' + focusAct + '"]' + (focusIndex != null ? '[data-i="' + focusIndex + '"]' : "");
      var twin = document.querySelector(selector);
      if (twin) twin.focus({ preventScroll: true });
    }
  }

  function renderOpening() {
    var cta = state.finished ? "See what you kept" : state.started ? "Carry on where you left off" : "Start at the first stop";
    var cover = hole.cover && hole.cover.src ? figureHtml(hole.cover, "cover", true) : "";

    els.opening.innerHTML =
      (picked.missing ? '<p class="notice">That rabbit hole doesn’t exist. Here’s the latest one.</p>' : "") +
      '<h1 id="hole-title">' +
      esc(hole.title) +
      "</h1>" +
      '<div class="opening-text">' +
      (hole.teaser ? '<p class="lede">' + esc(hole.teaser) + "</p>" : "") +
      (hole.intro ? '<p class="intro">' + esc(hole.intro) + "</p>" : "") +
      '<p class="how">Open each stop in a new tab and get lost in it. When you come back, the next one will be waiting, and this page keeps a note of where you’ve been. ' +
      esc(capitalize(about(totalMinutes(hole)))) +
      " in all.</p>" +
      '<p class="actions"><a class="button" href="#route" data-act="begin">' +
      esc(cta) +
      " " +
      icon("down") +
      "</a></p>" +
      "</div>" +
      cover;
    els.opening.classList.toggle("has-cover", !!cover);
  }

  function renderRoute() {
    var n = hole.stops.length;
    var visited = state.finished ? n : state.step;
    els.progress.textContent = state.finished
      ? "You’ve been to all " + n + " stops."
      : visited
        ? "You’ve been to " + visited + " of " + n + " stops."
        : n + " stops, " + about(totalMinutes(hole)) + ".";

    var open = [];
    els.stops.querySelectorAll("details[open]").forEach(function (d) {
      var li = d.closest("li");
      if (li && li.id) open.push(li.id);
    });

    els.stops.innerHTML = hole.stops.map(stopHtml).join("") + bottomHtml();

    open.forEach(function (id) {
      var li = document.getElementById(id);
      var details = li && li.querySelector("details");
      if (details) details.open = true;
    });

    var tools = [];
    if (!state.finished) {
      tools.push(
        '<button type="button" class="text-button" data-act="spoil" aria-pressed="' +
          showAll +
          '">' +
          (showAll ? "Hide the stops ahead" : "Show the whole route") +
          "</button>"
      );
    }
    if (state.started) tools.push('<button type="button" class="text-button" data-act="reset">Start over</button>');
    els.tools.innerHTML = tools.join("");
    els.tools.hidden = !tools.length;
  }

  function stopHtml(s, i) {
    var side = i % 2 === 0 ? "left" : "right";
    var id = "stop-" + (i + 1);
    var kind = kindOf(s);

    if (i < state.step) {
      var visitedAt = state.visited[i];
      return (
        '<li class="stop done ' +
        side +
        '" id="' +
        id +
        '">' +
        '<span class="node" aria-hidden="true">' +
        icon("check", 3) +
        "</span>" +
        '<div class="entry">' +
        (visitedAt ? '<p class="meta">You were here at ' + esc(clock(visitedAt, isOtherDay(visitedAt))) + ".</p>" : "") +
        '<h3 class="entry-title"><span class="visually-hidden">Visited: </span>' +
        esc(s.title) +
        "</h3>" +
        (s.keep ? '<p class="kept">' + esc(s.keep) + "</p>" : "") +
        (s.image && s.image.src ? figureHtml(s.image, "thumb", false) : "") +
        doneDetailsHtml(s, i) +
        "</div>" +
        "</li>"
      );
    }

    var current = i === state.step && !state.finished;

    if (!current && !showAll) {
      return (
        '<li class="stop ahead ' +
        side +
        '" id="' +
        id +
        '">' +
        '<span class="node" aria-hidden="true"></span>' +
        '<div class="entry"><p class="meta"><span class="visually-hidden">A stop still ahead: </span>' +
        esc(lengthPhrase(s)) +
        ".</p></div>" +
        "</li>"
      );
    }

    if (!current) {
      // A stop further down, shown because they asked to see the whole route.
      return (
        '<li class="stop ahead peek ' +
        side +
        '" id="' +
        id +
        '">' +
        '<span class="node" aria-hidden="true"></span>' +
        '<div class="entry">' +
        '<p class="meta">' +
        esc(aboutStop(s)) +
        "</p>" +
        '<h3 class="entry-title"><a href="' +
        safeUrl(s.url) +
        '" target="_blank" rel="noopener">' +
        esc(s.title) +
        '<span class="visually-hidden"> (opens in a new tab)</span></a></h3>' +
        (s.hook ? '<p class="peek-hook">' + esc(s.hook) + "</p>" : "") +
        "</div>" +
        "</li>"
      );
    }

    var back = !!state.back[i];
    var last = i === hole.stops.length - 1;
    var nextLabel = last ? "Go to the bottom" : "Next stop";
    var nextButton = function (cls) {
      return (
        '<button type="button" class="' +
        cls +
        '" data-act="next" data-i="' +
        i +
        '">' +
        nextLabel +
        " " +
        icon("down") +
        "</button>"
      );
    };

    var body;
    var actions;
    if (back) {
      var visitedAt2 = state.visited[i];
      body =
        (visitedAt2 ? '<p class="meta">You were here at ' + esc(clock(visitedAt2, isOtherDay(visitedAt2))) + ".</p>" : "") +
        '<h3 class="entry-title" tabindex="-1"><span class="visually-hidden">Current stop: </span>' +
        esc(s.title) +
        "</h3>" +
        '<p class="welcome"><strong>Welcome back.</strong>' +
        (s.thread ? " " + esc(s.thread) : "") +
        "</p>" +
        (s.keep
          ? '<div class="keep">' +
            '<p class="keep-label">Worth keeping</p>' +
            '<p class="keep-text">' +
            esc(s.keep) +
            "</p>" +
            (s.image && s.image.src ? figureHtml(s.image, "", false) : "") +
            "</div>"
          : "");
      actions = nextButton("button") + goLink(s, i, "button quiet", "Open it again");
    } else {
      body =
        '<p class="meta">' +
        esc(aboutStop(s)) +
        "</p>" +
        '<h3 class="entry-title" tabindex="-1"><span class="visually-hidden">Current stop: </span>' +
        esc(s.title) +
        "</h3>" +
        (s.hook ? "<p>" + esc(s.hook) + "</p>" : "") +
        (s.tip ? '<p class="try"><strong>Try this:</strong> ' + esc(s.tip) + "</p>" : "");
      actions = goLink(s, i, "button", KIND_ACTIONS[kind].replace("{host}", hostOf(s.url))) + nextButton("button quiet");
    }

    return (
      '<li class="stop current ' +
      side +
      (arriving === i ? " arriving" : "") +
      (returned === i ? " returned" : "") +
      '" id="' +
      id +
      '" aria-current="step">' +
      '<span class="node" aria-hidden="true"></span>' +
      '<div class="entry sheet">' +
      body +
      '<p class="actions">' +
      actions +
      "</p>" +
      (back ? tunnelsHtml(s) : "") +
      "</div>" +
      "</li>"
    );
  }

  function doneDetailsHtml(s, i) {
    var tunnels = Array.isArray(s.tunnels)
      ? s.tunnels.filter(function (t) {
          return t && t.title && t.url;
        })
      : [];
    return (
      "<details>" +
      "<summary>Open it again" +
      (tunnels.length ? ", or go deeper" : "") +
      "</summary>" +
      "<ul>" +
      "<li>" +
      goLink(s, i, "", s.title) +
      "</li>" +
      tunnels
        .map(function (t) {
          return "<li>" + tunnelLink(t) + "</li>";
        })
        .join("") +
      "</ul>" +
      "</details>"
    );
  }

  function bottomHtml() {
    if (!state.finished) {
      return (
        '<li class="stop bottom ahead" id="bottom">' +
        '<span class="node" aria-hidden="true"></span>' +
        '<div class="entry"><p class="meta">At the bottom: everything you kept, in one place.</p></div>' +
        "</li>"
      );
    }

    var start = state.started || state.finished;
    var end = state.finished;
    var withDay = end - start > 18 * 60 * 60 * 1000;
    var share = canShare();
    var kept = hole.stops.filter(function (s) {
      return s.keep;
    });

    return (
      '<li class="stop bottom done' +
      (arriving === "bottom" ? " arriving" : "") +
      '" id="bottom">' +
      '<span class="node" aria-hidden="true">' +
      icon("check", 3) +
      "</span>" +
      '<div class="entry sheet ending">' +
      '<h3 tabindex="-1">You made it to the bottom.</h3>' +
      '<p class="ending-line">' +
      esc(endingLine(start, end, withDay)) +
      "</p>" +
      '<p class="meta">' +
      hole.stops.length +
      " stops in " +
      esc(duration(end - start)) +
      ".</p>" +
      (kept.length
        ? "<h4>What you kept</h4>" +
          '<ol class="kept-list">' +
          kept
            .map(function (s) {
              return (
                "<li>" +
                icon("check", 2.5) +
                "<p>" +
                '<span class="kept-from">' +
                esc(s.title) +
                "</span>" +
                esc(s.keep) +
                "</p>" +
                "</li>"
              );
            })
            .join("") +
          "</ol>"
        : "") +
      '<p class="actions">' +
      (share
        ? '<button type="button" class="button" data-act="share">' + icon("share") + " Share this rabbit hole</button>"
        : "") +
      '<button type="button" class="button' +
      (share ? " quiet" : "") +
      '" data-act="copy">' +
      icon("link") +
      " Copy link</button>" +
      "</p>" +
      '<p class="status" role="status"></p>' +
      "</div>" +
      "</li>"
    );
  }

  function renderMore() {
    var day = localDay(new Date());
    var others = holes
      .filter(function (h) {
        return h !== hole && dateOf(h) <= day;
      })
      .sort(newestFirst);

    if (!others.length) {
      els.more.hidden = true;
      els.more.innerHTML = "";
      return;
    }

    els.more.hidden = false;
    els.more.innerHTML =
      "<h2>More rabbit holes</h2>" +
      "<ul>" +
      others
        .map(function (h) {
          var stored = readStored(h.slug);
          return (
            '<li><a href="?hole=' +
            encodeURIComponent(h.slug) +
            '">' +
            esc(h.title) +
            "</a>" +
            '<p class="meta">' +
            esc(h.teaser || h.stops.length + " stops.") +
            (stored && stored.finished ? " You made it to the bottom." : "") +
            "</p>" +
            "</li>"
          );
        })
        .join("") +
      "</ul>";
  }

  function renderCredits() {
    var pictures = [];
    if (hole.cover && hole.cover.src) pictures.push(hole.cover);
    hole.stops.forEach(function (s) {
      if (s.image && s.image.src) pictures.push(s.image);
    });
    if (!pictures.length) {
      els.credits.innerHTML = "";
      return;
    }
    els.credits.innerHTML =
      "<p>Pictures: " +
      pictures
        .map(function (p) {
          var license = p.licenseUrl
            ? '<a href="' + safeUrl(p.licenseUrl) + '" rel="license">' + esc(p.license) + "</a>"
            : esc(p.license || "");
          return (
            (p.source ? '<a href="' + safeUrl(p.source) + '">' + esc(p.title || "Picture") + "</a>" : esc(p.title || "Picture")) +
            (p.credit ? " by " + esc(p.credit) : "") +
            (license ? ", " + license : "")
          );
        })
        .join("; ") +
      ".</p>";
  }

  function figureHtml(p, cls, eager) {
    return (
      "<figure" +
      (cls ? ' class="' + cls + '"' : "") +
      ">" +
      '<img src="' +
      esc(p.src) +
      '" alt="' +
      esc(p.alt || "") +
      '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') +
      ' decoding="async">' +
      // A thumbnail's caption was already read on the stop's card.
      (p.caption && cls !== "thumb"
        ? "<figcaption>" + esc(p.caption) + (p.credit ? '<span class="credit">' + esc(p.credit) + "</span>" : "") + "</figcaption>"
        : "") +
      "</figure>"
    );
  }

  function goLink(s, i, cls, label) {
    return (
      "<a" +
      (cls ? ' class="' + cls + '"' : "") +
      ' href="' +
      safeUrl(s.url) +
      '" target="_blank" rel="noopener" data-act="go" data-i="' +
      i +
      '">' +
      (cls ? icon("out") + " " : "") +
      esc(label) +
      '<span class="visually-hidden"> (opens in a new tab)</span></a>'
    );
  }

  function tunnelLink(t) {
    return (
      '<a href="' +
      safeUrl(t.url) +
      '" target="_blank" rel="noopener">' +
      esc(t.title) +
      '<span class="visually-hidden"> (opens in a new tab)</span></a>' +
      (t.by ? " (" + esc(t.by) + ")" : "") +
      (t.note ? '<span class="note">' + esc(t.note) + "</span>" : "")
    );
  }

  function tunnelsHtml(s) {
    var list = Array.isArray(s.tunnels)
      ? s.tunnels.filter(function (t) {
          return t && t.title && t.url;
        })
      : [];
    if (!list.length) return "";
    return (
      '<div class="deeper">' +
      '<p class="keep-label">Go deeper here</p>' +
      "<ul>" +
      list
        .map(function (t) {
          return "<li>" + tunnelLink(t) + "</li>";
        })
        .join("") +
      "</ul>" +
      "</div>"
    );
  }

  function icon(name, stroke) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      (stroke || 2) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      ICONS[name] +
      "</svg>"
    );
  }

  function kindOf(s) {
    return KIND_NOUNS[s.kind] ? s.kind : "article";
  }

  // "A 9-minute film", "An 8-minute video", "An interactive page".
  function lengthPhrase(s) {
    var noun = KIND_NOUNS[kindOf(s)];
    if (!s.minutes) return (/^[aeiou]/.test(noun) ? "An " : "A ") + noun;
    return (/^(8|11|18)/.test(String(s.minutes)) ? "An " : "A ") + s.minutes + "-minute " + noun;
  }

  function aboutStop(s) {
    return lengthPhrase(s) + (s.by ? " from " + s.by : "") + ".";
  }

  // ------------------------------------------------------------ the inked route

  function drawRoute(animate) {
    var nodes = els.stops.querySelectorAll(".node");
    if (!nodes.length) return;
    var base = els.trail.getBoundingClientRect().top;
    var centerOf = function (node) {
      var r = node.getBoundingClientRect();
      return r.top + r.height / 2 - base;
    };
    var first = centerOf(nodes[0]);
    var last = centerOf(nodes[nodes.length - 1]);
    var reached = state.finished
      ? last
      : state.started
        ? centerOf(els.stops.querySelector(".current .node") || nodes[0])
        : first;

    els.pencil.style.top = first + "px";
    els.pencil.style.height = Math.max(0, last - first) + "px";
    els.ink.style.top = first + "px";
    if (!animate || reduceMotion.matches) els.ink.classList.add("still");
    els.ink.style.height = Math.max(0, reached - first) + "px";
    if (!animate || reduceMotion.matches) {
      void els.ink.offsetHeight;
      els.ink.classList.remove("still");
    }
  }

  // ------------------------------------------------------------ actions

  function onClick(e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var i = Number(el.dataset.i);
    switch (el.dataset.act) {
      case "go":
        wentTo(i); // the link itself opens the new tab
        break;
      case "begin":
        e.preventDefault();
        begin();
        break;
      case "next":
        next(i);
        break;
      case "spoil":
        showAll = !showAll;
        render();
        drawRoute(false);
        break;
      case "reset":
        startOver(el);
        break;
      case "share":
        share();
        break;
      case "copy":
        copyLink();
        break;
    }
  }

  // Middle-click opens a tab without firing "click".
  function onAuxClick(e) {
    if (e.button !== 1) return;
    var el = e.target.closest('[data-act="go"]');
    if (el) wentTo(Number(el.dataset.i));
  }

  function begin() {
    var target = state.finished
      ? document.getElementById("bottom")
      : document.getElementById("stop-" + (state.step + 1));
    if (!target) return;
    target.scrollIntoView({ block: "center", behavior: scrollBehavior() });
    var heading = target.querySelector('[tabindex="-1"]');
    if (heading) heading.focus({ preventScroll: true });
  }

  function wentTo(i) {
    if (!hole.stops[i]) return;
    var now = Date.now();
    if (!state.started) state.started = now;
    state.visited[i] = now;
    away = { i: i, at: now };
    save();
    // Let the browser finish opening the link before the page changes under it.
    setTimeout(function () {
      render();
      drawRoute(true);
    }, 0);
  }

  function checkReturn() {
    if (!away || document.visibilityState !== "visible") return;
    if (Date.now() - away.at < 1500) return;
    var i = away.i;
    away = null;
    if (state.finished || i !== state.step || state.back[i]) return;

    state.back[i] = true;
    save();
    returned = i;
    render();
    drawRoute(true);
    announce("Welcome back from " + hole.stops[i].title + ".");

    var li = document.getElementById("stop-" + (i + 1));
    if (!li) return;
    showIfHidden(li, "auto");
    var nextButton = li.querySelector('[data-act="next"]');
    if (nextButton) nextButton.focus({ preventScroll: true });
  }

  function next(i) {
    if (state.finished || i !== state.step) return;
    var n = hole.stops.length;
    var now = Date.now();
    if (!state.started) state.started = now;
    state.step = i + 1;
    if (state.step >= n) {
      state.step = n;
      state.finished = now;
    }
    save();

    arriving = state.finished ? "bottom" : state.step;
    render();
    drawRoute(true);

    var target = state.finished ? document.getElementById("bottom") : document.getElementById("stop-" + (state.step + 1));
    if (!target) return;
    showIfHidden(target, scrollBehavior());
    var heading = target.querySelector('[tabindex="-1"]');
    if (heading) heading.focus({ preventScroll: true });
    announce(state.finished ? "You made it to the bottom." : "Next stop: " + hole.stops[state.step].title);
  }

  function startOver(button) {
    if (button.dataset.armed !== "yes") {
      button.dataset.armed = "yes";
      button.textContent = "Sure? Click again to start over";
      setTimeout(function () {
        if (button.isConnected) {
          button.dataset.armed = "";
          button.textContent = "Start over";
        }
      }, 4000);
      return;
    }
    state = freshState();
    away = null;
    showAll = false;
    save();
    render();
    drawRoute(true);
    els.route.scrollIntoView({ block: "start", behavior: scrollBehavior() });
    els.route.focus({ preventScroll: true });
    announce("Back at the start.");
  }

  // Scroll only when the element's top isn't comfortably on screen.
  function showIfHidden(el, behavior) {
    var top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.65) el.scrollIntoView({ block: "start", behavior: behavior });
  }

  function scrollBehavior() {
    return reduceMotion.matches ? "auto" : "smooth";
  }

  // ------------------------------------------------------------ sharing

  function canShare() {
    return typeof navigator.share === "function";
  }

  function shareUrl() {
    var url = new URL(location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("hole", hole.slug);
    return url.href;
  }

  function share() {
    navigator
      .share({
        title: hole.title,
        text: "I fell down a rabbit hole: " + hole.title + " " + (hole.teaser || ""),
        url: shareUrl(),
      })
      .catch(function () {
        // They closed the share sheet.
      });
  }

  function copyLink() {
    var url = shareUrl();
    var done = function (ok) {
      setStatus(ok ? "Link copied." : "Copy this link: " + url);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () {
          done(true);
        },
        function () {
          done(legacyCopy(url));
        }
      );
    } else {
      done(legacyCopy(url));
    }
  }

  function legacyCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.className = "visually-hidden";
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {}
    field.remove();
    return ok;
  }

  function setStatus(message) {
    var status = els.route.querySelector(".status");
    if (status) status.textContent = message;
  }

  function announce(message) {
    els.announce.textContent = "";
    setTimeout(function () {
      els.announce.textContent = message;
    }, 60);
  }

  // ------------------------------------------------------------ text

  function endingLine(start, end, withDay) {
    var template = hole.ending || "You started at {start} and reached the bottom at {now}.";
    return template.split("{start}").join(clock(start, withDay)).split("{now}").join(clock(end, withDay));
  }

  function clock(ms, withDay) {
    return (withDay ? dayTimeFormat : timeFormat).format(new Date(ms));
  }

  function isOtherDay(ms) {
    return localDay(new Date(ms)) !== localDay(new Date());
  }

  function duration(ms) {
    var minutes = Math.round(ms / 60000);
    if (minutes < 1) return "under a minute";
    if (minutes < 60) return minutes + " min";
    var hours = Math.floor(minutes / 60);
    var rest = minutes % 60;
    if (hours < 24) return hours + " hr" + (rest ? " " + rest + " min" : "");
    var days = Math.round(hours / 24);
    return days === 1 ? "1 day" : days + " days";
  }

  function totalMinutes(h) {
    return h.stops.reduce(function (sum, s) {
      return sum + (typeof s.minutes === "number" ? s.minutes : 0);
    }, 0);
  }

  function about(minutes) {
    var rounded = Math.max(5, Math.round(minutes / 5) * 5);
    if (rounded < 60) return "about " + rounded + " minutes";
    var hours = Math.floor(rounded / 60);
    var rest = rounded % 60;
    return "about " + (hours === 1 ? "an hour" : hours + " hours") + (rest ? " and " + rest + " minutes" : "");
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function localDay(date) {
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + m + "-" + d;
  }

  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "").replace(/^[a-z]{2}\.(wikipedia\.org)$/, "$1");
    } catch (e) {
      return "the web";
    }
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function safeUrl(value) {
    try {
      var url = new URL(value);
      if (url.protocol === "https:" || url.protocol === "http:") return esc(url.href);
    } catch (e) {}
    return "#";
  }
})();
