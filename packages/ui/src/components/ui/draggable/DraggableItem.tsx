"use client";

import React, { useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils";
import { ContainerIdContext, DraggableItemContext, type DraggableItemProps } from "./types";
import { useDraggableContext } from "./hooks";

export function DraggableItem({
  children,
  value,
  className,
  disabled = false,
}: DraggableItemProps) {
  const ctx = useDraggableContext();
  const containerId = useContext(ContainerIdContext);
  const ref = useRef<HTMLDivElement>(null);
  const hasHandle = useRef(false);

  const effectiveItems = containerId !== null ? ctx.containerItems(containerId) : ctx.items;
  const isActive = ctx.activeId === value;
  const isOverTarget =
    ctx.overIndex >= 0 &&
    effectiveItems[ctx.overIndex] === value &&
    ctx.activeId !== null &&
    ctx.activeId !== value;
  const isFocused = ctx.focusedId === value;

  useEffect(() => {
    if (ref.current) ctx.registerItem(value, ref.current);
    return () => ctx.unregisterItem(value);
  }, [value, ctx]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || hasHandle.current) return;
      e.preventDefault();
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      ctx.startDrag(value, containerId, e.clientX - rect.left, e.clientY - rect.top);
    },
    [value, disabled, containerId, ctx]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (ctx.activeId === value) ctx.keyboardDrop();
        else if (!ctx.activeId) ctx.keyboardGrab(value);
      } else if (e.key === "Escape" && ctx.activeId === value) {
        e.preventDefault();
        ctx.keyboardCancel();
      } else if (ctx.activeId === value) {
        if (e.key === "ArrowUp") { e.preventDefault(); ctx.keyboardMove("up"); }
        else if (e.key === "ArrowDown") { e.preventDefault(); ctx.keyboardMove("down"); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); ctx.keyboardMove("left"); }
        else if (e.key === "ArrowRight") { e.preventDefault(); ctx.keyboardMove("right"); }
      } else if (!ctx.activeId) {
        const idx = effectiveItems.indexOf(value);
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          const nextId = effectiveItems[Math.min(effectiveItems.length - 1, idx + 1)];
          if (nextId) { ctx.setFocusedId(nextId); document.getElementById(`draggable-item-${nextId}`)?.focus(); }
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          const prevId = effectiveItems[Math.max(0, idx - 1)];
          if (prevId) { ctx.setFocusedId(prevId); document.getElementById(`draggable-item-${prevId}`)?.focus(); }
        }
      }
    },
    [value, disabled, effectiveItems, ctx]
  );

  return (
    <div
      id={`draggable-item-${value}`}
      ref={ref}
      role={ctx.layout === "grid" ? "gridcell" : "listitem"}
      aria-grabbed={isActive || undefined}
      aria-roledescription="sortable item"
      aria-disabled={disabled || undefined}
      aria-describedby="draggable-instructions"
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={handleKeyDown}
      onFocus={() => ctx.setFocusedId(value)}
      onPointerDown={handlePointerDown}
      className={cn(
        "relative min-h-[44px] will-change-transform",
        "outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 rounded-surface",
        "transition-shadow duration-150",
        isActive && !ctx.isKeyboardDragging && "opacity-0",
        isActive && ctx.isKeyboardDragging && "ring-2 ring-brand shadow-elevated",
        isOverTarget && "ring-2 ring-brand/50",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <span id="draggable-instructions" className="sr-only">
        Press Space to grab, arrow keys to move, Space to drop, Escape to cancel.
      </span>
      <DraggableItemContext.Provider value={{ hasHandle, disabled, value }}>
        {children}
      </DraggableItemContext.Provider>
    </div>
  );
}
