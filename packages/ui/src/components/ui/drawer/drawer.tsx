// drawer.tsx
// Composition: context + root

'use client';

import React, { createContext, useCallback, useContext, useEffect, useId, useState } from 'react';
import type {
  DrawerRootProps,
  DrawerContextType,
  DrawerTriggerProps,
  DrawerOverlayProps,
  DrawerContentProps,
  DrawerCloseProps,
} from './types';
import { DrawerTrigger } from './DrawerTrigger';
import { DrawerOverlay } from './DrawerOverlay';
import { DrawerContent } from './DrawerContent';
import { DrawerHeader } from './DrawerHeader';
import { DrawerFooter } from './DrawerFooter';
import { DrawerTitle } from './DrawerTitle';
import { DrawerDescription } from './DrawerDescription';
import { DrawerClose } from './DrawerClose';
import { DrawerPortal } from './DrawerPortal';

// Context

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer compound components must be used within Drawer');
  }
  return context;
};

// Root

const DrawerRoot: React.FC<DrawerRootProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  side = 'right',
  modal = true,
  defaultOpen = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const titleId = useId();
  const descriptionId = useId();

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  // Lock body scroll when modal
  useEffect(() => {
    if (open && modal) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = '';
      };
    }
  }, [open, modal]);

  return (
    <DrawerContext.Provider value={{ open, setOpen, side, titleId, descriptionId, modal }}>
      {children}
    </DrawerContext.Provider>
  );
};
DrawerRoot.displayName = 'Drawer';

// Compound component with placeholder subcomponents (real ones assigned in index.ts)
const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
  Portal: DrawerPortal,
});

export default Drawer;
