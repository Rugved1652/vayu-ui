// content.tsx
// UI: presentational

import { clsx } from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useContextMenuCtx, useMenuKeyboard, useMenuPosition } from './hooks';
import type { ContextMenuContentProps } from './types';

const ContextMenuContent = forwardRef<
  HTMLDivElement,
  ContextMenuContentProps & { position?: { x: number; y: number } }
>(({ children, className, align = 'start', sideOffset = 4, position, ...props }, ref) => {
  const { closeMenu, menuId } = useContextMenuCtx();
  const [isMounted, setIsMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { adjusted, maxHeight } = useMenuPosition(
    position,
    contentRef,
    sideOffset,
    false,
    isMounted,
  );

  const handleKeyDown = useMenuKeyboard(contentRef, closeMenu);

  useEffect(() => {
    if (isMounted && contentRef.current) {
      requestAnimationFrame(() => {
        contentRef.current?.querySelector<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"]), [role="menuitemcheckbox"]:not([aria-disabled="true"]), [role="menuitemradio"]:not([aria-disabled="true"])',
        )?.focus();
      });
    }
  }, [isMounted]);

  if (!isMounted || !position) return null;

  return createPortal(
    <div
      ref={contentRef}
      id={menuId}
      role="menu"
      aria-label="Context menu"
      style={{
        position: 'fixed',
        top: `${adjusted.y}px`,
        left: `${adjusted.x}px`,
        zIndex: 9999,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
      }}
      className={clsx(
        'min-w-[220px] bg-white dark:bg-neutral-900',
        'border-2 border-neutral-200 dark:border-neutral-800',
        'rounded-lg shadow-2xl py-1',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        'overflow-y-auto',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
});

ContextMenuContent.displayName = 'ContextMenu.Content';

export { ContextMenuContent };
