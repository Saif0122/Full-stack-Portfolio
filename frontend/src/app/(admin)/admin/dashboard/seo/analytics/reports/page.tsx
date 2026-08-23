'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Card, Button } from '@/components/ui';
import { FileText, ArrowLeft, Download, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsReportsPage() {
  const reports = [
    { id: 1, type: 'Weekly SEO Performance', dateRange: 'Aug 16 - Aug 22, 2026', format: 'PDF', generated: '2 hours ago' },
    { id: 2, type: 'Monthly Traffic Summary', dateRange: 'July 1 - July 31, 2026', format: 'CSV', generated: '2 weeks ago' },
    { id: 3, type: 'Core Web Vitals Audit', dateRange: 'Aug 1 - Aug 15, 2026', format: 'PDF', generated: '1 week ago' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/seo/analytics" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                Analytics Reports
              </h2>
              <p className="text-gray-400">Generate and download historical SEO reports.</p>
            </div>
            <Button className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Generate Custom Report
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/50">
                  <th className="p-4 text-sm font-semibold text-gray-300">Report Type</th>
                  <th className="p-4 text-sm font-semibold text-gray-300">Date Range</th>
                  <th className="p-4 text-sm font-semibold text-gray-300">Format</th>
                  <th className="p-4 text-sm font-semibold text-gray-300">Generated</th>
                  <th className="p-4 text-sm font-semibold text-gray-300 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 text-white font-medium">{report.type}</td>
                    <td className="p-4 text-gray-400 text-sm">{report.dateRange}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-800 text-xs rounded text-gray-300">{report.format}</span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{report.generated}</td>
                    <td className="p-4 text-right">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 ml-auto text-blue-400 border-blue-400/30 hover:bg-blue-400/10">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
