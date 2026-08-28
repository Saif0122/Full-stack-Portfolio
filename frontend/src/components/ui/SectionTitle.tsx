import React from 'react';
import { cn } from '@/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface SectionTitleProps extends HTMLMotionProps<"div"> {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionTitle({ 
  title, 
  subtitle, 
  align = 'center',
  className,
  ...props 
}: SectionTitleProps) {
  return (
    <motion.div 
      className={cn(
        'mb-20',
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      {...props}
    >
      <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
        {title.split(' ').map((word, i, arr) => (
          <span key={i} className={i === arr.length - 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500' : 'text-foreground'}>
            {word}{' '}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-gray-400 font-mono uppercase tracking-widest text-sm">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
