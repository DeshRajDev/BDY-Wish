"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { musicBox } from "@/utils/audioFallback";

interface MusicPlayerProps {
  autoStart?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = true }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [blockedAutoplay, setBlockedAutoplay] = useState<boolean>(false);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // Play audio safely with fallback to Web Audio Music Box
  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setBlockedAutoplay(false);
          setUsingFallback(false);
        })
        .catch((err) => {
          console.warn("Audio play prevented or audio file missing:", err);
          // Try music box synthesizer fallback
          try {
            musicBox.play();
            musicBox.setVolume(volume);
            setIsPlaying(true);
            setUsingFallback(true);
            setBlockedAutoplay(false);
          } catch (e) {
            console.warn("Music box fallback could not start:", e);
            setBlockedAutoplay(true);
          }
        });
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (autoStart) {
      startAudio();
    }
    return () => {
      if (audio) {
        audio.pause();
      }
      musicBox.stop();
    };
  }, [autoStart, startAudio]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      musicBox.stop();
      setIsPlaying(false);
    } else {
      if (usingFallback) {
        musicBox.play();
        musicBox.setVolume(volume);
        setIsPlaying(true);
      } else {
        startAudio();
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    if (usingFallback) {
      musicBox.setVolume(nextMuted ? 0 : volume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (usingFallback) {
      musicBox.setVolume(isMuted ? 0 : newVol);
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  const handleAudioError = () => {
    console.warn("Audio file missing at:", birthdayConfig.musicPath, "- Switching to romantic music box.");
    setUsingFallback(true);
    if (isPlaying) {
      musicBox.play();
      musicBox.setVolume(volume);
    }
  };

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={birthdayConfig.musicPath}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      {/* Prominent Play Banner if browser blocked initial autoplay */}
      <AnimatePresence>
        {blockedAutoplay && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <button
              onClick={() => {
                startAudio();
                setBlockedAutoplay(false);
              }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-bounce"
            >
              <Music className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
              <span>Play Birthday Music 🎵</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Compact Audio Control Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full romantic-glass border border-rose-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
        role="region"
        aria-label="Birthday music player"
      >
        {/* Equalizer animation bars */}
        <div className="flex items-end gap-[3px] h-4 w-4">
          <motion.span
            className="w-1 bg-rose-400 rounded-full"
            animate={
              isPlaying && !isMuted
                ? { height: ["20%", "100%", "30%", "80%"] }
                : { height: "25%" }
            }
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
          />
          <motion.span
            className="w-1 bg-amber-400 rounded-full"
            animate={
              isPlaying && !isMuted
                ? { height: ["70%", "30%", "100%", "40%"] }
                : { height: "25%" }
            }
            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
          />
          <motion.span
            className="w-1 bg-rose-400 rounded-full"
            animate={
              isPlaying && !isMuted
                ? { height: ["30%", "90%", "40%", "100%"] }
                : { height: "25%" }
            }
            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
          />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-rose-950/70 text-rose-200 hover:text-white transition-colors"
          aria-label={isPlaying ? "Pause birthday song" : "Play birthday song"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-rose-950/70 text-rose-200 hover:text-white transition-colors"
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Volume Slider visible on hover or mobile focus */}
        <div className="hidden sm:flex items-center w-0 overflow-hidden group-hover:w-16 transition-all duration-300">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-rose-950/80 rounded-lg appearance-none cursor-pointer accent-rose-500"
            aria-label="Volume slider"
          />
        </div>

        {/* Current status tooltip */}
        <span className="text-[11px] font-medium text-rose-200/90 pl-1 pr-1 hidden xs:inline">
          {isPlaying ? (usingFallback ? "Music Box 🎵" : "Birthday Tune 🎶") : "Paused"}
        </span>
      </motion.div>
    </>
  );
};
