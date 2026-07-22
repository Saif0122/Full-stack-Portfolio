"use client";

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from './AuthProvider';
import { ToastProvider } from './ToastProvider';
import { ModalProvider } from './ModalProvider';
import { GlobalErrorBoundary } from '../components/ErrorBoundary/GlobalErrorBoundary';

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
 */
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
};
