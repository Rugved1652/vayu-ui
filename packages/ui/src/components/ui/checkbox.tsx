"use client";
import { clsx } from "clsx";
import React, {
    createContext,
    forwardRef,
    InputHTMLAttributes,
    HTMLAttributes,
    useContext,
    useRef,
    useId,
    useLayoutEffect,
    useState,
    useEffect,
} from "react";

import { CheckIcon } from "../icons/check-icon";
import { MinusIcon } from "../icons/minus-icon";

// ============================================================================
// Context
// ============================================================================

interface CheckboxContextValue {
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    error: boolean;
    checkboxId: string;
    errorId: string;
    descriptionId: string;
    name?: string;
    value?: string;
    required?: boolean;
    onChange: (checked: boolean) => void;
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

const useCheckboxContext = () => {
    const context = useContext(CheckboxContext);
    if (!context) {
        throw new Error("Checkbox compound components must be used within Checkbox.Root");
    }
    return context;
};

// ============================================================================
// Types
// ============================================================================

interface CheckboxRootProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    error?: boolean;
    onChange?: (checked: boolean) => void;
    name?: string;
    value?: string;
    required?: boolean;
}

interface CheckboxIndicatorProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {}

interface CheckboxLabelProps extends HTMLAttributes<HTMLLabelElement> {}

interface CheckboxDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

interface CheckboxErrorProps extends HTMLAttributes<HTMLParagraphElement> {}

// ============================================================================
// Root Component
// ============================================================================

