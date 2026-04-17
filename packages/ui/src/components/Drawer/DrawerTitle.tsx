// title.tsx
// UI: presentational

'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { useDrawer } from './Drawer';

const DrawerTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDrawer();
    return (
      <h2
        id={titleId}
        ref={ref}
        className={cn('text-lg font-semibold text-elevated-content', className)}
        {...props}
      />
    );
  },
);
DrawerTitle.displayName = 'Drawer.Title';

export { DrawerTitle };
