"use client";

import React from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

interface ArticleHeroProps {
  post: BlogPost;
}

export const ArticleHero: React.FC<ArticleHeroProps> = ({ post }) => {
  return (
    <header className="mb-16">
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

      <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-8 uppercase">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-12">
        {post.author && (
          <>
            <Image 
              src={post.author.avatarUrl} 
              alt={post.author.name} 
              width={48} 
              height={48} 
              className="rounded-full border border-white/10"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">{post.author.name}</span>
              <span className="text-primary text-[10px] uppercase tracking-widest font-mono">{post.author.role}</span>
            </div>
          </>
        )}
      </div>

      {post.coverImage && (
        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            width={1200} 
            height={675} 
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
};
