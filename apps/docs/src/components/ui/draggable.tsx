"use client";

import { clsx } from "clsx";
import { GripVertical } from "lucide-react";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

type DraggableDirection = "vertical" | "horizontal" | "grid";

interface DraggableItem {
    id: string;
    [key: string]: unknown;
}

interface DraggableListProps<T extends DraggableItem>
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Items array — each must have a unique `id`. */
    items: T[];
    /** Called with the reordered array after a drop. */
    onReorder: (items: T[]) => void;
    /** Layout direction. */
    direction?: DraggableDirection;
    /** Grid columns (only used when `direction="grid"`). */
    columns?: number;
    /** Render each item. */
    children: (
        item: T,
        props: {
            dragHandleProps: DragHandleProps;
            isDragging: boolean;
            isOver: boolean;
        }
    ) => React.ReactNode;
}

interface DragHandleProps {
    role: string;
    tabIndex: number;
    "aria-roledescription": string;
    "aria-describedby": string;
    "aria-pressed": boolean | undefined;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
}

// ============================================================================
// Context
// ============================================================================

interface Ctx {
    draggedId: string | null;
    overId: string | null;
}

const DraggableContext = createContext<Ctx>({ draggedId: null, overId: null });

// ============================================================================
// Helpers (hoisted)
// ============================================================================

