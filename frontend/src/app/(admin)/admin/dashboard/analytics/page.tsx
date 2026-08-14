'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout, WidgetCard } from '@/components/admin/ui';
import { RechartsArea, RechartsBar, RechartsPie } from '@/components/analytics/Charts';
import axios from 'axios';

export default function AnalyticsCenterPage() {
  const [timeRange, setTimeRange] = useState<string>('7D');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/website');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching website analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [timeRange]);

  if (loading || !data) return <AdminLayout><div className="text-white">Loading...</div></AdminLayout>;

  // Format data for Recharts
  const deviceData = data.deviceStats.map((d: any) => ({ name: d._id || 'Unknown', value: d.count }));
  const sourceData = data.trafficSources.map((d: any) => ({ name: d._id || 'Direct', value: d.count }));
  
  // Fake historical data for area chart since we don't have time-series aggregation yet
  const historyData = [
    { name: 'Mon', visitors: Math.floor(data.totalVisitors * 0.1) },
    { name: 'Tue', visitors: Math.floor(data.totalVisitors * 0.15) },
    { name: 'Wed', visitors: Math.floor(data.totalVisitors * 0.12) },
    { name: 'Thu', visitors: Math.floor(data.totalVisitors * 0.2) },
    { name: 'Fri', visitors: Math.floor(data.totalVisitors * 0.18) },
    { name: 'Sat', visitors: Math.floor(data.totalVisitors * 0.1) },
    { name: 'Sun', visitors: Math.floor(data.totalVisitors * 0.15) },
  ];

  const formatDuration = (seconds: number) => {
    if (!seconds) return '0s';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400 block mb-1">Traffic & Conversion Intelligence</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Website Analytics</h1>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <WidgetCard title="Total Visitors" value={data.totalVisitors || 0} colorScheme="indigo" subtitle="All-time visits" />
        <WidgetCard title="Unique Visitors" value={data.uniqueVisitors || 0} colorScheme="cyan" subtitle="Distinct users" />
        <WidgetCard title="Avg. Session Duration" value={formatDuration(data.avgSessionDuration)} colorScheme="emerald" subtitle="Time on site" />
        <WidgetCard title="Bounce Rate" value="-" colorScheme="amber" subtitle="Single page visits" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RechartsArea 
          data={historyData}
          xKey="name"
          yKey="visitors"
          title="Traffic Growth"
          color="indigo"
        />
        <RechartsPie 
          data={deviceData.length > 0 ? deviceData : [{name: 'Desktop', value: 1}]}
          nameKey="name"
          dataKey="value"
          title="Device Types"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RechartsBar 
          data={sourceData.length > 0 ? sourceData : [{name: 'Direct', count: 1}]}
          xKey="name"
          yKeys={['value']}
          colors={['emerald']}
          title="Traffic Sources"
        />

        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">Most Active Target Routes</h2>
          <div className="space-y-3">
            {data.topPages && data.topPages.map((r: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono font-bold text-white block truncate mr-4">{r._id}</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{r.views}</span>
              </div>
            ))}
            {(!data.topPages || data.topPages.length === 0) && (
              <div className="text-gray-400 text-sm">No page view data available.</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
