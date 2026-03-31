// rate/rate.tsx
// Composition: context provider + state + wiring

"use client";
import React, { ReactElement, ReactNode, useState, useId } from "react";

import { RateContext } from "./hooks";
import { RateStars } from "./RateStars";
import type { RateContextType, RateRootProps, RateSize } from "./types";

// ============================================================================
// Internal Default Icon (Dependency Free)
// ============================================================================

const DefaultStar: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
    size = 24,
    className,
    strokeWidth = 2,
    style,
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={style}
            {...props}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
};

// ============================================================================
// Size Classes
// ============================================================================

export const sizeClasses: Record<RateSize, { icon: number; gap: string; label: string; value: string }> = {
    sm: {
        icon: 16,
        gap: "gap-0.5",
        label: "text-sm",
        value: "text-xs",
    },
    md: {
        icon: 24,
        gap: "gap-1",
        label: "text-base",
        value: "text-sm",
    },
    lg: {
        icon: 32,
        gap: "gap-1.5",
        label: "text-lg",
        value: "text-base",
    },
    xl: {
        icon: 40,
        gap: "gap-2",
        label: "text-xl",
        value: "text-lg",
    },
};

// ============================================================================
// Main Rate Component
// ============================================================================

const RateRoot: React.FC<RateRootProps> = ({
    children,
    count = 5,
    value,
    defaultValue = 0,
    onChange,
    readOnly = false,
    disabled = false,
    allowHalf = true,
    allowClear = true,
    size = "md",
    icon = <DefaultStar />,
    filledIcon,
    halfIcon,
    error = false,
    labels,
    className = "",
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [isContainerFocused, setIsContainerFocused] = useState(false);

    const generatedId = useId();
    const inputId = id || generatedId;

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const activeValue = hoverValue ?? currentValue;
    const isDisabled = disabled || readOnly;

    // Fallback chain: halfIcon -> filledIcon -> icon
    const resolvedFilledIcon = filledIcon || icon;
    const resolvedHalfIcon = halfIcon || resolvedFilledIcon;

    const getFillPercentage = (starIndex: number): number => {
        if (activeValue >= starIndex) {
            return 100;
        }
        const valueForThisStar = activeValue - (starIndex - 1);
        if (valueForThisStar > 0 && valueForThisStar < 1) {
            return valueForThisStar * 100;
        }
        return 0;
    };

    const handleHover = (hoverIndex: number) => {
        if (isDisabled) return;
        setHoverValue(hoverIndex);
    };

    const handleMouseLeave = () => {
        if (isDisabled) return;
        setHoverValue(null);
    };

    const handleClick = (clickValue: number) => {
        if (isDisabled) return;

        let newValue = clickValue;

        if (allowClear && clickValue === currentValue) {
            newValue = 0;
        }

        if (!isControlled) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    const contextValue: RateContextType = {
        count,
        currentValue,
        activeValue,
        hoverValue,
        setHoverValue,
        handleClick,
        handleHover,
        handleMouseLeave,
        isDisabled,
        readOnly,
        allowHalf,
        size,
        icon,
        filledIcon: resolvedFilledIcon,
        halfIcon: resolvedHalfIcon,
        error,
        labels,
        getFillPercentage,
        inputId,
        isControlled,
        setInternalValue,
        onChange,
        isContainerFocused,
        setIsContainerFocused,
    };

    return (
        <RateContext.Provider value={contextValue}>
            <div
                className={`w-full ${className}`}
                role="group"
                aria-labelledby={ariaLabelledby}
            >
                {children ? children : <RateStars />}
            </div>
        </RateContext.Provider>
    );
};

export default RateRoot;
