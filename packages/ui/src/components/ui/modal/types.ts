// types.ts
// Types

import type {
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  size: ModalSize;
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export interface ModalProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface ModalTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalCloseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
