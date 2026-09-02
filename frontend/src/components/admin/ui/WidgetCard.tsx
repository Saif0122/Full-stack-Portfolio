'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WidgetCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  colorScheme?: 'indigo' | 'emerald' | 'cyan' | 'amber' | 'pink' | 'purple' | 'rose';
  className?: string;
  children?: React.ReactNode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
  colorScheme = 'indigo',
  className = '',
  children
}) => {
  const colorMap = {
    indigo: 'from-indigo-500/10 to-transparent border-indigo-500/20 text-indigo-400 hover:border-indigo-500/40 shadow-indigo-500/5',
    emerald: 'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40 shadow-emerald-500/5',
    cyan: 'from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40 shadow-cyan-500/5',
    amber: 'from-amber-500/10 to-transparent border-amber-500/20 text-amber-400 hover:border-amber-500/40 shadow-amber-500/5',
    pink: 'from-pink-500/10 to-transparent border-pink-500/20 text-pink-400 hover:border-pink-500/40 shadow-pink-500/5',
    purple: 'from-purple-500/10 to-transparent border-purple-500/20 text-purple-400 hover:border-purple-500/40 shadow-purple-500/5',
    rose: 'from-rose-500/10 to-transparent border-rose-500/20 text-rose-400 hover:border-rose-500/40 shadow-rose-500/5',
  };

  const selectedColor = colorMap[colorScheme] || colorMap.indigo;

  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`p-6 rounded-3xl bg-gradient-to-br ${selectedColor} bg-white/[0.02] border backdrop-blur-xl shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Subtle 3D background light reflection */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/[0.03] blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-gray-400 font-mono text-xs font-semibold uppercase tracking-wider block truncate">
            {title}
          </span>
          {icon && <span className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-sm">{icon}</span>}
        </div>

        <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans">
            {value}
          </p>
          {trend && (
            <span
              className={`inline-flex items-center text-xs font-mono px-2 py-0.5 rounded-full border ${
                trendPositive
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              }`}
            >
              {trendPositive ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>

        {subtitle && <p className="text-xs text-gray-500 font-mono mt-2">{subtitle}</p>}
      </div>

      {children && <div className="mt-6 pt-4 border-t border-white/5">{children}</div>}
    </motion.div>
  );
};
