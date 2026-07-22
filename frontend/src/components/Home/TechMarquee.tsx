"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverGlowCard, MagneticButtonWrapper, ScrollReveal } from '@/animations';

export type TechCategory = 'All' | 'Frontend' | 'Backend' | 'Database' | 'Cloud & DevOps';

interface TechLogoItem {
  name: string;
  category: TechCategory;
  version: string;
  icon: React.ReactNode;
}

const techLogos: TechLogoItem[] = [
  { 
    name: 'React', 
    category: 'Frontend', 
    version: 'v19.0',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 14.667c-1.474 0-2.667-1.193-2.667-2.667S10.526 9.333 12 9.333s2.667 1.193 2.667 2.667-1.193 2.667-2.667 2.667z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.333c5.89 0 10.667 4.777 10.667 10.667S17.89 22.667 12 22.667 1.333 17.89 1.333 12 6.11 1.333 12 1.333z"/></svg> 
  },
  { 
    name: 'Next.js', 
    category: 'Frontend', 
    version: 'v15.2',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.3 18.2L10.3 8.3V16h-1.5V6h1.5l7.9 9.8V6h1.5v12.2h-1.4z"/></svg> 
  },
  { 
    name: 'TypeScript', 
    category: 'Frontend', 
    version: 'v5.7',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M1.3 1.3v21.4h21.4V1.3H1.3zm13.3 11h2.2v6.6h-2.2v-6.6zm-5.6 0h2.2v6.6H9v-6.6z"/></svg> 
  },
  { 
    name: 'Node.js', 
    category: 'Backend', 
    version: 'v22.0 LTS',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M11.96 0L1.31 6.15v11.7L11.96 24l10.65-6.15V6.15L11.96 0zm9.4 17.06l-9.4 5.43-9.4-5.43V6.94l9.4-5.43 9.4 5.43v10.12zM11.96 11l-5.6 3.23v-6.46l5.6-3.23 5.6 3.23v6.46L11.96 11z"/></svg>
  },
  { 
    name: 'Express.js', 
    category: 'Backend', 
    version: 'v5.0',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M24 11.233c-.021-.433-.146-.837-.367-1.189-.221-.353-.526-.634-.897-.828-.37-.193-.789-.297-1.235-.306h-.069c-.443 0-.86.104-1.229.3-.369.196-.672.48-.891.835-.219.356-.341.764-.356 1.2s.087.842.298 1.196c.211.353.513.635.882.827.37.192.784.291 1.224.291h.069c.441-.005.856-.11 1.223-.306.368-.196.671-.481.89-.838.219-.356.34-.764.358-1.182zm-3.565.011c0-.285.074-.537.218-.745.143-.207.337-.365.572-.465.234-.1.5-.152.785-.152.288 0 .552.052.785.152.232.1.424.258.567.465.143.208.217.46.217.745 0 .288-.074.542-.217.751-.143.209-.335.369-.567.472-.233.102-.497.153-.785.153-.285 0-.551-.051-.785-.153-.235-.103-.429-.263-.572-.472-.144-.209-.218-.463-.218-.751zM11.336 17.5v-11h2.247v11h-2.247zm-5.068-11H4.02l2.368 4.675L4.02 17.5h2.248l1.244-2.454L8.756 17.5h2.248l-2.368-6.325L11.004 6.5H8.756L7.512 8.954 6.268 6.5z"/></svg>
  },
  { 
    name: 'MongoDB', 
    category: 'Database', 
    version: 'Atlas v8.0',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M17.193 9.555c-1.164-5.384-4.829-7.85-4.887-7.887a.386.386 0 0 0-.419 0c-.058.037-3.723 2.503-4.887 7.887-.905 4.186.621 7.476 1.956 9.176v3.834c0 .24.194.435.435.435h5.418a.435.435 0 0 0 .435-.435v-3.834c1.335-1.7 2.861-4.99 1.949-9.176zm-5.193 11.838v-3.696c-.056-.006-.112-.016-.168-.028-.621-.137-1.199-.39-1.716-.745-.516-.355-.959-.806-1.314-1.334-.355-.528-.619-1.129-.783-1.785-.164-.656-.217-1.348-.158-2.055.12-1.442.664-2.738 1.564-3.726.899-.988 2.062-1.615 3.344-1.8z"/></svg>
  },
  { 
    name: 'Redis', 
    category: 'Database', 
    version: 'v7.4 Cache',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 0L2.1 5.7v12.6L12 24l9.9-5.7V5.7L12 0zm7.6 16.9L12 21.3l-7.6-4.4v-1.6l7.6 4.4 7.6-4.4v1.6zm0-3.3L12 18l-7.6-4.4v-1.6L12 16.4l7.6-4.4v1.6zm0-3.3L12 14.7l-7.6-4.4v-1.6l7.6 4.4 7.6-4.4v1.6zM12 9.4L4.4 5.7 12 1.3l7.6 4.4L12 9.4z"/></svg>
  },
  { 
    name: 'JavaScript', 
    category: 'Frontend', 
    version: 'ES2025',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M0 0h24v24H0z"/><path fill="#000" d="M13.4 17.3c.3.6.7 1.1 1.5 1.1.6 0 1-.3 1-.8 0-.6-.5-.8-1.3-1.2l-.4-.2c-1.1-.5-1.8-1.1-1.8-2.4 0-1.2.9-2.1 2.3-2.1 1 0 1.7.3 2.2 1.3l-1.2.8c-.3-.5-.6-.7-1-.7-.5 0-.8.3-.8.7 0 .5.3.7 1.1 1l.4.2c1.3.6 2 1.2 2 2.6 0 1.5-1.2 2.3-2.8 2.3-1.6 0-2.6-.8-3.1-1.8l1.3-.7zM7.4 17.4c.2.4.4.7.9.7.5 0 .8-.2.8-1V12h1.6v5.1c0 1.5-.9 2.2-2.2 2.2-1.2 0-1.9-.6-2.3-1.4l1.2-.5z"/></svg> 
  },
  { 
    name: 'HTML5', 
    category: 'Frontend', 
    version: 'Semantic',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M1.5 0h21l-1.9 21.6L12 24l-8.6-2.4L1.5 0z"/></svg> 
  },
  { 
    name: 'CSS3', 
    category: 'Frontend', 
    version: 'Modern Grid',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M1.5 0h21l-1.9 21.6L12 24l-8.6-2.4L1.5 0z"/></svg> 
  },
  { 
    name: 'Tailwind CSS', 
    category: 'Frontend', 
    version: 'v4.0',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 6c-3 0-4.5 1.5-6 4 2-1.5 3-2 4.5-2 1 0 1.7.5 2.5 1.5C14 10.5 15 12 17 12c3 0 4.5-1.5 6-4-2 1.5-3 2-4.5 2-1 0-1.7-.5-2.5-1.5C14 7.5 13 6 12 6z"/></svg> 
  },
  { 
    name: 'Vercel', 
    category: 'Cloud & DevOps', 
    version: 'Edge CDN',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
  },
  { 
    name: 'Docker', 
    category: 'Cloud & DevOps', 
    version: 'v27.0 Pods',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V8.895a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.998c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.464a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.998c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.18a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.998c0 .102.082.186.185.186zm0 2.714h2.118a.186.186 0 00.186-.185V8.895a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.998c0 .102.082.185.185zm-2.955-2.714h2.118a.186.186 0 00.186-.186V6.18a.186.186 0 00-.186-.185H8.074a.185.185 0 00-.185.185v1.998c0 .102.082.186.185.186zm0 2.714h2.118a.187.187 0 00.186-.185V8.895a.186.186 0 00-.186-.185H8.074a.185.185 0 00-.185.185v1.998c0 .102.082.185.185zm-2.955 0h2.118a.186.186 0 00.186-.185V8.895a.186.186 0 00-.186-.185H5.119a.185.185 0 00-.185.185v1.998c0 .102.082.185.185zM23.996 11.961c-.015-.054-.34-.962-1.637-.624-.316-.732-.976-1.362-1.921-1.464-.105-.011-.205-.021-.311-.021h-5.96a.186.186 0 00-.186.186v4.062a.186.186 0 00.186.186h6.059c1.944 0 3.398-.946 3.774-2.325z"/></svg>
  },
  { 
    name: 'Git', 
    category: 'Cloud & DevOps', 
    version: 'Version Control',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M23.6 10.5l-10-10c-.5-.5-1.3-.5-1.8 0l-2 2 2.5 2.5c.6-.2 1.3-.1 1.8.4.6.6.6 1.6 0 2.2-.5.5-1.2.6-1.8.4L9.7 9.5v6.1c.2.1.5.3.7.5.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0-.6-.6-.6-1.6 0-2.2.2-.2.4-.3.7-.5V8.7L.4 3.2c-.5-.5-.5-1.3 0-1.8l2-2c.5-.5 1.3-.5 1.8 0l10 10c.5.5.5 1.3 0 1.8z"/></svg> 
  },
  { 
    name: 'GitHub', 
    category: 'Cloud & DevOps', 
    version: 'CI/CD Actions',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 .5C5.7.5.7 5.5.7 11.8c0 4.9 3.2 9 7.6 10.4.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7-.7 2.1-1.1.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.2-5.2-5.6 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1.9-.2 1.8-.3 2.7-.3s1.8.1 2.7.3c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.4-2.7 5.3-5.2 5.6.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.4-1.4 7.6-5.5 7.6-10.4C23.3 5.5 18.3.5 12 .5z"/></svg> 
  },
  { 
    name: 'Framer Motion', 
    category: 'Frontend', 
    version: 'Animations',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M3 3h18v18H3z"/></svg> 
  },
  { 
    name: 'Redux', 
    category: 'Frontend', 
    version: 'State Management',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M16.5 8.5c.8-.8 2.1-.8 2.9 0 .8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.2-.2-.4-.5-.5-.8-1.5 0-2.8.6-3.7 1.5l-1.1-1.1c1.2-1.2 2.9-1.9 4.9-1.9.1-.3.3-.6.4-.6z"/></svg> 
  }
];

