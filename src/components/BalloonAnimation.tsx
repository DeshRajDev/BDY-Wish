"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";

interface BalloonProps {
  count?: number;
}

const BALLOON_PALETTE = [
  { bg: "linear-gradient(135deg, #ff758f 0%, #c9184a 100%)", glow: "rgba(255, 117, 143, 0.4)" },
  { bg: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)", glow: "rgba(251, 191, 36, 0.4)" },
  { bg: "linear-gradient(135deg, #f472b6 0%, #db2777 100%)", glow: "rgba(244, 114, 182, 0.4)" },
  { bg: "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)", glow: "rgba(254, 205, 211, 0.4)" },
  { bg: "linear-gradient(135deg, #e11d48 0%, #881337 100%)", glow: "rgba(225, 29, 72, 0.4)" },
  { bg: "linear-gradient(135deg, #fef08a 0%, #ca8a04 100%)", glow: "rgba(254, 240, 138, 0.4)" },
];

export const BalloonAnimation: React.FC<BalloonProps> = ({ count = 16 }) => {
  const baseId = useId();

  // Pre-calculated deterministic values for balloons
  const balloons = Array.from({ length: count }, (_, i) => {
    const color = BALLOON_PALETTE[i % BALLOON_PALETTE.length];
    const left = ((i * 19 + 5) % 90) + 3; // percentage
    const size = 48 + ((i * 7) % 24); // px width
    const height = Math.round(size * 1.25);
    const duration = 10 + ((i * 2.3) % 7); // seconds
    const delay = (i * 0.45) % 5;
    const swayDistance = 15 + ((i * 4) % 20);

    return {
      id: `${baseId}-balloon-${i}`,
      color,
      left,
      size,
      height,
      duration,
      delay,
      swayDistance,
    };
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute flex flex-col items-center"
          style={{
            left: `${b.left}%`,
            bottom: "-120px",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "-130vh"],
            x: [0, b.swayDistance, -b.swayDistance, 0],
            rotate: [0, 4, -4, 0],
            opacity: [0, 0.95, 0.95, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Balloon Body */}
          <div
            className="relative rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg"
            style={{
              width: `${b.size}px`,
              height: `${b.height}px`,
              background: b.color.bg,
              boxShadow: `0 8px 24px ${b.color.glow}, inset -4px -4px 10px rgba(0,0,0,0.25), inset 6px 6px 12px rgba(255,255,255,0.4)`,
            }}
          >
            {/* Shimmer Highlight */}
            <div className="absolute top-2 left-3 w-3 h-6 bg-white/45 rounded-full blur-[1px] transform -rotate-25" />

            {/* Balloon Knot */}
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2 rounded-[2px]"
              style={{ background: b.color.bg }}
            />
          </div>

          {/* Balloon String */}
          <svg width="20" height="70" className="opacity-60 overflow-visible">
            <path
              d="M 10 0 Q 15 20, 8 40 T 12 70"
              fill="none"
              stroke="#fb7185"
              strokeWidth="1.2"
              strokeDasharray="2,2"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
