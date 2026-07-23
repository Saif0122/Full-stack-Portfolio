"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BlogFilterSidebar } from '@/components/Blog/BlogFilterSidebar';

const Blog: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em]">Engineering Insights</span>
            <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 tracking-tight leading-none">
              THE <span className="text-gray-600">NEXUS</span> LOGS
            </h1>
            <p className="text-gray-400 max-w-2xl text-xl font-light leading-relaxed">
              Deep-dives into distributed systems, full-stack performance tuning, and the 2026 AI-native architectural landscape.
            </p>
          </motion.div>
        </header>

        <BlogFilterSidebar />

        {/* Knowledge Base CTA */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-16 bg-gradient-to-br from-[#111827] to-[#0A0F1C] border border-white/5 rounded-[3rem] text-center relative overflow-hidden group"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
          
          <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tight relative z-10">Access the Full Repository</h3>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto text-xl font-light leading-relaxed relative z-10">
            Subscribe to the Nexus Transmission for monthly technical whitepapers and 2026 system design blueprints.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="engineer@domain.com"
              className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-light"
            />
            <button className="px-10 py-4 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all">
              Initialize Subscription
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
};

export default Blog;
