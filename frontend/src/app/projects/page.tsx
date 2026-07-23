"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PROJECTS } from '@/constants/projects';
import { ProjectFilterBar } from '@/components/Projects/ProjectFilterBar';
import Link from 'next/link';
import { FloatingCode } from '@/components/Hero/FloatingCode';
import { ArchitectureVisualizer } from '@/components/Projects/ArchitectureVisualizer';
import { ProjectAssistant } from '@/components/Projects/ProjectAssistant';
import { PerformanceMetrics } from '@/components/Projects/PerformanceMetrics';

const Projects: React.FC = () => {
  const selectedProject = PROJECTS[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint'>('overview');

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 selection:bg-primary/30 selection:text-primary">
      {/* 1. Case Study Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative">
        <FloatingCode 
          code={`const architect = new TechnicalStrategy();`} 
          className="top-10 right-[15%]" 
          delay={0}
        />
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono text-xs uppercase tracking-[0.5em] block mb-6">System Design Portfolio</span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
              ARCHITECTING <br />
              <span className="text-primary">NEXUS</span> SCALE
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
              A collection of high-concurrency systems, micro-services, and enterprise-grade products built with the MERN stack.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Toggle Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
        <div className="bg-card p-1.5 rounded-2xl border border-white/10 flex gap-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,245,255,0.3)]' : 'text-gray-500 hover:text-white'}`}
          >
            Product Overview
          </button>
          <button 
            onClick={() => setActiveTab('blueprint')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'blueprint' ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,245,255,0.3)]' : 'text-gray-500 hover:text-white'}`}
          >
            Technical Blueprint
          </button>
        </div>
      </div>

      {/* 3. Content Area */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/10 group relative mb-12 shadow-2xl">
                    <Image src={selectedProject.image} width={1200} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={selectedProject.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-10 left-10">
                      <span className="text-primary font-mono text-[10px] uppercase tracking-widest mb-2 block">{selectedProject.category}</span>
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">{selectedProject.title}</h2>
                      <div className="flex gap-3">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white font-mono">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div>
                      <h3 className="text-primary text-xs font-black uppercase tracking-widest mb-4">Architectural Challenge</h3>
                      <p className="text-gray-400 font-light leading-relaxed">{selectedProject.challenges.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-purple-400 text-xs font-black uppercase tracking-widest mb-4">Engineered Solution</h3>
                      <p className="text-gray-400 font-light leading-relaxed">{selectedProject.challenges.solution}</p>
                    </div>
                  </div>

                  <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] mb-16 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </div>
                    <h3 className="text-white text-xs font-black uppercase tracking-widest mb-8">System Deep Dive</h3>
                    <p className="text-gray-300 font-light leading-relaxed italic border-l-2 border-primary pl-6 text-lg">
                      {selectedProject.challenges.architecture}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="blueprint"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BlueprintCard title="Backend Design" content={selectedProject.technicalSpecs.backendStructure} />
                    <BlueprintCard title="Database Schema" content={selectedProject.technicalSpecs.databaseSchema} />
                    <BlueprintCard title="Auth & Authorization" content={selectedProject.technicalSpecs.authStrategy} />
                    <BlueprintCard title="API Design Principles" content={selectedProject.technicalSpecs.apiPrinciples} />
                    <BlueprintCard title="Caching Strategy" content={selectedProject.technicalSpecs.cachingStrategy} />
                    <BlueprintCard title="Security Measures" content={selectedProject.technicalSpecs.securityMeasures} />
                    <BlueprintCard title="Scaling Strategy" content={selectedProject.technicalSpecs.scalingStrategy} />
                    <BlueprintCard title="Deployment & DevOps" content={selectedProject.technicalSpecs.deploymentStrategy} />
                  </div>
                  <div className="p-10 bg-primary/5 border border-primary/20 rounded-[2.5rem]">
                    <h3 className="text-primary text-xs font-black uppercase tracking-widest mb-4">Post-Mortem / Lessons Learned</h3>
                    <p className="text-gray-300 font-light leading-relaxed">{selectedProject.technicalSpecs.lessonsLearned}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="p-8 bg-white/5 border border-white/10 rounded-3xl sticky top-32">
                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-8">Engineering Metrics</h3>
                <div className="space-y-6">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">{m.label}</p>
                        <p className="text-white text-sm font-light mt-1">{m.description}</p>
                      </div>
                      <p className="text-primary text-xl font-black">{m.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                   <h3 className="text-primary font-black text-xs uppercase tracking-widest mb-8">The Stack</h3>
                   <div className="space-y-4">
                      {selectedProject.stack.map((item, i) => (
                        <div key={i} className="group">
                           <p className="text-white font-bold text-sm flex items-center gap-2">
                             <span className="w-1 h-1 bg-primary rounded-full"></span>
                             {item.name}
                           </p>
                           <p className="text-gray-500 text-xs font-light mt-1 group-hover:text-gray-300 transition-colors ml-3">{item.benefit}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. C4 Visualizer */}
      <ArchitectureVisualizer />

      {/* 5. Project Archive Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">ENGINEERING LOG</h2>
              <p className="text-gray-500 font-light mt-2">Industrial software products built for performance.</p>
            </div>
            <Link href={`/projects/${selectedProject.slug}`} className="group relative px-6 py-3 border border-primary/30 rounded-xl overflow-hidden hover:border-primary/60 transition-colors w-fit">
               <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               <span className="relative z-10 text-primary font-black uppercase text-xs tracking-widest flex items-center gap-2">
                 View Featured Case Study
                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </span>
            </Link>
          </div>
          <ProjectFilterBar />
        </div>
      </section>

      {/* 6. AI Assistant Consultation */}
      <ProjectAssistant />

      {/* 7. Performance & Scale Visualizer */}
      <section className="py-24 bg-[#070B14] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-12">Performance Telemetry</h2>
          <PerformanceMetrics />
        </div>
      </section>
    </div>
  );
};

const BlueprintCard: React.FC<{ title: string, content: string }> = ({ title, content }) => (
  <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
    <h4 className="text-primary text-[10px] font-black uppercase tracking-widest mb-3">{title}</h4>
    <p className="text-gray-400 text-sm font-light leading-relaxed">{content}</p>
  </div>
);

export default Projects;
