'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card, Spinner, Alert } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { Search, ArrowLeft } from 'lucide-react';
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

export default function BingWebmasterPage() {
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBing = async () => {
      try {
        const res = await adminService.fetch('/analytics-integration/snapshots/bing');
        setSnapshots(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBing();
  }, []);

  const getChartData = () => {
    return {
      labels: snapshots.map(s => new Date(s.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Impressions',
          data: snapshots.map(s => s.metrics.impressions),
          borderColor: 'rgba(20, 184, 166, 1)',
          backgroundColor: 'rgba(20, 184, 166, 0.1)',
          yAxisID: 'y',
          fill: true
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } } },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
      y: { type: 'linear' as const, display: true, position: 'left' as const, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } }
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
              <Search className="w-6 h-6 text-teal-400" />
              Bing Webmaster Tools
            </h2>
            <p className="text-gray-400">Microsoft Search indexing and performance.</p>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}
        
        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Total Impressions</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {snapshots.reduce((sum, s) => sum + s.metrics.impressions, 0).toLocaleString()}
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Average CTR</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {currentMetrics?.ctr || 0}%
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Crawled Pages</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {currentMetrics?.crawledPages || 0}
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Index Errors</p>
                <h3 className="text-3xl font-bold text-red-400 mt-2">
                  {currentMetrics?.indexErrors || 0}
                </h3>
              </Card>
            </div>

            <Card className="p-6 bg-gray-900 border-gray-800">
              <h3 className="text-lg font-bold text-white mb-6">Bing Search Impressions</h3>
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
