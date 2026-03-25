"use client";

import { clsx } from "clsx";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

type Direction = "horizontal" | "vertical";

interface ResizablePaneProps extends HTMLAttributes<HTMLDivElement> {
    direction?: Direction;
    children: React.ReactNode;
}

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    children: React.ReactNode;
}

interface HandleProps extends HTMLAttributes<HTMLDivElement> {
    step?: number;
}

// ============================================================================
// Context
// ============================================================================

interface Ctx {
    direction: Direction;
    sizes: number[];
    panelCount: number;
    registerPanel: (id: string, defaultSize: number, min: number, max: number) => number;
    registerHandle: (id: string) => number;
    resize: (handleIndex: number, delta: number) => void;
    getConstraints: (panelIndex: number) => { min: number; max: number };
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const ResizableContext = createContext<Ctx | null>(null);

function useResizablePane() {
    const ctx = useContext(ResizableContext);
    if (!ctx) throw new Error("ResizablePane.* must be used within <ResizablePane>");
    return ctx;
}

// ============================================================================
// Root
// ============================================================================

const ResizablePaneRoot = forwardRef<HTMLDivElement, ResizablePaneProps>(
    ({ direction = "horizontal", children, className, ...props }, ref) => {
        const [sizes, setSizes] = useState<number[]>([]);
        const [panelCount, setPanelCount] = useState(0);

        const containerRef = useRef<HTMLDivElement>(null);
        const panelReg = useRef<Map<string, { order: number; min: number; max: number }>>(new Map());
        const handleReg = useRef<Map<string, number>>(new Map());
        const panelCounter = useRef(0);
        const handleCounter = useRef(0);

        const registerPanel = useCallback((id: string, defaultSize: number, min: number, max: number) => {
            const existing = panelReg.current.get(id);
            if (existing) return existing.order;

            const order = panelCounter.current++;
            panelReg.current.set(id, { order, min, max });
            
            setSizes((prev) => {
                const next = [...prev];
                next[order] = defaultSize;
                return next;
            });
            setPanelCount(order + 1);
            return order;
        }, []);

        const registerHandle = useCallback((id: string) => {
            const existing = handleReg.current.get(id);
            if (existing !== undefined) return existing;
            const order = handleCounter.current++;
            handleReg.current.set(id, order);
            return order;
        }, []);

        const getConstraints = useCallback((panelIndex: number) => {
            for (const [, data] of panelReg.current) {
                if (data.order === panelIndex) return { min: data.min, max: data.max };
            }
            return { min: 0, max: 100 };
        }, []);

        const resize = useCallback((handleIndex: number, delta: number) => {
            setSizes((prev) => {
                const next = [...prev];
                const bi = handleIndex;
                const ai = handleIndex + 1;

                if (bi >= next.length || ai >= next.length) return prev;

                let nb = next[bi] + delta;
                let na = next[ai] - delta;

                const cb = getConstraints(bi);
                const ca = getConstraints(ai);

                // 1. Clamp Before Panel (nb) and adjust After Panel (na)
                if (nb < cb.min) {
                    const diff = cb.min - nb;
                    nb += diff;
                    na -= diff;
                } else if (nb > cb.max) {
                    const diff = nb - cb.max;
                    nb -= diff;
                    na += diff;
                }

                // 2. Clamp After Panel (na) and adjust Before Panel (nb)
                if (na < ca.min) {
                    const diff = ca.min - na;
                    na += diff;
                    nb -= diff;
                } else if (na > ca.max) {
                    const diff = na - ca.max;
                    na -= diff;
                    nb += diff;
                }

                // 3. Final Safety Clamp
                nb = Math.max(cb.min, Math.min(cb.max, nb));
                na = Math.max(ca.min, Math.min(ca.max, na));

                next[bi] = nb;
                next[ai] = na;
                return next;
            });
        }, [getConstraints]);

        const ctx = useMemo<Ctx>(
            () => ({
                direction,
                sizes,
                panelCount,
                registerPanel,
                registerHandle,
                resize,
                getConstraints,
                containerRef,
            }),
            [direction, sizes, panelCount, registerPanel, registerHandle, resize, getConstraints]
        );

        return (
            <ResizableContext.Provider value={ctx}>
                <div
                    ref={(node) => {
                        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        if (typeof ref === "function") ref(node);
                        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    className={clsx("flex w-full h-full overflow-hidden", direction === "vertical" ? "flex-col" : "flex-row", className)}
                    {...props}
                >
                    {children}
                </div>
            </ResizableContext.Provider>
        );
    }
);
ResizablePaneRoot.displayName = "ResizablePane";

// ============================================================================
// Panel
// ============================================================================

const ResizablePanePanel = forwardRef<HTMLDivElement, PanelProps>(
    ({ defaultSize = 50, minSize = 10, maxSize = 90, children, className, style, ...props }, ref) => {
        const panelId = useId();
        const { registerPanel, sizes, direction } = useResizablePane();
        const indexRef = useRef<number | null>(null);

        useLayoutEffect(() => {
            if (indexRef.current === null) {
                indexRef.current = registerPanel(panelId, defaultSize, minSize, maxSize);
            }
        }, [panelId, registerPanel, defaultSize, minSize, maxSize]);

        const index = indexRef.current;
        const size = index !== null && index < sizes.length ? sizes[index] : defaultSize;

        return (
            <div
                ref={ref}
                style={{
                    ...style,
                    [direction === "horizontal" ? "width" : "height"]: `${size}%`,
                    flexShrink: 0,
                    flexGrow: 0,
                }}
                className={clsx("overflow-auto", className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
ResizablePanePanel.displayName = "ResizablePane.Panel";

// ============================================================================
// Handle (WCAG 2.2 AA Compliant)
// ============================================================================

const ResizablePaneHandle = forwardRef<HTMLDivElement, HandleProps>(
    ({ step = 2, "aria-label": ariaLabel, className, ...props }, ref) => {
        const handleId = useId();
        const { direction, registerHandle, resize, sizes, getConstraints, containerRef } = useResizablePane();

        const indexRef = useRef<number | null>(null);
        useLayoutEffect(() => {
            if (indexRef.current === null) {
                indexRef.current = registerHandle(handleId);
            }
        }, [handleId, registerHandle]);

        const handleIndex = indexRef.current ?? 0;
        const isHorizontal = direction === "horizontal";
        const panelSize = sizes[handleIndex] ?? 50;
        const constraints = getConstraints(handleIndex);

        // ---- Mouse / Touch Drag ----
        const startDrag = useCallback(
            (startX: number, startY: number) => {
                const container = containerRef.current;
                if (!container) return;

                const rect = container.getBoundingClientRect();
                const total = isHorizontal ? rect.width : rect.height;
                let lastPos = isHorizontal ? startX : startY;

                const move = (x: number, y: number) => {
                    const pos = isHorizontal ? x : y;
                    const delta = ((pos - lastPos) / total) * 100;
                    resize(handleIndex, delta);
                    lastPos = pos;
                };

                const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
                const onTouchMove = (e: TouchEvent) => {
                    e.preventDefault();
                    move(e.touches[0].clientX, e.touches[0].clientY);
                };

                const cleanup = () => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", cleanup);
                    document.removeEventListener("touchmove", onTouchMove);
                    document.removeEventListener("touchend", cleanup);
                    document.body.style.cursor = "";
                    document.body.style.userSelect = "";
                };

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", cleanup);
                document.addEventListener("touchmove", onTouchMove, { passive: false });
                document.addEventListener("touchend", cleanup);
                document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
                document.body.style.userSelect = "none";
            },
            [isHorizontal, resize, handleIndex, containerRef]
        );

        const onMouseDown = useCallback((e: React.MouseEvent) => {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
        }, [startDrag]);

        const onTouchStart = useCallback((e: React.TouchEvent) => startDrag(e.touches[0].clientX, e.touches[0].clientY), [startDrag]);

        // ---- Keyboard ----
        const onKeyDown = useCallback((e: React.KeyboardEvent) => {
            let delta = 0;
            const big = e.shiftKey ? step * 5 : step;

            switch (e.key) {
                case "ArrowLeft":
                case "ArrowUp":
                    delta = -big;
                    break;
                case "ArrowRight":
                case "ArrowDown":
                    delta = big;
                    break;
                case "Home":
                    delta = -(panelSize - constraints.min);
                    break;
                case "End":
                    delta = constraints.max - panelSize;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            resize(handleIndex, delta);
        }, [resize, handleIndex, panelSize, constraints, step]);

        return (
            <div
                ref={ref}
                role="separator"
                aria-orientation={isHorizontal ? "vertical" : "horizontal"}
                aria-valuenow={Math.round(panelSize)}
                aria-valuemin={constraints.min}
                aria-valuemax={constraints.max}
                aria-label={ariaLabel ?? `Resize ${isHorizontal ? "columns" : "rows"}`}
                tabIndex={0}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onKeyDown={onKeyDown}
                className={clsx(
                    // 1. WCAG 2.5.8 Target Size: Minimum 24x24px hit area
                    "shrink-0 relative flex items-center justify-center select-none",
                    "transition-colors",
                    
                    // Focus Visible (WCAG 2.4.7)
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                    
                    // 2. Layout & Hit Area
                    // We make the handle 24px wide/high to satisfy target size.
                    // Visual styling below makes it look thinner while keeping the hit area large.
                    isHorizontal ? "w-6 cursor-col-resize" : "h-6 cursor-row-resize",
                    
                    // 3. Visual Styling (Background)
                    // We use a subtle background for the hit area, or transparent if you want purely invisible hit area
                    "bg-transparent hover:bg-muted/50 dark:hover:bg-muted/30",
                    
                    className
                )}
                {...props}
            >
                {/* The visual "Grip" - centered inside the 24px hit area */}
                <div
                    className={clsx(
                        "rounded-full bg-brand",
                        isHorizontal
                            ? "w-0.5 h-8"  // Thin vertical line
                            : "h-0.5 w-8"   // Thin horizontal line
                    )}
                    aria-hidden="true"
                />
            </div>
        );
    }
);
ResizablePaneHandle.displayName = "ResizablePane.Handle";

// ============================================================================
// Compound Export
// ============================================================================

const ResizablePane = Object.assign(ResizablePaneRoot, {
    Panel: ResizablePanePanel,
    Handle: ResizablePaneHandle,
});

export { ResizablePane, useResizablePane };
export type { Direction, HandleProps, PanelProps, ResizablePaneProps };