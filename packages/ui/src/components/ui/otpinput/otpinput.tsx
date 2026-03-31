// otpinput.tsx
// Composition: Root + context provider + hidden input

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
import type { OTPInputContextValue, OTPInputRootProps } from "./types";

// Context
const OTPInputContext = createContext<OTPInputContextValue | undefined>(undefined);

export const useOTPInput = () => {
    const context = useContext(OTPInputContext);
    if (!context) {
        throw new Error("OTPInput compound components must be used within OTPInput.Root");
    }
    return context;
};

// Root
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

        React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

        useEffect(() => {
            if (autoFocus) {
                inputRef.current?.focus();
            }
        }, [autoFocus]);

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

                    {/* Hidden Input */}
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
                        pattern="[0-9]*"
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

export default OTPInputRoot;
