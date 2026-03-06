// packages/ui/src/components/ui/rate.tsx

"use client";
import { Star } from "lucide-react";
import React, {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useState,
} from "react";

/**
 * Rate Component - Compound Pattern with Accessibility
 *
 * A fully accessible rating component with:
 * - Compound component pattern for flexible composition
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - ARIA labels and proper slider semantics
 * - Half-star support with visual feedback
 * - Multiple color variants and sizes
 * - Custom icons support
 * - Read-only and disabled states
 * - Custom text labels for ratings
 * - Screen reader friendly
 */

// ============================================================================
// Types
// ============================================================================

type RateSize = "sm" | "md" | "lg" | "xl";
type RateColor =
    | "primary"
    | "secondary"
    | "warning"
    | "error"
    | "info"
    | "success";
type RateVariant = "default" | "outlined" | "filled";

// ============================================================================
// Context
// ============================================================================

interface RateContextType {
    count: number;
    currentValue: number;
    activeValue: number;
    hoverValue: number | null;
    setHoverValue: (value: number | null) => void;
    handleClick: (value: number) => void;
    handleHover: (value: number) => void;
    handleMouseLeave: () => void;
    isDisabled: boolean;
    readOnly: boolean;
    allowHalf: boolean;
    size: RateSize;
    color: RateColor;
    variant: RateVariant;
    icon: ReactElement;
    error: boolean;
    labels?: string[];
    getFillPercentage: (starIndex: number) => number;
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
// Size & Color Classes
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

const colorClasses = {
    primary: {
        filled:
            "text-primary-500 fill-primary-500 dark:text-primary-400 dark:fill-primary-400",
        empty: "text-ground-300 dark:text-ground-700",
        outlined: "text-primary-500 dark:text-primary-400",
    },
    secondary: {
        filled:
            "text-secondary-500 fill-secondary-500 dark:text-secondary-400 dark:fill-secondary-400",
        empty: "text-ground-300 dark:text-ground-700",
        outlined: "text-secondary-500 dark:text-secondary-400",
    },
    warning: {
        filled:
            "text-warning-500 fill-warning-500 dark:text-warning-400 dark:fill-warning-400",
        empty: "text-ground-300 dark:text-ground-700",
        outlined: "text-warning-500 dark:text-warning-400",
    },
    error: {
        filled:
            "text-error-500 fill-error-500 dark:text-error-400 dark:fill-error-400",
        empty: "text-ground-300 dark:text-ground-700",
        outlined: "text-error-500 dark:text-error-400",
    },
    info: {
        filled: "text-info-500 fill-info-500 dark:text-info-400 dark:fill-info-400",
        empty: "text-ground-300 dark:text-ground-700",
        outlined: "text-info-500 dark:text-info-400",
    },
    success: {
        filled:
            "text-success-500 fill-success-500 dark:text-success-400 dark:fill-success-400",
        empty: "text-ground-300 dark:text-ground-700",
        outlined: "text-success-500 dark:text-success-400",
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
    color?: RateColor;
    variant?: RateVariant;
    icon?: ReactElement;
    error?: boolean;
    labels?: string[];
    className?: string;
    /**
     * Accessible label for the rating
     */
    "aria-label"?: string;
    /**
     * ID of element that labels the rating
     */
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
    color = "warning",
    variant = "default",
    icon = <Star />,
    error = false,
    labels,
    className = "",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const activeValue = hoverValue ?? currentValue;
    const isDisabled = disabled || readOnly;

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
        color: error ? "error" : color,
        variant,
        icon,
        error,
        labels,
        getFillPercentage,
    };

    return (
        <RateContext.Provider value={contextValue}>
            <div
                className={`w-full ${className}`}
                role="group"
                aria-label={ariaLabel || "Rating"}
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
    const { size } = useRate();

    return (
        <label
            className={`block font-primary text-ground-700 dark:text-ground-300 font-medium mb-1 ${sizeClasses[size].label} ${className}`}
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
            className={`text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2 ${className}`}
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
    /**
     * Accessible label for the rating slider
     */
    "aria-label"?: string;
}

const RateStars: React.FC<RateStarsProps> = ({
    className = "",
    "aria-label": ariaLabel,
}) => {
    const { count, activeValue, isDisabled, readOnly, size, handleMouseLeave } =
        useRate();
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const context = useRate();
        if (context.isDisabled) return;

        let newValue = context.currentValue;
        const step = context.allowHalf ? 0.5 : 1;

        switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
                e.preventDefault();
                newValue = Math.min(context.currentValue + step, context.count);
                break;
            case "ArrowLeft":
            case "ArrowDown":
                e.preventDefault();
                newValue = Math.max(context.currentValue - step, 0);
                break;
            case "Home":
                e.preventDefault();
                newValue = 0;
                break;
            case "End":
                e.preventDefault();
                newValue = context.count;
                break;
            default:
                return;
        }

        context.handleClick(newValue);
    };

    return (
        <div
            className={`
        flex items-center ${sizeClasses[size].gap}
        ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${!isDisabled && !readOnly && isFocused ? "ring-2 ring-primary-500 ring-offset-2 rounded" : ""}
        transition-all duration-200
        ${className}
      `}
            onMouseLeave={handleMouseLeave}
            role="slider"
            aria-label={ariaLabel || "Rating"}
            aria-valuemin={0}
            aria-valuemax={count}
            aria-valuenow={activeValue}
            aria-readonly={readOnly}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
        color,
        variant,
        icon,
        isDisabled,
        allowHalf,
        getFillPercentage,
        handleHover,
        handleClick,
    } = useRate();

    const starIndex = index;
    const leftHalfValue = starIndex - 0.5;
    const rightHalfValue = starIndex;
    const fillPercentage = getFillPercentage(starIndex);
    const currentColor = colorClasses[color];

    const renderIcon = (className: string, isFilled: boolean) => {
        const iconProps = {
            size: sizeClasses[size].icon,
            className: `${className} transition-all duration-200`,
            style: {
                width: sizeClasses[size].icon,
                height: sizeClasses[size].icon,
                flexShrink: 0,
            },
            strokeWidth: variant === "outlined" ? 2 : isFilled ? 0 : 2,
        };

        return React.cloneElement(icon, iconProps);
    };

    return (
        <div
            className="relative shrink-0"
            style={{
                width: sizeClasses[size].icon,
                height: sizeClasses[size].icon,
            }}
            aria-hidden="true"
        >
            {/* Empty Icon (Background) */}
            <div className="absolute top-0 left-0">
                {renderIcon(currentColor.empty, false)}
            </div>

            {/* Filled Icon (Foreground) */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
            >
                {variant === "outlined"
                    ? renderIcon(currentColor.outlined, false)
                    : renderIcon(currentColor.filled, true)}
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
            className={`${sizeClasses[size].value} font-secondary font-medium text-ground-700 dark:text-ground-300 ${className}`}
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
            className={`${sizeClasses[size].value} font-secondary font-medium text-ground-600 dark:text-ground-400 ${className}`}
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
            className={`text-xs font-secondary text-error-500 dark:text-error-400 mt-1 ${className}`}
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
    RateColor,
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
    RateVariant,
};