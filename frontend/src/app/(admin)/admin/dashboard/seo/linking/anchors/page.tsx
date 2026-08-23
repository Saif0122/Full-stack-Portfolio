'use client';
import Link from 'next/link';
import { ArrowLeft, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AnchorTextManager() {
  const anchors = [
    { phrase: 'React Development', type: 'Keyword', count: 42, targets: 1, cannibalizing: false },
    { phrase: 'SaaS Boilerplate', type: 'Keyword', count: 28, targets: 3, cannibalizing: true },
    { phrase: 'Click here', type: 'Generic', count: 15, targets: 15, cannibalizing: false },
    { phrase: 'Saiful Islam', type: 'Branded', count: 12, targets: 1, cannibalizing: false }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <LinkIcon className="text-green-500" /> Anchor Text Manager
          </h1>
          <p className="text-gray-400 mt-2">Track anchor text diversity and detect keyword cannibalization.</p>
        </div>
        <Link href="/admin/dashboard/seo/linking" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-800/50 text-gray-400">
            <tr>
              <th className="p-4 font-semibold">Anchor Phrase</th>
              <th className="p-4 font-semibold">Classification</th>
              <th className="p-4 font-semibold text-center">Global Usage</th>
              <th className="p-4 font-semibold text-center">Unique Targets</th>
              <th className="p-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {anchors.map((anchor, i) => (
              <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                <td className="p-4 font-medium text-white">{anchor.phrase}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    anchor.type === 'Keyword' ? 'bg-indigo-500/20 text-indigo-400' :
                    anchor.type === 'Branded' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {anchor.type}
                  </span>
                </td>
                <td className="p-4 text-center text-gray-300">{anchor.count}</td>
                <td className="p-4 text-center text-gray-300">{anchor.targets}</td>
                <td className="p-4 text-right">
                  {anchor.cannibalizing ? (
                    <span className="inline-flex items-center gap-1 text-red-400 text-xs font-bold bg-red-500/10 px-2 py-1 rounded">
                      <AlertTriangle size={12} /> Cannibalizing
                    </span>
                  ) : (
                    <span className="text-emerald-400 text-xs font-bold">Healthy</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
