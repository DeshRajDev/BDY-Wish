"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, RotateCcw, Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { triggerWishSparkles } from "@/utils/confetti";

export const BirthdayCake: React.FC = () => {
  const [isBlownOut, setIsBlownOut] = useState<boolean>(false);
  const [showWishMessage, setShowWishMessage] = useState<boolean>(false);

  const handleMakeWish = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);
    triggerWishSparkles();
    setTimeout(() => {
      setShowWishMessage(true);
    }, 600);
  };

  const handleRelight = () => {
    setIsBlownOut(false);
    setShowWishMessage(false);
    triggerWishSparkles();
  };

  return (
    <section
      aria-label="Birthday Cake Celebration"
      className="relative flex flex-col items-center justify-center py-10 sm:py-16 w-full max-w-2xl mx-auto px-4"
    >
      {/* Background Soft Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Interactive Cake Visual Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Floating Sparkles around cake */}
        <div className="absolute -top-12 -left-8 text-amber-300 animate-pulse pointer-events-none">
          ✨
        </div>
        <div
          className="absolute -top-6 -right-10 text-pink-300 animate-pulse pointer-events-none"
          style={{ animationDelay: "1s" }}
        >
          💖
        </div>
        <div
          className="absolute top-1/3 -right-12 text-amber-200 animate-pulse pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        >
          ✨
        </div>

        {/* The SVG Cake Artwork */}
        <div className="relative w-72 sm:w-84 md:w-96 select-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
          <svg
            viewBox="0 0 320 280"
            className="w-full h-auto overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Frosting Gradients */}
              <linearGradient id="cakePlate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>

              <linearGradient id="tierBottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#be123c" />
                <stop offset="25%" stopColor="#e11d48" />
                <stop offset="70%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>

              <linearGradient id="tierMiddle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>

              <linearGradient id="tierTop" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffe4e6" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fecdd3" />
              </linearGradient>

              <linearGradient id="goldDrip" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              <linearGradient id="candleBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Glowing Plate Stand */}
            <ellipse cx="160" cy="260" rx="145" ry="14" fill="url(#cakePlate)" opacity="0.9" />
            <ellipse cx="160" cy="257" rx="140" ry="12" fill="#2a081a" />
            <ellipse cx="160" cy="256" rx="136" ry="10" fill="#fdf2f8" opacity="0.1" />

            {/* BOTTOM TIER */}
            <path
              d="M 45 200 C 45 200, 45 250, 45 250 C 45 262, 275 262, 275 250 C 275 250, 275 200, 275 200 Z"
              fill="url(#tierBottom)"
            />
            <ellipse cx="160" cy="200" rx="115" ry="18" fill="#fda4af" />
            {/* Scalloped Gold Frosting Drips on Bottom Tier */}
            <path
              d="M 45 204 Q 65 222, 85 204 Q 105 224, 125 204 Q 145 226, 165 204 Q 185 226, 205 204 Q 225 224, 245 204 Q 260 218, 275 204"
              stroke="url(#goldDrip)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* White Cream Pearls */}
            {[60, 95, 130, 165, 200, 235, 260].map((cx, i) => (
              <circle key={i} cx={cx} cy={242} r="3.5" fill="#fff" opacity="0.8" />
            ))}

            {/* MIDDLE TIER */}
            <path
              d="M 75 145 C 75 145, 75 195, 75 195 C 75 206, 245 206, 245 195 C 245 195, 245 145, 245 145 Z"
              fill="url(#tierMiddle)"
            />
            <ellipse cx="160" cy="145" rx="85" ry="14" fill="#fecdd3" />
            {/* Middle Tier Gold Scallops */}
            <path
              d="M 75 148 Q 95 165, 115 148 Q 135 168, 155 148 Q 175 168, 195 148 Q 215 165, 235 148 Q 242 154, 245 148"
              stroke="url(#goldDrip)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Rose buds decoration */}
            {[90, 125, 160, 195, 230].map((cx, i) => (
              <circle key={`rose-${i}`} cx={cx} cy={185} r="3" fill="#ffe4e6" />
            ))}

            {/* TOP TIER */}
            <path
              d="M 105 95 C 105 95, 105 140, 105 140 C 105 150, 215 150, 215 140 C 215 140, 215 95, 215 95 Z"
              fill="url(#tierTop)"
            />
            <ellipse cx="160" cy="95" rx="55" ry="11" fill="#ffffff" />
            {/* Gold crown trim */}
            <path
              d="M 105 98 Q 120 110, 135 98 Q 150 112, 165 98 Q 180 112, 195 98 Q 205 106, 215 98"
              stroke="url(#goldDrip)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* CANDLES CONFIGURATION: 3 Romantic Candles */}
            {/* Left Candle */}
            <g transform="translate(130, 48)">
              {/* Candle Body */}
              <rect x="-3" y="0" width="6" height="42" rx="2" fill="url(#candleBody)" />
              {/* Spiral Stripe */}
              <line x1="-3" y1="10" x2="3" y2="16" stroke="#e11d48" strokeWidth="1.5" />
              <line x1="-3" y1="22" x2="3" y2="28" stroke="#e11d48" strokeWidth="1.5" />
              {/* Wick */}
              <line x1="0" y1="0" x2="0" y2="-6" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Center Candle (Taller) */}
            <g transform="translate(160, 40)">
              {/* Candle Body */}
              <rect x="-3.5" y="0" width="7" height="50" rx="2" fill="url(#candleBody)" />
              {/* Spiral Stripe */}
              <line x1="-3.5" y1="12" x2="3.5" y2="18" stroke="#e11d48" strokeWidth="1.5" />
              <line x1="-3.5" y1="26" x2="3.5" y2="32" stroke="#e11d48" strokeWidth="1.5" />
              {/* Wick */}
              <line x1="0" y1="0" x2="0" y2="-7" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Right Candle */}
            <g transform="translate(190, 48)">
              {/* Candle Body */}
              <rect x="-3" y="0" width="6" height="42" rx="2" fill="url(#candleBody)" />
              {/* Spiral Stripe */}
              <line x1="-3" y1="10" x2="3" y2="16" stroke="#e11d48" strokeWidth="1.5" />
              <line x1="-3" y1="22" x2="3" y2="28" stroke="#e11d48" strokeWidth="1.5" />
              {/* Wick */}
              <line x1="0" y1="0" x2="0" y2="-6" stroke="#451a03" strokeWidth="1.5" />
            </g>
          </svg>

          {/* FLAMES & SMOKE HTML OVERLAYS (Positioned over candle wicks) */}
          {/* Left Candle Flame/Smoke */}
          <div className="absolute top-[3%] left-[38.5%] -translate-x-1/2 pointer-events-none">
            {!isBlownOut ? (
              <div className="candle-flame relative w-5 h-8 flex items-center justify-center">
                <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-[50%_50%_20%_20%] blur-[0.6px]" />
                <div className="absolute bottom-1 w-2.5 h-4 bg-yellow-100 rounded-full blur-[0.4px]" />
                <div className="absolute bottom-0 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[0.5px]" />
              </div>
            ) : (
              <div className="candle-smoke text-white/50 text-xs">💨</div>
            )}
          </div>

          {/* Center Candle Flame/Smoke */}
          <div className="absolute top-[0%] left-[50%] -translate-x-1/2 pointer-events-none">
            {!isBlownOut ? (
              <div
                className="candle-flame relative w-6 h-9 flex items-center justify-center"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-6 h-9 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-100 rounded-[50%_50%_20%_20%] blur-[0.6px]" />
                <div className="absolute bottom-1 w-3 h-5 bg-white rounded-full blur-[0.4px]" />
                <div className="absolute bottom-0 w-2 h-2 bg-blue-400 rounded-full blur-[0.5px]" />
              </div>
            ) : (
              <div className="candle-smoke text-white/50 text-xs">💨</div>
            )}
          </div>

          {/* Right Candle Flame/Smoke */}
          <div className="absolute top-[3%] left-[61.5%] -translate-x-1/2 pointer-events-none">
            {!isBlownOut ? (
              <div
                className="candle-flame relative w-5 h-8 flex items-center justify-center"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-[50%_50%_20%_20%] blur-[0.6px]" />
                <div className="absolute bottom-1 w-2.5 h-4 bg-yellow-100 rounded-full blur-[0.4px]" />
                <div className="absolute bottom-0 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[0.5px]" />
              </div>
            ) : (
              <div className="candle-smoke text-white/50 text-xs">💨</div>
            )}
          </div>
        </div>

        {/* Action Buttons: Make a Wish / Relight */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {!isBlownOut ? (
            <button
              onClick={handleMakeWish}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-semibold text-base sm:text-lg shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all transform active:scale-95 animate-pulse-glow"
              aria-label="Make a wish and blow out birthday candles"
            >
              <Wand2 className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>Make a Wish ✨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/70 hover:bg-rose-900 border border-rose-500/30 text-rose-200 hover:text-white text-sm font-medium transition-all transform active:scale-95 shadow-md"
              aria-label="Light the candles again"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>Light the Candles Again 🕯️</span>
            </button>
          )}

          <p className="text-xs text-rose-300/60 font-light">
            {!isBlownOut
              ? "Close your eyes, make the sweetest wish in your heart, and tap Make a Wish! ✨"
              : "Your wish has been carried to the stars! 🌟"}
          </p>
        </div>
      </motion.div>

      {/* Secret Wish Reveal Modal / Card */}
      <AnimatePresence>
        {showWishMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="mt-6 w-full max-w-lg p-6 rounded-2xl romantic-glass-gold border border-amber-400/30 text-center relative overflow-hidden"
          >
            {/* Shimmer bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400" />
            
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-300">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif-romantic text-lg sm:text-xl font-bold">
                A Wish Sent To Heaven ✨
              </h3>
              <Sparkles className="w-5 h-5" />
            </div>

            <p className="text-sm sm:text-base text-rose-100 font-light leading-relaxed">
              &ldquo;{birthdayConfig.makeAWishSecretMessage}&rdquo;
            </p>

            <div className="mt-3 text-xs text-amber-300/70 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>May all your dreams come true, my love</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
