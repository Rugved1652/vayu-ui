"use client";
import { AlertCircle } from "lucide-react";
import React, {
    TextareaHTMLAttributes,
    useState,
    forwardRef,
    createContext,
    useContext,
    useId,
    useEffect,
} from "react";

export type TextAreaResize = "none" | "vertical" | "horizontal" | "both";
export type TextAreaVariant = "default" | "outline";
export type TextAreaSize = "sm" | "md" | "lg";

// Context for sharing state between compound components
interface TextAreaContextValue {
    isFocused: boolean;
    setIsFocused: (focused: boolean) => void;
    charCount: number;
    setCharCount: (count: number) => void;
    maxLength?: number;
    error?: boolean;
    variant: TextAreaVariant;
    size: TextAreaSize;
    disabled?: boolean;
    inputId: string;
    supportTextId: string;
    errorTextId: string;
    labelId: string;
    setLabelId: (id: string) => void;
    hasSupportText: boolean;
    setHasSupportText: (has: boolean) => void;
}

const TextAreaContext = createContext<TextAreaContextValue | undefined>(
    undefined
);

const useTextAreaContext = () => {
    const context = useContext(TextAreaContext);
    if (!context) {
        throw new Error(
            "TextArea compound components must be used within TextArea.Root"
        );
    }
    return context;
};

// Root Component
interface TextAreaRootProps {
    children: React.ReactNode;
    variant?: TextAreaVariant;
    size?: TextAreaSize;
    error?: boolean;
    maxLength?: number;
    disabled?: boolean;
    className?: string;
}

const TextAreaRoot = ({
    children,
    variant = "default",
    size = "md",
    error = false,
    maxLength,
    disabled = false,
    className = "",
}: TextAreaRootProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [hasSupportText, setHasSupportText] = useState(false);

    // Generate unique IDs for accessibility
    const generatedId = useId();
    const inputId = `textarea-input-${generatedId}`;
    const supportTextId = `textarea-support-${generatedId}`;
    const errorTextId = `textarea-error-${generatedId}`;
    const labelId = `textarea-label-${generatedId}`;

    return (
        <TextAreaContext.Provider
            value={{
                isFocused,
                setIsFocused,
                charCount,
                setCharCount,
                maxLength,
                error,
                variant,
                size,
                disabled,
                inputId,
                supportTextId,
                errorTextId,
                labelId,
                setLabelId: () => {}, // No-op since we're using generated ID
                hasSupportText,
                setHasSupportText,
            }}
        >
            <div
                className={`w-full flex flex-col gap-1 ${className}`}
                role="group"
                aria-labelledby={labelId}
            >
                {children}
            </div>
        </TextAreaContext.Provider>
    );
};

// Label Component
interface TextAreaLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    showCharCount?: boolean;
}

const TextAreaLabel = ({
    children,
    showCharCount = false,
    className = "",
    ...props
}: TextAreaLabelProps) => {
    const { charCount, maxLength, inputId, labelId } = useTextAreaContext();

    return (
        <div className="flex items-center justify-between px-2">
            <label
                id={labelId}
                htmlFor={inputId}
                className={`font-primary text-ground-800 dark:text-ground-100 text-sm font-medium ${className}`}
                {...props}
            >
                {children}
            </label>
            {showCharCount && (
                <span
                    className="text-xs font-secondary text-ground-500 dark:text-ground-400"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {charCount}
                    {maxLength && `/${maxLength}`}
                </span>
            )}
        </div>
    );
};

