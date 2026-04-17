import type { GridLayoutItem, ResizeDirection } from "./types";

/* ================================================================== */
/*  Grid Snapping                                                      */
/* ================================================================== */

/**
 * Compute the pixel width of a single column.
 * Formula: (containerWidth - gap*(cols-1)) / cols
 */
export function computeColWidth(
  containerWidth: number,
  cols: number,
  gap: number
): number {
  return (containerWidth - gap * (cols - 1)) / cols;
}

/**
 * Convert pixel coordinates to grid cell coordinates.
 */
export function pixelToGrid(
  px: number,
  py: number,
  colWidth: number,
  rowHeight: number,
  gap: number,
  cols: number,
  itemW: number
): { x: number; y: number } {
  const x = Math.round(px / (colWidth + gap));
  const y = Math.round(py / (rowHeight + gap));
  return {
    x: Math.max(0, Math.min(cols - itemW, x)),
    y: Math.max(0, y),
  };
}

/**
 * Compute the pixel position and size for a grid item.
 */
export function gridToPixel(
  item: { x: number; y: number; w: number; h: number },
  colWidth: number,
  rowHeight: number,
  gap: number
): { left: number; top: number; width: number; height: number } {
  return {
    left: item.x * (colWidth + gap),
    top: item.y * (rowHeight + gap),
    width: item.w * colWidth + (item.w - 1) * gap,
    height: item.h * rowHeight + (item.h - 1) * gap,
  };
}

/* ================================================================== */
/*  Collision Detection                                                */
/* ================================================================== */

/**
 * Check if two items overlap in grid space.
 */
export function itemsOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
): boolean {
  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  );
}

/**
 * Get all items that overlap with a given item (excluding one ID).
 */
export function getCollisions(
  item: { x: number; y: number; w: number; h: number },
  layout: GridLayoutItem[],
  excludeId?: string
): GridLayoutItem[] {
  return layout.filter(
    (other) => other.i !== excludeId && itemsOverlap(item, other)
  );
}

/* ================================================================== */
/*  Collision Resolution                                               */
/* ================================================================== */

/**
 * Resolve collisions by pushing non-active items downward.
 *
 * The active item always wins its position. All other items that
 * overlap with it (or with each other after being pushed) are moved
 * down iteratively until no overlaps remain.
 *
 * The active item's position is NEVER modified — only other items
 * get pushed down. Static items are never moved either.
 */
export function resolveCollisions(
  layout: GridLayoutItem[],
  activeId: string,
  newX: number,
  newY: number,
  newW: number,
  newH: number,
  cols: number
): GridLayoutItem[] {
  // Working copy — update active item first
  const working: GridLayoutItem[] = layout.map((item) =>
    item.i === activeId
      ? { ...item, x: newX, y: newY, w: newW, h: newH }
      : { ...item }
  );

  // Clamp active item to grid bounds
  const active = working.find((item) => item.i === activeId);
  if (active) {
    active.x = Math.max(0, Math.min(cols - active.w, active.x));
    active.y = Math.max(0, active.y);
  }

  // Separate immutable items (active + static) from moveable ones
  const immovable = working.filter((item) => item.i === activeId || item.static);
  const moveable = working.filter((item) => item.i !== activeId && !item.static);

  // Iteratively push moveable items down to resolve overlaps
  // against immovable items AND against each other
  const maxIter = moveable.length * moveable.length + 1;
  for (let iter = 0; iter < maxIter; iter++) {
    let moved = false;

    // Re-sort by y each pass so pushes propagate top-down correctly
    moveable.sort((a, b) => a.y - b.y || a.x - b.x);

    for (const m of moveable) {
      // Check against all immovable items
      for (const imm of immovable) {
        if (itemsOverlap(m, imm)) {
          m.y = imm.y + imm.h;
          moved = true;
        }
      }
      // Check against all other moveable items (not just those above)
      for (const other of moveable) {
        if (other === m) continue;
        if (itemsOverlap(m, other)) {
          // Push the one that's lower (or same row) downward
          if (m.y >= other.y) {
            m.y = other.y + other.h;
          } else {
            other.y = m.y + m.h;
          }
          moved = true;
        }
      }
    }

    if (!moved) break;
  }

  return working;
}

/* ================================================================== */
/*  Vertical Compaction                                                */
/* ================================================================== */

/**
 * Compact the layout by moving items upward to fill gaps.
 * Processes items sorted by y-position ascending and moves each
 * one up as far as possible without overlapping already-placed items.
 * The active item is excluded from being moved during compaction.
 */
