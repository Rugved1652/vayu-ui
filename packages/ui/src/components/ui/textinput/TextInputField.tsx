// field.tsx
// UI: presentational

"use client";

import React from "react";
import { cn } from "../utils";
import { useTextInput } from "./TextInput";
import type { FieldProps } from "./types";

const Field: React.FC<FieldProps> = ({ children, className = "" }) => {
    const {
        isFocused,
        validationState,
        isDisabled,
        hasValue,
        size,
        setFocused,
    } = useTextInput();

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-3 py-2.5 text-base",
        lg: "px-4 py-3 text-lg",
    };

    const stateClasses = {
        default: isFocused
            ? "border-focus ring-2 ring-focus/20"
            : hasValue
                ? "border-field"
                : "border-field",
        error: "border-destructive ring-2 ring-destructive/20",
        warning: "border-warning ring-2 ring-warning/20",
        success: "border-success ring-2 ring-success/20",
    };

    return (
        <div
            className={cn(
                "flex items-center gap-2 w-full transition-all duration-200",
                "bg-surface border rounded-control",
                sizeClasses[size],
                isFocused || validationState !== "default" ? stateClasses[validationState] : stateClasses.default,
                isDisabled && "opacity-60 cursor-not-allowed bg-muted",
                className
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            {children}
        </div>
    );
};

Field.displayName = "TextInput.Field";

export { Field };
