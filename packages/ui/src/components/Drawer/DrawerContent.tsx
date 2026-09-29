// content.tsx
// UI: presentational

'use client';

import React, { forwardRef, useCallback, useLayoutEffect, useRef, HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { useDrawer } from './Drawer';
import type { DrawerContentProps } from './types';

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, className, trapFocus = true, onKeyDown, ...props }, ref) => {
    const { open, setOpen, side, titleId, descriptionId, modal } = useDrawer();
    const contentRef = useRef<HTMLDivElement>(null);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const previousFocus = useRef<HTMLElement | null>(null);
    // Focus management
    useLayoutEffect(() => {
      if (open && trapFocus && modal) {
        previousFocus.current = document.activeElement as HTMLElement | null;
        const focusable = contentRef.current?.querySelector<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        (focusable ?? contentRef.current)?.focus({ preventScroll: true });
        return () => {
          previousFocus.current?.focus({ preventScroll: true });
        };
      }
    }, [open, trapFocus, modal]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }

      if (e.key === 'Tab' && trapFocus && modal) {
        const focusableElements = contentRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (!focusableElements || focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus({ preventScroll: true });
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus({ preventScroll: true });
          }
        }
      }
    };

    if (!open) return null;

    // Positioning by side
    const sideClasses = {
      top: 'inset-x-0 top-0 border-b border-border data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom:
        'inset-x-0 bottom-0 border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
      right:
        'inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
    };

    return (
      <div
        ref={setRefs}
        role="dialog"
        tabIndex={-1}
        aria-modal={modal || undefined}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-state={open ? 'open' : 'closed'}
        className={cn(
          'fixed z-50 flex flex-col bg-elevated p-6 shadow-elevated',
          'transition ease-in-out duration-300',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          sideClasses[side],
          className,
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DrawerContent.displayName = 'Drawer.Content';

export { DrawerContent };
