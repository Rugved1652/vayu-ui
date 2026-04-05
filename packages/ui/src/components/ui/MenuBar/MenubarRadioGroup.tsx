// radio-group.tsx
// Composition: radio group context + radio items

import React, { createContext, useContext, useRef } from 'react';
import { cn } from '../utils';
import { useMenubarContext, useMenuContext, useMenuNavigation } from './hooks';
import type { MenuRadioGroupProps, MenuRadioItemProps } from './types';

// Context

const MenuRadioGroupContext = createContext<
  | {
      value?: string;
      onValueChange?: (value: string) => void;
    }
  | undefined
>(undefined);

// RadioGroup

export const MenuRadioGroup = ({
  children,
  value,
  onValueChange,
  className = '',
  ...props
}: MenuRadioGroupProps) => {
  return (
    <MenuRadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={className} role="group" {...props}>
        {children}
      </div>
    </MenuRadioGroupContext.Provider>
  );
};

// RadioItem

export const MenuRadioItem = ({
  children,
  icon,
  shortcut,
  value,
  disabled = false,
  className = '',
  ...props
}: MenuRadioItemProps) => {
  const { orientation } = useMenubarContext();
  const menuContext = useMenuContext();
  const radioContext = useContext(MenuRadioGroupContext);
  const itemRef = useRef<HTMLButtonElement>(null);

  const isChecked = radioContext?.value === value;

  const handleClick = () => {
    if (disabled) return;
    radioContext?.onValueChange?.(value);
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
      role="menuitemradio"
      aria-checked={isChecked}
      aria-disabled={disabled || undefined}
      tabIndex={0}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 shrink-0" aria-hidden="true">
          {isChecked && (
            <svg
              className="w-4 h-4 text-brand dark:text-brand"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="4" />
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
