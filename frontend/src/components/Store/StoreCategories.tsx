'use client';

import { STORE_CATEGORIES } from '@/constants/store';
import { motion } from 'framer-motion';

interface StoreCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function StoreCategories({ activeCategory, onCategoryChange }: StoreCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-16 justify-center max-w-3xl mx-auto p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative z-20">
      {STORE_CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              relative px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 outline-none
              ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary rounded-xl shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
