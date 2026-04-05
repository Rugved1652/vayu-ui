// AlertDismiss.tsx
// UI: presentational
import { forwardRef } from 'react';
import { cn } from '../utils';
import { XIcon } from '../../icons/x-icon';
import type { AlertDismissProps } from './types';

const variantIconStyles: Record<import('./types').AlertVariant, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-destructive',
};

const variantFocusStyles: Record<import('./types').AlertVariant, string> = {
  info: 'focus-visible:ring-info',
  success: 'focus-visible:ring-success',
  warning: 'focus-visible:ring-warning',
  error: 'focus-visible:ring-destructive',
};

export const AlertDismiss = forwardRef<HTMLButtonElement, AlertDismissProps>(
  ({ variant = 'info', alertTitle, className, onClick, ...props }, ref) => {
    const ariaLabel = alertTitle
      ? `Dismiss ${variant} alert: ${alertTitle}`
      : `Dismiss ${variant} alert`;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          'absolute top-4 right-4 rounded p-1 transition-colors',
          'hover:bg-black/10 dark:hover:bg-white/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'ring-offset-surface',
          variantIconStyles[variant],
          variantFocusStyles[variant],
          className,
        )}
        aria-label={ariaLabel}
        {...props}
      >
        <XIcon />
      </button>
    );
  },
);
AlertDismiss.displayName = 'Alert.Dismiss';
