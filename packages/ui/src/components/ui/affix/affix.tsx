// affix.tsx
// Composition: UI + logic

"use client";

import { cn } from "../utils";
import React, { forwardRef, useRef } from "react";
import type { AffixProps } from "./types";
import { useAffixMeasure, useAffixScroll } from "./hooks";

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
        const innerRef = useRef<HTMLDivElement>(null);
        const placeholderRef = useRef<HTMLDivElement>(null);

        const { isAffixed, placeholderHeight, affixStyle, measure } = useAffixMeasure(
            innerRef,
            placeholderRef,
            offset,
            position,
            target,
            zIndex,
            onAffixed
        );

        useAffixScroll(measure, target);

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

export default Affix;
