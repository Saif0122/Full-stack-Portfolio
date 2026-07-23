'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  thumbnail: string;
}

export default function ProductGallery({ images, thumbnail }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const allImages = [thumbnail, ...images];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted border border-border/50">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={allImages[activeIndex] || 'https://via.placeholder.com/1200x800'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            alt={`Gallery image ${activeIndex + 1}`}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`
              relative w-24 aspect-video rounded-xl overflow-hidden border-2 flex-shrink-0 transition-colors
              ${activeIndex === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}
            `}
          >
            <img src={img || 'https://via.placeholder.com/200x120'} className="w-full h-full object-cover" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
