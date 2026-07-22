import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '../ui';

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card border border-rose-500/20 rounded-2xl max-w-lg mx-auto mt-20 text-center">
      <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-400 text-sm mb-8 font-mono bg-black/50 p-4 rounded-lg overflow-auto max-w-full text-left">
        {error.message}
      </p>
      <Button variant="outline" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </div>
  );
};

export const GlobalErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};
