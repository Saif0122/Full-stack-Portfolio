"use client";

import { useReducedMotion, Transition } from 'framer-motion';

/**
 * useReducedMotionCheck
 * Reusable hook checking user WCAG AA reduced-motion preferences.
 * Returns safe transitions and flags so motion never induces discomfort or dizziness.
 */
export function useReducedMotionCheck() {
  const shouldReduceMotion = useReducedMotion();

  const getSafeTransition = (
    normalTransition: Transition,
    reducedTransition: Transition = { duration: 0.15 }
  ): Transition => {
    return shouldReduceMotion ? reducedTransition : normalTransition;
  };

  return {
    shouldReduceMotion: Boolean(shouldReduceMotion),
    getSafeTransition,
  };
}
