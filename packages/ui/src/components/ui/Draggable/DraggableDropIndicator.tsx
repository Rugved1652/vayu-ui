"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import type { DraggableDropIndicatorProps } from "./types";
import { useDraggableContext } from "./hooks";

export function DraggableDropIndicator({ className }: DraggableDropIndicatorProps) {
  const ctx = useDraggableContext();

  if (!ctx.activeId || ctx.overIndex < 0) return null;

  const effectiveItems = ctx.isMultiContainer
    ? ctx.containerItems(ctx.overContainerId ?? "")
    : ctx.items;
  const activeIdx = effectiveItems.indexOf(ctx.activeId);

  // Same container, same position — no indicator needed
  if (activeIdx === ctx.overIndex && !ctx.isMultiContainer) return null;
  if (
    activeIdx === ctx.overIndex &&
    ctx.isMultiContainer &&
    ctx.sourceContainerId === ctx.overContainerId
  ) {
    return null;
  }

  const containerEl = ctx.isMultiContainer
    ? ctx.containerRefs.get(ctx.overContainerId ?? "")
    : ctx.containerRef.current;
  const containerRect = containerEl?.getBoundingClientRect();
  if (!containerRect) return null;

  const isAppendAtEnd = ctx.overIndex >= effectiveItems.length;
  const isEmptyContainer = effectiveItems.length === 0;
  const isVertical = ctx.layout === "list";

  // Empty container: render indicator at the top of the container
  if (isEmptyContainer) {
    return createPortal(
      <div
        className={cn(
          "fixed z-40 pointer-events-none",
          "bg-brand rounded-full",
          isVertical ? "h-0.5" : "w-0.5",
          className
        )}
        style={
          isVertical
            ? { left: containerRect.left, width: containerRect.width, top: containerRect.top + 2 }
            : { top: containerRect.top, height: containerRect.height, left: containerRect.left + 2 }
        }
      />,
      document.body
    );
  }

  // Append at end: use the last item for positioning
  const targetId = isAppendAtEnd
    ? effectiveItems[effectiveItems.length - 1]
    : effectiveItems[ctx.overIndex];
  const targetEl = ctx.itemRefs.get(targetId ?? "");
  if (!targetEl) return null;

  const rect = targetEl.getBoundingClientRect();
  const isAfter = isAppendAtEnd || ctx.overIndex > activeIdx || ctx.isMultiContainer;

  return createPortal(
    <div
      className={cn(
        "fixed z-40 pointer-events-none",
        "bg-brand rounded-full",
        isVertical ? "h-0.5" : "w-0.5",
        className
      )}
      style={
        isVertical
          ? { left: containerRect.left, width: containerRect.width, top: isAfter ? rect.bottom + 1 : rect.top - 3 }
          : { top: containerRect.top, height: containerRect.height, left: isAfter ? rect.right + 1 : rect.left - 3 }
      }
    />,
    document.body
  );
}
