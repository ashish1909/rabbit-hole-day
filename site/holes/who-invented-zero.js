// A rabbit hole. See how-big-is-the-universe.js for what every field means.

(window.HOLES = window.HOLES || []).push({
  slug: "who-invented-zero",
  title: "Who invented zero?",
  teaser: "Five stops through the history of math on paper, from notches on a bone to the day someone drew the first equals sign.",
  intro:
    "Numbers feel like they’ve always been there, but writing them down took tens of thousands of years of invention. Zero, the number for nothing, was one of the hardest ideas of all. This hole follows how we got there.",
  ending: "You started with a 20,000-year-old bone at {start}. It’s {now}, and you know why = looks the way it does.",
  cover: {
    src: "img/zero-ishango.jpg",
    alt: "A dark brown, curved bone tool covered in groups of short carved notches.",
    caption: "The Ishango bone, found in the Democratic Republic of the Congo.",
    title: "Ishango bone",
    credit: "Joeykentin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Ishango_bone_(cropped).jpg",
  },
  stops: [
    {
      title: "The Ishango bone",
      by: "Wikipedia",
      kind: "article",
      minutes: 5,
      url: "https://en.wikipedia.org/wiki/Ishango_bone",
      hook:
        "A bone tool about 10 centimeters long, with a piece of quartz fixed to one end, found at Ishango in the Democratic Republic of the Congo. It’s carved with groups of notches in three columns, and is often dated to about 20,000 years ago.",
      thread: "Some call it the oldest mathematical tool. Others think the notches were just for grip. Next: math that was definitely math.",
      keep: "The Ishango bone, about 20,000 years old, may be one of the oldest counting tools ever found.",
    },
    {
      title: "Plimpton 322",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/Plimpton_322",
      hook:
        "A Babylonian clay tablet from around 1800 BC, with a table of numbers pressed into it in cuneiform. Each row relates to a set of whole numbers that fit Pythagoras’s rule for right-angled triangles, more than a thousand years before Pythagoras.",
      thread: "The Babylonians were brilliant with numbers. Next: a little dot standing in for nothing.",
      keep: "A Babylonian tablet from around 1800 BC lists number sets that fit Pythagoras’s theorem, long before Pythagoras.",
      image: {
        src: "img/zero-plimpton.jpg",
        alt: "A broken clay tablet covered in rows of tiny wedge-shaped marks.",
        caption: "Plimpton 322, written around 1800 BC.",
        title: "Plimpton 322",
        credit: "Unknown photographer",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Plimpton_322.jpg",
      },
    },
    {
      title: "The Bakhshali manuscript",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/Bakhshali_manuscript",
      hook:
        "A mathematical text written on birch bark, found in 1881 in a village near Peshawar in present-day Pakistan. It writes numbers using place value, with a dot as a placeholder for zero.",
      thread: "Its date has been argued over: in 2024 Oxford revised its carbon dating to between 799 and 1102 CE. Next: the man who made zero a number in its own right.",
      keep: "The Bakhshali manuscript writes zero as a dot. Its age is still being argued over.",
      image: {
        src: "img/zero-bakhshali.jpg",
        alt: "A fragile, darkened page of birch bark covered in lines of old handwritten script.",
        caption: "A page of the Bakhshali manuscript.",
        title: "Bakhshali manuscript",
        credit: "National Geographic",
        license: "Public domain",
        source: "https://commons.wikimedia.org/wiki/File:Bakhshali_manuscript.jpg",
      },
    },
    {
      title: "Brahmagupta",
      by: "Wikipedia",
      kind: "article",
      minutes: 7,
      url: "https://en.wikipedia.org/wiki/Brahmagupta",
      hook:
        "An Indian mathematician and astronomer, credited as the first person to treat zero as a number in its own right. His book of 628 CE was the first to give rules for doing arithmetic with zero and with negative numbers.",
      thread: "Zero and the place-value numerals around it eventually spread west and became the digits we use today. Next: a much newer symbol, invented to save writing.",
      keep: "Brahmagupta, in 628 CE, was the first known to treat zero as a number with its own rules.",
      tunnels: [
        {
          title: "0",
          by: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/0",
          note: "Everything about zero, including why you can’t divide by it.",
        },
      ],
    },
    {
      title: "Equals sign",
      by: "Wikipedia",
      kind: "article",
      minutes: 4,
      url: "https://en.wikipedia.org/wiki/Equals_sign",
      hook:
        "In 1557, the Welsh mathematician Robert Recorde got tired of writing “is equal to” over and over. So he drew two parallel lines of the same length, “because no two things can be more equal.”",
      thread: "Nobody else used it in print for another 61 years. Now it’s everywhere. That’s the bottom of this hole.",
      keep: "The equals sign was invented in 1557 by Robert Recorde, because “no two things can be more equal” than two parallel lines.",
    },
  ],
});
