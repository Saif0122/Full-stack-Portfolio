'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Image as ImageIcon, AlertTriangle, CheckCircle, BarChart } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function MediaSeoDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    images: 0,
    missingAltText: 0,
    duplicateImages: 0,
    overallMediaScore: 0,
    accessibilityScore: 0
  });

  useEffect(() => {
    fetch('/api/media-seo/audit')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="text-pink-500" /> Media & Image SEO
          </h1>
          <p className="text-gray-400 mt-2">Manage and optimize all media assets for accessibility and search performance.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/dashboard/seo/media/library" className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-sm font-semibold rounded-lg text-white transition-colors">
            Media Library
          </Link>
          <Link href="/admin/dashboard/seo/media/open-graph" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
            Open Graph Assets
          </Link>
          <Link href="/admin/dashboard/seo/media/ai" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
            AI Assistant
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="text-sm text-gray-500 mb-2 font-mono flex justify-between">
            Overall Media SEO Score <BarChart size={16} />
          </div>
          <div className={`text-4xl font-black ${stats.overallMediaScore > 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
            {stats.overallMediaScore}/100
          </div>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="text-sm text-gray-500 mb-2 font-mono flex justify-between">
            Accessibility Score <CheckCircle size={16} />
          </div>
          <div className={`text-4xl font-black ${stats.accessibilityScore > 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
            {stats.accessibilityScore}/100
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="text-sm text-gray-500 mb-2 font-mono flex justify-between">
            Missing Alt Text <AlertTriangle size={16} />
          </div>
          <div className="text-4xl font-black text-red-400">
            {stats.missingAltText}
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="text-sm text-gray-500 mb-2 font-mono flex justify-between">
            Duplicates Detected <AlertTriangle size={16} />
          </div>
          <div className="text-4xl font-black text-orange-400">
            {stats.duplicateImages}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <Link href="/admin/dashboard/seo/media/library?filter=missingAlt" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <span className="font-semibold text-white">Fix Missing Alt Text</span>
              <span className="text-pink-400">&rarr;</span>
            </Link>
            <Link href="/admin/dashboard/seo/media/ai" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <span className="font-semibold text-white">Generate with AI Vision</span>
              <span className="text-pink-400">&rarr;</span>
            </Link>
            <Link href="/admin/dashboard/seo/media/library?filter=duplicates" className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <span className="font-semibold text-white">Resolve Duplicates</span>
              <span className="text-pink-400">&rarr;</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
