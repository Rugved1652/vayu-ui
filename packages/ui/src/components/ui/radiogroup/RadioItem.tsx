// radio-item.tsx
// UI: presentational

"use client";

import { cn } from "../utils";
import React, { forwardRef } from "react";
import type { RadioItemProps } from "./types";
import { useRadioGroup } from "./hooks";

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

export default RadioItem;
