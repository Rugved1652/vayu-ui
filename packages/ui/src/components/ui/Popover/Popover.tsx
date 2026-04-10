// popover.tsx
// Composition: UI + wiring

'use client';
import React, { useState, useRef, useCallback, forwardRef } from 'react';
import { cn } from '../utils';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useKeyPress } from '../../../hooks/useKeyPress';
import { PopoverContext } from './hooks';
import type { PopoverProps } from './types';

const PopoverRoot = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      modal = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const triggerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback((newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    }, [isControlled, onOpenChange]);

    useOnClickOutside([triggerRef, contentRef] as React.RefObject<HTMLElement>[], () => {
      if (open) setOpen(false);
    });

    useKeyPress('Escape', () => {
      if (!open) return;
      setOpen(false);
      triggerRef.current?.focus();
    });

    return (
      <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef, modal }}>
        <div ref={ref} className={cn('relative inline-block', className)} {...props}>
          {children}
        </div>
      </PopoverContext.Provider>
    );
  },
);

PopoverRoot.displayName = 'Popover';

export default PopoverRoot;
