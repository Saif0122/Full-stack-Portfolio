"use client";

import React, { useEffect } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from './AuthProvider';
import { ToastProvider } from './ToastProvider';
import { ModalProvider } from './ModalProvider';
import { GlobalErrorBoundary } from '../components/ErrorBoundary/GlobalErrorBoundary';
import { ReactQueryProvider } from './ReactQueryProvider';
import { AnalyticsProvider } from './AnalyticsProvider';

/**
 * AppProviders — Single wrapper that nests all global providers
 * in the correct order for dependency resolution.
 * 
 * Order matters:
 * 1. GlobalErrorBoundary — Catches top-level render errors
 * 2. ThemeProvider   — Sets CSS class on <html> element
 * 3. AuthProvider    — Session/user state (scaffold)
 * 4. ModalProvider   — Needs to render at root level
 * 5. ToastProvider   — Renders toast stack at root level
 * 6. AnalyticsProvider - Tracks user events and sessions
 */
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Wake up the backend on initial client load (Render free tier sleep prevention)
    const wakeUpBackend = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://full-stack-portfolio-1-m5b1.onrender.com/api';
        const baseUrl = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
        
        // Use no-cors mode to ensure the request is sent even if CORS policies differ
        await fetch(baseUrl || '/', { method: 'GET', mode: 'no-cors' });
      } catch (error) {
        // Silently ignore errors since this is just a wake-up ping
      }
    };
    wakeUpBackend();
  }, []);

  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ReactQueryProvider>
            <AnalyticsProvider>
              <ModalProvider>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </ModalProvider>
            </AnalyticsProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
};
