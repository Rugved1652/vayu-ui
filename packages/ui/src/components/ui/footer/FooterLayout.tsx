// FooterLayout.tsx
// UI: layout primitives (Container, Grid, Bottom)

import React from 'react';
import { cn } from '../utils';

// Container

function FooterContainer({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12', className)} {...props}>
      {children}
    </div>
  );
}
FooterContainer.displayName = 'Footer.Container';

// Grid

function FooterGrid({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'grid gap-8',
        'group-data-[variant=default]/footer:grid-cols-1 group-data-[variant=default]/footer:md:grid-cols-2 group-data-[variant=default]/footer:lg:grid-cols-4',
        'group-data-[variant=centered]/footer:grid-cols-1 group-data-[variant=centered]/footer:text-center group-data-[variant=centered]/footer:justify-items-center',
        'group-data-[variant=minimal]/footer:grid-cols-1 group-data-[variant=minimal]/footer:md:grid-cols-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
FooterGrid.displayName = 'Footer.Grid';

// Bottom

function FooterBottom({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-4',
        'group-data-[variant=centered]/footer:justify-center group-data-[variant=centered]/footer:items-center group-data-[variant=centered]/footer:text-center',
        'group-data-[variant=default]/footer:justify-between group-data-[variant=default]/footer:items-center',
        'group-data-[variant=minimal]/footer:justify-between group-data-[variant=minimal]/footer:items-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
FooterBottom.displayName = 'Footer.Bottom';

export { FooterContainer, FooterGrid, FooterBottom };