export function compactLayout(
  layout: GridLayoutItem[],
  cols: number,
  activeId?: string | null
): GridLayoutItem[] {
  const sorted = [...layout]
    .map((item) => ({ ...item }))
    .sort((a, b) => a.y - b.y);

  const placed: GridLayoutItem[] = [];

  for (const item of sorted) {
    // Static items and the active item stay where they are
    if (item.static || item.i === activeId) {
      placed.push(item);
      continue;
    }

    // Scan from y=0 upward to find the best (lowest) y with no overlap
    let bestY = item.y;
    for (let tryY = 0; tryY < item.y; tryY++) {
      const testItem = { ...item, y: tryY };
      const collides = placed.some((p) => itemsOverlap(testItem, p));
      if (!collides) {
        bestY = tryY;
        break;
      }
    }

    item.y = bestY;
    placed.push(item);
  }

  // Clamp items to grid bounds
  return sorted.map((item) => ({
    ...item,
    x: Math.max(0, Math.min(cols - item.w, item.x)),
    y: Math.max(0, item.y),
  }));
}

/* ================================================================== */
/*  Clamping                                                           */
/* ================================================================== */

/**
 * Clamp item position and size to grid bounds.
 */
export function clampItem(
  item: GridLayoutItem,
  cols: number,
  maxRows: number
): GridLayoutItem {
  const minW = item.minW ?? 1;
  const maxW = item.maxW ?? cols;
  const minH = item.minH ?? 1;
  const maxH = item.maxH ?? (maxRows > 0 ? maxRows : Infinity);

  return {
    ...item,
    x: Math.max(0, Math.min(cols - item.w, item.x)),
    y: Math.max(0, maxRows > 0 ? Math.min(maxRows - item.h, item.y) : item.y),
    w: Math.max(minW, Math.min(maxW, item.w)),
    h: Math.max(minH, Math.min(maxH, item.h)),
  };
}

/**
 * Compute new dimensions during resize, clamped to constraints.
 */
export function computeResize(
  item: GridLayoutItem,
  direction: ResizeDirection,
  deltaCols: number,
  deltaRows: number,
  cols: number,
  maxRows: number
): GridLayoutItem {
  let { x, y, w, h } = item;
  const minW = item.minW ?? 1;
  const maxW = item.maxW ?? cols;
  const minH = item.minH ?? 1;
  const maxH = item.maxH ?? (maxRows > 0 ? maxRows : Infinity);

  // Horizontal resize
  if (direction.includes("e")) {
    w = Math.max(minW, Math.min(maxW, w + deltaCols));
  }
  if (direction.includes("w")) {
    const newW = Math.max(minW, Math.min(maxW, w - deltaCols));
    x = x + (w - newW);
    w = newW;
  }

  // Vertical resize
  if (direction.includes("s")) {
    h = Math.max(minH, Math.min(maxH, h + deltaRows));
  }
  if (direction.includes("n")) {
    const newH = Math.max(minH, Math.min(maxH, h - deltaRows));
    y = y + (h - newH);
    h = newH;
  }

  // Clamp position
  x = Math.max(0, Math.min(cols - w, x));
  y = Math.max(0, y);

  return { ...item, x, y, w, h };
}

/* ================================================================== */
/*  Responsive                                                         */
/* ================================================================== */

/**
 * Match a container width to the appropriate breakpoint.
 */
export function matchBreakpoint(
  width: number,
  breakpointWidths: Record<string, number>
): string {
  const entries = Object.entries(breakpointWidths).sort(
    (a, b) => b[1] - a[1]
  );
  for (const [bp, bw] of entries) {
    if (width >= bw) return bp;
  }
  return entries[entries.length - 1]?.[0] ?? "lg";
}

/**
 * Adjust layout for a new column count.
 * Items that overflow get clamped and the layout is re-compacted.
 */
export function adjustLayoutForCols(
  layout: GridLayoutItem[],
  prevCols: number,
  nextCols: number,
  compact: boolean
): GridLayoutItem[] {
  if (prevCols === nextCols) return layout;

  const adjusted = layout.map((item) => {
    if (item.static) return item;

    // Scale x proportionally
    const ratio = nextCols / prevCols;
    let newX = Math.round(item.x * ratio);
    let newW = Math.round(item.w * ratio);

    // Clamp
    const minW = item.minW ?? 1;
    const maxW = item.maxW ?? nextCols;
    newW = Math.max(minW, Math.min(maxW, newW));
    newX = Math.max(0, Math.min(nextCols - newW, newX));

    return { ...item, x: newX, w: newW };
  });

  return compact ? compactLayout(adjusted, nextCols) : adjusted;
}

/* ================================================================== */
/*  Utilities                                                          */
/* ================================================================== */

/**
 * Find a layout item by ID.
 */
export function findItem(
  layout: GridLayoutItem[],
  id: string
): GridLayoutItem | undefined {
  return layout.find((item) => item.i === id);
}

/**
 * Move an item to a new position in the layout array.
 */
export function moveItem(
  layout: GridLayoutItem[],
  id: string,
  newX: number,
  newY: number,
  newW?: number,
  newH?: number
): GridLayoutItem[] {
  return layout.map((item) =>
    item.i === id
      ? { ...item, x: newX, y: newY, ...(newW !== undefined ? { w: newW } : {}), ...(newH !== undefined ? { h: newH } : {}) }
      : item
  );
}
