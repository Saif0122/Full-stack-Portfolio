import React from 'react';

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-6"></div>
      <div className="text-primary font-mono text-sm uppercase tracking-[0.3em] animate-pulse">
        Initializing Architectures...
      </div>
    </div>
  );
}
