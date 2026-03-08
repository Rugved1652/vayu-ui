"use client";

import { clsx } from "clsx";
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
    /** Distance from the viewport edge at which the element becomes affixed. */
    offset?: number;
    /** Pin to the top or bottom of the viewport. */
    position?: AffixPosition;
    /** Custom scroll container — defaults to `window`. */
    target?: HTMLElement | null;
    /** Z-index when affixed. */
    zIndex?: number;
    /** Callback fired when affixed state changes. */
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
            ...props // Role, aria-label, etc. are passed here by the consumer
        },
        ref
    ) => {
        const [isAffixed, setIsAffixed] = useState(false);
        const [placeholderHeight, setPlaceholderHeight] = useState(0);
        const [affixStyle, setAffixStyle] = useState<React.CSSProperties>({});

        const innerRef = useRef<HTMLDivElement>(null);
        const placeholderRef = useRef<HTMLDivElement>(null);
        const prevAffixedRef = useRef(false);

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

            // --- Mode 1: Custom Container (Absolute Positioning) ---
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
                    // position === "bottom"
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
            // --- Mode 2: Window (Fixed Positioning) ---
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

        useLayoutEffect(() => {
            measure();
        }, [measure]);

        useEffect(() => {
            const scrollTarget = target || window;

            scrollTarget.addEventListener("scroll", measure, { passive: true });
            window.addEventListener("resize", measure, { passive: true });

            return () => {
                scrollTarget.removeEventListener("scroll", measure);
                window.removeEventListener("resize", measure);
            };
        }, [measure, target]);

        return (
            <>
                <div
                    ref={placeholderRef}
                    aria-hidden="true"
                    style={{ height: isAffixed ? placeholderHeight : undefined }}
                />

                <div
                    ref={mergeRefs(ref, innerRef)}
                    className={clsx(
                        "transition-shadow duration-medium",
                        isAffixed && "shadow-outer",
                        className
                    )}
                    style={{ ...affixStyle, ...style }}
                    data-affixed={isAffixed || undefined}
                    {...props} // Accessibility attributes are now passed in here
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