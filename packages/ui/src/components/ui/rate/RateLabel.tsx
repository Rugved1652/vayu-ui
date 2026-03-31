// rate/label.tsx
// UI: label

"use client";
import React from "react";

import { useRate } from "./hooks";
import { sizeClasses } from "./Rate";
import type { RateLabelProps } from "./types";

export const RateLabel: React.FC<RateLabelProps> = ({ children, className = "" }) => {
    const { size, inputId } = useRate();

    return (
        <label
            htmlFor={inputId}
            className={`block font-primary text-surface-content font-medium mb-1 ${sizeClasses[size].label} ${className}`}
        >
            {children}
        </label>
    );
};
