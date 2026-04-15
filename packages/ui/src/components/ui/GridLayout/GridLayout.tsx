"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../utils";
import { GridLayoutContext, type GridLayoutContextValue, type GridLayoutRootProps } from "./types";
import {
  computeColWidth,
  pixelToGrid,
  resolveCollisions,
  compactLayout,
  computeResize,
  matchBreakpoint,
  adjustLayoutForCols,
  findItem,
} from "./algorithms";
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_BREAKPOINT_WIDTHS,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Live Region                                                        */
/* ------------------------------------------------------------------ */

function LiveRegion({ ref }: { ref: React.RefObject<string> }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      if (ref.current) {
        setMessage(ref.current);
        ref.current = "";
      }
    }, 100);
    return () => clearInterval(id);
  }, [ref]);
  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      role="status"
      className="sr-only"
    >
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                                */
/* ------------------------------------------------------------------ */

function GridLayoutRoot({
  children,
  layout: controlledLayout,
  defaultLayout,
  onLayoutChange,
  cols: colsProp = 12,
  rowHeight: rowHeightProp = 50,
  gap = 16,
  maxRows = 0,
  compactOnMove = true,
  breakpoints = DEFAULT_BREAKPOINTS,
  breakpointWidths = DEFAULT_BREAKPOINT_WIDTHS,
  preventCollision = false,
  className,
}: GridLayoutRootProps) {
  /* ---- controlled / uncontrolled state ---- */
  const [internalLayout, setInternalLayout] = useState<
    GridLayoutRootProps["layout"] extends undefined ? never : typeof controlledLayout
  >(() => defaultLayout ?? controlledLayout ?? []);
  const layout =
    controlledLayout !== undefined ? controlledLayout : internalLayout;

  const setLayout = useCallback(
    (next: typeof layout) => {
      if (controlledLayout === undefined) setInternalLayout(next);
      onLayoutChange?.(next);
    },
    [controlledLayout, onLayoutChange]
  );

  /* ---- responsive state ---- */
  const [responsiveState, setResponsiveState] = useState({
    cols: colsProp,
    rowHeight: rowHeightProp,
    breakpoint: "lg" as string,
  });
  const { cols, rowHeight } = responsiveState;

  /* ---- interaction state ---- */
  const [activeId, setActiveId] = useState<string | null>(null);
  const [interactionType, setInteractionType] = useState<
    "drag" | "resize" | null
  >(null);
  const [activeResizeDirection, setActiveResizeDirection] = useState<
    import("./types").ResizeDirection | null
  >(null);
  const [placeholder, setPlaceholder] = useState<
    import("./types").GridLayoutItem | null
  >(null);
  const [movingLayout, setMovingLayout] = useState<
    import("./types").GridLayoutItem[] | null
  >(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [isKeyboardDragging, setIsKeyboardDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  /* ---- refs ---- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefsMap = useRef(new Map<string, HTMLDivElement>());
  const announceRef = useRef("");
  const activeIdRef = useRef<string | null>(null);
  const interactionTypeRef = useRef<"drag" | "resize" | null>(null);
  const resizeDirRef = useRef<import("./types").ResizeDirection | null>(null);
  const flipRects = useRef(new Map<string, DOMRect>());
  const originalItemRef = useRef<import("./types").GridLayoutItem | null>(null);
  const dragStartOffsetRef = useRef({ x: 0, y: 0 });
  const lastGridPosRef = useRef({ x: -1, y: -1, w: -1, h: -1 });
  const resizeStartPointerRef = useRef({ x: 0, y: 0 });
  const resizeStartItemRef = useRef<import("./types").GridLayoutItem | null>(null);
  const movingLayoutRef = useRef<typeof layout | null>(null);
  const placeholderRef = useRef<import("./types").GridLayoutItem | null>(null);

  // Stable refs for grid config so moveDrag/moveResize don't go stale
  const colsRef = useRef(cols);
  colsRef.current = cols;
  const rowHeightRef = useRef(rowHeight);
  rowHeightRef.current = rowHeight;
  const gapRef = useRef(gap);
  gapRef.current = gap;
  const compactOnMoveRef = useRef(compactOnMove);
  compactOnMoveRef.current = compactOnMove;
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  /* Stable refs for global listener callbacks */
  const moveDragRef = useRef<(x: number, y: number) => void>(() => { });
  const endDragRef = useRef<() => void>(() => { });
  const moveResizeRef = useRef<(x: number, y: number) => void>(() => { });
  const endResizeRef = useRef<() => void>(() => { });
  const cancelRef = useRef<() => void>(() => { });

  /* ---- announce ---- */
  const announce = useCallback((msg: string) => {
    announceRef.current = msg;
  }, []);

  /* ---- FLIP animation ---- */
  const recordRects = useCallback(() => {
    flipRects.current.clear();
    layoutRef.current.forEach((item) => {
      const el = itemRefsMap.current.get(item.i);
      if (el) flipRects.current.set(item.i, el.getBoundingClientRect());
    });
  }, []);

  const playFlip = useCallback(() => {
    layoutRef.current.forEach((item) => {
      const el = itemRefsMap.current.get(item.i);
      const old = flipRects.current.get(item.i);
      if (!el || !old) return;
      const cur = el.getBoundingClientRect();
      const dx = old.left - cur.left;
      const dy = old.top - cur.top;
      if (!dx && !dy) return;
      el.style.transform = `translate3d(${dx}px,${dy}px,0)`;
      el.style.transition = "none";
      requestAnimationFrame(() => {
        el.style.transition = "transform 200ms cubic-bezier(0.2,0,0,1)";
        el.style.transform = "translate3d(0,0,0)";
      });
    });
  }, []);

  /* ---- reset ---- */
  function resetInteraction() {
    setActiveId(null);
    activeIdRef.current = null;
    setInteractionType(null);
    interactionTypeRef.current = null;
    setActiveResizeDirection(null);
    resizeDirRef.current = null;
    setPlaceholder(null);
    placeholderRef.current = null;
    setMovingLayout(null);
    movingLayoutRef.current = null;
    setIsKeyboardDragging(false);
    originalItemRef.current = null;
    resizeStartItemRef.current = null;
    lastGridPosRef.current = { x: -1, y: -1, w: -1, h: -1 };
  }

  /* ---- registration ---- */
  const registerItem = useCallback(
    (id: string, el: HTMLDivElement) => {
      itemRefsMap.current.set(id, el);
    },
    []
  );
  const unregisterItem = useCallback((id: string) => {
    itemRefsMap.current.delete(id);
  }, []);

  /* ---- responsive breakpoint tracking ---- */
  const handleContainerResize = useCallback(
    (width: number) => {
      setContainerWidth(width);
      const bp = matchBreakpoint(width, breakpointWidths);
      const bpConfig = breakpoints[bp];
      if (bpConfig && bp !== responsiveState.breakpoint) {
        const nextCols = bpConfig.columns;
        const nextRowHeight = bpConfig.rowHeight;
        setResponsiveState({ cols: nextCols, rowHeight: nextRowHeight, breakpoint: bp });

        const adjusted = adjustLayoutForCols(layoutRef.current, responsiveState.cols, nextCols, compactOnMove);
        if (adjusted !== layoutRef.current) {
          setLayout(adjusted);
        }
      }
    },
    [breakpointWidths, breakpoints, responsiveState.breakpoint, responsiveState.cols, compactOnMove, setLayout]
  );

  /* ================================================================== */
  /*  POINTER DRAG                                                       */
  /* ================================================================== */

  const startDrag = useCallback(
    (id: string, offsetX: number, offsetY: number) => {
      const item = findItem(layoutRef.current, id);
      if (!item || item.static) return;

      recordRects();
      originalItemRef.current = { ...item };
      dragStartOffsetRef.current = { x: offsetX, y: offsetY };
      activeIdRef.current = id;
      interactionTypeRef.current = "drag";

      setActiveId(id);
      setInteractionType("drag");
      setIsKeyboardDragging(false);
      announce(`Picked up item ${id}. Use arrow keys to move.`);
    },
    [recordRects, announce]
  );

  const moveDrag = useCallback(
    (clientX: number, clientY: number) => {
      const id = activeIdRef.current;
      if (!id || interactionTypeRef.current !== "drag") return;

      // Use last resolved layout during drag, not the committed layout.
      // Starting from committed layout every frame resets all pushed items
      // causing jitter and preventing upward movement.
      const currentLayout = movingLayoutRef.current ?? layoutRef.current;
      const item = findItem(currentLayout, id);
      if (!item) return;

      const containerEl = containerRef.current;
      if (!containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const currentCols = colsRef.current;
      const currentGap = gapRef.current;
      const currentRowHeight = rowHeightRef.current;
      const colWidth = computeColWidth(containerRect.width, currentCols, currentGap);

      // Pointer position relative to container top-left, minus the initial grab offset
      const relX = clientX - containerRect.left - dragStartOffsetRef.current.x;
      const relY = clientY - containerRect.top - dragStartOffsetRef.current.y;

      const gridPos = pixelToGrid(relX, relY, colWidth, currentRowHeight, currentGap, currentCols, item.w);

      const newX = Math.max(0, Math.min(currentCols - item.w, gridPos.x));
      const newY = Math.max(0, gridPos.y);

      // Skip if grid position hasn't changed — avoids expensive collision + compact + re-render
      const last = lastGridPosRef.current;
      if (last.x === newX && last.y === newY && last.w === item.w && last.h === item.h) return;
      lastGridPosRef.current = { x: newX, y: newY, w: item.w, h: item.h };

      // Resolve collisions — active item always wins its position
      let resolved = resolveCollisions(currentLayout, id, newX, newY, item.w, item.h, currentCols);

      // Compact other items upward, but don't move the active item
      if (compactOnMoveRef.current) {
        resolved = compactLayout(resolved, currentCols, id);
      }

      const newPlaceholder = resolved.find((i) => i.i === id) ?? null;
      placeholderRef.current = newPlaceholder;
      movingLayoutRef.current = resolved;

      setPlaceholder(newPlaceholder);
      setMovingLayout(resolved);
    },
    [] // uses refs only — no stale closures
  );
  moveDragRef.current = moveDrag;

  const endDrag = useCallback(() => {
    const id = activeIdRef.current;
    if (!id) {
      resetInteraction();
      return;
    }

    const currentMoving = movingLayoutRef.current;
    if (currentMoving) {
      recordRects();
      setLayout(currentMoving);
      const finalItem = currentMoving.find((i) => i.i === id);
      announce(
        `Dropped at column ${finalItem ? finalItem.x + 1 : "?"}, row ${finalItem ? finalItem.y + 1 : "?"}`
      );
      requestAnimationFrame(playFlip);
    }

    resetInteraction();
  }, [setLayout, recordRects, playFlip, announce]);
  endDragRef.current = endDrag;

  /* ================================================================== */
  /*  POINTER RESIZE                                                     */
  /* ================================================================== */

  const startResize = useCallback(
    (id: string, direction: import("./types").ResizeDirection, startPointerX: number, startPointerY: number) => {
      const item = findItem(layoutRef.current, id);
      if (!item || item.static) return;

      recordRects();
      originalItemRef.current = { ...item };
      resizeStartItemRef.current = { ...item };
      resizeStartPointerRef.current = { x: startPointerX, y: startPointerY };
      activeIdRef.current = id;
      interactionTypeRef.current = "resize";
      resizeDirRef.current = direction;

      setActiveId(id);
      setInteractionType("resize");
      setActiveResizeDirection(direction);
      setIsKeyboardDragging(false);
      announce(`Started resizing item ${id}.`);
    },
    [recordRects, announce]
  );

  const moveResize = useCallback(
    (clientX: number, clientY: number) => {
      const id = activeIdRef.current;
      if (!id || interactionTypeRef.current !== "resize") return;
      if (!resizeStartItemRef.current) return;

      const containerEl = containerRef.current;
      if (!containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const currentCols = colsRef.current;
      const currentGap = gapRef.current;
      const currentRowHeight = rowHeightRef.current;
      const colWidth = computeColWidth(containerRect.width, currentCols, currentGap);

      const origItem = resizeStartItemRef.current;

      // Calculate delta in pixels from start pointer, then convert to grid units
      const dx = clientX - resizeStartPointerRef.current.x;
      const dy = clientY - resizeStartPointerRef.current.y;

      const deltaCols = Math.round(dx / (colWidth + currentGap));
      const deltaRows = Math.round(dy / (currentRowHeight + currentGap));

      const resized = computeResize(
        origItem,
        resizeDirRef.current!,
        deltaCols,
        deltaRows,
        currentCols,
        maxRows
      );

      // Skip if resized position/size hasn't changed
      const last = lastGridPosRef.current;
      if (last.x === resized.x && last.y === resized.y && last.w === resized.w && last.h === resized.h) return;
      lastGridPosRef.current = { x: resized.x, y: resized.y, w: resized.w, h: resized.h };

      // Resolve collisions with the new size — use moving layout for consistency
      const currentLayout = movingLayoutRef.current ?? layoutRef.current;
      let resolved = resolveCollisions(currentLayout, id, resized.x, resized.y, resized.w, resized.h, currentCols);
      if (compactOnMoveRef.current) {
        resolved = compactLayout(resolved, currentCols, id);
      }

      const newPlaceholder = resolved.find((i) => i.i === id) ?? null;
      placeholderRef.current = newPlaceholder;
      movingLayoutRef.current = resolved;

      setPlaceholder(newPlaceholder);
      setMovingLayout(resolved);
    },
    [maxRows]
  );
  moveResizeRef.current = moveResize;

  const endResize = useCallback(() => {
    const id = activeIdRef.current;
    if (!id) {
      resetInteraction();
      return;
    }

    const currentMoving = movingLayoutRef.current;
    if (currentMoving) {
      recordRects();
      setLayout(currentMoving);
      const finalItem = currentMoving.find((i) => i.i === id);
      announce(
        `Resized to ${finalItem?.w ?? "?"} columns by ${finalItem?.h ?? "?"} rows`
      );
      requestAnimationFrame(playFlip);
    }

    resetInteraction();
  }, [setLayout, recordRects, playFlip, announce]);
  endResizeRef.current = endResize;

  /* ---- cancel ---- */
  const cancelInteraction = useCallback(() => {
    announce("Action cancelled");
    resetInteraction();
  }, [announce]);
  cancelRef.current = cancelInteraction;

  /* ---- global pointer listeners (active only during drag/resize) ---- */
  useEffect(() => {
    if (!activeId) return;

    // RAF-throttle pointer moves so we compute at most once per frame
    let rafId = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (interactionTypeRef.current === "drag") moveDragRef.current(lastPointerX, lastPointerY);
          else if (interactionTypeRef.current === "resize") moveResizeRef.current(lastPointerX, lastPointerY);
        });
      }
    };
    const onUp = (e: PointerEvent) => {
      e.preventDefault();
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      if (interactionTypeRef.current === "drag") endDragRef.current();
      else if (interactionTypeRef.current === "resize") endResizeRef.current();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        cancelRef.current();
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  /* ---- keyboard ---- */
  const keyboardGrab = useCallback(
    (id: string) => {
      const item = findItem(layoutRef.current, id);
      if (!item || item.static) return;

      recordRects();
      setIsKeyboardDragging(true);
      originalItemRef.current = { ...item };
      activeIdRef.current = id;
      interactionTypeRef.current = "drag";

      setActiveId(id);
      setInteractionType("drag");
      announce(
        `Picked up item ${id}. Use arrow keys to move. Shift plus arrow keys to resize.`
      );
    },
    [recordRects, announce]
  );

  const keyboardMove = useCallback(
    (id: string, direction: "up" | "down" | "left" | "right") => {
      if (!activeIdRef.current || interactionTypeRef.current !== "drag") return;

      const currentLayout = movingLayoutRef.current ?? layoutRef.current;
      const item = findItem(currentLayout, id);
      if (!item) return;

      const currentCols = colsRef.current;

      let newX = item.x;
      let newY = item.y;

      if (direction === "up") newY = Math.max(0, item.y - 1);
      else if (direction === "down") newY = item.y + 1;
      else if (direction === "left") newX = Math.max(0, item.x - 1);
      else if (direction === "right") newX = Math.min(currentCols - item.w, item.x + 1);

      let resolved = resolveCollisions(currentLayout, id, newX, newY, item.w, item.h, currentCols);
      if (compactOnMoveRef.current) resolved = compactLayout(resolved, currentCols, id);

      const newPlaceholder = resolved.find((i) => i.i === id) ?? null;
      placeholderRef.current = newPlaceholder;
      movingLayoutRef.current = resolved;

      setPlaceholder(newPlaceholder);
      setMovingLayout(resolved);
      announce(
        `Moved to column ${newPlaceholder ? newPlaceholder.x + 1 : "?"}, row ${newPlaceholder ? newPlaceholder.y + 1 : "?"}`
      );
    },
    [announce]
  );

  const keyboardResize = useCallback(
    (id: string, direction: "up" | "down" | "left" | "right") => {
      if (!activeIdRef.current || interactionTypeRef.current !== "drag") return;

      const currentLayout = movingLayoutRef.current ?? layoutRef.current;
      const item = findItem(currentLayout, id);
      if (!item) return;

      const currentCols = colsRef.current;

      const deltaCols = direction === "left" ? -1 : direction === "right" ? 1 : 0;
      const deltaRows = direction === "up" ? -1 : direction === "down" ? 1 : 0;

      const resized = computeResize(item, "se", deltaCols, deltaRows, currentCols, maxRows);

      let resolved = resolveCollisions(currentLayout, id, resized.x, resized.y, resized.w, resized.h, currentCols);
      if (compactOnMoveRef.current) resolved = compactLayout(resolved, currentCols, id);

      const newPlaceholder = resolved.find((i) => i.i === id) ?? null;
      placeholderRef.current = newPlaceholder;
      movingLayoutRef.current = resolved;

      setPlaceholder(newPlaceholder);
      setMovingLayout(resolved);
      announce(
        `Resized to ${newPlaceholder?.w ?? "?"} columns by ${newPlaceholder?.h ?? "?"} rows`
      );
    },
    [maxRows, announce]
  );

  const keyboardDrop = useCallback(() => {
    const id = activeIdRef.current;
    if (!id) return;

    const currentMoving = movingLayoutRef.current;
    if (currentMoving) {
      recordRects();
      setLayout(currentMoving);
      requestAnimationFrame(playFlip);
    }

    resetInteraction();
    announce("Dropped");
  }, [setLayout, recordRects, playFlip, announce]);

  const keyboardCancel = useCallback(() => {
    announce("Action cancelled");
    resetInteraction();
  }, [announce]);

  /* ---- expose container ref to Container component ---- */
  const setContainerRef = useCallback(
    (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (el) {
        const rect = el.getBoundingClientRect();
        setContainerWidth(rect.width);
        handleContainerResize(rect.width);

        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const width = entry.contentRect.width;
            setContainerWidth(width);
            handleContainerResize(width);
          }
        });
        observer.observe(el);
        return () => observer.disconnect();
      }
    },
    [handleContainerResize]
  );

  const containerRefSetter = useRef(setContainerRef);
  containerRefSetter.current = setContainerRef;

  /* ---- context ---- */
  const ctx = useMemo<GridLayoutContextValue>(
    () => ({
      layout,
      cols,
      rowHeight,
      gap,
      containerWidth,
      maxRows,
      activeId,
      interactionType,
      activeResizeDirection,
      placeholder,
      movingLayout,
      itemRefs: itemRefsMap.current,
      containerRef,
      registerItem,
      unregisterItem,
      startDrag,
      moveDrag,
      endDrag,
      cancelDrag: cancelInteraction,
      startResize,
      moveResize,
      endResize,
      keyboardGrab,
      keyboardMove,
      keyboardResize,
      keyboardDrop,
      keyboardCancel,
      focusedId,
      setFocusedId,
      announce,
      compactOnMove,
    }),
    [
      layout, cols, rowHeight, gap, containerWidth, maxRows,
      activeId, interactionType, activeResizeDirection, placeholder, movingLayout,
      registerItem, unregisterItem,
      startDrag, moveDrag, endDrag, cancelInteraction,
      startResize, moveResize, endResize,
      keyboardGrab, keyboardMove, keyboardResize, keyboardDrop, keyboardCancel,
      focusedId, setFocusedId, announce, compactOnMove,
    ]
  );

  // Expose container ref setter and startResize with pointer for Container/ResizeHandle
  (ctx as any)._setContainerRef = containerRefSetter.current;

  return (
    <GridLayoutContext.Provider value={ctx}>
      <div className={cn("relative", className)}>
        {children}
        <LiveRegion ref={announceRef} />
      </div>
    </GridLayoutContext.Provider>
  );
}

export default GridLayoutRoot;
