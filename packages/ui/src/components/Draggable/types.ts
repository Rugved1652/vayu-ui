import { createContext, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ContainersMap = Record<string, string[]>;

export interface DraggableContextValue {
  /* state */
  items: string[];
  activeId: string | null;
  overIndex: number;
  layout: "list" | "grid";
  columns: number;
  focusedId: string | null;
  isKeyboardDragging: boolean;

  /* multi-container */
  isMultiContainer: boolean;
  containers: ContainersMap;
  containerItems: (containerId: string) => string[];
  overContainerId: string | null;
  sourceContainerId: string | null;

  /* refs */
  containerRef: React.RefObject<HTMLDivElement | null>;
  containerRefs: Map<string, HTMLDivElement>;
  itemRefs: Map<string, HTMLDivElement>;

  /* drag geometry — captured at drag start, used by Preview */
  initialRect: { width: number; height: number } | null;
  dragOffset: { x: number; y: number };

  /* item/container registration */
  registerItem: (value: string, el: HTMLDivElement) => void;
  unregisterItem: (value: string) => void;
  registerContainer: (id: string, el: HTMLDivElement) => void;
  unregisterContainer: (id: string) => void;
  /* pointer drag */
  startDrag: (
    id: string,
    containerId: string | null,
    offsetX?: number,
    offsetY?: number
  ) => void;
  moveDrag: (x: number, y: number) => void;
  endDrag: () => void;
  cancelDrag: () => void;

  /* keyboard drag */
  keyboardGrab: (id: string) => void;
  keyboardMove: (direction: "up" | "down" | "left" | "right") => void;
  keyboardDrop: () => void;
  keyboardCancel: () => void;

  /* focus */
  setFocusedId: (id: string | null) => void;

  /* screen reader */
  announce: (message: string) => void;
}

/* ---- Root props ---- */
export interface DraggableRootProps {
  children: ReactNode;
  items?: string[];
  defaultItems?: string[];
  onReorder?: (items: string[]) => void;
  containers?: ContainersMap;
  defaultContainers?: ContainersMap;
  onContainersChange?: (containers: ContainersMap) => void;
  className?: string;
}

/* ---- Container props ---- */
export interface DraggableContainerProps {
  children: ReactNode;
  layout?: "list" | "grid";
  columns?: number;
  containerId?: string;
  "aria-label"?: string;
  className?: string;
}

/* ---- Item props ---- */
export interface DraggableItemProps {
  children: ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

/* ---- Handle props ---- */
export interface DraggableHandleProps {
  className?: string;
  children?: ReactNode;
}

/* ---- Preview props ---- */
export interface DraggablePreviewProps {
  className?: string;
  children?: ReactNode;
}

/* ---- Placeholder props ---- */
export interface DraggablePlaceholderProps {
  className?: string;
}

/* ---- DropIndicator props ---- */
export interface DraggableDropIndicatorProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Item-level context (Handle → Item communication)                   */
/* ------------------------------------------------------------------ */

export interface DraggableItemContextValue {
  hasHandle: React.MutableRefObject<boolean>;
  disabled: boolean;
  value: string;
}

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

export function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const result = arr.slice();
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);
  return result;
}

export function getClosestIndex(
  x: number,
  y: number,
  itemRefs: Map<string, HTMLDivElement>,
  items: string[],
  layout: "list" | "grid",
  activeId: string | null
): number {
  let closest = -1;
  let minDist = Infinity;
  items.forEach((id, index) => {
    if (id === activeId) return;
    const el = itemRefs.get(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = layout === "grid" ? Math.hypot(x - cx, y - cy) : Math.abs(y - cy);
    if (dist < minDist) { minDist = dist; closest = index; }
  });
  if (closest < 0) return items.length;

  const closestEl = itemRefs.get(items[closest]);
  if (!closestEl) return items.length;

  const rect = closestEl.getBoundingClientRect();
  const isAfter = layout === "grid"
    ? (y > rect.top + rect.height / 2) || (y >= rect.top && x > rect.left + rect.width / 2)
    : y >= rect.top + rect.height / 2;

  return isAfter ? closest + 1 : closest;
}

export function getContainerAtPoint(
  x: number,
  y: number,
  containerRefs: Map<string, HTMLDivElement>
): string | null {
  for (const [id, el] of containerRefs) {
    const rect = el.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return id;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Contexts                                                           */
/* ------------------------------------------------------------------ */

export const DraggableContext = createContext<DraggableContextValue | null>(null);
export const ContainerIdContext = createContext<string | null>(null);
export const DraggableItemContext = createContext<DraggableItemContextValue | null>(null);
