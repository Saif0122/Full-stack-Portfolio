"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  role?: string;
  title?: string;
  company?: string;
  school?: string;
  points?: string[];
  desc?: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  year, 
  role, 
  title, 
  company, 
  school, 
  points, 
  desc, 
  index 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const heading = role || title;
  const subHeading = company || school;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="pl-12 relative group"
    >
      {/* Active Milestone Indicator */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_#00F5FF]"
      />
      {/* Outer Glow dot on hover */}
      <div className="absolute left-[-9px] top-[4px] w-[18px] h-[18px] rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{year}</span>
        {subHeading && (
          <span className="text-primary font-black uppercase text-[10px] tracking-widest px-3 py-1 bg-primary/10 rounded-full border border-primary/20 group-hover:bg-primary/20 transition-colors">
            {subHeading}
          </span>
        )}
      </div>
      
      {heading && (
        <h3 className="text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-primary transition-colors duration-300">
          {heading}
        </h3>
      )}
      
      {points && (
        <ul className="space-y-4">
          {points.map((p, j) => (
            <li key={j} className="text-gray-400 font-light text-sm flex gap-4 hover:text-gray-200 transition-colors">
              <span className="text-primary/50 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary group-hover:shadow-[0_0_8px_#00F5FF] transition-all"></span>
              {p}
            </li>
          ))}
        </ul>
      )}
      
      {desc && (
        <p className="text-gray-500 text-sm font-light leading-relaxed mt-4">
          {desc}
        </p>
      )}
    </motion.div>
  );
};

export default TimelineItem;
