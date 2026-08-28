"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin section error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white">
      <div className="max-w-md w-full bg-white/5 border border-rose-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(244,63,94,0.1)] text-center">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Dashboard Error</h2>
        <p className="text-gray-400 text-sm mb-8">
          A critical error occurred while loading this admin section. The technical team has been notified.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="w-full py-4 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/admin/dashboard"
            className="w-full py-4 bg-white/5 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 border border-white/10 transition-colors block text-center"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
