"use client";

import {
    AlertCircle,
    CheckCircle,
    Eye,
    EyeClosed,
    HelpCircle,
    Loader2,
    Search,
    X,
} from "lucide-react";
import React, {
    InputHTMLAttributes,
    ReactNode,
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useId,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

type InputType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search";
type InputSize = "sm" | "md" | "lg";
type InputVariant = "default" | "filled" | "flushed";
type ValidationState = "default" | "error" | "warning" | "success";

interface TextInputContextValue {
    inputId: string;
    errorId: string;
    descriptionId: string;
    labelId: string;
    value: string;
    isFocused: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    isRequired: boolean;
    isLoading: boolean;
    validationState: ValidationState;
    hasValue: boolean;
    inputType: InputType;
    size: InputSize;
    variant: InputVariant;
    setValue: (value: string) => void;
    setFocused: (focused: boolean) => void;
    clearValue: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

const TextInputContext = createContext<TextInputContextValue | undefined>(
    undefined
);

const useTextInput = () => {
    const context = useContext(TextInputContext);
    if (!context) {
        throw new Error(
            "TextInput compound components must be used within TextInput.Root"
        );
    }
    return context;
};

// ============================================================================
// Root Component
// ============================================================================

interface TextInputRootProps {
    children: ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    inputType?: InputType;
    size?: InputSize;
    variant?: InputVariant;
    validationState?: ValidationState;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    loading?: boolean;
    className?: string;
}

const TextInputRoot = forwardRef<HTMLDivElement, TextInputRootProps>(
    (
        {
            children,
            value: controlledValue,
            defaultValue = "",
            onChange,
            inputType = "text",
            size = "md",
            variant = "default",
            validationState = "default",
            disabled = false,
            readOnly = false,
            required = false,
            loading = false,
            className = "",
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
        const [isFocused, setIsFocused] = useState(false);

        const baseId = useId();
        const inputId = `${baseId}-input`;
        const errorId = `${baseId}-error`;
        const descriptionId = `${baseId}-description`;
        const labelId = `${baseId}-label`;

        const isControlled = controlledValue !== undefined;
        const value = isControlled ? controlledValue : uncontrolledValue;

        const setValue = useCallback(
            (newValue: string) => {
                if (!isControlled) {
                    setUncontrolledValue(newValue);
                }
                onChange?.(newValue);
            },
            [isControlled, onChange]
        );

        const clearValue = useCallback(() => {
            setValue("");
        }, [setValue]);

        const hasValue = value.trim() !== "";

        const contextValue: TextInputContextValue = {
            inputId,
            errorId,
            descriptionId,
            labelId,
            value,
            isFocused,
            isDisabled: disabled,
            isReadOnly: readOnly,
            isRequired: required,
            isLoading: loading,
            validationState,
            hasValue,
            inputType,
            size,
            variant,
            setValue,
            setFocused: setIsFocused,
            clearValue,
            inputRef: inputRef as React.RefObject<HTMLInputElement>,
        };

        return (
            <TextInputContext.Provider value={contextValue}>
                <div ref={ref} className={`w-full ${className}`}>
                    {children}
                </div>
            </TextInputContext.Provider>
        );
    }
);

TextInputRoot.displayName = "TextInput.Root";

// ============================================================================
// Label Component
// ============================================================================

interface LabelProps {
    children: ReactNode;
    className?: string;
    optional?: boolean;
}

const Label: React.FC<LabelProps> = ({
    children,
    className = "",
    optional = false,
}) => {
    const { labelId, inputId, isRequired } = useTextInput();

    return (
        <label
            id={labelId}
            htmlFor={inputId}
            className={`block font-primary font-medium text-ground-950 dark:text-ground-50 mb-1.5 ${className}`}
        >
            {children}
            {isRequired && (
                <span className="text-error-500 ml-1" aria-hidden="true">
                    *
                </span>
            )}
            {optional && (
                <span className="text-ground-500 text-sm font-secondary font-normal ml-2">
                    (optional)
                </span>
            )}
        </label>
    );
};

Label.displayName = "TextInput.Label";

// ============================================================================
// Field Component (Input Container)
// ============================================================================

interface FieldProps {
    children: ReactNode;
    className?: string;
}

const Field: React.FC<FieldProps> = ({ children, className = "" }) => {
    const {
        isFocused,
        validationState,
        isDisabled,
        hasValue,
        size,
        variant,
        setFocused,
    } = useTextInput();

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-3 py-2.5 text-base",
        lg: "px-4 py-3 text-lg",
    };

    const variantClasses = {
        default: "bg-ground-50 dark:bg-ground-900 border border-ground-300 dark:border-ground-700 rounded",
        filled: "border-0 rounded bg-ground-100 dark:bg-ground-800",
        flushed: "border-0 border-b-2 rounded-none px-0",
    };

    const stateClasses = {
        default: isFocused
            ? "border-primary-400 dark:border-primary-400 ring-2 ring-primary-200 dark:ring-primary-900/30"
            : hasValue
                ? "border-primary-200 dark:border-primary-800"
                : "border-ground-300 dark:border-ground-700",
        error: "border-error-500 ring-2 ring-error-100 dark:ring-error-900/30",
        warning:
            "border-warning-500 ring-2 ring-warning-100 dark:ring-warning-900/30",
        success:
            "border-success-500 ring-2 ring-success-100 dark:ring-success-900/30",
    };

    return (
        <div
            className={`
                flex items-center gap-2 w-full transition-all duration-200
                bg-white dark:bg-ground-900
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                ${isFocused || validationState !== "default" ? stateClasses[validationState] : stateClasses.default}
                ${isDisabled ? "opacity-60 cursor-not-allowed bg-ground-50 dark:bg-ground-800" : ""}
                ${className}
            `}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            {children}
        </div>
    );
};

Field.displayName = "TextInput.Field";

// ============================================================================
// Input Component
// ============================================================================

interface InputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "size"
> {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", leftIcon, rightIcon, ...props }, ref) => {
        const {
            inputId,
            labelId,
            errorId,
            descriptionId,
            value,
            setValue,
            inputType,
            isDisabled,
            isReadOnly,
            isRequired,
            validationState,
            inputRef,
        } = useTextInput();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const mergedRef = (node: HTMLInputElement | null) => {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }
        };

        return (
            <>
                {leftIcon && (
                    <span className="text-ground-400 shrink-0">{leftIcon}</span>
                )}
                <input
                    ref={mergedRef}
                    id={inputId}
                    type={inputType}
                    value={value}
                    onChange={handleChange}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    required={isRequired}
                    aria-labelledby={labelId}
                    aria-describedby={`${descriptionId} ${validationState === "error" ? errorId : ""}`}
                    aria-invalid={validationState === "error"}
                    aria-required={isRequired}
                    className={`
                        flex-1 bg-transparent outline-none font-secondary
                        text-ground-900 dark:text-ground-50
                        placeholder:text-ground-400 dark:placeholder:text-ground-500
                        disabled:cursor-not-allowed
                        focus-visible:ring-0
                        ${className}
                    `}
                    {...props}
                />
                {rightIcon && (
                    <span className="text-ground-400 shrink-0">{rightIcon}</span>
                )}
            </>
        );
    }
);

