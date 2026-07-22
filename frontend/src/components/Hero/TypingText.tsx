"use client";

import React, { useState, useEffect } from 'react';

const words = [
  "MERN Stack Developer",
  "Full Stack Engineer",
  "Performance-Focused Developer",
  "Next.js Specialist"
];

export const TypingText: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 150);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="flex items-center text-primary font-mono text-lg md:text-xl font-medium min-h-[1.5em]">
      <span className="[text-shadow:0_0_15px_rgba(0,245,255,0.5)] transition-all">
        {words[index].substring(0, subIndex)}
      </span>
      <span className="w-2 h-6 md:h-7 bg-primary ml-1 animate-blink shadow-[0_0_10px_#00F5FF]"></span>
    </div>
  );
};
