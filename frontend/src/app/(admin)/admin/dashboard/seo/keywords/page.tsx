'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { AlertTriangle, Search, Filter } from 'lucide-react';

export default function KeywordManagerPage() {
  const { data: keywords, isLoading } = useQuery({
    queryKey: ['seo', 'keywords-aggregated'],
    queryFn: () => adminService.fetch('/seo/keywords').then(res => res as any[])
  });

  const [searchTerm, setSearchTerm] = React.useState('');
  const [intentFilter, setIntentFilter] = React.useState('all');

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  const filteredKeywords = keywords?.filter((kw: any) => {
    const matchesSearch = kw.keyword.includes(searchTerm.toLowerCase());
    const matchesIntent = intentFilter === 'all' || kw.intent === intentFilter;
    return matchesSearch && matchesIntent;
  }) || [];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-1">Global SEO</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Keyword Manager</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search keywords..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={intentFilter}
            onChange={e => setIntentFilter(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Intents</option>
            <option value="informational">Informational</option>
            <option value="transactional">Transactional</option>
            <option value="commercial">Commercial</option>
            <option value="navigational">Navigational</option>
          </select>
        </div>
      </div>

      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Keyword</th>
                <th className="p-4 font-semibold">Intent</th>
                <th className="p-4 font-semibold">Difficulty</th>
                <th className="p-4 font-semibold">Usage</th>
                <th className="p-4 font-semibold">Sources</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredKeywords.map((kw: any, idx: number) => (
                <tr key={idx} className="text-gray-300 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-base">{kw.keyword}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold ${
                      kw.intent === 'transactional' ? 'bg-purple-500/10 text-purple-400' :
                      kw.intent === 'commercial' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {kw.intent}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${kw.difficulty > 70 ? 'bg-red-500' : kw.difficulty > 40 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                          style={{ width: `${kw.difficulty}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{kw.difficulty}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-bold bg-gray-800 px-2 py-1 rounded-md text-sm">{kw.usageCount}</span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {kw.sources.map((src: any, i: number) => (
                        <div key={i} className="text-xs flex items-center gap-2">
                          <span className="text-gray-500 w-16">{src.type}</span>
                          <span className="text-gray-300 truncate max-w-[200px]" title={src.title}>{src.title}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {kw.hasCannibalization ? (
                      <span className="inline-flex items-center gap-1 text-red-400 text-xs font-semibold bg-red-500/10 px-2 py-1 rounded">
                        <AlertTriangle size={12} /> Cannibalization Risk
                      </span>
                    ) : (
                      <span className="text-emerald-500 text-xs font-semibold">✓ Optimized</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredKeywords.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No keywords found matching the criteria.
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
