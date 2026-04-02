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

  const targetId = effectiveItems[ctx.overIndex];
  const targetEl = ctx.itemRefs.get(targetId ?? "");
  const containerEl = ctx.isMultiContainer
    ? ctx.containerRefs.get(ctx.overContainerId ?? "")
    : ctx.containerRef.current;
  const containerRect = containerEl?.getBoundingClientRect();
  if (!targetEl || !containerRect) return null;

  const rect = targetEl.getBoundingClientRect();
  const isAfter = ctx.overIndex > activeIdx || ctx.isMultiContainer;
  const isVertical = ctx.layout === "list";

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
