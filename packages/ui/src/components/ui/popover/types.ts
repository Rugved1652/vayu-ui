// types.ts
// Types

import type { HTMLAttributes } from 'react';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export interface PopoverTriggerProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  asChild?: boolean;
  disabled?: boolean;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  alignOffset?: number;
  showArrow?: boolean;
  avoidCollisions?: boolean;
}

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  modal: boolean;
}

export type { PopoverContextType };

const arrowPositionClasses: Record<string, string> = {
  top: '-bottom-[5px] left-1/2 -translate-x-1/2',
  bottom: '-top-[5px] left-1/2 -translate-x-1/2',
  left: '-right-[5px] top-1/2 -translate-y-1/2',
  right: '-left-[5px] top-1/2 -translate-y-1/2',
};

export { arrowPositionClasses };
