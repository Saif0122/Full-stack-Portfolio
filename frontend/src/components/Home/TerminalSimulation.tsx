import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeLines = [
  { text: "ssh saiful@ai-server-01", delay: 0.5 },
  { text: "Connecting to 192.168.1.100...", delay: 1.0 },
  { text: "Authenticating using public key...", delay: 1.5 },
  { text: "Access Granted. Welcome to MERN-Core-V9.", delay: 2.0, color: "text-emerald-400" },
  { text: "Initializing Kubernetes cluster...", delay: 2.5 },
  { text: "Scaling API pods [=====>  ] 75%", delay: 3.5 },
  { text: "Database connection established to MongoDB Atlas.", delay: 4.0, color: "text-primary" },
  { text: "Starting Next.js production build...", delay: 4.5 },
  { text: "Deployment successful. All systems operational.", delay: 5.5, color: "text-emerald-400" },
];

export const TerminalSimulation: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    codeLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, index + 1));
      }, line.delay * 1000);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,245,255,0.1)] border border-white/10 bg-[#070B14]/80 backdrop-blur-md"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs font-mono text-gray-400">saiful@open-ai-server:~</div>
        <div className="flex gap-2 items-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] uppercase text-emerald-400 tracking-widest">Live</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm leading-relaxed text-gray-300 min-h-[250px]">
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-1 ${line.color || ''}`}
          >
            <span className="text-gray-500 mr-2">$</span>
            {line.text}
          </motion.div>
        ))}
        {visibleLines < codeLines.length && (
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-primary ml-2 align-middle mt-1"
          />
        )}
      </div>
    </motion.div>
  );
};
