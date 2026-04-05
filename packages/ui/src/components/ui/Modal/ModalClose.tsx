// close.tsx
// UI: presentational

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { X } from 'lucide-react';
import { useModal } from './Modal';
import type { ModalCloseProps } from './types';

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, onClick, asChild = false, children, ...props }, ref) => {
    const { setOpen } = useModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        setOpen(false);
      }
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: handleClick,
        ...props,
      });
    }

    // Default X icon button
    if (!children) {
      return (
        <button
          ref={ref}
          type="button"
          className={cn(
            'inline-flex items-center justify-center rounded-control p-1.5',
            'text-muted-content hover:text-elevated-content',
            'transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
            'focus-visible:ring-offset-elevated',
            className,
          )}
          onClick={handleClick}
          aria-label="Close"
          {...props}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      );
    }

    // Custom close button with children
    return (
      <button ref={ref} type="button" className={className} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
ModalClose.displayName = 'Modal.Close';

export { ModalClose };
