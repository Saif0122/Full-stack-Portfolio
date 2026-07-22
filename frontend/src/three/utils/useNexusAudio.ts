"use client";

import { useState, useCallback, useRef } from 'react';

/**
 * useNexusAudio
 * Ultra-lightweight Web Audio API synthesizer generating subtle, Vercel/Raycast-style
 * mechanical clicks and low-frequency overdrive hums.
 * Muted by default to respect quiet enterprise UX standards.
 */
export function useNexusAudio() {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playTierClick = useCallback(() => {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio API blocked or unavailable
    }
  }, [isSoundEnabled, getAudioContext]);

  const playOverdriveSound = useCallback((active: boolean) => {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = active ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(active ? 150 : 400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(active ? 520 : 100, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio API blocked or unavailable
    }
  }, [isSoundEnabled, getAudioContext]);

  return {
    isSoundEnabled,
    setIsSoundEnabled,
    playTierClick,
    playOverdriveSound,
  };
}
