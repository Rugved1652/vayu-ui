// menu.tsx
// Composition: top-level menu trigger + dropdown

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useElementPosition } from 'vayu-ui';
import { cn } from '../../utils';
import {
  useMenubarContext,
  useMenuContext,
  MenuContext,
  useTypeahead,
  useFocusItems,
} from './hooks';
import { Portal } from './MenubarPortal';
import type { MenuProps } from './types';

export const Menu = ({
  children,
  trigger,
  disabled = false,
  className = '',
  ...props
}: MenuProps) => {
  const {
    orientation,
    activeMenu,
    setActiveMenu,
    registerTrigger,
    unregisterTrigger,
    getAllTriggers,
  } = useMenubarContext();
  const menuId = useId();
  const triggerId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const level = 0;

  const position = useElementPosition(triggerRef, isOpen);
  const handleTypeahead = useTypeahead(menuRef);
  const { focusFirstItem, focusLastItem } = useFocusItems(menuRef);

  // Register this trigger
  useEffect(() => {
    registerTrigger(menuId, triggerRef);
    return () => unregisterTrigger(menuId);
  }, [menuId, registerTrigger, unregisterTrigger]);

  // Sync with global active menu state
  useEffect(() => {
    setIsOpen(activeMenu === menuId);
  }, [activeMenu, menuId]);

  // Focus first item when menu opens
  useEffect(() => {
    if (isOpen) {
      focusFirstItem();
    }
  }, [isOpen, focusFirstItem]);

  const handleTriggerClick = () => {
    if (disabled) return;
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };

  const navigateToAdjacentMenu = useCallback(
    (direction: 'next' | 'prev') => {
      const triggers = getAllTriggers();
      const currentIndex = triggers.findIndex((t) => t.id === menuId);

      if (currentIndex === -1) return;

      const targetIndex =
        direction === 'next'
          ? (currentIndex + 1) % triggers.length
          : currentIndex === 0
            ? triggers.length - 1
            : currentIndex - 1;

      const targetTrigger = triggers[targetIndex];
      if (targetTrigger && targetTrigger.ref.current) {
        targetTrigger.ref.current.focus();
        if (isOpen) {
          setActiveMenu(targetTrigger.id);
        }
      }
    },
    [getAllTriggers, menuId, isOpen, setActiveMenu],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setActiveMenu(menuId);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveMenu(menuId);
        focusFirstItem();
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveMenu(menuId);
        focusLastItem();
        break;
      case 'Escape':
        e.preventDefault();
        setActiveMenu(null);
        triggerRef.current?.focus();
        break;
      case 'ArrowRight':
        if (orientation === 'horizontal') {
          e.preventDefault();
          navigateToAdjacentMenu('next');
        }
        break;
      case 'ArrowLeft':
        if (orientation === 'horizontal') {
          e.preventDefault();
          navigateToAdjacentMenu('prev');
        }
        break;
      case 'Home':
        if (orientation === 'horizontal') {
          e.preventDefault();
          const triggers = getAllTriggers();
          triggers[0]?.ref.current?.focus();
        }
        break;
      case 'End':
        if (orientation === 'horizontal') {
          e.preventDefault();
          const triggers = getAllTriggers();
          triggers[triggers.length - 1]?.ref.current?.focus();
        }
        break;
    }
  };

  // Handle printable characters for typeahead
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
      value={{ isOpen, setIsOpen, level, parentId: menuId, menuRef, triggerRef, handleTypeahead }}
    >
      <div className={`relative ${className}`} data-menu-id={menuId} {...props}>
        <button
          ref={triggerRef}
          id={triggerId}
          className={cn(
            'text-surface-content dark:text-surface-content',
            'hover:bg-muted/80 dark:hover:bg-white/10',
            'data-[state=open]:bg-muted/80 dark:data-[state=open]:bg-white/10',
            'px-3 py-2 rounded-control',
            'duration-(--transition-fast)',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
            'dark:focus-visible:ring-offset-surface',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'text-sm font-medium',
          )}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          aria-disabled={disabled || undefined}
          data-state={isOpen ? 'open' : 'closed'}
        >
          {trigger}
        </button>

        {isOpen && (
          <Portal>
            <div
              ref={menuRef}
              id={menuId}
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
                top: `${position.top}px`,
                left: `${position.left}px`,
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