const categories: TechCategory[] = ['All', 'Frontend', 'Backend', 'Database', 'Cloud & DevOps'];

export const TechMarquee: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('All');

  const filteredLogos = selectedCategory === 'All'
    ? techLogos
    : techLogos.filter(item => item.category === selectedCategory);

  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-white/10">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-12">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Architecture</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">MY CORE TECHNOLOGY STACK</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light mb-8">
            Filter across our production ecosystem to inspect versioning benchmarks and enterprise specialization.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-primary text-black font-bold border-primary shadow-[0_0_20px_rgba(0,245,255,0.3)] scale-105'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredLogos.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <MagneticButtonWrapper strength={0.25} className="w-full flex flex-col items-center group h-full justify-between">
                  <HoverGlowCard
                    enableTilt={true}
                    glowColor="rgba(0, 245, 255, 0.25)"
                    className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_25px_rgba(0,245,255,0.3)] relative overflow-hidden"
                  >
                    {tech.icon}
                  </HoverGlowCard>
                  
                  <div className="text-center mt-3">
                    <p className="text-[11px] uppercase tracking-[0.15em] font-black text-gray-400 group-hover:text-white transition-colors">
                      {tech.name}
                    </p>
                    <span className="text-[9px] font-mono text-primary/80 block mt-0.5 font-bold group-hover:text-primary">
                      {tech.version}
                    </span>
                  </div>
                </MagneticButtonWrapper>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
