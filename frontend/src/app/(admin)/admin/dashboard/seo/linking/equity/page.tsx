'use client';
import Link from 'next/link';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function LinkEquityDashboard() {
  const authoritativePages = [
    { title: 'Nexus SaaS Boilerplate', type: 'Product', equity: 95 },
    { title: 'React Development Services', type: 'Service', equity: 88 },
    { title: 'Scaling MongoDB for 1M Users', type: 'Post', equity: 82 }
  ];

  const weakPages = [
    { title: 'Privacy Policy', type: 'Documentation', equity: 5 },
    { title: 'Old 2021 Project', type: 'Project', equity: 12 }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="text-blue-500" /> Link Equity & Crawl Priority
          </h1>
          <p className="text-gray-400 mt-2">Identify authoritative pages and distribute equity to weak content.</p>
        </div>
        <Link href="/admin/dashboard/seo/linking" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-emerald-400" /> Most Authoritative Pages
          </h3>
          <div className="space-y-4">
            {authoritativePages.map((page, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div>
                  <div className="text-white font-medium">{page.title}</div>
                  <div className="text-xs text-gray-500">{page.type}</div>
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded text-sm font-bold">
                  {page.equity}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingDown className="text-red-400" /> Weak Pages (Low Equity)
          </h3>
          <div className="space-y-4">
            {weakPages.map((page, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div>
                  <div className="text-white font-medium">{page.title}</div>
                  <div className="text-xs text-gray-500">{page.type}</div>
                </div>
                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-sm font-bold">
                  {page.equity}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
