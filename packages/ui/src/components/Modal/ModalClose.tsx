'use client';
import React, { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';
import { useModal } from './Modal';
import type { ModalCloseProps } from './types';

export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, onClick, asChild = false, children, ...props }, ref) => {
    const { setOpen } = useModal();
    const child =
      asChild && React.isValidElement(children)
        ? (children as React.ReactElement<
            React.ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }
          >)
        : null;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      child?.props.onClick?.(event);
      if (!event.defaultPrevented) onClick?.(event);
      if (!event.defaultPrevented) setOpen(false);
    };
    if (child)
      return React.cloneElement(child, {
        ...props,
        className: cn(child.props.className, className),
        ref: (node: HTMLButtonElement | null) => {
          for (const target of [ref, child.props.ref]) {
            if (typeof target === 'function') target(node);
            else if (target) target.current = node;
          }
        },
        onClick: handleClick,
      });
    return (
      <button
        ref={ref}
        type="button"
        aria-label={children ? undefined : 'Close modal'}
        className={cn(
          'inline-flex shrink-0 items-center justify-center self-start min-h-9 min-w-9 rounded-control p-2 text-muted-content hover:bg-muted hover:text-elevated-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
        onClick={handleClick}
      >
        {children ?? <X className="h-4 w-4" aria-hidden="true" />}
      </button>
    );
  },
);
ModalClose.displayName = 'Modal.Close';
