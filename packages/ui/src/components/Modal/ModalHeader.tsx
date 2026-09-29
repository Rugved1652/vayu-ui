'use client';
import React, { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { ModalClose } from './ModalClose';

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  showClose?: boolean;
  closeLabel?: string;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, showClose = true, closeLabel = 'Close modal', ...props }, ref) => {
    const items = React.Children.toArray(children);
    const close = items.find((child) => React.isValidElement(child) && child.type === ModalClose);
    return (
      <div ref={ref} className={cn('flex items-start gap-4 p-6 pb-0', className)} {...props}>
        <div className="min-w-0 flex-1 space-y-2">{items.filter((child) => child !== close)}</div>
        {close ?? (showClose ? <ModalClose aria-label={closeLabel} /> : null)}
      </div>
    );
  },
);
ModalHeader.displayName = 'Modal.Header';
