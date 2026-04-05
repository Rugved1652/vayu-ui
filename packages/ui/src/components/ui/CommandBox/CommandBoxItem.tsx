// CommandBoxItem.tsx
// Self-registering option with selection/highlight states

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useEffect, useMemo } from 'react';

import { useCommandBox } from './hooks';
import type { CommandBoxItemProps } from './types';

export const CommandBoxItem = forwardRef<HTMLDivElement, CommandBoxItemProps>(
  (
    {
      id: itemId,
      disabled = false,
      shortcut,
      icon,
      description,
      title: titleProp,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const { highlightedId, onSelect, registerItem, unregisterItem, showShortcuts, filteredItems } =
      useCommandBox();

    const isHighlighted = highlightedId === itemId;
    const itemTitle = titleProp ?? (typeof children === 'string' ? children : '');

    // Register item on mount
    useEffect(() => {
      registerItem({
        id: itemId,
        title: itemTitle,
        description,
        icon,
        shortcut,
        disabled,
      });
      return () => unregisterItem(itemId);
    }, [itemId, itemTitle, description, icon, shortcut, disabled, registerItem, unregisterItem]);

    // Check if item is in filtered results
    const isVisible = useMemo(() => {
      return filteredItems.some((item) => item.id === itemId);
    }, [filteredItems, itemId]);

    if (!isVisible) return null;

    const handleClick = () => {
      if (disabled) return;
      const item = filteredItems.find((i) => i.id === itemId);
      if (item) onSelect(item);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        role="option"
        id={`commandbox-item-${itemId}`}
        data-item-id={itemId}
        aria-selected={isHighlighted}
        aria-disabled={disabled}
        tabIndex={-1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-highlighted={isHighlighted ? '' : undefined}
        className={clsx(
          'flex items-center gap-3 px-3 py-2.5 rounded-control',
          'cursor-pointer select-none',
          'transition-colors duration-150',
          'min-h-[44px]',
          // Highlighted state
          isHighlighted && 'bg-brand/90 text-brand-content',
          // Default and hover states
          !isHighlighted &&
            !disabled && ['text-elevated-content', 'hover:bg-muted focus:bg-muted'],
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          // Focus ring
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-elevated',
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 w-5 h-5 flex items-center justify-center text-muted-content">
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{children || itemTitle}</div>
          {description && (
            <div
              className={clsx(
                'text-xs truncate mt-0.5',
                isHighlighted ? 'text-brand-content/80' : 'text-muted-content',
              )}
            >
              {description}
            </div>
          )}
        </div>
        {showShortcuts && shortcut && shortcut.length > 0 && (
          <div className="flex items-center gap-1 shrink-0">
            {shortcut.map((key, index) => (
              <React.Fragment key={index}>
                <kbd
                  className={clsx(
                    'px-1.5 py-0.5 text-xs rounded-sm',
                    'font-tertiary',
                    isHighlighted
                      ? 'bg-brand-content/20 text-brand-content'
                      : 'bg-muted/50 text-muted-content',
                  )}
                >
                  {key}
                </kbd>
                {index < shortcut.length - 1 && (
                  <span className="text-muted-content text-xs">+</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  },
);

CommandBoxItem.displayName = 'CommandBox.Item';