// Input Component
interface TextAreaInputProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    resize?: TextAreaResize;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
    (
        {
            resize = "vertical",
            rows = 4,
            value,
            onChange,
            className = "",
            "aria-describedby": ariaDescribedBy,
            ...restProps
        },
        ref
    ) => {
        const {
            isFocused,
            setIsFocused,
            setCharCount,
            maxLength,
            error,
            variant,
            size,
            disabled,
            inputId,
            supportTextId,
            errorTextId,
            hasSupportText,
        } = useTextAreaContext();

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCharCount(e.target.value.length);
            if (onChange) {
                onChange(e);
            }
        };

        const getResizeClass = () => {
            switch (resize) {
                case "none":
                    return "resize-none";
                case "vertical":
                    return "resize-y";
                case "horizontal":
                    return "resize-x";
                case "both":
                    return "resize";
                default:
                    return "resize-y";
            }
        };

        const sizeConfig = {
            sm: {
                wrapper: "px-2.5 py-1.5",
                text: "text-sm",
            },
            md: {
                wrapper: "px-3 py-2.5",
                text: "text-base",
            },
            lg: {
                wrapper: "px-4 py-3",
                text: "text-lg",
            },
        };

        const config = sizeConfig[size];

        const variantStyles = {
            default: {
                wrapper: `bg-white dark:bg-ground-900 border-2 ${error
                        ? "border-error-500 dark:border-error-600"
                        : isFocused
                            ? "border-primary-500 dark:border-primary-600"
                            : "border-ground-300 dark:border-ground-700"
                    } hover:border-primary-400 dark:hover:border-primary-600`,
            },
            outline: {
                wrapper: `bg-transparent border-2 ${error
                        ? "border-error-500 dark:border-error-600"
                        : isFocused
                            ? "border-primary-500 dark:border-primary-600"
                            : "border-ground-300 dark:border-ground-700"
                    } hover:border-primary-400 dark:hover:border-primary-600`,
            },
        };

        const styles = variantStyles[variant];

        // Build aria-describedby from context and any additional IDs
        // Only include support text ID if SupportText component is rendered
        const describedBy = [
            hasSupportText && supportTextId,
            error && errorTextId,
            ariaDescribedBy,
        ].filter(Boolean).join(" ") || undefined;

        // Determine if field is required from restProps
        const isRequired = restProps.required === true;

        return (
            <div
                className={`${styles.wrapper} ${config.wrapper} flex gap-3 w-full rounded outline-0 transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                <textarea
                    ref={ref}
                    id={inputId}
                    className={`w-full bg-transparent outline-0 font-secondary text-ground-900 dark:text-ground-100 placeholder:text-ground-500 ${config.text
                        } ${getResizeClass()} ${disabled ? "cursor-not-allowed" : ""
                        } focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${className}`}
                    rows={rows}
                    value={value}
                    onChange={handleChange}
                    onFocus={(e) => {
                        setIsFocused(true);
                        restProps.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        restProps.onBlur?.(e);
                    }}
                    maxLength={maxLength}
                    disabled={disabled}
                    aria-invalid={error}
                    aria-describedby={describedBy}
                    aria-errormessage={error ? errorTextId : undefined}
                    aria-required={isRequired}
                    aria-disabled={disabled}
                    {...restProps}
                />
            </div>
        );
    }
);

TextAreaInput.displayName = "TextAreaInput";

// Support Text Component
interface TextAreaSupportTextProps {
    children: string | string[];
    className?: string;
}

const TextAreaSupportText = ({ children, className = "" }: TextAreaSupportTextProps) => {
    const { supportTextId, setHasSupportText } = useTextAreaContext();

    // Register that support text exists for aria-describedby
    useEffect(() => {
        setHasSupportText(true);
        return () => setHasSupportText(false);
    }, [setHasSupportText]);

    if (typeof children === "string") {
        return (
            <p
                id={supportTextId}
                className={`text-xs font-secondary text-ground-600 dark:text-ground-400 px-2 ${className}`}
            >
                {children}
            </p>
        );
    }

    return (
        <ul
            id={supportTextId}
            className={`text-xs font-secondary text-ground-600 dark:text-ground-400 px-2 list-disc list-inside space-y-1 ${className}`}
        >
            {children.map((text, idx) => (
                <li key={idx}>{text}</li>
            ))}
        </ul>
    );
};

// Error Text Component
interface TextAreaErrorTextProps {
    children: string | string[];
    className?: string;
}

const TextAreaErrorText = ({ children, className = "" }: TextAreaErrorTextProps) => {
    const { errorTextId } = useTextAreaContext();

    if (typeof children === "string") {
        return (
            <p
                id={errorTextId}
                role="alert"
                className={`text-xs font-secondary text-error-600 dark:text-error-400 px-2 flex items-center gap-1 ${className}`}
            >
                <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                {children}
            </p>
        );
    }

    return (
        <ul
            id={errorTextId}
            role="alert"
            className={`text-xs font-secondary text-error-600 dark:text-error-400 px-2 list-disc list-inside space-y-1 ${className}`}
        >
            {children.map((text, idx) => (
                <li key={idx}>{text}</li>
            ))}
        </ul>
    );
};

// Character Count Component (standalone)
interface TextAreaCharCountProps {
    className?: string;
}

const TextAreaCharCount = ({ className = "" }: TextAreaCharCountProps) => {
    const { charCount, maxLength } = useTextAreaContext();

    return (
        <span
            className={`text-xs font-secondary text-ground-500 dark:text-ground-400 px-2 ${className}`}
            aria-live="polite"
            aria-atomic="true"
        >
            {charCount}
            {maxLength && `/${maxLength}`}
        </span>
    );
};

// Export compound component
export const TextArea = {
    Root: TextAreaRoot,
    Label: TextAreaLabel,
    Input: TextAreaInput,
    SupportText: TextAreaSupportText,
    ErrorText: TextAreaErrorText,
    CharCount: TextAreaCharCount,
};