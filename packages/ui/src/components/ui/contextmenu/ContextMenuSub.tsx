// sub.tsx
// UI: presentational

import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';
import React, { forwardRef, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SubmenuContext, useContextMenuCtx, useMenuKeyboard, useMenuPosition } from './hooks';
import type {
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
} from './types';

// Sub

const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children }) => {
  const id = useId();
  const { openSubmenu, closeSubmenu, openSubmenus } = useContextMenuCtx();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const isOpen = openSubmenus.has(id);

  const handleOpen = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ x: rect.right, y: rect.top });
    }
    openSubmenu(id);
  }, [id, openSubmenu]);

  const handleClose = useCallback(() => {
    closeSubmenu(id);
  }, [id, closeSubmenu]);

  return (
    <SubmenuContext.Provider
      value={{
        id,
        isOpen,
        position,
        triggerRef,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </SubmenuContext.Provider>
  );
};

ContextMenuSub.displayName = 'ContextMenu.Sub';

// SubTrigger

const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ children, disabled = false, icon, className, ...props }, ref) => {
    const submenuCtx = useContext(SubmenuContext);
    if (!submenuCtx) throw new Error('SubTrigger must be used within Sub');

    const { isOpen, triggerRef, handleOpen, handleClose } = submenuCtx;

    const handleMouseEnter = useCallback(() => {
      if (!disabled) handleOpen();
    }, [disabled, handleOpen]);

    const handleMouseLeave = useCallback(() => {
      if (!disabled) handleClose();
    }, [disabled, handleClose]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        switch (e.key) {
          case 'Enter':
          case ' ':
          case 'ArrowRight':
            e.preventDefault();
            e.stopPropagation();
            handleOpen();
            break;
          case 'ArrowLeft':
          case 'Escape':
            e.preventDefault();
            e.stopPropagation();
            handleClose();
            triggerRef.current?.focus();
            break;
        }
      },
      [disabled, handleOpen, handleClose, triggerRef],
    );

    return (
      <div
        ref={triggerRef}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        className={clsx(
          'px-3 py-2 mx-1 rounded-md flex items-center justify-between gap-3',
          'font-secondary text-sm transition-colors cursor-pointer',
          'focus-visible:bg-primary-50 focus-visible:text-primary-600',
          'dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : isOpen
              ? 'bg-primary-50 dark:bg-primary-900/20 text-neutral-900 dark:text-white'
              : 'text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20',
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
        <ChevronRight
          className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400"
          aria-hidden="true"
        />
      </div>
    );
  },
);

ContextMenuSubTrigger.displayName = 'ContextMenu.SubTrigger';

// SubContent

const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ children, className, ...props }, ref) => {
    const submenuCtx = useContext(SubmenuContext);
    if (!submenuCtx) throw new Error('SubContent must be used within Sub');

    const { isOpen, position, triggerRef, handleOpen, handleClose } = submenuCtx;

    const [isMounted, setIsMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const { adjusted, maxHeight } = useMenuPosition(
      position,
      contentRef,
      4,
      true,
      isMounted && isOpen,
    );

    const returnToTrigger = useCallback(() => {
      handleClose();
      triggerRef.current?.focus();
    }, [handleClose, triggerRef]);

    const handleKeyDown = useMenuKeyboard(contentRef, returnToTrigger, returnToTrigger);

    useEffect(() => {
      if (isOpen && isMounted && contentRef.current) {
        requestAnimationFrame(() => {
          contentRef.current?.querySelector<HTMLElement>(
            '[role="menuitem"]:not([aria-disabled="true"]), [role="menuitemcheckbox"]:not([aria-disabled="true"]), [role="menuitemradio"]:not([aria-disabled="true"])',
          )?.focus();
        });
      }
    }, [isOpen, isMounted]);

    if (!isMounted || !isOpen) return null;

    return createPortal(
      <div
        ref={contentRef}
        role="menu"
        aria-label="Submenu"
        style={{
          position: 'fixed',
          top: `${adjusted.y}px`,
          left: `${adjusted.x}px`,
          zIndex: 10000,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        }}
        className={clsx(
          'min-w-[200px] bg-white dark:bg-neutral-900',
          'border-2 border-neutral-200 dark:border-neutral-800',
          'rounded-lg shadow-2xl py-1',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'overflow-y-auto',
          className,
        )}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>,
      document.body,
    );
  },
);

ContextMenuSubContent.displayName = 'ContextMenu.SubContent';

export { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent };
