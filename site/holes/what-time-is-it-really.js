// A rabbit hole. See how-big-is-the-universe.js for what every field means.

(window.HOLES = window.HOLES || []).push({
  slug: "what-time-is-it-really",
  date: "2026-11-10",
  title: "What time is it, really?",
  teaser: "Six stops through clock time, from a town with two minute hands to a country that skipped a Friday.",
  intro:
    "The time on your phone feels like a fact of nature. It’s really a pile of agreements, some of them quite recent. This hole pulls them apart.",
  ending: "You checked your clock at {start}. It’s {now}, as far as anyone can agree.",
  cover: {
    src: "img/time-exchange-clock.jpg",
    alt: "An ornate clock face on a stone building, with two minute hands a few minutes apart.",
    caption: "The clock on the Exchange in Bristol. The extra minute hand shows London time.",
    title: "Clock on the Exchange, Bristol",
    credit: "Rod Ward",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Exchangeclock.JPG",
  },
  stops: [
    {
      title: "Time.is",
      by: "time.is",
      kind: "website",
      minutes: 3,
      url: "https://time.is/",
      hook:
        "The exact time, checked against atomic clocks, and how far off your own device’s clock is. It’s probably closer than you’d think, and not quite right.",
      thread: "Not long ago, every town kept its own time by the Sun. Next: the trains that ended that.",
      keep: "Your device’s clock is almost certainly a little bit off from the official atomic time.",
    },
    {
      title: "Railway time",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/Railway_time",
      hook:
        "In the 1830s, every town in Britain kept its own local time: Bristol ran ten minutes behind London. In November 1840, the Great Western Railway put its whole line on London time, so its timetables would make sense.",
      thread: "Some towns refused, and for years showed two times at once, like Bristol’s clock with its extra minute hand. Britain only made one standard time law in 1880. Next: where one day becomes the next.",
      keep: "Before the railways, Bristol kept its own time, ten minutes behind London.",
    },
    {
      title: "International Date Line",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/International_Date_Line",
      hook:
        "A line running from pole to pole through the Pacific, roughly along 180° longitude, where the calendar changes day. Cross it going west and the date jumps forward a day. It isn’t defined by any international law, so countries can move it.",
      tip: "Look at the map and notice how it zigzags around island nations.",
      thread: "And at least one country did move it. Next: the day that never happened there.",
      keep: "The International Date Line isn’t set by any law. It zigzags wherever countries decide.",
      image: {
        src: "img/time-date-line.jpg",
        alt: "A map of the Pacific Ocean with a zigzagging line running from north to south through it.",
        caption: "The International Date Line, bending around island nations.",
        title: "International Date Line",
        credit: "Jailbird and other Wikimedia Commons contributors",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        source: "https://commons.wikimedia.org/wiki/File:International_Date_Line.png",
      },
    },
    {
      title: "Time in Samoa",
      by: "Wikipedia",
      kind: "article",
      minutes: 3,
      url: "https://en.wikipedia.org/wiki/Time_in_Samoa",
      hook:
        "At the end of Thursday, 29 December 2011, Samoa went straight to Saturday, 31 December. Friday the 30th never happened there. The country had moved itself to the other side of the date line, to line up its week with New Zealand, Australia and Asia.",
      thread: "Countries can shift calendars. Scientists have been adjusting the clock itself. Next: the extra seconds.",
      keep: "Samoa skipped Friday, 30 December 2011, to move to the other side of the date line.",
    },
    {
      title: "Leap second",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/Leap_second",
      hook:
        "Atomic clocks keep perfect time. The Earth doesn’t: its spin wobbles and slows. So between 1972 and 2016, timekeepers slipped 27 extra seconds into the world’s clocks to keep them in step with the Sun.",
      thread: "In October 2026, the world’s timekeepers voted to let the gap grow to as much as an hour, which could put off the next leap second for centuries. Next: the clocks that keep the real time.",
      keep: "Between 1972 and 2016, 27 leap seconds were added to the world’s clocks to keep up with the Earth’s slowing spin.",
    },
    {
      title: "Optical lattice clock",
      by: "Wikipedia",
      kind: "article",
      minutes: 6,
      url: "https://en.wikipedia.org/wiki/Optical_lattice_clock",
      hook:
        "A clock that holds atoms of strontium or ytterbium, cooled almost to absolute zero, in a grid made of laser light, and counts their ticks. A cesium atomic clock, today’s standard, might drift by a second in about 30 million years. A strontium lattice clock would drift about a second in 30 billion.",
      thread: "That’s more than twice the age of the universe. These clocks may one day redefine what a second is. That’s the bottom of this hole.",
      keep: "The best clocks would drift by about a second in 30 billion years, longer than the universe has existed.",
    },
  ],
});
