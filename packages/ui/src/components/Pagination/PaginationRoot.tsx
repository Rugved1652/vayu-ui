// pagination-root.tsx
// UI: nav wrapper

import React from 'react';
import { cn } from '../../utils';
import type { PaginationRootProps } from './types';

export const PaginationRoot = React.forwardRef<HTMLElement, PaginationRootProps>(
  ({ children, className, 'aria-label': ariaLabel = 'Pagination', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);
PaginationRoot.displayName = 'PaginationRoot';
