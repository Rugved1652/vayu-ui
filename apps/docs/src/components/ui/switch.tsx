"use client";

import { clsx } from "clsx";
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

// ============================================================================
// Types
// ============================================================================

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: SwitchSize;
    label?: ReactNode;
    description?: ReactNode;
    error?: boolean;
}

// ============================================================================
// Component
// ============================================================================

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            className,
            size = "md",
            label,
            description,
            error,
            disabled,
            id: idProp,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const id = idProp || generatedId;
        const descriptionId = `${id}-description`;

        return (
            <div className={clsx("inline-flex items-start gap-3", className)}>
                <div className="relative inline-flex items-center shrink-0">
                    <input
                        ref={ref}
                        id={id}
                        type="checkbox"
                        role="switch"
                        disabled={disabled}
                        aria-describedby={description ? descriptionId : undefined}
                        className="peer sr-only"
                        {...props}
                    />
                    <div
                        className={clsx(
                            "rounded-full transition-colors duration-200 ease-in-out border-2 border-transparent cursor-pointer",
                            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-500",
                            "bg-ground-200 dark:bg-ground-700",
                            "peer-checked:bg-primary-500",
                            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
                            error && "ring-2 ring-red-500/50",

                            // Sizes
                            size === "sm" && "w-8 h-4",
                            size === "md" && "w-11 h-6",
                            size === "lg" && "w-14 h-7"
                        )}
                        aria-hidden="true"
                    >
                        <span
                            className={clsx(
                                "block bg-white rounded-full shadow-sm ring-0 transition-transform duration-200 ease-in-out pointer-events-none",

                                // Sizes & Translation
                                size === "sm" &&
                                "w-3 h-3 translate-x-0.5 peer-checked:translate-x-4 mt-0.5", // 0.5px border compensation
                                size === "md" &&
                                "w-5 h-5 translate-x-0.5 peer-checked:translate-x-5 mt-0.5",
                                size === "lg" &&
                                "w-6 h-6 translate-x-0.5 peer-checked:translate-x-7 mt-0.5"
                            )}
                        />
                    </div>
                </div>

                {(label || description) && (
                    <div className="flex flex-col cursor-default">
                        {label && (
                            <label
                                htmlFor={id}
                                className={clsx(
                                    "font-medium bg-transparent select-none cursor-pointer",
                                    disabled && "opacity-50 cursor-not-allowed",
                                    size === "sm" && "text-xs",
                                    size === "md" && "text-sm",
                                    size === "lg" && "text-base",
                                    error ? "text-red-500" : "text-ground-900 dark:text-ground-100"
                                )}
                            >
                                {label}
                            </label>
                        )}
                        {description && (
                            <p
                                id={descriptionId}
                                className={clsx(
                                    "text-ground-500 dark:text-ground-400 font-secondary select-none",
                                    disabled && "opacity-50",
                                    size === "sm" && "text-[10px]",
                                    size === "md" && "text-xs",
                                    size === "lg" && "text-sm"
                                )}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Switch.displayName = "Switch";

export { Switch };
