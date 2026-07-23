"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Metric } from '@/types/project';

interface ProjectMetricsGridProps {
  metrics: Metric[];
}

export const ProjectMetricsGrid: React.FC<ProjectMetricsGridProps> = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((m, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between group hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(0,245,255,0.1)] transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative z-10">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono mb-2">
              {m.label}
            </p>
            <p className="text-3xl font-black text-primary mb-2 tracking-tight group-hover:scale-105 origin-left transition-transform duration-500">
              {m.value}
            </p>
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              {m.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
