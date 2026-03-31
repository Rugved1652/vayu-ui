// trigger.tsx
// UI: presentational

import { clsx } from 'clsx';
import React, { forwardRef, useCallback } from 'react';
import type { ContextMenuTriggerProps } from './types';

const ContextMenuTrigger = forwardRef<
  HTMLDivElement,
  ContextMenuTriggerProps & {
    onContextMenu?: (e: React.MouseEvent) => void;
  }
>(({ children, disabled = false, className, onContextMenu, ...props }, ref) => {
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (!disabled) onContextMenu?.(e);
    },
    [disabled, onContextMenu],
  );

  return (
    <div
      ref={ref}
      onContextMenu={handleContextMenu}
      className={clsx(disabled && 'opacity-50 cursor-not-allowed', className)}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
    </div>
  );
});

ContextMenuTrigger.displayName = 'ContextMenu.Trigger';

export { ContextMenuTrigger };
