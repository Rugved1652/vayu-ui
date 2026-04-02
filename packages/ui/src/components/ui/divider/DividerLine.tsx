// divider-line.tsx
// UI: divider line with variant, color, size controls

import React from 'react';
import { cn } from '../utils';
import { variantMap, colorMap, sizeMap } from './types';
import type { DividerLineProps } from './types';

const DividerLine = ({
  variant = 'solid',
  color = 'default',
  size = 'normal',
  thickness,
  opacity = 1,
  orientation = 'horizontal',
  className,
  style,
  ...props
}: DividerLineProps) => {
  const actualThickness = thickness || sizeMap[size];
  const isHorizontal = orientation === 'horizontal';

  const borderStyle: React.CSSProperties = {
    opacity,
    ...style,
  };

  return (
    <div
      className={cn('grow shrink-0 border-0', variantMap[variant], colorMap[color], className)}
      style={{
        ...borderStyle,
        [isHorizontal ? 'borderTopWidth' : 'borderLeftWidth']: `${actualThickness}px`,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};

export default DividerLine;
