"use client";

import { clsx } from "clsx";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
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
    /** Accessible label for the affix region when affixed. */
    label?: string;
    /** Callback fired when affixed state changes. */
    onAffixed?: (affixed: boolean) => void;
    children: React.ReactNode;
}

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
            label = "Fixed content",
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

        // Generate a unique ID for accessibility
        const affixId = useRef<string>(
            `affix-${Math.random().toString(36).slice(2, 9)}`
        );

        // Sync affixed state with callback
        const updateAffixed = useCallback(
            (next: boolean) => {
                setIsAffixed((prev) => {
                    if (prev !== next) onAffixed?.(next);
                    return next;
                });
            },
            [onAffixed]
        );

        const measure = useCallback(() => {
            const el = innerRef.current;
            const placeholder = placeholderRef.current;
            if (!el || !placeholder) return;

            const scrollContainer = target || window;
            const scrollTop =
                target instanceof HTMLElement
                    ? target.scrollTop
                    : window.scrollY;
            const containerTop =
                target instanceof HTMLElement
                    ? target.getBoundingClientRect().top
                    : 0;
            const containerBottom =
                target instanceof HTMLElement
                    ? target.getBoundingClientRect().bottom
                    : window.innerHeight;

            const rect = placeholder.getBoundingClientRect();
            const elHeight = el.offsetHeight;

            if (position === "top") {
                // Affix when the placeholder scrolls above (offset + containerTop)
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
                // position === "bottom"
                const shouldAffix =
                    rect.bottom - containerBottom >= -offset;

                if (shouldAffix) {
                    setPlaceholderHeight(elHeight);
                    setAffixStyle({
                        position: "fixed",
                        bottom: window.innerHeight - containerBottom + offset,
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
        }, [offset, position, target, zIndex, updateAffixed]);

        // Attach scroll + resize listeners
        useEffect(() => {
            const scrollTarget = target || window;

            // Initial measurement
            measure();

            scrollTarget.addEventListener("scroll", measure, {
                passive: true,
            });
            window.addEventListener("resize", measure, { passive: true });

            return () => {
                scrollTarget.removeEventListener("scroll", measure);
                window.removeEventListener("resize", measure);
            };
        }, [measure, target]);

        return (
            <>
                {/* Placeholder keeps layout space when element is affixed */}
                <div
                    ref={placeholderRef}
                    aria-hidden="true"
                    style={{
                        height: isAffixed ? placeholderHeight : undefined,
                    }}
                />

                <div
                    ref={ref ?? innerRef}
                    id={affixId.current}
                    className={clsx(
                        "transition-shadow duration-medium",
                        isAffixed && "shadow-outer",
                        className
                    )}
                    style={{ ...affixStyle, ...style }}
                    data-affixed={isAffixed || undefined}
                    role="region"
                    aria-label={isAffixed ? label : undefined}
                    aria-live="polite"
                    {...props}
                >
                    {children}
                </div>
            </>
        );
    }
);

Affix.displayName = "Affix";

// ============================================================================
// Exports
// ============================================================================

export { Affix };
export type { AffixPosition, AffixProps };