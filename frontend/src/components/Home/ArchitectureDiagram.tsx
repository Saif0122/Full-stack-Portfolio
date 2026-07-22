import React from 'react';
import { motion } from 'framer-motion';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-20 hidden md:block">
      <div className="absolute inset-0 bg-[#3B82F6]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-12">
        {/* Client Layer */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center relative"
        >
          <span className="text-primary font-mono text-[10px] uppercase tracking-widest mb-1 block">Edge</span>
          <h4 className="text-white font-bold tracking-tight">Client Application</h4>
          <p className="text-gray-500 text-xs">Next.js / React / Vercel Edge</p>
          
          {/* Data Flow Lines Down */}
          <svg className="absolute top-full left-1/2 -translate-x-1/2 w-48 h-12 overflow-visible">
            <motion.path 
              d="M 96 0 L 96 24 L 24 24 L 24 48"
              fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4"
            />
            <motion.path 
              d="M 96 0 L 96 24 L 168 24 L 168 48"
              fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4"
            />
            {/* Animated Pulses */}
            <motion.circle r="3" fill="#00F5FF"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ offsetPath: 'path("M 96 0 L 96 24 L 24 24 L 24 48")' }}
            />
            <motion.circle r="3" fill="#3B82F6"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear", delay: 0.5 }}
              style={{ offsetPath: 'path("M 96 0 L 96 24 L 168 24 L 168 48")' }}
            />
          </svg>
        </motion.div>

        {/* API Layer */}
        <div className="flex gap-20 relative mt-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-8 py-4 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-md text-center w-48 relative"
          >
            <span className="text-primary font-mono text-[10px] uppercase tracking-widest mb-1 block">Service</span>
            <h4 className="text-white font-bold tracking-tight">REST API</h4>
            <p className="text-gray-500 text-xs">Express.js / Node.js</p>
            
            <svg className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-16 overflow-visible">
              <line x1="4" y1="0" x2="4" y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <motion.circle r="3" fill="#00F5FF"
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{ offsetPath: 'path("M 4 0 L 4 64")' }}
              />
            </svg>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-8 py-4 rounded-2xl bg-[#3B82F6]/5 border border-[#3B82F6]/20 backdrop-blur-md text-center w-48 relative"
          >
            <span className="text-[#3B82F6] font-mono text-[10px] uppercase tracking-widest mb-1 block">Service</span>
            <h4 className="text-white font-bold tracking-tight">GraphQL API</h4>
            <p className="text-gray-500 text-xs">Apollo / Node.js</p>

            <svg className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-16 overflow-visible">
              <line x1="4" y1="0" x2="4" y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <motion.circle r="3" fill="#3B82F6"
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                style={{ offsetPath: 'path("M 4 0 L 4 64")' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Database Layer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 px-12 py-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md text-center flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM9 4v16" /></svg>
          </div>
          <div className="text-left">
            <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-1 block">Data Store</span>
            <h4 className="text-white font-bold tracking-tight">MongoDB Atlas Cluster</h4>
            <p className="text-gray-500 text-xs">Distributed NoSQL Database</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
