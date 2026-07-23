"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#070B14]">
      {/* Top Right Orb */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -50, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px]"
      />
      
      {/* Bottom Left Orb */}
      <motion.div 
        animate={{ 
          x: [0, -30, 0], 
          y: [0, 30, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[150px]"
      />
      
      {/* Center Subtle Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[30%] w-[60vw] h-[30vw] rounded-full bg-primary/5 blur-[150px] transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default AmbientBackground;
