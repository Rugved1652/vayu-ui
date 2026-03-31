// input.tsx
// UI: presentational

"use client";

import React, { forwardRef } from "react";
import { cn } from "../utils";
import { useTextInput } from "./textinput";
import type { InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", leftIcon, rightIcon, type: typeOverride, ...props }, ref) => {
        const {
            inputId,
            labelId,
            errorId,
            descriptionId,
            value,
            setValue,
            inputType,
            isDisabled,
            isReadOnly,
            isRequired,
            validationState,
            inputRef,
        } = useTextInput();

        const resolvedType = typeOverride ?? inputType;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const mergedRef = (node: HTMLInputElement | null) => {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }
        };

        return (
            <>
                {leftIcon && (
                    <span className="text-muted-content shrink-0">{leftIcon}</span>
                )}
                <input
                    ref={mergedRef}
                    id={inputId}
                    type={resolvedType}
                    value={value}
                    onChange={handleChange}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    required={isRequired}
                    aria-labelledby={labelId}
                    aria-describedby={validationState === "error" ? `${descriptionId} ${errorId}` : descriptionId}
                    aria-invalid={validationState === "error"}
                    aria-required={isRequired}
                    className={cn(
                        "flex-1 bg-transparent outline-none font-secondary",
                        "text-surface-content",
                        "placeholder:text-muted-content",
                        "disabled:cursor-not-allowed",
                        "focus-visible:ring-0",
                        className
                    )}
                    {...props}
                />
                {rightIcon && (
                    <span className="text-muted-content shrink-0">{rightIcon}</span>
                )}
            </>
        );
    }
);

Input.displayName = "TextInput.Input";

export { Input };
