"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import type { DraggablePreviewProps } from "./types";
import { useDraggableContext } from "./hooks";

export function DraggablePreview({ className, children }: DraggablePreviewProps) {
  const ctx = useDraggableContext();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ctx.activeId || ctx.isKeyboardDragging) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [ctx.activeId, ctx.isKeyboardDragging]);

  if (!visible || !ctx.activeId || !ctx.initialRect) return null;

  const activeEl = ctx.itemRefs.get(ctx.activeId);
  if (!activeEl) return null;

  const { width, height } = ctx.initialRect;

  return createPortal(
    <div
      className={cn(
        "fixed z-50 pointer-events-none",
        "bg-surface rounded-surface shadow-elevated",
        "border border-border",
        className
      )}
      style={{
        left: pos.x - ctx.dragOffset.x,
        top: pos.y - ctx.dragOffset.y,
        width,
        height,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: activeEl.innerHTML }} />
    </div>,
    document.body
  );
}
