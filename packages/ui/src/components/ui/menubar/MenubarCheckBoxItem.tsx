// checkbox-item.tsx
// UI: presentational

import React, { useRef } from 'react';
import { cn } from '../utils';
import { useMenubarContext, useMenuContext, useMenuNavigation } from './hooks';
import type { MenuCheckboxItemProps } from './types';

export const MenuCheckboxItem = ({
  children,
  icon,
  shortcut,
  checked = false,
  disabled = false,
  onCheckedChange,
  className = '',
  ...props
}: MenuCheckboxItemProps) => {
  const { orientation } = useMenubarContext();
  const menuContext = useMenuContext();
  const itemRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  };

  const handleKeyDown = useMenuNavigation(itemRef, disabled, orientation, menuContext.level);

  return (
    <button
      ref={itemRef}
      className={cn(
        'text-surface-content dark:text-surface-content',
        'hover:bg-muted/80 dark:hover:bg-white/10',
        'w-full px-3 py-2 text-left text-sm min-h-10',
        'duration-(--transition-fast)',
        'focus:outline-none focus-visible:bg-muted/80 focus-visible:text-brand',
        'dark:focus-visible:bg-white/10 dark:focus-visible:text-brand',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-between gap-2',
        className,
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        handleKeyDown(e);
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          handleClick();
        }
      }}
      disabled={disabled}
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={0}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 shrink-0" aria-hidden="true">
          {checked && (
            <svg
              className="w-4 h-4 text-brand dark:text-brand"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
        {icon && (
          <span className="w-4 h-4 shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </div>
      {shortcut && (
        <span
          className="text-xs text-muted-content dark:text-muted-content"
          aria-label={`Shortcut: ${shortcut}`}
        >
          {shortcut}
        </span>
      )}
    </button>
  );
};
