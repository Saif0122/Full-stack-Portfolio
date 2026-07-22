"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '@/constants/content';
import Link from 'next/link';

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-card/50 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-10 hover:border-primary/30 transition-all overflow-hidden flex flex-col"
            >
              {/* Subtle visual anchor */}
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </div>

              <div className="relative z-10 flex-1">
                <div className="flex flex-wrap gap-4 items-center mb-8">
                  <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                    {post.category}
                  </span>
                  <div className="flex gap-4 text-gray-500 text-[10px] font-mono uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="text-white/10">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors leading-tight">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Target Keyword</span>
                      <span className="text-xs text-gray-400 font-mono">#{post.seo.focusKeyword.toLowerCase().replace(/\s+/g, '-')}</span>
                   </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest group/link py-3 px-6 bg-white/5 rounded-xl hover:bg-primary hover:text-black transition-all"
                  >
                    Read Full Logic 
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

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
