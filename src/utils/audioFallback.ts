/**
 * Gentle Music Box Synthesizer (Web Audio API)
 * Plays a warm, dreamy "Happy Birthday" melody as a sweet music box fallback
 * if the local MP3 file has not yet been placed in public/audio/
 */

class MusicBoxPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: NodeJS.Timeout | null = null;
  private gainNode: GainNode | null = null;

  // Happy Birthday notes and durations in beats
  // Frequency helper:
  // C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, B4 = 493.88
  // C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46
  private melody = [
    { note: 261.63, dur: 0.75 }, // C4
    { note: 261.63, dur: 0.25 }, // C4
    { note: 293.66, dur: 1.0 },  // D4
    { note: 261.63, dur: 1.0 },  // C4
    { note: 349.23, dur: 1.0 },  // F4
    { note: 329.63, dur: 2.0 },  // E4

    { note: 261.63, dur: 0.75 }, // C4
    { note: 261.63, dur: 0.25 }, // C4
    { note: 293.66, dur: 1.0 },  // D4
    { note: 261.63, dur: 1.0 },  // C4
    { note: 392.0, dur: 1.0 },   // G4
    { note: 349.23, dur: 2.0 },  // F4

    { note: 261.63, dur: 0.75 }, // C4
    { note: 261.63, dur: 0.25 }, // C4
    { note: 523.25, dur: 1.0 },  // C5
    { note: 440.0, dur: 1.0 },   // A4
    { note: 349.23, dur: 1.0 },  // F4
    { note: 329.63, dur: 1.0 },  // E4
    { note: 293.66, dur: 2.0 },  // D4

    { note: 466.16, dur: 0.75 }, // Bb4
    { note: 466.16, dur: 0.25 }, // Bb4
    { note: 440.0, dur: 1.0 },   // A4
    { note: 349.23, dur: 1.0 },  // F4
    { note: 392.0, dur: 1.0 },   // G4
    { note: 349.23, dur: 2.5 },  // F4
  ];

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, durationSec: number, startTime: number) {
    if (!this.ctx || !this.gainNode) return;

    // Primary bell tone (sine)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    // Soft chime overtone (triangle)
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    overtone.type = "triangle";
    overtone.frequency.setValueAtTime(freq * 2, startTime);

    // Bell envelope: sharp attack, gentle logarithmic decay
    oscGain.gain.setValueAtTime(0, startTime);
    oscGain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec * 1.1);

    overtoneGain.gain.setValueAtTime(0, startTime);
    overtoneGain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec * 0.8);

    osc.connect(oscGain);
    overtone.connect(overtoneGain);
    oscGain.connect(this.gainNode);
    overtoneGain.connect(this.gainNode);

    osc.start(startTime);
    overtone.start(startTime);

    osc.stop(startTime + durationSec * 1.2);
    overtone.stop(startTime + durationSec * 1.2);
  }

  public play() {
    this.initContext();
    if (!this.ctx || this.isPlaying) return;

    this.isPlaying = true;
    const tempo = 0.55; // seconds per beat

    const playSequence = () => {
      if (!this.isPlaying || !this.ctx) return;
      let currentTime = this.ctx.currentTime + 0.05;

      for (const item of this.melody) {
        const dur = item.dur * tempo;
        this.playTone(item.note, dur, currentTime);
        currentTime += dur;
      }

      // Loop after full tune + brief rest
      const totalDuration = currentTime - this.ctx.currentTime;
      this.timer = setTimeout(() => {
        if (this.isPlaying) {
          playSequence();
        }
      }, (totalDuration + 1.5) * 1000);
    };

    playSequence();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.gainNode) {
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public setVolume(volume: number) {
    if (this.ctx && this.gainNode) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.25)), this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicBox = new MusicBoxPlayer();
