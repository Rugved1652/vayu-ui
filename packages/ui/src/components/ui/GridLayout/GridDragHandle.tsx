"use client";

import React, { useCallback, useEffect } from "react";
import { cn } from "../utils";
import type { GridDragHandleProps } from "./types";
import { useGridLayoutContext, useGridItemContext } from "./hooks";

export function GridDragHandle({ className, children }: GridDragHandleProps) {
  const itemCtx = useGridItemContext();
  const ctx = useGridLayoutContext();

  // Mark that this item has a dedicated drag handle
  useEffect(() => {
    itemCtx.hasDragHandle.current = true;
  }, [itemCtx]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (itemCtx.disabled) return;
      e.preventDefault();
      e.stopPropagation();

      const itemEl = e.currentTarget.closest<HTMLElement>(
        "[role='gridcell']"
      );
      const rect = itemEl?.getBoundingClientRect();
      ctx.startDrag(
        itemCtx.itemId,
        rect ? e.clientX - rect.left : 0,
        rect ? e.clientY - rect.top : 0
      );
    },
    [itemCtx, ctx]
  );

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label="Drag handle"
      onPointerDown={handlePointerDown}
      className={cn(
        "absolute top-2 left-2 z-10",
        "flex items-center justify-center w-8 h-8",
        "text-muted-content hover:text-surface-content",
        "hover:bg-muted rounded-control",
        "transition-colors duration-150",
        "cursor-grab active:cursor-grabbing",
        "touch-none",
        className
      )}
    >
      {children ?? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="5.5" cy="3.5" r="1.5" />
          <circle cx="10.5" cy="3.5" r="1.5" />
          <circle cx="5.5" cy="8" r="1.5" />
          <circle cx="10.5" cy="8" r="1.5" />
          <circle cx="5.5" cy="12.5" r="1.5" />
          <circle cx="10.5" cy="12.5" r="1.5" />
        </svg>
      )}
    </button>
  );
}
