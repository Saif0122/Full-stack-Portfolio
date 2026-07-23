"use client";

import React from 'react';
import { TechItem } from '@/types/project';

interface TechBadgeProps {
  tech: TechItem;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  return (
    <div className="flex flex-col gap-1 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group cursor-default">
      <div className="flex items-center justify-between">
        <span className="text-white font-bold text-sm group-hover:text-primary transition-colors">
          {tech.name}
        </span>
        {tech.version && (
          <span className="text-[9px] font-mono text-gray-500 bg-black/50 px-1.5 py-0.5 rounded border border-white/5">
            v{tech.version}
          </span>
        )}
      </div>
      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
        {tech.category}
      </span>
      <p className="text-gray-400 text-xs font-light mt-1">
        {tech.benefit}
      </p>
    </div>
  );
};
