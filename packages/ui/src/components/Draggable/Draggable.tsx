"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../utils";
import {
  arrayMove,
  DraggableContext,
  getClosestIndex,
  getContainerAtPoint,
  type ContainersMap,
  type DraggableContextValue,
  type DraggableRootProps,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Live Region                                                        */
/* ------------------------------------------------------------------ */

function LiveRegion({ ref }: { ref: React.RefObject<string> }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      if (ref.current) { setMessage(ref.current); ref.current = ""; }
    }, 100);
    return () => clearInterval(id);
  }, [ref]);
  return (
    <div aria-live="assertive" aria-atomic="true" role="status" className="sr-only">
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                                */
/* ------------------------------------------------------------------ */

function DraggableRoot({
  children,
  items: controlledItems,
  defaultItems,
  onReorder,
  containers: controlledContainers,
  defaultContainers,
  onContainersChange,
  className,
}: DraggableRootProps) {
  const isMulti = controlledContainers !== undefined || defaultContainers !== undefined;

  /* ---- single-list state ---- */
  const [internalItems, setInternalItems] = useState<string[]>(defaultItems ?? []);
  const items = controlledItems !== undefined ? controlledItems : internalItems;

  /* ---- multi-container state ---- */
  const [internalContainers, setInternalContainers] = useState<ContainersMap>(defaultContainers ?? {});
  const containers = controlledContainers !== undefined ? controlledContainers : internalContainers;

  /* ---- drag state ---- */
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overIndex, setOverIndex] = useState(-1);
  const [overContainerId, setOverContainerId] = useState<string | null>(null);
  const [sourceContainerId, setSourceContainerId] = useState<string | null>(null);
  const [layout, setLayout] = useState<"list" | "grid">("list");
  const [columns, setColumns] = useState(3);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [isKeyboardDragging, setIsKeyboardDragging] = useState(false);
  const [initialRect, setInitialRect] = useState<{ width: number; height: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  /* ---- refs ---- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerRefsMap = useRef(new Map<string, HTMLDivElement>());
  const itemRefsMap = useRef(new Map<string, HTMLDivElement>());
  const announceRef = useRef("");
  const activeIdRef = useRef<string | null>(null);
  const overIndexRef = useRef(-1);
  const srcContainerRef = useRef<string | null>(null);
  const overContainerRef = useRef<string | null>(null);
  const flipRects = useRef(new Map<string, DOMRect>());

  /* Stable refs for global listener callbacks */
  const moveDragRef = useRef<(x: number, y: number) => void>(() => { });
  const endDragRef = useRef<() => void>(() => { });

  /* ---- state setters ---- */
  const setItems = useCallback(
    (next: string[]) => { if (controlledItems === undefined) setInternalItems(next); onReorder?.(next); },
    [controlledItems, onReorder]
  );
  const setContainersState = useCallback(
    (next: ContainersMap) => { if (controlledContainers === undefined) setInternalContainers(next); onContainersChange?.(next); },
    [controlledContainers, onContainersChange]
  );

  /* ---- helpers ---- */
  const containerItems = useCallback(
    (cId: string): string[] => (isMulti ? (containers[cId] ?? []) : items),
    [isMulti, items, containers]
  );

  const announce = useCallback((msg: string) => { announceRef.current = msg; }, []);

  /* ---- FLIP ---- */
  const allItems = useMemo(
    () => (isMulti ? Object.values(containers).flat() : items),
    [isMulti, items, containers]
  );

  const recordRects = useCallback(() => {
    flipRects.current.clear();
    allItems.forEach((id) => {
      const el = itemRefsMap.current.get(id);
      if (el) flipRects.current.set(id, el.getBoundingClientRect());
    });
  }, [allItems]);

  const playFlip = useCallback(() => {
    allItems.forEach((id) => {
      const el = itemRefsMap.current.get(id);
      const old = flipRects.current.get(id);
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
  }, [allItems]);

  /* ---- reset ---- */
  function resetDrag() {
    setActiveId(null); activeIdRef.current = null;
    setOverIndex(-1); overIndexRef.current = -1;
    setIsKeyboardDragging(false); setInitialRect(null);
    setOverContainerId(null); overContainerRef.current = null;
    setSourceContainerId(null); srcContainerRef.current = null;
  }

  /* ---- registration ---- */
  const registerItem = useCallback((v: string, el: HTMLDivElement) => { itemRefsMap.current.set(v, el); }, []);
  const unregisterItem = useCallback((v: string) => { itemRefsMap.current.delete(v); }, []);
  const registerContainer = useCallback((id: string, el: HTMLDivElement) => { containerRefsMap.current.set(id, el); }, []);
  const unregisterContainer = useCallback((id: string) => { containerRefsMap.current.delete(id); }, []);

  /* ---- pointer drag ---- */
  const startDrag = useCallback(
    (id: string, containerId: string | null, offsetX?: number, offsetY?: number) => {
      recordRects();
      const el = itemRefsMap.current.get(id);
      let ox = offsetX ?? 0;
      let oy = offsetY ?? 0;
      let w = 0;
      let h = 0;
      if (el) {
        const rect = el.getBoundingClientRect();
        ox = offsetX ?? rect.width / 2;
        oy = offsetY ?? rect.height / 2;
        w = rect.width;
        h = rect.height;
      }
      setDragOffset({ x: ox, y: oy });
      setInitialRect({ width: w, height: h });
      activeIdRef.current = id;

      if (isMulti && containerId) {
        setSourceContainerId(containerId); srcContainerRef.current = containerId;
        setOverContainerId(containerId); overContainerRef.current = containerId;
        const ci = (containers[containerId] ?? []).indexOf(id);
        setOverIndex(ci); overIndexRef.current = ci;
      } else {
        const idx = items.indexOf(id);
        setOverIndex(idx); overIndexRef.current = idx;
      }
      setActiveId(id);
      announce(`Picked up item ${id}`);
    },
    [isMulti, items, containers, recordRects, announce]
  );

  const moveDrag = useCallback(
    (x: number, y: number) => {
      if (isMulti) {
        const tc = getContainerAtPoint(x, y, containerRefsMap.current);
        if (tc) {
          setOverContainerId(tc); overContainerRef.current = tc;
          const cItems = containers[tc] ?? [];
          const ci = getClosestIndex(x, y, itemRefsMap.current, cItems, layout, activeIdRef.current);
          setOverIndex(ci); overIndexRef.current = ci;
        }
      } else {
        const ci = getClosestIndex(x, y, itemRefsMap.current, items, layout, activeIdRef.current);
        setOverIndex(ci); overIndexRef.current = ci;
      }
    },
    [isMulti, items, containers, layout]
  );
  moveDragRef.current = moveDrag;

  const endDrag = useCallback(() => {
    const id = activeIdRef.current;
    if (!id) { resetDrag(); return; }

    if (isMulti && srcContainerRef.current) {
      const srcId = srcContainerRef.current;
      const tgtId = overContainerRef.current ?? srcId;
      const srcList = containers[srcId] ?? [];
      const fromIndex = srcList.indexOf(id);

      if (tgtId !== srcId) {
        const tgtList = containers[tgtId] ?? [];
        const toIndex = Math.min(overIndexRef.current, tgtList.length);
        recordRects();
        setContainersState({
          ...containers,
          [srcId]: srcList.filter((i) => i !== id),
          [tgtId]: tgtList.slice(0, toIndex).concat(id, tgtList.slice(toIndex)),
        });
        announce(`Moved item to ${tgtId}`);
        requestAnimationFrame(playFlip);
      } else if (fromIndex !== -1 && fromIndex !== overIndexRef.current && overIndexRef.current >= 0) {
        recordRects();
        setContainersState({ ...containers, [srcId]: arrayMove(srcList, fromIndex, overIndexRef.current) });
        announce(`Dropped at position ${overIndexRef.current + 1}`);
        requestAnimationFrame(playFlip);
      }
    } else {
      const fromIndex = items.indexOf(id);
      if (fromIndex !== -1 && fromIndex !== overIndexRef.current && overIndexRef.current >= 0) {
        recordRects();
        setItems(arrayMove(items, fromIndex, overIndexRef.current));
        announce(`Dropped at position ${overIndexRef.current + 1}`);
        requestAnimationFrame(playFlip);
      }
    }
    resetDrag();
  }, [isMulti, items, containers, setItems, setContainersState, recordRects, playFlip, announce]);
  endDragRef.current = endDrag;

  const cancelDrag = useCallback(() => { announce("Reorder cancelled"); resetDrag(); }, [announce]);

  /* ---- global pointer listeners (active only during drag) ---- */
  useEffect(() => {
    if (!activeId) return;
    const onMove = (e: PointerEvent) => { e.preventDefault(); moveDragRef.current(e.clientX, e.clientY); };
    const onUp = (e: PointerEvent) => { e.preventDefault(); endDragRef.current(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.preventDefault(); cancelDrag(); } };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId, cancelDrag]);

  /* ---- keyboard drag ---- */
  const keyboardGrab = useCallback(
    (id: string) => {
      recordRects(); setIsKeyboardDragging(true); activeIdRef.current = id;
      if (isMulti) {
        for (const [cId, cItems] of Object.entries(containers)) {
          if (cItems.includes(id)) {
            setSourceContainerId(cId); srcContainerRef.current = cId;
            setOverContainerId(cId); overContainerRef.current = cId;
            const idx = cItems.indexOf(id);
            setOverIndex(idx); overIndexRef.current = idx;
            break;
          }
        }
      } else {
        const idx = items.indexOf(id);
        setOverIndex(idx); overIndexRef.current = idx;
      }
      setActiveId(id);
      announce(`Picked up item ${id}. Use arrow keys to move.`);
    },
    [isMulti, items, containers, recordRects, announce]
  );

  const keyboardMove = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (!activeIdRef.current) return;
      const ci = isMulti ? (containers[overContainerRef.current ?? ""] ?? []) : items;
      let t = overIndexRef.current;
      if (layout === "list") {
        if (direction === "up") t = Math.max(0, t - 1);
        else if (direction === "down") t = Math.min(ci.length - 1, t + 1);
      } else {
        if (direction === "up") t = Math.max(0, t - columns);
        else if (direction === "down") t = Math.min(ci.length - 1, t + columns);
        else if (direction === "left") t = Math.max(0, t - 1);
        else if (direction === "right") t = Math.min(ci.length - 1, t + 1);
      }
      if (t !== overIndexRef.current) {
        setOverIndex(t); overIndexRef.current = t;
        announce(`Moved to position ${t + 1}`);
      }
    },
    [activeId, isMulti, containers, items, layout, columns, announce]
  );

  const keyboardDrop = useCallback(() => { endDragRef.current(); }, []);
  const keyboardCancel = useCallback(() => { announce("Reorder cancelled"); resetDrag(); }, [announce]);

  /* ---- context ---- */
  const ctx = useMemo<DraggableContextValue>(
    () => ({
      items, activeId, overIndex, layout, columns, focusedId, isKeyboardDragging,
      isMultiContainer: isMulti, containers, containerItems,
      overContainerId, sourceContainerId,
      containerRef,
      containerRefs: containerRefsMap.current,
      itemRefs: itemRefsMap.current,
      initialRect, dragOffset,
      registerItem, unregisterItem, registerContainer, unregisterContainer,
      startDrag, moveDrag, endDrag, cancelDrag,
      keyboardGrab, keyboardMove, keyboardDrop, keyboardCancel,
      setFocusedId, announce,
    }),
    [
      items, activeId, overIndex, layout, columns, focusedId, isKeyboardDragging,
      isMulti, containers, containerItems, overContainerId, sourceContainerId,
      initialRect, dragOffset,
      registerItem, unregisterItem, registerContainer, unregisterContainer,
      startDrag, moveDrag, endDrag, cancelDrag,
      keyboardGrab, keyboardMove, keyboardDrop, keyboardCancel, setFocusedId, announce,
    ]
  );
  (ctx as any)._setLayout = (l: "list" | "grid", c: number) => { setLayout(l); setColumns(c); };

  return (
    <DraggableContext.Provider value={ctx}>
      <div className={cn("relative", className)}>
        {children}
        <LiveRegion ref={announceRef} />
      </div>
    </DraggableContext.Provider>
  );
}

export default DraggableRoot;
