"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Future integration: enable analytics/ads scripts here if needed dynamically
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
    // Future integration: disable or restrict tracking scripts
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-[#0A0F1C]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-6 pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Privacy & Cookies
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                We use cookies to improve your experience, analyze site usage, and ensure security. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                <a href="/privacy-policy" className="text-primary hover:underline ml-1">
                  Read Privacy Policy
                </a>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-colors text-sm"
              >
                Essential Only
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 rounded-lg bg-primary text-black font-bold hover:scale-105 active:scale-95 transition-all text-sm shadow-[0_0_15px_rgba(0,245,255,0.3)]"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
