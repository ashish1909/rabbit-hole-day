// A rabbit hole. See how-big-is-the-universe.js for what every field means.

(window.HOLES = window.HOLES || []).push({
  slug: "how-does-the-internet-cross-the-ocean",
  title: "How does the internet cross the ocean?",
  teaser: "Five stops along the sea floor, from today’s cables back to one that worked for just three weeks in 1858.",
  intro:
    "When you load a page from another continent, it probably didn’t come through space. It came along a cable lying on the bottom of the sea. This hole follows those cables back to the first one.",
  ending: "You started on a map of the sea floor at {start}. It’s {now}, and you know what happens when the cables break.",
  cover: {
    src: "img/cables-great-eastern.jpg",
    alt: "An old photograph of a huge iron steamship with several masts and funnels, anchored in a calm bay.",
    caption: "The Great Eastern at Heart’s Content, Newfoundland, in July 1866, just after landing the Atlantic cable.",
    title: "Great Eastern at Heart’s Content, 1866",
    credit: "Most likely Robert Edward Holloway",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Great_Eastern_1866-crop.jpg",
  },
  stops: [
    {
      title: "Submarine Cable Map",
      by: "TeleGeography",
      kind: "map",
      minutes: 10,
      url: "https://www.submarinecablemap.com/",
      hook:
        "Every cable on the sea floor that carries the internet between countries and continents, drawn on one map. Each colored line is a real cable, lying in the dark on the bottom of the sea.",
      tip: "Click a cable to see its name, its length and where it comes ashore.",
      thread: "Cables like these have been crossing oceans since the 1850s. Next: the very first one across the Atlantic.",
      keep: "The internet crosses oceans along cables lying on the sea floor.",
    },
    {
      title: "Transatlantic telegraph cable",
      by: "Wikipedia",
      kind: "article",
      minutes: 7,
      url: "https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable",
      hook:
        "On 16 August 1858, a cable from Ireland to Newfoundland carried its first official message: congratulations from Queen Victoria to President James Buchanan. It was painfully slow. Three weeks later, an engineer trying to speed it up applied too much voltage, and the cable was destroyed.",
      thread: "It took eight more years to lay one that lasted. Next: the giant ship that did it.",
      keep: "The first transatlantic telegraph cable worked for three weeks in 1858 before it was destroyed by too much voltage.",
    },
    {
      title: "SS Great Eastern",
      by: "Wikipedia",
      kind: "article",
      minutes: 7,
      url: "https://en.wikipedia.org/wiki/SS_Great_Eastern",
      hook:
        "Isambard Kingdom Brunel’s iron steamship, launched in 1858, was by far the biggest ship ever built at the time, and a commercial flop. Then her new owners ripped out salons and rooms, filled her with huge tanks of cable, and sent her to sea.",
      thread: "In 1866 she laid the first transatlantic cable that lasted. The continents have been connected ever since. Next: how far it spread.",
      keep: "The first lasting transatlantic cable was laid in 1866 by the Great Eastern, a giant ship that had failed as a passenger liner.",
      image: {
        src: "img/cables-landing-1866.jpg",
        alt: "A painting of crowds and small boats on a shore as sailors haul a thick cable from the sea onto land.",
        caption: "The Atlantic cable coming ashore at Heart’s Content, Newfoundland, painted by Robert Charles Dudley in 1866.",
        title: "Landing of the Atlantic Cable of 1866",
        credit: "Robert Charles Dudley",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Landing_of_the_Atlantic_Cable_of_1866,_Heart%27s_Content,_Newfoundland.jpg",
      },
    },
    {
      title: "Submarine communications cable",
      by: "Wikipedia",
      kind: "article",
      minutes: 8,
      url: "https://en.wikipedia.org/wiki/Submarine_communications_cable",
      hook:
        "By 1872, cables linked every continent except Antarctica, and Antarctica still has none. Today’s cables carry light through glass fibers instead of telegraph pulses, but they still lie on the sea floor, where fishing trawlers, ships’ anchors, earthquakes and even shark bites can damage them.",
      thread: "Modern systems are built with backup paths so traffic can switch routes when one breaks. Next: what happens when several break at once.",
      keep: "Cables have linked every continent except Antarctica since 1872. Sharks have been recorded biting them.",
    },
    {
      title: "2008 submarine cable disruption",
      by: "Wikipedia",
      kind: "article",
      minutes: 5,
      url: "https://en.wikipedia.org/wiki/2008_submarine_cable_disruption",
      hook:
        "Between 23 January and 4 February 2008, up to five internet cables under the Mediterranean and the Middle East were damaged. Internet access slowed down or failed for people across the Middle East and India.",
      thread: "The cables are out of sight, but the whole connected world rests on them. That’s the bottom of this hole.",
      keep: "In early 2008, damage to a handful of undersea cables slowed the internet across the Middle East and India.",
    },
  ],
});
