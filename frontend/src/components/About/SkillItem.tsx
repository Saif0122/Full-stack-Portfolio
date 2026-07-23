"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types/skills';

interface SkillItemProps {
  skill: Skill;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic hover state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos * 0.3);
    y.set(yPos * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative z-10">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className="relative flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer group transition-colors duration-300 hover:bg-primary/10 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
      >
        <span className="w-1.5 h-1.5 bg-primary/50 group-hover:bg-primary rounded-full transition-colors shadow-[0_0_8px_transparent] group-hover:shadow-[0_0_8px_#00F5FF]"></span>
        <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors">{skill.name}</span>

        {/* Floating Particle Accents on Hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div 
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: -20, y: -20 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute w-1 h-1 bg-primary/50 rounded-full blur-[1px] pointer-events-none"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], x: 20, y: -10 }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                className="absolute right-2 w-1.5 h-1.5 bg-primary/30 rounded-full blur-[1px] pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hover Details Popover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-[#0A0F1C]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-50 pointer-events-none"
          >
            {/* Popover Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A0F1C]/95 border-b border-r border-white/10 rotate-45" />
            
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <span className="text-primary font-black uppercase text-[10px] tracking-widest px-2 py-0.5 bg-primary/10 rounded-md border border-primary/20">
                  {skill.level}
                </span>
                <span className="text-gray-500 text-[10px] uppercase tracking-widest font-mono">
                  {skill.category}
                </span>
              </div>
              
              <h4 className="text-white font-bold text-sm tracking-tight">{skill.name}</h4>
              
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                {skill.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mt-1">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Experience</div>
                  <div className="text-primary font-black text-sm">{skill.yearsOfExperience}+ Years</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Projects</div>
                  <div className="text-white font-bold text-sm">{skill.projectCount}+ Built</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillItem;