Input.displayName = "TextInput.Input";

// ============================================================================
// Password Input (with toggle visibility)
// ============================================================================

interface PasswordInputProps extends InputProps { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    (props, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const { inputType } = useTextInput();

        if (inputType !== "password") {
            console.warn(
                "PasswordInput should only be used with inputType='password'"
            );
        }

        return (
            <>
                <Input ref={ref} {...props} type={showPassword ? "text" : "password"} />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-ground-400 hover:text-ground-600 dark:hover:text-ground-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                >
                    {showPassword ? (
                        <EyeClosed className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                </button>
            </>
        );
    }
);

PasswordInput.displayName = "TextInput.PasswordInput";

// ============================================================================
// Number Input (with validation)
// ============================================================================

type NumberType = "integer" | "decimal" | "positive" | "natural";

interface NumberInputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "size"
> {
    numberType?: NumberType;
    min?: number;
    max?: number;
    step?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({ numberType = "decimal", min, max, step, ...props }, ref) => {
        const { setValue, value } = useTextInput();

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.metaKey || e.ctrlKey) return;

            const key = e.key;
            const allowedKeys = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Tab",
                "Home",
                "End",
            ];

            if (allowedKeys.includes(key)) return;

            if (numberType === "integer" || numberType === "natural") {
                if (numberType === "natural") {
                    if (!/^\d$/.test(key)) {
                        e.preventDefault();
                    }
                } else {
                    if (!/^[\d-]$/.test(key)) {
                        e.preventDefault();
                    }
                }
            } else if (numberType === "decimal" || numberType === "positive") {
                if (numberType === "positive") {
                    if (!/^[\d.]$/.test(key)) {
                        e.preventDefault();
                    }
                } else {
                    if (!/^[\d.\-]$/.test(key)) {
                        e.preventDefault();
                    }
                }
            }
        };

