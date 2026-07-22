import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const badgeVariants = cva(
  'inline-flex items-center uppercase tracking-widest font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary/20 text-primary border border-primary/30',
        secondary: 'bg-white/10 text-white border border-white/20',
        outline: 'border border-primary text-primary',
      },
      size: {
        sm: 'text-[10px] px-2 py-1 rounded-md',
        default: 'text-xs px-3 py-1 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
