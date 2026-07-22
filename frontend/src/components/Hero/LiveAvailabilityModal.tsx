"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MagneticButtonWrapper } from '@/animations';

interface LiveAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveAvailabilityModal: React.FC<LiveAvailabilityModalProps> = ({ isOpen, onClose }) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer / Modal Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-md bg-[#0A0F1C] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,245,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                    Capacity Status: Active
                  </span>
                  <h3 className="text-white font-bold text-lg tracking-tight">SLA & Live Telemetry</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 font-sans">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <span className="text-emerald-400 font-bold block mb-1">Available for Immediate Onboarding</span>
                <p className="text-gray-300 font-light leading-relaxed">
                  Currently accepting enterprise consulting, senior full-stack contracts, and complex MERN/Next.js SaaS builds.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest block mb-1">
                    Response SLA
                  </span>
                  <span className="text-white font-black text-xl block">&lt; 2 Hours</span>
                  <span className="text-gray-500 text-[11px]">Via email / direct chat</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest block mb-1">
                    Current Time
                  </span>
                  <span className="text-primary font-mono font-bold text-sm block mt-1">
                    {localTime || 'Synchronizing...'}
                  </span>
                  <span className="text-gray-500 text-[11px]">Real-time system clock</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest block mb-1">
                    Sprint Setup
                  </span>
                  <span className="text-white font-black text-xl block">24 - 48h</span>
                  <span className="text-gray-500 text-[11px]">Architecture brief to code</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest block mb-1">
                    Code Quality
                  </span>
                  <span className="text-white font-black text-xl block">95+ score</span>
                  <span className="text-gray-500 text-[11px]">Lighthouse &amp; WCAG AA</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest block mb-3">
                  Core Engagement SLA Benchmarks
                </span>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Clean Architecture with zero technical debt guarantees</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Strict TypeScript mode &amp; automated CI/CD checks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Weekly sprint demos &amp; transparent GitHub commit history</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row gap-3">
              <MagneticButtonWrapper strength={0.15} className="flex-1">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="w-full text-center py-3.5 px-6 rounded-xl bg-primary text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] block"
                >
                  Schedule Sync Call
                </Link>
              </MagneticButtonWrapper>
              <button
                onClick={onClose}
                className="py-3.5 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-center"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
