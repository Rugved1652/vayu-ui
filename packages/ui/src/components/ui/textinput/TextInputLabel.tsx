// label.tsx
// UI: presentational

"use client";

import React from "react";
import { cn } from "../utils";
import { useTextInput } from "./TextInput";
import type { LabelProps } from "./types";

const Label: React.FC<LabelProps> = ({
    children,
    className = "",
    optional = false,
}) => {
    const { labelId, inputId, isRequired } = useTextInput();

    return (
        <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
                "block font-primary font-medium text-surface-content mb-1.5",
                className
            )}
        >
            {children}
            {isRequired && (
                <>
                    <span className="text-destructive ml-1" aria-hidden="true">
                        *
                    </span>
                    <span className="sr-only">required</span>
                </>
            )}
            {optional && (
                <span className="text-muted-content text-sm font-secondary font-normal ml-2">
                    (optional)
                </span>
            )}
        </label>
    );
};

Label.displayName = "TextInput.Label";

export { Label };
