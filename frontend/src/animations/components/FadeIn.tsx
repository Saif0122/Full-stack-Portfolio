import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { slideUpVariants } from '../variants';

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export function FadeIn({ children, delay = 0, ...props }: FadeInProps) {
  return (
    <motion.div
      variants={slideUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
