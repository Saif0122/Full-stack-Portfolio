"use client";

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="group relative bg-card/50 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-10 hover:border-primary/30 transition-all overflow-hidden flex flex-col h-full hover:shadow-[0_20px_60px_-15px_rgba(0,245,255,0.1)] hover:-translate-y-1 duration-500">
      
      {/* Subtle visual anchor & Glass Glow */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
            {post.category}
          </span>
          <div className="flex gap-4 text-gray-500 text-[10px] font-mono uppercase tracking-widest">
            <span>{post.date}</span>
            <span className="text-white/10">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {post.readTime}
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors leading-tight">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto relative z-20">
           <div className="flex flex-col">
              <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Target Keyword</span>
              <span className="text-xs text-gray-400 font-mono">#{post.seo.focusKeyword.toLowerCase().replace(/\s+/g, '-')}</span>
           </div>
          <span className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest group-hover:text-primary transition-colors">
            Read Full Logic 
            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};
