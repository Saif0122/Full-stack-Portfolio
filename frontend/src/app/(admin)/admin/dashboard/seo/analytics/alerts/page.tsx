'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card } from '@/components/ui';
import { AlertTriangle, ArrowLeft, ArrowDownRight, ServerCrash, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsAlertsPage() {
  const alerts = [
    { id: 1, type: 'traffic_drop', severity: 'high', message: 'Traffic dropped by 24% compared to previous week.', date: '2h ago' },
    { id: 2, type: 'api_failure', severity: 'critical', message: 'Google Search Console API quota exceeded.', date: '5h ago' },
    { id: 3, type: 'ctr_drop', severity: 'medium', message: 'CTR for /store/nexus-saas dropped below 1.5%.', date: '1d ago' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/seo/analytics" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              Analytics System Alerts
            </h2>
            <p className="text-gray-400">Monitoring traffic drops, API quotas, and indexing failures.</p>
          </div>
        </div>

        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-4 bg-gray-900 border-gray-800 flex items-start gap-4">
              <div className={`p-2 rounded-lg ${alert.severity === 'critical' ? 'bg-red-900/30 text-red-500' : alert.severity === 'high' ? 'bg-orange-900/30 text-orange-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                {alert.type === 'traffic_drop' || alert.type === 'ctr_drop' ? <ArrowDownRight className="w-5 h-5" /> : <ServerCrash className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white capitalize">{alert.type.replace('_', ' ')}</h4>
                <p className="text-gray-400 text-sm mt-1">{alert.message}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {alert.date}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
