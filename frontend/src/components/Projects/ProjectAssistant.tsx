
"use client";

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectConsultation } from '../../services/aiService';
import Link from 'next/link';

export const ProjectAssistant: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const docId = useId().replace(/:/g, '').toUpperCase().slice(0, 9);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getProjectConsultation(idea);
      setResponse(result);
    } catch {
      setResponse("Communication failure with the architect node.");
    } finally {
      setIsLoading(false);
    }
  };


  const renderBlueprint = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Regex explains:
      // ^(\d+\.?) -> Starts with digit, optional dot
      // \s* -> optional whitespace
      // \** -> optional markdown bold start
      // ([^:]+?) -> Capture Title (lazy)
      // \** -> optional markdown bold end
      // : -> Colon
      // \s* -> optional whitespace
      // (.*)$ -> Capture Content
      const match = line.match(/^(\d+\.?)\s*\**([^:]+?)\**:\s*(.*)$/);
      
      if (match) {
        return (
          <div key={i} className="mb-8 last:mb-0">
            <h4 className="text-primary text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
               <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-[10px] shrink-0">
                 {match[1].replace('.', '')}
               </span>
               {match[2].trim()}
            </h4>
            <div className="text-gray-300 font-light leading-relaxed pl-8 border-l border-white/5">
              {match[3].trim()}
            </div>
          </div>
        );
      }
      // Render non-list items as regular paragraphs if they have content
      if (line.trim().length > 1) {
        return <p key={i} className="text-gray-400 mb-4 font-light text-sm pl-8">{line}</p>;
      }
      return null;
    });
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Nexus AI Architect</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">Technical Blueprint Engine</h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">
            Input a high-level product vision. My virtual CTO will output a 12-point engineering specification following industry-best practices for the MERN ecosystem.
          </p>
        </div>

        <div className="bg-card border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
             <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>

          <form onSubmit={handleConsult} className="relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., A multi-tenant SaaS for real-time inventory management with AI demand forecasting..."
                className="flex-1 bg-black/40 border border-gray-800 rounded-2xl p-6 text-white text-lg font-light focus:outline-none focus:border-primary/50 transition-all min-h-[120px] resize-none"
              />
            </div>
            <button
              disabled={isLoading}
              className="mt-6 w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all disabled:opacity-50 group flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Generating Blueprint...
                </>
              ) : (
                <>
                  Generate 12-Point Engineering Strategy
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 pt-12 border-t border-white/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black font-black text-sm">AI</div>
                    <div>
                      <span className="text-xs uppercase tracking-widest font-black text-white block">Technical Document</span>
                      <span className="text-[10px] text-gray-500 font-mono">ID: {docId}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setResponse(null)}
                    className="text-gray-500 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest"
                  >
                    Clear Analysis
                  </button>
                </div>
                <div className="bg-black/20 p-8 md:p-12 rounded-3xl border border-white/5">
                  {renderBlueprint(response)}
                </div>
                
                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                   <p className="text-gray-300 text-sm font-light">
                     This strategy represents a production-grade MERN architecture. Ready to build?
                   </p>
                   <Link href="/contact" className="px-8 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary transition-all shrink-0">
                     Initialize Project
                   </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
