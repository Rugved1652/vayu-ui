"use client";

import React, { useCallback, useEffect } from "react";
import { cn } from "../utils";
import type { GridResizeHandleProps, ResizeDirection } from "./types";
import { useGridLayoutContext, useGridItemContext } from "./hooks";

/* Handle positions for each direction */
const HANDLE_STYLES: Record<ResizeDirection, string> = {
  n: "top-0 left-1/4 right-1/4 h-2 -translate-y-1/2 cursor-n-resize",
  s: "bottom-0 left-1/4 right-1/4 h-2 translate-y-1/2 cursor-s-resize",
  e: "right-0 top-1/4 bottom-1/4 w-2 translate-x-1/2 cursor-e-resize",
  w: "left-0 top-1/4 bottom-1/4 w-2 -translate-x-1/2 cursor-w-resize",
  ne: "top-0 right-0 w-4 h-4 -translate-y-1/4 translate-x-1/4 cursor-ne-resize",
  nw: "top-0 left-0 w-4 h-4 -translate-y-1/4 -translate-x-1/4 cursor-nw-resize",
  se: "bottom-0 right-0 w-4 h-4 translate-y-1/4 translate-x-1/4 cursor-se-resize",
  sw: "bottom-0 left-0 w-4 h-4 translate-y-1/4 -translate-x-1/4 cursor-sw-resize",
};

function ResizeHandleElement({
  direction,
  onPointerDown,
  className,
}: {
  direction: ResizeDirection;
  onPointerDown: (e: React.PointerEvent, dir: ResizeDirection) => void;
  className?: string;
}) {
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onPointerDown(e, direction);
    },
    [direction, onPointerDown]
  );

  return (
    <div
      onPointerDown={handlePointerDown}
      className={cn(
        "absolute z-20 touch-none",
        "hover:bg-brand/20 transition-colors duration-100",
        HANDLE_STYLES[direction],
        className
      )}
      aria-hidden="true"
    />
  );
}

export function GridResizeHandle({
  className,
  children,
  directions = ["se"],
}: GridResizeHandleProps) {
  const itemCtx = useGridItemContext();
  const ctx = useGridLayoutContext();

  // Mark that this item has a resize handle
  useEffect(() => {
    itemCtx.hasResizeHandle.current = true;
  }, [itemCtx]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, direction: ResizeDirection) => {
      if (itemCtx.disabled) return;
      // Pass pointer position directly to startResize
      ctx.startResize(itemCtx.itemId, direction, e.clientX, e.clientY);
    },
    [itemCtx, ctx]
  );

  // If custom children provided, render as a single handle
  if (children) {
    return (
      <div
        onPointerDown={(e) => {
          if (itemCtx.disabled) return;
          e.preventDefault();
          e.stopPropagation();
          ctx.startResize(itemCtx.itemId, directions[0] ?? "se", e.clientX, e.clientY);
        }}
        className={cn(
          "absolute bottom-0 right-0 z-20 touch-none cursor-se-resize",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      {directions.map((dir) => (
        <ResizeHandleElement
          key={dir}
          direction={dir}
          onPointerDown={handlePointerDown}
          className={className}
        />
      ))}
      {/* Default visual indicator for se corner */}
      {directions.includes("se") && (
        <div
          className="absolute bottom-1 right-1 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
            className="text-muted-content"
          >
            <circle cx="8" cy="2" r="1" />
            <circle cx="4" cy="6" r="1" />
            <circle cx="8" cy="6" r="1" />
            <circle cx="4" cy="2" r="1" />
            <circle cx="8" cy="10" r="1" />
            <circle cx="4" cy="10" r="1" />
          </svg>
        </div>
      )}
    </>
  );
}
