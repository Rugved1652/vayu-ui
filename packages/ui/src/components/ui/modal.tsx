"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  forwardRef,
  HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { X } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  size: ModalSize;
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
}

// ============================================================================
// Context
// ============================================================================

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within Modal");
  }
  return context;
};

// ============================================================================
// Size map
// ============================================================================

const sizeWidths: Record<ModalSize, string> = {
  sm: "28rem",
  md: "32rem",
  lg: "40rem",
  xl: "48rem",
  full: "calc(100vw - 4rem)",
};

// ============================================================================
// Focusable selector
// ============================================================================

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ============================================================================
// Main Modal Root
// ============================================================================

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

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

// ============================================================================
// Modal Trigger
// ============================================================================

interface ModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, asChild = false, className, onClick, ...props }, ref) => {
    const { setOpen, open, triggerRef } = useModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        setOpen(true);
      }
    };

    // Merge trigger ref
    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        (
          triggerRef as React.MutableRefObject<HTMLElement | null>
        ).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (
            ref as React.MutableRefObject<HTMLButtonElement | null>
          ).current = node;
        }
      },
      [ref, triggerRef]
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: setRefs,
        onClick: handleClick,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        ...props,
      });
    }

    return (
      <button
        ref={setRefs}
        type="button"
        onClick={handleClick}
        className={clsx(
          "inline-flex items-center justify-center rounded-control px-4 py-2 text-sm font-medium transition-colors",
          "bg-surface text-surface-content hover:bg-muted",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
          "focus-visible:ring-offset-canvas",
          className
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        {...props}
      >
        {children}
      </button>
    );
  }
);
ModalTrigger.displayName = "Modal.Trigger";

// ============================================================================
// Modal Overlay
// ============================================================================

interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> { }

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { open, setOpen, closeOnOverlayClick } = useModal();

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={clsx(
          "fixed inset-0 z-50 bg-canvas/80 backdrop-blur-surface",
          "transition-opacity duration-300 ease-in-out",
          className
        )}
        onClick={(e) => {
          onClick?.(e);
          if (closeOnOverlayClick) setOpen(false);
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
ModalOverlay.displayName = "Modal.Overlay";

// ============================================================================
// Modal Content
// ============================================================================

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> { }

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, onKeyDown, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId, size, closeOnEscape, triggerRef } =
      useModal();
    const contentRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (
            ref as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
        }
      },
      [ref]
    );

    // Focus management: capture previous focus, move into modal, restore on close
    useEffect(() => {
      if (open) {
        // Store the element that had focus before modal opened
        previouslyFocusedRef.current =
          document.activeElement as HTMLElement | null;

        // Focus first focusable element inside the modal
        const timer = setTimeout(() => {
          const focusable =
            contentRef.current?.querySelector<HTMLElement>(FOCUSABLE);
          if (focusable) {
            focusable.focus();
          } else {
            // Fallback: focus the content container itself
            contentRef.current?.focus();
          }
        }, 50);

        return () => clearTimeout(timer);
      } else {
        // Return focus to triggerRef or previously focused element
        const returnTarget =
          triggerRef.current ?? previouslyFocusedRef.current;
        returnTarget?.focus();
      }
    }, [open, triggerRef]);

    // Keyboard navigation: Escape + focus trap
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);

      if (e.key === "Escape" && closeOnEscape) {
        e.stopPropagation();
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const focusableElements =
          contentRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);

        if (!focusableElements || focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement =
          focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (!open) return null;

    return createPortal(
      <>
        {/* Overlay */}
        <ModalOverlay />

        {/* Center wrapper */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-hidden="true"
        >
          <div
            ref={setRefs}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            style={{ maxWidth: sizeWidths[size] }}
            className={clsx(
              "relative w-full flex flex-col",
              "bg-elevated",
              "border border-border",
              "rounded-overlay shadow-elevated",
              "focus:outline-none",
              className
            )}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </>,
      document.body
    );
  }
);
ModalContent.displayName = "Modal.Content";

// ============================================================================
// Modal Header
// ============================================================================

const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "flex items-start gap-4 p-6 pb-0",
        className
      )}
      {...props}
    />
  )
);
ModalHeader.displayName = "Modal.Header";

// ============================================================================
// Modal Body
// ============================================================================

const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "flex-1 overflow-y-auto p-6",
        "text-sm font-secondary text-muted-content",
        className
      )}
      {...props}
    />
  )
);
ModalBody.displayName = "Modal.Body";

// ============================================================================
// Modal Footer
// ============================================================================

const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "flex items-center justify-end gap-2 p-6 pt-0",
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = "Modal.Footer";

// ============================================================================
// Modal Title
// ============================================================================

const ModalTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { titleId } = useModal();
  return (
    <h2
      id={titleId}
      ref={ref}
      className={clsx(
        "text-lg font-semibold font-primary text-elevated-content",
        className
      )}
      {...props}
    />
  );
});
ModalTitle.displayName = "Modal.Title";

// ============================================================================
// Modal Description
// ============================================================================

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { descriptionId } = useModal();
  return (
    <p
      id={descriptionId}
      ref={ref}
      className={clsx(
        "text-sm font-secondary text-muted-content mt-1",
        className
      )}
      {...props}
    />
  );
});
ModalDescription.displayName = "Modal.Description";

// ============================================================================
// Modal Close
// ============================================================================

interface ModalCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, onClick, asChild = false, children, ...props }, ref) => {
    const { setOpen } = useModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        setOpen(false);
      }
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: handleClick,
        ...props,
      });
    }

    // If no children, render the default X icon button
    if (!children) {
      return (
        <button
          ref={ref}
          type="button"
          className={clsx(
            "inline-flex items-center justify-center rounded-control p-1.5",
            "text-muted-content hover:text-elevated-content",
            "transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
            "focus-visible:ring-offset-elevated",
            className
          )}
          onClick={handleClick}
          aria-label="Close"
          {...props}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      );
    }

    // Children provided – render as custom close button
    return (
      <button
        ref={ref}
        type="button"
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ModalClose.displayName = "Modal.Close";

// ============================================================================
// Export Compound Component
// ============================================================================

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
});

export default Modal;
