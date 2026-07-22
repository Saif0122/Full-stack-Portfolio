"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitalCityCanvas } from '@/three/DigitalCityCanvas';
import { DigitalCityHUD } from './DigitalCityHUD';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import { useReducedMotionCheck } from '@/animations/hooks/useReducedMotionCheck';
import { HoverGlowCard, MagneticButtonWrapper } from '@/animations';
import Link from 'next/link';

interface DestinationData {
  id: number;
  tag: string;
  name: string;
  subTitle: string;
  badge: string;
  color: string;
  content: React.ReactNode;
}

const destinationStories: DestinationData[] = [
  {
    id: 1,
    tag: 'DESTINATION 01 / 05',
    name: 'DEVELOPER STUDIO',
    subTitle: 'Where Ideas Become Reality',
    badge: 'MERN & NEXT.JS WORKSPACE',
    color: '#00F5FF',
    content: (
      <div className="space-y-6">
        <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
          Welcome to my personal engineering sanctum. Surrounded by ultra-wide multi-monitor arrays and glowing mechanical rigs, this is where raw concepts evolve into high-concurrency digital architectures.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 block text-[10px] uppercase mb-1">Philosophy</span>
            <span className="text-white font-bold">Clean Code & Zero Tech Debt</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 block text-[10px] uppercase mb-1">Primary Stack</span>
            <span className="text-primary font-bold">Next.js 15 • React 19 • Node</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-gray-400 block text-[10px] uppercase mb-1">Execution</span>
            <span className="text-[#3B82F6] font-bold">Automated CI/CD Workflows</span>
          </div>
        </div>
        <div className="pt-2 flex flex-wrap gap-4 items-center">
          <MagneticButtonWrapper strength={0.2}>
            <Link
              href="/about"
              className="px-6 py-3 rounded-xl bg-primary text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] block"
            >
              Discover My Engineering Journey
            </Link>
          </MagneticButtonWrapper>
          <span className="text-xs text-gray-400 font-mono">
            Scroll down to enter the AI Laboratory ↓
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    tag: 'DESTINATION 02 / 05',
    name: 'AI LABORATORY',
    subTitle: 'Engineering Intelligence',
    badge: 'QUANTUM DATA CORE & LLM INTEGRATION',
    color: '#3B82F6',
    content: (
      <div className="space-y-6">
        <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
          Exiting the studio into our high-concurrency research facility. Here, we fuse modern full-stack systems with autonomous AI agents, LLM pipelines, and vector databases to build intelligent applications that adapt and learn.
        </p>
        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-black/50 border border-[#3B82F6]/30">
            <div className="text-[#3B82F6] font-black text-lg mb-1">AI Automation</div>
            <p className="text-gray-400 text-xs font-sans">
              Engineered autonomous backend agents processing real-time webhooks and unstructured data.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-black/50 border border-primary/30">
            <div className="text-primary font-black text-lg mb-1">Low-Latency APIs</div>
            <p className="text-gray-400 text-xs font-sans">
              Sub-millisecond data pipelines powered by Redis caching and Node.js event clusters.
            </p>
          </div>
        </div>
        <div className="pt-2 flex items-center justify-between font-mono text-xs text-gray-400 border-t border-white/10">
          <span>Telemetry Status: ACTIVE NEURAL SYNCHRONIZATION</span>
          <span className="text-emerald-400 font-bold">● 100% RELIABLE</span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    tag: 'DESTINATION 03 / 05',
    name: 'PROJECT VAULT',
    subTitle: 'Ideas Turned Into Products',
    badge: '3D EXHIBITION SHOWCASE',
    color: '#A855F7',
    content: (
      <div className="space-y-6">
        <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
          Monumental glass pedestals projecting live holographic product prototypes. Every project here represents enterprise-level craftsmanship, scalable database sharding, and pixel-perfect UI execution.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'AI Dashboard Pro', tech: 'Next.js 15 • Gemini AI', metrics: '10k+ Daily Active Users', color: '#00F5FF' },
            { title: 'SaaS E-Commerce', tech: 'React • Node.js • Redis', metrics: 'Sub-100ms Checkout', color: '#A855F7' },
            { title: 'Neural Banking App', tech: 'MERN Sharding • Docker', metrics: 'Bank-Grade Encryption', color: '#3B82F6' },
          ].map((proj, idx) => (
            <HoverGlowCard
              key={idx}
              enableTilt={true}
              glowColor={`${proj.color}40`}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/50 border border-white/10 text-gray-400 block w-max mb-2">
                  {proj.tech}
                </span>
                <h4 className="text-white font-bold text-sm mb-1">{proj.title}</h4>
                <p className="text-[11px] text-gray-400">{proj.metrics}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-primary">
                <span>Live Prototype</span>
                <span>→</span>
              </div>
            </HoverGlowCard>
          ))}
        </div>
        <div className="pt-2 flex justify-end">
          <Link
            href="/projects"
            className="text-xs font-mono font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-2"
          >
            Enter Full Project Archive →
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    tag: 'DESTINATION 04 / 05',
    name: 'INNOVATION CENTER',
    subTitle: 'Building for Scale',
    badge: 'ENTERPRISE SYSTEMS ARCHITECTURE',
    color: '#10B981',
    content: (
      <div className="space-y-6">
        <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
          High-altitude telemetry and operations center where distributed architectures are put to the ultimate stress test. We build fault-tolerant SaaS clusters that scale infinitely across global cloud networks.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
          {[
            { label: 'Throughput', val: '100,000+ Req/s', color: '#10B981' },
            { label: 'Uptime SLA', val: '99.99%', color: '#00F5FF' },
            { label: 'Lighthouse Score', val: '100 / 100', color: '#3B82F6' },
            { label: 'Security Grade', val: 'A+ Enterprise', color: '#A855F7' },
          ].map((stat, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-black/50 border border-white/10">
              <div className="text-base md:text-lg font-black mb-1" style={{ color: stat.color }}>
                {stat.val}
              </div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-gray-400 font-mono">
          <span>Architecture Standards: Strict ACID Compliance</span>
          <Link href="/#services" className="text-primary font-bold hover:underline">
            View Engineering Services →
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    tag: 'DESTINATION 05 / 05',
    name: 'COMMAND HUB',
    subTitle: "Let's Build the Future Together",
    badge: 'EXECUTIVE OBSERVATORY & CONTACT PORTAL',
    color: '#00F5FF',
    content: (
      <div className="space-y-6">
        <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
          From the observation deck of the city&apos;s tallest tower, the digital horizon is boundless. Whether you need a Principal MERN Architect, high-performance SaaS engineering, or custom AI integration, let&apos;s turn your vision into reality.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <MagneticButtonWrapper strength={0.3}>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-primary text-black font-black uppercase text-xs tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,245,255,0.5)] block"
            >
              Initiate Collaboration
            </Link>
          </MagneticButtonWrapper>

          <MagneticButtonWrapper strength={0.2}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all block"
            >
              Download Resume
            </a>
          </MagneticButtonWrapper>
        </div>
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
          <span>City Exploration Complete</span>
          <span className="text-emerald-400 font-bold">● RESUMING NORMAL SCROLL ↓</span>
        </div>
      </div>
    ),
  },
];

/**
 * ScrollToExploreExperience
 * Award-winning centerpiece section inserted cleanly into the homepage (`app/page.tsx`).
 * Takes control of scrolling via `sticky top-0` over a `h-[600vh]` parent container (`sectionRef`),
 * driving our 3D CatmullRom spline camera and revealing synchronized glassmorphic story overlays.
 */
export const ScrollToExploreExperience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { shouldReduceMotion } = useReducedMotionCheck();

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeDestination, setActiveDestination] = useState<number>(1);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);

  // Track scroll inside our 600vh container
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoTour || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const rawProgress = -rect.top / scrollableHeight;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setScrollProgress(clamped);

      const newDest = Math.min(5, Math.max(1, Math.floor(clamped * 4.99) + 1));
      setActiveDestination(newDest);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoTour]);

  // Jump handler triggered from HUD or internal links
  const handleJumpToDestination = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = rect.height - window.innerHeight;
    const targetProgress = (index - 1) / 4;
    const targetY = window.scrollY + rect.top + targetProgress * scrollableHeight;

    scrollTo(targetY, { duration: 1.8 });
    setScrollProgress(targetProgress);
    setActiveDestination(index);
  };

  const currentStory = destinationStories.find((d) => d.id === activeDestination) || destinationStories[0];

  // If reduced motion is preferred, render an accessible, non-pinned grid of story cards
  if (shouldReduceMotion) {
    return (
      <section className="py-24 bg-[#070B14] relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-3">
              Accessible Storytelling Experience
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
              SCROLL TO EXPLORE ARCHIVE
            </h2>
          </div>
          <div className="space-y-12">
            {destinationStories.map((story) => (
              <div
                key={story.id}
                className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-md font-mono text-[10px] uppercase font-bold bg-primary/20 text-primary border border-primary/40">
                    {story.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{story.tag}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-2">{story.name}</h3>
                <p className="text-primary font-mono text-sm uppercase mb-6">{story.subTitle}</p>
                <div>{story.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] bg-[#070B14] border-t border-b border-white/10 select-none"
    >
      {/* Sticky Viewport locking the 3D Stage and Overlays in place */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Three.js 3D Digital City Canvas */}
        <DigitalCityCanvas
          scrollProgress={scrollProgress}
          isAutoTour={isAutoTour}
          onTourComplete={() => setIsAutoTour(false)}
          onDestinationChange={(idx) => setActiveDestination(idx)}
        />

        {/* Top Header Banner indicator */}
        <div className="relative z-20 pt-8 px-6 max-w-7xl mx-auto w-full flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
                INTERACTIVE CENTERPIECE
              </div>
              <div className="text-xs md:text-sm font-bold text-white tracking-wider">
                SCROLL TO EXPLORE DIGITAL CITY
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
            <span className="text-[11px] font-mono text-gray-400">Jump to:</span>
            {destinationStories.map((d) => (
              <button
                key={d.id}
                onClick={() => handleJumpToDestination(d.id)}
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded transition-all ${
                  d.id === activeDestination
                    ? 'bg-primary text-black shadow-[0_0_10px_#00F5FF]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                0{d.id}
              </button>
            ))}
          </div>
        </div>

        {/* Synchronized Glassmorphic Storytelling Overlay Cards */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-6 max-w-5xl mx-auto w-full pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="pointer-events-auto w-full rounded-[2.5rem] bg-[#0A0F1D]/80 border border-white/15 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative overflow-hidden"
              style={{
                boxShadow: `0 20px 80px rgba(0,0,0,0.8), 0 0 40px ${currentStory.color}20`,
              }}
            >
              {/* Top Card Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-lg font-mono text-[10px] uppercase font-black tracking-widest border"
                    style={{
                      color: currentStory.color,
                      borderColor: `${currentStory.color}40`,
                      backgroundColor: `${currentStory.color}15`,
                    }}
                  >
                    {currentStory.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{currentStory.tag}</span>
                </div>

                {/* Progress bar pill across 5 destinations */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        step === activeDestination
                          ? 'w-8 bg-primary shadow-[0_0_10px_#00F5FF]'
                          : step < activeDestination
                          ? 'w-3 bg-gray-500'
                          : 'w-3 bg-white/15'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Main Destination Title & Subtitle */}
              <div className="mb-8">
                <h3
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-2"
                  style={{
                    textShadow: `0 0 30px ${currentStory.color}40`,
                  }}
                >
                  {currentStory.name}
                </h3>
                <p
                  className="text-base sm:text-lg md:text-xl font-light tracking-wide uppercase font-mono"
                  style={{ color: currentStory.color }}
                >
                  {currentStory.subTitle}
                </p>
              </div>

              {/* Dynamic Content Area */}
              <div className="text-gray-300 font-light">{currentStory.content}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Telemetry & Controls HUD */}
        <div className="relative z-30 pb-6 px-6 max-w-7xl mx-auto w-full flex justify-between items-end pointer-events-none">
          <div className="hidden sm:block text-[11px] font-mono text-gray-400 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <span>SCROLL OR CLICK TO NAVIGATE FLIGHT TIMELINE</span>
          </div>
        </div>

        {/* Cybernetic HUD Widget */}
        <DigitalCityHUD
          activeDestination={activeDestination}
          isAutoTour={isAutoTour}
          onToggleAutoTour={() => setIsAutoTour(!isAutoTour)}
          onJumpToDestination={handleJumpToDestination}
        />
      </div>
    </section>
  );
};
