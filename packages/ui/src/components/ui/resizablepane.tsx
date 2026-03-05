"use client";

import { clsx } from "clsx";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

type Direction = "horizontal" | "vertical";

interface ResizablePaneProps extends HTMLAttributes<HTMLDivElement> {
    /** Layout direction. */
    direction?: Direction;
    children: React.ReactNode;
}

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
    /** Initial size as a percentage (0–100). Panels should sum to ~100. */
    defaultSize?: number;
    /** Minimum size percentage. */
    minSize?: number;
    /** Maximum size percentage. */
    maxSize?: number;
    children: React.ReactNode;
}

interface HandleProps extends HTMLAttributes<HTMLDivElement> {
    /** Keyboard step size in percent. */
    step?: number;
}

// ============================================================================
// Context
// ============================================================================

interface Ctx {
    direction: Direction;
    sizes: number[];
    registerPanel: (
        id: string,
        defaultSize: number,
        min: number,
        max: number
    ) => number;
    registerHandle: (id: string) => number;
    resize: (handleIndex: number, delta: number) => void;
    getConstraints: (panelIndex: number) => { min: number; max: number };
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const ResizableContext = createContext<Ctx | null>(null);

function useResizablePane() {
    const ctx = useContext(ResizableContext);
    if (!ctx)
        throw new Error(
            "ResizablePane.* must be used within <ResizablePane>"
        );
    return ctx;
}

// ============================================================================
// Root
// ============================================================================

const ResizablePaneRoot = forwardRef<HTMLDivElement, ResizablePaneProps>(
    ({ direction = "horizontal", children, className, ...props }, ref) => {
        const [sizes, setSizes] = useState<number[]>([]);

        const containerRef = useRef<HTMLDivElement>(null);
        const panelReg = useRef<
            Map<string, { order: number; min: number; max: number }>
        >(new Map());
        const handleReg = useRef<Map<string, number>>(new Map());
        const panelCounter = useRef(0);
        const handleCounter = useRef(0);

        const registerPanel = useCallback(
            (
                id: string,
                defaultSize: number,
                min: number,
                max: number
            ) => {
                const existing = panelReg.current.get(id);
                if (existing) return existing.order;

                const order = panelCounter.current++;
                panelReg.current.set(id, { order, min, max });
                setSizes((prev) => {
                    const next = [...prev];
                    next[order] = defaultSize;
                    return next;
                });
                return order;
            },
            []
        );

        const registerHandle = useCallback((id: string) => {
            const existing = handleReg.current.get(id);
            if (existing !== undefined) return existing;
            const order = handleCounter.current++;
            handleReg.current.set(id, order);
            return order;
        }, []);

        const getConstraints = useCallback(
            (panelIndex: number) => {
                for (const [, data] of panelReg.current) {
                    if (data.order === panelIndex)
                        return { min: data.min, max: data.max };
                }
                return { min: 0, max: 100 };
            },
            []
        );

        const resize = useCallback(
            (handleIndex: number, delta: number) => {
                setSizes((prev) => {
                    const next = [...prev];
                    const bi = handleIndex;
                    const ai = handleIndex + 1;
                    if (bi >= next.length || ai >= next.length) return prev;

                    let nb = next[bi] + delta;
                    let na = next[ai] - delta;

                    const cb = getConstraints(bi);
                    const ca = getConstraints(ai);

                    // Clamp before-panel
                    if (nb < cb.min) {
                        na += cb.min - nb;
                        nb = cb.min;
                    }
                    if (nb > cb.max) {
                        na -= nb - cb.max;
                        nb = cb.max;
                    }
                    // Clamp after-panel
                    if (na < ca.min) {
                        nb -= ca.min - na;
                        na = ca.min;
                    }
                    if (na > ca.max) {
                        nb += na - ca.max;
                        na = ca.max;
                    }

                    // Final safety clamp
                    nb = Math.max(cb.min, Math.min(cb.max, nb));
                    na = Math.max(ca.min, Math.min(ca.max, na));

                    next[bi] = nb;
                    next[ai] = na;
                    return next;
                });
            },
            [getConstraints]
        );

        const ctx = useMemo<Ctx>(
            () => ({
                direction,
                sizes,
                registerPanel,
                registerHandle,
                resize,
                getConstraints,
                containerRef,
            }),
            [
                direction,
                sizes,
                registerPanel,
                registerHandle,
                resize,
                getConstraints,
            ]
        );

        return (
            <ResizableContext.Provider value={ctx}>
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
                    className={clsx(
                        "flex w-full h-full",
                        direction === "vertical"
                            ? "flex-col"
                            : "flex-row",
                        className
                    )}
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
    (
        {
            defaultSize = 50,
            minSize = 10,
            maxSize = 90,
            children,
            className,
            style,
            ...props
        },
        ref
    ) => {
        const panelId = useId();
        const { registerPanel, sizes, direction } = useResizablePane();
        const indexRef = useRef<number | null>(null);

        // Idempotent registration (safe with StrictMode — useId is stable)
        if (indexRef.current === null) {
            indexRef.current = registerPanel(
                panelId,
                defaultSize,
                minSize,
                maxSize
            );
        }

        const size = sizes[indexRef.current] ?? defaultSize;

        return (
            <div
                ref={ref}
                style={{
                    ...style,
                    [direction === "horizontal"
                        ? "width"
                        : "height"]: `${size}%`,
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
// Handle
// ============================================================================

const ResizablePaneHandle = forwardRef<HTMLDivElement, HandleProps>(
    (
        {
            step = 2,
            "aria-label": ariaLabel,
            className,
            ...props
        },
        ref
    ) => {
        const handleId = useId();
        const {
            direction,
            registerHandle,
            resize,
            sizes,
            getConstraints,
            containerRef,
        } = useResizablePane();

        const indexRef = useRef<number | null>(null);
        if (indexRef.current === null) {
            indexRef.current = registerHandle(handleId);
        }
        const handleIndex = indexRef.current;

        const isHorizontal = direction === "horizontal";
        const panelSize = sizes[handleIndex] ?? 50;
        const constraints = getConstraints(handleIndex);

        // ---- Mouse / touch drag ----
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

                const onMouseMove = (e: MouseEvent) =>
                    move(e.clientX, e.clientY);
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
                document.addEventListener("touchmove", onTouchMove, {
                    passive: false,
                });
                document.addEventListener("touchend", cleanup);
                document.body.style.cursor = isHorizontal
                    ? "col-resize"
                    : "row-resize";
                document.body.style.userSelect = "none";
            },
            [isHorizontal, resize, handleIndex, containerRef]
        );

        const onMouseDown = useCallback(
            (e: React.MouseEvent) => {
                e.preventDefault();
                startDrag(e.clientX, e.clientY);
            },
            [startDrag]
        );

        const onTouchStart = useCallback(
            (e: React.TouchEvent) =>
                startDrag(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                ),
            [startDrag]
        );

        // ---- Keyboard ----
        const onKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
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
            },
            [resize, handleIndex, panelSize, constraints, step]
        );

        return (
            <div
                ref={ref}
                role="separator"
                aria-orientation={isHorizontal ? "vertical" : "horizontal"}
                aria-valuenow={Math.round(panelSize)}
                aria-valuemin={constraints.min}
                aria-valuemax={constraints.max}
                aria-label={
                    ariaLabel ??
                    `Resize ${isHorizontal ? "columns" : "rows"}`
                }
                tabIndex={0}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onKeyDown={onKeyDown}
                className={clsx(
                    "shrink-0 relative flex items-center justify-center transition-colors select-none",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset",
                    "bg-ground-100 dark:bg-ground-800/60",
                    isHorizontal
                        ? "w-2 cursor-col-resize hover:bg-primary-100 dark:hover:bg-primary-900/30 active:bg-primary-200 dark:active:bg-primary-800/40"
                        : "h-2 cursor-row-resize hover:bg-primary-100 dark:hover:bg-primary-900/30 active:bg-primary-200 dark:active:bg-primary-800/40",
                    className
                )}
                {...props}
            >
                {/* Grip dots */}
                <div
                    className={clsx(
                        "flex gap-0.5",
                        isHorizontal ? "flex-col" : "flex-row"
                    )}
                    aria-hidden="true"
                >
                    <div className="w-1 h-1 rounded-full bg-ground-400 dark:bg-ground-600" />
                    <div className="w-1 h-1 rounded-full bg-ground-400 dark:bg-ground-600" />
                    <div className="w-1 h-1 rounded-full bg-ground-400 dark:bg-ground-600" />
                </div>
            </div>
        );
    }
);

ResizablePaneHandle.displayName = "ResizablePane.Handle";

// ============================================================================
// Compound export
// ============================================================================

const ResizablePane = Object.assign(ResizablePaneRoot, {
    Panel: ResizablePanePanel,
    Handle: ResizablePaneHandle,
});

export { ResizablePane, useResizablePane };
export type { Direction, HandleProps, PanelProps, ResizablePaneProps };
