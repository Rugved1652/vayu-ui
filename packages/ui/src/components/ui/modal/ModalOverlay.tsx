// overlay.tsx
// UI: presentational

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../utils";
import { useModal } from "./Modal";
import type { ModalOverlayProps } from "./types";

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { open, setOpen, closeOnOverlayClick } = useModal();

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
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

export { ModalOverlay };
