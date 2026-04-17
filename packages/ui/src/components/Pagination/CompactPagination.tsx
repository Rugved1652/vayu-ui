// compact-pagination.tsx
// UI: prev/next only variant

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils';
import type { CompactPaginationProps } from './types';

export const CompactPagination: React.FC<CompactPaginationProps> = ({
  currentPage,
  totalPages,
  hrefBuilder,
  className,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}) => {
  const buttonClasses = cn(
    'h-[36px] px-3 text-sm rounded-control',
    'font-secondary font-medium transition-all duration-150',
    'inline-flex items-center justify-center gap-1.5',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1',
    'focus-visible:ring-offset-canvas',
    'border border-border',
    'bg-surface text-surface-content',
    'hover:bg-muted/50 hover:border-field',
  );

  const disabledButtonClasses = cn(
    buttonClasses,
    'opacity-40 cursor-not-allowed pointer-events-none',
  );

  return (
    <nav
      aria-label={ariaLabel}
      className={cn('flex items-center justify-between gap-4', className)}
      {...props}
    >
      {/* Previous */}
      {currentPage === 1 ? (
        <span className={disabledButtonClasses} aria-disabled="true">
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </span>
      ) : (
        <Link href={hrefBuilder(currentPage - 1)} className={buttonClasses}>
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Link>
      )}

      {/* Status */}
      <span
        className="text-sm font-secondary text-muted-content tabular-nums"
        role="status"
        aria-live="polite"
      >
        Page <span className="font-bold text-brand">{currentPage}</span> of {totalPages}
      </span>

      {/* Next */}
      {currentPage === totalPages ? (
        <span className={disabledButtonClasses} aria-disabled="true">
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      ) : (
        <Link href={hrefBuilder(currentPage + 1)} className={buttonClasses}>
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
};
