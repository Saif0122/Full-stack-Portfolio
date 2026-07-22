"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PRICING_PLANS } from '../../constants/content';
import { HoverGlowCard, MagneticButtonWrapper, ScrollReveal } from '@/animations';
import { PricingPlan } from '@/types';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  customScope?: {
    scale: string;
    modules: string[];
    estimate: string;
    duration: string;
  };
}

const SyncTimelineModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  customScope
}) => {
  if (!isOpen) return null;

  const phases = [
    {
      step: '01',
      title: 'Architectural Kickoff & SLA Lock',
      timeframe: 'Day 1 - 2',
      description: 'Repository & infrastructure access setup, NDA verification, and precise technical specification locking.',
      deliverables: ['System Architecture Diagram', 'Security Protocol Checklist', 'Dedicated Slack/Teams Channel']
    },
    {
      step: '02',
      title: 'Core Schema & API Contracts',
      timeframe: 'Week 1',
      description: 'Multi-tenant database schema definition, OpenAPI / GraphQL contract drafting, and JWT/RBAC auth middleware setup.',
      deliverables: ['Database Sharding Plan', 'Swagger/OpenAPI Docs', 'Automated CI/CD Pipeline Setup']
    },
    {
      step: '03',
      title: 'High-Velocity Sprint Deployment',
      timeframe: 'Weeks 2 - 4',
      description: 'Agile feature execution with continuous Vercel/AWS staging deployments and weekly Loom progress walkthroughs.',
      deliverables: ['Live Staging Environments', 'Unit & Integration Test Suite', 'Loom Architectural Walkthroughs']
    },
    {
      step: '04',
      title: 'Stress Testing & Handover',
      timeframe: 'Final Week',
      description: 'k6 high-concurrency load testing (10,000+ req/sec), zero-downtime production rollout, and comprehensive documentation transfer.',
      deliverables: ['Lighthouse 95+ Performance Audit', 'OWASP Security Sign-off', 'Full Codebase Ownership & Training']
    }
  ];

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
          className="relative w-full max-w-3xl bg-[#0A0F1C] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,245,255,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -mr-20 -mt-20" />

          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span>Sync Protocol • Active Roadmap</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {selectedPlan ? selectedPlan.title : 'Custom Engineered Scope'}
              </h3>
              <p className="text-gray-400 text-sm font-light mt-1">
                {customScope ? `${customScope.scale} • ${customScope.duration} estimated timeframe` : 'Structured 4-phase delivery methodology ensuring zero-bottleneck execution.'}
              </p>
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

          {customScope && customScope.modules.length > 0 && (
            <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary block mb-2">Selected Architecture Modules</span>
              <div className="flex flex-wrap gap-2">
                {customScope.modules.map((mod, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                    ✓ {mod}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Phases */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-[19px] before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-blue-500 before:to-transparent before:pointer-events-none">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0A0F1C] border border-primary/40 flex items-center justify-center text-primary font-mono font-bold text-xs shrink-0 shadow-[0_0_15px_rgba(0,245,255,0.2)] z-10">
                  {phase.step}
                </div>
                <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-white">{phase.title}</h4>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10">
                      {phase.timeframe}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-light mb-4 leading-relaxed">
                    {phase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables.map((del, j) => (
                      <span key={j} className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-black/40 text-gray-300 border border-white/5 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-400 font-light block">Ready to initialize high-velocity engineering?</span>
              <span className="text-sm font-bold text-white">SLA: &lt; 2 Hours response time guaranteed.</span>
            </div>
            <MagneticButtonWrapper strength={0.2} className="w-full sm:w-auto">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_25px_rgba(0,245,255,0.3)]"
              >
                <span>Lock In Development Slot</span>
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

export const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculator States
  const [scaleGrade, setScaleGrade] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Multi-Tenant Auth & RBAC',
    'Redis Cache-Aside Engine'
  ]);

  const architectureModules = [
    { id: 'Multi-Tenant Auth & RBAC', cost: 1200, weeks: 1 },
    { id: 'Redis Cache-Aside Engine', cost: 900, weeks: 1 },
    { id: 'Stripe Metered Billing', cost: 1100, weeks: 1 },
    { id: 'Real-time WebSocket & Pub/Sub', cost: 1400, weeks: 1.5 },
    { id: 'LangChain / AI Agent Pipeline', cost: 1800, weeks: 2 },
    { id: 'Strict CI/CD & Vercel Edge Setup', cost: 800, weeks: 0.5 }
  ];

  const toggleModule = (id: string) => {
    setSelectedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const scaleConfig = {
    mvp: { title: 'Startup MVP Core', basePrice: 2000, baseWeeks: 3, multiplier: 1.0, sla: '99.9% Core Uptime' },
    growth: { title: 'Growth SaaS Platform', basePrice: 4000, baseWeeks: 5, multiplier: 1.25, sla: '99.95% High Availability' },
    enterprise: { title: 'Distributed Enterprise Scale', basePrice: 7500, baseWeeks: 8, multiplier: 1.5, sla: '99.99% Extreme Concurrency' }
  };

  const currentScale = scaleConfig[scaleGrade];
  const modulesTotalCost = selectedModules.reduce((acc, modId) => {
    const mod = architectureModules.find(m => m.id === modId);
    return acc + (mod ? mod.cost : 0);
  }, 0);
  const modulesTotalWeeks = selectedModules.reduce((acc, modId) => {
    const mod = architectureModules.find(m => m.id === modId);
    return acc + (mod ? mod.weeks : 0);
  }, 0);

  const estimatedCost = Math.round((currentScale.basePrice + modulesTotalCost) * currentScale.multiplier);
  const estimatedWeeks = Math.round(currentScale.baseWeeks + modulesTotalWeeks);

  const handleOpenPlanModal = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleOpenCalculatorModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-20">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Investment & Scope</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Engagement Models</h2>
          <p className="text-gray-400 font-light text-base max-w-2xl mx-auto mt-4">
            Choose from flexible milestone retainers or dynamically estimate your custom full-stack architecture scope below.
          </p>
        </ScrollReveal>

        {/* Core Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
          {PRICING_PLANS.map((plan, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1} className="h-full">
              <HoverGlowCard
                enableTilt={true}
                enableExtrusion={true}
                enableSparkBorder={plan.isHighlighted || plan.title === 'Custom Development'}
                glowColor={
                  plan.isHighlighted
                    ? 'rgba(0, 245, 255, 0.25)'
                    : plan.title === 'Custom Development'
                    ? 'rgba(59, 130, 246, 0.25)'
                    : 'rgba(255, 255, 255, 0.12)'
                }
                className={`p-10 rounded-[2.5rem] border flex flex-col h-full ${
                  plan.isHighlighted 
                    ? 'bg-gradient-to-b from-primary/10 to-white/5 border-primary/50 shadow-[0_0_40px_rgba(0,245,255,0.15)] scale-105 z-10' 
                    : plan.title === 'Custom Development' 
                      ? 'bg-white/5 border-[#3B82F6]/50 shadow-[0_0_25px_rgba(59,130,246,0.15)] ring-1 ring-[#3B82F6]/20' 
                      : 'bg-white/5 border-white/10'
                } transition-all relative group`}
              >
                {plan.isHighlighted && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-[0_0_15px_#00F5FF]">
                    Most Popular
                  </div>
                )}
                {plan.title === 'Custom Development' && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-[#3B82F6] text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-[0_0_15px_#3B82F6]">
                    Enterprise
                  </div>
                )}
                <h3 className="text-2xl font-black text-white mb-2">{plan.title}</h3>
                <p className="text-gray-400 text-sm font-light mb-8 h-10">{plan.description}</p>
                
                <div className="mb-10">
                  <p className="text-primary text-3xl font-black [text-shadow:0_0_15px_rgba(0,245,255,0.3)]">{plan.price}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-mono">Billed per milestone</p>
                </div>

                <div className="flex-1 space-y-4 mb-10">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-300 font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                <MagneticButtonWrapper strength={0.2} className="w-full mt-auto">
                  <button
                    onClick={() => handleOpenPlanModal(plan)}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                      plan.isHighlighted 
                        ? 'bg-primary text-black shadow-lg shadow-[#00F5FF]/30 hover:scale-[1.02]' 
                        : plan.title === 'Custom Development'
                          ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30 hover:scale-[1.02]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Initialize Sync
                  </button>
                </MagneticButtonWrapper>
              </HoverGlowCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive ROI & Scope Estimation Calculator */}
        <ScrollReveal direction="up">
          <div className="rounded-[2.5rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/15 p-8 sm:p-12 relative overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] uppercase tracking-widest mb-4">
                <span>Interactive Telemetry • Scope Estimator</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                Custom Architecture & ROI Calculator
              </h3>
              <p className="text-gray-400 font-light text-sm sm:text-base mt-2">
                Configure your target architectural requirements to calculate real-time delivery estimates, sprint cycles, and system SLA benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. Scale Grade */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-300 block mb-3">
                    1. Target System Scale & Concurrency
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['mvp', 'growth', 'enterprise'] as const).map((grade) => (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => setScaleGrade(grade)}
                        className={`p-4 rounded-2xl border text-left transition-all relative ${
                          scaleGrade === grade
                            ? 'bg-primary/15 border-primary text-white shadow-[0_0_20px_rgba(0,245,255,0.2)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                        }`}
                      >
                        <span className="text-xs font-bold block uppercase tracking-wider mb-1">
                          {grade === 'mvp' ? 'Startup MVP' : grade === 'growth' ? 'Growth SaaS' : 'Enterprise'}
                        </span>
                        <span className="text-[11px] font-mono opacity-80 block">
                          {grade === 'mvp' ? 'Up to 10k users' : grade === 'growth' ? '100k+ users' : '1M+ distributed'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Architecture Modules */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-300 block mb-3">
                    2. Core Architectural Capabilities Required
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {architectureModules.map((mod) => {
                      const isSelected = selectedModules.includes(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                            isSelected
                              ? 'bg-white/10 border-primary text-white shadow-[0_0_15px_rgba(0,245,255,0.15)]'
                              : 'bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isSelected ? 'bg-primary border-primary text-black font-black' : 'border-white/20'
                            }`}>
                              {isSelected && '✓'}
                            </div>
                            <span className="text-xs font-medium">{mod.id}</span>
                          </div>
                          <span className="text-[10px] font-mono text-gray-500">+{mod.weeks}w</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Live Telemetry Output Column */}
              <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full relative">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Estimated Investment</span>
                    <span className="text-3xl font-black text-primary [text-shadow:0_0_20px_rgba(0,245,255,0.4)]">
                      ${estimatedCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Estimated Timeline</span>
                      <span className="text-lg font-bold text-white">{estimatedWeeks} Weeks</span>
                      <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">Agile Sprint Delivery</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Architecture SLA</span>
                      <span className="text-lg font-bold text-white">{currentScale.sla}</span>
                      <span className="text-[10px] text-primary font-mono block mt-0.5">Verified Audit Proof</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Engineering Velocity Guarantee:</span>
                      <span className="font-mono text-white">100% Senior Hand-coded</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Codebase Ownership:</span>
                      <span className="font-mono text-white">Immediate Git Access</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <MagneticButtonWrapper strength={0.2} className="w-full">
                    <button
                      type="button"
                      onClick={handleOpenCalculatorModal}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-[#3B82F6] text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,245,255,0.3)] flex items-center justify-center gap-2.5"
                    >
                      <span>Preview Sync Blueprint & Timeline</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </MagneticButtonWrapper>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Sync Timeline & Onboarding Modal */}
      <SyncTimelineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        customScope={
          !selectedPlan
            ? {
                scale: currentScale.title,
                modules: selectedModules,
                estimate: `$${estimatedCost.toLocaleString()}`,
                duration: `${estimatedWeeks} Weeks`
              }
            : undefined
        }
      />
    </section>
  );
};

