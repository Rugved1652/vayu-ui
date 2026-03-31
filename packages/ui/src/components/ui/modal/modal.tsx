// modal.tsx
// Composition: context + root

"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  ModalContextType,
  ModalProps,
  ModalSize,
  ModalTriggerProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalCloseProps,
} from "./types";

// Context

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within Modal");
  }
  return context;
};

// Size map

export const sizeWidths: Record<ModalSize, string> = {
  sm: "28rem",
  md: "32rem",
  lg: "40rem",
  xl: "48rem",
  full: "calc(100vw - 4rem)",
};

// Focusable selector

export const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Root

const ModalRoot: React.FC<ModalProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLElement>(null);

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [open]);

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        titleId,
        descriptionId,
        size,
        closeOnOverlayClick,
        closeOnEscape,
        triggerRef,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
ModalRoot.displayName = "Modal";

// Compound component with placeholder subcomponents (real ones assigned in index.ts)
const Modal = Object.assign(ModalRoot, {
  Trigger: {} as React.ForwardRefExoticComponent<
    ModalTriggerProps & React.RefAttributes<HTMLButtonElement>
  >,
  Overlay: {} as React.ForwardRefExoticComponent<
    ModalOverlayProps & React.RefAttributes<HTMLDivElement>
  >,
  Content: {} as React.ForwardRefExoticComponent<
    ModalContentProps & React.RefAttributes<HTMLDivElement>
  >,
  Header: {} as React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >,
  Body: {} as React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >,
  Footer: {} as React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >,
  Title: {} as React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLHeadingElement> &
      React.RefAttributes<HTMLHeadingElement>
  >,
  Description: {} as React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLParagraphElement> &
      React.RefAttributes<HTMLParagraphElement>
  >,
  Close: {} as React.ForwardRefExoticComponent<
    ModalCloseProps & React.RefAttributes<HTMLButtonElement>
  >,
});

export default Modal;
