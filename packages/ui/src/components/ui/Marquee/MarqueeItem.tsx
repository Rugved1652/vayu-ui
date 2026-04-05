// marquee-item.tsx
// UI: presentational

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import type { MarqueeItemProps } from './types';

const MarqueeItem = forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex shrink-0 items-center justify-center', className)}
      {...props}
    >
      {children}
    </div>
  ),
);

MarqueeItem.displayName = 'MarqueeItem';

export { MarqueeItem };
