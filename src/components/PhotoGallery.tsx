"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Sparkles, X } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { PhotoItem } from "@/types/birthday";

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const gallery = birthdayConfig.photoGallery;

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-20 relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-950/40 border border-rose-500/20 text-xs sm:text-sm text-rose-300 font-medium mb-3"
        >
          <Camera className="w-4 h-4 text-rose-400" />
          <span>Treasured Memories</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-romantic text-3xl sm:text-4xl font-bold text-white glow-text-rose mb-3"
        >
          {gallery.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-rose-200/70 max-w-xl mx-auto font-light"
        >
          {gallery.subtitle}
        </motion.p>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {gallery.photos.map((item, idx) => {
          const hasError = imageErrors[item.id];
          const rotationAngle = idx % 2 === 0 ? -1.5 : 1.5;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.2 } }}
              className="group cursor-pointer rounded-2xl p-3.5 bg-rose-950/30 border border-rose-500/20 romantic-glass flex flex-col shadow-lg"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
              onClick={() => setSelectedPhoto(item)}
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-rose-950/60 border border-rose-500/10 flex items-center justify-center">
                {hasError ? (
                  // Elegant Romantic Placeholder when local file is not yet added
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-rose-950/80 via-purple-950/40 to-black">
                    <Heart className="w-10 h-10 text-rose-400/60 mb-2 fill-rose-500/20 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-serif-romantic text-rose-200/90 font-medium">
                      Special Moment #{item.id}
                    </span>
                    <span className="text-[11px] text-rose-300/50 mt-1 font-light">
                      Add to public/images/
                    </span>
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(item.id)}
                  />
                )}

                {/* Date Tag */}
                {item.date && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-rose-200 font-medium border border-rose-500/20">
                    {item.date}
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="pt-3 px-1 flex items-center justify-between">
                <p className="text-xs sm:text-sm text-rose-100 font-medium truncate">
                  {item.caption}
                </p>
                <Sparkles className="w-3.5 h-3.5 text-amber-300/60 group-hover:text-amber-300 transition-colors flex-shrink-0 ml-2" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-lg w-full rounded-2xl romantic-glass p-4 border border-rose-500/30 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-rose-950/80 text-rose-200 hover:text-white"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-xl overflow-hidden aspect-square bg-black flex items-center justify-center">
                {imageErrors[selectedPhoto.id] ? (
                  <div className="p-8 text-center flex flex-col items-center">
                    <Heart className="w-12 h-12 text-rose-400 mb-3 fill-rose-500/30" />
                    <p className="font-serif-romantic text-lg text-white">
                      {selectedPhoto.caption}
                    </p>
                    <p className="text-xs text-rose-200/60 mt-2">
                      Place your image file at:{" "}
                      <code className="text-amber-300">{selectedPhoto.src}</code>
                    </p>
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="text-base text-rose-100 font-medium">
                  {selectedPhoto.caption}
                </p>
                {selectedPhoto.date && (
                  <p className="text-xs text-amber-300/80 mt-1">
                    {selectedPhoto.date}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
