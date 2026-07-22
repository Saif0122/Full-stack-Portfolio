"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight text-white group flex items-center">
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all">saif</span>
          <span className="text-primary font-medium group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.5)] transition-all">.code</span>
          <span className="hidden sm:inline font-light ml-4 text-[10px] uppercase tracking-[0.3em] text-gray-500">MERN Specialist</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <Link 
          href="/contact" 
          className="px-6 py-2 bg-primary/10 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-black transition-all"
        >
          Hire Me
        </Link>
      </nav>
    </header>
  );
};
