import React from 'react';

export default function Loading() {
  return (
    <div className="pt-48 pb-24 min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-8 text-xs font-mono font-black uppercase tracking-[0.4em] text-primary animate-pulse">
        Fetching Product Catalog...
      </p>
    </div>
  );
}
