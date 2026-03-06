"use client";

import { clsx } from "clsx";
import { Check } from "lucide-react";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useId,
    useState,
} from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

type RadioSize = "sm" | "md" | "lg";
type RadioVariant = "default" | "card" | "button";
type RadioColor =
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "info";

interface RadioGroupContextType {
    value: string;
    onChange: (value: string) => void;
    name: string;
    disabled?: boolean;
    size: RadioSize;
    variant: RadioVariant;
    color: RadioColor;
}

interface RadioGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    disabled?: boolean;
    size?: RadioSize;
    variant?: RadioVariant;
    color?: RadioColor;
    orientation?: "vertical" | "horizontal";
    label?: string;
    description?: string;
    error?: boolean;
    errorText?: string;
    required?: boolean;
    children: React.ReactNode;
}

interface RadioItemProps
    extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
    value: string;
    label?: string;
    description?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

// ============================================================================
// Context
// ============================================================================

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
    undefined
);

const useRadioGroup = () => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error("RadioGroup components must be used within RadioGroup.Root");
    }
    return context;
};

// ============================================================================
// Size Config
// ============================================================================

const sizeClasses: Record<
    RadioSize,
    {
        radio: string;
        dot: string;
        label: string;
        description: string;
        padding: string;
    }
> = {
    sm: {
        radio: "w-4 h-4",
        dot: "w-2 h-2",
        label: "text-sm",
        description: "text-xs",
        padding: "p-2",
    },
    md: {
        radio: "w-5 h-5",
        dot: "w-2.5 h-2.5",
        label: "text-base",
        description: "text-sm",
        padding: "p-3",
    },
    lg: {
        radio: "w-6 h-6",
        dot: "w-3 h-3",
        label: "text-lg",
        description: "text-base",
        padding: "p-4",
    },
};

// ============================================================================
// Color Config
// ============================================================================

const colorClasses: Record<
    RadioColor,
    { checked: string; unchecked: string; focus: string; cardBg: string }
> = {
    primary: {
        checked:
            "border-primary-600 bg-primary-600 dark:border-primary-500 dark:bg-primary-500",
        unchecked: "border-ground-300 dark:border-ground-600",
        focus: "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        cardBg: "bg-primary-100 dark:bg-primary-900/20 border-primary-500 dark:border-primary-400",
    },
    success: {
        checked:
            "border-success-600 bg-success-600 dark:border-success-500 dark:bg-success-500",
        unchecked: "border-ground-300 dark:border-ground-600",
        focus: "focus-visible:ring-success-500 dark:focus-visible:ring-success-400",
        cardBg: "bg-success-100 dark:bg-success-900/20 border-success-500 dark:border-success-400",
    },
    warning: {
        checked:
            "border-warning-600 bg-warning-600 dark:border-warning-500 dark:bg-warning-500",
        unchecked: "border-ground-300 dark:border-ground-600",
        focus: "focus-visible:ring-warning-500 dark:focus-visible:ring-warning-400",
        cardBg: "bg-warning-100 dark:bg-warning-900/20 border-warning-500 dark:border-warning-400",
    },
    error: {
        checked:
            "border-error-600 bg-error-600 dark:border-error-500 dark:bg-error-500",
        unchecked: "border-ground-300 dark:border-ground-600",
        focus: "focus-visible:ring-error-500 dark:focus-visible:ring-error-400",
        cardBg: "bg-error-100 dark:bg-error-900/20 border-error-500 dark:border-error-400",
    },
    info: {
        checked:
            "border-info-600 bg-info-600 dark:border-info-500 dark:bg-info-500",
        unchecked: "border-ground-300 dark:border-ground-600",
        focus: "focus-visible:ring-info-500 dark:focus-visible:ring-info-400",
        cardBg: "bg-info-100 dark:bg-info-900/20 border-info-500 dark:border-info-400",
    },
};

