// pagination-info.tsx
// UI: "Showing X to Y of Z" display

import React from 'react';
import { cn } from '../../utils';
import type { PaginationInfoProps } from './types';

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  totalItems,
  pageSize,
  currentPage,
  className,
  ...props
}) => {
  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <p
      className={cn('text-sm font-secondary text-muted-content', className)}
      role="status"
      aria-live="polite"
      {...props}
    >
      Showing <span className="font-semibold text-canvas-content">{startItem}</span> to{' '}
      <span className="font-semibold text-canvas-content">{endItem}</span> of{' '}
      <span className="font-semibold text-canvas-content">{totalItems}</span> results
    </p>
  );
};
