// types.ts
// Types & design token maps

import { HTMLAttributes } from 'react';

// ============================================================================
// Types & Enums
// ============================================================================

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted';
type DividerSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type DividerColor = 'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'info';
type DividerSize = 'thin' | 'normal' | 'thick' | 'bold';

interface DividerRootProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  spacing?: DividerSpacing;
  decorative?: boolean;
}

interface DividerLineProps extends HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
  color?: DividerColor;
  size?: DividerSize;
  thickness?: number;
  opacity?: number;
  orientation?: DividerOrientation;
}

interface DividerLabelProps extends HTMLAttributes<HTMLSpanElement> {
  color?: DividerColor;
}

// ============================================================================
// Design Token Maps
// ============================================================================

const spacingMap: Record<DividerSpacing, string> = {
  none: 'my-0',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
  xl: 'my-8',
  '2xl': 'my-12',
};

const verticalSpacingMap: Record<DividerSpacing, string> = {
  none: 'mx-0',
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-6',
  xl: 'mx-8',
  '2xl': 'mx-12',
};

const variantMap: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const colorMap: Record<DividerColor, string> = {
  default: 'border-border',
  brand: 'border-brand',
  success: 'border-success',
  warning: 'border-warning',
  destructive: 'border-destructive',
  info: 'border-info',
};

const labelColorMap: Record<DividerColor, string> = {
  default: 'text-muted-content',
  brand: 'text-brand',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  info: 'text-info',
};

const sizeMap: Record<DividerSize, number> = {
  thin: 1,
  normal: 2,
  thick: 3,
  bold: 4,
};

export { spacingMap, verticalSpacingMap, variantMap, colorMap, labelColorMap, sizeMap };

export type {
  DividerColor,
  DividerLabelProps,
  DividerLineProps,
  DividerOrientation,
  DividerRootProps,
  DividerSize,
  DividerSpacing,
  DividerVariant,
};
