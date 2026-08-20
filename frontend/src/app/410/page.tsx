import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/helpers';

export const metadata: Metadata = generatePageMetadata({
  title: '410 - Content Removed',
  description: 'This content has been permanently removed.',
  path: '/410',
});

export default function Gone() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-orange-600 mb-6 tracking-tighter">
        410
      </h1>
      <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">Content Removed</h2>
      <p className="text-gray-400 mb-10 max-w-md text-center">
        The resource you requested has been permanently removed and is no longer available.
      </p>
      <Link href="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
