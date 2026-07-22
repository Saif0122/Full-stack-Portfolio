"use client";

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplodedStack, StackTier } from '@/three/components/ExplodedStack';
import { ViewportPauseController } from '@/three/utils/useViewportPause';
import { HoverGlowCard, MagneticButtonWrapper, ScrollReveal } from '@/animations';
import { useNexusAudio } from '@/three/utils/useNexusAudio';

const tierInfo: Record<StackTier, {
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  architecture: string;
  metrics: { label: string; value: string }[];
  blueprint: string;
}> = {
  frontend: {
    title: 'Frontend Engine (React 19 / Next.js 15)',
    subtitle: 'Server-Driven UI & Edge-Optimized Rendering',
    badge: 'TIER 1 • NEXT.JS DODECAHEDRON',
    color: '#00F5FF',
    architecture: 'Engineered with React 19 Server Components, Turbopack bundling, and strict edge caching to guarantee sub-second Time-To-First-Byte (TTFB) and pristine zero-CLS visual hierarchy across global CDNs.',
    metrics: [
      { label: 'First Contentful Paint', value: '0.4s' },
      { label: 'Client Bundle Footprint', value: '< 45 KB' },
      { label: 'Lighthouse Target', value: '100 / 100' },
    ],
    blueprint: `// Next.js 15 Edge Middleware & Cache Revalidation
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('x-edge-cache', 'HIT');
  response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return response;
}`,
  },
  api: {
    title: 'API Gateway (Node.js / Express Architecture)',
    subtitle: 'Event-Driven Non-Blocking Asynchronous Cluster',
    badge: 'TIER 2 • NODE.JS CYBER-PRISM',
    color: '#3B82F6',
    architecture: 'High-concurrency micro-gateway utilizing Node.js asynchronous event loops, custom security middleware, JWT stateless authentication, and automated rate-limiting for bulletproof SaaS backend operations.',
    metrics: [
      { label: 'Avg API Response Time', value: '12ms' },
      { label: 'Throughput Capacity', value: '50k Req/s' },
      { label: 'Uptime SLA Guarantee', value: '99.99%' },
    ],
    blueprint: `// Express / Node.js High-Concurrency Rate Limiter & JWT Guard
export const apiGatewayGuard = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Limit each IP to 10k requests per windowMs
  message: { status: 429, error: "Too many requests from this IP" }
});`,
  },
  database: {
    title: 'Database Cluster (MongoDB Atlas Sharding)',
    subtitle: 'Distributed Multi-Region Document Storage',
    badge: 'TIER 3 • EMERALD CRYSTAL SHARDS',
    color: '#10B981',
    architecture: 'Horizontally scaled document cluster with automated shard rings, compound indexing, and zero-downtime schema evolution. Guaranteed persistence across distributed AWS availability zones.',
    metrics: [
      { label: 'Query Execution Latency', value: '< 2.1ms' },
      { label: 'Horizontal Scalability', value: 'Infinite' },
      { label: 'ACID Transactions', value: 'Strict' },
    ],
    blueprint: `// MongoDB Atlas Sharded Compound Indexing & ACID Transactions
const session = await mongoose.startSession();
session.startTransaction();
try {
  await Order.create([{ userId, items, status: 'CONFIRMED' }], { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}`,
  },
  caching: {
    title: 'Caching Engine (Redis High-Speed Orbit)',
    subtitle: 'In-Memory Pub/Sub & Microsecond Data Ring',
    badge: 'TIER 4 • RELATIVISTIC ACCELERATOR',
    color: '#00F5FF',
    architecture: 'Sub-millisecond in-memory data grid caching hot database payloads, user session tokens, and real-time WebSocket state distribution to eliminate database bottlenecks under extreme user concurrency.',
    metrics: [
      { label: 'Cache Hit Ratio', value: '98.7%' },
      { label: 'Memory Read Latency', value: '0.15ms' },
      { label: 'Pub/Sub Event Rate', value: '250k/sec' },
    ],
    blueprint: `// Redis Pub/Sub & Sub-Millisecond In-Memory Cache Grid
const cacheKey = \`user:session:\${userId}\`;
const cachedSession = await redisClient.get(cacheKey);
if (cachedSession) return JSON.parse(cachedSession);
await redisClient.setEx(cacheKey, 3600, JSON.stringify(sessionData));`,
  },
};

