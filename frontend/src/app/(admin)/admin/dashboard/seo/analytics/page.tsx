'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card, Button, Spinner, Alert } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { LineChart, BarChart3, AlertTriangle, RefreshCw, Box, Layers, MousePointer2, Activity, Target, Search } from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsCommandCenterPage() {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await adminService.fetch('/analytics-integration/dashboard');
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      await adminService.create('/analytics-integration/sync', {});
      await fetchData();
    } catch (err: any) {
      setError(err.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const getChartData = () => {
    if (!data?.gsc || !data?.ga4) return null;
    
    return {
      labels: data.gsc.map((d: any) => new Date(d.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Search Impressions',
          data: data.gsc.map((d: any) => d.metrics.impressions),
          borderColor: 'rgba(147, 51, 234, 1)',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          yAxisID: 'y',
          fill: true
        },
        {
          label: 'Website Users',
          data: data.ga4.map((d: any) => d.metrics.users),
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          yAxisID: 'y1',
          fill: true
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: 'index' as const, intersect: false },
    stacked: false,
    plugins: { legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } } },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
      y: { type: 'linear' as const, display: true, position: 'left' as const, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
      y1: { type: 'linear' as const, display: true, position: 'right' as const, grid: { drawOnChartArea: false }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
    },
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Unified Analytics & Search</h2>
            <p className="text-gray-400">Aggregated insights from Google, Bing, and Clarity.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/dashboard/seo/analytics/reports">
              <Button variant="outline">Reports</Button>
            </Link>
            <Button onClick={handleSync} disabled={syncing || loading} className="flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Providers'}
            </Button>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}
        
        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Health Score</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{data.overallHealth}%</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-green-900/30 text-green-400">
                    <Activity className="w-6 h-6" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Active Integrations</p>
                    <h3 className="text-3xl font-bold text-white mt-2">4</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-900/30 text-blue-400">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gray-900 border-gray-800">
              <h3 className="text-lg font-bold text-white mb-6">Traffic & Search Visibility Trends</h3>
              <div className="h-[400px]">
                {getChartData() && <Line options={chartOptions} data={getChartData() as any} />}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/admin/dashboard/seo/analytics/gsc">
                <Card className="p-6 bg-gray-900 border-gray-800 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-indigo-900/30 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Search Console</h4>
                      <p className="text-sm text-gray-400">Google Search metrics</p>
                    </div>
                  </div>
                </Card>
              </Link>
              
              <Link href="/admin/dashboard/seo/analytics/ga4">
                <Card className="p-6 bg-gray-900 border-gray-800 hover:border-blue-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-blue-900/30 text-blue-400 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Google Analytics 4</h4>
                      <p className="text-sm text-gray-400">Engagement & Sessions</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/admin/dashboard/seo/analytics/bing">
                <Card className="p-6 bg-gray-900 border-gray-800 hover:border-teal-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-teal-900/30 text-teal-400 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Bing Webmaster</h4>
                      <p className="text-sm text-gray-400">Microsoft Search metrics</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/admin/dashboard/seo/analytics/clarity">
                <Card className="p-6 bg-gray-900 border-gray-800 hover:border-amber-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-amber-900/30 text-amber-400 group-hover:scale-110 transition-transform">
                      <MousePointer2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Microsoft Clarity</h4>
                      <p className="text-sm text-gray-400">Heatmaps & UX</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/admin/dashboard/seo/analytics/ai">
                <Card className="p-6 bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-colors cursor-pointer">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    AI Analytics Assistant
                  </h3>
                  <p className="text-gray-400">Generate actionable recommendations for traffic drops, CTR declines, and UX issues.</p>
                </Card>
              </Link>

              <Link href="/admin/dashboard/seo/analytics/alerts">
                <Card className="p-6 bg-gray-900 border-gray-800 hover:border-red-500/50 transition-colors cursor-pointer">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    System Alerts
                  </h3>
                  <p className="text-gray-400">View automated alerts for indexing failures, traffic crashes, and API quota limits.</p>
                </Card>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
