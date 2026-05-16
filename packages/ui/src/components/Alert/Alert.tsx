// alert.tsx
// Composition: UI + logic

import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { AlertRootProps, AlertVariant } from './types';
import { AlertIcon } from './AlertIcon';
import { AlertTitle } from './AlertTitle';
import { AlertDescription } from './AlertDescription';
import { AlertDismiss } from './AlertDismiss';
import { AlertContent } from './AlertContent';

// Layout
const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-info/10 border-info/40 text-surface-content',
  success: 'bg-success/10 border-success/40 text-surface-content',
  warning: 'bg-warning/10 border-warning/40 text-surface-content',
  error: 'bg-destructive/10 border-destructive/40 text-surface-content',
};

const variantRole: Record<AlertVariant, 'alert' | 'status'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
};

const variantLive: Record<AlertVariant, 'polite' | 'assertive'> = {
  info: 'polite',
  success: 'polite',
  warning: 'assertive',
  error: 'assertive',
};

// Root
const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(
  ({ variant = 'info', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={variantRole[variant]}
        aria-live={variantLive[variant]}
        aria-atomic="true"
        className={cn(
          'relative flex gap-3 p-4 border rounded-surface w-full font-secondary',
          variantStyles[variant],
          className,
        )}
        data-variant={variant}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AlertRoot.displayName = 'Alert';

// Compound component
export const Alert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
  Dismiss: AlertDismiss,
  Content: AlertContent,
});

export default Alert;
