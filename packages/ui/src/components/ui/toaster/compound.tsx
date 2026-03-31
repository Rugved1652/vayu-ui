// compound.tsx
// UI: compound sub-components

"use client";

import React, { forwardRef } from "react";
import { cn } from "../utils";

const ToastTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "font-semibold font-primary text-sm text-surface-content",
        className
      )}
      {...props}
    />
  )
);
ToastTitle.displayName = "Toast.Title";

const ToastDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-sm font-secondary text-muted-content",
        className
      )}
      {...props}
    />
  )
);
ToastDescription.displayName = "Toast.Description";

const ToastClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "p-1.5 min-h-[28px] min-w-[28px] rounded-control",
        "text-muted-content",
        "hover:text-surface-content",
        "hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
        "transition-colors",
        className
      )}
      {...props}
    />
  )
);
ToastClose.displayName = "Toast.Close";

export { ToastTitle, ToastDescription, ToastClose };
