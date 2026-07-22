import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-black uppercase tracking-widest text-xs transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]',
        secondary: 'bg-white text-black hover:bg-primary hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'text-primary hover:bg-primary/10',
        glass: 'bg-white/5 border border-white/10 backdrop-blur-md text-foreground hover:bg-white/10',
      },
      size: {
        default: 'px-8 py-4 rounded-xl',
        sm: 'px-4 py-2 rounded-lg',
        lg: 'px-10 py-5 rounded-2xl',
        icon: 'p-3 rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild: _asChild = false, ...props }, ref) => {
    void _asChild;
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
