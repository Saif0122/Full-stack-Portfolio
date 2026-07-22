"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../constants/content';
import { HoverGlowCard, ScrollReveal } from '@/animations';

const icons = [
  <svg key="icon-0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  <svg key="icon-1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3zM9 4v16M15 4v16" /></svg>,
  <svg key="icon-2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg key="icon-3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="icon-4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m0 14v1m8-8h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  <svg key="icon-5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM9 4v16" /></svg>,
  <svg key="icon-6" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  <svg key="icon-7" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg key="icon-8" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  <svg key="icon-9" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
];

const serviceChecklists: Record<number, { items: string[]; stack: string }> = {
  0: { items: ['Multi-Tenant Row & Schema Isolation', 'Stripe Billing & Webhook Lifecycle', 'Sub-Millisecond Redis Cache Layer'], stack: 'Next.js 15 • Node.js • Redis' },
  1: { items: ['Zero-CLS Responsive Grid Systems', 'Turbopack Code-Splitting & Lazy Loading', 'Server-Driven UI Rendering'], stack: 'React 19 • Tailwind CSS • Vercel' },
  2: { items: ['Strict OpenAPI / Swagger Contracts', 'Rate-Limiting & IP Throttling Guards', 'Automated K6 Load Testing Scripts'], stack: 'Express • Node.js • MongoDB' },
  3: { items: ['WebSocket Bi-Directional Feeds', 'In-Memory Pub/Sub State Syncing', 'Sub-50ms Latency SLA Guarantee'], stack: 'Socket.io • Redis • Next.js' },
  4: { items: ['Event-Driven Microservice Topologies', 'RabbitMQ / Kafka Message Brokering', 'Containerized Docker Pods'], stack: 'Docker • Node.js • AWS ECS' },
  5: { items: ['Compound Indexing & Shard Keys', 'Aggregation Pipeline Profiling', 'Zero-Downtime Schema Evolution'], stack: 'MongoDB Atlas • Mongoose' },
  6: { items: ['Automated CI/CD GitHub Workflows', 'Multi-Region Edge CDN Caching', 'CloudWatch & Sentry Telemetry'], stack: 'Vercel • AWS • GitHub Actions' },
  7: { items: ['Clean Architecture & Domain Design', 'Strict TypeScript Type Safety', 'Automated Jest / Vitest Coverage'], stack: 'TypeScript • MERN Stack' },
  8: { items: ['OIDC & Stateless JWT Tokens', 'Strict CORS & Helmet OWASP Guards', 'Role-Based Access Control (RBAC)'], stack: 'Node.js • JWT • bcrypt' },
  9: { items: ['Lighthouse 95+ Performance Target', 'Image WebP Optimization & Preloading', 'Memory Leak Profiling & Auditing'], stack: 'Next.js • Chrome DevTools' },
};

export const Services: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-20">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Core Offerings</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Industrial Solutions</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light">
            Click any solution to explore our production architectural specifications and verified engineering checklists.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => {
            const isExpanded = expandedIndex === i;
            const checklist = serviceChecklists[i] || { items: ['Clean Architecture Guarantee', 'Strict CI/CD Checkpoints', '95+ Lighthouse Target'], stack: 'MERN Stack' };

            return (
              <ScrollReveal key={i} direction="up" delay={i * 0.06}>
                <HoverGlowCard
                  enableTilt={!isExpanded}
                  enableExtrusion={true}
                  glowColor="rgba(0, 245, 255, 0.2)"
                  className={`p-8 rounded-3xl bg-white/5 border backdrop-blur-sm group transition-all relative overflow-hidden h-full flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
                    isExpanded ? 'border-primary bg-white/[0.08] shadow-[0_0_35px_rgba(0,245,255,0.2)]' : 'border-white/10 hover:border-primary/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_20px_#00F5FF] transition-all duration-300">
                        {icons[i] || icons[0]}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-black/40 border border-white/10 text-gray-400 group-hover:text-primary transition-colors">
                        {checklist.stack.split(' • ')[0]}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden border-t border-white/10 pt-4 mb-6"
                        >
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary block mb-3 font-bold">
                            ⚡ Engineering Checklist &amp; Spec:
                          </span>
                          <ul className="space-y-2 text-xs text-gray-300 font-sans">
                            {checklist.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5 font-bold">✔</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500">
                            <span>Core Stack:</span>
                            <span className="text-white font-bold">{checklist.stack}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => toggleExpand(i)}
                    className={`w-full py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-wider font-bold transition-all mt-auto flex items-center justify-center gap-2 border ${
                      isExpanded
                        ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span>{isExpanded ? '– Hide Spec & Checklist' : '+ Explore Architecture'}</span>
                  </button>
                </HoverGlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
