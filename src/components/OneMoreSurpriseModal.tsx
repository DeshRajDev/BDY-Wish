"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Heart, Sparkles } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { triggerHeartShower } from "@/utils/confetti";

export const OneMoreSurpriseModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const surprise = birthdayConfig.oneMoreSurprise;

  const handleOpen = () => {
    setIsOpen(true);
    triggerHeartShower();
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-semibold text-lg shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all duration-300"
        aria-label="Open one more secret birthday surprise"
      >
        <Gift className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
        <span>{surprise.buttonLabel}</span>
        <Sparkles className="w-5 h-5 text-amber-200" />
      </motion.button>

      {/* Secret Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-3xl romantic-glass-gold border-2 border-amber-400/40 p-6 sm:p-8 z-10 shadow-[0_0_60px_rgba(251,191,36,0.3)] my-auto max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white transition-colors"
                aria-label="Close surprise window"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.6)]">
                <Heart className="w-8 h-8 text-white fill-white/20" />
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-6">
                <h3 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-white mb-2 glow-text-gold">
                  {surprise.modalTitle}
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/80 font-light">
                  {surprise.modalSubtitle}
                </p>
              </div>

              {/* List of Reasons */}
              <div className="space-y-3.5 mb-6">
                {surprise.reasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.1 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/20"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex-shrink-0 flex items-center justify-center text-xs text-rose-300 font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-rose-100/90 leading-relaxed font-light">
                      {reason}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Final Romantic Promise */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-900/40 to-amber-900/30 border border-amber-400/30 text-center">
                <p className="text-sm font-medium text-amber-200 leading-relaxed">
                  &ldquo;{surprise.finalRomanticNote}&rdquo;
                </p>
              </div>

              {/* Close Bottom Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 text-sm font-medium text-rose-200 hover:text-white transition-all"
                >
                  Keep In My Heart Forever ❤️
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
