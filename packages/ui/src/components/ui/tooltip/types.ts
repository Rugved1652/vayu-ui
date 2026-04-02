// types.ts
// Types

import { HTMLAttributes } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Tooltip content — string or JSX. */
  content: React.ReactNode;
  /** Placement relative to the trigger. */
  position?: TooltipPosition;
  /** Show delay in ms. */
  delay?: number;
  /** Hide delay in ms (time before tooltip disappears after mouse leaves). */
  hideDelay?: number;
  children: React.ReactNode;
  /** Colour variant. */
  variant?: TooltipVariant;
  /** Disable the tooltip entirely. */
  disabled?: boolean;
  /** Show the directional arrow. */
  showArrow?: boolean;
  /** Minimum size for touch targets (WCAG 2.5.8). Default: true */
  ensureTouchTarget?: boolean;
}
