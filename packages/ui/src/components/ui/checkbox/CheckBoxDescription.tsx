// description.tsx
// UI: helper description text

"use client";
import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCheckboxContext } from "./hooks";
import type { CheckboxDescriptionProps } from "./types";

export const CheckboxDescription = forwardRef<
    HTMLParagraphElement,
    CheckboxDescriptionProps
>(({ className, children, ...props }, ref) => {
    const { descriptionId, disabled } = useCheckboxContext();

    return (
        <p
            ref={ref}
            id={descriptionId}
            className={clsx(
                "text-sm text-muted-content",
                disabled && "opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
});

CheckboxDescription.displayName = "Checkbox.Description";
