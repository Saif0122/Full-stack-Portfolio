"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/three/HeroScene').then((mod) => mod.HeroScene), {
  ssr: false,
});
const ScrollToExploreExperience = dynamic(() => import('@/components/Home/ScrollToExploreExperience').then((mod) => mod.ScrollToExploreExperience), {
  ssr: false,
});
import { BLOG_POSTS } from '@/constants/content';
import Link from 'next/link';
import { TypingText, FloatingCode, HeroCursorRefraction, LiveAvailabilityModal } from '@/components/Hero';
import { Services } from '@/components/Home/Services';
import { NexusArchitectureLab } from '@/components/Home/NexusArchitectureLab';
import { TechnicalIntegrity } from '@/components/Home/TechnicalIntegrity';
import { Pricing } from '@/components/Home/Pricing';
import { Testimonials } from '@/components/Home/Testimonials';
import { FAQ } from '@/components/Home/FAQ';
import { FeaturedCaseStudy } from '@/components/Home/FeaturedCaseStudy';
import { TechMarquee } from '@/components/Home/TechMarquee';
import { ClosingCTA } from '@/components/Home/ClosingCTA';
import { ArchitectureDiagram } from '@/components/Home/ArchitectureDiagram';
import { TerminalSimulation } from '@/components/Home/TerminalSimulation';
import { BlogBlueprintPreview } from '@/components/Home/BlogBlueprintPreview';
import { HoverGlowCard, MagneticButtonWrapper, ScrollReveal } from '@/animations';

const Home: React.FC = () => {
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  const stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Client', value: '500+' },
    { label: 'MERN Expertise', value: 'Expert' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <HeroScene />
        <HeroCursorRefraction />
        
        {/* Animated Background Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-soft-pulse"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F1C]/50 to-[#0A0F1C] z-[1]"></div>

        {/* Floating Code Snippets */}
        <FloatingCode 
          code={`const engineer = new FullStackDeveloper();`} 
          className="top-1/4 right-[10%]" 
          delay={0}
        />
        <FloatingCode 
          code={`const stack = ["Next.js", "Node.js", "MongoDB", "Redis"]`} 
          className="bottom-1/3 left-[5%]" 
          delay={2}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Live Availability Badge */}
              <MagneticButtonWrapper strength={0.15}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => setIsAvailabilityModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:scale-105 transition-all"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px] uppercase tracking-widest font-bold">
                    Hire MERN Stack Developer
                  </span>
                </motion.div>
              </MagneticButtonWrapper>

              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8">
                <span className="inline-block bg-gradient-to-r from-primary via-[#3B82F6] to-primary bg-clip-text text-transparent animate-text-gradient [text-shadow:0_0_30px_rgba(0,245,255,0.3)]">
                  MERN STACK
                </span>
                <br />
                <span className="text-white opacity-90 uppercase">Architect</span>
              </h1>

              {/* Dynamic Typing Effect */}
              <div className="mb-10">
                <TypingText />
              </div>

              <h2 className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12">
                Senior MERN Stack Engineer specializing in <strong>SaaS application development</strong> and <strong>scalable web applications</strong>. I engineer high-performance digital products using the modern MERN ecosystem.
              </h2>

              <div className="flex flex-wrap gap-6 mb-16">
                <MagneticButtonWrapper strength={0.3}>
                  <Link href="/projects" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-primary text-black font-black uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,245,255,0.4)]">
                    <span className="relative z-10">Project Archive</span>
                    <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </MagneticButtonWrapper>

                <MagneticButtonWrapper strength={0.2}>
                  <Link href="/contact" className="group inline-flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-widest rounded-xl transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
                    <span>Custom Development</span>
                  </Link>
                </MagneticButtonWrapper>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
                {stats.map((stat, i) => (
                  <ScrollReveal key={i} direction="up" delay={0.2 + (i * 0.1)}>
                    <HoverGlowCard 
                      enableTilt={true} 
                      glowColor="rgba(0, 245, 255, 0.2)"
                      className="p-4 -m-4 rounded-2xl transition-all"
                    >
                      <p className="text-2xl md:text-3xl font-black text-white mb-1 [text-shadow:0_0_15px_rgba(255,255,255,0.2)]">{stat.value}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{stat.label}</p>
                    </HoverGlowCard>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live Availability SLA Modal */}
        <LiveAvailabilityModal 
          isOpen={isAvailabilityModalOpen} 
          onClose={() => setIsAvailabilityModalOpen(false)} 
        />
      </section>

      {/* Standalone 3D MERN Cluster Stage */}
      <NexusArchitectureLab />

      {/* Award-Winning 3D Scroll to Explore Centerpiece */}
      <ScrollToExploreExperience />

      {/* Services Section */}
      <Services />

      {/* Tech Stack Marquee */}
      <TechMarquee />

      {/* Featured Case Study */}
      <FeaturedCaseStudy />

      {/* Interactive Architecture Data Flow Diagram */}
      <section className="py-20 bg-[#0A0F1C] relative z-10 border-t border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-3">Data Flow Architecture</span>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">Full-Stack System Topology</h3>
            <p className="text-gray-400 font-light text-sm mt-3">
              Real-time telemetry and data distribution across Edge Client, REST & GraphQL APIs, and Distributed MongoDB Clusters.
            </p>
          </ScrollReveal>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Technical Integrity Section */}
      <TechnicalIntegrity />

      {/* Live Deployment Verification Console */}
      <section className="py-20 bg-[#070B14] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-[0.4em] block mb-3">Live System Telemetry</span>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">Production Deployment Simulation</h3>
            <p className="text-gray-400 font-light text-sm mt-3">
              Watch authentic automated CI/CD pipeline execution, database authentication, and edge container rollout.
            </p>
          </ScrollReveal>
          <TerminalSimulation />
        </div>
      </section>

      {/* Pricing Models */}
      <Pricing />

      {/* Latest Blog Insights */}
      <section className="py-32 bg-[#070B14] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Engineering Blog</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">Latest Technical Insights</h2>
              <p className="text-gray-400 font-light leading-relaxed">
                Expert deep dives into <strong>scalable web applications</strong>, full-stack performance tuning, and 2026 systems architecture.
              </p>
            </div>
            <MagneticButtonWrapper strength={0.2}>
              <Link href="/blog" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white/10 transition-all block">
                Full Archive
              </Link>
            </MagneticButtonWrapper>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl">
            {BLOG_POSTS.slice(0, 2).map((post, index) => (
              <ScrollReveal key={post.id} direction="up" delay={index * 0.15}>
                <HoverGlowCard
                  enableTilt={true}
                  glowColor="rgba(0, 245, 255, 0.15)"
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all group h-full flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.3)]"
                >
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-6">
                      <span className="px-2 py-0.5 border border-white/10 rounded-md bg-black/30">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <BlogBlueprintPreview post={post} />
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 group/btn mt-auto">
                    Read Technical Blueprint
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </HoverGlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Strong Closing CTA */}
      <ClosingCTA />
    </div>
  );
};

export default Home;
