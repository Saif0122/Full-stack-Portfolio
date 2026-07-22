
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const levels = [
  { id: 'context', name: 'Context', desc: 'System users and external dependencies' },
  { id: 'container', name: 'Container', desc: 'Applications and data stores' },
  { id: 'component', name: 'Component', desc: 'Internal modular breakdown' },
];

export const ArchitectureVisualizer: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState('context');

  return (
    <section className="py-24 bg-[#070B14] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">System Design</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">C4 Architecture Model</h2>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {levels.map(level => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  activeLevel === level.id ? 'bg-primary text-black' : 'text-gray-500 hover:text-white'
                }`}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold text-white mb-4">
              {levels.find(l => l.id === activeLevel)?.name} Diagram
            </h3>
            <p className="text-gray-400 font-light leading-relaxed mb-8">
              {levels.find(l => l.id === activeLevel)?.desc}
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border-l-2 border-primary rounded-r-xl">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Benefit</p>
                <p className="text-sm text-white">Visualizes high-level interactions and API boundaries.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-background border border-white/10 rounded-[2.5rem] p-12 aspect-video flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00F5FF10_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full h-full flex items-center justify-center"
              >
                {/* SVG Mockup of C4 Diagrams */}
                <svg viewBox="0 0 800 400" className="w-full h-full text-primary">
                  {activeLevel === 'context' && (
                    <g>
                      <rect x="350" y="150" width="100" height="100" rx="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                      <text x="400" y="205" textAnchor="middle" fill="white" className="text-[14px] font-bold">Nexus System</text>
                      <circle cx="100" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                      <text x="100" y="260" textAnchor="middle" fill="gray" className="text-[10px] uppercase">User</text>
                      <line x1="140" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrow)" />
                    </g>
                  )}
                  {activeLevel === 'container' && (
                    <g>
                      <rect x="100" y="100" width="180" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                      <text x="190" y="145" textAnchor="middle" fill="white" className="text-[12px]">Web Application (React)</text>
                      <rect x="520" y="100" width="180" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                      <text x="610" y="145" textAnchor="middle" fill="white" className="text-[12px]">API Service (Node.js)</text>
                      <path d="M280 140 H520" stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="4" />
                    </g>
                  )}
                  {activeLevel === 'component' && (
                    <g>
                      <rect x="300" y="50" width="200" height="300" rx="20" fill="none" stroke="white" strokeOpacity="0.1" />
                      <rect x="330" y="80" width="140" height="40" rx="4" fill="#00F5FF20" stroke="currentColor" />
                      <text x="400" y="105" textAnchor="middle" fill="white" className="text-[10px]">Auth Controller</text>
                      <rect x="330" y="140" width="140" height="40" rx="4" fill="#00F5FF20" stroke="currentColor" />
                      <text x="400" y="165" textAnchor="middle" fill="white" className="text-[10px]">Data Streamer</text>
                    </g>
                  )}
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
