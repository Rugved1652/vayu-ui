// CommandBoxSeparator.tsx
// Visual divider

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useMemo } from 'react';

import { useCommandBox } from './hooks';
import type { CommandBoxSeparatorProps } from './types';

export const CommandBoxSeparator = forwardRef<HTMLDivElement, CommandBoxSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { filteredItems, searchQuery } = useCommandBox();

    // Hide separator when searching and fewer than 2 groups have visible items
    const shouldHide = useMemo(() => {
      if (!searchQuery) return false;
      const visibleGroups = new Set(
        filteredItems.map((item) => item.group).filter(Boolean),
      );
      return visibleGroups.size < 2;
    }, [filteredItems, searchQuery]);

    if (shouldHide) return null;

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={clsx('h-px my-1', 'bg-border', className)}
        {...props}
      />
    );
  },
);

CommandBoxSeparator.displayName = 'CommandBox.Separator';
