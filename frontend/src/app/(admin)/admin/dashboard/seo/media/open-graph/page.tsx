'use client';
import Link from 'next/link';
import { Share2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function OpenGraphManager() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Share2 className="text-blue-500" /> Open Graph Assets
          </h1>
          <p className="text-gray-400 mt-2">Manage social sharing images and fallbacks.</p>
        </div>
        <Link href="/admin/dashboard/seo/media" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
          Back to Dashboard
        </Link>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-8 text-center text-gray-500">
        <Share2 className="mx-auto mb-4 opacity-50" size={48} />
        <h3 className="text-xl font-bold text-white mb-2">Open Graph Manager</h3>
        <p>This module allows you to preview and generate 1200x630 fallback images for Facebook, Twitter, and LinkedIn.</p>
        <p className="mt-4">Integration coming soon.</p>
      </Card>
    </div>
  );
}
