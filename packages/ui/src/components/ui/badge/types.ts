// types.ts
// Types

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type BadgeVariant = 'brand' | 'muted' | 'warning' | 'success' | 'destructive' | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<ComponentPropsWithoutRef<'span'>, 'onClick'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Forces a specific HTML tag */
  as?: 'span' | 'div' | 'a';
  /** Makes the badge interactive (renders as <button>) */
  onClick?: () => void;
  /** Adds a dismiss button */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
  children?: ReactNode;
}
