import warlord1 from "../assets/warlord1.jpg";
import warlord2 from "../assets/warlord2.jpg";
import warlord3 from "../assets/warlord3.jpg";
import warlord4 from "../assets/warlord4.jpg";
import mini1 from "../assets/mini1.jpg";
import mini2 from "../assets/mini2.jpg";
import mini3 from "../assets/mini3.jpg";
import mini4 from "../assets/mini4.jpg";
import muldur1 from "../assets/Muldur1.m4a";
import muldur2 from "../assets/Muldur2.mp3";
import muldur3 from "../assets/Muldur3.m4a";
import muldur4 from "../assets/Muldur4.m4a";
import muldur5 from "../assets/Muldur5.m4a";
import muldur6 from "../assets/Muldur6.m4a";
import muldur7 from "../assets/Muldur7.m4a";

export const warlords = [
  {
    name: "Vilkyu",
    health: 58,
    description: "demon of loneliness",
    image: warlord1,
    miniImage: mini4,
    start: "2021-02-07",
    end: "2021-02-13",
    sayings: [
      { text: "No one really cares!" },
      { text: "You don't need anyone else" },
      { text: "Everyone ELSE is happy" },
      { text: "You're the only one who feels that way" },
      { text: "What's wrong with you?!" },
      { text: "You deserve to be alone!" },
      { text: "No one can give you what you need" },
    ],
    defeated: true,
  },
  {
    name: "Muldur",
    health: 62,
    description: "demon of shame",
    image: warlord2,
    miniImage: mini3,
    start: "2021-02-14",
    end: "2021-02-20",
    sayings: [
      { text: "You'll never have the body you want", audio: muldur2 },
      { text: "Self-care is selfish!", audio: muldur3 },
      { text: "You're a failure and a screw-up!", audio: muldur1 },
      { text: "The only way you'll defeat me is by cheating!", audio: muldur4 },
      { text: "You'll always be this way!" },
      { text: "HA! You ARE as bad as they say.", audio: muldur6 },
      { text: "Once a loser, always a loser", audio: muldur7 },
      // "You're not worth the time anyway!",
    ],
    defeated: true,
  },
  {
    name: "Ziir",
    health: 66,
    description: "demon of purposelessness",
    image: warlord3,
    miniImage: mini2,
    start: "2021-02-21",
    end: "2021-02-27",
    sayings: [
      { text: "What's the point of all this anyway!" },
      {
        text: "Doing this takes time from what's ACTUALLY important",
      },
      { text: "You're too old to follow your dreams" },
      {
        text: "You always stop before you reach that goal!",
      },
      {
        text: "IF you're going to do this, you'll be doing it alone...",
      },
      {
        text: "You always stop before you reach that goal!",
      },
      {
        text: "You always stop before you reach that goal!",
      },
    ],
    defeated: false,
  },
  {
    name: "Bradock",
    health: 70,
    description: "demon of fear",
    image: warlord4,
    miniImage: mini1,
    start: "2021-02-28",
    end: "2021-03-06",
    sayings: [
      { text: "What if you get hurt?" },
      { text: "What if this is all just pointless?" },
    ],
    defeated: false,
  },
];
