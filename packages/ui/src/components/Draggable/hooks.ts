"use client";

import { useContext } from "react";
import { DraggableContext, DraggableItemContext } from "./types";

export function useDraggableContext() {
  const ctx = useContext(DraggableContext);
  if (!ctx)
    throw new Error("Draggable compound components must be used inside <Draggable>");
  return ctx;
}

export function useItemContext() {
  const ctx = useContext(DraggableItemContext);
  if (!ctx)
    throw new Error("Draggable.Handle must be used inside <Draggable.Item>");
  return ctx;
}
