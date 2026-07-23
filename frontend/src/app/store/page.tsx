'use client';

import { useState } from 'react';
import StoreHero from '@/components/Store/StoreHero';
import StoreCategories from '@/components/Store/StoreCategories';
import ProductCard from '@/components/Store/ProductCard';
import { MOCK_PRODUCTS } from '@/constants/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <StoreHero />
      
      <section className="relative w-full py-24 overflow-hidden">
        {/* Subtle Ambient Background Gradient for Grid */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <StoreCategories 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1400px] mx-auto perspective-[2000px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try selecting a different category.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
