'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { Building2, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilesManagerPage() {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ['local-seo-profiles'],
    queryFn: () => adminService.fetch('/local-seo/profiles').then(res => res.data as any[])
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  const filtered = profiles?.filter((p: any) => 
    p.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.internalName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/dashboard/seo/local" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400">Business Identity</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Business Profiles & GBP</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search profiles..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold rounded-lg text-white transition-colors">
          + Add Profile
        </button>
      </div>

      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Internal Name</th>
                <th className="p-4 font-semibold">Business Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Contact Info</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Primary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((profile: any, idx: number) => (
                <tr key={idx} className="text-gray-300 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    {profile.internalName}
                  </td>
                  <td className="p-4">
                    {profile.businessName}
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {profile.businessCategory}
                  </td>
                  <td className="p-4">
                    <div className="text-xs text-gray-400">{profile.email || 'No email'}</div>
                    <div className="text-xs text-gray-400">{profile.phone || 'No phone'}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      profile.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' :
                      profile.status === 'Suspended' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {profile.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {profile.isPrimary && (
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">Canonical</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No business profiles found.
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
