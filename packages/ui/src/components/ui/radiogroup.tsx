"use client";

import { cn } from "./utils";
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

interface RadioGroupContextType {
    value: string;
    onChange: (value: string) => void;
    name: string;
    disabled?: boolean;
}

interface RadioGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    disabled?: boolean;
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
                }}
            >
                <div
                    ref={ref}
                    className={cn("w-full", className)}
                    {...props}
                >
                    {/* Label & Description */}
                    {(label || description) && (
                        <div className="mb-3">
                            {label && (
                                <label
                                    id={labelId}
                                    className="block font-secondary text-surface-content text-sm font-medium mb-1"
                                >
                                    {label}
                                    {required && (
                                        <span
                                            className="text-destructive ml-1"
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
                                    className="text-xs font-secondary text-muted-content"
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
                        aria-describedby={cn(
                            description && descriptionId,
                            error && errorText && errorId
                        ) || undefined}
                        aria-required={required || undefined}
                        aria-invalid={error || undefined}
                        className={cn(
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
                            aria-live="polite"
                            className="text-xs font-secondary text-destructive mt-2"
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
        } = useRadioGroup();

        const isChecked = groupValue === value;
        const isDisabled = groupDisabled || itemDisabled;
        const inputId = `${name}-${value}`;

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

        return (
            <label
                ref={ref}
                htmlFor={inputId}
                className={cn(
                    "flex items-center gap-3 cursor-pointer group py-1",
                    isDisabled && "cursor-not-allowed opacity-50",
                    className
                )}
                {...props}
            >
                {/* Hidden native input for accessibility */}
                <input
                    type="radio"
                    id={inputId}
                    name={name}
                    value={value}
                    checked={isChecked}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={isDisabled}
                    className={cn(
                        "sr-only",
                        "peer"
                    )}
                    aria-label={label || value}
                />

                {/* Visual Radio Circle */}
                <div
                    className={cn(
                        "w-5 h-5 shrink-0",
                        "flex items-center justify-center",
                        "rounded-full border-2 transition-all duration-200",
                        isChecked
                            ? "border-brand bg-brand"
                            : "border-field",
                        !isDisabled && "group-hover:border-brand/70",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
                        "peer-focus-visible:ring-focus"
                    )}
                    aria-hidden="true"
                >
                    {isChecked && (
                        <div
                            className={cn(
                                "w-2.5 h-2.5 rounded-full bg-brand-content"
                            )}
                        />
                    )}
                </div>

                {/* Label & Description */}
                {(label || description) && (
                    <div className="flex-1 min-w-0">
                        {label && (
                            <span
                                className={cn(
                                    "text-base font-secondary font-medium",
                                    "text-surface-content",
                                    !isDisabled && "group-hover:text-surface-content/80",
                                    "transition-colors block"
                                )}
                            >
                                {label}
                            </span>
                        )}
                        {description && (
                            <p
                                className={cn(
                                    "text-sm font-secondary",
                                    "text-muted-content",
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
    RadioGroupProps,
    RadioItemProps,
};
