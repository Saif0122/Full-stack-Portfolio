import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const cardVariants = cva(
  'rounded-2xl transition-all duration-300 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-white/5 border border-white/10 hover:border-primary/50',
        glass: 'bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10',
        gradient: 'bg-gradient-to-br from-white/10 to-transparent border border-white/10',
        solid: 'bg-card border border-border',
      },
      padding: {
        none: '',
        sm: 'p-4',
        default: 'p-8',
        lg: 'p-12',
      },
      hoverEffect: {
        none: '',
        glow: 'hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] hover:-translate-y-2',
        lift: 'hover:-translate-y-2 hover:shadow-xl',
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      hoverEffect: 'glow',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverEffect, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverEffect, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
