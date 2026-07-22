"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8"
      >
        <div>
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-2">Executive Overview</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Command Center</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Core Online
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <span className="text-gray-500 font-mono text-xs uppercase tracking-widest block mb-4">Total Visits</span>
          <p className="text-4xl font-black text-white mb-2">48,291</p>
          <span className="text-emerald-400 font-mono text-xs">+14.2% this week</span>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <span className="text-gray-500 font-mono text-xs uppercase tracking-widest block mb-4">AI Core Requests</span>
          <p className="text-4xl font-black text-white mb-2">12,840</p>
          <span className="text-primary font-mono text-xs">Gemini 2.5 Flash</span>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <span className="text-gray-500 font-mono text-xs uppercase tracking-widest block mb-4">System Latency</span>
          <p className="text-4xl font-black text-white mb-2">24ms</p>
          <span className="text-emerald-400 font-mono text-xs">99.99% Uptime</span>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tight font-mono">System Diagnostics & Logs</h2>
        <div className="font-mono text-xs text-gray-400 space-y-3 bg-black/40 p-6 rounded-2xl border border-white/5">
          <p><span className="text-primary">[SYSTEM]</span> Next.js App Router migration completed. Active routes verified.</p>
          <p><span className="text-emerald-400">[SECURITY]</span> Strict CSP & HSTS security headers enforced via next.config.ts.</p>
          <p><span className="text-purple-400">[DATABASE]</span> Mongoose cluster synchronization optimal.</p>
        </div>
      </div>
    </div>
  );
}
