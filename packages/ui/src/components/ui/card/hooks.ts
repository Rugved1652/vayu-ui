// hooks.ts
// Logic

import { KeyboardEvent } from "react";
import { CardProps } from "./types";

/**
 * Keyboard interaction handler for interactive cards.
 * WCAG 2.1.1: Provides keyboard accessibility for button-like cards.
 */
export function useCardKeyboardInteraction(
    onClick: CardProps["onClick"],
    disabled: boolean
) {
    return (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        // WCAG 2.1.1: Keyboard accessible
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
    };
}
