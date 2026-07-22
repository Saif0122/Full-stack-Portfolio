"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { springMagnetic } from '../presets/motionPresets';
import { useReducedMotionCheck } from '../hooks/useReducedMotionCheck';

interface MagneticButtonWrapperProps {
  children: React.ReactNode;
  strength?: number; // How strongly the button pulls toward the cursor (e.g. 0.3)
  className?: string;
}

/**
 * MagneticButtonWrapper
 * Apple/Framer-style magnetic physics wrapper. Smoothly pulls interactive badges and buttons
 * toward the user's cursor when hovered.
 */
export const MagneticButtonWrapper: React.FC<MagneticButtonWrapperProps> = ({
  children,
  strength = 0.25,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { shouldReduceMotion } = useReducedMotionCheck();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={springMagnetic}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
