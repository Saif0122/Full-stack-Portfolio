"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 2000);

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="relative">
            {/* Background Glow */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.3 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"
            />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center text-4xl md:text-6xl font-black tracking-tighter"
            >
              <span className="text-white">saif</span>
              <span className="text-primary">.code</span>
              
              {/* Shimmer Effect */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />
            </motion.div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
