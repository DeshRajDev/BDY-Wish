"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw, Heart, Sparkles } from "lucide-react";

interface ReplayButtonProps {
  onReplay: () => void;
}

export const ReplayButton: React.FC<ReplayButtonProps> = ({ onReplay }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-16 text-center flex flex-col items-center">
      {/* Animated Hugs & Wishes Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-rose-950/50 border border-rose-500/30 text-rose-200 text-sm sm:text-base font-medium shadow-[0_0_25px_rgba(244,63,94,0.2)] animate-pulse"
      >
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-ping" />
        <span>Sending you a million hugs and wishes ❤️</span>
        <Sparkles className="w-4 h-4 text-amber-300" />
      </motion.div>

      {/* Replay Surprise Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReplay}
        className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 text-rose-200 hover:text-white font-medium text-sm sm:text-base transition-all duration-300 shadow-lg"
        aria-label="Replay the birthday surprise from the start"
      >
        <RotateCcw className="w-4 h-4 text-rose-400" />
        <span>Replay My Surprise</span>
      </motion.button>

      <p className="mt-4 text-xs text-rose-300/50 font-light">
        Start this magical journey over again whenever you want ✨
      </p>
    </div>
  );
};
