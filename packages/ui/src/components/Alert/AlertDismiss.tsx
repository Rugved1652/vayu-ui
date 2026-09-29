// AlertDismiss.tsx
// UI: presentational
import { forwardRef } from 'react';
import { cn } from '../../utils';
import { X as XIcon } from 'lucide-react';
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
          'inline-flex shrink-0 self-start items-center justify-center min-h-9 min-w-9 rounded-control p-2 transition-colors',
          'hover:bg-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'ring-offset-surface',
          variantIconStyles[variant],
          variantFocusStyles[variant],
          className,
        )}
        aria-label={ariaLabel}
        {...props}
      >
        <XIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  },
);
AlertDismiss.displayName = 'Alert.Dismiss';
