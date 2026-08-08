'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, ConfirmDialog } from '@/components/admin/ui';
import { motion } from 'framer-motion';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';

interface MediaAsset {
  _id: string;
  originalName: string;
  folder: string;
  size: number;
  mimetype: string;
  url: string;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [selectedBucket, setSelectedBucket] = useState<string>('All');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: () => adminService.fetch('/media')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.delete('/media', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast('Asset deleted successfully', 'success');
      setConfirmDelete(null);
    },
    onError: () => toast('Failed to delete asset', 'error')
  });

  const buckets = ['All', 'Images', 'Videos', 'Documents', 'Project Assets', 'Store Assets', 'Blog Assets', 'Profile Images'];

  const filteredAssets = selectedBucket === 'All' ? assets : assets.filter((a: MediaAsset) => a.folder === selectedBucket || (selectedBucket === 'Images' && a.mimetype.includes('image')) || (selectedBucket === 'Videos' && a.mimetype.includes('video')));

  const handleUploadClick = () => {
    // In a real app, this would open a file picker or upload dialog
    // For now, we simulate an upload success via a POST request if backend supports it, or just a toast
    setIsUploading(true);
    setTimeout(() => {
      toast('Upload UI would open here. Ready for implementation.', 'success');
      setIsUploading(false);
    }, 500);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 block mb-1">CDN & Storage Hub</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Enterprise Media Library</h1>
        </div>
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl shadow-purple-500/20 transition-all hover:scale-105 disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : '↑ Upload New CDN Asset'}
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
            {b}
          </button>
        ))}
      </div>

      {/* Asset Grid */}
      {isLoading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {filteredAssets.map((asset: MediaAsset) => (
            <motion.div
              key={asset._id}
              whileHover={{ y: -4 }}
              className="p-5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="w-full h-32 rounded-2xl bg-black/60 border border-white/5 flex flex-col items-center justify-center p-4 text-center mb-4 overflow-hidden relative">
                  <div className="text-2xl mb-2 font-mono">
                    {asset.mimetype.includes('image') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={asset.url} alt={asset.originalName} className="w-full h-full object-cover absolute inset-0 opacity-80" />
                    ) : asset.mimetype.includes('video') ? '🎬' : asset.mimetype.includes('zip') ? '📦' : '📄'}
                  </div>
                  {!asset.mimetype.includes('image') && (
                    <span className="text-[10px] font-mono text-indigo-400 max-w-full truncate px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20 relative z-10">
                      {asset.folder || 'Root'}
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-bold text-white truncate mb-1 font-mono" title={asset.originalName}>{asset.originalName}</h3>
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span>{formatSize(asset.size)}</span>
                  <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => { navigator.clipboard.writeText(asset.url); toast('Asset URL copied to clipboard!', 'success'); }}
                  className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 font-bold underline"
                >
                  Copy URL
                </button>
                <button
                  onClick={() => setConfirmDelete(asset._id)}
                  className="text-rose-400 hover:text-rose-300 text-xs font-mono px-2 py-1 rounded hover:bg-rose-500/10"
                  title="Delete Asset"
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Media Asset"
        message="Are you sure you want to delete this asset? If it's being used in a post or product, it will break the link."
        onConfirm={() => { if (confirmDelete) deleteMutation.mutate(confirmDelete); }}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
