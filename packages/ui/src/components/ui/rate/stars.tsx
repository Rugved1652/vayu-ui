// rate/stars.tsx
// UI: stars container + individual star

"use client";
import React, { ReactElement } from "react";

import { useRate } from "./hooks";
import { sizeClasses } from "./rate";
import type { RateStarProps, RateStarsProps } from "./types";

// ============================================================================
// Rate Stars Container
// ============================================================================

export const RateStars: React.FC<RateStarsProps> = ({
    className = "",
    "aria-label": ariaLabel,
}) => {
    const {
        count,
        currentValue,
        isDisabled,
        readOnly,
        size,
        handleMouseLeave,
        allowHalf,
        inputId,
        isControlled,
        setInternalValue,
        onChange,
        setIsContainerFocused,
    } = useRate();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        let newValue = currentValue;
        const step = allowHalf ? 0.5 : 1;

        switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
                e.preventDefault();
                newValue = Math.min(currentValue + step, count);
                break;
            case "ArrowLeft":
            case "ArrowDown":
                e.preventDefault();
                newValue = Math.max(currentValue - step, 0);
                break;
            case "Home":
                e.preventDefault();
                newValue = 0;
                break;
            case "End":
                e.preventDefault();
                newValue = count;
                break;
            default:
                return;
        }

        // Update state directly for keyboard navigation to avoid 'click' toggle logic
        if (newValue !== currentValue) {
            if (!isControlled) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
        }
    };

    return (
        <div
            className={`
                flex items-center outline-0 ${sizeClasses[size].gap}
                ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                transition-all duration-200
                ${className}
            `}
            onMouseLeave={handleMouseLeave}
            id={inputId}
            role="slider"
            aria-label={ariaLabel || "Rating"}
            aria-valuemin={0}
            aria-valuemax={count}
            aria-valuenow={currentValue}
            aria-readonly={readOnly}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsContainerFocused(true)}
            onBlur={() => setIsContainerFocused(false)}
        >
            {Array.from({ length: count }).map((_, index) => (
                <RateStar key={index} index={index + 1} />
            ))}
        </div>
    );
};

// ============================================================================
// Rate Star (Individual)
// ============================================================================

export const RateStar: React.FC<RateStarProps> = ({ index }) => {
    const {
        size,
        icon,
        filledIcon,
        halfIcon,
        isDisabled,
        readOnly,
        allowHalf,
        getFillPercentage,
        handleHover,
        handleClick,
        error,
        isContainerFocused,
        currentValue,
    } = useRate();

    const starIndex = index;
    const leftHalfValue = starIndex - 0.5;
    const rightHalfValue = starIndex;
    const fillPercentage = getFillPercentage(starIndex);

    // Determine which icon to use for the filled layer
    const isPartialFill = fillPercentage > 0 && fillPercentage < 100;
    const activeFilledIcon = isPartialFill ? halfIcon : filledIcon;

    // Focus ring on the star matching current value
    const activeStarIndex = currentValue > 0 ? Math.ceil(currentValue) : 0;
    const shouldShowFocusRing = isContainerFocused && !isDisabled && !readOnly && starIndex === activeStarIndex;

    const emptyClasses = "text-muted";
    const filledClasses = error
        ? "text-destructive fill-destructive"
        : "text-warning fill-warning";

    const renderIcon = (iconElement: ReactElement, className: string, isFilled: boolean) => {
        const iconProps = {
            size: sizeClasses[size].icon,
            className: `${className} transition-all duration-200`,
            style: {
                width: sizeClasses[size].icon,
                height: sizeClasses[size].icon,
                flexShrink: 0,
            },
            strokeWidth: isFilled ? 0 : 2,
        };

        return React.cloneElement(iconElement, iconProps);
    };

    return (
        <div
            className={`relative shrink-0 ${shouldShowFocusRing ? "ring-2 ring-focus ring-offset-2 ring-offset-canvas rounded" : ""}`}
            style={{
                width: sizeClasses[size].icon,
                height: sizeClasses[size].icon,
            }}
            aria-hidden="true"
        >
            {/* Empty Icon (Background) */}
            <div className="absolute top-0 left-0">
                {renderIcon(icon, emptyClasses, false)}
            </div>

            {/* Filled Icon (Foreground) */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
            >
                {renderIcon(activeFilledIcon, filledClasses, true)}
            </div>

            {/* Interactive Hover Zones */}
            {!isDisabled && (
                <>
                    {/* Left half */}
                    {allowHalf && (
                        <span
                            className="absolute top-0 left-0 h-full w-1/2 z-10 cursor-pointer"
                            onMouseEnter={() => handleHover(leftHalfValue)}
                            onClick={() => handleClick(leftHalfValue)}
                        />
                    )}
                    {/* Right half or full */}
                    <span
                        className={`absolute top-0 ${allowHalf ? "right-0 w-1/2" : "left-0 w-full"
                            } h-full z-10 cursor-pointer`}
                        onMouseEnter={() => handleHover(rightHalfValue)}
                        onClick={() => handleClick(rightHalfValue)}
                    />
                </>
            )}
        </div>
    );
};
