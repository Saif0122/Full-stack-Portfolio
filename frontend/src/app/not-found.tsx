import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-600 mb-6 tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">System Offline</h2>
      <p className="text-gray-400 mb-10 max-w-md text-center">
        The route you are looking for has been deprecated, moved, or never existed in the first place.
      </p>
      <Link href="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
