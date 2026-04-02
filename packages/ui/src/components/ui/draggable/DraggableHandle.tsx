"use client";

import React, { useCallback, useContext, useEffect } from "react";
import { cn } from "../utils";
import { ContainerIdContext, type DraggableHandleProps } from "./types";
import { useDraggableContext, useItemContext } from "./hooks";

export function DraggableHandle({ className, children }: DraggableHandleProps) {
  const itemCtx = useItemContext();
  const ctx = useDraggableContext();
  const containerCtx = useContext(ContainerIdContext);

  // Mark that this item has a dedicated handle
  useEffect(() => {
    itemCtx.hasHandle.current = true;
  }, [itemCtx]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (itemCtx.disabled) return;
      e.preventDefault();
      e.stopPropagation();
      const itemEl = e.currentTarget.closest<HTMLElement>(
        "[role='listitem'], [role='gridcell']"
      );
      const rect = itemEl?.getBoundingClientRect();
      ctx.startDrag(
        itemCtx.value,
        containerCtx,
        rect ? e.clientX - rect.left : undefined,
        rect ? e.clientY - rect.top : undefined
      );
    },
    [itemCtx, containerCtx, ctx]
  );

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label="Drag handle"
      onPointerDown={handlePointerDown}
      className={cn(
        "flex items-center justify-center w-8 h-8 shrink-0",
        "text-muted-content hover:text-surface-content",
        "hover:bg-muted rounded-control",
        "transition-colors duration-150",
        "cursor-grab active:cursor-grabbing",
        "touch-none",
        className
      )}
    >
      {children ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
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
