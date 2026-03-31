// item.tsx
// UI: presentational

import { clsx } from 'clsx';
import React, { forwardRef, useCallback, useState } from 'react';
import { useContextMenuCtx, useItemKeyDown, baseItemStyles } from './hooks';
import type { ContextMenuItemProps } from './types';

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (
    {
      children,
      onSelect,
      disabled = false,
      destructive = false,
      icon,
      shortcut,
      className,
      ...props
    },
    ref,
  ) => {
    const { closeMenu } = useContextMenuCtx();
    const [isFocused, setIsFocused] = useState(false);

    const handleClick = useCallback(() => {
      if (disabled) return;
      onSelect?.();
      closeMenu();
    }, [disabled, onSelect, closeMenu]);

    const handleKeyDown = useItemKeyDown(disabled, handleClick);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-focused={isFocused ? '' : undefined}
        className={clsx(
          baseItemStyles(disabled, destructive ? 'destructive' : undefined),
          'focus:bg-primary-500! focus:text-white!',
          'justify-between',
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <span className="shrink-0 w-4 h-4" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="truncate">{children}</span>
        </div>
        {shortcut && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono shrink-0">
            {shortcut}
          </span>
        )}
      </div>
    );
  },
);

ContextMenuItem.displayName = 'ContextMenu.Item';

export { ContextMenuItem };
