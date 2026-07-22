"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
      >
        <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-2">Nexus Core Access</span>
        <h1 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Terminal Registration</h1>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Developer Name</label>
            <input 
              type="text" 
              placeholder="Saiful Islam"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Terminal Email</label>
            <input 
              type="email" 
              placeholder="developer@nexus.core"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Security Key</label>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)]"
          >
            Initialize Account
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 font-mono">
          Already authorized?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
