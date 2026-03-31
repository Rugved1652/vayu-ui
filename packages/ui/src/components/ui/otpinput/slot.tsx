// slot.tsx
// UI: individual character slot with focus/caret

import { forwardRef } from "react";
import { clsx } from "clsx";
import { useOTPInput } from "./otpinput";
import type { OTPInputSlotProps } from "./types";

const OTPInputSlot = forwardRef<HTMLDivElement, OTPInputSlotProps>(
    ({ index, className, ...props }, ref) => {
        const { value, isFocused, maxLength, disabled, hasError } = useOTPInput();
        const char = value[index];
        const isActive = isFocused && index === Math.min(value.length, maxLength - 1);
        const hasValue = char !== undefined && char !== "";

        return (
            <div
                ref={ref}
                role="presentation"
                aria-hidden="true"
                className={clsx(
                    "relative flex size-10 items-center justify-center",
                    "border-y border-r rounded-control",
                    "text-sm transition-all duration-150",
                    // Border
                    hasError ? "border-destructive" : "border-field",
                    // Text
                    hasError ? "text-destructive" : "text-surface-content",
                    // Corners
                    "first:rounded-l first:border-l",
                    "last:rounded-r",
                    // Active focus ring
                    isActive && [
                        "z-10",
                        hasError ? "ring-2 ring-destructive" : "ring-2 ring-focus",
                        "ring-offset-canvas",
                    ],
                    // Filled state
                    hasValue && !hasError && "bg-muted",
                    hasValue && hasError && "bg-destructive/10",
                    // Disabled
                    disabled && "opacity-50",
                    className
                )}
                {...props}
            >
                <span className="font-secondary">{char}</span>
                {/* Fake Caret */}
                {isActive && !hasValue && !disabled && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                    >
                        <div
                            className={clsx(
                                "h-4 w-0.5 bg-surface-content",
                                "animate-caret-blink motion-reduce:hidden"
                            )}
                        />
                    </div>
                )}
            </div>
        );
    }
);
OTPInputSlot.displayName = "OTPInput.Slot";

export { OTPInputSlot };
