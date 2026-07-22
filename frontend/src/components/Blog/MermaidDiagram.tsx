
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'JetBrains Mono',
    });

    const renderChart = async () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        containerRef.current.innerHTML = svg;
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="my-12 p-8 bg-[#070B14] border border-white/5 rounded-3xl overflow-x-auto flex justify-center group">
      <div 
        ref={containerRef} 
        className="w-full max-w-full group-hover:scale-[1.02] transition-transform duration-500" 
      />
    </div>
  );
};
