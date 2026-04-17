import { createContext, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Core Layout Types                                                  */
/* ------------------------------------------------------------------ */

export interface GridLayoutItem {
  /** Unique identifier */
  i: string;
  /** Column position (0-based) */
  x: number;
  /** Row position (0-based) */
  y: number;
  /** Width in grid columns */
  w: number;
  /** Height in grid rows */
  h: number;
  /** Minimum width in columns */
  minW?: number;
  /** Maximum width in columns */
  maxW?: number;
  /** Minimum height in rows */
  minH?: number;
  /** Maximum height in rows */
  maxH?: number;
  /** If true, item cannot be moved or resized */
  static?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Resize Types                                                       */
/* ------------------------------------------------------------------ */

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

/* ------------------------------------------------------------------ */
/*  Responsive Types                                                   */
/* ------------------------------------------------------------------ */

export interface ResponsiveBreakpoint {
  columns: number;
  rowHeight: number;
}

export type Breakpoints = Record<string, ResponsiveBreakpoint>;

export const DEFAULT_BREAKPOINTS: Breakpoints = {
  lg: { columns: 12, rowHeight: 50 },
  md: { columns: 10, rowHeight: 50 },
  sm: { columns: 6, rowHeight: 50 },
  xs: { columns: 4, rowHeight: 50 },
  xxs: { columns: 2, rowHeight: 50 },
};

export const DEFAULT_BREAKPOINT_WIDTHS: Record<string, number> = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0,
};

/* ------------------------------------------------------------------ */
/*  Context Value                                                      */
/* ------------------------------------------------------------------ */

export interface GridLayoutContextValue {
  /* layout state */
  layout: GridLayoutItem[];
  cols: number;
  rowHeight: number;
  gap: number;
  containerWidth: number;
  maxRows: number;

  /* active interaction */
  activeId: string | null;
  interactionType: "drag" | "resize" | null;
  activeResizeDirection: ResizeDirection | null;
  placeholder: GridLayoutItem | null;
  movingLayout: GridLayoutItem[] | null;

  /* item DOM refs */
  itemRefs: Map<string, HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement | null>;

  /* registration */
  registerItem: (id: string, el: HTMLDivElement) => void;
  unregisterItem: (id: string) => void;

  /* drag lifecycle */
  startDrag: (id: string, offsetX: number, offsetY: number) => void;
  moveDrag: (x: number, y: number) => void;
  endDrag: () => void;
  cancelDrag: () => void;

  /* resize lifecycle */
  startResize: (id: string, direction: ResizeDirection, startPointerX: number, startPointerY: number) => void;
  moveResize: (x: number, y: number) => void;
  endResize: () => void;

  /* keyboard */
  keyboardGrab: (id: string) => void;
  keyboardMove: (id: string, direction: "up" | "down" | "left" | "right") => void;
  keyboardResize: (id: string, direction: "up" | "down" | "left" | "right") => void;
  keyboardDrop: () => void;
  keyboardCancel: () => void;

  /* focus */
  focusedId: string | null;
  setFocusedId: (id: string | null) => void;

  /* screen reader */
  announce: (message: string) => void;

  /* flags */
  compactOnMove: boolean;
}

/* ------------------------------------------------------------------ */
/*  Item-level Context (Handle → Item communication)                   */
/* ------------------------------------------------------------------ */

export interface GridItemContextValue {
  hasDragHandle: React.MutableRefObject<boolean>;
  hasResizeHandle: React.MutableRefObject<boolean>;
  disabled: boolean;
  itemId: string;
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface GridLayoutRootProps {
  children: ReactNode;
  /** Controlled layout array */
  layout: GridLayoutItem[];
  /** Initial layout for uncontrolled mode */
  defaultLayout?: GridLayoutItem[];
  /** Callback when layout changes */
  onLayoutChange?: (layout: GridLayoutItem[]) => void;

  /** Number of columns (default 12) */
  cols?: number;
  /** Row height in pixels (default 50) */
  rowHeight?: number;
  /** Gap between items in pixels (default 16) */
  gap?: number;
  /** Maximum number of rows */
  maxRows?: number;
  /** Whether to compact vertically on move (default true) */
  compactOnMove?: boolean;

  /** Responsive breakpoints config */
  breakpoints?: Breakpoints;
  /** Breakpoint widths mapping */
  breakpointWidths?: Record<string, number>;

  /** If true, items cannot overlap during drag */
  preventCollision?: boolean;

  className?: string;
}

export interface GridContainerProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export interface GridItemProps {
  children: ReactNode;
  /** Unique item identifier — must match an entry in the layout array */
  id: string;
  disabled?: boolean;
  className?: string;
}

export interface GridDragHandleProps {
  className?: string;
  children?: ReactNode;
}

export interface GridResizeHandleProps {
  className?: string;
  children?: ReactNode;
  /** Which edges/corners to render handles for (default ["se"]) */
  directions?: ResizeDirection[];
}

export interface GridPlaceholderProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Contexts                                                           */
/* ------------------------------------------------------------------ */

export const GridLayoutContext = createContext<GridLayoutContextValue | null>(null);
export const GridItemContext = createContext<GridItemContextValue | null>(null);
