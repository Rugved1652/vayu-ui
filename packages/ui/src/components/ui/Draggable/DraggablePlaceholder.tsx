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

  const isAppendAtEnd = ctx.overIndex >= effectiveItems.length;
  const isEmptyContainer = effectiveItems.length === 0;
  const activeIdx = effectiveItems.indexOf(ctx.activeId);

  const containerEl = ctx.isMultiContainer
    ? ctx.containerRefs.get(ctx.overContainerId ?? "")
    : ctx.containerRef.current;
  const containerRect = containerEl?.getBoundingClientRect();
  if (!containerRect) return null;

  // Empty container: render placeholder at the top
  if (isEmptyContainer) {
    return createPortal(
      <div
        className={cn(
          "fixed z-40 pointer-events-none",
          ctx.layout === "list" ? "h-1" : "w-1",
          "bg-brand/30 rounded-full",
          className
        )}
        style={
          ctx.layout === "list"
            ? { left: containerRect.left, width: containerRect.width, top: containerRect.top + 2 }
            : { top: containerRect.top, height: containerRect.height, left: containerRect.left + 2 }
        }
      />,
      document.body
    );
  }

  const overId = isAppendAtEnd
    ? effectiveItems[effectiveItems.length - 1]
    : effectiveItems[ctx.overIndex];
  const overEl = ctx.itemRefs.get(overId ?? "");
  if (!overEl) return null;

  const rect = overEl.getBoundingClientRect();
  const isAfter = isAppendAtEnd || ctx.overIndex > activeIdx;
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
