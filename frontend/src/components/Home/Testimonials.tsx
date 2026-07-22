"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { TESTIMONIALS } from '../../constants/content';
import { HoverGlowCard, MagneticButtonWrapper, ScrollReveal } from '@/animations';
import { Testimonial } from '@/types';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: Testimonial | null;
}

const VerifiedClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  testimonial
}) => {
  if (!isOpen || !testimonial) return null;

  const projectImpactMap: Record<string, { scope: string; metrics: string[] }> = {
    'FinTech Cloud': {
      scope: 'Multi-Tenant SaaS Platform & Financial Aggregation Engine',
      metrics: ['100k+ Active Users', '45ms p99 Latency', 'Zero Data Leakage Audit Proof']
    },
    'StreamLine': {
      scope: 'Real-Time WebSocket Engine & Sharded MongoDB Cluster',
      metrics: ['50k+ Concurrent Sockets', 'Sub-10ms Message Delivery', 'Redis Pub/Sub Bridge']
    },
    'GlobalSync': {
      scope: 'Bespoke Enterprise Web Application & Custom Dashboard',
      metrics: ['Lighthouse 98/100', 'Hexagonal Clean Architecture', '3x Engineering Velocity']
    },
    'HealthNode': {
      scope: 'HIPAA-Standard Healthcare API & Secure OIDC/JWT Rotation',
      metrics: ['100% FHIR Compliance', 'Sub-20ms Token Verification', 'Field-Level Encryption']
    },
    'EduCore': {
      scope: 'Global Learning Management System & AWS EKS Orchestration',
      metrics: ['99.99% Cloud Uptime', 'Stripe Metered Billing', 'Auto-Scaling EKS Pods']
    }
  };

  const impact = projectImpactMap[testimonial.company] || {
    scope: 'High-Performance Full-Stack Engineering & Scalable System Design',
    metrics: ['95+ Performance Score', 'Strict Type Safety & Clean Code', 'On-Time Milestone Delivery']
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#0A0F1C] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,245,255,0.15)] overflow-hidden z-10 text-left"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none -mr-20 -mt-20" />

          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-0.5 shadow-[0_0_20px_rgba(0,245,255,0.3)] shrink-0">
                <div className="w-full h-full bg-[#0A0F1C] rounded-[14px] flex items-center justify-center text-xl font-black text-white">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Enterprise Client via Escrow & NDA</span>
                </div>
                <h3 className="text-2xl font-black text-white">{testimonial.name}</h3>
                <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mt-0.5">
                  {testimonial.role} • <span className="text-primary font-bold">{testimonial.company}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, j) => (
              <svg key={j} className="w-5 h-5 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs font-mono text-gray-400 ml-2">5.0 / 5.0 Executive Rating</span>
          </div>

          {/* Quote */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 relative">
            <p className="text-white text-base sm:text-lg font-light italic leading-relaxed">
              &quot;{testimonial.quote}&quot;
            </p>
          </div>

          {/* Delivered Scope & Metrics */}
          <div className="space-y-4 mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary block mb-1">
                Engineering Scope Delivered
              </span>
              <p className="text-sm font-bold text-gray-200 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                ⚡ {impact.scope}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-2">
                Verified Production Benchmarks
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {impact.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                    <span className="text-xs font-mono font-bold text-gray-300 block">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-400 font-light block">Need similar enterprise engineering?</span>
              <span className="text-xs font-mono text-white">SLA &lt; 2 Hours • Zero-Bottleneck Delivery</span>
            </div>
            <MagneticButtonWrapper strength={0.2} className="w-full sm:w-auto">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)]"
              >
                <span>Request Similar Build</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </MagneticButtonWrapper>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (t: Testimonial) => {
    setSelectedTestimonial(t);
    setIsModalOpen(true);
  };

  const tripleTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-32 bg-[#070B14] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <ScrollReveal direction="up">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Feedback</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">WHAT CLIENTS SAY</h2>
          <p className="text-gray-400 font-light text-sm mt-3 max-w-xl mx-auto">
            Hover to inspect 3D depth focus and click any card to verify executive NDA delivery benchmarks.
          </p>
        </ScrollReveal>
      </div>

      <div 
        className="flex gap-8 px-6 animate-scroll-container relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredIndex(null);
        }}
      >
        <motion.div 
          className="flex gap-8 items-center py-6"
          animate={{ x: isPaused ? undefined : [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {tripleTestimonials.map((t, i) => {
            const isHovered = hoveredIndex === i;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={i}
                className="min-w-[400px] cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => handleOpenModal(t)}
                animate={{
                  scale: isHovered ? 1.05 : isOtherHovered ? 0.95 : 1,
                  opacity: isOtherHovered ? 0.5 : 1,
                  y: isHovered ? -8 : 0
                }}
              >
                <HoverGlowCard
                  enableTilt={true}
                  enableExtrusion={isHovered}
                  glowColor={isHovered ? "rgba(0, 245, 255, 0.4)" : "rgba(0, 245, 255, 0.15)"}
                  className={`p-8 rounded-3xl backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300 ${
                    isHovered
                      ? 'bg-gradient-to-b from-primary/15 to-white/10 border-primary/60 shadow-[0_15px_40px_rgba(0,245,255,0.25)] ring-1 ring-primary/40'
                      : 'bg-white/5 border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, j) => (
                          <svg key={j} className="w-4 h-4 text-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        Verified Client
                      </span>
                    </div>
                    <p className="text-white text-lg font-light leading-relaxed mb-8 italic line-clamp-4">&quot;{t.quote}&quot;</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 shadow-[0_0_12px_rgba(0,245,255,0.3)] shrink-0 flex items-center justify-center font-black text-black text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white uppercase">{t.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{t.role} • {t.company}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider group-hover:underline">
                      Inspect →
                    </span>
                  </div>
                </HoverGlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Verified Client Modal */}
      <VerifiedClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonial={selectedTestimonial}
      />
    </section>
  );
};

