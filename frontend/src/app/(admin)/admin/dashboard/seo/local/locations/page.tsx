'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { MapPin, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LocationsManagerPage() {
  const { data: locations, isLoading } = useQuery({
    queryKey: ['local-seo-locations'],
    queryFn: () => adminService.fetch('/local-seo/locations').then(res => res.data as any[])
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  const filtered = locations?.filter((loc: any) => 
    loc.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.city?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/dashboard/seo/local" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400">Geography</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Locations & Service Areas</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search locations..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-sm font-semibold rounded-lg text-white transition-colors">
          + Add Location
        </button>
      </div>

      <Card className="overflow-hidden bg-gray-900 border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Location Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">City/Region</th>
                <th className="p-4 font-semibold">Availability</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((loc: any, idx: number) => (
                <tr key={idx} className="text-gray-300 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    {loc.locationName}
                    <div className="text-xs font-normal text-gray-500">/{loc.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-gray-800 text-xs font-bold text-gray-300">
                      {loc.officeType}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {loc.city ? `${loc.city}, ${loc.country}` : loc.country || 'Global'}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {loc.remoteAvailability && <span className="w-2 h-2 rounded-full bg-purple-500" title="Remote" />}
                      {loc.hybridAvailability && <span className="w-2 h-2 rounded-full bg-blue-500" title="Hybrid" />}
                      {loc.onsiteAvailability && <span className="w-2 h-2 rounded-full bg-emerald-500" title="Onsite" />}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      loc.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {loc.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No locations found.
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
