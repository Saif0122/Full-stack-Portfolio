"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionCheck } from '../hooks/useReducedMotionCheck';

interface ParallaxLayerProps {
  children: React.ReactNode;
  offset?: number; // Distance in pixels to shift during scroll (e.g., 40 or -40)
  className?: string;
}

/**
 * ParallaxLayer
 * Scroll-driven layered depth wrapper that translates elements relative to scroll position.
 * Automatically disables motion if WCAG reduced-motion is active.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  offset = 40,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useReducedMotionCheck();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={containerRef} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
