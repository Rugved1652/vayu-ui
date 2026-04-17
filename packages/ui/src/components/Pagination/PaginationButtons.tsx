// pagination-buttons.tsx
// UI: full page navigation with first/prev/pages/next/last

import React from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '../../utils';
import type { PaginationButtonsProps } from './types';
import { getPaginationRange } from './utils';

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  hrefBuilder,
  pageRange = 'compact',
  siblingCount = 1,
  className,
  ...props
}) => {
  const pages = getPaginationRange(currentPage, totalPages, siblingCount, pageRange);

  const baseClasses = cn(
    'min-w-[36px] h-[36px] px-2.5 text-sm rounded-control',
    'font-secondary font-medium transition-all duration-150',
    'inline-flex items-center justify-center',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1',
    'focus-visible:ring-offset-canvas',
    'border border-border',
  );

  const inactiveClasses = cn(
    'bg-surface',
    'text-surface-content',
    'hover:bg-muted/50',
    'hover:border-field',
  );

  const activeClasses = cn('bg-brand', 'text-brand-content', 'border-brand');

  const disabledClasses = 'opacity-40 cursor-not-allowed pointer-events-none';

  // Render helper
  const renderPageButton = (
    content: React.ReactNode,
    page: number | null,
    ariaLabel: string,
    isDisabled: boolean = false,
    isActive: boolean = false,
    key?: string,
  ) => {
    const classes = cn(
      baseClasses,
      isDisabled
        ? cn(inactiveClasses, disabledClasses)
        : isActive
          ? activeClasses
          : inactiveClasses,
    );

    if (isDisabled) {
      return (
        <span key={key} className={classes} aria-disabled="true" aria-label={ariaLabel}>
          {content}
        </span>
      );
    }

    if (isActive) {
      return (
        <span key={key} className={classes} aria-current="page" aria-label={ariaLabel}>
          {content}
        </span>
      );
    }

    return (
      <Link key={key} href={hrefBuilder(page!)} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  };

  return (
    <div className={cn('flex items-center gap-1 flex-wrap', className)} role="group" {...props}>
      {/* First Page */}
      {renderPageButton(
        <ChevronsLeft className="w-4 h-4" aria-hidden="true" />,
        1,
        'First page',
        currentPage === 1,
      )}

      {/* Previous Page */}
      {renderPageButton(
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />,
        currentPage - 1,
        'Previous page',
        currentPage === 1,
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (typeof page === 'string') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                'min-w-[36px] h-[36px] px-2.5 text-sm rounded-control',
                'inline-flex items-center justify-center text-muted-content border border-transparent',
              )}
              aria-hidden="true"
            >
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }

        const isActive = page === currentPage;
        return renderPageButton(page, page, `Go to page ${page}`, false, isActive, `page-${page}`);
      })}

      {/* Next Page */}
      {renderPageButton(
        <ChevronRight className="w-4 h-4" aria-hidden="true" />,
        currentPage + 1,
        'Next page',
        currentPage === totalPages,
      )}

      {/* Last Page */}
      {renderPageButton(
        <ChevronsRight className="w-4 h-4" aria-hidden="true" />,
        totalPages,
        'Last page',
        currentPage === totalPages,
      )}
    </div>
  );
};
