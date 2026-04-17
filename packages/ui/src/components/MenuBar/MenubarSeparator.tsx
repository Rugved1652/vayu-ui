// separator.tsx
// UI: presentational

import { cn } from '../../utils';
import type { MenuSeparatorProps } from './types';

export const MenuSeparator = ({ className = '', ...props }: MenuSeparatorProps) => {
  return (
    <div
      className={cn('my-1 h-px bg-border dark:bg-border', className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
};
