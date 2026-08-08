'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';

export default function BlogAnalyticsPage() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => adminService.fetch('/posts')
  });

  const totalViews = posts.reduce((sum: number, post: any) => sum + (post.views || 0), 0);
  const totalLikes = posts.reduce((sum: number, post: any) => sum + (post.likes?.length || 0), 0);
  const publishedCount = posts.filter((p: any) => p.status === 'published').length;
  const draftCount = posts.filter((p: any) => p.status === 'draft').length;

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-pink-400 block mb-1">Tech Lab Analytics</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Blog Performance</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-8">
          {/* Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
              <div className="text-gray-400 font-mono text-xs uppercase mb-2">Total Views</div>
              <div className="text-4xl font-black text-white">{totalViews.toLocaleString()}</div>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
              <div className="text-gray-400 font-mono text-xs uppercase mb-2">Total Engagements (Likes)</div>
              <div className="text-4xl font-black text-emerald-400">{totalLikes.toLocaleString()}</div>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
              <div className="text-gray-400 font-mono text-xs uppercase mb-2">Published Articles</div>
              <div className="text-4xl font-black text-indigo-400">{publishedCount}</div>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
              <div className="text-gray-400 font-mono text-xs uppercase mb-2">Drafts & Scheduled</div>
              <div className="text-4xl font-black text-amber-400">{draftCount}</div>
            </div>
          </div>

          {/* Top Performing Articles */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Top Performing Articles</h2>
            <div className="space-y-4">
              {posts.sort((a: any, b: any) => (b.views || 0) - (a.views || 0)).slice(0, 5).map((post: any, index: number) => (
                <div key={post.id || post._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{post.title}</h3>
                      <p className="text-xs text-gray-400 font-mono mt-1">{post.category} • {post.readTime || '5 min'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{post.views?.toLocaleString() || 0}</div>
                      <div className="text-[10px] font-mono uppercase text-gray-500">Views</div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-bold text-pink-400">{post.likes?.length || 0}</div>
                      <div className="text-[10px] font-mono uppercase text-gray-500">Likes</div>
                    </div>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm font-mono">No articles published yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
