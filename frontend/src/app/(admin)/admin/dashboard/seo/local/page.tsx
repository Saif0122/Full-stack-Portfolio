'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { MapPin, Globe, Search, Building2, CheckCircle2, AlertTriangle, ArrowRight, Activity, Map } from 'lucide-react';
import Link from 'next/link';

export default function LocalSeoDashboardPage() {
  const queryClient = useQueryClient();

  const { data: audit, isLoading: isAuditLoading } = useQuery({
    queryKey: ['local-seo-audit'],
    queryFn: () => adminService.fetch('/local-seo/audit').then(res => res.data)
  });

  const { data: profiles, isLoading: isProfilesLoading } = useQuery({
    queryKey: ['local-seo-profiles'],
    queryFn: () => adminService.fetch('/local-seo/profiles').then(res => res.data)
  });

  const migrateMutation = useMutation({
    mutationFn: () => adminService.create('/local-seo/migrate', {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['local-seo-audit'] });
      queryClient.invalidateQueries({ queryKey: ['local-seo-profiles'] });
    }
  });

  if (isAuditLoading || isProfilesLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      </AdminLayout>
    );
  }

  const hasProfiles = profiles && profiles.length > 0;

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Business Identity</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Local SEO Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          {!hasProfiles && (
            <button
              onClick={() => migrateMutation.mutate()}
              disabled={migrateMutation.isPending}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-semibold rounded-lg text-white transition-colors"
            >
              {migrateMutation.isPending ? 'Migrating...' : 'Seed Initial Data'}
            </button>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border-indigo-500/20 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Activity size={16} className="text-indigo-400" /> Audit Score
          </h2>
          <div className="text-5xl font-black text-white">{audit?.score || 0}%</div>
          <div className={`mt-2 text-xs font-bold ${
            audit?.score >= 95 ? 'text-emerald-400' :
            audit?.score >= 80 ? 'text-blue-400' :
            audit?.score >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {audit?.status || 'Needs Setup'}
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Building2 size={16} className="text-emerald-400" /> Business Profiles
          </h2>
          <div className="text-5xl font-black text-white">{profiles?.length || 0}</div>
          <div className="mt-2 text-xs text-emerald-400 font-bold">Canonical Identities</div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <MapPin size={16} className="text-amber-400" /> Locations & Areas
          </h2>
          <div className="text-5xl font-black text-white">{audit?.locationCount || 0}</div>
          <div className="mt-2 text-xs text-amber-400 font-bold">Service Areas / Offices</div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Search size={16} className="text-purple-400" /> Local Keywords
          </h2>
          <div className="text-5xl font-black text-white">{audit?.keywordCount || 0}</div>
          <div className="mt-2 text-xs text-purple-400 font-bold">Tracked Targets</div>
        </Card>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Module 1: Business Identity & NAP */}
        <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-800 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Building2 size={24} className="text-emerald-400" /> Google Business Profile & NAP
              </h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Manage your canonical business identity, Name, Address, Phone (NAP), and GBP verification status.
              </p>
            </div>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-sm text-gray-300">NAP Consistency Score</span>
                <span className="text-sm font-bold text-emerald-400">{audit?.napCompleteness || 0}/100</span>
              </div>
              <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-sm text-gray-300">GBP Readiness</span>
                <span className="text-sm font-bold text-yellow-400">Needs Review</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-800/30 border-t border-gray-800">
            <Link href="/admin/dashboard/seo/local/profiles" className="flex items-center justify-between w-full group">
              <span className="text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">Manage Profiles</span>
              <ArrowRight size={16} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>

        {/* Module 2: Locations & Service Areas */}
        <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-800 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <MapPin size={24} className="text-amber-400" /> Locations & Service Areas
              </h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Define your physical offices, geographic service areas, and remote/hybrid availability.
              </p>
            </div>
          </div>
          <div className="p-6 flex-1">
             <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-sm text-gray-300">Active Service Areas</span>
                <span className="text-sm font-bold text-white">{audit?.locationCount || 0}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-sm text-gray-300">Location Schema</span>
                <span className="text-sm font-bold text-emerald-400">Generated</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-800/30 border-t border-gray-800">
            <Link href="/admin/dashboard/seo/local/locations" className="flex items-center justify-between w-full group">
              <span className="text-sm font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">Manage Locations</span>
              <ArrowRight size={16} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>

        {/* Module 3: Local Citations */}
        <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-800 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Globe size={24} className="text-blue-400" /> Citation Manager
              </h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Track business listings on Bing Places, Apple, Facebook, Clutch, and ensure consistency.
              </p>
            </div>
          </div>
          <div className="p-6 flex-1">
             <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-sm text-gray-300">Tracked Citations</span>
                <span className="text-sm font-bold text-white">{audit?.citationCount || 0}</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-800/30 border-t border-gray-800">
            <Link href="/admin/dashboard/seo/local/citations" className="flex items-center justify-between w-full group">
              <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">Manage Citations</span>
              <ArrowRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>

        {/* Module 4: Local Keyword Ranking */}
        <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-800 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Map size={24} className="text-purple-400" /> Local Keyword Tracker
              </h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Track ranks for city, region, and country-specific commercial keywords.
              </p>
            </div>
          </div>
          <div className="p-6 flex-1">
             <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-sm text-gray-300">Keywords Monitored</span>
                <span className="text-sm font-bold text-white">{audit?.keywordCount || 0}</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-800/30 border-t border-gray-800">
            <Link href="/admin/dashboard/seo/local/keywords" className="flex items-center justify-between w-full group">
              <span className="text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">Manage Local Keywords</span>
              <ArrowRight size={16} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>
      </div>

    </AdminLayout>
  );
}
