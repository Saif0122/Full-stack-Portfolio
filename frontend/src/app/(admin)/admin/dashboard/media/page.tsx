'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { motion } from 'framer-motion';

interface MediaAsset {
  id: string;
  name: string;
  bucket: 'Images' | 'Videos' | 'Documents' | 'Project Assets' | 'Store Assets' | 'Blog Assets' | 'Profile Images';
  size: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export default function MediaLibraryPage() {
  const [selectedBucket, setSelectedBucket] = useState<string>('All');
  const [assets, setAssets] = useState<MediaAsset[]>([
    { id: '1', name: 'hero-ai-3d-sphere.webp', bucket: 'Images', size: '240 KB', type: 'image/webp', url: '/images/hero-3d.webp', uploadedAt: '2026-07-24' },
    { id: '2', name: 'saif-pro-avatar.jpg', bucket: 'Profile Images', size: '118 KB', type: 'image/jpeg', url: '/images/avatar.jpg', uploadedAt: '2026-07-20' },
    { id: '3', name: 'store-starter-pack-v2.4.zip', bucket: 'Store Assets', size: '14.8 MB', type: 'application/zip', url: '/downloads/store-pack.zip', uploadedAt: '2026-07-18' },
    { id: '4', name: 'architecture-diagram-system.png', bucket: 'Blog Assets', size: '480 KB', type: 'image/png', url: '/images/diagram.png', uploadedAt: '2026-07-15' },
    { id: '5', name: 'saiful-islam-architect-resume.pdf', bucket: 'Documents', size: '1.2 MB', type: 'application/pdf', url: '/resume.pdf', uploadedAt: '2026-07-10' },
    { id: '6', name: 'project-threejs-preview.mp4', bucket: 'Videos', size: '6.4 MB', type: 'video/mp4', url: '/videos/preview.mp4', uploadedAt: '2026-07-05' }
  ]);

  const buckets = ['All', 'Images', 'Videos', 'Documents', 'Project Assets', 'Store Assets', 'Blog Assets', 'Profile Images'];

  const filteredAssets = selectedBucket === 'All' ? assets : assets.filter(a => a.bucket === selectedBucket);

  const handleUploadSimulation = () => {
    const fileName = `enterprise_asset_${Math.floor(Math.random() * 899 + 100)}.webp`;
    setAssets(prev => [
      { id: Date.now().toString(), name: fileName, bucket: 'Images', size: '194 KB', type: 'image/webp', url: `/cdn/${fileName}`, uploadedAt: 'Just now' },
      ...prev
    ]);
    alert(`Successfully verified & uploaded asset [${fileName}] to distributed storage!`);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 block mb-1">CDN & Storage Hub</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Enterprise Media Library</h1>
        </div>
        <button
          onClick={handleUploadSimulation}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-purple-500/20 transition-all hover:scale-105"
        >
          ↑ Upload New CDN Asset
        </button>
      </div>

      {/* Buckets Filter Stream */}
      <div className="flex flex-wrap gap-2 pb-4">
        {buckets.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBucket(b)}
            className={`px-4 py-2 rounded-2xl font-mono text-xs transition-all ${
              selectedBucket === b ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
            }`}
          >
            {b} {b !== 'All' ? `(${assets.filter(a => a.bucket === b).length})` : `(${assets.length})`}
          </button>
        ))}
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
        {filteredAssets.map((asset) => (
          <motion.div
            key={asset.id}
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between group transition-all"
          >
            <div>
              <div className="w-full h-32 rounded-2xl bg-black/60 border border-white/5 flex flex-col items-center justify-center p-4 text-center mb-4 overflow-hidden relative">
                <div className="text-2xl mb-2 font-mono">
                  {asset.type.includes('image') ? '🖼️' : asset.type.includes('video') ? '🎬' : asset.type.includes('zip') ? '📦' : '📄'}
                </div>
                <span className="text-[10px] font-mono text-indigo-400 max-w-full truncate px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                  {asset.bucket}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white truncate mb-1 font-mono" title={asset.name}>{asset.name}</h3>
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>{asset.size}</span>
                <span>{asset.uploadedAt}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => { navigator.clipboard.writeText(`https://cdn.saiful-ai-portfolio.dev${asset.url}`); alert('CDN asset URI copied to clipboard!'); }}
                className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 font-bold underline"
              >
                Copy CDN URI
              </button>
              <button
                onClick={() => { setAssets(prev => prev.filter(a => a.id !== asset.id)); }}
                className="text-rose-400 hover:text-rose-300 text-xs font-mono px-2 py-1 rounded hover:bg-rose-500/10"
                title="Delete Asset"
              >
                🗑️
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}
