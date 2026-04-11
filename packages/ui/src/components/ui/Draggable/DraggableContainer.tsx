"use client";

import React, { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils";
import { ContainerIdContext, type DraggableContainerProps } from "./types";
import { useDraggableContext } from "./hooks";

export function DraggableContainer({
  children,
  layout = "list",
  columns = 3,
  containerId,
  "aria-label": ariaLabel,
  className,
}: DraggableContainerProps) {
  const ctx = useDraggableContext();
  const ref = useRef<HTMLDivElement>(null);

  const id = containerId ?? "__default__";

  useEffect(() => {
    if (ref.current) ctx.registerContainer(id, ref.current);
    return () => ctx.unregisterContainer(id);
  }, [id, ctx]);

  useEffect(() => {
    if (!containerId && ref.current) {
      (ctx.containerRef as React.MutableRefObject<HTMLDivElement | null>).current = ref.current;
    }
  }, [containerId, ctx.containerRef]);

  useEffect(() => {
    (ctx as any)._setLayout?.(layout, columns);
  }, [layout, columns, ctx]);

  const isGrid = layout === "grid";

  return (
    <div
      ref={ref}
      role={isGrid ? "grid" : "list"}
      aria-label={ariaLabel ?? "Sortable list"}
      className={cn(
        "select-none",
        isGrid ? "grid gap-3" : "flex flex-col gap-2",
        containerId != null && "h-full",
        className
      )}
      style={isGrid ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
    >
      <ContainerIdContext.Provider value={containerId ?? null}>
        {children}
      </ContainerIdContext.Provider>
    </div>
  );
}
