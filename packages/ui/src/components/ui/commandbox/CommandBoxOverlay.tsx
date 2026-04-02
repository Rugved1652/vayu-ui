// CommandBoxOverlay.tsx
// Portal-based overlay with backdrop

'use client';

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';

import { useCommandBox } from './hooks';
import type { CommandBoxOverlayProps } from './types';

export const CommandBoxOverlay = forwardRef<HTMLDivElement, CommandBoxOverlayProps>(
  ({ children, className, ...props }, ref) => {
    const { open } = useCommandBox();

    if (!open) return null;

    return createPortal(
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-sm animate-in fade-in-0"
          aria-hidden="true"
        />
        {/* Command Box Container */}
        <div
          ref={ref}
          className={clsx(
            'fixed left-1/2 top-[15%] z-50 -translate-x-1/2',
            'w-full max-w-xl',
            'rounded-overlay',
            'border border-border',
            'bg-elevated',
            'shadow-elevated',
            'overflow-hidden',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </>,
      document.body,
    );
  },
);

CommandBoxOverlay.displayName = 'CommandBox.Overlay';
