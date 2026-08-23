'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Network, Search, AlertTriangle, Link as LinkIcon, BarChart3, Database } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function InternalLinkingDashboard() {
  const [metrics, setMetrics] = useState({
    nodeCount: 0,
    edgeCount: 0,
    orphanCount: 0,
    brokenLinkCount: 0,
    avgDepth: 0,
    avgEquity: 0,
    readinessScore: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from /api/internal-linking/metrics
    // Simulating response for now
    setTimeout(() => {
      setMetrics({
        nodeCount: 124,
        edgeCount: 450,
        orphanCount: 2,
        brokenLinkCount: 0,
        avgDepth: 2.1,
        avgEquity: 45,
        readinessScore: 96
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Network className="text-indigo-500" /> Internal Linking & Knowledge Graph
          </h1>
          <p className="text-gray-400 mt-2">Manage content relationships, cluster architecture, and link equity.</p>
        </div>
      </div>

      {loading ? (
        <div className="h-32 flex items-center justify-center text-gray-500">Loading metrics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Readiness Score</h3>
            <div className="text-4xl font-black text-emerald-400">{metrics.readinessScore}/100</div>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Graph Nodes</h3>
            <div className="text-4xl font-black text-white">{metrics.nodeCount}</div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Edges</h3>
            <div className="text-4xl font-black text-white">{metrics.edgeCount}</div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="text-gray-400 text-sm font-semibold mb-2 flex items-center gap-2">
              Orphan Pages {metrics.orphanCount > 0 && <AlertTriangle size={16} className="text-yellow-500" />}
            </h3>
            <div className={`text-4xl font-black ${metrics.orphanCount > 0 ? 'text-yellow-500' : 'text-emerald-400'}`}>
              {metrics.orphanCount}
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/dashboard/seo/linking/explorer" className="block group">
          <Card className="bg-gray-900 border-gray-800 p-6 h-full hover:border-indigo-500 transition-colors">
            <Search className="text-indigo-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Graph Explorer</h3>
            <p className="text-gray-400 text-sm">Interactive 2D visualization of your entire content knowledge graph.</p>
          </Card>
        </Link>

        <Link href="/admin/dashboard/seo/linking/equity" className="block group">
          <Card className="bg-gray-900 border-gray-800 p-6 h-full hover:border-blue-500 transition-colors">
            <BarChart3 className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Link Equity & Depth</h3>
            <p className="text-gray-400 text-sm">Analyze authority distribution, crawl depth, and priority pages.</p>
          </Card>
        </Link>

        <Link href="/admin/dashboard/seo/linking/clusters" className="block group">
          <Card className="bg-gray-900 border-gray-800 p-6 h-full hover:border-purple-500 transition-colors">
            <Database className="text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Topic Clusters & Pillars</h3>
            <p className="text-gray-400 text-sm">Manage topic authority, pillar pages, and supporting articles.</p>
          </Card>
        </Link>
        
        <Link href="/admin/dashboard/seo/linking/anchors" className="block group">
          <Card className="bg-gray-900 border-gray-800 p-6 h-full hover:border-green-500 transition-colors">
            <LinkIcon className="text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Anchor Text Manager</h3>
            <p className="text-gray-400 text-sm">Track anchor text diversity and detect keyword cannibalization.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
