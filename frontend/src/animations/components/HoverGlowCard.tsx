"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotionCheck } from '../hooks/useReducedMotionCheck';

interface HoverGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableTilt?: boolean;
  enableExtrusion?: boolean;
  enableSparkBorder?: boolean;
}

/**
 * HoverGlowCard
 * Glassmorphic card container featuring a cursor-following radial spotlight glow,
 * dynamic border lighting, 3D Z-axis extrusion physics, and high-voltage perimeter spark borders.
 */
export const HoverGlowCard: React.FC<HoverGlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 245, 255, 0.15)',
  enableTilt = true,
  enableExtrusion = false,
  enableSparkBorder = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { shouldReduceMotion } = useReducedMotionCheck();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const extrudeZ = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (enableTilt && !shouldReduceMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -6; // max 6 deg tilt
      const tiltY = ((x - centerX) / centerX) * 6;
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (enableExtrusion && !shouldReduceMotion) {
      extrudeZ.set(36); // extrude 36px forward toward user eyes
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    extrudeZ.set(0);
  };

  const backgroundGlow = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;
  const borderGlow = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(0, 245, 255, 0.4), transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-[2rem] transition-colors duration-300 ${className}`}
    >
      {/* Spotlight Border Layer */}
      <motion.div
        className="absolute -inset-[1px] rounded-[2rem] pointer-events-none opacity-0 transition-opacity duration-300 z-0"
        style={{
          background: borderGlow,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Spotlight Inner Background Layer */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 transition-opacity duration-300 z-0 overflow-hidden"
        style={{
          background: backgroundGlow,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* High-Voltage Laser Spark Border Layer */}
      {enableSparkBorder && (
        <div className="absolute inset-0 rounded-[2rem] pointer-events-none overflow-hidden z-20">
          <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="30"
              fill="none"
              stroke="#00F5FF"
              strokeWidth="2.5"
              strokeDasharray="140 400"
              className={`transition-opacity duration-500 ${isHovered ? 'opacity-100 animate-[dash-pulse_2.5s_linear_infinite]' : 'opacity-0'}`}
              style={{
                filter: 'drop-shadow(0 0 8px #00F5FF) drop-shadow(0 0 16px #3B82F6)',
              }}
            />
          </svg>
        </div>
      )}

      {/* Card Content Layer with 3D Z-Axis Extrusion */}
      <motion.div
        className="relative z-10 h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          translateZ: enableExtrusion ? extrudeZ : 0,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
