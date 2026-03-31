// separator.tsx
// UI: presentational

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';
import type { ContextMenuSeparatorProps } from './types';

const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={clsx('my-1 mx-2 h-px bg-neutral-200 dark:bg-neutral-800', className)}
      {...props}
    />
  ),
);

ContextMenuSeparator.displayName = 'ContextMenu.Separator';

export { ContextMenuSeparator };
