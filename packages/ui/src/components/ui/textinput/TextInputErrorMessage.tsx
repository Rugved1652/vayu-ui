// error-message.tsx
// UI: presentational

"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../utils";
import { useTextInput } from "./TextInput";
import type { HelperTextProps } from "./types";

const ErrorMessage: React.FC<HelperTextProps> = ({
    children,
    className = "",
}) => {
    const { errorId, validationState } = useTextInput();

    if (validationState !== "error") return null;

    return (
        <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className={cn(
                "mt-1.5 text-sm font-secondary text-destructive flex items-center gap-1.5",
                className
            )}
        >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{children}</span>
        </p>
    );
};

ErrorMessage.displayName = "TextInput.ErrorMessage";

export { ErrorMessage };
