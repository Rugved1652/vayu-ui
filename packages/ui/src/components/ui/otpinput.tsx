"use client";

import React, {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";
import { clsx } from "clsx";

// ============================================================================
// Types
// ============================================================================

interface OTPInputContextValue {
    value: string;
    isFocused: boolean;
    maxLength: number;
    disabled: boolean;
    id: string;
}

const OTPInputContext = createContext<OTPInputContextValue | undefined>(undefined);

const useOTPInput = () => {
    const context = useContext(OTPInputContext);
    if (!context) {
        throw new Error("OTPInput compound components must be used within OTPInput.Root");
    }
    return context;
};

// ============================================================================
// Root Component
// ============================================================================

interface OTPInputRootProps
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
     * Accessible label for the input
     */
    label?: string;
    /**
     * Render prop for slots and separators
     */
    children?: React.ReactNode;
}

const OTPInputRoot = forwardRef<HTMLInputElement, OTPInputRootProps>(
    (
        {
            value: controlledValue,
            onChange,
            maxLength = 6,
            containerClassName,
            onComplete,
            label = "One-time password",
            className,
            children,
            autoFocus,
            disabled,
            id: providedId,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState("");
        const [isFocused, setIsFocused] = useState(false);
        const inputRef = useRef<HTMLInputElement>(null);
        const generatedId = useId();
        const id = providedId ?? generatedId;

        const value = controlledValue ?? internalValue;

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value.replace(/\D/g, "").slice(0, maxLength);
            if (newValue.length <= maxLength) {
                setInternalValue(newValue);
                onChange?.(newValue);
                if (newValue.length === maxLength) {
                    onComplete?.(newValue);
                }
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace" && value.length > 0) {
                const newValue = value.slice(0, -1);
                setInternalValue(newValue);
                onChange?.(newValue);
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
                    disabled: disabled ?? false,
                    id,
                }}
            >
                <div
                    role="group"
                    aria-label={label}
                    aria-disabled={disabled}
                    className={clsx(
                        "relative flex items-center justify-center cursor-text select-none",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !disabled && inputRef.current?.focus()}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            !disabled && inputRef.current?.focus();
                        }
                    }}
                    tabIndex={disabled ? -1 : 0}
                >
                    {/* Visual Container */}
                    <div className={clsx("flex items-center gap-2", className)}>
                        {children}
                    </div>

                    {/* Hidden Input for managing state and focus */}
                    <input
                        ref={inputRef}
                        id={id}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        maxLength={maxLength}
                        disabled={disabled}
                        disabled={disabled}
                        aria-label={label}
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        pattern={`[0-9]*{${maxLength}}`}
                        className="absolute inset-0 opacity-0 w-full h-full pointer-events-none"
                        style={{ caretColor: "transparent" }}
                        {...props}
                    />
                </div>
            </OTPInputContext.Provider>
        );
    }
);
OTPInputRoot.displayName = "OTPInput.Root";

// ============================================================================
// Group Component
// ============================================================================

interface OTPInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const OTPInputGroup = forwardRef<HTMLDivElement, OTPInputGroupProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            role="presentation"
            className={clsx("flex items-center", className)}
            {...props}
        >
            {children}
        </div>
    )
);
OTPInputGroup.displayName = "OTPInput.Group";

// ============================================================================
// Slot Component
// ============================================================================

interface OTPInputSlotProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}

const OTPInputSlot = forwardRef<HTMLDivElement, OTPInputSlotProps>(
    ({ index, className, ...props }, ref) => {
        const { value, isFocused, maxLength, disabled, id } = useOTPInput();
        const char = value[index];
        const isActive = isFocused && index === Math.min(value.length, maxLength - 1);
        const hasValue = char !== undefined && char !== "";

        return (
            <div
                ref={ref}
                role="presentation"
                aria-hidden="true"
                className={clsx(
                    // Base styles with design tokens
                    "relative flex size-10 items-center justify-center",
                    "border-y border-r border-ground-300 dark:border-ground-700",
                    "text-sm text-ground-700 dark:text-ground-300",
                    "transition-all duration-150",
                    // First and last rounded corners using system radius
                    "first:rounded-l first:border-l",
                    "last:rounded-r",
                    // Active/focus state with ring
                    isActive && [
                        "z-10",
                        "ring-2 ring-ground-950 dark:ring-ground-100",
                        "ring-offset-background",
                    ],
                    // Filled state
                    hasValue && "bg-ground-50 dark:bg-ground-900",
                    // Disabled state
                    disabled && "opacity-50",
                    className
                )}
                {...props}
            >
                <span className="font-secondary">{char}</span>
                {/* Fake Caret */}
                {isActive && !disabled && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                    >
                        <div
                            className={clsx(
                                "h-4 w-0.5 bg-ground-950 dark:bg-ground-50",
                                "animate-caret-blink"
                            )}
                        />
                    </div>
                )}
            </div>
        );
    }
);
OTPInputSlot.displayName = "OTPInput.Slot";

// ============================================================================
// Separator Component
// ============================================================================

interface OTPInputSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const OTPInputSeparator = forwardRef<HTMLDivElement, OTPInputSeparatorProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            role="presentation"
            aria-hidden="true"
            className={clsx("flex items-center justify-center px-2", className)}
            {...props}
        >
            {children ?? (
                <div className="h-1.5 w-1.5 bg-ground-400 dark:bg-ground-600" />
            )}
        </div>
    )
);
OTPInputSeparator.displayName = "OTPInput.Separator";

// ============================================================================
// Compound Export
// ============================================================================

const OTPInput = Object.assign(OTPInputRoot, {
    Root: OTPInputRoot,
    Group: OTPInputGroup,
    Slot: OTPInputSlot,
    Separator: OTPInputSeparator,
});

export { OTPInput, OTPInputRoot, OTPInputGroup, OTPInputSlot, OTPInputSeparator };