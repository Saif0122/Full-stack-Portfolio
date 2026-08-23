'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card, Spinner, Alert } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { MousePointer2, ArrowLeft, Flame, XOctagon, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function ClarityPage() {
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClarity = async () => {
      try {
        const res = await adminService.fetch('/analytics-integration/snapshots/clarity');
        setSnapshots(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClarity();
  }, []);

  const currentMetrics = snapshots.length > 0 ? snapshots[snapshots.length - 1].metrics : null;
  const totalSessions = snapshots.reduce((sum, s) => sum + s.metrics.sessions, 0);
  const totalDeadClicks = snapshots.reduce((sum, s) => sum + s.metrics.deadClicks, 0);
  const totalRageClicks = snapshots.reduce((sum, s) => sum + s.metrics.rageClicks, 0);
  const totalQuickBacks = snapshots.reduce((sum, s) => sum + s.metrics.quickBacks, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/seo/analytics" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <MousePointer2 className="w-6 h-6 text-amber-400" />
              Microsoft Clarity
            </h2>
            <p className="text-gray-400">User experience and interaction analytics.</p>
          </div>
        </div>

        {error && <Alert variant="error">{error}</Alert>}
        
        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <p className="text-sm text-gray-400 font-medium">Recorded Sessions</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  {totalSessions.toLocaleString()}
                </h3>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Dead Clicks</p>
                    <h3 className="text-3xl font-bold text-amber-400 mt-2">
                      {totalDeadClicks.toLocaleString()}
                    </h3>
                  </div>
                  <XOctagon className="w-5 h-5 text-amber-400" />
                </div>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Rage Clicks</p>
                    <h3 className="text-3xl font-bold text-red-500 mt-2">
                      {totalRageClicks.toLocaleString()}
                    </h3>
                  </div>
                  <Flame className="w-5 h-5 text-red-500" />
                </div>
              </Card>
              <Card className="p-6 bg-gray-900 border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Quick Backs</p>
                    <h3 className="text-3xl font-bold text-white mt-2">
                      {totalQuickBacks.toLocaleString()}
                    </h3>
                  </div>
                  <RotateCcw className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gray-900 border-gray-800">
              <h3 className="text-lg font-bold text-white mb-6">User Experience Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-300 mb-4">Average Scroll Depth</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-800 rounded-full h-4">
                      <div 
                        className="bg-amber-400 h-4 rounded-full" 
                        style={{ width: `${currentMetrics?.avgScrollDepth || 0}%` }}
                      />
                    </div>
                    <span className="text-white font-bold">{currentMetrics?.avgScrollDepth || 0}%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Average percentage of page scrolled by visitors.</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg flex flex-col justify-center items-center text-center">
                  <MousePointer2 className="w-8 h-8 text-amber-400 mb-2" />
                  <p className="text-gray-300 font-medium">Heatmap Visualization</p>
                  <p className="text-sm text-gray-500 mt-1">To view full interactive heatmaps and session recordings, visit the Microsoft Clarity dashboard.</p>
                  <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer" className="mt-4 text-amber-400 hover:text-amber-300 text-sm font-semibold">
                    Open Clarity Dashboard &rarr;
                  </a>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
