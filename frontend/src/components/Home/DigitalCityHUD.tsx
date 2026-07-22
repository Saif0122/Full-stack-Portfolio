"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DigitalCityHUDProps {
  activeDestination: number;
  isAutoTour: boolean;
  onToggleAutoTour: () => void;
  onJumpToDestination?: (index: number) => void;
}

const destinations = [
  { id: 1, name: 'DEVELOPER STUDIO', subtitle: 'Where Ideas Become Reality', altitude: '950m' },
  { id: 2, name: 'AI LABORATORY', subtitle: 'Engineering Intelligence', altitude: '720m' },
  { id: 3, name: 'PROJECT VAULT', subtitle: 'Ideas Turned Into Products', altitude: '480m' },
  { id: 4, name: 'INNOVATION CENTER', subtitle: 'Building for Scale', altitude: '240m' },
  { id: 5, name: 'COMMAND HUB', subtitle: "Let's Build the Future Together", altitude: '3200m' },
];

/**
 * DigitalCityHUD
 * Cybernetic Heads-Up Display positioned inside our Scroll to Explore centerpiece section.
 * Provides live altitude/destination telemetry, quick-jump destination matrix buttons (`01` to `05`),
 * and the `⚡ CINEMATIC AUTOPILOT TOUR` toggle.
 */
export const DigitalCityHUD: React.FC<DigitalCityHUDProps> = ({
  activeDestination = 1,
  isAutoTour,
  onToggleAutoTour,
  onJumpToDestination,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const currentInfo = destinations.find((d) => d.id === activeDestination) || destinations[0];

  const handleJump = (id: number) => {
    if (isAutoTour) onToggleAutoTour();
    if (onJumpToDestination) {
      onJumpToDestination(id);
    }
  };

  return (
    <div className="absolute bottom-6 right-6 z-40 pointer-events-auto flex flex-col items-end gap-3 font-mono">
      {/* Expanded Destination Matrix Control Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="p-5 rounded-2xl bg-[#0A0F1D]/95 border border-primary/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,245,255,0.25)] w-72 md:w-80 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/10 text-[10px] text-gray-400 uppercase tracking-widest">
              <span>EXPLORATION FLIGHT PATH</span>
              <span className="text-primary font-bold">● 60 FPS OPTIMAL</span>
            </div>

            <div className="space-y-1.5">
              {destinations.map((dest) => {
                const isActive = dest.id === activeDestination;
                return (
                  <button
                    key={dest.id}
                    onClick={() => handleJump(dest.id)}
                    className={`w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between transition-all border ${
                      isActive
                        ? 'bg-primary/20 border-primary text-primary font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                        : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-primary animate-ping' : 'bg-gray-600'
                        }`}
                      />
                      <div>
                        <div className="text-xs tracking-wider font-bold">
                          0{dest.id} {dest.name}
                        </div>
                        <div className="text-[9px] text-gray-400 font-sans tracking-normal">
                          {dest.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono ml-2">{dest.altitude}</span>
                  </button>
                );
              })}
            </div>

            {/* Cinematic Auto Tour Action Toggle inside Panel */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                onClick={onToggleAutoTour}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${
                  isAutoTour
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse'
                    : 'bg-primary/10 text-primary border-primary/50 hover:bg-primary hover:text-black shadow-[0_0_15px_rgba(0,245,255,0.15)]'
                }`}
              >
                <span>{isAutoTour ? '⚡ AUTOPILOT ENGAGED (CLICK TO CANCEL)' : '⚡ CINEMATIC AUTOPILOT TOUR'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main HUD Bar Pill */}
      <div className="flex items-center gap-2 bg-[#0A0F1D]/85 border border-primary/40 backdrop-blur-md px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
        {/* Quick Scene Jump Dots */}
        <div className="hidden sm:flex items-center gap-1.5 mr-2 pr-2 border-r border-white/10">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => handleJump(dest.id)}
              title={`Jump to Destination 0${dest.id}: ${dest.name}`}
              className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                dest.id === activeDestination
                  ? 'bg-primary text-black shadow-[0_0_12px_#00F5FF] scale-110'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
              }`}
            >
              0{dest.id}
            </button>
          ))}
        </div>

        {/* Current Active Destination Status */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 text-left group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <div>
            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">
              DESTINATION 0{currentInfo.id} / 05 • {currentInfo.altitude}
            </div>
            <div className="text-xs font-bold text-white group-hover:text-primary transition-colors tracking-tight">
              {currentInfo.name}
            </div>
          </div>
          <svg
            className={`w-4 h-4 text-primary transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Quick Action Auto-Tour Toggle Icon */}
        <button
          onClick={onToggleAutoTour}
          title={isAutoTour ? 'Cancel Autopilot Tour' : 'Start Cinematic Autopilot Tour'}
          className={`ml-2 p-2 rounded-full transition-all border ${
            isAutoTour
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse'
              : 'bg-white/5 border-primary/30 text-primary hover:bg-primary hover:text-black'
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
