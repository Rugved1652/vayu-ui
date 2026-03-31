// char-count.tsx
// UI: Standalone character counter

"use client";

import React from "react";
import { cn } from "../utils";
import { useTextAreaContext } from "./textarea";
import type { TextAreaCharCountProps } from "./types";

export const TextAreaCharCount = ({
    className,
}: TextAreaCharCountProps) => {
    const { charCount, maxLength } = useTextAreaContext();

    return (
        <span
            className={cn(
                "text-xs font-secondary text-muted-content px-2",
                className
            )}
            aria-live="polite"
            aria-atomic="true"
        >
            {charCount}
            {maxLength && `/${maxLength}`}
        </span>
    );
};

TextAreaCharCount.displayName = "TextArea.CharCount";
