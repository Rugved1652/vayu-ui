// CommandBoxGroup.tsx
// Group items with sticky header

'use client';

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import type { CommandBoxGroupProps } from './types';

export const CommandBoxGroup = forwardRef<HTMLDivElement, CommandBoxGroupProps>(
  ({ label, children, className, ...props }, ref) => {
    return (
      <div ref={ref} role="group" aria-label={label} className={clsx('py-1', className)} {...props}>
        <div
          aria-hidden="true"
          className={clsx(
            'sticky top-0 z-10',
            'px-3 py-1.5 -mx-2 mb-1',
            'text-xs font-semibold uppercase tracking-wide',
            'text-muted-content bg-elevated/95 backdrop-blur-sm',
            'border-b border-border',
          )}
        >
          {label}
        </div>
        {children}
      </div>
    );
  },
);

CommandBoxGroup.displayName = 'CommandBox.Group';
