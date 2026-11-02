// A rabbit hole. See how-big-is-the-universe.js for what every field means.

(window.HOLES = window.HOLES || []).push({
  slug: "is-your-map-lying-to-you",
  title: "Is your map lying to you?",
  teaser: "Five stops, from a shrunken Africa to an island that only exists in data.",
  intro:
    "Every map is a story somebody decided to tell. Some bend the truth to be useful, and some make things up on purpose.",
  ending: "You started dragging countries around at {start}. It’s {now}, and you’ve reached an island that isn’t there.",
  cover: {
    src: "img/map-mercator.jpg",
    alt: "A world map in which Greenland and Antarctica look enormous.",
    caption: "The world on the Mercator projection. The closer to the poles, the bigger everything looks.",
    title: "Mercator projection",
    credit: "Strebe",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Mercator_projection_Square.JPG",
  },
  stops: [
    {
      title: "The True Size Of",
      by: "James Talmage and Damon Maneice",
      kind: "interactive",
      minutes: 10,
      url: "https://thetruesize.com/",
      hook:
        "Search for a country, then drag it toward the equator or the poles and watch it shrink or grow. Every flat map has to stretch something, and the one this page is drawn on stretches a lot.",
      tip: "Drag Greenland down onto Africa.",
      thread:
        "On the map you just used, Greenland looks about as big as Africa. It isn’t even close. Next: why the map is drawn that way.",
      keep: "Africa is about 14 times the size of Greenland, even though they look similar on a Mercator map.",
      image: {
        src: "img/map-tissot.jpg",
        alt: "A Mercator world map dotted with red circles that get bigger toward the top and bottom.",
        caption: "Each red circle covers the same area on the real Earth. The map swells them toward the poles.",
        title: "Mercator projection with Tissot’s indicatrices",
        credit: "Stefan Kühn",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        source: "https://commons.wikimedia.org/wiki/File:Tissot_mercator.png",
      },
      tunnels: [
        {
          title: "Gall–Peters projection",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection",
          note: "A map that keeps areas true and stretches shapes instead.",
        },
      ],
    },
    {
      title: "Why all world maps are wrong",
      by: "Vox",
      kind: "video",
      minutes: 6,
      url: "https://www.youtube.com/watch?v=kIID5FDi2JQ",
      hook:
        "The problem every mapmaker faces: you can’t flatten a sphere without tearing or stretching it. So every map has to pick what to get wrong.",
      thread: "The most famous of them, Mercator’s, was a deliberate choice made for sailors in 1569. Next: mapmakers who lied on purpose.",
      keep: "Mercator’s 1569 map was made for sailors: a straight line on it is a constant compass heading. The price is that land near the poles looks huge.",
      image: {
        src: "img/map-mercator-1569.jpg",
        alt: "An old black-and-white world map covered in fine lines, lettering and drawings.",
        caption: "Gerardus Mercator’s world map of 1569.",
        title: "Mercator 1569 world map",
        credit: "Gerardus Mercator",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Mercator_1569_world_map_composite.jpg",
      },
      tunnels: [
        {
          title: "Mercator projection",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Mercator_projection",
          note: "The full story of the map, and why it became the standard for navigation.",
        },
      ],
    },
    {
      title: "Agloe, New York",
      by: "Wikipedia",
      kind: "article",
      minutes: 4,
      url: "https://en.wikipedia.org/wiki/Agloe,_New_York",
      hook:
        "In the 1920s, mapmakers Otto G. Lindberg and Ernest Alpers invented a town called Agloe, an anagram of their initials, and put it on their map to catch anyone copying it. Then the fake town started to become real.",
      thread:
        "A nearby lodge took the name, the town turned up on a rival’s map, and in 2014 the US Geological Survey added it to its database of place names as “Agloe (Not Official).” Next: an island that stayed on maps for more than a century without existing.",
      keep: "Mapmakers have hidden fake streets and towns in their maps to catch copiers. They’re called trap streets and paper towns.",
      tunnels: [
        {
          title: "Trap street",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Trap_street",
          note: "Fake streets hidden in maps to catch plagiarists. Publishers rarely admit to them.",
        },
        {
          title: "Fictitious entry",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Fictitious_entry",
          note: "Encyclopedias do it too. Meet Lillian Virginia Mountweazel, fountain designer turned photographer.",
        },
      ],
    },
    {
      title: "Sandy Island",
      by: "Wikipedia",
      kind: "article",
      minutes: 5,
      url: "https://en.wikipedia.org/wiki/Sandy_Island,_New_Caledonia",
      hook:
        "For more than a century, maps showed an island called Sandy Island in the Coral Sea, near New Caledonia. It was on nautical charts, on National Geographic’s maps and on Google Maps. In November 2012, an Australian research ship sailed to where it should be.",
      thread:
        "They found open ocean, well over a kilometer deep. A whaling ship had reported the island in 1876, and it may have mistaken a raft of floating volcanic pumice for land. Next: an island that exists only in data.",
      keep: "Sandy Island was on maps, including Google Maps, until 2012. The sea floor there is more than 1,400 meters down.",
      image: {
        src: "img/map-sandy-island.jpg",
        alt: "A detail of an old sea chart with a small oval island labeled Sandy.",
        caption: "Sandy Island on a 1908 chart. It isn’t there.",
        title: "Sandy Island on a 1908 chart",
        credit: "R. C. Carrington, Hydrographic Office",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Sandy_Island_on_1908_chart_-_cropped.jpg",
      },
      tunnels: [
        {
          title: "Phantom island",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Phantom_island",
          note: "Islands that appeared on maps for years without ever existing.",
        },
      ],
    },
    {
      title: "Null Island",
      by: "Wikipedia",
      kind: "article",
      minutes: 4,
      url: "https://en.wikipedia.org/wiki/Null_Island",
      hook:
        "Zero degrees latitude, zero degrees longitude: a spot in the Gulf of Guinea, about 600 kilometers off the coast of West Africa, with no land at all. When software loses a location and records it as 0, 0, the data ends up here.",
      thread: "It started as a joke among mapmakers, and now they use it to find their mistakes. That’s the bottom of this hole.",
      keep: "Null Island, at 0° latitude and 0° longitude, has no land at all. For a while, a weather buoy called Soul was moored there.",
      image: {
        src: "img/map-null-island.jpg",
        alt: "A yellow weather buoy with masts and instruments, bobbing in the open sea.",
        caption: "The weather buoy Soul, at 0° latitude, 0° longitude.",
        title: "Null Island",
        credit: "Graham Curran",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        source: "https://commons.wikimedia.org/wiki/File:Null_Island_2017.jpg",
      },
    },
  ],
});
