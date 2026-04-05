// submenu.tsx
// Composition: nested submenu trigger + dropdown

import React, { useCallback, useId, useRef, useState } from 'react';
import { useElementPosition } from 'vayu-ui';
import { cn } from '../utils';
import { useMenuContext, MenuContext, useTypeahead, useFocusItems } from './hooks';
import { Portal } from './MenubarPortal';
import type { MenuProps } from './types';

export const SubMenu = ({
  children,
  trigger,
  disabled = false,
  className = '',
  ...props
}: MenuProps) => {
  const parentContext = useMenuContext();
  const submenuId = useId();
  const triggerId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const level = parentContext.level + 1;
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const position = useElementPosition(triggerRef, isOpen);
  const handleTypeahead = useTypeahead(menuRef);
  const { focusFirstItem, focusLastItem } = useFocusItems(menuRef);

  const handleMouseEnter = () => {
    if (disabled) return;
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowRight':
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
        focusFirstItem();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        // Navigate to next item in parent menu
        const parentMenu = triggerRef.current?.closest('[role="menu"]');
        const items = parentMenu?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])',
        );
        if (items && items.length > 0) {
          const currentIndex = Array.from(items).indexOf(triggerRef.current!);
          const nextIndex = (currentIndex + 1) % items.length;
          items[nextIndex]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        // Navigate to previous item in parent menu
        const parentMenuUp = triggerRef.current?.closest('[role="menu"]');
        const itemsUp = parentMenuUp?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])',
        );
        if (itemsUp && itemsUp.length > 0) {
          const currentIndex = Array.from(itemsUp).indexOf(triggerRef.current!);
          const prevIndex = currentIndex <= 0 ? itemsUp.length - 1 : currentIndex - 1;
          itemsUp[prevIndex]?.focus();
        }
        break;
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Home':
        e.preventDefault();
        e.stopPropagation();
        const parentMenuHome = triggerRef.current?.closest('[role="menu"]');
        const itemsHome = parentMenuHome?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])',
        );
        itemsHome?.[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        e.stopPropagation();
        const parentMenuEnd = triggerRef.current?.closest('[role="menu"]');
        const itemsEnd = parentMenuEnd?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])',
        );
        if (itemsEnd && itemsEnd.length > 0) {
          itemsEnd[itemsEnd.length - 1]?.focus();
        }
        break;
    }
  };

  // Handle printable characters for typeahead on submenu
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        handleTypeahead(e.key);
      }
    },
    [handleTypeahead],
  );

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        level,
        parentId: submenuId,
        menuRef,
        triggerRef,
        handleTypeahead,
      }}
    >
      <div
        className={`relative ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <button
          ref={triggerRef}
          id={triggerId}
          className={cn(
            'text-surface-content dark:text-surface-content',
            'hover:bg-muted/80 dark:hover:bg-white/10',
            'data-[state=open]:bg-muted/80 dark:data-[state=open]:bg-white/10',
            'w-full px-3 py-2 text-left text-sm',
            'duration-(--transition-fast)',
            'focus:outline-none focus-visible:bg-muted/80 focus-visible:text-brand',
            'dark:focus-visible:bg-white/10 dark:focus-visible:text-brand',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'flex items-center justify-between gap-2',
          )}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={isOpen ? submenuId : undefined}
          aria-disabled={disabled || undefined}
          data-state={isOpen ? 'open' : 'closed'}
          tabIndex={0}
        >
          <span>{trigger}</span>
          <svg
            className="w-4 h-4 shrink-0 text-muted-content dark:text-muted-content"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {isOpen && (
          <Portal>
            <div
              ref={menuRef}
              id={submenuId}
              data-menu-portal
              className={cn(
                'fixed min-w-[200px] z-50',
                'bg-elevated dark:bg-elevated',
                'border border-border dark:border-border',
                'rounded-surface shadow-elevated',
                'py-1',
                'animate-fade-in',
              )}
              style={{
                top: `${position.top - 42}px`,
                left: `${position.left + position.width}px`,
              }}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={triggerId}
              onKeyDown={handleMenuKeyDown}
              tabIndex={-1}
            >
              {children}
            </div>
          </Portal>
        )}
      </div>
    </MenuContext.Provider>
  );
};
