'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card, Spinner, Alert } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { Target, TrendingUp, MousePointerClick, BarChart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function SearchConsolePage() {
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGsc = async () => {
      try {
        const res = await adminService.fetch('/analytics-integration/snapshots/gsc');
        setSnapshots(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGsc();
  }, []);

  const getChartData = () => {
    return {
      labels: snapshots.map(s => new Date(s.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Impressions',
          data: snapshots.map(s => s.metrics.impressions),
          borderColor: 'rgba(147, 51, 234, 1)',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          yAxisID: 'y',
          fill: true
        },
        {
          label: 'Clicks',
          data: snapshots.map(s => s.metrics.clicks),
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'transparent',
          yAxisID: 'y1',
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: { legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } } },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
      y: { type: 'linear' as const, display: true, position: 'left' as const, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
      y1: { type: 'linear' as const, display: true, position: 'right' as const, grid: { drawOnChartArea: false }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
    },
  };

  const currentMetrics = snapshots.length > 0 ? snapshots[snapshots.length - 1].metrics : null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/seo/analytics" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-400" />
              Google Search Console
            </h2>
            <p className="text-gray-400">Search performance and indexing status.</p>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}
        
        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Total Impressions (30d)</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {snapshots.reduce((sum, s) => sum + s.metrics.impressions, 0).toLocaleString()}
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Total Clicks (30d)</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {snapshots.reduce((sum, s) => sum + s.metrics.clicks, 0).toLocaleString()}
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Average CTR</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {currentMetrics?.ctr || 0}%
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Average Position</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {currentMetrics?.position || 0}
                </h3>
              </Card>
            </div>

            <Card className="p-6 bg-gray-900 border-gray-800">
              <h3 className="text-lg font-bold text-white mb-6">Performance Timeline</h3>
              <div className="h-[400px]">
                {snapshots.length > 0 && <Line options={chartOptions} data={getChartData() as any} />}
              </div>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
