"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { extractPageContext } from '@/lib/ai/context-extractor';

interface AIContextType {
  pageContext: any;
  isAIWidgetOpen: boolean;
  toggleAIWidget: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIContextProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [pageContext, setPageContext] = useState<any>(null);
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false);

  useEffect(() => {
    // Whenever the route changes, re-extract the context
    // We use a short timeout to let the DOM render the new page content
    const timeout = setTimeout(() => {
      setPageContext(extractPageContext());
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const toggleAIWidget = () => setIsAIWidgetOpen(!isAIWidgetOpen);

  return (
    <AIContext.Provider value={{ pageContext, isAIWidgetOpen, toggleAIWidget }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAIContext must be used within an AIContextProvider');
  }
  return context;
}
