"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import type { DraggablePlaceholderProps } from "./types";
import { useDraggableContext } from "./hooks";

export function DraggablePlaceholder({ className }: DraggablePlaceholderProps) {
  const ctx = useDraggableContext();

  if (ctx.activeId === null || ctx.overIndex < 0) return null;

  const effectiveItems = ctx.isMultiContainer
    ? ctx.containerItems(ctx.overContainerId ?? "")
    : ctx.items;
  const overId = effectiveItems[ctx.overIndex];
  const activeIdx = effectiveItems.indexOf(ctx.activeId);
  const overEl = ctx.itemRefs.get(overId ?? "");
  if (!overEl) return null;

  const rect = overEl.getBoundingClientRect();
  const containerEl = ctx.isMultiContainer
    ? ctx.containerRefs.get(ctx.overContainerId ?? "")
    : ctx.containerRef.current;
  const containerRect = containerEl?.getBoundingClientRect();
  if (!containerRect) return null;

  const isAfter = ctx.overIndex > activeIdx;
  const isVertical = ctx.layout === "list";

  return createPortal(
    <div
      className={cn(
        "fixed z-40 pointer-events-none",
        isVertical ? "h-1" : "w-1",
        "bg-brand/30 rounded-full",
        className
      )}
      style={
        isVertical
          ? { left: containerRect.left, width: containerRect.width, top: isAfter ? rect.bottom + 2 : rect.top - 4 }
          : { top: containerRect.top, height: containerRect.height, left: isAfter ? rect.right + 2 : rect.left - 4 }
      }
    />,
    document.body
  );
}
