import { Variants, Transition } from 'framer-motion';

type CubicBezier = [number, number, number, number];

export const easings: Record<string, CubicBezier> = {
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],
};

export const springSlow: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 15,
  mass: 1,
};

export const springMedium: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

export const springMagnetic: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

/**
 * Reusable Variants
 */
export const scrollRevealVariants: Variants = {
  hidden: (direction: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up') => ({
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    scale: direction === 'scale' ? 0.9 : 1,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.easeOutQuart,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay = 0.1) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  }),
};

export const glowPulseVariants: Variants = {
  initial: { opacity: 0.3, scale: 0.98 },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [0.98, 1.02, 0.98],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const cardHoverVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.015,
    transition: springMedium,
  },
};
