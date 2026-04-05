// footer.tsx
// UI: Card footer for actions

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { CardFooterProps } from './types';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 pt-2 border-t border-border justify-end', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'Card.Footer';
