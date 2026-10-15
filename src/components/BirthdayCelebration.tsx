"use client";

import React, { useEffect } from "react";
import { triggerGrandCelebration } from "@/utils/confetti";
import { FloatingParticles } from "./FloatingParticles";
import { BalloonAnimation } from "./BalloonAnimation";
import { MusicPlayer } from "./MusicPlayer";
import { BirthdayCake } from "./BirthdayCake";
import { BirthdayWishes } from "./BirthdayWishes";
import { BirthdayQuotes } from "./BirthdayQuotes";
import { LoveLetter } from "./LoveLetter";
import { PhotoGallery } from "./PhotoGallery";
import { OneMoreSurpriseModal } from "./OneMoreSurpriseModal";
import { ReplayButton } from "./ReplayButton";

interface BirthdayCelebrationProps {
  onReplay: () => void;
}

export const BirthdayCelebration: React.FC<BirthdayCelebrationProps> = ({
  onReplay,
}) => {
  const showBalloons = true;

  // Trigger grand celebration confetti upon mounting
  useEffect(() => {
    // Window scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Initial confetti burst
    triggerGrandCelebration();

    // Secondary burst 1.5s later for extra magic
    const timer = setTimeout(() => {
      triggerGrandCelebration();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full romantic-bg overflow-x-hidden pb-16">
      {/* Dynamic Background Effects */}
      <FloatingParticles density="high" />
      {showBalloons && <BalloonAnimation count={18} />}

      {/* Floating Music Controller */}
      <MusicPlayer autoStart={true} />

      {/* Main Container Content */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Step 5: Centerpiece Birthday Cake */}
        <BirthdayCake />

        {/* Step 6: Birthday Wishes & Quotes */}
        <BirthdayWishes />
        <BirthdayQuotes />

        {/* Step 7: Love Letter Section */}
        <LoveLetter />

        {/* Step 8: Additional Surprises & Photo Gallery */}
        <OneMoreSurpriseModal />
        <PhotoGallery />

        {/* Replay Option */}
        <ReplayButton onReplay={onReplay} />
      </main>

      {/* Subtle Bottom Credits */}
      <footer className="relative z-10 text-center py-6 text-xs text-rose-300/40">
        Forever & Always • Happy Birthday My Love ❤️
      </footer>
    </div>
  );
};