export const NexusArchitectureLab: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<StackTier>('frontend');
  const [isOverdrive, setIsOverdrive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'benchmarks' | 'blueprint'>('benchmarks');
  const [copied, setCopied] = useState<boolean>(false);
  const { isSoundEnabled, setIsSoundEnabled, playTierClick, playOverdriveSound } = useNexusAudio();

  const activeData = tierInfo[selectedTier];

  const handleSelectTier = (tier: StackTier) => {
    setSelectedTier(tier);
    playTierClick();
  };

  const handleToggleOverdrive = () => {
    const next = !isOverdrive;
    setIsOverdrive(next);
    playOverdriveSound(next);
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-white/10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-3">
            Interactive 3D Engineering Stage
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
            THE NEXUS ARCHITECTURE LAB
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Explore the anatomy of a production-grade <strong>MERN Server Cluster</strong>. Click any tier or toggle our interactive diagnostic HUD to inspect architectural metrics in real time.
          </p>
        </ScrollReveal>

        {/* Main Grid: 3D Exploded Cluster Left (7 cols), Diagnostic HUD Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Canvas Viewport */}
          <div className="lg:col-span-7 relative h-[550px] md:h-[650px] rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between p-6">
            <div className="absolute inset-0 z-0">
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 9], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ViewportPauseController />
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F5FF" />
                <pointLight position={[-10, -10, -10]} intensity={1.2} color="#3B82F6" />
                <ExplodedStack
                  selectedTier={selectedTier}
                  onSelectTier={handleSelectTier}
                  isOverdrive={isOverdrive}
                />
              </Canvas>
            </div>

            {/* Top Canvas Controls HUD */}
            <div className="relative z-10 flex flex-wrap gap-2 justify-between items-center pointer-events-auto">
              <div className="flex gap-2">
                {(['frontend', 'api', 'database', 'caching'] as StackTier[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => handleSelectTier(tier)}
                    className={`px-3.5 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all border ${
                      selectedTier === tier
                        ? 'bg-primary/20 border-primary text-primary font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all border flex items-center gap-1.5 ${
                    isSoundEnabled
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-black/60 border-white/10 text-gray-400 hover:text-white'
                  }`}
                  aria-label="Toggle haptic sound effects"
                >
                  <span>{isSoundEnabled ? '🔊 Sound: On' : '🔇 Sound: Off'}</span>
                </button>
                <div className="hidden sm:block px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  Drag to Rotate • Click Tier
                </div>
              </div>
            </div>

            {/* Bottom Stress Test Toggle Button inside Canvas */}
            <div className="relative z-10 pointer-events-auto mt-auto flex justify-center">
              <MagneticButtonWrapper strength={0.2} className="w-full max-w-md">
                <button
                  onClick={handleToggleOverdrive}
                  className={`w-full py-3.5 px-6 rounded-xl font-mono text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 border ${
                    isOverdrive
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.6)] animate-pulse'
                      : 'bg-white/5 text-primary border-primary/40 hover:bg-primary/10 hover:border-primary shadow-[0_0_20px_rgba(0,245,255,0.15)]'
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full ${
                        isOverdrive ? 'bg-black animate-ping' : 'bg-primary animate-ping opacity-75'
                      }`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        isOverdrive ? 'bg-black' : 'bg-primary'
                      }`}
                    ></span>
                  </span>
                  {isOverdrive
                    ? '⚡ OVERDRIVE ACTIVE: 104,250 REQ/SEC STREAMING'
                    : 'SIMULATE 100,000 REQ/SEC STRESS TEST'}
                </button>
              </MagneticButtonWrapper>
            </div>
          </div>

          {/* Diagnostic HUD Side Card */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left">
              <HoverGlowCard
                enableTilt={true}
                glowColor="rgba(0, 245, 255, 0.25)"
                className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500"
              >
                {/* Active Tier Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span
                    className="px-3.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-widest font-bold border"
                    style={{
                      color: activeData.color,
                      borderColor: `${activeData.color}40`,
                      backgroundColor: `${activeData.color}15`,
                    }}
                  >
                    {activeData.badge}
                  </span>
                  {isOverdrive && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest animate-bounce">
                      ● HIGH LOAD ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2 tracking-tight">
                  {activeData.title}
                </h3>
                <p className="text-sm font-mono text-gray-400 mb-6 uppercase tracking-wider">
                  {activeData.subtitle}
                </p>

                <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base mb-6">
                  {activeData.architecture}
                </p>

                {/* HUD Tabs: Benchmarks vs Live Blueprint */}
                <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
                  <button
                    onClick={() => setActiveTab('benchmarks')}
                    className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all border ${
                      activeTab === 'benchmarks'
                        ? 'bg-white/10 border-white/30 text-white shadow-sm'
                        : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    📊 Benchmarks
                  </button>
                  <button
                    onClick={() => setActiveTab('blueprint')}
                    className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all border flex items-center gap-2 ${
                      activeTab === 'blueprint'
                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,245,255,0.25)]'
                        : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>⚙ Live Blueprint</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'benchmarks' ? (
                    <motion.div
                      key="benchmarks"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 font-bold">
                        Production Engineering Benchmarks
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {activeData.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center flex flex-col justify-center"
                          >
                            <p
                              className="text-lg md:text-xl font-black mb-1 transition-all"
                              style={{ color: isOverdrive ? '#10B981' : activeData.color }}
                            >
                              {isOverdrive && idx === 1 ? '104k/s' : m.value}
                            </p>
                            <p className="text-[9px] uppercase tracking-widest font-mono text-gray-500">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="blueprint"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-black/60 border border-white/10 rounded-2xl p-4 relative overflow-hidden font-mono text-xs"
                    >
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>{selectedTier}.config.ts</span>
                        </span>
                        <button
                          onClick={() => {
                            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                              navigator.clipboard.writeText(activeData.blueprint);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-wider font-bold transition-colors flex items-center gap-1"
                        >
                          {copied ? <span className="text-emerald-400">✔ Copied</span> : <span>⚡ Copy</span>}
                        </button>
                      </div>
                      <pre className="text-primary text-[11px] leading-relaxed overflow-x-auto [text-shadow:0_0_10px_rgba(0,245,255,0.25)]">
                        <code>{activeData.blueprint}</code>
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Status */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Cluster Health: 100% OPTIMAL</span>
                  <span className="text-primary font-bold">● ZERO DROPPED PACKETS</span>
                </div>
              </HoverGlowCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
