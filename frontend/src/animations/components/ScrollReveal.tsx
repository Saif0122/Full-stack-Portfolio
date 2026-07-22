"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { scrollRevealVariants, staggerContainerVariants } from '../presets/motionPresets';
import { useReducedMotionCheck } from '../hooks/useReducedMotionCheck';

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
  viewportMargin?: string;
  once?: boolean;
  className?: string;
}

/**
 * ScrollReveal
 * Reusable viewport reveal wrapper supporting directional slide/scale, staggering,
 * and automatic WCAG AA reduced-motion fallback.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  stagger = false,
  staggerDelay = 0.1,
  viewportMargin = '-60px',
  once = true,
  className = '',
  ...props
}) => {
  const { shouldReduceMotion } = useReducedMotionCheck();

  if (stagger) {
    return (
      <motion.div
        custom={staggerDelay}
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: viewportMargin }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : scrollRevealVariants;

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
