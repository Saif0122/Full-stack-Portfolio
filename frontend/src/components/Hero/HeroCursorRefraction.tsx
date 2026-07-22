"use client";

import React, { useEffect, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import { useReducedMotionCheck } from '@/animations/hooks/useReducedMotionCheck';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const HeroCursorRefraction: React.FC = () => {
  const { shouldReduceMotion } = useReducedMotionCheck();
  const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(0, 245, 255, 0.12), rgba(59, 130, 246, 0.04), transparent 75%)`;

  useEffect(() => {
    if (!isClient || shouldReduceMotion) return;

    // Set initial center position right after mount
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 3);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient, shouldReduceMotion, mouseX, mouseY]);

  if (!isClient) return null;

  if (shouldReduceMotion) {
    return (
      <div 
        className="absolute inset-0 pointer-events-none z-[2] overflow-hidden"
        style={{
          background: 'radial-gradient(700px circle at 50% 40%, rgba(0, 245, 255, 0.1), rgba(59, 130, 246, 0.05), transparent 80%)'
        }}
      />
    );
  }

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[2] overflow-hidden"
      style={{ background }}
    />
  );
};
