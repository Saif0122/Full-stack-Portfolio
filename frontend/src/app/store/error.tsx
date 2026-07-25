"use client";

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Store Error:', error);
  }, [error]);

  return (
    <div className="pt-48 pb-24 min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-8 border border-rose-500/20">
        <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Catalog Offline</h2>
      <p className="text-gray-400 font-light text-lg mb-10 max-w-md">
        Unable to retrieve the product catalog from the CMS.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-widest border border-white/10 rounded-2xl transition-all hover:scale-105"
      >
        Retry Catalog Fetch
      </button>
    </div>
  );
}
