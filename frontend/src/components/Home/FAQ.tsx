"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FAQS } from '../../constants/content';
import { HoverGlowCard, MagneticButtonWrapper, ScrollReveal } from '@/animations';

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<{ query: string; response: string; category: string } | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const suggestedQueries = [
    { text: 'How do you scale MongoDB to 1M users?', category: 'Database Scaling' },
    { text: 'What is the typical sprint turnaround time?', category: 'Delivery SLA' },
    { text: 'Do you sign NDAs before project kickoff?', category: 'Security Protocol' },
    { text: 'Can you audit our existing legacy monolith?', category: 'System Refactoring' }
  ];

  const generateAiResponse = (queryText: string) => {
    if (!queryText.trim()) return;
    setIsSynthesizing(true);
    setAiAnswer(null);

    setTimeout(() => {
      const qLower = queryText.toLowerCase();
      let response = '';
      let category = 'System Telemetry Synthesis';

      if (qLower.includes('mongodb') || qLower.includes('database') || qLower.includes('1m') || qLower.includes('scale')) {
        category = 'Database Performance & Sharding';
        response = `To scale MongoDB to 1M+ active users, I implement strict Equality, Sort, Range (ESR) compound indexing rules to prevent large-scale collection scans. For write-heavy multi-tenant workloads, I partition collections across a 3-shard cluster on MongoDB Atlas using hashed tenant keys, while offloading high-frequency read dashboards to Redis materialized views.`;
      } else if (qLower.includes('sprint') || qLower.includes('time') || qLower.includes('turnaround') || qLower.includes('long') || qLower.includes('timeline')) {
        category = 'Agile Sprint Methodology';
        response = `My standard production delivery model runs in two-week high-velocity iterations. For a complete SaaS MVP or custom architecture, typical delivery ranges between 6 to 12 weeks divided into 4 structured phases: Architectural Kickoff (Day 1-2), Core Schema & API Contracts (Week 1), Iterative Vercel/AWS Deployments (Weeks 2-4+), and final k6 high-concurrency stress testing. Response SLA is guaranteed under 2 hours.`;
      } else if (qLower.includes('nda') || qLower.includes('security') || qLower.includes('contract') || qLower.includes('audit')) {
        category = 'Enterprise Security & Legal Guardrails';
        response = `Yes, all engagements begin with immediate NDA and IP ownership verification before repository access. Technical security layers include strict OIDC/JWT refresh token rotation, JTI token blacklisting in Redis, Field-Level Encryption (FLE) for PII schemas, and pre-deployment OWASP Top 10 vulnerability scanning via Snyk and SonarQube.`;
      } else if (qLower.includes('monolith') || qLower.includes('migration') || qLower.includes('refactor')) {
        category = 'Modular Monolith Refactoring';
        response = `When auditing legacy monoliths, I utilize dependency checking tools (depcruise) and domain-driven design (DDD) to isolate tangled code paths into clean Hexagonal ports and adapters. This allows us to extract high-traffic vertical slices into decoupled Node.js or edge microservices without causing production downtime.`;
      } else if (qLower.includes('pricing') || qLower.includes('cost') || qLower.includes('retainer') || qLower.includes('hire')) {
        category = 'Engagement & Investment Models';
        response = `Engagement models are billed via transparent milestone deliverables or dedicated sprint retainers ($2,000 to $7,500+ depending on distributed concurrency scope). Every deliverable includes 100% hand-coded senior architecture, full Git ownership, and Lighthouse 95+ performance verification.`;
      } else {
        category = 'Full-Stack MERN Architecture';
        response = `As a Senior MERN Architect, I engineer high-concurrency Node.js backends and Next.js 15 edge applications designed for sub-100ms response times and zero data leakage. Based on your inquiry regarding "${queryText}", I recommend scheduling an architectural discovery sync so we can review your exact system telemetry and schema requirements.`;
      }

      setAiAnswer({ query: queryText, response, category });
      setIsSynthesizing(false);
    }, 450);
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQS;
    const qLower = searchQuery.toLowerCase();
    return FAQS.filter(faq =>
      faq.question.toLowerCase().includes(qLower) ||
      faq.answer.toLowerCase().includes(qLower)
    );
  }, [searchQuery]);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Inquiries & Intelligence</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">FREQUENTLY ASKED</h2>
          <p className="text-gray-400 font-light text-sm mt-3 max-w-xl mx-auto">
            Search our verified engineering database or ask Saiful&apos;s AI Architect Assistant for instant technical answers.
          </p>
        </ScrollReveal>

        {/* AI Architect Assistant Search Bar */}
        <ScrollReveal direction="up" className="mb-12">
          <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-r from-primary/20 via-blue-500/10 to-primary/20 p-[1px] shadow-[0_0_40px_rgba(0,245,255,0.15)]">
            <div className="bg-[#0A0F1C] rounded-[14px] p-4 sm:p-5 border border-white/10">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') generateAiResponse(searchQuery);
                    }}
                    placeholder="Ask AI Architect (e.g. 'How do you handle multi-tenant isolation?')..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm font-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setAiAnswer(null);
                      }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <MagneticButtonWrapper strength={0.15} className="w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => generateAiResponse(searchQuery || 'What is your architectural specialty?')}
                    disabled={isSynthesizing}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                  >
                    <span>{isSynthesizing ? 'Synthesizing...' : 'Ask AI Architect'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  </button>
                </MagneticButtonWrapper>
              </div>

              {/* Suggested Query Pills */}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mr-1">Suggested Inquiries:</span>
                {suggestedQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item.text);
                      generateAiResponse(item.text);
                    }}
                    className="text-left px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-gray-300 hover:text-primary hover:border-primary/40 text-xs font-light transition-all flex items-center gap-1.5"
                  >
                    <span className="text-[10px] font-mono text-primary">💡</span>
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Synthesizing or AI Answer Output */}
        <AnimatePresence>
          {isSynthesizing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-6 rounded-2xl bg-primary/5 border border-primary/30 text-center flex items-center justify-center gap-3 font-mono text-xs text-primary shadow-[0_0_25px_rgba(0,245,255,0.1)]"
            >
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>AI Architect Assistant analyzing knowledge base & telemetry definitions...</span>
            </motion.div>
          )}

          {aiAnswer && !isSynthesizing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-10 rounded-2xl bg-gradient-to-b from-primary/15 to-[#0A0F1C] border border-primary/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,245,255,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00F5FF]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    AI Architect Instant Synthesis • <span className="text-primary">{aiAnswer.category}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAiAnswer(null)}
                  className="text-gray-400 hover:text-white text-xs font-mono underline"
                >
                  Dismiss
                </button>
              </div>

              <div className="relative z-10">
                <p className="text-xs font-mono text-gray-400 mb-2 italic">
                  Inquiry: &quot;{aiAnswer.query}&quot;
                </p>
                <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                  {aiAnswer.response}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <span className="text-xs font-mono text-emerald-400">
                  ✓ Verified by Saiful&apos;s Engineering Architecture Specifications
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs uppercase tracking-widest transition-all"
                >
                  <span>Schedule Sync Call →</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filtered FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 p-8 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-light">
              <p className="mb-3">No direct FAQ match found for &quot;{searchQuery}&quot;.</p>
              <button
                type="button"
                onClick={() => generateAiResponse(searchQuery)}
                className="px-6 py-2.5 rounded-xl bg-primary text-black font-black uppercase text-xs tracking-widest shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:scale-105 transition-all"
              >
                Let AI Architect Answer This →
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.05}>
                <HoverGlowCard
                  enableTilt={false}
                  glowColor="rgba(0, 245, 255, 0.15)"
                  className={`rounded-2xl bg-white/5 border transition-all ${
                    activeIndex === i
                      ? 'border-primary/50 shadow-[0_0_30px_rgba(0,245,255,0.12)] bg-white/[0.07]'
                      : 'border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors"
                  >
                    <span className="text-lg font-bold text-white">{faq.question}</span>
                    <svg 
                      className={`w-6 h-6 text-primary transition-transform duration-300 ${activeIndex === i ? 'rotate-180 drop-shadow-[0_0_8px_#00F5FF]' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <div className="px-8 pb-6 text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </HoverGlowCard>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

