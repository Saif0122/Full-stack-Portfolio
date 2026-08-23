'use client';
import Link from 'next/link';
import { Sparkles, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function MediaAiAssistant() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="text-purple-500" /> AI Media Assistant
          </h1>
          <p className="text-gray-400 mt-2">Generate missing alt texts, captions, and accessibility suggestions via Google Gemini.</p>
        </div>
        <Link href="/admin/dashboard/seo/media" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
          Back to Dashboard
        </Link>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-8 text-center text-gray-500">
        <ImageIcon className="mx-auto mb-4 opacity-50" size={48} />
        <h3 className="text-xl font-bold text-white mb-2">Media Intelligence Queue</h3>
        <p>This module processes images in the background using Gemini Vision to suggest accessibility and SEO improvements.</p>
        <p className="mt-4">Integration coming soon.</p>
      </Card>
    </div>
  );
}
