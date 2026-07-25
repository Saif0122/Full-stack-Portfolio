'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06060A] flex items-center justify-center font-mono text-sm text-indigo-400">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
        <span>Redirecting to Enterprise Command Center...</span>
      </div>
    </div>
  );
}
