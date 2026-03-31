// label.tsx
// UI: presentational

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';
import type { ContextMenuLabelProps } from './types';

const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="presentation"
      className={clsx(
        'px-3 py-2 text-xs font-secondary font-semibold',
        'text-neutral-500 dark:text-neutral-400 uppercase tracking-wider',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

ContextMenuLabel.displayName = 'ContextMenu.Label';

export { ContextMenuLabel };
