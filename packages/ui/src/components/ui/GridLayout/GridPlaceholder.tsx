"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import type { GridPlaceholderProps } from "./types";
import { useGridLayoutContext } from "./hooks";
import { computeColWidth, gridToPixel } from "./algorithms";

export function GridPlaceholder({ className }: GridPlaceholderProps) {
  const ctx = useGridLayoutContext();

  if (!ctx.placeholder || !ctx.activeId) return null;

  const containerEl = ctx.containerRef.current;
  if (!containerEl) return null;

  const containerRect = containerEl.getBoundingClientRect();
  if (!containerRect.width) return null;

  const colWidth = computeColWidth(containerRect.width, ctx.cols, ctx.gap);
  const pixelPos = gridToPixel(ctx.placeholder, colWidth, ctx.rowHeight, ctx.gap);

  return createPortal(
    <div
      className={cn(
        "fixed z-30 pointer-events-none",
        "border-2 border-dashed border-brand/40",
        "bg-brand/10 rounded-surface",
        "transition-all duration-150",
        className
      )}
      style={{
        left: containerRect.left + pixelPos.left,
        top: containerRect.top + pixelPos.top,
        width: pixelPos.width,
        height: pixelPos.height,
      }}
    />,
    document.body
  );
}
