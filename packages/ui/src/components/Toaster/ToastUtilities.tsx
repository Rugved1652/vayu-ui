// compound.tsx
// UI: compound sub-components

'use client';

import React, { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';

const ToastTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('font-semibold font-primary text-sm text-surface-content', className)}
      {...props}
    />
  ),
);
ToastTitle.displayName = 'Toast.Title';

const ToastDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm font-secondary text-muted-content', className)}
      {...props}
    />
  ),
);
ToastDescription.displayName = 'Toast.Description';

const ToastClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      type="button"
      aria-label={children ? undefined : 'Close notification'}
      ref={ref}
      className={cn(
        'p-1.5 min-h-[28px] min-w-[28px] rounded-control',
        'text-muted-content',
        'hover:text-surface-content',
        'hover:bg-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1',
        'transition-colors',
        className,
      )}
      {...props}
    >
      {children ?? <X className="h-4 w-4" aria-hidden="true" />}
    </button>
  ),
);
ToastClose.displayName = 'Toast.Close';

export { ToastTitle, ToastDescription, ToastClose };
