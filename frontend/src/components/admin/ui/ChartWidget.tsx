'use client';

import React from 'react';

interface ChartWidgetProps {
  type: 'line' | 'bar' | 'donut' | 'gauge';
  data: number[];
  labels: string[];
  title?: string;
  color?: string; // 'indigo' | 'emerald' | 'amber' | 'pink'
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({
  type,
  data,
  labels,
  title,
  color = 'indigo'
}) => {
  const maxVal = Math.max(...data, 1);

  const getColorClass = () => {
    switch (color) {
      case 'emerald': return 'from-emerald-500/40 via-emerald-500/20 to-transparent stroke-emerald-400 text-emerald-400 bg-emerald-500';
      case 'amber': return 'from-amber-500/40 via-amber-500/20 to-transparent stroke-amber-400 text-amber-400 bg-amber-500';
      case 'pink': return 'from-pink-500/40 via-pink-500/20 to-transparent stroke-pink-400 text-pink-400 bg-pink-500';
      default: return 'from-indigo-500/40 via-purple-500/20 to-transparent stroke-indigo-400 text-indigo-400 bg-indigo-500';
    }
  };

  const theme = getColorClass();

  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between h-full">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">{title}</span>
          <span className="w-2 h-2 rounded-full bg-current animate-ping" />
        </div>
      )}

      {/* Bar Chart Visualization */}
      {type === 'bar' && (
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-3 h-40 pt-4">
            {data.map((val, idx) => {
              const heightPct = Math.round((val / maxVal) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex-1 flex items-end bg-white/[0.02] rounded-xl overflow-hidden p-0.5">
                    <div
                      style={{ height: `${Math.max(heightPct, 8)}%` }}
                      className={`w-full rounded-lg bg-gradient-to-t ${theme} transition-all duration-500 group-hover:brightness-125 shadow-lg`}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase truncate max-w-[48px]">
                    {labels[idx] || `#${idx + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Line & Trend Area Chart Simulation via SVG Bezier Path */}
      {type === 'line' && (
        <div className="relative h-44 w-full flex flex-col justify-end">
          <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad_${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Generate polyline path points */}
            <path
              d={(() => {
                if (data.length === 0) return 'M0,100 L300,100';
                const step = 300 / Math.max(data.length - 1, 1);
                const points = data.map((v, i) => `${i * step},${100 - (v / maxVal) * 80}`);
                return `M0,100 L${points[0]} L${points.join(' L')} L300,100 Z`;
              })()}
              fill={`url(#grad_${color})`}
              className={`text-${color}-400 opacity-60`}
            />
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={theme}
              points={(() => {
                if (data.length === 0) return '';
                const step = 300 / Math.max(data.length - 1, 1);
                return data.map((v, i) => `${i * step},${100 - (v / maxVal) * 80}`).join(' ');
              })()}
            />
          </svg>
          <div className="flex justify-between text-[10px] font-mono text-gray-500 pt-2 border-t border-white/10">
            <span>{labels[0] || 'Start'}</span>
            <span>{labels[Math.floor(labels.length / 2)] || 'Mid'}</span>
            <span>{labels[labels.length - 1] || 'Current'}</span>
          </div>
        </div>
      )}

      {/* Gauge / Progress Donut */}
      {(type === 'gauge' || type === 'donut') && (
        <div className="flex items-center justify-around py-4">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={theme}
                strokeDasharray={`${Math.min(100, Math.round((data[0] || 0) / (maxVal || 100) * 100))}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-lg font-black text-white block font-mono">{data[0] || 0}%</span>
              <span className="text-[9px] font-mono text-gray-400 uppercase">Optimal</span>
            </div>
          </div>
          <div className="space-y-2">
            {labels.map((lbl, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-gray-300">{lbl}:</span>
                <span className="font-bold text-white">{data[i] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
