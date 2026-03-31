import React, { useCallback } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes conflicting Tailwind utilities
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function useMergeRefs<T = any>(
    ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>
): React.RefCallback<T> {
    return useCallback(
        (node) => {
            refs.forEach((ref) => {
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref != null) {
                    (ref as React.MutableRefObject<T | null>).current = node;
                }
            });
        },
        [refs]
    );
}