        const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            const pastedData = e.clipboardData.getData("text");

            if (numberType === "natural") {
                if (!/^\d+$/.test(pastedData)) {
                    e.preventDefault();
                }
            } else if (numberType === "integer") {
                if (!/^-?\d+$/.test(pastedData)) {
                    e.preventDefault();
                }
            } else if (numberType === "positive") {
                if (!/^\d*\.?\d*$/.test(pastedData)) {
                    e.preventDefault();
                }
            } else if (numberType === "decimal") {
                if (!/^-?\d*\.?\d*$/.test(pastedData)) {
                    e.preventDefault();
                }
            }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const numValue = parseFloat(value);

            if (!isNaN(numValue)) {
                let constrainedValue = numValue;
                if (min !== undefined && numValue < min) {
                    constrainedValue = min;
                }
                if (max !== undefined && numValue > max) {
                    constrainedValue = max;
                }

                if (constrainedValue !== numValue) {
                    setValue(String(constrainedValue));
                }
            }

            props.onBlur?.(e);
        };

        return (
            <Input
                ref={ref}
                type="text"
                inputMode="numeric"
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onBlur={handleBlur}
                min={min}
                max={max}
                step={step}
                {...props}
            />
        );
    }
);

NumberInput.displayName = "TextInput.NumberInput";

// ============================================================================
// Search Input (with clear button)
// ============================================================================

interface SearchInputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "size"
> {
    onClear?: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ onClear, ...props }, ref) => {
        const { clearValue, hasValue } = useTextInput();

        const handleClear = () => {
            clearValue();
            onClear?.();
        };

        return (
            <>
                <Search className="w-5 h-5 text-ground-400" />
                <Input ref={ref} type="search" {...props} />
                {hasValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-ground-400 hover:text-ground-600 dark:hover:text-ground-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                        aria-label="Clear search"
                        tabIndex={-1}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </>
        );
    }
);

SearchInput.displayName = "TextInput.SearchInput";

// ============================================================================
// Helper Text Components
// ============================================================================

interface HelperTextProps {
    children: ReactNode;
    className?: string;
}

const Description: React.FC<HelperTextProps> = ({
    children,
    className = "",
}) => {
    const { descriptionId } = useTextInput();

    return (
        <p
            id={descriptionId}
            className={`mt-1.5 text-sm font-secondary text-ground-600 dark:text-ground-400 ${className}`}
        >
            {children}
        </p>
    );
};

Description.displayName = "TextInput.Description";

const ErrorMessage: React.FC<HelperTextProps> = ({
    children,
    className = "",
}) => {
    const { errorId, validationState } = useTextInput();

    if (validationState !== "error") return null;

    return (
        <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className={`mt-1.5 text-sm font-secondary text-error-600 dark:text-error-400 flex items-center gap-1.5 ${className}`}
        >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{children}</span>
        </p>
    );
};

ErrorMessage.displayName = "TextInput.ErrorMessage";

const WarningMessage: React.FC<HelperTextProps> = ({
    children,
    className = "",
}) => {
    const { validationState } = useTextInput();

    if (validationState !== "warning") return null;

    return (
        <p
            role="status"
            aria-live="polite"
            className={`mt-1.5 text-sm font-secondary text-warning-600 dark:text-warning-400 flex items-center gap-1.5 ${className}`}
        >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{children}</span>
        </p>
    );
};

WarningMessage.displayName = "TextInput.WarningMessage";

const SuccessMessage: React.FC<HelperTextProps> = ({
    children,
    className = "",
}) => {
    const { validationState } = useTextInput();

    if (validationState !== "success") return null;

    return (
        <p
            role="status"
            aria-live="polite"
            className={`mt-1.5 text-sm font-secondary text-success-600 dark:text-success-400 flex items-center gap-1.5 ${className}`}
        >
            <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{children}</span>
        </p>
    );
};

