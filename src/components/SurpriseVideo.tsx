"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  AlertCircle,
  Sparkles,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { FloatingParticles } from "./FloatingParticles";
import { triggerGrandCelebration } from "@/utils/confetti";

interface SurpriseVideoProps {
  onVideoEnd: () => void;
}

export const SurpriseVideo: React.FC<SurpriseVideoProps> = ({ onVideoEnd }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [needsSoundInteraction, setNeedsSoundInteraction] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("0:00");
  const [durationStr, setDurationStr] = useState<string>("0:00");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCenterIcon, setShowCenterIcon] = useState<"play" | "pause" | null>(null);
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);

  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Sync ambient blurred background video with main video
  const syncBgVideo = useCallback(() => {
    if (bgVideoRef.current && videoRef.current) {
      bgVideoRef.current.currentTime = videoRef.current.currentTime;
      if (videoRef.current.paused) {
        bgVideoRef.current.pause();
      } else {
        bgVideoRef.current.play().catch(() => {});
      }
    }
  }, []);

  // Listen for native fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Attempt playback immediately upon mount (triggered by user enter gesture)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          setIsMuted(false);
          setNeedsSoundInteraction(false);
          syncBgVideo();
        })
        .catch((err) => {
          console.warn("Unmuted autoplay restricted by browser policy:", err);
          video.muted = true;
          setIsMuted(true);
          setNeedsSoundInteraction(true);
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
              syncBgVideo();
            })
            .catch(() => {
              setIsLoading(false);
            });
        });
    }

    return () => {
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, [syncBgVideo]);

  // Auto-hide controls after inactivity while playing
  const handleUserActivity = () => {
    setControlsVisible(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    if (isPlaying && !hasEnded) {
      hideControlsTimerRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3500);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (needsSoundInteraction) {
      video.muted = false;
      setIsMuted(false);
      setNeedsSoundInteraction(false);
    }

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowCenterIcon("play");
          syncBgVideo();
          setTimeout(() => setShowCenterIcon(null), 700);
        })
        .catch(console.error);
    } else {
      video.pause();
      setIsPlaying(false);
      setShowCenterIcon("pause");
      syncBgVideo();
      setTimeout(() => setShowCenterIcon(null), 700);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) {
      setNeedsSoundInteraction(false);
    }
  };

  const toggleFullscreen = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    setProgress(pct);
    setCurrentTimeStr(formatTime(video.currentTime));
    setDurationStr(formatTime(video.duration));
  };

  const handleEnded = () => {
    setHasEnded(true);
    setIsPlaying(false);
    triggerGrandCelebration();
  };

  const handleCelebrateNow = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onVideoEnd();
  };

  const handleError = () => {
    console.warn("Surprise video file could not be loaded at:", birthdayConfig.videoPath);
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleUserActivity}
      onClick={handleUserActivity}
      className="fixed inset-0 z-50 w-screen h-screen bg-black flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Dynamic Ambient Blurred Background for Cinematic Experience */}
      {!hasError && (
        <video
          ref={bgVideoRef}
          src={birthdayConfig.videoPath}
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-125 pointer-events-none transition-opacity duration-1000"
        />
      )}

      {/* Floating Ambient Romantic Particles */}
      <FloatingParticles density="low" />

      {/* Main Video Viewport (Full Screen, High-Fidelity Aspect Ratio Containment) */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 z-30 pointer-events-none">
            <div className="w-14 h-14 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin" />
            <p className="text-sm font-serif-romantic text-rose-200 tracking-wider">
              Opening Your Special Surprise... ✨
            </p>
          </div>
        )}

        {/* Fallback Screen If Missing Video */}
        {hasError ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-8 text-center max-w-md mx-auto flex flex-col items-center justify-center gap-4 rounded-3xl romantic-glass border border-rose-500/30"
          >
            <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="font-serif-romantic text-2xl font-bold text-white">
              Surprise Video Ready
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/70 leading-relaxed">
              Video path set to:
              <br />
              <code className="text-amber-300 bg-rose-950/80 px-2 py-0.5 rounded text-xs mt-1 inline-block">
                {birthdayConfig.videoPath}
              </code>
            </p>
            <button
              onClick={handleCelebrateNow}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all transform active:scale-95"
            >
              <span>Celebrate Now ✨</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={birthdayConfig.videoPath}
            className="w-full h-full max-h-screen object-contain shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            playsInline
            preload="auto"
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => {
              setIsLoading(false);
              setIsPlaying(true);
            }}
            onError={handleError}
          />
        )}

        {/* Big Center Play / Pause Indicator */}
        <AnimatePresence>
          {showCenterIcon && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute pointer-events-none z-25 w-24 h-24 rounded-full bg-rose-600/80 backdrop-blur-md text-white flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.7)]"
            >
              {showCenterIcon === "play" ? (
                <Play className="w-12 h-12 ml-1.5" />
              ) : (
                <Pause className="w-12 h-12" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound Enable Banner / Prompt if browser muted autoplay */}
        {needsSoundInteraction && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 z-40 px-5 py-2.5 rounded-full bg-rose-950/90 border border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.4)] text-amber-200 text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
          >
            <Volume2 className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Tap anywhere to turn on sound 🔊</span>
          </motion.div>
        )}

        {/* Overlay Screen When Video Finishes Playing Fully */}
        <AnimatePresence>
          {hasEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md z-35 flex flex-col items-center justify-center p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 22, stiffness: 260 }}
                className="max-w-md w-full p-8 sm:p-10 rounded-3xl romantic-glass border-2 border-amber-400/50 shadow-[0_0_70px_rgba(244,63,94,0.5)] flex flex-col items-center gap-6"
              >
                {/* Romantic Heart Crest */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-400 flex items-center justify-center shadow-[0_0_35px_rgba(244,63,94,0.7)] animate-bounce" style={{ animationDuration: "3s" }}>
                  <Heart className="w-10 h-10 text-white fill-white" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-white glow-text-gold">
                    Happy Birthday, My Love! 🎂✨
                  </h3>
                  <p className="text-sm sm:text-base text-rose-100/90 font-light leading-relaxed">
                    Now it&apos;s time for your grand celebration — cake, wishes, love letter, and surprises await!
                  </p>
                </div>

                {/* Only Celebrate Now Button */}
                <div className="w-full pt-2">
                  <button
                    onClick={handleCelebrateNow}
                    className="group relative w-full py-4 px-8 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-semibold text-lg shadow-[0_0_35px_rgba(244,63,94,0.6)] transition-all duration-300 transform hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3 animate-pulse-glow"
                  >
                    <span>Celebrate Now</span>
                    <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Top Control Bar */}
      <AnimatePresence>
        {controlsVisible && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-auto"
          >
            {/* Title Badge */}
            <div className="flex items-center gap-2 text-rose-200 text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-500/30">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
              <span className="font-serif-romantic tracking-wider">
                A Sweet Surprise For You ❤️
              </span>
            </div>

            {/* Top Right Actions (Only Sound & Fullscreen - No Skip) */}
            <div className="flex items-center gap-2.5">
              {/* Sound Toggle */}
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-rose-200 hover:text-white border border-rose-500/30 transition-all hover:scale-105"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300" />
                )}
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-rose-200 hover:text-white border border-rose-500/30 transition-all hover:scale-105"
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                title={isFullscreen ? "Exit Fullscreen" : "Full Screen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Control Bar */}
      <AnimatePresence>
        {controlsVisible && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 z-40 px-4 sm:px-8 pb-5 pt-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3 pointer-events-auto"
          >
            {/* Visual Progress Bar (Clean display-only indicator) */}
            <div className="relative w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-rose-200/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>

                <span className="font-mono text-xs text-rose-200/70 tracking-wider">
                  {currentTimeStr} / {durationStr}
                </span>
              </div>

              <span className="text-xs text-rose-300/70 font-serif-romantic tracking-wide">
                Watching your special birthday message ❤️
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
