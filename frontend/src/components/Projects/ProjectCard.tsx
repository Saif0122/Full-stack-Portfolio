"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive = false }) => {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full outline-none">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative h-full flex flex-col p-6 rounded-3xl border transition-all duration-500 overflow-hidden group ${
          isActive 
            ? 'bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(0,245,255,0.2)]' 
            : 'bg-white/5 border-white/10 hover:border-primary/30 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Hover Lighting / Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Animated Border Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 aspect-video rounded-2xl overflow-hidden mb-6 grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700">
          <Image 
            src={project.image} 
            width={600} 
            height={400} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-[#0A0F1C]/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
        
        <div className="relative z-10 flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h4>
          <span className="text-[9px] font-mono text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded-full uppercase tracking-widest whitespace-nowrap ml-2">
            {project.category.split(' ')[0]}
          </span>
        </div>
        
        <p className="relative z-10 text-gray-500 text-xs line-clamp-3 font-light leading-relaxed flex-grow">
          {project.summary}
        </p>

        {/* Dynamic Tags Preview */}
        {project.tags && project.tags.length > 0 && (
          <div className="relative z-10 flex gap-2 mt-4 pt-4 border-t border-white/5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] text-gray-400 font-mono">#{tag}</span>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  );
};
