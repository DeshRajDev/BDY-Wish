import { BirthdayConfig } from "@/types/birthday";

export const birthdayConfig: BirthdayConfig = {
  // Personal Names (customize anytime!)
  girlfriendName: "My Love",
  senderName: "Forever Yours",

  // STEP 1: Welcome / Surprise Screen
  welcomeHeading: "A Surprise Ahead, My Love ❤️",
  welcomeSupportingText:
    "Someone very special deserves the most beautiful surprise today...",
  enterButtonText: "Enter ❤️",

  // STEP 2: Media Paths
  // Place your video in public/videos/happy-birthday.mp4
  videoPath: "/videos/happy-birthday.mp4",
  // Place your music in public/audio/happy-birthday.mp3
  musicPath: "/audio/happy-birthday.mp3",
  enableSkipVideo: false,

  // STEP 5: Cake & Wish
  makeAWishTitle: "Make a Special Wish ✨",
  makeAWishSecretMessage:
    "May every sweet prayer whispered in your heart today be answered in the most magical way. You deserve the entire universe! 🌟💫",

  // STEP 6: Main Celebration & Wishes
  mainTitle: "Happy Birthday, My Beautiful Girl! 🎂❤️",
  mainSubtitle:
    "Today is all about you, your smile, and the happiness you bring into my life.",

  wishes: [
    {
      id: 1,
      tag: "Pure Joy",
      icon: "Sparkles",
      text: "May your life always be filled with happiness, your heart with peace, and your days with countless reasons to smile.",
    },
    {
      id: 2,
      tag: "Dreams Unfolding",
      icon: "Star",
      text: "May every dream you hold close to your heart slowly turn into something beautiful and real.",
    },
    {
      id: 3,
      tag: "Unconditional Love",
      icon: "Heart",
      text: "You deserve all the love, kindness, success, and beautiful moments that life has to offer. Never stop shining.",
    },
    {
      id: 4,
      tag: "Endless Smiles",
      icon: "Sun",
      text: "On your special day, I wish you endless laughter, unforgettable memories, good health, and a future full of happiness.",
    },
    {
      id: 5,
      tag: "Timeless Bond",
      icon: "Infinity",
      text: "No matter how many birthdays pass, I hope life continues to give you new reasons to smile and beautiful memories to treasure.",
    },
  ],

  quotes: [
    {
      id: 1,
      quote: "You make ordinary moments feel special and beautiful.",
    },
    {
      id: 2,
      quote:
        "If happiness had a smile, I would wish for you to wear it every day.",
    },
    {
      id: 3,
      quote:
        "May this new chapter of your life be even more beautiful than the dreams you carry.",
    },
    {
      id: 4,
      quote:
        "Today the world celebrates your birthday, and I celebrate the happiness you bring into my life.",
    },
  ],

  // STEP 7: Personal Love Letter
  loveLetter: {
    title: "A Little Message From My Heart 💌",
    greeting: "Happy Birthday, my love! ❤️",
    paragraphs: [
      "Today is your special day, and I wish I could fill every moment of it with happiness, smiles, and beautiful surprises. You deserve to feel loved, appreciated, and celebrated, not just today but every day.",
      "May your dreams grow bigger, your worries become lighter, and your life bring you countless beautiful moments. Keep smiling, keep believing in yourself, and never forget how special you are.",
      "I hope this new year of your life brings you peace, success, good health, and everything your heart wishes for.",
    ],
    closing:
      "Enjoy your special day, birthday girl. You deserve all the happiness in the world. 🎂❤️",
    signature: "With all my heart & infinite love,",
  },

  // STEP 8: Extra Magical Touches
  oneMoreSurprise: {
    buttonLabel: "One More Surprise 💝",
    modalTitle: "A Secret Note For You 🌹",
    modalSubtitle: "Just a few reminders of why you are my whole world...",
    reasons: [
      "Your laugh is my absolute favorite sound in the whole universe.",
      "The gentle kindness you show to everyone around you inspires me every single day.",
      "Even in crowded rooms or quiet moments, holding your hand feels like coming home.",
      "You make even simple rainy days feel like golden celebrations.",
      "I love you more than words, songs, or stars could ever measure.",
    ],
    finalRomanticNote:
      "I promise to always stand by you, celebrate your victories, hold your hand through challenges, and cherish every single heartbeat with you. Happy Birthday, my angel! ✨💍",
  },

  // Optional Photo Gallery (will render if photos are added to public/images/)
  photoGallery: {
    title: "Our Cherished Moments 📸",
    subtitle: "A glimpse into the beautiful memories we've created together",
    photos: [
      {
        id: 1,
        src: "/images/moment-1.jpg",
        caption: "The smile that lights up my entire world ✨",
        date: "Special Memory",
      },
      {
        id: 2,
        src: "/images/moment-2.jpg",
        caption: "Every adventure is ten times brighter with you 🌸",
        date: "Sweet Days",
      },
      {
        id: 3,
        src: "/images/moment-3.jpg",
        caption: "To a lifetime of more laughs, hugs, and sunsets 🌅",
        date: "Forever & Always",
      },
    ],
  },

  theme: {
    primaryRose: "#f43f5e",
    accentGold: "#fbbf24",
    deepBurgundy: "#180614",
  },
};
