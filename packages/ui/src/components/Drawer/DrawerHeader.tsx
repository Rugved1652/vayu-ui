'use client';
import React, { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { DrawerClose } from './DrawerClose';

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  showClose?: boolean;
  closeLabel?: string;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className, showClose = true, closeLabel = 'Close drawer', ...props }, ref) => {
    const items = React.Children.toArray(children);
    const close = items.find((child) => React.isValidElement(child) && child.type === DrawerClose);
    return (
      <div ref={ref} className={cn('flex items-start gap-4 text-left', className)} {...props}>
        <div className="min-w-0 flex-1 space-y-2">{items.filter((child) => child !== close)}</div>
        {close ?? (showClose ? <DrawerClose aria-label={closeLabel} /> : null)}
      </div>
    );
  },
);
DrawerHeader.displayName = 'Drawer.Header';
