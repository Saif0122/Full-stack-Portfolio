'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import dynamic from 'next/dynamic';

// Dynamically import ForceGraph to avoid SSR issues with canvas
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function GraphExplorer() {
  const [graphData, setGraphData] = useState<{
    nodes: Array<{ id: string; name: string; group: string; val: number }>;
    links: Array<{ source: string; target: string }>;
  }>({ nodes: [], links: [] });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Resize handler
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    // Mock data for explorer
    setGraphData({
      nodes: [
        { id: '1', name: 'Homepage', group: 'Portfolio', val: 10 },
        { id: '2', name: 'React Development', group: 'Service', val: 5 },
        { id: '3', name: 'Scaling MongoDB', group: 'Post', val: 3 },
        { id: '4', name: 'MERN SaaS Boilerplate', group: 'Product', val: 7 },
      ],
      links: [
        { source: '1', target: '2' },
        { source: '1', target: '4' },
        { source: '3', target: '4' },
      ]
    });

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Search className="text-indigo-500" /> Link Graph Explorer
          </h1>
          <p className="text-gray-400 mt-2">Interactive 2D visualization of content relationships.</p>
        </div>
        <Link href="/admin/dashboard/seo/linking" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <Card className="bg-gray-900/50 border-gray-800 p-0 flex-grow relative overflow-hidden" ref={containerRef}>
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name"
          nodeAutoColorBy="group"
          linkColor={() => 'rgba(255,255,255,0.2)'}
          backgroundColor="#111827"
          nodeRelSize={6}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
        />
        <div className="absolute top-4 left-4 bg-gray-900/80 p-4 rounded border border-gray-800 backdrop-blur">
          <h4 className="text-sm font-bold text-white mb-2">Legend</h4>
          <div className="space-y-1 text-xs text-gray-400">
            <div>• Hover over nodes to see titles</div>
            <div>• Drag to pan, scroll to zoom</div>
            <div>• Drag nodes to reposition</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
