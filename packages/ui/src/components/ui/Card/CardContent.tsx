// content.tsx
// UI: Card content wrapper

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { CardContentProps } from './types';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('font-secondary text-sm text-surface-content/80 leading-relaxed', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'Card.Content';
