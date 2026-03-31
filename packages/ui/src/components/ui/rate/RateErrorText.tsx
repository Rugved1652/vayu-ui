// rate/error-text.tsx
// UI: error message

"use client";
import React from "react";

import { useRate } from "./hooks";
import type { RateErrorTextProps } from "./types";

export const RateErrorText: React.FC<RateErrorTextProps> = ({
    children,
    className = "",
    id,
}) => {
    const { error } = useRate();

    if (!error || !children) return null;

    return (
        <p
            id={id}
            className={`text-xs font-secondary text-destructive mt-1 ${className}`}
            role="alert"
            aria-live="polite"
        >
            {children}
        </p>
    );
};
