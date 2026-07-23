"use client";

import React, { useState } from 'react';
import { BlogPost, ChatMessage } from '@/types';
import { getBlogAssistantResponse } from '@/services/aiService';

interface ArticleSidebarProps {
  post: BlogPost;
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ post }) => {
  // AI Assistant State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Nexus Node active. I am briefed on "${post.title}". How can I assist with your architectural review?` }
  ]);
  const [input, setInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiLoading) return;
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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <aside className="space-y-12 sticky top-32">
      {/* Table of Contents Placeholder */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
        <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Table of Contents</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li className="hover:text-primary transition-colors cursor-pointer">1. Introduction</li>
          <li className="hover:text-primary transition-colors cursor-pointer">2. Architecture Overview</li>
          <li className="hover:text-primary transition-colors cursor-pointer">3. Technical Decisions</li>
          <li className="hover:text-primary transition-colors cursor-pointer">4. Conclusion</li>
        </ul>
      </div>

      {/* Share Actions */}
      <div className="flex gap-4">
        <button onClick={copyLink} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          Copy Link
        </button>
        <button onClick={() => window.print()} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print
        </button>
      </div>

      {/* Embedded AI Assistant */}
      <div className="bg-card border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[500px]">
        <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
            <h4 className="text-white text-xs font-black uppercase tracking-widest">Nexus Assistant</h4>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm font-light ${
                m.role === 'user' ? 'bg-primary text-black rounded-tr-sm' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isAiLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 text-gray-300 p-3 rounded-2xl rounded-tl-sm text-sm flex gap-2">
                <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white/5 border-t border-white/10">
          <form onSubmit={handleAiAsk} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this article..." 
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50"
            />
            <button type="submit" disabled={isAiLoading || !input.trim()} className="p-2 bg-primary text-black rounded-xl hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all disabled:opacity-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};
