'use client';
import Link from 'next/link';
import { ArrowLeft, Database, Plus, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function TopicClustersDashboard() {
  const clusters = [
    {
      pillar: 'SaaS Architecture (Pillar)',
      score: 92,
      supporting: 12,
      topics: ['MongoDB', 'React', 'Node.js']
    },
    {
      pillar: 'AI Agents & LLMs',
      score: 85,
      supporting: 8,
      topics: ['LangChain', 'OpenAI', 'Gemini']
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Database className="text-purple-500" /> Topic Clusters & Pillars
          </h1>
          <p className="text-gray-400 mt-2">Manage thematic clusters to build domain authority.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard/seo/linking/ai" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold rounded-lg text-white flex items-center gap-2 transition-colors">
            <Plus size={16} /> AI Cluster Builder
          </Link>
          <Link href="/admin/dashboard/seo/linking" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {clusters.map((cluster, i) => (
          <Card key={i} className="bg-gray-900 border-gray-800 p-6 flex justify-between items-center hover:border-purple-500/50 transition-colors cursor-pointer">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{cluster.pillar}</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">{cluster.supporting} Supporting Articles</span>
                <span className="text-gray-600">|</span>
                <div className="flex gap-2">
                  {cluster.topics.map(t => (
                    <span key={t} className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-black text-purple-400">{cluster.score}</div>
                <div className="text-xs text-gray-500">Authority Score</div>
              </div>
              <ChevronRight className="text-gray-600" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
