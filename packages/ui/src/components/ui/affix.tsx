"use client";

import { cn } from "./utils";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

type AffixPosition = "top" | "bottom";

interface AffixProps extends HTMLAttributes<HTMLDivElement> {
    offset?: number;
    position?: AffixPosition;
    target?: HTMLElement | null;
    zIndex?: number;
    onAffixed?: (affixed: boolean) => void;
    children: React.ReactNode;
}

// ============================================================================
// Helpers
// ============================================================================

const mergeRefs = <T extends HTMLElement>(
    ...refs: React.Ref<T>[]
): React.RefCallback<T> => {
    return (node) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                (ref as React.MutableRefObject<T | null>).current = node;
            }
        });
    };
};

// ============================================================================
// Affix
// ============================================================================

const Affix = forwardRef<HTMLDivElement, AffixProps>(
    (
        {
            offset = 0,
            position = "top",
            target = null,
            zIndex = 100,
            onAffixed,
            className,
            style,
            children,
            ...props
        },
        ref
    ) => {
        const [isAffixed, setIsAffixed] = useState(false);
        const [placeholderHeight, setPlaceholderHeight] = useState(0);
        const [affixStyle, setAffixStyle] = useState<React.CSSProperties>({});

        const innerRef = useRef<HTMLDivElement>(null);
        const placeholderRef = useRef<HTMLDivElement>(null);
        
        // Performance: Track previous state to avoid unnecessary callback triggers
        const prevAffixedRef = useRef(false);
        
        // Performance: Refs for animation frame to prevent scroll jank
        const frameId = useRef<number | null>(null);
        const isTicking = useRef(false);

        const updateAffixed = useCallback(
            (next: boolean) => {
                if (prevAffixedRef.current !== next) {
                    onAffixed?.(next);
                    prevAffixedRef.current = next;
                }
                setIsAffixed(next);
            },
            [onAffixed]
        );

        const measure = useCallback(() => {
            const el = innerRef.current;
            const placeholder = placeholderRef.current;
            if (!el || !placeholder) return;

            const elHeight = el.offsetHeight;
            const rect = placeholder.getBoundingClientRect();
            const isContainerMode = target instanceof HTMLElement;

            // --- Mode 1: Custom Container (Absolute) ---
            if (isContainerMode) {
                const containerRect = target.getBoundingClientRect();
                const scrollTop = target.scrollTop;

                if (position === "top") {
                    const shouldAffix = rect.top - containerRect.top <= offset;

                    if (shouldAffix) {
                        setPlaceholderHeight(elHeight);
                        setAffixStyle({
                            position: "absolute",
                            top: scrollTop + offset,
                            left: rect.left - containerRect.left,
                            width: rect.width,
                            zIndex,
                        });
                        updateAffixed(true);
                    } else {
                        setPlaceholderHeight(0);
                        setAffixStyle({});
                        updateAffixed(false);
                    }
                } else {
                    const shouldAffix = rect.bottom - containerRect.bottom >= -offset;

                    if (shouldAffix) {
                        setPlaceholderHeight(elHeight);
                        const containerVisibleBottom = target.clientHeight;
                        
                        setAffixStyle({
                            position: "absolute",
                            top: scrollTop + (containerVisibleBottom - elHeight) - offset,
                            left: rect.left - containerRect.left,
                            width: rect.width,
                            zIndex,
                        });
                        updateAffixed(true);
                    } else {
                        setPlaceholderHeight(0);
                        setAffixStyle({});
                        updateAffixed(false);
                    }
                }
            } 
            // --- Mode 2: Window (Fixed) ---
            else {
                const containerTop = 0;
                const containerBottom = window.innerHeight;

                if (position === "top") {
                    const shouldAffix = rect.top - containerTop <= offset;

                    if (shouldAffix) {
                        setPlaceholderHeight(elHeight);
                        setAffixStyle({
                            position: "fixed",
                            top: containerTop + offset,
                            left: rect.left,
                            width: rect.width,
                            zIndex,
                        });
                        updateAffixed(true);
                    } else {
                        setPlaceholderHeight(0);
                        setAffixStyle({});
                        updateAffixed(false);
                    }
                } else {
                    const shouldAffix = rect.bottom - containerBottom >= -offset;

                    if (shouldAffix) {
                        setPlaceholderHeight(elHeight);
                        setAffixStyle({
                            position: "fixed",
                            bottom: offset,
                            left: rect.left,
                            width: rect.width,
                            zIndex,
                        });
                        updateAffixed(true);
                    } else {
                        setPlaceholderHeight(0);
                        setAffixStyle({});
                        updateAffixed(false);
                    }
                }
            }
        }, [offset, position, target, zIndex, updateAffixed]);

        // Performance: Throttle measure calls to Animation Frames
        const handleScroll = useCallback(() => {
            if (!isTicking.current) {
                frameId.current = requestAnimationFrame(() => {
                    measure();
                    isTicking.current = false;
                });
                isTicking.current = true;
            }
        }, [measure]);

        // Initial Measurement
        useLayoutEffect(() => {
            measure();
        }, [measure]);

        // Event Listeners
        useEffect(() => {
            const scrollTarget = target || window;

            // Passive: true improves scroll performance by telling browser we won't preventDefault
            scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
            window.addEventListener("resize", measure, { passive: true });

            return () => {
                // Cleanup: Cancel any pending animation frame
                if (frameId.current) {
                    cancelAnimationFrame(frameId.current);
                }
                scrollTarget.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", measure);
            };
        }, [measure, handleScroll, target]);

        return (
            <>
                <div
                    ref={placeholderRef}
                    aria-hidden="true"
                    style={{ height: isAffixed ? placeholderHeight : undefined }}
                />

                <div
                    ref={mergeRefs(ref, innerRef)}
                    className={cn(
                        "transition-shadow transition-medium",
                        isAffixed && "shadow-elevated",
                        className
                    )}
                    style={{ ...affixStyle, ...style }}
                    data-affixed={isAffixed || undefined}
                    {...props}
                >
                    {children}
                </div>
            </>
        );
    }
);

Affix.displayName = "Affix";

export { Affix };
export type { AffixPosition, AffixProps };