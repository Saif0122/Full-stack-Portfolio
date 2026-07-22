"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MagneticButtonWrapper, ScrollReveal } from '@/animations';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const FloatingParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4 - 0.2, // Drift slightly upwards
      opacity: Math.random() * 0.6 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${p.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00F5FF';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};

export const ClosingCTA: React.FC = () => {
  const [isHoveringCalendar, setIsHoveringCalendar] = useState(false);

  return (
    <section className="py-40 bg-[#070B14] relative overflow-hidden">
      {/* Interactive Floating Particles Canvas */}
      <FloatingParticlesCanvas />

      {/* Animated Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-primary/10 rounded-full blur-[150px] animate-soft-pulse pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal direction="scale">
          {/* Live Calendar Availability Badge */}
          <div
            onMouseEnter={() => setIsHoveringCalendar(true)}
            onMouseLeave={() => setIsHoveringCalendar(false)}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-primary/30 hover:border-primary/60 transition-all cursor-pointer shadow-[0_0_25px_rgba(0,245,255,0.12)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-gray-200 uppercase tracking-widest">
              Live Calendar Status • <span className="text-primary">Q3 2026: 2 Senior Slots Open</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
              SLA &lt; 2 Hrs
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
            LET’S BUILD SOMETHING <br />
            <span className="text-primary [text-shadow:0_0_30px_rgba(0,245,255,0.4)]">POWERFUL</span> TOGETHER.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            I help startups and businesses build fast, scalable, and AI-powered web applications with modern engineering disciplines.
          </p>

          {/* Interactive Calendar Hover Insight */}
          {isHoveringCalendar && (
            <div className="mb-8 p-3 rounded-xl bg-black/80 border border-primary/40 text-xs font-mono text-gray-300 max-w-md mx-auto shadow-[0_0_20px_rgba(0,245,255,0.2)] animate-fadeIn">
              ⚡ Zero-obligation Discovery Call • Immediate NDA Protection • Verified Git Ownership
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButtonWrapper strength={0.3}>
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-primary to-[#3B82F6] text-black font-black uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,245,255,0.5)] active:scale-95 block"
              >
                <span className="relative z-10">Hire Me</span>
                <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </MagneticButtonWrapper>

            <MagneticButtonWrapper strength={0.2}>
              <Link 
                href="/contact" 
                className="group px-12 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.2)] block flex items-center gap-2"
              >
                <span>Schedule a Call</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </Link>
            </MagneticButtonWrapper>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

