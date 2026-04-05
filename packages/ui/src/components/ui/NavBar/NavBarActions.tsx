// Actions.tsx
// UI: desktop action buttons area

'use client';

import { cn } from '../utils';
import type { NavbarActionsProps } from './types';

export function NavbarActions({ className, children, ...props }: NavbarActionsProps) {
  return (
    <div className={cn('hidden md:flex items-center gap-2 shrink-0', className)} {...props}>
      {children}
    </div>
  );
}

NavbarActions.displayName = 'Navbar.Actions';
