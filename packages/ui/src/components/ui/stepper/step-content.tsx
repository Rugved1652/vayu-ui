// step-content.tsx
// UI: step content, title, and description

"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { useStepperContext, useStepStatusContext } from "./hooks";
import type { StepContentProps, StepTitleProps, StepDescriptionProps } from "./types";

// StepContent
export const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
    ({ className, children, ...props }, ref) => {
        const { orientation } = useStepperContext();

        return (
            <div
                ref={ref}
                className={clsx(
                    "flex flex-col gap-1",
                    orientation === "horizontal" && "items-center text-center",
                    orientation === "vertical" && "pb-8 pl-4 pt-2 flex-1",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
StepContent.displayName = "Stepper.Content";

// StepTitle
export const StepTitle = forwardRef<HTMLHeadingElement, StepTitleProps>(
    ({ className, children, ...props }, ref) => {
        const { status } = useStepStatusContext();

        return (
            <h3
                ref={ref}
                className={clsx(
                    "font-secondary text-sm font-semibold transition-colors duration-150",
                    (status === "active" || status === "completed")
                        ? "text-surface-content"
                        : "text-muted-content",
                    className
                )}
                {...props}
            >
                {children}
            </h3>
        );
    }
);
StepTitle.displayName = "Stepper.Title";

// StepDescription
export const StepDescription = forwardRef<HTMLParagraphElement, StepDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        const { orientation } = useStepperContext();

        return (
            <p
                ref={ref}
                className={clsx(
                    "font-secondary text-xs text-muted-content",
                    orientation === "horizontal" && "line-clamp-2",
                    className
                )}
                {...props}
            >
                {children}
            </p>
        );
    }
);
StepDescription.displayName = "Stepper.Description";
