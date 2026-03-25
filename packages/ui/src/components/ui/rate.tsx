// packages/ui/src/components/ui/rate.tsx

"use client";
import React, {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useState,
    useId,
} from "react";

/**
 * Rate Component - Compound Pattern with Accessibility
 *
 * A fully accessible rating component with:
 * - Compound component pattern for flexible composition
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - ARIA labels and proper slider semantics
 * - Half-star support with visual feedback
 * - Multiple sizes
 * - Custom icons support
 * - Read-only and disabled states
 * - Custom text labels for ratings
 * - Screen reader friendly
 * - Zero external dependencies (Self-contained SVG Icon)
 */

// ============================================================================
// Types
// ============================================================================

type RateSize = "sm" | "md" | "lg" | "xl";

// ============================================================================
// Internal Default Icon (Dependency Free)
// ============================================================================

interface DefaultIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const DefaultStar: React.FC<DefaultIconProps> = ({
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
// Context
// ============================================================================

interface RateContextType {
    count: number;
    currentValue: number;
    activeValue: number;
    hoverValue: number | null;
    setHoverValue: (value: number | null) => void;
    handleClick: (clickValue: number) => void;
    handleHover: (value: number) => void;
    handleMouseLeave: () => void;
    isDisabled: boolean;
    readOnly: boolean;
    allowHalf: boolean;
    size: RateSize;
    icon: ReactElement;
    filledIcon: ReactElement;
    halfIcon: ReactElement;
    error: boolean;
    labels?: string[];
    getFillPercentage: (starIndex: number) => number;
    inputId: string;
    isControlled: boolean;
    setInternalValue: (value: number) => void;
    onChange?: (value: number) => void;
    isContainerFocused: boolean;
    setIsContainerFocused: (value: boolean) => void;
}

const RateContext = createContext<RateContextType | undefined>(undefined);

const useRate = () => {
    const context = useContext(RateContext);
    if (!context) {
        throw new Error("Rate compound components must be used within Rate");
    }
    return context;
};

// ============================================================================
// Size Classes
// ============================================================================

const sizeClasses = {
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

interface RateRootProps {
    children?: ReactNode;
    count?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    readOnly?: boolean;
    disabled?: boolean;
    allowHalf?: boolean;
    allowClear?: boolean;
    size?: RateSize;
    /** Icon for empty/outline state */
    icon?: ReactElement;
    /** Icon for filled state (defaults to icon) */
    filledIcon?: ReactElement;
    /** Icon for half-filled state (defaults to filledIcon) */
    halfIcon?: ReactElement;
    error?: boolean;
    labels?: string[];
    className?: string;
    id?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
}

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

// ============================================================================
// Rate Label
// ============================================================================

interface RateLabelProps {
    children: ReactNode;
    className?: string;
}

const RateLabel: React.FC<RateLabelProps> = ({ children, className = "" }) => {
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

// ============================================================================
// Rate Description
// ============================================================================

interface RateDescriptionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

const RateDescription: React.FC<RateDescriptionProps> = ({
    children,
    className = "",
    id,
}) => {
    return (
        <p
            id={id}
            className={`text-xs font-secondary text-muted-content mb-2 ${className}`}
        >
            {children}
        </p>
    );
};

// ============================================================================
// Rate Stars Container
// ============================================================================

interface RateStarsProps {
    className?: string;
    "aria-label"?: string;
}

const RateStars: React.FC<RateStarsProps> = ({
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

interface RateStarProps {
    index: number;
}

const RateStar: React.FC<RateStarProps> = ({ index }) => {
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
    // Use halfIcon for partial fills, filledIcon for full fills
    const isPartialFill = fillPercentage > 0 && fillPercentage < 100;
    const activeFilledIcon = isPartialFill ? halfIcon : filledIcon;

    // Determine if this star should show the focus ring
    // Focus appears on the star that corresponds to the current value (rounded up for partial fills)
    const activeStarIndex = currentValue > 0 ? Math.ceil(currentValue) : 0;
    const shouldShowFocusRing = isContainerFocused && !isDisabled && !readOnly && starIndex === activeStarIndex;

    // Hardcoded Default Styles (Warning/Gold) with Error state support
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
            // Standard visual: Filled stars remove stroke for a solid look, empty have stroke
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

// ============================================================================
// Rate Value Display
// ============================================================================

interface RateValueProps {
    className?: string;
    showTotal?: boolean;
    decimals?: number;
}

const RateValue: React.FC<RateValueProps> = ({
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

interface RateTextLabelProps {
    className?: string;
}

const RateTextLabel: React.FC<RateTextLabelProps> = ({ className = "" }) => {
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

// ============================================================================
// Rate Container
// ============================================================================

interface RateContainerProps {
    children: ReactNode;
    className?: string;
}

const RateContainer: React.FC<RateContainerProps> = ({
    children,
    className = "",
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>{children}</div>
    );
};

// ============================================================================
// Rate Error Text
// ============================================================================

interface RateErrorTextProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

const RateErrorText: React.FC<RateErrorTextProps> = ({
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

// ============================================================================
// Export Compound Component
// ============================================================================

export const Rate = Object.assign(RateRoot, {
    Label: RateLabel,
    Description: RateDescription,
    Stars: RateStars,
    Star: RateStar,
    Value: RateValue,
    TextLabel: RateTextLabel,
    Container: RateContainer,
    ErrorText: RateErrorText,
});

// ============================================================================
// Type Exports
// ============================================================================

export type {
    RateContainerProps,
    RateDescriptionProps,
    RateErrorTextProps,
    RateLabelProps,
    RateRootProps,
    RateSize,
    RateStarProps,
    RateStarsProps,
    RateTextLabelProps,
    RateValueProps,
};