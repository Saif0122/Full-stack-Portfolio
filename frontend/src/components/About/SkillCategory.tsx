"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types/skills';
import SkillItem from './SkillItem';

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  index?: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, index = 0 }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-8 bg-white/5 border border-white/10 rounded-3xl relative overflow-visible group hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(0,245,255,0.1)] h-full"
    >
      {/* Animated Glow on Hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/50 rounded-tl-2xl transition-colors duration-500 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/50 rounded-br-2xl transition-colors duration-500 pointer-events-none" />

      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 group-hover:border-primary/20 transition-colors">
        <h3 className="text-primary text-xs font-black uppercase tracking-[0.2em]">
          {title}
        </h3>
        <span className="text-gray-500 text-[10px] font-mono font-bold px-2 py-0.5 bg-white/5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          {skills.length} TECH
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillItem key={skill.id} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCategory;
