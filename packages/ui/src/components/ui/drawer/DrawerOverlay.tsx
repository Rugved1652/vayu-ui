// overlay.tsx
// UI: presentational

'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { useDrawer } from './Drawer';
import type { DrawerOverlayProps } from './types';

const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, dismissible = true, onClick, ...props }, ref) => {
    const { open, setOpen, modal } = useDrawer();

    if (!open || !modal) return null;

    return (
      <div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        className={cn(
          'fixed inset-0 z-40 bg-canvas/80 backdrop-blur-surface',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          className,
        )}
        onClick={(e) => {
          onClick?.(e);
          if (dismissible) setOpen(false);
        }}
        aria-hidden="true"
        {...props}
      />
    );
  },
);
DrawerOverlay.displayName = 'Drawer.Overlay';

export { DrawerOverlay };
