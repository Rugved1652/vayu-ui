// trigger.tsx
// UI: presentational

'use client';

import React, { forwardRef, useCallback } from 'react';
import { cn } from '../../utils';
import { useModal } from './Modal';
import type { ModalTriggerProps } from './types';

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, asChild = false, className, onClick, ...props }, ref) => {
    const { setOpen, open, triggerRef } = useModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        setOpen(true);
      }
    };

    // Merge trigger ref
    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref, triggerRef],
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: setRefs,
        onClick: handleClick,
        'aria-expanded': open,
        'aria-haspopup': 'dialog',
        ...props,
      });
    }

    return (
      <button
        ref={setRefs}
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center rounded-control px-4 py-2 text-sm font-medium transition-colors',
          'bg-surface text-surface-content hover:bg-muted',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
          'focus-visible:ring-offset-canvas',
          className,
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        {...props}
      >
        {children}
      </button>
    );
  },
);
ModalTrigger.displayName = 'Modal.Trigger';

export { ModalTrigger };
