'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card, Spinner, Alert } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { BarChart3, Users, Activity, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Ga4Page() {
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGa4 = async () => {
      try {
        const res = await adminService.fetch('/analytics-integration/snapshots/ga4');
        setSnapshots(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGa4();
  }, []);

  const getChartData = () => {
    return {
      labels: snapshots.map(s => new Date(s.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Users',
          data: snapshots.map(s => s.metrics.users),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
        },
        {
          label: 'Sessions',
          data: snapshots.map(s => s.metrics.sessions),
          backgroundColor: 'rgba(147, 51, 234, 0.7)',
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } } },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
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
              <BarChart3 className="w-6 h-6 text-blue-400" />
              Google Analytics 4
            </h2>
            <p className="text-gray-400">Traffic acquisition and user engagement.</p>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}
        
        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Total Users (30d)</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {snapshots.reduce((sum, s) => sum + s.metrics.users, 0).toLocaleString()}
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Total Sessions (30d)</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {snapshots.reduce((sum, s) => sum + s.metrics.sessions, 0).toLocaleString()}
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Engagement Rate</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {currentMetrics?.engagementRate || 0}%
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Conversions</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {snapshots.reduce((sum, s) => sum + s.metrics.conversions, 0).toLocaleString()}
                </h3>
              </Card>
            </div>

            <Card className="p-6 bg-gray-900 border-gray-800">
              <h3 className="text-lg font-bold text-white mb-6">Audience Growth</h3>
              <div className="h-[400px]">
                {snapshots.length > 0 && <Bar options={chartOptions} data={getChartData() as any} />}
              </div>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
