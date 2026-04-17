// floatingdock.tsx
// Composition: UI + logic

import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';
import type { DockBaseProps } from './types';

const Dock = ({
  children,
  className,
  'aria-label': ariaLabel = 'Floating dock',
  ...props
}: DockBaseProps) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn('fixed top-3 left-1/2 -translate-x-1/2 z-50', className)}
      {...props}
    >
      {children}
    </nav>
  );
};

export default Dock;
