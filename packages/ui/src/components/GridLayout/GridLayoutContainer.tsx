"use client";

import React, { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../utils";
import type { GridContainerProps } from "./types";
import { useGridLayoutContext } from "./hooks";

export function GridLayoutContainer({
  children,
  className,
  "aria-label": ariaLabel,
}: GridContainerProps) {
  const ctx = useGridLayoutContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      (ctx as any)._setContainerRef?.(ref.current);
    }
  }, [ctx]);

  // Compute container height based on layout
  const effectiveLayout = ctx.movingLayout ?? ctx.layout;
  const maxBottom = effectiveLayout.reduce(
    (max, item) => Math.max(max, item.y + item.h),
    0
  );
  const containerHeight =
    maxBottom * (ctx.rowHeight + ctx.gap) - ctx.gap + ctx.gap;

  return (
    <div
      ref={ref}
      role="grid"
      aria-label={ariaLabel ?? "Grid layout"}
      aria-rowcount={maxBottom || undefined}
      className={cn("relative w-full select-none", className)}
      style={{ minHeight: containerHeight > 0 ? containerHeight : 200 }}
    >
      {children}
    </div>
  );
}
