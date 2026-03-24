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
    hasError: boolean;
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
    /**
     * Whether the input has an error
     */
    hasError?: boolean;
    /**
     * ID of the element that describes the error message
     */
    errorMessageId?: string;
}

const OTPInputRoot = forwardRef<HTMLInputElement, OTPInputRootProps>(
    (
        {
            value: controlledValue,
            onChange,
            maxLength = 6,
            onComplete,
            label = "One-time password",
            className,
            children,
            autoFocus,
            disabled,
            id: providedId,
            hasError = false,
            errorMessageId,
            "aria-describedby": ariaDescribedBy,
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
            setInternalValue(newValue);
            onChange?.(newValue);
            if (newValue.length === maxLength) {
                onComplete?.(newValue);
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

        // Combine aria-describedby references
        const describedBy = [ariaDescribedBy, errorMessageId].filter(Boolean).join(" ") || undefined;

        return (
            <OTPInputContext.Provider
                value={{
                    value,
                    isFocused,
                    maxLength,
                    disabled: disabled ?? false,
                    id,
                    hasError,
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
                        aria-label={label}
                        aria-invalid={hasError}
                        aria-errormessage={errorMessageId}
                        aria-describedby={describedBy}
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        pattern={`[0-9]*`}
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
                    // Base styles with design tokens
                    "relative flex size-10 items-center justify-center",
                    "border-y border-r rounded-control",
                    "text-sm transition-all duration-150",
                    // Border colors using semantic tokens
                    hasError
                        ? "border-destructive"
                        : "border-field",
                    // Text colors using semantic tokens
                    hasError
                        ? "text-destructive"
                        : "text-surface-content",
                    // First and last rounded corners
                    "first:rounded-l first:border-l",
                    "last:rounded-r",
                    // Active/focus state with ring using semantic tokens
                    isActive && [
                        "z-10",
                        hasError
                            ? "ring-2 ring-destructive"
                            : "ring-2 ring-focus",
                        "ring-offset-canvas",
                    ],
                    // Filled state using semantic tokens
                    hasValue && !hasError && "bg-muted",
                    hasValue && hasError && "bg-destructive/10",
                    // Disabled state
                    disabled && "opacity-50",
                    className
                )}
                {...props}
            >
                <span className="font-secondary">{char}</span>
                {/* Fake Caret - only show when slot is empty */}
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
                <div className="h-1.5 w-1.5 rounded-full bg-muted-content" />
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
