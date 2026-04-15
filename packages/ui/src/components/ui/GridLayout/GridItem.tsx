"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "../utils";
import { GridItemContext, type GridItemProps } from "./types";
import { useGridLayoutContext } from "./hooks";
import { computeColWidth, gridToPixel } from "./algorithms";

export function GridItem({
  children,
  id,
  disabled = false,
  className,
}: GridItemProps) {
  const ctx = useGridLayoutContext();
  const ref = useRef<HTMLDivElement>(null);
  const hasDragHandle = useRef(false);
  const hasResizeHandle = useRef(false);

  // Determine which layout to read position from
  const effectiveLayout = ctx.movingLayout ?? ctx.layout;
  const item = effectiveLayout.find((i) => i.i === id);

  const isActive = ctx.activeId === id;
  const isFocused = ctx.focusedId === id;

  // Register DOM element
  useEffect(() => {
    if (ref.current) ctx.registerItem(id, ref.current);
    return () => ctx.unregisterItem(id);
  }, [id, ctx]);

  // Extract coordinate values for stable memo deps (avoids recompute when reference changes but values don't)
  const itemX = item?.x ?? 0;
  const itemY = item?.y ?? 0;
  const itemW = item?.w ?? 0;
  const itemH = item?.h ?? 0;

  // Compute pixel position — depends on actual values, not object reference
  const pixelStyle = useMemo(() => {
    if (!item || !ctx.containerWidth) {
      return { left: 0, top: 0, width: 0, height: 0, position: "absolute" as const };
    }
    const colWidth = computeColWidth(ctx.containerWidth, ctx.cols, ctx.gap);
    const pos = gridToPixel({ x: itemX, y: itemY, w: itemW, h: itemH }, colWidth, ctx.rowHeight, ctx.gap);
    return {
      position: "absolute" as const,
      left: pos.left,
      top: pos.top,
      width: pos.width,
      height: pos.height,
      // Smooth transition for non-active items being pushed around
      ...(!isActive && ctx.activeId ? { transition: "left 200ms ease, top 200ms ease, width 200ms ease, height 200ms ease" } : {}),
    };
  }, [itemX, itemY, itemW, itemH, ctx.containerWidth, ctx.cols, ctx.rowHeight, ctx.gap, isActive, ctx.activeId]);

  // Pointer events
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || hasDragHandle.current || item?.static) return;
      e.preventDefault();
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      // Store start pointer for resize
      const containerEl = ctx.containerRef.current;
      if (!containerEl) return;
      const containerRect = containerEl.getBoundingClientRect();

      ctx.startDrag(id, e.clientX - rect.left, e.clientY - rect.top);
    },
    [id, disabled, item, ctx]
  );

  // Keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || item?.static) return;

      // Grab / Drop
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (ctx.activeId === id) {
          ctx.keyboardDrop();
        } else if (!ctx.activeId) {
          ctx.keyboardGrab(id);
        }
      }
      // Cancel
      else if (e.key === "Escape" && ctx.activeId === id) {
        e.preventDefault();
        ctx.keyboardCancel();
      }
      // Move or resize while dragging
      else if (ctx.activeId === id) {
        const isShift = e.shiftKey;
        if (e.key === "ArrowUp") {
          e.preventDefault();
          isShift ? ctx.keyboardResize(id, "up") : ctx.keyboardMove(id, "up");
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          isShift ? ctx.keyboardResize(id, "down") : ctx.keyboardMove(id, "down");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          isShift ? ctx.keyboardResize(id, "left") : ctx.keyboardMove(id, "left");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          isShift ? ctx.keyboardResize(id, "right") : ctx.keyboardMove(id, "right");
        }
      }
      // Focus navigation when not dragging
      else if (!ctx.activeId) {
        const allIds = ctx.layout.map((i) => i.i);
        const idx = allIds.indexOf(id);

        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          const nextId = allIds[Math.min(allIds.length - 1, idx + 1)];
          if (nextId) {
            ctx.setFocusedId(nextId);
            document.getElementById(`grid-item-${nextId}`)?.focus();
          }
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          const prevId = allIds[Math.max(0, idx - 1)];
          if (prevId) {
            ctx.setFocusedId(prevId);
            document.getElementById(`grid-item-${prevId}`)?.focus();
          }
        }
      }
    },
    [id, disabled, item, ctx]
  );

  if (!item) return null;

  return (
    <div
      id={`grid-item-${id}`}
      ref={ref}
      role="gridcell"
      aria-grabbed={isActive || undefined}
      aria-roledescription="draggable grid item"
      aria-disabled={disabled || undefined}
      aria-describedby="grid-item-instructions"
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={handleKeyDown}
      onFocus={() => ctx.setFocusedId(id)}
      onPointerDown={handlePointerDown}
      className={cn(
        "will-change-transform",
        "outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 rounded-surface",
        "transition-shadow duration-150",
        isActive && "opacity-70 ring-2 ring-brand shadow-elevated z-10",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && !item.static && "cursor-grab active:cursor-grabbing",
        item.static && "cursor-default",
        className
      )}
      style={pixelStyle}
    >
      <span id="grid-item-instructions" className="sr-only">
        Press Space to grab, arrow keys to move, Shift plus arrow keys to
        resize, Space to drop, Escape to cancel.
      </span>
      <GridItemContext.Provider
        value={{ hasDragHandle, hasResizeHandle, disabled, itemId: id }}
      >
        {children}
      </GridItemContext.Provider>
    </div>
  );
}
