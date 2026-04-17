// MobileMenu.tsx
// UI: mobile slide panel + backdrop + mobile item

'use client';

import { cn } from '../../utils';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useNavbar } from './NavBar';
import type { NavbarMobileMenuProps, NavbarMobileItemProps, InjectedLinkProps } from './types';

export function NavbarMobileMenu({ className, children, ...props }: NavbarMobileMenuProps) {
  const { mobileOpen, closeMenu, menuId } = useNavbar();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap & initial focus
  useEffect(() => {
    if (!mobileOpen) return;

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const menu = menuRef.current;
    if (!menu) return;

    const handleTab = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableEls = menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );

      const visibleFocusable = Array.from(focusableEls).filter(
        (el) => el.offsetParent !== null || el.getAttribute('tabindex') === '0',
      );

      if (visibleFocusable.length === 0) return;

      const firstFocusable = visibleFocusable[0];
      const lastFocusable = visibleFocusable[visibleFocusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable || document.activeElement === menu) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    menu.addEventListener('keydown', handleTab);
    return () => {
      clearTimeout(timer);
      menu.removeEventListener('keydown', handleTab);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-canvas/80 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Panel */}
      <div
        ref={menuRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 max-w-[80vw] md:hidden',
          'bg-elevated border-l border-border',
          'shadow-elevated',
          'transform transition-transform ease-in-out duration-300',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
          className,
        )}
        {...props}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-4 border-b border-border">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-control transition-colors',
              'text-muted-content hover:text-surface-content hover:bg-muted',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-elevated',
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 p-4 overflow-y-auto max-h-[calc(100vh-65px)]">
          {children}
        </div>
      </div>
    </>
  );
}

NavbarMobileMenu.displayName = 'Navbar.MobileMenu';

export function NavbarMobileItem(allProps: NavbarMobileItemProps & InjectedLinkProps) {
  const {
    active = false,
    className,
    children,
    href = '#',
    onClick,
    linkComponent: LinkComponent = Link,
    ...props
  } = allProps;
  const { closeMenu } = useNavbar();

  const handleClick = () => {
    closeMenu();
    onClick?.();
  };

  return (
    <LinkComponent
      href={href}
      onClick={handleClick}
      className={cn(
        'px-4 py-3 rounded-control text-sm font-medium font-secondary transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-elevated',
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
  );
}

NavbarMobileItem.displayName = 'Navbar.MobileItem';
