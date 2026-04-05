// Separator.tsx
// UI: horizontal divider

'use client';

import { cn } from '../utils';

export function NavbarSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('my-2 border-border', className)} {...props} />;
}

NavbarSeparator.displayName = 'Navbar.Separator';
