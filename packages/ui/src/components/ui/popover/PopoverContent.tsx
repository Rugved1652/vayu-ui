// content.tsx
// UI: positioned popover content

'use client';
import React, { forwardRef, useLayoutEffect } from 'react';
import { cn, useMergeRefs } from '../utils';
import { usePopover, usePopoverPosition } from './hooks';
import { arrowPositionClasses } from './types';
import type { PopoverContentProps } from './types';

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      children,
      align = 'center',
      side = 'bottom',
      sideOffset = 8,
      alignOffset = 0,
      className = '',
      showArrow = false,
      avoidCollisions = true,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, contentRef, triggerRef, modal } = usePopover();
    const mergedRefs = useMergeRefs(contentRef, ref);
    const { position, currentSide } = usePopoverPosition({
      side,
      align,
      sideOffset,
      alignOffset,
      avoidCollisions,
      triggerRef,
      contentRef,
      isOpen: open,
    });

    // Focus content on open
    useLayoutEffect(() => {
      if (open && contentRef.current) {
        const rafId = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            contentRef.current?.focus();
          });
        });
        return () => cancelAnimationFrame(rafId);
      }
    }, [open, contentRef]);

    if (!open) return null;

    return (
      <>
        {modal && (
          <div
            className="fixed inset-0 bg-canvas-content/50 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
        <div
          ref={mergedRefs}
          role="dialog"
          aria-modal={modal ? 'true' : 'false'}
          tabIndex={-1}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 50,
          }}
          className={cn(
            'bg-elevated text-elevated-content border border-border shadow-elevated',
            'rounded-overlay p-4',
            'animate-fade-in',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-elevated',
            className,
          )}
          {...props}
        >
          {showArrow && (
            <div
              className={cn(
                'absolute w-2 h-2 rotate-45 bg-elevated border border-border',
                arrowPositionClasses[currentSide],
                currentSide === 'bottom' && 'border-b-0 border-r-0',
                currentSide === 'top' && 'border-t-0 border-l-0',
                currentSide === 'left' && 'border-l-0 border-b-0',
                currentSide === 'right' && 'border-r-0 border-t-0',
              )}
              aria-hidden="true"
            />
          )}

          <div className="font-secondary text-elevated-content">{children}</div>
        </div>
      </>
    );
  },
);

PopoverContent.displayName = 'Popover.Content';

export default PopoverContent;
