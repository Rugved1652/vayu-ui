// content.tsx
// UI: presentational

'use client';

import React, { forwardRef, useCallback, useEffect, useRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { X } from 'lucide-react';
import { useDrawer } from './Drawer';
import { DrawerClose } from './DrawerClose';
import type { DrawerContentProps } from './types';

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, className, trapFocus = true, onKeyDown, ...props }, ref) => {
    const { open, setOpen, side, titleId, descriptionId } = useDrawer();
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

    // Focus management
    useEffect(() => {
      if (open && trapFocus) {
        const focusable = contentRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        setTimeout(() => focusable?.focus(), 50);
      }
    }, [open, trapFocus]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);

      if (e.key === 'Escape') {
        setOpen(false);
      }

      if (e.key === 'Tab' && trapFocus) {
        const focusableElements = contentRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
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
        aria-modal="true"
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
        <DrawerClose
          className={cn(
            'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity',
            'hover:opacity-100 focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-elevated',
            'disabled:pointer-events-none',
            'data-[state=open]:bg-muted',
          )}
          aria-label="Close drawer"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DrawerClose>
      </div>
    );
  },
);
DrawerContent.displayName = 'Drawer.Content';

export { DrawerContent };
