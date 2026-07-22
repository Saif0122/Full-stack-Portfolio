"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '@/types';

interface BlogBlueprintPreviewProps {
  post: BlogPost;
}

export const BlogBlueprintPreview: React.FC<BlogBlueprintPreviewProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract a clean node list or summary from the mermaid diagram string if present
  const parseMermaidNodes = (diagram?: string) => {
    if (!diagram) return [];
    const lines = diagram.split('\n');
    const nodes = new Set<string>();
    lines.forEach(line => {
      const matches = line.match(/\[([^[\]]+)\]/g);
      if (matches) {
        matches.forEach(m => {
          const cleaned = m.replace(/\[|\]/g, '').trim();
          if (cleaned) nodes.add(cleaned);
        });
      }
    });
    return Array.from(nodes).slice(0, 4);
  };

  const diagramNodes = parseMermaidNodes(post.mermaidDiagram);

  return (
    <div className="mt-4 mb-6 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
      {/* Toggle Button / Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/40 hover:bg-white/[0.06] transition-all group/toggle text-left"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 group-hover/toggle:text-primary transition-colors">
            {isExpanded ? 'Hide Architecture Blueprint' : 'Inspect Architecture Blueprint'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {post.githubRepo && !isExpanded && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary hidden sm:inline-block">
              ⭐ {post.githubRepo.stars}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded Blueprint Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 rounded-2xl bg-black/50 border border-primary/20 space-y-4 text-left shadow-[0_0_20px_rgba(0,245,255,0.05)]">
              {/* Architectural Decision */}
              {post.technicalSegments?.architecturalDecisions && (
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-1">
                    Core Architectural Decision
                  </span>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {post.technicalSegments.architecturalDecisions}
                  </p>
                </div>
              )}

              {/* Trade-Offs */}
              {post.technicalSegments?.tradeOffs && (
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    Engineering Trade-Off
                  </span>
                  <p className="text-xs text-gray-400 font-light italic leading-relaxed">
                    {post.technicalSegments.tradeOffs}
                  </p>
                </div>
              )}

              {/* System Topology Nodes */}
              {diagramNodes.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                    Telemetry Flow Topology
                  </span>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {diagramNodes.map((node, idx) => (
                      <React.Fragment key={idx}>
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-200">
                          {node}
                        </span>
                        {idx < diagramNodes.length - 1 && (
                          <span className="text-primary font-mono text-xs">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* GitHub Repo Badge */}
              {post.githubRepo && (
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="text-xs font-mono text-white font-bold">{post.githubRepo.repo}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                    ⭐ {post.githubRepo.stars}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
