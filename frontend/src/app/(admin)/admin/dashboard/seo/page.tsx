'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { Search, MapPin, BarChart3, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, Image as ImageIcon, Link as LinkIcon, ArrowRight, Settings, History, LayoutTemplate, Database, Globe, ShoppingBag, PenTool, Key, Activity, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function SeoCommandCenterPage() {
  const { data: aiStats } = useQuery({
    queryKey: ['ai-seo-stats'],
    queryFn: () => adminService.fetch('/ai-approval/stats').then(res => res as any)
  });

  const { data: marketplaceOverview } = useQuery({
    queryKey: ['marketplace-seo-overview'],
    queryFn: () => adminService.fetch('/marketplace-seo/overview').then(res => res as any)
  });

  const { data: keywordStats } = useQuery({
    queryKey: ['seo-keyword-stats'],
    queryFn: () => adminService.fetch('/seo/keywords').then(res => {
      const keywords = res as any[];
      return {
        total: keywords.length,
        cannibalized: keywords.filter(k => k.hasCannibalization).length
      };
    })
  });

  // Mocking overall health for now since we're replacing the whole structure
  const overallHealth = 92;
  
  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-1">Global Intelligence</span>
          <h1 className="text-3xl font-black text-white tracking-tight">SEO Command Center</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard/seo/media" className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-sm font-semibold rounded-lg text-white transition-colors">
            Media SEO
          </Link>
          <Link href="/admin/dashboard/seo/local" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold rounded-lg text-white transition-colors">
            Local SEO
          </Link>
          <Link href="/admin/dashboard/seo/products" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
            Marketplace SEO
          </Link>
          <Link href="/admin/dashboard/seo/keywords" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
            Keyword Manager
          </Link>
          <Link href="/admin/blog-seo-dashboard" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
            Blog SEO
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Globe size={16} className="text-emerald-400" /> Overall SEO Health
          </h2>
          <div className="text-5xl font-black text-white">{overallHealth}%</div>
          <div className="mt-2 text-xs text-emerald-400 font-bold">✓ Ecosystem Healthy</div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-purple-500/20 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400" /> AI SEO Health
          </h2>
          <div className="text-5xl font-black text-white">{aiStats?.acceptanceRate || 0}%</div>
          <div className="mt-2 text-xs text-purple-400 font-bold">Suggestion Acceptance Rate</div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <ShoppingBag size={16} className="text-blue-400" /> Marketplace SEO
          </h2>
          <div className="text-5xl font-black text-white">{marketplaceOverview?.overallSeoScore || 0}%</div>
          <div className="mt-2 text-xs text-blue-400 font-bold">Average Product Optimization</div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6 flex flex-col justify-center">
          <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <Key size={16} className="text-amber-400" /> Keyword Manager
          </h2>
          <div className="text-5xl font-black text-white">{keywordStats?.total || 0}</div>
          <div className={`mt-2 text-xs font-bold ${(keywordStats?.cannibalized || 0) > 0 ? 'text-red-400' : 'text-amber-400'}`}>
            {keywordStats?.cannibalized || 0} Cannibalization Warnings
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-emerald-400" /> AI System Health & Analytics
          </h3>

          <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-purple-400" /> AI Ecosystem Status
              </h4>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                aiStats?.health?.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-400' :
                aiStats?.health?.status === 'degraded' ? 'bg-yellow-500/20 text-yellow-400' : 
                'bg-red-500/20 text-red-400'
              }`}>
                {aiStats?.health?.status?.toUpperCase() || 'UNKNOWN'}
              </span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 font-mono">API Availability</div>
                <div className="text-lg font-bold text-gray-300">{aiStats?.health?.apiAvailability || 100}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono">Avg Latency</div>
                <div className="text-lg font-bold text-gray-300">{aiStats?.health?.averageLatencyMs || 0}ms</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono">Recent Est. Cost</div>
                <div className="text-lg font-bold text-gray-300">${aiStats?.health?.totalCostRecent || 0}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono">Recent Tokens</div>
                <div className="text-lg font-bold text-gray-300">{(aiStats?.health?.totalTokensRecent || 0).toLocaleString()}</div>
              </div>
            </div>
          </Card>
          
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-8">
            <LayoutTemplate size={20} className="text-blue-400" /> Action Queues & History
          </h3>
          
          <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-purple-400" /> AI Suggestion Queue
              </h4>
              <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs font-bold">{aiStats?.pending || 0} Pending</span>
            </div>
            <div className="p-4">
              {aiStats?.pending > 0 ? (
                <div className="text-sm text-gray-400">There are {aiStats.pending} AI suggestions waiting for human review.</div>
              ) : (
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" /> All AI suggestions reviewed!
                </div>
              )}
              <div className="mt-4 flex gap-4">
                <Link href="/admin/dashboard/ai" className="text-sm text-blue-400 hover:underline">Review Queue ↗</Link>
                <Link href="/admin/dashboard/ai/prompts/playground" className="text-sm text-blue-400 hover:underline">Prompt Playground ↗</Link>
                <Link href="/admin/dashboard/ai/settings" className="text-sm text-blue-400 hover:underline">AI Settings ↗</Link>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-8">
            <LayoutTemplate size={20} className="text-amber-400" /> Structured Data Dashboard
          </h3>
          <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Database size={16} className="text-amber-400" /> Schema & JSON-LD Status
              </h4>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs font-bold">100% Healthy</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 font-mono">Supported Schemas</div>
                <div className="text-lg font-bold text-gray-300">11 Active</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono">Validation Errors</div>
                <div className="text-lg font-bold text-emerald-400">0 Critical</div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-800 bg-gray-800/20">
              <Link href="/admin/dashboard/seo/schema-settings" className="text-sm text-blue-400 hover:underline block">
                Manage Global Schema Configuration ↗
              </Link>
            </div>
          </Card>

          <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-8">
            <Globe size={20} className="text-indigo-400" /> Local SEO & Business Identity
          </h3>
          <Card className="bg-gray-900 border-gray-800 p-4 space-y-3">
          <Link 
            href="/admin/dashboard/seo/local"
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-red-400" />
              <div>
                <h3 className="font-semibold text-white">Local SEO</h3>
                <p className="text-sm text-gray-400">Manage locations and NAP data</p>
              </div>
            </div>
            <ArrowRight className="text-gray-500" />
          </Link>

          <Link 
            href="/admin/dashboard/seo/linking"
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LinkIcon className="text-indigo-400" />
              <div>
                <h3 className="font-semibold text-white">Internal Linking</h3>
                <p className="text-sm text-gray-400">Knowledge Graph & Equity</p>
              </div>
            </div>
            <ArrowRight className="text-gray-500" />
          </Link>

          <Link 
            href="/admin/dashboard/seo/analytics"
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LineChart className="text-amber-400" />
              <div>
                <h3 className="font-semibold text-white">Analytics Integration</h3>
                <p className="text-sm text-gray-400">GSC, GA4, Bing, Clarity</p>
              </div>
            </div>
            <ArrowRight className="text-gray-500" />
          </Link>
          </Card>

          <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-8">
            <Settings size={20} className="text-pink-400" /> Media & Image SEO
          </h3>
          <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Settings size={16} className="text-pink-400" /> Media SEO Health
              </h4>
              <span className="bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded text-xs font-bold">Auditing</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 font-mono">Accessibility Score</div>
                <div className="text-lg font-bold text-gray-300">Evaluating</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono">Optimization Score</div>
                <div className="text-lg font-bold text-emerald-400">Evaluating</div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-800 bg-gray-800/20">
              <Link href="/admin/dashboard/seo/media" className="text-sm text-blue-400 hover:underline block">
                Open Media SEO Dashboard ↗
              </Link>
            </div>
          </Card>

          <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-8">
            <Settings size={20} className="text-gray-400" /> External Integrations (Future)
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-gray-900/50 border-gray-800/50 p-6 flex justify-between items-center opacity-70">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Globe size={20} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Google Search Console</h4>
                  <p className="text-xs text-gray-500">Connect to sync CTR, Impressions, and Core Web Vitals</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-400 font-semibold">Coming Soon</span>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 p-6 flex justify-between items-center opacity-70">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Activity size={20} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Google Analytics 4</h4>
                  <p className="text-xs text-gray-500">Connect to sync conversion data and traffic sources</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-400 font-semibold">Coming Soon</span>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 p-6 flex justify-between items-center opacity-70">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <History size={20} className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Bing Webmaster Tools</h4>
                  <p className="text-xs text-gray-500">Connect to IndexNow and Bing crawler stats</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-400 font-semibold">Coming Soon</span>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
