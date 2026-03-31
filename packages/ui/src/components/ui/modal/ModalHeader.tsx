// header.tsx
// UI: presentational

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../utils";

const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start gap-4 p-6 pb-0", className)}
      {...props}
    />
  )
);
ModalHeader.displayName = "Modal.Header";

export { ModalHeader };