const CheckboxRoot = forwardRef<HTMLDivElement, CheckboxRootProps>(
    (
        {
            checked: controlledChecked,
            defaultChecked = false,
            indeterminate = false,
            disabled = false,
            error = false,
            onChange,
            name,
            value,
            required,
            className,
            children,
            id,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const checkboxId = id || `checkbox-${generatedId}`;
        const errorId = `${checkboxId}-error`;
        const descriptionId = `${checkboxId}-description`;

        // Internal state for uncontrolled mode
        const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
        
        const isControlled = controlledChecked !== undefined;
        const checked = isControlled ? controlledChecked : internalChecked;

        const handleChange = (newChecked: boolean) => {
            if (!isControlled) {
                setInternalChecked(newChecked);
            }
            onChange?.(newChecked);
        };

        const contextValue: CheckboxContextValue = {
            checked,
            indeterminate,
            disabled,
            error,
            checkboxId,
            errorId,
            descriptionId,
            name,
            value,
            required,
            onChange: handleChange,
        };

        return (
            <CheckboxContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={clsx("flex flex-col gap-1", className)}
                    {...props}
                >
                    {children}
                </div>
            </CheckboxContext.Provider>
        );
    }
);

CheckboxRoot.displayName = "Checkbox.Root";

// ============================================================================
// Indicator Component (the actual input + visual)
// ============================================================================

const CheckboxIndicator = forwardRef<HTMLInputElement, CheckboxIndicatorProps>(
    ({ className, ...props }, ref) => {
        const { checked, indeterminate, disabled, error, checkboxId, errorId, descriptionId, onChange, name, value, required } = useCheckboxContext();
        const localInputRef = useRef<HTMLInputElement>(null);

        // Merge refs
        const setRefs = (node: HTMLInputElement | null) => {
            localInputRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        // Handle indeterminate state
        useLayoutEffect(() => {
            if (localInputRef.current) {
                localInputRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate]);

        // Build aria-describedby (client-side only to avoid SSR issues)
        const [describedBy, setDescribedBy] = useState<string | undefined>(undefined);

        useEffect(() => {
            const hasError = error && document.getElementById(errorId);
            const hasDescription = document.getElementById(descriptionId);
            const ids = [
                hasError ? errorId : null,
                hasDescription ? descriptionId : null,
            ]
                .filter(Boolean)
                .join(" ") || undefined;
            setDescribedBy(ids);
        }, [error, errorId, descriptionId]);

        return (
            <div className="relative inline-flex items-center">
                {/* Hidden native input */}
                <input
                    ref={setRefs}
                    type="checkbox"
                    id={checkboxId}
                    checked={checked}
                    disabled={disabled}
                    name={name}
                    value={value}
                    required={required}
                    onChange={(e) => onChange(e.target.checked)}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={describedBy}
                    className={clsx(
                        "peer absolute w-5 h-5 opacity-0",
                        disabled ? "cursor-not-allowed" : "cursor-pointer",
                        className
                    )}
                    {...props}
                />

                {/* Custom visual indicator */}
                <div
                    className={clsx(
                        "pointer-events-none",
                        "relative flex items-center justify-center",
                        "h-5 w-5 rounded border-2 transition-all duration-200",
                        
                        // Base unchecked state
                        "bg-white border-ground-400",
                        "dark:bg-ground-800 dark:border-ground-500",

                        // Focus state (WCAG 2.2 AA)
                        "peer-focus-visible:outline-none",
                        "peer-focus-visible:ring-[3px] peer-focus-visible:ring-primary-500/50",
                        "peer-focus-visible:border-primary-500",

                        // Checked state (not indeterminate)
                        !indeterminate && "peer-checked:bg-primary-600 peer-checked:border-primary-600",
                        !indeterminate && "dark:peer-checked:bg-primary-500 dark:peer-checked:border-primary-500",

                        // Indeterminate state (overrides checked)
                        indeterminate && "bg-primary-600 border-primary-600",
                        indeterminate && "dark:bg-primary-500 dark:border-primary-500",

                        // Error state
                        error && !checked && !indeterminate && "border-error-500 dark:border-error-400",

                        // Hover state
                        !disabled && !indeterminate && "hover:border-primary-500 dark:hover:border-primary-400",
                        !disabled && "peer-checked:hover:bg-primary-700 dark:peer-checked:hover:bg-primary-600",
                        !disabled && indeterminate && "hover:bg-primary-700 dark:hover:bg-primary-600",

                        // Disabled state
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                    aria-hidden="true"
                >
                    {indeterminate ? (
                        <MinusIcon
                            size={14}
                            className="text-white pointer-events-none"
                        />
                    ) : (
                        <CheckIcon
                            size={14}
                            className={clsx(
                                "text-white pointer-events-none transition-opacity duration-200",
                                checked ? "opacity-100" : "opacity-0"
                            )}
                        />
                    )}
                </div>
            </div>
        );
    }
);

CheckboxIndicator.displayName = "Checkbox.Indicator";

// ============================================================================
// Label Component
// ============================================================================

const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabelProps>(
    ({ className, children, ...props }, ref) => {
        const { checkboxId, disabled } = useCheckboxContext();

        return (
            <label
                ref={ref}
                htmlFor={checkboxId}
                className={clsx(
                    "text-sm font-medium text-ground-900 dark:text-ground-100",
                    "select-none",
                    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                    className
                )}
                {...props}
            >
                {children}
            </label>
        );
    }
);

CheckboxLabel.displayName = "Checkbox.Label";

// ============================================================================
// Description Component
// ============================================================================

const CheckboxDescription = forwardRef<HTMLParagraphElement, CheckboxDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        const { descriptionId, disabled } = useCheckboxContext();

        return (
            <p
                ref={ref}
                id={descriptionId}
                className={clsx(
                    "text-sm text-ground-600 dark:text-ground-400",
                    disabled && "opacity-50",
                    className
                )}
                {...props}
            >
                {children}
            </p>
        );
    }
);

CheckboxDescription.displayName = "Checkbox.Description";

// ============================================================================
// Error Component
// ============================================================================

const CheckboxError = forwardRef<HTMLParagraphElement, CheckboxErrorProps>(
    ({ className, children, ...props }, ref) => {
        const { errorId } = useCheckboxContext();

        return (
            <p
                ref={ref}
                id={errorId}
                className={clsx(
                    "text-sm text-error-600 dark:text-error-400 font-medium",
                    className
                )}
                role="alert"
                aria-live="polite"
                {...props}
            >
                {children}
            </p>
        );
    }
);

CheckboxError.displayName = "Checkbox.Error";

// ============================================================================
// Exports
// ============================================================================

export const Checkbox = Object.assign(CheckboxRoot, {
    Indicator: CheckboxIndicator,
    Label: CheckboxLabel,
    Description: CheckboxDescription,
    Error: CheckboxError,
});

export type {
    CheckboxRootProps,
    CheckboxIndicatorProps,
    CheckboxLabelProps,
    CheckboxDescriptionProps,
    CheckboxErrorProps,
};