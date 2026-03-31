// radiogroup.tsx
// Composition: UI + wiring

"use client";

import { cn } from "../utils";
import React, {
    forwardRef,
    useCallback,
    useId,
    useState,
} from "react";
import type { RadioGroupProps } from "./types";
import { RadioGroupContext } from "./hooks";

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

export default RadioGroupRoot;
