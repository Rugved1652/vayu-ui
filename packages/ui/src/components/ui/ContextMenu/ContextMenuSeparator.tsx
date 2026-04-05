"use client";

import React, { forwardRef } from "react";
import { cn } from "../utils";
import type { ContextMenuSeparatorProps } from "./types";

const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn("my-1 h-px bg-border dark:bg-border", className)}
      {...props}
    />
  )
);

ContextMenuSeparator.displayName = "ContextMenu.Separator";

export { ContextMenuSeparator };
