// CommandBoxEmpty.tsx
// No-results state with aria-live

'use client';

import { clsx } from 'clsx';
import React from 'react';

import { useCommandBox } from './hooks';
import type { CommandBoxEmptyProps } from './types';

export const CommandBoxEmpty: React.FC<CommandBoxEmptyProps> = ({ children, className, ...props }) => {
  const { filteredItems, searchQuery, loading } = useCommandBox();

  // Don't show if loading, no search, or has results
  if (loading || !searchQuery || filteredItems.length > 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx('py-8 text-center', 'text-muted-content text-sm', className)}
      {...props}
    >
      {children || 'No results found'}
    </div>
  );
};

CommandBoxEmpty.displayName = 'CommandBox.Empty';