function reorder<T>(list: T[], from: number, to: number): T[] {
    const result = [...list];
    const [moved] = result.splice(from, 1);
    result.splice(to, 0, moved);
    return result;
}

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
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);
    const [keyboardGrabbedId, setKeyboardGrabbedId] = useState<string | null>(
        null
    );

    const liveRegionId = useId();
    const instructionId = useId();
    const [liveText, setLiveText] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const dragStartPos = useRef({ x: 0, y: 0 });
    const dragClone = useRef<HTMLDivElement | null>(null);

    const isGrid = direction === "grid";
    const isVertical = direction === "vertical";

    // ── Announce helper ──
    const announce = useCallback((msg: string) => {
        setLiveText("");
        requestAnimationFrame(() => setLiveText(msg));
    }, []);

    // ── Keyboard sort ──
    const handleItemKeyDown = useCallback(
        (itemId: string, e: React.KeyboardEvent) => {
            const idx = items.findIndex((i) => i.id === itemId);
            if (idx === -1) return;

            // Grab / drop
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                if (keyboardGrabbedId === itemId) {
                    setKeyboardGrabbedId(null);
                    announce(
                        `Dropped. Item now at position ${idx + 1} of ${items.length}.`
                    );
                } else {
                    setKeyboardGrabbedId(itemId);
                    announce(
                        `Grabbed. Current position ${idx + 1} of ${items.length}. Use arrow keys to move, Space to drop, Escape to cancel.`
                    );
                }
                return;
            }

            // Cancel
            if (e.key === "Escape" && keyboardGrabbedId === itemId) {
                e.preventDefault();
                setKeyboardGrabbedId(null);
                announce("Reorder cancelled.");
                return;
            }

            if (keyboardGrabbedId !== itemId) return;

            // Compute target index based on direction
            let target = -1;

            if (isGrid) {
                // Grid: all 4 arrow keys
                switch (e.key) {
                    case "ArrowLeft":
                        target = idx > 0 ? idx - 1 : -1;
                        break;
                    case "ArrowRight":
                        target = idx < items.length - 1 ? idx + 1 : -1;
                        break;
                    case "ArrowUp":
                        target = idx - columns >= 0 ? idx - columns : -1;
                        break;
                    case "ArrowDown":
                        target =
                            idx + columns < items.length
                                ? idx + columns
                                : -1;
                        break;
                    default:
                        return;
                }
            } else if (isVertical) {
                if (e.key === "ArrowUp" && idx > 0) target = idx - 1;
                else if (
                    e.key === "ArrowDown" &&
                    idx < items.length - 1
                )
                    target = idx + 1;
                else return;
            } else {
                if (e.key === "ArrowLeft" && idx > 0) target = idx - 1;
                else if (
                    e.key === "ArrowRight" &&
                    idx < items.length - 1
                )
                    target = idx + 1;
                else return;
            }

            if (target >= 0) {
                e.preventDefault();
                onReorder(reorder(items, idx, target));
                announce(
                    `Moved to position ${target + 1} of ${items.length}.`
                );
            }
        },
        [items, onReorder, keyboardGrabbedId, isGrid, isVertical, columns, announce]
    );

    // ── Mouse / touch drag ──
    const handleDragStart = useCallback(
        (itemId: string, clientX: number, clientY: number) => {
            const el = itemRefs.current.get(itemId);
            if (!el) return;

            setDraggedId(itemId);
            setOverId(itemId);
            dragStartPos.current = { x: clientX, y: clientY };

            // Create visual clone
            const rect = el.getBoundingClientRect();
            const clone = el.cloneNode(true) as HTMLDivElement;
            clone.style.position = "fixed";
            clone.style.left = `${rect.left}px`;
            clone.style.top = `${rect.top}px`;
            clone.style.width = `${rect.width}px`;
            clone.style.height = `${rect.height}px`;
            clone.style.zIndex = "9999";
            clone.style.pointerEvents = "none";
            clone.style.opacity = "0.9";
            clone.style.transform = "scale(1.03)";
            clone.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
            clone.style.borderRadius = "8px";
            clone.style.transition =
                "transform 0.15s ease, box-shadow 0.15s ease";
            clone.setAttribute("aria-hidden", "true");
            document.body.appendChild(clone);
            dragClone.current = clone;

            document.body.style.cursor = "grabbing";
            document.body.style.userSelect = "none";
        },
        []
    );

    const handleDragMove = useCallback(
        (clientX: number, clientY: number) => {
            if (!draggedId || !dragClone.current) return;

            // Move clone
            const dx = clientX - dragStartPos.current.x;
            const dy = clientY - dragStartPos.current.y;
            const el = itemRefs.current.get(draggedId);
            if (el) {
                const rect = el.getBoundingClientRect();
                dragClone.current.style.left = `${rect.left + dx}px`;
                dragClone.current.style.top = `${rect.top + dy}px`;
            }

            // Find closest item by distance to center (works for all layouts)
            let closest: { id: string; dist: number } | null = null;

            for (const [id, itemEl] of itemRefs.current) {
                if (id === draggedId) continue;
                const r = itemEl.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;

                // Check if cursor is within the item bounds (with tolerance)
                const inX =
                    clientX > r.left - r.width * 0.1 &&
                    clientX < r.right + r.width * 0.1;
                const inY =
                    clientY > r.top - r.height * 0.1 &&
                    clientY < r.bottom + r.height * 0.1;

                if (inX && inY) {
                    const dist = Math.hypot(clientX - cx, clientY - cy);
                    if (!closest || dist < closest.dist) {
                        closest = { id, dist };
                    }
                }
            }

            if (closest) setOverId(closest.id);
        },
        [draggedId]
    );

    const handleDragEnd = useCallback(() => {
        if (draggedId && overId && draggedId !== overId) {
            const from = items.findIndex((i) => i.id === draggedId);
            const to = items.findIndex((i) => i.id === overId);
            if (from !== -1 && to !== -1) {
                onReorder(reorder(items, from, to));
            }
        }

        // Cleanup clone
        if (dragClone.current) {
            dragClone.current.remove();
            dragClone.current = null;
        }

        setDraggedId(null);
        setOverId(null);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    }, [draggedId, overId, items, onReorder]);

    // Global move / end listeners
    useEffect(() => {
        if (!draggedId) return;

        const onMouseMove = (e: MouseEvent) =>
            handleDragMove(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onEnd = () => handleDragEnd();

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onEnd);
        document.addEventListener("touchmove", onTouchMove, {
            passive: false,
        });
        document.addEventListener("touchend", onEnd);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onEnd);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onEnd);
        };
    }, [draggedId, handleDragMove, handleDragEnd]);

    // ── Compute displaced positions (2D — works for grid, list, horizontal) ──
    const displaced = useMemo(() => {
        if (!draggedId || !overId || draggedId === overId)
            return new Map<string, { x: number; y: number }>();

        const fromIdx = items.findIndex((i) => i.id === draggedId);
        const toIdx = items.findIndex((i) => i.id === overId);
        if (fromIdx === -1 || toIdx === -1)
            return new Map<string, { x: number; y: number }>();

        // Capture current positions of all items
        const rects = new Map<string, DOMRect>();
        for (const item of items) {
            const el = itemRefs.current.get(item.id);
            if (el) rects.set(item.id, el.getBoundingClientRect());
        }

        // Simulate the reorder, compute where each item WOULD be
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
    }, [draggedId, overId, items]);

    // Context
    const ctx = useMemo<Ctx>(
        () => ({ draggedId, overId }),
        [draggedId, overId]
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
                        containerRef as React.MutableRefObject<HTMLDivElement | null>
                    ).current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref)
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

                    const dragHandleProps: DragHandleProps = {
                        role: "option",
                        tabIndex: 0,
                        "aria-roledescription": "sortable item",
                        "aria-describedby": instructionId,
                        "aria-pressed":
                            keyboardGrabbedId === item.id
                                ? true
                                : undefined,
                        onKeyDown: (e) =>
                            handleItemKeyDown(item.id, e),
                        onMouseDown: (e) => {
                            e.preventDefault();
                            handleDragStart(
                                item.id,
                                e.clientX,
                                e.clientY
                            );
                        },
                        onTouchStart: (e) =>
                            handleDragStart(
                                item.id,
                                e.touches[0].clientX,
                                e.touches[0].clientY
                            ),
                    };

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
                                dragHandleProps,
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

// ============================================================================
// DragHandle (optional convenience component)
// ============================================================================

const DragHandle = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement> & {
        handleProps: DragHandleProps;
    }
>(({ handleProps, className, children, ...props }, ref) => {
    const { onMouseDown, onTouchStart, onKeyDown, ...ariaProps } =
        handleProps;

    return (
        <button
            ref={ref}
            type="button"
            {...ariaProps}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onKeyDown={onKeyDown}
            className={clsx(
                "inline-flex items-center justify-center p-1 rounded-md cursor-grab active:cursor-grabbing",
                "text-ground-400 dark:text-ground-500 hover:text-ground-600 dark:hover:text-ground-400",
                "hover:bg-ground-100 dark:hover:bg-ground-800",
                "focus:outline-none focus:ring-2 focus:ring-primary-500",
                "transition-colors",
                className
            )}
            {...props}
        >
            {children ?? (
                <GripVertical
                    className="w-4 h-4"
                    aria-hidden="true"
                />
            )}
        </button>
    );
});

DragHandle.displayName = "DragHandle";

// ============================================================================
// Exports
// ============================================================================

export { DraggableList, DragHandle };
export type {
    DraggableDirection,
    DraggableItem,
    DraggableListProps,
    DragHandleProps,
};
