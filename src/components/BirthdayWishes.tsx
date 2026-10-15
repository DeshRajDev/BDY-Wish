"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Heart, Sun, Infinity as InfinityIcon } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-300" />,
  Star: <Star className="w-5 h-5 text-yellow-300" />,
  Heart: <Heart className="w-5 h-5 text-rose-400 fill-rose-500/20" />,
  Sun: <Sun className="w-5 h-5 text-amber-400" />,
  Infinity: <InfinityIcon className="w-5 h-5 text-pink-400" />,
};

export const BirthdayWishes: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-20 relative">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-950/40 border border-rose-500/20 text-xs sm:text-sm text-rose-300 font-medium mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Heartfelt Blessings For You</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-romantic text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight glow-text-rose"
        >
          {birthdayConfig.mainTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-rose-100/80 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          {birthdayConfig.mainSubtitle}
        </motion.p>
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {birthdayConfig.wishes.map((wish, index) => {
          const isFifth = index === 4;
          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`p-6 sm:p-7 rounded-2xl romantic-glass relative group overflow-hidden flex flex-col justify-between ${
                isFifth ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 group-hover:bg-rose-500/20 rounded-full blur-2xl transition-all duration-500" />

              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/20 text-xs text-rose-300 font-medium">
                    {wish.icon && iconMap[wish.icon]}
                    <span>{wish.tag}</span>
                  </div>
                  <span className="font-serif-romantic text-rose-500/40 text-xl font-bold group-hover:text-rose-400/80 transition-colors">
                    0{wish.id}
                  </span>
                </div>

                {/* Wish Content */}
                <p className="text-rose-100/90 text-base leading-relaxed font-light">
                  &ldquo;{wish.text}&rdquo;
                </p>
              </div>

              {/* Bottom Decorative Shimmer Line */}
              <div className="mt-6 pt-4 border-t border-rose-500/15 flex items-center justify-between text-xs text-rose-300/50">
                <span>With Endless Love</span>
                <Heart className="w-3.5 h-3.5 text-rose-400/40 group-hover:text-rose-400 group-hover:fill-rose-400/30 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
