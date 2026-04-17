// header.tsx
// UI: presentational

'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils';

const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
      {...props}
    />
  ),
);
DrawerHeader.displayName = 'Drawer.Header';

export { DrawerHeader };
