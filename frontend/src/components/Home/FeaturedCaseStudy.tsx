"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverGlowCard, MagneticButtonWrapper, ParallaxLayer, ScrollReveal } from '@/animations';

export const FeaturedCaseStudy: React.FC = () => {
  const [viewMode, setViewMode] = useState<'optimized' | 'legacy'>('optimized');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const metricsData = {
    optimized: [
      { label: "Lighthouse Score", value: "98 / 100", color: "text-emerald-400 font-black", badge: "✔ PASS (CORE WEB VITALS)" },
      { label: "Load Time Reduction", value: "0.4s (-89%)", color: "text-primary font-black", badge: "⚡ TURBOPACK EDGE" },
      { label: "Concurrent Users", value: "10,000+", color: "text-purple-400 font-black", badge: "🔒 ZERO DOWNTIME" },
      { label: "Scalability Limit", value: "1M+ Req/hr", color: "text-blue-400 font-black", badge: "🚀 ATLAS SHARDING" }
    ],
    legacy: [
      { label: "Lighthouse Score", value: "42 / 100", color: "text-red-400 font-bold", badge: "✖ FAILED (CLS / LCP)" },
      { label: "Load Time Reduction", value: "3.8s (Legacy)", color: "text-red-400 font-bold", badge: "🐌 MONOLITH BOTTLENECK" },
      { label: "Concurrent Users", value: "150 Max", color: "text-red-400 font-bold", badge: "⚠ CONNECTION TIMEOUTS" },
      { label: "Scalability Limit", value: "Crash @ 500/s", color: "text-red-400 font-bold", badge: "🔥 MEMORY LEAKS DETECTED" }
    ]
  };

  const activeMetrics = metricsData[viewMode];

  return (
    <section className="py-32 bg-[#070B14] relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal direction="up" className="mb-16">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Deep Dive</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">FEATURED CASE STUDY</h2>
          <p className="text-gray-500 text-lg md:text-xl font-light">From Idea to Scalable Production System</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Visual Asset */}
          <ParallaxLayer offset={25}>
            <ScrollReveal direction="left" className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <HoverGlowCard
                enableTilt={true}
                glowColor="rgba(168, 85, 247, 0.25)"
                className="relative aspect-video rounded-[2rem] overflow-hidden bg-card border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <div onClick={() => setIsLightboxOpen(true)} className="w-full h-full relative">
                  <Image 
                    src="https://picsum.photos/1200/800?random=10" 
                    alt="AI Dashboard Architecture" 
                    width={1200}
                    height={800}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      viewMode === 'legacy' ? 'grayscale opacity-40 scale-100 blur-[1px]' : 'opacity-80 group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent"></div>
                  
                  {/* Overlay Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      <span>Click to Inspect Blueprint</span>
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8">
                    <div className="flex gap-2">
                      {['React 19', 'Node.js Cluster', 'MongoDB Sharded', 'Redis Orbit'].map(t => (
                        <span key={t} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-white font-mono shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </HoverGlowCard>
            </ScrollReveal>
          </ParallaxLayer>

          {/* Right: Content */}
          <ScrollReveal direction="right" className="flex flex-col">
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
              AI Dashboard Pro: Enterprise Analytics
            </h3>
            <p className="text-gray-400 font-light text-lg mb-6">
              A real-time analytics engine processing millions of events per hour, providing predictive insights via LLM integration.
            </p>

            {/* Before/After Benchmark Toggle Header */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-bold">
                  📊 Performance Benchmark Toggle:
                </span>
                <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
                  <button
                    onClick={() => setViewMode('legacy')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      viewMode === 'legacy'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 font-bold shadow-sm'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>🚫 Legacy Monolith</span>
                  </button>
                  <button
                    onClick={() => setViewMode('optimized')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      viewMode === 'optimized'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>⚡ Saiful&apos;s Optimized Stack</span>
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {activeMetrics.map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{m.label}</span>
                      </div>
                      <p className={`text-lg md:text-xl ${m.color} [text-shadow:0_0_12px_currentColor]`}>
                        {m.value}
                      </p>
                      <span className="text-[9px] font-mono text-gray-400 tracking-wider mt-1 block">
                        {m.badge}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-6 mb-10">
              <div>
                <h4 className="text-primary text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#00F5FF]"></span> THE PROBLEM
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The client faced significant latency issues with their legacy data visualization tool, which couldn&apos;t handle the 200% growth in user activity, leading to system timeouts and poor user retention.
                </p>
              </div>
              <div>
                <h4 className="text-purple-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#A855F7]"></span> THE SOLUTION
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  I architected a distributed MERN infrastructure utilizing Redis for caching and WebSockets for real-time streaming, reducing data latency by 65% and implementing an AI insights layer for automated reporting.
                </p>
              </div>
            </div>

            <MagneticButtonWrapper strength={0.3} className="w-fit">
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all"
              >
                View Full Case Study &amp; Blueprint
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </MagneticButtonWrapper>
          </ScrollReveal>
        </div>
      </div>

      {/* Interactive Architecture Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-6 sm:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A0F1C] border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-[0_0_60px_rgba(0,245,255,0.2)] relative"
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>

              <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-2">Architectural Blueprint Inspection</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-6">
                AI Dashboard Pro — System Flow Breakdown
              </h3>

              <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 mb-8 bg-black/60">
                <Image
                  src="https://picsum.photos/1200/800?random=10"
                  alt="Full Case Study Architecture Blueprint"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs mb-8">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                  <span className="text-emerald-400 font-bold block mb-2 uppercase">1. Ingestion Stage</span>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Nginx cluster balancing 10,000+ concurrent WebSocket connections with automated JWT edge validation before hitting Node.js workers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                  <span className="text-primary font-bold block mb-2 uppercase">2. Processing Core</span>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Event-driven async workers streaming hot telemetry payloads directly to Redis In-Memory pub/sub rings for sub-millisecond dashboard sync.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                  <span className="text-purple-400 font-bold block mb-2 uppercase">3. Storage &amp; AI Shards</span>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    MongoDB Atlas sharded clusters executing compound ESR indexed queries alongside background OpenAI vector embeddings generation.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="px-6 py-3 rounded-xl bg-primary text-black font-black font-mono uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
