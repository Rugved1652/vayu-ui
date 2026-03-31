// step-indicator.tsx
// UI: step indicator circle

"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { useStepStatusContext } from "./hooks";
import type { StepIndicatorProps } from "./types";

export const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(
    ({ icon, className, children, ...props }, ref) => {
        const { status } = useStepStatusContext();

        return (
            <div
                ref={ref}
                aria-hidden="true"
                className={clsx(
                    "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-150 font-secondary font-semibold text-sm shrink-0",
                    "group-focus-visible:ring-2 group-focus-visible:ring-focus group-focus-visible:ring-offset-2",
                    status === "active" && "border-brand bg-brand text-brand-content ring-4 ring-brand/20",
                    status === "completed" && "border-brand bg-brand text-brand-content",
                    status === "inactive" && "border-border bg-muted text-muted-content",
                    status === "error" && "border-destructive bg-destructive text-destructive-content",
                    status === "loading" && "border-brand text-brand animate-pulse",
                    className
                )}
                {...props}
            >
                {status === "completed" && !icon && !children ? (
                    <Check className="w-5 h-5" />
                ) : status === "error" && !icon && !children ? (
                    <span className="text-lg font-bold">!</span>
                ) : (
                    children || icon
                )}
            </div>
        );
    }
);
StepIndicator.displayName = "Stepper.Indicator";
