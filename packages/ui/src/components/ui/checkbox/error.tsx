// error.tsx
// UI: error message with aria-live

"use client";
import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCheckboxContext } from "./hooks";
import type { CheckboxErrorProps } from "./types";

export const CheckboxError = forwardRef<
    HTMLParagraphElement,
    CheckboxErrorProps
>(({ className, children, ...props }, ref) => {
    const { errorId } = useCheckboxContext();

    return (
        <p
            ref={ref}
            id={errorId}
            className={clsx("text-sm text-destructive font-medium", className)}
            role="alert"
            aria-live="polite"
            {...props}
        >
            {children}
        </p>
    );
});

CheckboxError.displayName = "Checkbox.Error";
