// content.tsx
// UI: dropdown with positioning

'use client';

import React, { forwardRef, useCallback, useLayoutEffect, useState } from 'react';
import { cn } from '../utils';
import { useColorPicker } from './hooks';
import type { ColorPickerContentProps } from './types';

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  ({ children, align = 'start', side = 'bottom', sideOffset = 8, className, ...props }, ref) => {
    const { open, contentRef, triggerRef, dropdownId } = useColorPicker();
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // Positioning logic
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !contentRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0;
      let left = 0;

      // Vertical position
      if (side === 'bottom') {
        top = triggerRect.bottom + sideOffset;
        // Flip to top if not enough space below
        if (top + contentRect.height > viewportHeight) {
          top = triggerRect.top - contentRect.height - sideOffset;
        }
      } else {
        top = triggerRect.top - contentRect.height - sideOffset;
        // Flip to bottom if not enough space above
        if (top < 0) {
          top = triggerRect.bottom + sideOffset;
        }
      }

      // Horizontal position
      switch (align) {
        case 'start':
          left = triggerRect.left;
          break;
        case 'center':
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'end':
          left = triggerRect.right - contentRect.width;
          break;
      }

      // Keep within viewport
      if (left < 0) left = 8;
      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8;
      }

      setPosition({ top, left });
    }, [align, side, sideOffset, triggerRef, contentRef]);

    // Update position on open and scroll/resize
    useLayoutEffect(() => {
      if (!open) return;

      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updatePosition();
          contentRef.current?.focus();
        });
      });

      window.addEventListener('scroll', updatePosition, { passive: true, capture: true });
      window.addEventListener('resize', updatePosition, { passive: true });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [open, updatePosition, contentRef]);

    // Merge refs
    const mergedRef = (node: HTMLDivElement | null) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (contentRef as any).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ref as any).current = node;
      }
    };

    if (!open) return null;

    return (
      <div
        ref={mergedRef}
        id={dropdownId}
        role="dialog"
        aria-modal="false"
        aria-label="Color picker"
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 50,
        }}
        className={cn(
          'bg-elevated text-elevated-content border border-border',
          'rounded-overlay p-4 shadow-elevated',
          'animate-fade-in',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
          'min-w-70',
          className,
        )}
        {...props}
      >
        <div className="font-secondary">{children}</div>
      </div>
    );
  },
);

ColorPickerContent.displayName = 'ColorPicker.Content';
