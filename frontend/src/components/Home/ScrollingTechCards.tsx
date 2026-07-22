import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const techStack = [
  { name: 'React', category: 'Frontend', color: 'bg-cyan-500', desc: 'Component-driven UIs with advanced state management.' },
  { name: 'Node.js', category: 'Backend', color: 'bg-green-500', desc: 'Asynchronous event-driven JavaScript runtime.' },
  { name: 'MongoDB', category: 'Database', color: 'bg-emerald-600', desc: 'NoSQL distributed database for modern apps.' },
  { name: 'Next.js', category: 'Fullstack', color: 'bg-white', desc: 'React framework for production grade applications.' },
  { name: 'TypeScript', category: 'Language', color: 'bg-blue-500', desc: 'Strongly typed programming language.' },
  { name: 'Redis', category: 'Caching', color: 'bg-red-500', desc: 'In-memory data structure store.' }
];

const TiltCard = ({ tech, index }: { tech: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, zIndex: 10 }}
      className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/20 to-white/5 overflow-hidden group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="h-full w-full bg-[#070B14]/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between border border-white/5 group-hover:border-primary/30 transition-colors">
        <div className="flex justify-between items-start mb-12">
          <div className={`w-3 h-3 rounded-full ${tech.color} shadow-[0_0_15px_currentColor]`} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{tech.category}</span>
        </div>
        <div>
          <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">{tech.name}</h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed">{tech.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ScrollingTechCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Technology Stack</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">MERN Ecosystem</h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm font-light leading-relaxed mb-2">
            Leveraging modern tools to build scalable, high-performance web applications that deliver premium user experiences.
          </p>
        </div>

        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, i) => (
            <TiltCard key={i} tech={tech} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
