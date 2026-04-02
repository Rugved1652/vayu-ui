// CommandBoxSeparator.tsx
// Visual divider

'use client';

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import type { CommandBoxSeparatorProps } from './types';

export const CommandBoxSeparator = forwardRef<HTMLDivElement, CommandBoxSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={clsx('h-px my-1 mx-2', 'bg-border', className)}
        {...props}
      />
    );
  },
);

CommandBoxSeparator.displayName = 'CommandBox.Separator';
