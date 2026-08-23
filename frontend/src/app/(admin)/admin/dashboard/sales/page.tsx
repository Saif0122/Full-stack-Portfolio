'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout, WidgetCard } from '@/components/admin/ui';
import { RechartsBar, RechartsPie } from '@/components/analytics/Charts';
import axios from 'axios';

export default function SalesAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('https://full-stack-portfolio-1-m5b1.onrender.com/api/analytics/marketplace');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching marketplace analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !data) return <AdminLayout><div className="text-white">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="pb-6 border-b border-white/10 mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-1">Commerce Intelligence</span>
        <h1 className="text-3xl font-black text-white tracking-tight">Marketplace & Sales Analytics</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <WidgetCard title="Total Revenue" value={`$${data.totalRevenue?.toLocaleString() || 0}`} colorScheme="emerald" subtitle="All time completed" />
        <WidgetCard title="Total Orders" value={data.totalOrders || 0} colorScheme="indigo" subtitle="Completed purchases" />
        <WidgetCard title="Avg Order Value" value={`$${Math.round(data.avgOrderValue || 0)}`} colorScheme="cyan" subtitle="Per transaction" />
        <WidgetCard title="Refunds" value={data.totalRefunds || 0} colorScheme="amber" subtitle="Reversed orders" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RechartsBar 
          data={data.topProducts?.length > 0 ? data.topProducts : [{name: 'No data', sold: 0}]}
          xKey="name"
          yKeys={['sold']}
          colors={['emerald']}
          title="Top Performing Products"
        />
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col items-center justify-center">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 w-full text-left">Conversion Rate</h2>
          <div className="text-7xl font-black text-emerald-400">4.82%</div>
          <div className="text-sm text-gray-400 mt-2">Store visitors to checkout</div>
        </div>
      </div>
    </AdminLayout>
  );
}
