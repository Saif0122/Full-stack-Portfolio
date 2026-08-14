'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

interface AnalyticsContextType {
  track: (event: string, properties?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const sessionId = useRef<string | null>(null);
  const visitorId = useRef<string | null>(null);
  const sessionStartTime = useRef<number>(Date.now());

  useEffect(() => {
    // Initialize session and visitor IDs
    if (!visitorId.current) {
      let storedVisitorId = localStorage.getItem('visitor_id');
      if (!storedVisitorId) {
        storedVisitorId = uuidv4();
        localStorage.setItem('visitor_id', storedVisitorId);
      }
      visitorId.current = storedVisitorId;
    }

    if (!sessionId.current) {
      let storedSessionId = sessionStorage.getItem('session_id');
      if (!storedSessionId) {
        storedSessionId = uuidv4();
        sessionStorage.setItem('session_id', storedSessionId);
      }
      sessionId.current = storedSessionId;
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (!sessionId.current || !visitorId.current) return;
    
    trackEvent('page_view', { path: pathname });
  }, [pathname]);

  // End session on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!sessionId.current) return;
      const duration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      
      // Use sendBeacon for reliable delivery before unload
      const data = JSON.stringify({
        sessionId: sessionId.current,
        exitPage: pathname,
        duration,
      });
      
      try {
        navigator.sendBeacon('http://localhost:5000/api/analytics/session/end', new Blob([data], { type: 'application/json' }));
      } catch (e) {
        // Fallback or ignore
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  const trackEvent = async (event: string, properties: Record<string, any> = {}) => {
    try {
      await axios.post('http://localhost:5000/api/analytics/track', {
        sessionId: sessionId.current,
        visitorId: visitorId.current,
        event,
        ...properties,
        // Common dimensions
        device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
        source: document.referrer || 'direct',
      });
    } catch (error) {
      // Fail silently to avoid interrupting UX
      console.error('Analytics error:', error);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ track: trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
