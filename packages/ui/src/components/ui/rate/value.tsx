// rate/value.tsx
// UI: value display + text label

"use client";
import React from "react";

import { useRate } from "./hooks";
import { sizeClasses } from "./rate";
import type { RateTextLabelProps, RateValueProps } from "./types";

// ============================================================================
// Rate Value Display
// ============================================================================

export const RateValue: React.FC<RateValueProps> = ({
    className = "",
    showTotal = true,
    decimals,
}) => {
    const { activeValue, count, allowHalf, size } = useRate();
    const decimalPlaces = decimals !== undefined ? decimals : allowHalf ? 1 : 0;

    return (
        <span
            className={`${sizeClasses[size].value} font-secondary font-medium text-surface-content ${className}`}
        >
            {activeValue.toFixed(decimalPlaces)}
            {showTotal && ` / ${count}`}
        </span>
    );
};

// ============================================================================
// Rate Text Label
// ============================================================================

export const RateTextLabel: React.FC<RateTextLabelProps> = ({ className = "" }) => {
    const { activeValue, labels, size } = useRate();

    if (!labels || labels.length === 0) return null;

    const index = Math.ceil(activeValue) - 1;
    const label = labels[index] || null;

    if (!label) return null;

    return (
        <span
            className={`${sizeClasses[size].value} font-secondary font-medium text-muted-content ${className}`}
            role="status"
            aria-live="polite"
        >
            {label}
        </span>
    );
};
