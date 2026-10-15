"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExperienceState } from "@/types/birthday";
import { WelcomeScreen } from "./WelcomeScreen";
import { SurpriseVideo } from "./SurpriseVideo";
import { BirthdayCelebration } from "./BirthdayCelebration";

export const BirthdayExperience: React.FC = () => {
  const [currentState, setCurrentState] = useState<ExperienceState>("welcome");

  const handleEnter = () => {
    setCurrentState("video");
  };

  const handleVideoEnd = () => {
    setCurrentState("celebration");
  };

  const handleReplay = () => {
    setCurrentState("welcome");
  };

  return (
    <div className="min-h-screen w-full bg-[#080307] text-white">
      <AnimatePresence mode="wait">
        {currentState === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7 }}
          >
            <WelcomeScreen onEnter={handleEnter} />
          </motion.div>
        )}

        {currentState === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
          >
            <SurpriseVideo onVideoEnd={handleVideoEnd} />
          </motion.div>
        )}

        {currentState === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <BirthdayCelebration onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
