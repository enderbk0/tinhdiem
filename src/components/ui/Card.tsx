'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  selected?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, selected, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -3 }}
        className={cn(
          'p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white dark:bg-gray-900',
          selected
            ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
