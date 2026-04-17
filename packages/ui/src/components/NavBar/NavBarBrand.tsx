// Brand.tsx
// UI: brand/logo area

'use client';

import { cn } from '../../utils';
import type { NavbarBrandProps } from './types';

export function NavbarBrand({ className, children, ...props }: NavbarBrandProps) {
  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)} {...props}>
      {children}
    </div>
  );
}

NavbarBrand.displayName = 'Navbar.Brand';
