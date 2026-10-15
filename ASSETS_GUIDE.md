# 🌹 Birthday Website Asset Placement Guide

Welcome! This romantic birthday surprise website is completely configured and ready.
You can easily personalize the media files by dropping them into the `public/` folder.

---

### 1. 🎥 Your Birthday Surprise Video
- **Target File Path:** `public/videos/birthday-surprise.mp4`
- **Supported Formats:** `.mp4` (H.264/AAC is recommended for universal mobile & desktop browser support)
- **Duration:** Any duration you like (5s, 10s, 30s, 1m+). The website automatically detects the exact end of your video before smoothly starting the celebration.
- **Config Setting:** If your file has a different name, edit `videoPath` in [`src/config/birthday.ts`](file:///c:/Users/opera/OneDrive/Desktop/bdy/src/config/birthday.ts).

> **Graceful Fallback:** If the video file is not yet placed, the website shows a romantic preview card with a **"Continue to Celebration ✨"** button so nothing ever crashes!

---

### 2. 🎵 Happy Birthday Music
- **Target File Path:** `public/audio/happy-birthday.mp3`
- **Supported Formats:** `.mp3`
- **Volume:** Gentle and comfortable, with a floating music player in the bottom-right corner allowing play/pause, mute, and volume adjustments.
- **Config Setting:** If your audio has a different name, edit `musicPath` in [`src/config/birthday.ts`](file:///c:/Users/opera/OneDrive/Desktop/bdy/src/config/birthday.ts).

> **Magical Built-in Synthesizer Fallback:** Even before you add your MP3 file, the website includes a built-in Web Audio API Music Box that softly plays the "Happy Birthday" melody in dreamy celestial chime tones!

---

### 3. 📸 Optional Photo Gallery
- **Target Folder:** `public/images/`
- **Default File Names:**
  - `public/images/moment-1.jpg`
  - `public/images/moment-2.jpg`
  - `public/images/moment-3.jpg`
- **Config Setting:** You can add as many photos as you want in [`src/config/birthday.ts`](file:///c:/Users/opera/OneDrive/Desktop/bdy/src/config/birthday.ts) under `photoGallery.photos`.
- If an image hasn't been added yet, an elegant polaroid card with a heart crest is displayed cleanly.

---

### 4. 💌 Personalizing the Text & Names
All text, names, wishes, quotes, and the personal love letter can be modified in one single file:
👉 **[`src/config/birthday.ts`](file:///c:/Users/opera/OneDrive/Desktop/bdy/src/config/birthday.ts)**

Enjoy celebrating your special someone! ❤️
