'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-green-500 text-white border-b-4 border-green-700 active:border-b-0 active:translate-y-[2px] hover:bg-green-400',
      secondary: 'bg-blue-500 text-white border-b-4 border-blue-700 active:border-b-0 active:translate-y-[2px] hover:bg-blue-400',
      outline: 'bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800',
      ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
      danger: 'bg-red-500 text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-[2px] hover:bg-red-400',
      success: 'bg-yellow-400 text-gray-800 border-b-4 border-yellow-600 active:border-b-0 active:translate-y-[2px] hover:bg-yellow-300',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base font-bold',
      lg: 'px-8 py-4 text-lg font-bold',
      xl: 'px-10 py-5 text-xl font-bold uppercase tracking-wider',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
