// utils.ts
// Helpers

import type { BaseTypographyProps } from './types';

// WCAG 2.2 AA: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt bold)
const getVariantClasses = (variant: BaseTypographyProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'text-canvas-content';
    case 'secondary':
      return 'text-muted-content';
    case 'tertiary':
      return 'text-surface-content/70';
    case 'error':
      return 'text-destructive';
    case 'warning':
      return 'text-warning';
    case 'info':
      return 'text-info';
    case 'success':
      return 'text-success';
    case 'gradient':
      return 'bg-linear-to-r from-brand via-brand/80 to-brand bg-clip-text text-transparent';
    default:
      return 'text-canvas-content';
  }
};

export { getVariantClasses };
