"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Feather } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export const LoveLetter: React.FC = () => {
  const letter = birthdayConfig.loveLetter;

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 sm:py-20 relative">
      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/50 border border-rose-500/20 text-rose-300 text-xs sm:text-sm font-medium mb-3"
        >
          <Mail className="w-4 h-4 text-rose-400" />
          <span>Strictly Confidential & Full of Love</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-romantic text-3xl sm:text-4xl font-bold text-white glow-text-rose"
        >
          {letter.title}
        </motion.h2>
      </div>

      {/* The Romantic Letter Envelope & Parchment Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12 romantic-glass border-2 border-rose-400/30 shadow-[0_12px_45px_rgba(244,63,94,0.15)]"
      >
        {/* Soft Parchment Warm Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 via-amber-500/5 to-transparent pointer-events-none" />

        {/* Vintage Decorative Corner Filigrees */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-rose-400/40 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose-400/40 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-rose-400/40 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose-400/40 rounded-br-lg pointer-events-none" />

        {/* Wax Seal Medallion */}
        <div className="flex justify-center -mt-2 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-800 via-rose-600 to-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.6)] border-2 border-rose-300/40">
            <Heart className="w-7 h-7 text-rose-100 fill-rose-100/30" />
          </div>
        </div>

        {/* Letter Greeting */}
        <div className="mb-6">
          <h3 className="font-handwriting-romantic text-3xl sm:text-4xl text-rose-300 font-bold tracking-wide">
            {letter.greeting}
          </h3>
        </div>

        {/* Letter Body Paragraphs */}
        <div className="space-y-4 text-rose-100/90 font-light text-base sm:text-lg leading-relaxed sm:leading-loose">
          {letter.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Letter Closing & Signature */}
        <div className="mt-8 pt-6 border-t border-rose-500/20">
          <p className="text-rose-200 font-medium text-base sm:text-lg mb-4">
            {letter.closing}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-rose-300/60 font-light">
              <Feather className="w-4 h-4 text-rose-400" />
              <span>Written with genuine devotion</span>
            </div>

            <div className="text-right">
              <span className="block text-xs text-rose-300/70">{letter.signature}</span>
              <span className="font-handwriting-romantic text-2xl sm:text-3xl text-amber-300 font-bold">
                {birthdayConfig.senderName}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
