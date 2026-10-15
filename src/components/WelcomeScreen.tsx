"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { FloatingParticles } from "./FloatingParticles";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterClick = async () => {
    if (isEntering) return;
    setIsEntering(true);
    // Request native fullscreen on this user gesture if available
    try {
      if (document.documentElement && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {
      // Gracefully continue if user's browser restricts automatic fullscreen
    }
    onEnter();
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden romantic-bg">
      {/* Background Ambience */}
      <FloatingParticles density="high" />

      {/* Decorative Top Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs sm:text-sm tracking-widest uppercase font-medium shadow-[0_0_15px_rgba(244,63,94,0.15)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
        <span>Today Is Dedicated To You</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
      </motion.div>

      {/* Center Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 max-w-xl w-full text-center p-6 sm:p-10 rounded-3xl romantic-glass relative"
      >
        {/* Glowing Corner Accents */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-amber-400/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-amber-400/40 rounded-br-xl pointer-events-none" />

        {/* Floating Heart Icon Crest */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-400 p-[2px] shadow-[0_0_30px_rgba(244,63,94,0.5)] flex items-center justify-center"
        >
          <div className="w-full h-full rounded-full bg-[#140410] flex items-center justify-center">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400 fill-rose-500/30" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="font-serif-romantic text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight glow-text-rose"
        >
          {birthdayConfig.welcomeHeading}
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-rose-100/80 text-base sm:text-lg max-w-md mx-auto mb-8 sm:mb-10 font-light leading-relaxed"
        >
          {birthdayConfig.welcomeSupportingText}
        </motion.p>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="flex justify-center"
        >
          <button
            id="enter-surprise-btn"
            onClick={handleEnterClick}
            disabled={isEntering}
            className="group relative inline-flex items-center justify-center px-9 py-4 text-lg sm:text-xl font-semibold text-white rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all duration-300 transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed animate-pulse-glow"
            aria-label="Enter romantic birthday surprise"
          >
            {/* Shimmer Border */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/40 via-pink-400/40 to-rose-400/40 blur-[2px] -z-10 group-hover:blur-md transition-all duration-300" />
            
            <span className="flex items-center gap-3">
              <span>{isEntering ? "Unveiling..." : birthdayConfig.enterButtonText}</span>
              <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>

        {/* Gentle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 text-xs text-rose-300/60 font-light tracking-wide"
        >
          Turn on your sound for the most magical experience 🎧✨
        </motion.p>
      </motion.div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="z-10 mt-8 text-center text-xs text-rose-200/40 tracking-wider"
      >
        Created with endless love • Just for you
      </motion.div>
    </main>
  );
};
