export type ExperienceState = "welcome" | "video" | "celebration";

export interface WishCard {
  id: number;
  text: string;
  tag?: string;
  icon?: string;
}

export interface QuoteItem {
  id: number;
  quote: string;
  author?: string;
}

export interface PhotoItem {
  id: number;
  src: string;
  caption: string;
  date?: string;
}

export interface BirthdayConfig {
  girlfriendName: string;
  senderName: string;
  welcomeHeading: string;
  welcomeSupportingText: string;
  enterButtonText: string;
  videoPath: string;
  musicPath: string;
  enableSkipVideo: boolean;
  mainTitle: string;
  mainSubtitle: string;
  makeAWishTitle: string;
  makeAWishSecretMessage: string;
  wishes: WishCard[];
  quotes: QuoteItem[];
  loveLetter: {
    title: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  oneMoreSurprise: {
    buttonLabel: string;
    modalTitle: string;
    modalSubtitle: string;
    reasons: string[];
    finalRomanticNote: string;
  };
  photoGallery: {
    title: string;
    subtitle: string;
    photos: PhotoItem[];
  };
  theme: {
    primaryRose: string;
    accentGold: string;
    deepBurgundy: string;
  };
}
