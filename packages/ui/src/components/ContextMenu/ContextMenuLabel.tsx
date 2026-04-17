"use client";

import React, { forwardRef } from "react";
import { cn } from "../../utils";
import type { ContextMenuLabelProps } from "./types";

const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="presentation"
      className={cn(
        "px-3 py-2 text-xs font-semibold uppercase tracking-wide",
        "text-muted-content dark:text-muted-content",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

ContextMenuLabel.displayName = "ContextMenu.Label";

export { ContextMenuLabel };
