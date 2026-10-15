"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export const BirthdayQuotes: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotate quotes every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % birthdayConfig.quotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % birthdayConfig.quotes.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + birthdayConfig.quotes.length) % birthdayConfig.quotes.length);
  };

  const currentQuote = birthdayConfig.quotes[activeIndex];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-14 relative">
      <div className="relative rounded-3xl romantic-glass-gold p-8 sm:p-12 text-center border border-amber-400/20 overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.1)]">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Large Decorative Quote Icon */}
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
          <Quote className="w-6 h-6 rotate-180" />
        </div>

        {/* Quotes Carousel Content */}
        <div className="min-h-[140px] sm:min-h-[120px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <blockquote className="font-serif-romantic text-xl sm:text-3xl text-amber-100 font-medium italic leading-relaxed sm:leading-loose">
                &ldquo;{currentQuote.quote}&rdquo;
              </blockquote>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-300/70 font-light tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated To You</span>
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Indicators */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-amber-950/60 text-amber-200/60 hover:text-amber-200 border border-amber-400/15 transition-all"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {birthdayConfig.quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                    : "w-2 bg-amber-400/30 hover:bg-amber-400/50"
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-amber-950/60 text-amber-200/60 hover:text-amber-200 border border-amber-400/15 transition-all"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
