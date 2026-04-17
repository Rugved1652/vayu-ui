// CommandBoxGroup.tsx
// Group items with sticky header

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useMemo } from 'react';

import { CommandBoxGroupContext } from './hooks';
import { useCommandBox } from './hooks';
import type { CommandBoxGroupProps } from './types';

export const CommandBoxGroup = forwardRef<HTMLDivElement, CommandBoxGroupProps>(
  ({ label, children, className, ...props }, ref) => {
    const { filteredItems, searchQuery } = useCommandBox();

    // Hide the group if searching and no items in this group match
    const hasVisibleItems = useMemo(() => {
      if (!searchQuery) return true;
      return filteredItems.some((item) => item.group === label);
    }, [filteredItems, searchQuery, label]);

    if (!hasVisibleItems) return null;

    return (
      <CommandBoxGroupContext.Provider value={label}>
        <div ref={ref} role="group" aria-label={label} className={clsx('', className)} {...props}>
          <div
            aria-hidden="true"
            className={clsx(
              'sticky top-0 z-10',
              'px-3 py-1 my-1',
              'text-xs font-semibold uppercase tracking-wide',
              'text-muted-content bg-elevated/95 backdrop-blur-sm',
              'border-b border-border',
            )}
          >
            {label}
          </div>
          {children}
        </div>
      </CommandBoxGroupContext.Provider>
    );
  },
);

CommandBoxGroup.displayName = 'CommandBox.Group';
