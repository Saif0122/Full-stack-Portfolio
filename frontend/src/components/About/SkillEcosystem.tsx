"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_DATABASE, SKILL_CATEGORIES } from '@/constants/skills';
import SkillCategory from './SkillCategory';

const SkillEcosystem: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // We want to group the database into our main display columns
  // If "All" is selected, show grouped categories. 
  // If a specific filter is selected, show only that category's skills.
  
  // Define the base columns for our layout (similar to original page)
  const layoutCategories = ['Frontend', 'Backend', 'Database', 'DevOps'];

  return (
    <div className="w-full">
      {/* Ecosystem Filtering Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] block mb-4">Competency</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">Technology Ecosystem</h2>
          <p className="text-gray-400 font-light text-sm max-w-xl">
            Interactive visualization of my technical stack. Hover over any technology to view practical experience and project utilization metrics.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 overflow-hidden group ${
                  isActive 
                    ? 'text-black bg-primary shadow-[0_0_20px_rgba(0,245,255,0.3)]' 
                    : 'text-gray-400 bg-white/5 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20'
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {layoutCategories.map((categoryTitle, idx) => {
            // If filtering by specific category, hide the others
            if (activeFilter !== 'All' && activeFilter !== categoryTitle) return null;

            const categorySkills = SKILL_DATABASE.filter(s => s.category === categoryTitle);

            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={categoryTitle}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <SkillCategory 
                  title={categoryTitle} 
                  skills={categorySkills} 
                  index={idx}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SkillEcosystem;
