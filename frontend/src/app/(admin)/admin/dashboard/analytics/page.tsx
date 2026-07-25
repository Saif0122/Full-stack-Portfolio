'use client';

import React, { useState } from 'react';
import { AdminLayout, WidgetCard, ChartWidget } from '@/components/admin/ui';

export default function AnalyticsCenterPage() {
  const [timeRange, setTimeRange] = useState<string>('7D');

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Traffic & Conversion Intelligence</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Analytics Hub & Telemetry</h1>
        </div>
        <div className="flex bg-black/60 p-1 rounded-2xl border border-white/10">
          {['24H', '7D', '30D', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-xl font-mono text-xs transition-all ${
                timeRange === range ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Conversion Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <WidgetCard title="Page Views" value="241,890" trend="+18.4% vs last term" trendPositive={true} colorScheme="indigo" subtitle="Unique Web Sessions" />
        <WidgetCard title="Avg. Session Duration" value="4m 12s" trend="+45s improvement" trendPositive={true} colorScheme="cyan" subtitle="High 3D Engagement" />
        <WidgetCard title="Store Conversion Rate" value="4.82%" trend="Industry Top 2%" trendPositive={true} colorScheme="emerald" subtitle="Checkout Success Ratio" />
        <WidgetCard title="AI Agent Interactions" value="14,210" trend="+820 today" trendPositive={true} colorScheme="amber" subtitle="Autonomous Chat Prompts" />
      </div>

      {/* Visual Charts Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          type="line"
          title={`Visitor Growth & Traffic Stream (${timeRange})`}
          data={[120, 180, 140, 290, 310, 380, 450]}
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          color="indigo"
        />
        <ChartWidget
          type="bar"
          title="Top Traffic Source Channels (%)"
          data={[42, 28, 18, 12]}
          labels={['GitHub Repo', 'Google Search', 'X / Twitter', 'Direct']}
          color="emerald"
        />
      </div>

      {/* Geographic Breakdown & Popular Routes Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">Global Geographic Distribution</h2>
          <div className="space-y-3">
            {[
              { country: 'United States & Canada', pct: '48%', count: '116,107 users' },
              { country: 'United Kingdom & European Union', pct: '26%', count: '62,891 users' },
              { country: 'India & South Asia', pct: '15%', count: '36,283 users' },
              { country: 'Japan & Australia', pct: '11%', count: '26,609 users' }
            ].map((geo, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs text-gray-200 font-sans font-semibold">{geo.country}</span>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-indigo-400">{geo.pct}</span>
                  <span className="text-[10px] text-gray-500 block">{geo.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">Most Active Target Routes</h2>
          <div className="space-y-3">
            {[
              { route: '/', name: 'Primary Portfolio & 3D Hero', views: '98,410 views' },
              { route: '/store', name: 'Digital Commercial Storefront', views: '54,192 views' },
              { route: '/blog/autonomous-ai-agents', name: 'Tech Lab Featured Article', views: '42,881 views' },
              { route: '/projects/ai-portfolio-engine', name: 'Phase 11 Showcase Study', views: '31,219 views' }
            ].map((r, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div>
                  <span className="text-xs font-mono font-bold text-white block">{r.route}</span>
                  <span className="text-[10px] font-sans text-gray-400">{r.name}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{r.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
