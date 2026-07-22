
import React from 'react';
import Image from 'next/image';
import { PerformanceMetrics } from './PerformanceMetrics';

export const FeaturedCaseStudy: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Sticky Nav */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-32 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-8">Navigation</p>
            {['Overview', 'Architecture', 'Performance', 'Results'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-10">
          <div id="overview" className="mb-24">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 mb-8 inline-block">
              Flagship Project
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10">
              Nexus Cloud: <br />
              <span className="text-primary">Enterprise Scalability</span>
            </h2>
            <p className="text-2xl text-gray-400 font-light leading-relaxed mb-12 max-w-4xl">
              Building a high-concurrency cloud storage and management infrastructure from scratch using the MERN stack and AWS S3 integration.
            </p>
            
            <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/10 group relative">
              <Image 
                src="https://picsum.photos/1600/900?random=102" 
                alt="Nexus Cloud Architecture" 
                width={1600}
                height={900}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-60"></div>
            </div>

          </div>

          <div id="architecture" className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6">The Problem</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Legacy systems were failing under concurrent loads exceeding 5,000 users. File upload latency was averaging 4.2 seconds, and data consistency across distributed nodes was a major bottleneck.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-purple-500 mb-6">The Solution</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Re-engineered the backend as a set of stateless micro-services. Implemented Redis-based caching for frequent data lookups and a chunked upload strategy for large files, reducing latency by 70%.
              </p>
            </div>
          </div>

          <div id="performance" className="mb-24 p-12 bg-white/5 border border-white/10 rounded-[2.5rem]">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-12 text-center">Engineered Performance</h3>
            <PerformanceMetrics />
          </div>

          <div id="results" className="flex flex-wrap gap-4">
             {['Next.js 15', 'TypeScript', 'Node.js', 'Redis', 'AWS S3', 'MongoDB'].map(tag => (
               <span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300">
                 {tag}
               </span>
             ))}
             <button className="ml-auto px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary transition-all">
               Visit Live Project
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};
