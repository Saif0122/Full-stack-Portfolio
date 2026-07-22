"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverGlowCard } from '@/animations';

interface FloatingCodeProps {
  code: string;
  className?: string;
  delay?: number;
  explanation?: string;
}

export const FloatingCode: React.FC<FloatingCodeProps> = ({ code, className, delay = 0, explanation }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const getAutoExplanation = (snippet: string) => {
    if (explanation) return explanation;
    if (snippet.includes('FullStackDeveloper')) {
      return 'Instantiates an enterprise-grade MERN architect with strict TypeScript safety and sub-millisecond API response SLAs.';
    }
    if (snippet.includes('Next.js')) {
      return 'Modern edge-optimized tech stack ensuring 95+ Lighthouse performance and distributed Redis data caching.';
    }
    return 'Production-ready code architecture designed for high concurrency and zero technical debt.';
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [0, -18, 0],
        opacity: isHovered ? 1 : 0.85,
        rotate: isHovered ? 0 : [0, 1.5, -1.5, 0]
      }}
      transition={{ 
        duration: isHovered ? 0.3 : 6, 
        repeat: isHovered ? 0 : Infinity, 
        ease: "easeInOut",
        delay: isHovered ? 0 : delay
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
      className={`hidden lg:block absolute z-30 ${className}`}
    >
      <HoverGlowCard 
        enableTilt={!isHovered} 
        glowColor="rgba(0, 245, 255, 0.35)"
        className={`p-4 rounded-2xl backdrop-blur-md bg-[#0A0F1C]/95 border transition-all cursor-pointer ${
          isHovered 
            ? 'border-primary shadow-[0_0_35px_rgba(0,245,255,0.35)] scale-105' 
            : 'border-white/10 shadow-[0_0_20px_rgba(0,245,255,0.08)]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 flex items-center gap-1">
            {copied ? (
              <span className="text-emerald-400 font-bold">✔ Copied!</span>
            ) : (
              <span>⚡ Click to Copy</span>
            )}
          </span>
        </div>

        <pre className="text-[11px] md:text-xs text-primary font-mono [text-shadow:0_0_12px_rgba(0,245,255,0.3)] my-2">
          <code>{code}</code>
        </pre>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10 pt-2 mt-2 text-left max-w-[260px]"
            >
              <div className="text-[9px] font-mono uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span>Why This Matters</span>
              </div>
              <p className="text-[10px] text-gray-300 font-sans font-light leading-relaxed">
                {getAutoExplanation(code)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverGlowCard>
    </motion.div>
  );
};
