"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const About: React.FC = () => {
  const impactMetrics = [
    { value: '40%', label: 'API Latency Reduction', desc: 'Optimized through multi-layer Redis caching and query tuning.' },
    { value: '95+', label: 'Lighthouse Score', desc: 'Achieved via aggressive SSR strategies and asset optimization.' },
    { value: '10k+', label: 'Concurrent Users', desc: 'Systems designed for high-throughput WebSocket events.' },
    { value: '3x', label: 'DB Performance', desc: 'Achieved through strict ESR indexing and aggregation tuning.' }
  ];

  const principles = [
    { title: 'Scalability Over Hacks', desc: 'Write code that survives the next 100k users, not just the next sprint.' },
    { title: 'Architecture First', desc: 'Design robust API contracts and system boundaries before touching the UI.' },
    { title: 'Optimize Methodically', desc: 'Measure performance bottlenecks before scaling infrastructure horizontally.' },
    { title: 'Modular Monoliths', desc: 'Prefer cohesive modules over microservice complexity unless scale demands it.' },
    { title: 'Data Integrity', desc: 'Schema design is the foundation; code is just the logic that moves it.' }
  ];

  const archApproaches = [
    { title: 'System Mindset', desc: 'Focusing on long-term maintainability and clear domain boundaries.' },
    { title: 'Multi-Tenancy', desc: 'Implementing strict isolation logic via tenant-aware middleware.' },
    { title: 'Smart Caching', desc: 'Utilizing Redis for materialized views to significantly reduce DB load.' },
    { title: 'Query Indexing', desc: 'Applying compound indexing strategies based on query-first design.' },
    { title: 'Observability', desc: 'Integrating detailed logging and performance tracking for pro-active monitoring.' }
  ];

   const experience = [
    {
      year: '2023 – Present',
      role: 'Technical Team Lead',
      company: 'SMIT (Saylani Mass IT Training)',
      points: [
        'Orchestrating the technical journey for 7000+ students globally.',
        'Leading cross-functional developer teams for large-scale LMS builds.',
        'Advocating for modern React patterns and scalable system architectures.',
      ]
    },
    {
      year: '2022 – 2023',
      role: 'Frontend developer',
      company: 'Fiver',
      points: [
        'Delivered 30+ custom solutions for international startups.',
        'Maintained 100% job success score with repeat client business.',
        'Specialized in performant e-commerce and SaaS dashboards.'
      ]
    },
    {
      year: '2022 – 2023',
      role: 'Frontend developer',
      company: 'Developer HUB Corporation',
      points: [
        'Delivered 30+ custom solutions for international startups.',
        'Maintained 100% job success score with repeat client business.',
        'Specialized in performant e-commerce and SaaS dashboards.'
      ]
    }
  ];
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-white overflow-x-hidden">
      
      {/* 1. HERO POSITIONING SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="text-primary font-mono text-[10px] uppercase tracking-widest font-bold">
                Senior System Architect
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
              Engineering With <br />
              <span className="text-primary">Purpose</span>
            </h1>
            
            <p className="text-primary text-xl font-bold mb-6 tracking-tight">
              Designing resilient systems for massive scale.
            </p>

            <div className="text-gray-400 text-lg font-light leading-relaxed max-w-xl space-y-6">
              <p>
                I’m Saiful Islam, a frontend-focused MERN stack developer passionate about building modern, high-performance web experiences.

                I specialize in crafting scalable React and Next.js applications with clean architecture, smooth interactions, and performance-first thinking.
              </p>
              <p>**My goal isn’t just to build websites — it’s to create digital products that feel fast, intuitive, and built for growth.**
              </p>
              <p>**I enjoy solving complex UI challenges and transforming designs into seamless digital experiences.**</p>
              <p>
                With a strong foundation in frontend engineering and full-stack capability using the MERN stack, I help startups and businesses turn ideas into reliable, scalable web applications.

                I believe great products are built with attention to detail, performance optimization, and long-term maintainability from the very first line of code.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border-2 border-primary/20 shadow-[0_0_50px_rgba(0,245,255,0.15)] group"
            >
              <Image 
                src="/img/saif.jpg" 
                alt="Saiful Islam - Senior System Architect" 
                width={800}
                height={800}
                priority={true}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/40 to-transparent"></div>
            </motion.div>
            <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. IMPACT METRICS SECTION */}
      <section className="py-24 bg-[#070B14] border-y border-white/5 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Benchmarks</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">Impact & Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((m, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl group hover:border-primary/30 transition-all"
              >
                <div className="text-4xl font-black text-primary mb-2">{m.value}</div>
                <div className="text-white font-bold text-sm uppercase tracking-widest mb-3">{m.label}</div>
                <p className="text-gray-500 text-xs font-light leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SKILLS & MASTERY SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="mb-16">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Competency</span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">Skills & Mastery</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SkillCategory 
            title="Frontend" 
            skills={['Next.js (App Router)', 'React Architecture', 'Performance Optimization', 'SSR / ISR', 'State Management']} 
          />
          <SkillCategory 
            title="Backend" 
            skills={['Node.js & Express', 'REST & GraphQL Design', 'WebSocket Systems', 'JWT & OIDC Auth', 'Middleware Architecture']} 
          />
          <SkillCategory 
            title="Database" 
            skills={['MongoDB Indexing', 'Aggregation Pipelines', 'NoSQL Schema Design', 'Query Performance Tuning']} 
          />
          <SkillCategory 
            title="DevOps" 
            skills={['Vercel / AWS Deployment', 'CI/CD Pipelines', 'System Monitoring', 'Log Aggregation']} 
          />
        </div>
      </section>

      {/* 4. HOW I APPROACH ARCHITECTURE */}
      <section className="py-32 bg-[#070B14] border-y border-white/5 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4 italic">Strategy</span>
              <h2 className="text-4xl font-black tracking-tighter uppercase text-white mb-6">How I Approach <br />Architecture</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Software is an asset that must grow. I focus on building foundations that don&apos;t need to be rewritten every year.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {archApproaches.map((approach, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl"
                >
                  <h3 className="text-primary text-sm font-black uppercase tracking-widest mb-3">{approach.title}</h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">{approach.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENGINEERING PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-20">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Mindset</span>
          <h2 className="text-4xl font-black tracking-tighter uppercase text-white">Engineering Principles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center group hover:border-primary/50 transition-all"
            >
              <h3 className="text-white font-bold text-sm mb-4 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-gray-500 text-[10px] leading-relaxed uppercase tracking-widest font-mono">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. EXPERIENCE SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-black tracking-tighter uppercase text-white sticky top-32">
              Credibility & <br />
              <span className="text-primary">Experience</span>
            </h2>
          </div>
          <div className="lg:w-2/3 space-y-20 relative">
            <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-primary via-white/10 to-transparent"></div>
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="pl-12 relative"
              >
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_#00F5FF]"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{exp.year}</span>
                  <span className="text-primary font-black uppercase text-[10px] tracking-widest px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    {exp.company}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{exp.role}</h3>
                <ul className="space-y-4">
                  {exp.points.map((p, j) => (
                    <li key={j} className="text-gray-400 font-light text-sm flex gap-4">
                      <span className="text-primary/50 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            
            <motion.div {...fadeInUp} className="pl-12 pt-8">
              <a 
                href="https://github.com/saifulislam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all group"
              >
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Active Github Repository
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. EDUCATION SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
          <span className="w-8 h-1 bg-primary"></span> Academic Foundation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div {...fadeInUp} className="p-10 bg-white/5 border border-white/10 rounded-[2rem]">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">2021</span>
            <h3 className="text-xl font-bold text-white mb-2 uppercase">Metriculation (Computer Science)</h3>
            <p className="text-primary font-black uppercase text-[10px] tracking-widest mb-6">Al-khair Public High School</p>
            <p className="text-gray-500 text-sm font-light">
              Studied core computer science fundamentals,
              Built foundation in programming and IT concepts,
              Developed strong analytical and problem-solving skills</p>
          </motion.div>
          <motion.div {...fadeInUp} className="p-10 bg-white/5 border border-white/10 rounded-[2rem]">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">2022 – 2024</span>
            <h3 className="text-xl font-bold text-white mb-2 uppercase">Intermedite Computer Science</h3>
            <p className="text-primary font-black uppercase text-[10px] tracking-widest mb-6">Global Degree Collage</p>
            <p className="text-gray-500 text-sm font-light">
              Advanced studies in programming and database concepts,
              Worked on academic software development projects,
              Strengthened understanding of web technologies</p>
          </motion.div>
          <motion.div {...fadeInUp} className="p-10 bg-white/5 border border-white/10 rounded-[2rem]">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">2024 – 2025</span>
            <h3 className="text-xl font-bold text-white mb-2 uppercase">DIT (Diploma in Information technology)</h3>
            <p className="text-primary font-black uppercase text-[10px] tracking-widest mb-6">Bitel Technical University</p>
            <p className="text-gray-500 text-sm font-light">Hands-on training in web development and office automation,
              Learned practical software and technical skills,
              Focused on real-world application development.</p>
          </motion.div>
        </div>
      </section>

      {/* 8. STRONG CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-card border border-white/10 p-20 rounded-[4rem] shadow-2xl relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8">
            If you&apos;re building something and want to grow <br />
            your business, <span className="text-primary">let&apos;s build it properly.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <Link 
              href="/projects" 
              className="px-12 py-5 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              View Systems Archive
            </Link>
            <Link 
              href="/contact" 
              className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
            >
              Hire Me
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const SkillCategory: React.FC<{ title: string, skills: string[] }> = ({ title, skills }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-8 bg-white/5 border border-white/10 rounded-3xl"
  >
    <h3 className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
      {title}
    </h3>
    <ul className="space-y-4">
      {skills.map((skill, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className="w-1 h-1 bg-primary rounded-full"></span>
          <span className="text-gray-300 text-sm font-medium">{skill}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default About;
