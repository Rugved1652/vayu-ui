// resizablepane.tsx
// Composition: context provider + state management + registration

"use client";

import { clsx } from "clsx";
import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import type { Direction, ResizablePaneProps } from "./types";

// Context
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

export function useResizablePane() {
    const ctx = useContext(ResizableContext);
    if (!ctx) throw new Error("ResizablePane.* must be used within <ResizablePane>");
    return ctx;
}

// Root
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

                // Clamp Before Panel (nb) and adjust After Panel (na)
                if (nb < cb.min) {
                    const diff = cb.min - nb;
                    nb += diff;
                    na -= diff;
                } else if (nb > cb.max) {
                    const diff = nb - cb.max;
                    nb -= diff;
                    na += diff;
                }

                // Clamp After Panel (na) and adjust Before Panel (nb)
                if (na < ca.min) {
                    const diff = ca.min - na;
                    na += diff;
                    nb -= diff;
                } else if (na > ca.max) {
                    const diff = na - ca.max;
                    na -= diff;
                    nb += diff;
                }

                // Final Safety Clamp
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

export default ResizablePaneRoot;
