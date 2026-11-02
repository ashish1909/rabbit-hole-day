// A rabbit hole. See how-big-is-the-universe.js for what every field means.

(window.HOLES = window.HOLES || []).push({
  slug: "is-the-old-internet-still-out-there",
  date: "2026-10-31",
  title: "Is the old internet still out there?",
  teaser: "Seven stops through the web’s attic, starting with the very first website.",
  intro:
    "Tim Berners-Lee invented the web in 1989, and a surprising amount of its early years is still online if you know where to look. This hole goes looking.",
  ending: "You started at the first website at {start}. It’s {now}, and the old web is still out there.",
  stops: [
    {
      title: "The first website",
      by: "CERN",
      kind: "website",
      minutes: 5,
      url: "https://info.cern.ch/",
      hook:
        "Tim Berners-Lee invented the World Wide Web at CERN in 1989, and wrote the first web server and the first browser on a NeXT computer. CERN keeps the first website online at info.cern.ch. It’s just text and links, and it still works.",
      tip: "Browse it once as it is, then again with the line-mode browser simulator.",
      thread: "A few years later, movie studios were building websites too. Next: one from 1996 that’s still online.",
      keep: "The web was invented at CERN in 1989, and the first website is still online at info.cern.ch.",
      tunnels: [
        {
          title: "History of the World Wide Web",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/History_of_the_World_Wide_Web",
          note: "How it went from one computer at CERN to everywhere.",
        },
      ],
    },
    {
      title: "Space Jam, 1996",
      by: "Warner Bros.",
      kind: "website",
      minutes: 5,
      url: "https://www.spacejam.com/1996/",
      hook:
        "The official website for the 1996 movie Space Jam, still looking the way it did in 1996. When the sequel took over spacejam.com in 2021, Warner Bros. moved the original here instead of deleting it.",
      thread:
        "Some old sites survive because someone forgot to delete them, and some because someone decided not to. Next: a page that was meant to last forever.",
      keep: "The 1996 Space Jam website has stayed online, nearly unchanged, for about 30 years. It now lives at spacejam.com/1996.",
    },
    {
      title: "The Million Dollar Homepage",
      by: "Alex Tew",
      kind: "website",
      minutes: 5,
      url: "https://milliondollarhomepage.com/",
      hook:
        "In August 2005, a 21-year-old student named Alex Tew sold a million pixels for $1 each to pay for university. Advertisers bought them in 10 × 10 blocks, and the last 1,000 went on eBay for $38,100. The page is still up. Many of its links aren’t.",
      tip: "Hover over the tiny ads, then try a few and see where they lead now.",
      thread:
        "Links die quietly, one at a time. Next: what happened when a whole neighborhood of the web was switched off at once.",
      keep: "A count of the Million Dollar Homepage’s 2,816 original links found 547 dead and 489 pointing somewhere else.",
      tunnels: [
        {
          title: "Link rot",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Link_rot",
          note: "Why links stop working, and what people do about it.",
        },
      ],
    },
    {
      title: "GeoCities",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/GeoCities",
      hook:
        "From 1994, GeoCities let anyone build a homepage for free, sorted into themed neighborhoods. Yahoo bought it in 1999 for $3.57 billion, when it was reportedly the third most visited site on the web, and shut it down in the US in October 2009.",
      thread:
        "Volunteers from a group called Archive Team saved as much of it as they could. Next: what one person built from the pieces.",
      keep: "When GeoCities closed in the US in 2009, at least 38 million pages were on it. Its Japanese version lasted until 2019.",
      tunnels: [
        {
          title: "Archive Team",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Archive_Team",
          note: "The volunteers who copy websites before they disappear, co-founded by Jason Scott in 2009.",
        },
      ],
    },
    {
      title: "Cameron’s World",
      by: "Cameron Askin",
      kind: "website",
      minutes: 5,
      url: "https://www.cameronsworld.net/",
      hook:
        "One long page collaged from text and images dug out of archived GeoCities sites, collected and assembled by Cameron Askin. Every scrap of it was once part of somebody’s homepage.",
      tip: "Scroll slowly, and click whatever catches your eye.",
      thread: "Collages like this exist because someone saved the originals. Next: the machine that saves almost everything.",
      keep: "Many scraps in Cameron’s World link back to the GeoCities pages they came from, saved in the Wayback Machine.",
    },
    {
      title: "The Wayback Machine",
      by: "the Internet Archive",
      kind: "website",
      minutes: 10,
      url: "https://web.archive.org/",
      hook:
        "Type in any website you remember and pick a date. The Internet Archive has been saving copies of the web since 1996, and opened them to everyone in 2001.",
      tip: "Look up the first website you ever loved, in the year you loved it.",
      thread: "The web you remember isn’t gone; a lot of it is filed away. Next: the parts that are still alive.",
      keep: "The Internet Archive has been saving the web since 1996. In 2025, the Wayback Machine passed one trillion saved pages.",
      tunnels: [
        {
          title: "Wayback Machine",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Wayback_Machine",
          note: "How it started, and how it works.",
        },
      ],
    },
    {
      title: "Wiby",
      by: "wiby.me",
      kind: "website",
      minutes: 10,
      url: "https://wiby.me/",
      hook:
        "A search engine for the web as it was in its earlier days: small, personal pages about whatever their makers loved, light enough to load on old computers.",
      tip: "Press “surprise me...” a few times.",
      thread: "That’s the bottom of this hole. The old web is still out there; you just have to go looking for it.",
      keep: "Wiby is a search engine for the web as it was in its earlier days: small personal pages, light enough for old computers.",
    },
  ],
});
