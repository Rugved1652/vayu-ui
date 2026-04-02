// label.tsx
// UI: presentational

import { cn } from '../utils';
import type { MenuLabelProps } from './types';

export const MenuLabel = ({ children, className = '', ...props }: MenuLabelProps) => {
  return (
    <div
      className={cn(
        'px-3 py-2 text-xs font-semibold uppercase tracking-wide',
        'text-muted-content dark:text-muted-content',
        className,
      )}
      role="presentation"
      {...props}
    >
      {children}
    </div>
  );
};
