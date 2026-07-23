"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface ImpactCardProps {
  value: string;
  label: string;
  desc: string;
  index: number;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ value, label, desc, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number from value (e.g., '40%' -> 40, '10k+' -> 10, '95+' -> 95)
  const numberMatch = value.match(/\d+/);
  const targetNumber = numberMatch ? parseInt(numberMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const displayValue = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      spring.set(targetNumber);
    }
  }, [isInView, spring, targetNumber]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative p-8 bg-white/5 border border-white/10 rounded-3xl group transition-all duration-500 overflow-hidden hover:border-primary/30"
    >
      {/* Soft Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-4xl font-black text-primary mb-2 flex items-center">
          {targetNumber > 0 ? <motion.span>{displayValue}</motion.span> : <span>{value}</span>}
          {targetNumber > 0 && <span>{suffix}</span>}
        </div>
        <div className="text-white font-bold text-sm uppercase tracking-widest mb-3">{label}</div>
        <p className="text-gray-500 text-xs font-light leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

export default ImpactCard;