SuccessMessage.displayName = "TextInput.SuccessMessage";

// ============================================================================
// Icon Component
// ============================================================================

interface IconProps {
    children: ReactNode;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ children, className = "" }) => {
    return (
        <span className={`text-ground-400 flex items-center ${className}`}>
            {children}
        </span>
    );
};

Icon.displayName = "TextInput.Icon";

// ============================================================================
// Loading Spinner
// ============================================================================

const LoadingSpinner: React.FC = () => {
    const { isLoading } = useTextInput();

    if (!isLoading) return null;

    return (
        <Loader2
            className="w-5 h-5 text-primary-500 animate-spin"
            aria-label="Loading"
        />
    );
};

LoadingSpinner.displayName = "TextInput.LoadingSpinner";

// ============================================================================
// Tooltip Component
// ============================================================================

interface TooltipProps {
    content: string;
    children?: ReactNode;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    className = "",
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative inline-flex">
            <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="text-ground-400 hover:text-ground-600 dark:hover:text-ground-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1"
                aria-label="More information"
                tabIndex={-1}
            >
                {children || <HelpCircle className="w-5 h-5" />}
            </button>
            {showTooltip && (
                <div
                    role="tooltip"
                    className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-ground-900 dark:bg-ground-700 text-white text-sm font-secondary rounded shadow-outer whitespace-nowrap z-50 ${className}`}
                >
                    {content}
                    <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-ground-900 dark:bg-ground-700 transform rotate-45" />
                </div>
            )}
        </div>
    );
};

Tooltip.displayName = "TextInput.Tooltip";

// ============================================================================
// Character Count Component
// ============================================================================

interface CharacterCountProps {
    maxLength: number;
    showCount?: "always" | "focus" | "near-limit";
    threshold?: number;
    className?: string;
}

const CharacterCount: React.FC<CharacterCountProps> = ({
    maxLength,
    showCount = "always",
    threshold = 0.8,
    className = "",
}) => {
    const { value, isFocused } = useTextInput();
    const currentLength = value.length;
    const remaining = maxLength - currentLength;
    const percentage = currentLength / maxLength;
    const isNearLimit = percentage >= threshold;

    const shouldShow =
        showCount === "always" ||
        (showCount === "focus" && isFocused) ||
        (showCount === "near-limit" && isNearLimit);

    if (!shouldShow) return null;

    return (
        <p
            className={`mt-1.5 text-sm font-secondary text-right ${
                remaining < 0
                    ? "text-error-600 dark:text-error-400"
                    : isNearLimit
                        ? "text-warning-600 dark:text-warning-400"
                        : "text-ground-600 dark:text-ground-400"
            } ${className}`}
            aria-live="polite"
            aria-atomic="true"
        >
            {currentLength} / {maxLength}
        </p>
    );
};

CharacterCount.displayName = "TextInput.CharacterCount";

// ============================================================================
// Clear Button Component
// ============================================================================

interface ClearButtonProps {
    onClear?: () => void;
    className?: string;
}

const ClearButton: React.FC<ClearButtonProps> = ({
    onClear,
    className = "",
}) => {
    const { clearValue, hasValue } = useTextInput();

    if (!hasValue) return null;

    const handleClear = () => {
        clearValue();
        onClear?.();
    };

    return (
        <button
            type="button"
            onClick={handleClear}
            className={`text-ground-400 hover:text-ground-600 dark:hover:text-ground-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded p-1 ${className}`}
            aria-label="Clear input"
            tabIndex={-1}
        >
            <X className="w-4 h-4" />
        </button>
    );
};

ClearButton.displayName = "TextInput.ClearButton";

// ============================================================================
// Exports
// ============================================================================

export const TextInput = {
    Root: TextInputRoot,
    Label,
    Field,
    Input,
    PasswordInput,
    NumberInput,
    SearchInput,
    Description,
    ErrorMessage,
    WarningMessage,
    SuccessMessage,
    Icon,
    LoadingSpinner,
    Tooltip,
    CharacterCount,
    ClearButton,
};

export { useTextInput };
export type {
    InputSize,
    InputType,
    InputVariant,
    NumberType,
    TextInputContextValue,
    ValidationState,
};
