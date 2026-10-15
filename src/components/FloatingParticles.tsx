"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";

interface ParticleProps {
  density?: "low" | "medium" | "high";
}

export const FloatingParticles: React.FC<ParticleProps> = ({
  density = "medium",
}) => {
  const baseId = useId();
  const heartCount = density === "low" ? 8 : density === "medium" ? 14 : 20;
  const starCount = density === "low" ? 15 : density === "medium" ? 28 : 40;

  // Stable pseudo-random data to prevent hydration mismatches
  const hearts = Array.from({ length: heartCount }, (_, i) => {
    const left = ((i * 17 + 7) % 95) + 2;
    const duration = 12 + ((i * 3.7) % 10);
    const delay = (i * 1.3) % 8;
    const size = 14 + ((i * 5) % 16);
    const opacity = 0.25 + ((i * 0.05) % 0.35);
    return { id: `${baseId}-heart-${i}`, left, duration, delay, size, opacity };
  });

  const stars = Array.from({ length: starCount }, (_, i) => {
    const left = ((i * 23 + 11) % 96) + 2;
    const top = ((i * 31 + 5) % 94) + 2;
    const size = 2 + ((i * 2) % 4);
    const duration = 2 + ((i * 0.7) % 3);
    const delay = (i * 0.4) % 4;
    return { id: `${baseId}-star-${i}`, left, top, size, duration, delay };
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Soft Ambient Light Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-amber-500/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[140px]" />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-amber-100 shadow-[0_0_8px_#fde68a]"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Glowing Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-[-50px] text-rose-400 select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            filter: "drop-shadow(0 0 8px rgba(244,63,94,0.4))",
          }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, 15, -15, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
