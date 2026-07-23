'use client';

import { Product } from '@/types/store';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-[2rem] bg-background/40 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden cursor-pointer h-full flex flex-col"
    >
      {/* Glare Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)",
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
        }}
      />

      <Link href={`/store/${product.slug}`} className="flex flex-col h-full z-10" style={{ transform: "translateZ(30px)" }}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[2rem]">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
          <motion.img 
            src={product.thumbnail || 'https://via.placeholder.com/800x600'} 
            alt={product.title}
            className="object-cover w-full h-full"
            style={{ transform: "translateZ(20px)" }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Badges */}
          <div className="absolute top-5 left-5 z-20 flex gap-2" style={{ transform: "translateZ(40px)" }}>
            {product.isNew && (
              <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full backdrop-blur-md shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                New
              </span>
            )}
            {product.isPopular && (
              <span className="px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full backdrop-blur-md shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                Popular
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
          <div className="mb-6">
            <h3 className="text-2xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
              {product.shortDescription || product.description}
            </p>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex flex-col">
              {product.salePrice ? (
                <>
                  <span className="text-xs text-muted-foreground line-through decoration-red-500/50">${product.price}</span>
                  <span className="text-2xl font-black text-white">${product.salePrice}</span>
                </>
              ) : (
                <span className="text-2xl font-black text-white">${product.price}</span>
              )}
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 transform group-hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
