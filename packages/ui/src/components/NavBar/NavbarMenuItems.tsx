// Items.tsx
// UI: desktop navigation list + item

'use client';

import { cn } from '../../utils';
import Link from 'next/link';
import type { NavbarItemsProps, NavbarItemProps, InjectedLinkProps } from './types';

export function NavbarItems({ className, children, ...props }: NavbarItemsProps) {
  return (
    <ul className={cn('hidden md:flex items-center gap-1 list-none m-0 p-0', className)} {...props}>
      {children}
    </ul>
  );
}

NavbarItems.displayName = 'Navbar.Items';

export function NavbarItem(allProps: NavbarItemProps & InjectedLinkProps) {
  const {
    active = false,
    className,
    children,
    href = '#',
    linkComponent: LinkComponent = Link,
    ...props
  } = allProps;

  return (
    <li className="list-none">
      <LinkComponent
        href={href}
        className={cn(
          'px-3 py-2 rounded-control text-sm font-medium font-secondary transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          active
            ? 'text-brand bg-brand/10'
            : 'text-muted-content hover:text-surface-content hover:bg-muted',
          className,
        )}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {children}
      </LinkComponent>
    </li>
  );
}

NavbarItem.displayName = 'Navbar.Item';
