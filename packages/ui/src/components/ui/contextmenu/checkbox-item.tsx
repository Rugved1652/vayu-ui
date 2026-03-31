// checkbox-item.tsx
// UI: presentational

import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import React, { forwardRef, useCallback } from 'react';
import { useItemKeyDown, baseItemStyles } from './hooks';
import type { ContextMenuCheckboxItemProps } from './types';

const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  (
    { children, checked = false, onCheckedChange, disabled = false, icon, className, ...props },
    ref,
  ) => {
    const handleClick = useCallback(() => {
      if (!disabled) onCheckedChange?.(!checked);
    }, [disabled, checked, onCheckedChange]);

    const handleKeyDown = useItemKeyDown(disabled, handleClick);

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={clsx(baseItemStyles(disabled), className)}
        {...props}
      >
        <span className="shrink-0 w-4 h-4" aria-hidden="true">
          {checked ? (
            <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          ) : (
            <span className="w-4 h-4" />
          )}
        </span>
        {icon && (
          <span className="shrink-0 w-4 h-4" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
      </div>
    );
  },
);

ContextMenuCheckboxItem.displayName = 'ContextMenu.CheckboxItem';

export { ContextMenuCheckboxItem };
