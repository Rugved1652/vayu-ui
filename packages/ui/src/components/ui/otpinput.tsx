"use client";

import React, {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react"; // Example icon

// ============================================================================
// Types
// ============================================================================

interface OTPInputContextValue {
    value: string;
    isFocused: boolean;
    maxLength: number;
    hasFakeCaret: boolean;
}

const OTPInputContext = createContext<OTPInputContextValue | undefined>(undefined);

const useOTPInput = () => {
    const context = useContext(OTPInputContext);
    if (!context) {
        throw new Error("OTPInput compound components must be used within OTPInput");
    }
    return context;
};

// ============================================================================
// Root Component
// ============================================================================

interface OTPInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value?: string;
    onChange?: (value: string) => void;
    maxLength?: number;
    containerClassName?: string;
    /**
     * Callback when the complete code is entered
     */
    onComplete?: (code: string) => void;
    /**
     * Render prop for custom carets or slots if needed (optional)
     */
    children?: React.ReactNode;
}

const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(
    (
        {
            value: controlledValue,
            onChange,
            maxLength = 6,
            containerClassName,
            onComplete,
            className,
            children,
            autoFocus,
            disabled,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState("");
        const [isFocused, setIsFocused] = useState(false);
        const inputRef = useRef<HTMLInputElement>(null);

        const value = controlledValue ?? internalValue;

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            if (newValue.length <= maxLength) {
                setInternalValue(newValue);
                onChange?.(newValue);
                if (newValue.length === maxLength) {
                    onComplete?.(newValue);
                }
            }
        };

        // Forward ref to the hidden input
        React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

        useEffect(() => {
            if (autoFocus) {
                inputRef.current?.focus();
            }
        }, [autoFocus]);

        return (
            <OTPInputContext.Provider
                value={{
                    value,
                    isFocused,
                    maxLength,
                    hasFakeCaret: isFocused, // Simplified caret logic
                }}
            >
                <div
                    className={clsx(
                        "relative flex items-center justify-center cursor-text select-none",
                        disabled && "opacity-50 cursor-not-allowed",
                        containerClassName
                    )}
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Visual Container */}
                    <div className={clsx("flex items-center gap-2", className)}>
                        {children}
                    </div>

                    {/* Hidden Input for managing state and focus */}
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        maxLength={maxLength}
                        disabled={disabled}
                        autoComplete="one-time-code" // Important for SMS autofill
                        className="absolute inset-0 opacity-0 w-full h-full pointer-events-none"
                        style={{ caretColor: "transparent" }} // Hide native caret
                        {...props}
                    />
                </div>
            </OTPInputContext.Provider>
        );
    }
);
OTPInput.displayName = "OTPInput";

// ============================================================================
// Group Component
// ============================================================================

const OTPGroup = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={clsx("flex items-center", className)} {...props} />
    )
);
OTPGroup.displayName = "OTPGroup";

// ============================================================================
// Slot Component
// ============================================================================

interface OTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}

const OTPSlot = forwardRef<HTMLDivElement, OTPSlotProps>(
    ({ index, className, ...props }, ref) => {
        const { value, isFocused, maxLength, hasFakeCaret } = useOTPInput();
        const char = value[index];
        const isActive = isFocused && index === Math.min(value.length, maxLength - 1);
        const hasValue = char !== undefined && char !== "";

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative flex size-10 items-center justify-center border-y border-r border-neutral-200 text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md dark:border-neutral-800",
                    isActive && "z-10 ring-2 ring-neutral-950 ring-offset-background dark:ring-neutral-300",
                    className
                )}
                {...props}
            >
                {char}
                {/* Fake Caret */}
                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="h-4 w-px animate-caret-blink bg-neutral-950 dark:bg-neutral-50 duration-1000" />
                    </div>
                )}
            </div>
        );
    }
);
OTPSlot.displayName = "OTPSlot";

// ============================================================================
// Separator Component
// ============================================================================

const OTPSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ ...props }, ref) => (
        <div ref={ref} role="presentation" {...props}>
            <div className="h-1 w-2 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        </div>
    )
);
OTPSeparator.displayName = "OTPSeparator";

export { OTPInput, OTPGroup, OTPSlot, OTPSeparator };
