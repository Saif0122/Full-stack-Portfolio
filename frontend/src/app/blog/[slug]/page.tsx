"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BLOG_POSTS, CLUSTERS } from '@/constants/content';
import dynamic from 'next/dynamic';
import { getBlogAssistantResponse } from '@/services/aiService';

const MermaidDiagram = dynamic(() => import('@/components/Blog/MermaidDiagram').then((mod) => mod.MermaidDiagram), {
  ssr: false,
});
import { ChatMessage } from '@/types';
import { generateArticleSchema, generateFAQSchema } from '@/utils/seo';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const cluster = CLUSTERS.find(c => c.id === post?.clusterId);
  const clusterPosts = BLOG_POSTS.filter(p => p.clusterId === post?.clusterId);

  // AI Assistant State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (!post) {
      router.push('/blog');
      return;
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setMessages([{ role: 'assistant', content: `Nexus Node active. I am briefed on "${post.title}". How can I assist with your architectural review?` }]);
    }, 0);
    return () => clearTimeout(timer);
  }, [post, router]);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiLoading || !post) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsAiLoading(true);
    try {
      const res = await getBlogAssistantResponse([...messages, userMsg], post);
      setMessages(prev => [...prev, { role: 'assistant', content: res }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Communication failure with Nexus core." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!post) return null;

  // Mock FAQs for Schema injection (Dynamic in a real DB)
  const faqs = [
    { q: "What is the ESR rule in MongoDB indexing?", a: "ESR stands for Equality, Sort, Range. It is a best practice for compound index design to maximize query performance." },
    { q: "Modular Monolith vs Microservices for SaaS?", a: "For most startups, a Modular Monolith with Hexagonal Architecture is preferred to reduce network complexity while maintaining logical separation." }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      {/* SEO Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateArticleSchema(post) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateFAQSchema(faqs) }} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Sidebar: Series Navigation */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-32 space-y-12">
            {cluster && (
              <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem]">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] block mb-6">{cluster.name}</span>
                <div className="space-y-3">
                  {clusterPosts.map(cp => (
                    <Link 
                      key={cp.id} 
                      href={`/blog/${cp.slug}`}
                      className={`block text-[11px] font-bold transition-all p-3 rounded-xl border ${cp.slug === post.slug ? 'bg-primary/10 border-primary/30 text-primary' : 'text-gray-500 border-transparent hover:text-white'}`}
                    >
                      {cp.isPillar && <span className="mr-2 opacity-50 font-mono text-[9px] uppercase">#Pillar</span>}
                      {cp.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-8 bg-card border border-white/5 rounded-3xl">
              <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Article Metadata</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500">Authority Score</span>
                  <span className="text-primary font-mono">9.8/10</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500">Target Level</span>
                  <span className="text-white">Principal / Architect</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Article Content */}
        <main className="lg:col-span-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                {post.category}
              </span>
              <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{post.date}</span>
              <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">• {post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tighter uppercase">
              {post.title}
            </h1>

            <div className="p-10 bg-card border border-primary/10 rounded-[2.5rem] mb-12 italic text-gray-400 font-light border-l-4 border-l-[#00F5FF] text-xl shadow-2xl">
              {post.excerpt}
            </div>

            <article className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed mb-16">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              {post.mermaidDiagram && (
                <div className="my-16">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8 text-center">System Visualizer</h4>
                  <MermaidDiagram chart={post.mermaidDiagram} />
                </div>
              )}
            </article>

            {/* Engineering Depth Sections */}
            <div className="space-y-16 mt-24 border-t border-white/5 pt-24">
              <TechnicalSection title="Architectural Decisions" content={post.technicalSegments.architecturalDecisions} accent="text-primary" />
              <TechnicalSection title="Trade-offs Analysis" content={post.technicalSegments.tradeOffs} accent="text-amber-400" />
              <TechnicalSection title="Bottlenecks Identified" content={post.technicalSegments.bottlenecks} accent="text-rose-400" />
              <TechnicalSection title="Scaling Strategy" content={post.technicalSegments.scalingStrategy} accent="text-purple-400" />
              <TechnicalSection title="Security Best Practices" content={post.technicalSegments.securityConsiderations} accent="text-emerald-400" />
              <TechnicalSection title="Performance Tuning" content={post.technicalSegments.performanceOptimization} accent="text-blue-400" />
            </div>

            {/* GitHub Strategy Integration */}
            {post.githubRepo && (
              <div className="mt-32 p-12 bg-gradient-to-br from-[#111827] to-black border border-white/10 rounded-[3rem] shadow-2xl group">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white">{post.githubRepo.owner}/{post.githubRepo.repo}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-amber-400 font-mono text-[10px] uppercase flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          {post.githubRepo.stars}
                        </span>
                        <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Public Production Blueprint</span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={`https://github.com/${post.githubRepo.owner}/${post.githubRepo.repo}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary transition-all shadow-xl"
                  >
                    {post.githubRepo.cta || 'View Architecture'}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </main>

        {/* Right Sidebar: AI Context Assistant */}
        <aside className="lg:col-span-3">
          <div className="sticky top-32">
            <div className="p-8 bg-card/80 backdrop-blur-xl border border-primary/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,245,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(0,245,255,0.4)]">AI</div>
                <h4 className="text-white text-xs font-black uppercase tracking-widest">Post Assistant</h4>
              </div>

              <div className="h-[350px] overflow-y-auto mb-6 pr-2 space-y-4 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`text-[11px] leading-relaxed p-4 rounded-2xl ${m.role === 'user' ? 'bg-primary/10 text-primary border border-primary/20 text-right ml-4' : 'bg-white/5 text-gray-400 border border-white/5 mr-4'}`}>
                    {m.content}
                  </div>
                ))}
                {isAiLoading && <div className="text-[10px] text-gray-600 animate-pulse font-mono tracking-widest px-4">DECRYPTING ARCHITECTURE...</div>}
              </div>

              <form onSubmit={handleAiAsk} className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Explain trade-offs..."
                  className="w-full bg-black/60 border border-gray-800 rounded-2xl px-5 py-4 text-[11px] text-white focus:outline-none focus:border-primary/50 shadow-inner"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-125 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-4">Command Presets</p>
                <div className="flex flex-wrap gap-2">
                  {['Summarize', 'Trade-offs', 'Mermaid Diagram', 'Security Patch'].map(suggestion => (
                    <button 
                      key={suggestion} 
                      onClick={() => setInput(suggestion)}
                      className="text-[9px] uppercase font-bold tracking-widest text-gray-500 hover:text-primary hover:bg-primary/5 transition-all border border-white/5 px-3 py-2 rounded-xl"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const TechnicalSection: React.FC<{ title: string, content: string, accent?: string }> = ({ title, content, accent = "text-white" }) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
    <h3 className={`text-xs font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4 ${accent}`}>
      <span className="w-3 h-[1px] bg-current"></span>
      {title}
    </h3>
    <p className="text-gray-400 font-light leading-relaxed pl-7 border-l border-white/10 italic text-lg">
      {content}
    </p>
  </motion.div>
);

export default BlogPostDetail;
