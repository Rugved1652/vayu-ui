// hooks.ts
// Logic

import { useMemo, useCallback } from "react";
import type { KeyboardEvent } from "react";
import type { AvatarGroupLayout } from "./types";

const SPACING_MAP = {
    tight: -12,
    normal: -8,
    loose: -4,
} as const;

export function useSpacing(
    spacing: "tight" | "normal" | "loose" | number
): number {
    return useMemo(() => {
        if (typeof spacing === "number") return spacing;
        return SPACING_MAP[spacing];
    }, [spacing]);
}

export function useKeyboardNavigation() {
    return useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            const focusableElements = Array.from(
                event.currentTarget.querySelectorAll('[role="button"]')
            );
            const currentIndex = focusableElements.indexOf(
                event.target as HTMLElement
            );
            if (currentIndex === -1) return;

            let newIndex = currentIndex;
            if (event.key === "ArrowRight") {
                newIndex = (currentIndex + 1) % focusableElements.length;
            } else if (event.key === "ArrowLeft") {
                newIndex =
                    (currentIndex - 1 + focusableElements.length) %
                    focusableElements.length;
            }
            (focusableElements[newIndex] as HTMLElement).focus();
        }
    }, []);
}