// ============================================================================
// RadioGroup Root Component
// ============================================================================

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            value,
            defaultValue = "",
            onChange,
            name,
            disabled = false,
            size = "md",
            variant = "default",
            color = "primary",
            orientation = "vertical",
            label,
            description,
            error = false,
            errorText,
            required = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState(defaultValue);
        const uniqueId = useId();
        const groupName = name || `radio-group-${uniqueId}`;
        const labelId = `${uniqueId}-label`;
        const descriptionId = `${uniqueId}-desc`;
        const errorId = `${uniqueId}-error`;

        const isControlled = value !== undefined;
        const currentValue = isControlled ? value : internalValue;

        const handleChange = useCallback(
            (newValue: string) => {
                if (!isControlled) {
                    setInternalValue(newValue);
                }
                onChange?.(newValue);
            },
            [isControlled, onChange]
        );

        return (
            <RadioGroupContext.Provider
                value={{
                    value: currentValue,
                    onChange: handleChange,
                    name: groupName,
                    disabled,
                    size,
                    variant,
                    color,
                }}
            >
                <div
                    ref={ref}
                    className={clsx("w-full", className)}
                    {...props}
                >
                    {/* Label & Description */}
                    {(label || description) && (
                        <div className="mb-3">
                            {label && (
                                <label
                                    id={labelId}
                                    className="block font-primary text-ground-700 dark:text-ground-300 text-sm font-medium mb-1"
                                >
                                    {label}
                                    {required && (
                                        <span
                                            className="text-error-500 dark:text-error-400 ml-1"
                                            aria-hidden="true"
                                        >
                                            *
                                        </span>
                                    )}
                                </label>
                            )}
                            {description && (
                                <p
                                    id={descriptionId}
                                    className="text-xs font-secondary text-ground-500 dark:text-ground-400"
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Radio Group */}
                    <div
                        role="radiogroup"
                        aria-labelledby={label ? labelId : undefined}
                        aria-describedby={clsx(
                            description && descriptionId,
                            error && errorText && errorId
                        ) || undefined}
                        aria-required={required || undefined}
                        aria-invalid={error || undefined}
                        className={clsx(
                            "flex gap-3",
                            orientation === "vertical"
                                ? "flex-col"
                                : "flex-row flex-wrap"
                        )}
                    >
                        {children}
                    </div>

                    {/* Error Text */}
                    {error && errorText && (
                        <p
                            id={errorId}
                            role="alert"
                            className="text-xs font-secondary text-error-500 dark:text-error-400 mt-2"
                        >
                            {errorText}
                        </p>
                    )}
                </div>
            </RadioGroupContext.Provider>
        );
    }
);

RadioGroupRoot.displayName = "RadioGroup.Root";

// ============================================================================
// RadioGroup Item Component
// ============================================================================

const RadioItem = forwardRef<HTMLLabelElement, RadioItemProps>(
    (
        {
            value,
            label,
            description,
            disabled: itemDisabled = false,
            icon,
            className,
            ...props
        },
        ref
    ) => {
        const {
            value: groupValue,
            onChange,
            name,
            disabled: groupDisabled,
            size,
            variant,
            color,
        } = useRadioGroup();

        const isChecked = groupValue === value;
        const isDisabled = groupDisabled || itemDisabled;
        const currentColor = colorClasses[color];

        const handleChange = () => {
            if (!isDisabled) {
                onChange(value);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleChange();
            }
        };

        // Shared radio circle indicator
        const radioCircle = (checked: boolean, mt?: boolean) => (
            <div
                className={clsx(
                    sizeClasses[size].radio,
                    "flex items-center justify-center",
                    "rounded-full border-2 transition-all duration-200",
                    checked ? currentColor.checked : currentColor.unchecked,
                    "flex-shrink-0",
                    mt && "mt-0.5"
                )}
                aria-hidden="true"
            >
                {checked &&
                    (variant === "card" ? (
                        <Check
                            className="w-3 h-3 text-white"
                            strokeWidth={3}
                        />
                    ) : (
                        <div
                            className={clsx(
                                sizeClasses[size].dot,
                                "rounded-full bg-white"
                            )}
                        />
                    ))}
            </div>
        );

        // Hidden native input for accessibility
        const hiddenInput = (
            <input
                type="radio"
                name={name}
                value={value}
                checked={isChecked}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isDisabled}
                className={clsx(
                    "sr-only",
                    "focus-visible:ring-2 focus-visible:ring-offset-2",
                    currentColor.focus
                )}
                aria-label={label || value}
            />
        );

        // ---- Default Variant ----
        if (variant === "default") {
            return (
                <label
                    ref={ref}
                    className={clsx(
                        "flex items-center gap-3 cursor-pointer group",
                        isDisabled && "cursor-not-allowed opacity-50",
                        className
                    )}
                    {...props}
                >
                    {hiddenInput}
                    {radioCircle(isChecked)}

                    {(label || description) && (
                        <div className="flex-1 pt-0.5">
                            {label && (
                                <span
                                    className={clsx(
                                        sizeClasses[size].label,
                                        "font-secondary font-medium",
                                        "text-ground-900 dark:text-white",
                                        !isDisabled &&
                                            "group-hover:text-ground-700 dark:group-hover:text-ground-200",
                                        "transition-colors block"
                                    )}
                                >
                                    {label}
                                </span>
                            )}
                            {description && (
                                <p
                                    className={clsx(
                                        sizeClasses[size].description,
                                        "font-secondary",
                                        "text-ground-500 dark:text-ground-400",
                                        "mt-0.5"
                                    )}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                </label>
            );
        }

        // ---- Card Variant ----
        if (variant === "card") {
            return (
                <label
                    ref={ref}
                    className={clsx(
                        "flex items-start gap-3",
                        sizeClasses[size].padding,
                        "rounded border-2 cursor-pointer",
                        "transition-all duration-200",
                        isChecked
                            ? currentColor.cardBg
                            : "bg-white dark:bg-ground-900 border-ground-200 dark:border-ground-800",
                        isDisabled
                            ? "cursor-not-allowed opacity-50"
                            : "hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-outer",
                        className
                    )}
                    {...props}
                >
                    {hiddenInput}
                    {radioCircle(isChecked, true)}

                    <div className="flex-1 min-w-0">
                        {icon && (
                            <div className="mb-2 text-ground-600 dark:text-ground-400">
                                {icon}
                            </div>
                        )}
                        {label && (
                            <span
                                className={clsx(
                                    sizeClasses[size].label,
                                    "font-secondary font-semibold",
                                    "text-ground-900 dark:text-white",
                                    "block"
                                )}
                            >
                                {label}
                            </span>
                        )}
                        {description && (
                            <p
                                className={clsx(
                                    sizeClasses[size].description,
                                    "font-secondary",
                                    "text-ground-600 dark:text-ground-300",
                                    "mt-1"
                                )}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                </label>
            );
        }

        // ---- Button Variant ----
        if (variant === "button") {
            return (
                <label
                    ref={ref}
                    className={clsx(
                        "flex items-center justify-center gap-2",
                        sizeClasses[size].padding,
                        "rounded border-2 cursor-pointer",
                        "font-secondary font-medium transition-all duration-200",
                        isChecked
                            ? clsx(
                                currentColor.checked,
                                "text-white border-transparent shadow-outer"
                            )
                            : "bg-white dark:bg-ground-900 text-ground-700 dark:text-ground-300 border-ground-200 dark:border-ground-800",
                        isDisabled
                            ? "cursor-not-allowed opacity-50"
                            : "hover:border-primary-300 dark:hover:border-primary-600 active:scale-95",
                        className
                    )}
                    {...props}
                >
                    {hiddenInput}
                    {icon && (
                        <span className="flex-shrink-0">{icon}</span>
                    )}
                    <span className={sizeClasses[size].label}>
                        {label || value}
                    </span>
                    {isChecked && (
                        <Check className="w-4 h-4" strokeWidth={3} />
                    )}
                </label>
            );
        }

        return null;
    }
);

RadioItem.displayName = "RadioGroup.Item";

// ============================================================================
// Compound Export
// ============================================================================

export const RadioGroup = Object.assign(RadioGroupRoot, {
    Root: RadioGroupRoot,
    Item: RadioItem,
});

export type {
    RadioColor,
    RadioGroupProps,
    RadioItemProps,
    RadioSize,
    RadioVariant,
};