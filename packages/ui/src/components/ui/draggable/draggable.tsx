// draggable.tsx
// Composition: UI + wiring

"use client";

import { clsx } from "clsx";
import React, {
    forwardRef,
    useCallback,
    useId,
    useMemo,
} from "react";
import { DraggableContext, reorder } from "./types";
import type { Ctx, DraggableItem, DraggableListProps, DragHandleProps } from "./types";
import { useAnnounce, useDragOperations, useKeyboardSort } from "./hooks";
import { DragHandle } from "./DragHandle";

// ============================================================================
// DraggableList
// ============================================================================

function DraggableListInner<T extends DraggableItem>(
    {
        items,
        onReorder,
        direction = "vertical",
        columns = 3,
        children,
        className,
        "aria-label": ariaLabel,
        ...props
    }: DraggableListProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const { liveText, announce } = useAnnounce();
    const { draggedId, overId, itemRefs, handleDragStart } =
        useDragOperations(items, onReorder);
    const { keyboardGrabbedId, handleItemKeyDown } = useKeyboardSort(
        items,
        onReorder,
        direction,
        columns,
        announce
    );

    const liveRegionId = useId();
    const instructionId = useId();

    const isGrid = direction === "grid";
    const isVertical = direction === "vertical";

    // ── Compute displaced positions (2D — works for grid, list, horizontal) ──
    const displaced = useMemo(() => {
        if (!draggedId || !overId || draggedId === overId)
            return new Map<string, { x: number; y: number }>();

        const fromIdx = items.findIndex((i) => i.id === draggedId);
        const toIdx = items.findIndex((i) => i.id === overId);
        if (fromIdx === -1 || toIdx === -1)
            return new Map<string, { x: number; y: number }>();

        const rects = new Map<string, DOMRect>();
        for (const item of items) {
            const el = itemRefs.current.get(item.id);
            if (el) rects.set(item.id, el.getBoundingClientRect());
        }

        const simulated = reorder(items, fromIdx, toIdx);
        const map = new Map<string, { x: number; y: number }>();

        for (let i = 0; i < simulated.length; i++) {
            const item = simulated[i];
            if (item.id === draggedId) continue;

            const currentRect = rects.get(item.id);
            const targetRect = rects.get(items[i].id);

            if (currentRect && targetRect) {
                const dx = targetRect.left - currentRect.left;
                const dy = targetRect.top - currentRect.top;
                if (dx !== 0 || dy !== 0) {
                    map.set(item.id, { x: dx, y: dy });
                }
            }
        }

        return map;
    }, [draggedId, overId, items, itemRefs]);

    // Context
    const ctx = useMemo<Ctx>(
        () => ({ draggedId, overId }),
        [draggedId, overId]
    );

    // ── Build drag handle props ──
    const buildDragHandleProps = useCallback(
        (itemId: string): DragHandleProps => ({
            role: "option",
            tabIndex: 0,
            "aria-roledescription": "sortable item",
            "aria-describedby": instructionId,
            "aria-pressed":
                keyboardGrabbedId === itemId ? true : undefined,
            onKeyDown: (e) => handleItemKeyDown(itemId, e),
            onMouseDown: (e) => {
                e.preventDefault();
                handleDragStart(itemId, e.clientX, e.clientY);
            },
            onTouchStart: (e) =>
                handleDragStart(
                    itemId,
                    e.touches[0].clientX,
                    e.touches[0].clientY
                ),
        }),
        [instructionId, keyboardGrabbedId, handleItemKeyDown, handleDragStart]
    );

    return (
        <DraggableContext.Provider value={ctx}>
            {/* Screen reader instructions */}
            <div id={instructionId} className="sr-only">
                Press Space to grab an item. Use arrow keys to move it.
                Press Space again to drop, or Escape to cancel.
            </div>

            {/* Live region */}
            <div
                id={liveRegionId}
                role="status"
                aria-live="assertive"
                aria-atomic="true"
                className="sr-only"
            >
                {liveText}
            </div>

            <div
                ref={(node) => {
                    (
                        ref as React.MutableRefObject<HTMLDivElement | null>
                    ).current = node;
                }}
                role="listbox"
                aria-label={ariaLabel ?? "Sortable list"}
                aria-orientation={isGrid ? undefined : direction}
                className={clsx(
                    isGrid
                        ? "grid gap-2"
                        : clsx(
                            "flex gap-2",
                            isVertical
                                ? "flex-col"
                                : "flex-row flex-wrap"
                        ),
                    className
                )}
                style={
                    isGrid
                        ? {
                            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                        }
                        : undefined
                }
                {...props}
            >
                {items.map((item) => {
                    const isDragging = draggedId === item.id;
                    const isOver =
                        overId === item.id && draggedId !== item.id;
                    const disp = displaced.get(item.id);

                    return (
                        <div
                            key={item.id}
                            ref={(el) => {
                                if (el)
                                    itemRefs.current.set(item.id, el);
                                else itemRefs.current.delete(item.id);
                            }}
                            style={{
                                transform: isDragging
                                    ? undefined
                                    : disp
                                        ? `translate(${disp.x}px, ${disp.y}px)`
                                        : "translate(0, 0)",
                                transition: isDragging
                                    ? "none"
                                    : "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
                                opacity: isDragging ? 0.4 : 1,
                            }}
                            className={clsx(
                                isDragging && "pointer-events-none",
                                isOver &&
                                "ring-2 ring-primary-500 ring-offset-2 rounded-lg",
                                keyboardGrabbedId === item.id &&
                                "ring-2 ring-primary-500 ring-offset-2 rounded-lg shadow-lg"
                            )}
                        >
                            {children(item, {
                                dragHandleProps: buildDragHandleProps(item.id),
                                isDragging,
                                isOver,
                            })}
                        </div>
                    );
                })}
            </div>
        </DraggableContext.Provider>
    );
}

// forwardRef for generics
const DraggableList = forwardRef(DraggableListInner) as <
    T extends DraggableItem,
>(
    props: DraggableListProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export { DraggableList, DragHandle };
