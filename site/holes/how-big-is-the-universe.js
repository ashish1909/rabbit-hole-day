// One rabbit hole.
//
// To add another: copy this file to holes/<your-slug>.js, rewrite everything,
// and add <script src="holes/<your-slug>.js"></script> to index.html next to
// the one for this file. Then run `node tools/check.mjs` to catch mistakes
// and dead links.
//
// Hole fields
//   slug     Its address: /?hole=<slug>. Lowercase letters, numbers, dashes.
//   date     YYYY-MM-DD. The newest hole whose date has arrived is the one
//            on the front page.
//   title    The question or idea the hole is about.
//   teaser   One line under the title.
//   intro    A few sentences before the first stop.
//   ending   Shown at the bottom. {start} and {now} become clock times.
//   cover    Optional picture beside the title (see "Pictures" below).
//   stops    In order. Each one should go deeper than the last.
//
// Stop fields
//   title, by, url
//   kind     interactive, film, video, article, map, photo or website
//   minutes  Roughly how long to spend there
//   hook     Shown before they go: why it's worth the click
//   tip      Optional: one thing to try or look for
//   thread   Shown when they come back: the bridge to the next stop
//   keep     One fact worth remembering, shown when they come back and
//            collected at the bottom
//   image    Optional picture shown with the fact (see "Pictures" below)
//   tunnels  Optional side links for people who want to go deeper there
//
// Pictures (cover and image)
//   src      A file in site/img/, like "img/photo.jpg"
//   alt      What the picture shows, for people who can't see it
//   caption  One line under the picture
//   title    The picture's name, for the credits in the footer
//   credit   Who made it
//   license  For example "Public domain" or "CC BY-SA 3.0"
//   licenseUrl  Optional link to the license
//   source   The page you got it from

