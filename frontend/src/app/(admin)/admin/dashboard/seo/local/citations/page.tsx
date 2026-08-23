'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { Globe, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CitationsManagerPage() {
  const { data: citations, isLoading } = useQuery({
    queryKey: ['local-seo-citations'],
    queryFn: () => adminService.fetch('/local-seo/citations').then(res => res.data as any[])
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  const filtered = citations?.filter((cit: any) => 
    cit.platformName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/dashboard/seo/local" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">External Links</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Citation Manager</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search platforms..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-semibold rounded-lg text-white transition-colors">
          + Add Citation
        </button>
      </div>

      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Platform</th>
                <th className="p-4 font-semibold">Listing Status</th>
                <th className="p-4 font-semibold">Verification</th>
                <th className="p-4 font-semibold">NAP Consistency</th>
                <th className="p-4 font-semibold">Last Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((cit: any, idx: number) => (
                <tr key={idx} className="text-gray-300 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    {cit.platformName}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      cit.listingStatus === 'Published' ? 'bg-emerald-500/10 text-emerald-400' :
                      cit.listingStatus === 'Suspended' ? 'bg-red-500/10 text-red-400' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {cit.listingStatus}
                    </span>
                  </td>
                  <td className="p-4">
                     <span className={`px-2 py-1 rounded text-xs font-bold ${
                      cit.verificationStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {cit.verificationStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${cit.napConsistencyScore > 90 ? 'bg-emerald-500' : cit.napConsistencyScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${cit.napConsistencyScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{cit.napConsistencyScore}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(cit.lastCheckedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No citations found.
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
