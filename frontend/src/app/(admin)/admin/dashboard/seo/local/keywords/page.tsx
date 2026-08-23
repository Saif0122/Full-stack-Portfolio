'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { Map, Search, ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Link from 'next/link';

export default function LocalKeywordsManagerPage() {
  const { data: keywords, isLoading } = useQuery({
    queryKey: ['local-seo-keywords'],
    queryFn: () => adminService.fetch('/local-seo/keywords').then(res => res.data as any[])
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  const filtered = keywords?.filter((kw: any) => 
    kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kw.city?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/dashboard/seo/local" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400">Search Visibility</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Local Keyword Tracker</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search keywords or cities..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-sm font-semibold rounded-lg text-white transition-colors">
          + Add Local Keyword
        </button>
      </div>

      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Keyword</th>
                <th className="p-4 font-semibold">Geo-Target</th>
                <th className="p-4 font-semibold">Rank</th>
                <th className="p-4 font-semibold">Trend</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((kw: any, idx: number) => (
                <tr key={idx} className="text-gray-300 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    {kw.keyword}
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {kw.city || kw.region || kw.country || 'Global'}
                  </td>
                  <td className="p-4">
                     <span className="text-xl font-black text-white">{kw.currentRank || '-'}</span>
                  </td>
                  <td className="p-4">
                    {kw.rankTrend === 'up' && <TrendingUp size={20} className="text-emerald-500" />}
                    {kw.rankTrend === 'down' && <TrendingDown size={20} className="text-red-500" />}
                    {kw.rankTrend === 'stable' && <Minus size={20} className="text-gray-500" />}
                    {kw.rankTrend === 'new' && <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">New</span>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      kw.optimizationStatus === 'optimized' ? 'bg-emerald-500/10 text-emerald-400' :
                      kw.optimizationStatus === 'needs-improvement' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {kw.optimizationStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No local keywords found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
