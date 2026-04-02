// constants.ts
// Constants

import type { ToastType, ToastPosition } from './types';

export const typeStyles = {
  success: {
    border: 'border-l-success',
    icon: 'text-success',
    progress: 'bg-success',
    role: 'status' as const,
    live: 'polite' as const,
    label: 'Success',
  },
  error: {
    border: 'border-l-destructive',
    icon: 'text-destructive',
    progress: 'bg-destructive',
    role: 'alert' as const,
    live: 'assertive' as const,
    label: 'Error',
  },
  warning: {
    border: 'border-l-warning',
    icon: 'text-warning',
    progress: 'bg-warning',
    role: 'alert' as const,
    live: 'assertive' as const,
    label: 'Warning',
  },
  info: {
    border: 'border-l-info',
    icon: 'text-info',
    progress: 'bg-info',
    role: 'status' as const,
    live: 'polite' as const,
    label: 'Information',
  },
  loading: {
    border: 'border-l-muted',
    icon: 'text-muted-content',
    progress: 'bg-muted-content',
    role: 'status' as const,
    live: 'polite' as const,
    label: 'Loading',
  },
} satisfies Record<
  ToastType,
  {
    border: string;
    icon: string;
    progress: string;
    role: 'status' | 'alert';
    live: 'polite' | 'assertive';
    label: string;
  }
>;

export const PORTAL_ID = 'vayu-toast-portal';

export const VISIBLE_TOASTS = 3;
export const GAP = 14;
export const TOAST_HEIGHT_OFFSET = 10;
export const SCALE_STEP = 0.05;

export const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-0 left-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-0 right-0',
};
