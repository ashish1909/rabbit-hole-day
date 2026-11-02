// A rabbit hole. See how-big-is-the-universe.js for what every field means.

(window.HOLES = window.HOLES || []).push({
  slug: "what-did-we-leave-on-the-moon",
  title: "What did we leave on the Moon?",
  teaser: "Six stops through the things people left up there, from mirrors that still work to a tiny sculpture.",
  intro:
    "Twelve people have walked on the Moon. They brought rocks home, and they left plenty behind. This hole goes looking for what’s still up there, and why.",
  ending: "You started looking at the Moon at {start}. It’s {now}, and you know what’s still lying up there.",
  cover: {
    src: "img/moon-reflector.jpg",
    alt: "A flat panel of small round mirrors sitting on grey lunar dust, with the Apollo 11 lander in the background.",
    caption: "The mirror panel Apollo 11 left on the Moon in 1969. It still sends laser light back to Earth.",
    title: "Apollo 11 Lunar Laser Ranging Experiment",
    credit: "NASA",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Apollo_11_Lunar_Laser_Ranging_Experiment.jpg",
  },
  stops: [
    {
      title: "QuickMap",
      by: "Arizona State University",
      kind: "map",
      minutes: 10,
      url: "https://quickmap.lroc.asu.edu/",
      hook:
        "A map of the whole Moon, stitched together from pictures taken by NASA’s Lunar Reconnaissance Orbiter, which has circled the Moon since 2009. Its camera is sharp enough to show the Apollo landing sites and the equipment left at them.",
      tip: "Zoom in on the Sea of Tranquility, where Apollo 11 landed.",
      thread: "Some of what was left behind is still doing its job. Next: a set of mirrors.",
      keep: "A spacecraft circling the Moon has photographed the Apollo landing sites and the hardware still sitting on them.",
      tunnels: [
        {
          title: "Lunar Reconnaissance Orbiter",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Lunar_Reconnaissance_Orbiter",
          note: "The spacecraft behind the map, launched in 2009 and still mapping.",
        },
      ],
    },
    {
      title: "Lunar Laser Ranging",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/Lunar_Laser_Ranging_experiments",
      hook:
        "Apollo 11, 14 and 15 each left a panel of mirrors on the Moon, built to bounce light straight back where it came from. Two Soviet rovers and India’s Chandrayaan-3 left more. Observatories fire lasers at them and time how long the light takes to come home.",
      thread:
        "The distance to the Moon can now be measured to the millimeter. Next: a machine that was already waiting when astronauts arrived.",
      keep: "Lasers and mirrors left by Apollo show the Moon drifting away from Earth by about 3.8 centimeters a year.",
    },
    {
      title: "Surveyor 3",
      by: "Wikipedia",
      kind: "article",
      minutes: 5,
      url: "https://en.wikipedia.org/wiki/Surveyor_3",
      hook:
        "An uncrewed lander touched down on the Moon in 1967. In November 1969, Apollo 12’s Pete Conrad and Alan Bean landed close enough to walk over to it, cut off parts including its TV camera, and bring them home.",
      thread:
        "Scientists later claimed bacteria had survived on that camera for two and a half years. Independent investigators have challenged it, but the claim pushed NASA toward much stricter cleaning of its probes. Next: something left on purpose.",
      keep: "Surveyor 3 is the only space probe that people have visited on another world.",
      image: {
        src: "img/moon-surveyor-3.jpg",
        alt: "A spindly white lander with a dish-shaped antenna standing on the slope of a grey lunar crater.",
        caption: "Surveyor 3, photographed by the Apollo 12 astronauts who walked over to it.",
        title: "Surveyor 3 on Moon",
        credit: "NASA",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Surveyor_3_on_Moon.jpg",
      },
    },
    {
      title: "Fallen Astronaut",
      by: "Wikipedia",
      kind: "article",
      minutes: 4,
      url: "https://en.wikipedia.org/wiki/Fallen_Astronaut",
      hook:
        "An aluminum figure of an astronaut, 8.9 centimeters tall, made by the Belgian artist Paul Van Hoeydonck. On 2 August 1971, the Apollo 15 crew laid it in the dust next to a plaque listing 14 astronauts and cosmonauts who had died. They told no one until they were home.",
      thread: "It lies on the ground among the crew’s footprints. Next: something that went to the Moon and came back to grow.",
      keep: "A tiny sculpture on the Moon, Fallen Astronaut, remembers 14 astronauts and cosmonauts who died.",
      image: {
        src: "img/moon-fallen-astronaut.jpg",
        alt: "A small metal plaque propped up in lunar dust, with a tiny aluminum astronaut figure lying beside it.",
        caption: "The plaque and the figure at Hadley Rille, photographed by the Apollo 15 crew.",
        title: "Fallen Astronaut",
        credit: "NASA",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Fallen_Astronaut.jpg",
      },
    },
    {
      title: "Moon trees",
      by: "Wikipedia",
      kind: "article",
      minutes: 5,
      url: "https://en.wikipedia.org/wiki/Moon_tree",
      hook:
        "In 1971, Apollo 14’s Stuart Roosa carried about 500 tree seeds in a small canister while he orbited the Moon. Back home they grew into trees that were given away and planted across the United States, and in Brazil, Switzerland and Japan.",
      thread:
        "For decades, nobody kept track of where most of them went. In 2022, Artemis I took 1,000 more seeds around the Moon. Next: the full list of what’s up there.",
      keep: "Trees grown from seeds that orbited the Moon on Apollo 14 are growing in towns across the US.",
      image: {
        src: "img/moon-tree.jpg",
        alt: "A tall pine tree on a lawn in front of a stone courthouse.",
        caption: "A Moon tree, a loblolly pine, outside the Sebastian County courthouse in Arkansas.",
        title: "MoonTreeArk",
        credit: "Jesse Berry",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        source: "https://commons.wikimedia.org/wiki/File:MoonTreeArk.jpg",
      },
    },
    {
      title: "List of artificial objects on the Moon",
      by: "Wikipedia",
      kind: "article",
      minutes: 8,
      url: "https://en.wikipedia.org/wiki/List_of_artificial_objects_on_the_Moon",
      hook:
        "Every lander, rover and crashed rocket stage, and below them a long tail of smaller things: hammers, flags, plaques on the ladders of all six Apollo landers, a silver astronaut pin left by Alan Bean, a Bible left by David Scott.",
      tip: "Look at the map near the top first.",
      thread: "There’s no wind or rain on the Moon to move any of it. That’s the bottom of this hole.",
      keep: "Each of the six Apollo landers left a plaque on its ladder, and they’re all still on the Moon.",
    },
  ],
});