(window.HOLES = window.HOLES || []).push({
  slug: "how-big-is-the-universe",
  date: "2026-11-02",
  title: "How big is the universe, really?",
  teaser: "Seven stops, from a one-pixel moon to the end of time.",
  intro:
    "Your brain was built for distances you can walk. This hole zooms out seven times, and each stop is bigger than the one before.",
  ending:
    "You started with a one-pixel moon at {start}. It’s {now}, and you’ve reached the end of time.",
  cover: {
    src: "img/hubble-ultra-deep-field.jpg",
    alt: "Thousands of small galaxies of many shapes and colors scattered across black space.",
    caption: "The Hubble Ultra Deep Field, 2004. Nearly every speck of light is a galaxy.",
    title: "Hubble Ultra Deep Field",
    credit: "NASA and ESA",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Hubble_ultra_deep_field.jpg",
  },
  stops: [
    {
      title: "If the Moon Were Only 1 Pixel",
      by: "Josh Worth",
      kind: "interactive",
      minutes: 10,
      url: "https://www.joshworth.com/dev/pixelspace/pixelspace_solarsystem.html",
      hook:
        "The solar system drawn to scale, with the Moon shrunk to a single pixel. Scroll sideways and keep going. Most of what you’ll pass is empty space, and that’s the point.",
      tip: "Switch the distance units to blue whales.",
      thread:
        "Hold on to that feeling of scrolling through nothing. The next stop quits scrolling and starts multiplying.",
      keep: "The solar system is almost entirely empty space.",
      image: {
        src: "img/pale-blue-dot.jpg",
        alt: "A tiny pale dot, Earth, inside a faint band of scattered sunlight against dark space.",
        caption: "Earth from about 6 billion kilometers away, seen by Voyager 1 in 1990. In the original image, Earth is 0.12 of a pixel.",
        title: "Pale Blue Dot Revisited",
        credit: "NASA/JPL-Caltech",
        license: "Free to use with credit",
        source: "https://commons.wikimedia.org/wiki/File:PIA23645-Earth-PaleBlueDot-6Bkm-Voyager1-orig19900214-upd20200212.jpg",
      },
      tunnels: [
        {
          title: "Pale Blue Dot Revisited",
          by: "NASA/JPL",
          url: "https://www.jpl.nasa.gov/images/pia23645-pale-blue-dot-revisited/",
          note: "The story of that photo, reprocessed for its 30th anniversary.",
        },
      ],
    },
    {
      title: "Powers of Ten",
      by: "Charles and Ray Eames",
      kind: "film",
      minutes: 9,
      url: "https://www.youtube.com/watch?v=0fKBhvDjuy0",
      hook:
        "A 1977 film that starts with a picnic on the Chicago lakefront. Every ten seconds the camera pulls back to ten times the distance, out to about 100 million light-years. Then it rushes home and dives into the man’s hand, down to the quarks inside a single proton.",
      tip: "Watch it full screen.",
      thread:
        "Next: what happens when you point a telescope at a patch of sky with nothing bright in it, and keep looking.",
      keep: "Ten times farther every ten seconds: 10²⁴ meters is about 100 million light-years.",
      tunnels: [
        {
          title: "The Size of Space",
          by: "Neal Agarwal",
          url: "https://neal.fun/size-of-space/",
          note: "The same idea, but you drive. Start with an astronaut and keep pressing the right arrow.",
        },
        {
          title: "Powers of Ten (film)",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Powers_of_Ten_(film)",
          note: "How it was made. A 1968 rough draft started in Miami instead of Chicago.",
        },
      ],
    },
    {
      title: "The Hubble Deep Field",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/Hubble_Deep_Field",
      hook:
        "In December 1995, astronomers aimed Hubble at a speck of sky in Ursa Major, picked partly because nothing bright was known to be there. It was about the size of a tennis ball seen from 100 meters away. Over ten days, they took 342 exposures of it.",
      tip: "Look at the picture at the top before you read a word.",
      thread:
        "Nearly every one of those 3,000 or so smudges is a galaxy. Fewer than twenty are stars in our own. Next: where, in all of that, we live.",
      keep: "About 3,000 galaxies were hiding in a speck of sky the size of a tennis ball seen from 100 meters away.",
      image: {
        src: "img/hubble-deep-field.jpg",
        alt: "Hundreds of faint galaxies, spirals and smudges, on black, with a few bright foreground stars.",
        caption: "The Hubble Deep Field, put together from 342 exposures taken over ten days in December 1995.",
        title: "Hubble Deep Field",
        credit: "R. Williams (STScI), the Hubble Deep Field Team and NASA",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Hubble_Deep_Field_Image_at_Half_Resolution_(1996-01-390).jpg",
      },
      tunnels: [
        {
          title: "Webb’s First Deep Field",
          by: "ESA/Webb",
          url: "https://esawebb.org/images/webb-first-deep-field/",
          note: "Webb’s turn, in 2022: thousands of galaxies in a patch of sky about the size of a grain of sand held at arm’s length.",
        },
        {
          title: "Hubble Ultra-Deep Field",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Hubble_Ultra-Deep_Field",
          note: "The 2004 sequel: an estimated 10,000 galaxies in a patch smaller than a 1 mm² piece of paper held 1 meter away.",
        },
      ],
    },
    {
      title: "Laniakea: Our home supercluster",
      by: "Nature",
      kind: "video",
      minutes: 4,
      url: "https://www.youtube.com/watch?v=rENyyRwxpHo",
      hook:
        "In 2014, a team in Hawaii mapped which way the galaxies around us are flowing, a bit like finding a river basin by watching where the water runs. The flow outlined our home: the Milky Way and about 100,000 other galaxies. They named it Laniakea, Hawaiian for “immeasurable heaven.”",
      thread: "Superclusters are where galaxies crowd together. Next: the opposite.",
      keep: "Our address: the Milky Way, one of about 100,000 galaxies in a supercluster called Laniakea.",
      tunnels: [
        {
          title: "Laniakea Supercluster",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Laniakea_Supercluster",
          note: "About 400 million light-years across, with its galaxies drifting toward one region of space.",
        },
        {
          title: "Great Attractor",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Great_Attractor",
          note: "That region: Laniakea’s gravitational center, in the direction of the constellation Norma.",
        },
      ],
    },
    {
      title: "The Boötes Void",
      by: "Wikipedia",
      kind: "article",
      minutes: 4,
      url: "https://en.wikipedia.org/wiki/Bo%C3%B6tes_Void",
      hook:
        "Found in 1981, the Boötes Void is a region of space nearly 200 million light-years in radius. A region that size should hold around 2,000 galaxies. Astronomers have found about 60. Some call it the Great Nothing.",
      thread:
        "Crowded superclusters, enormous empty voids. Together they make the shape of everything we can see. Next: all of it, on one page.",
      keep: "About 60 galaxies where around 2,000 should be.",
      tunnels: [
        {
          title: "Void (astronomy)",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Void_(astronomy)",
          note: "The general article on cosmic voids, the vast spaces between galaxy filaments.",
        },
      ],
    },
    {
      title: "The Map of the Universe",
      by: "B. Ménard and N. Shtarkman, Johns Hopkins University",
      kind: "map",
      minutes: 6,
      url: "https://mapoftheuniverse.net/",
      hook:
        "About 200,000 real galaxies, each drawn at its actual position and color, in one slice that runs from the Milky Way to the edge of what can be seen. At the very top is the oldest light there is, left over from shortly after the Big Bang.",
      tip: "Scroll down to the map and find “you are here.” Everything above it is farther away and further back in time.",
      thread:
        "That’s as far as space goes for us. The only direction left is time.",
      keep: "The observable universe is about 93 billion light-years across, even though the universe is only 13.8 billion years old. Space kept stretching while the light traveled.",
      image: {
        src: "img/observable-universe.jpg",
        alt: "A circular illustration of the observable universe, with the Sun at the center and ever more distant structures in rings around it.",
        caption: "The observable universe drawn on a logarithmic scale, with the Solar System at the center.",
        title: "Observable universe logarithmic illustration",
        credit: "Unmismoobjetivo",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        source: "https://commons.wikimedia.org/wiki/File:Observable_universe_logarithmic_illustration.png",
      },
      tunnels: [
        {
          title: "Observable universe",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Observable_universe",
          note: "Why the part we can see is about 93 billion light-years wide.",
        },
      ],
    },
    {
      title: "Timelapse of the Future",
      by: "melodysheep",
      kind: "film",
      minutes: 29,
      url: "https://www.youtube.com/watch?v=uD4izuDMUQA",
      hook:
        "You’ve run out of space to zoom out into, so the last stop zooms out in time. It starts in 2019 and speeds up exponentially: the death of the Sun, the end of all stars, exploding black holes, the final fate of the cosmos. With the voices of David Attenborough, Brian Cox, Stephen Hawking and others.",
      tip: "Headphones on, lights off.",
      thread: "That’s the end of everything we know how to describe. There’s one place left to go.",
      keep: "The biggest black holes may take more than 10¹⁰⁶ years to evaporate.",
      tunnels: [
        {
          title: "Timeline of the far future",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Timeline_of_the_far_future",
          note: "The same trip as a table, starting in the year 3001. Somewhere in it: the year 292,277,026,596, when 64-bit Unix time overflows.",
        },
      ],
    },
  ],
});
