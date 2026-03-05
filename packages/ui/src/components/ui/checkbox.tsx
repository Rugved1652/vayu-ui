"use client";

import { clsx } from "clsx";
import { Check, Minus } from "lucide-react";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    useContext,
    useEffect,
    useRef,
    useId,
} from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

type CheckboxSize = "sm" | "md" | "lg";
type CheckboxVariant =
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
type CheckboxOrientation = "vertical" | "horizontal";

interface CheckboxContextValue {
    size: CheckboxSize;
    variant: CheckboxVariant;
    disabled: boolean;
    error: boolean;
}

// ============================================================================
// Context
// ============================================================================

const CheckboxContext = createContext<CheckboxContextValue | undefined>(
    undefined
);

const useCheckboxContext = () => {
    return useContext(CheckboxContext);
};

// ============================================================================
// Main Checkbox Component
// ============================================================================

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: React.ReactNode;
    description?: string;
    size?: CheckboxSize;
    variant?: CheckboxVariant;
    indeterminate?: boolean;
    error?: boolean;
    errorText?: string;
    containerClassName?: string;
    labelClassName?: string;
}

const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            label,
            description,
            size: sizeProp,
            variant: variantProp,
            indeterminate = false,
            error: errorProp = false,
            errorText,
            containerClassName,
            labelClassName,
            className,
            disabled: disabledProp = false,
            id,
            checked,
            defaultChecked,
            onChange,
            ...props
        },
        ref
    ) => {
        const context = useCheckboxContext();
        const localInputRef = useRef<HTMLInputElement>(null);
        // We need to support both external ref and internal ref for indeterminate
        // Simple merge ref logic:
        const setRefs = (node: HTMLInputElement | null) => {
            localInputRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        const size = sizeProp || context?.size || "md";
        const variant = variantProp || context?.variant || "primary";
        const disabled = disabledProp || context?.disabled || false;
        const error = errorProp || context?.error || false;


        const generatedId = useId();
        const checkboxId = id || `checkbox-${generatedId}`;

        // Handle Indeterminate
        useEffect(() => {
            if (localInputRef.current) {
                localInputRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate]);

        // We track checked state for styling if not controlled, or use props if controlled
        // Since we are wrapping the input, we can just let React handle the checked state propagation to the input
        // But for the Custom Box styling, we need to know if it is checked.
        // If controlled: props.checked is truthy.
        // If uncontrolled: we might need internal state or use CSS :checked selector (peer-checked).
        // The previous implementation used standard CSS peer-checked, which is better for perf and specificty!
        // So we will stick to CSS-based styling where possible.

        return (
            <div className={clsx("flex flex-col", containerClassName)}>
                <Label
                    htmlFor={checkboxId}
                    size={size}
                    disabled={disabled}
                    hasContent={!!(label || description)}
                >
                    <Input
                        ref={setRefs}
                        id={checkboxId}
                        disabled={disabled}
                        checked={checked}
                        defaultChecked={defaultChecked}
                        onChange={onChange}
                        className={className}
                        {...props}
                    />

                    {/* 
                        We pass 'checked' prop to Box only if we want JS control. 
                        But standard CSS :checked is better. 
                        However, 'indeterminate' is not easily selectable via CSS in all browsers without pseudo-class :indeterminate.
                        Let's rely on peer-checked and peer-indeterminate.
                    */}
                    <Box
                        size={size}
                        variant={variant}
                        error={error}
                        disabled={disabled}
                        // We don't necessarily need 'checked' prop here if we use peer-checked classes!
                        // But for the Icon rendering, we might need to know.
                        // Actually, we can just render the icon always and hide/show with CSS?
                        // Or just use the prop. Since this is React, using props is fine for the icon.
                        checked={checked}
                        indeterminate={indeterminate}
                    />

                    {(label || description) && (
                        <Content
                            label={label}
                            description={description}
                            size={size}
                            disabled={disabled}
                            labelClassName={labelClassName}
                        />
                    )}
                </Label>

                {error && errorText && <ErrorText size={size}>{errorText}</ErrorText>}
            </div>
        );
    }
);

CheckboxRoot.displayName = "Checkbox";

// ============================================================================
// Label
// ============================================================================

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    size: CheckboxSize;
    disabled: boolean;
    hasContent: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ children, size, disabled, hasContent, className, ...props }, ref) => (
        <label
            ref={ref}
            className={clsx(
                "inline-flex items-start select-none",
                hasContent && "gap-3",
                !disabled && "cursor-pointer group",
                disabled && "cursor-not-allowed",
                className
            )}
            {...props}
        >
            {children}
        </label>
    )
);
Label.displayName = "Checkbox.Label";

// ============================================================================
// Input
// ============================================================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            type="checkbox"
            className={clsx(
                "peer sr-only",
                className
            )}
            {...props}
        />
    )
);
Input.displayName = "Checkbox.Input";

// ============================================================================
// Box
// ============================================================================

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    size: CheckboxSize;
    variant: CheckboxVariant;
    error: boolean;
    disabled: boolean;
    checked?: boolean;
    indeterminate?: boolean;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
    ({ size, variant, error, disabled, checked, indeterminate, className, ...props }, ref) => {
        const sizeClasses = {
            sm: "size-4",
            md: "size-5",
            lg: "size-6",
        };

        const variantClasses = {
            primary: "peer-checked:bg-primary-600 peer-checked:border-primary-600 dark:peer-checked:bg-primary-500 dark:peer-checked:border-primary-500 peer-focus-visible:ring-primary-500",
            secondary: "peer-checked:bg-secondary-600 peer-checked:border-secondary-600 dark:peer-checked:bg-secondary-500 dark:peer-checked:border-secondary-500 peer-focus-visible:ring-secondary-500",
            success: "peer-checked:bg-success-600 peer-checked:border-success-600 dark:peer-checked:bg-success-500 dark:peer-checked:border-success-500 peer-focus-visible:ring-success-500",
            warning: "peer-checked:bg-warning-600 peer-checked:border-warning-600 dark:peer-checked:bg-warning-500 dark:peer-checked:border-warning-500 peer-focus-visible:ring-warning-500",
            error: "peer-checked:bg-error-600 peer-checked:border-error-600 dark:peer-checked:bg-error-500 dark:peer-checked:border-error-500 peer-focus-visible:ring-error-500",
            info: "peer-checked:bg-info-600 peer-checked:border-info-600 dark:peer-checked:bg-info-500 dark:peer-checked:border-info-500 peer-focus-visible:ring-info-500",
        };

        // For indeterminate, we want similar styling to checked
        const activeVariantClass = variantClasses[error ? "error" : variant];

        return (
            <div
                ref={ref}
                className={clsx(
                    "shrink-0 flex items-center justify-center",
                    "rounded border-2 transition-all duration-200",
                    "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600",
                    // Focus ring on the Box when Input is focused
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-neutral-900",
                    // Checked State (via CSS peer)
                    activeVariantClass,
                    // Indeterminate State (we append the checked classes if indeterminate prop is passed, 
                    // OR we can use peer-indeterminate if supported, but indeterminate is a PROP on the input ref, usually handled via JS)
                    // Since we have `indeterminate` prop here, we can force the style.
                    indeterminate && [
                        error ? "bg-error-600 border-error-600" : "bg-primary-600 border-primary-600",
                        // Override background for variant if needed, but primary is default
                        variant === 'secondary' && "bg-secondary-600 border-secondary-600",
                        // ... map others if indeterminate needs specific variant color
                    ],

                    disabled && "opacity-50 cursor-not-allowed",
                    !disabled && "group-hover:border-primary-500 dark:group-hover:border-primary-400 peer-checked:group-hover:border-transparent",
                    error && "border-error-500 dark:border-error-400",

                    sizeClasses[size],
                    className
                )}
                aria-hidden="true"
                {...props}
            >
                {/* 
                    We display the Icon. 
                    We can use CSS to show/hide based on peer-checked, 
                    BUT peer-checked doesn't know about indeterminate easily without extra CSS.
                    So we will render both and let CSS hide/show or use JS.
                */}
                <Icon size={size} indeterminate={indeterminate} className="pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                {indeterminate && (
                    <Icon size={size} indeterminate={true} className="pointer-events-none absolute" />
                )}
            </div>
        );
    }
);
Box.displayName = "Checkbox.Box";

// ============================================================================
// Icon
// ============================================================================

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    indeterminate?: boolean;
    size: CheckboxSize;
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(
    ({ indeterminate, size, className, ...props }, ref) => {
        const iconSizes = {
            sm: 12,
            md: 14,
            lg: 16,
        }
        return (
            <span
                ref={ref}
                className={clsx("text-white flex items-center justify-center", className)}
                {...props}
            >
                {indeterminate ? (
                    <Minus strokeWidth={3} size={iconSizes[size]} />
                ) : (
                    <Check strokeWidth={3} size={iconSizes[size]} />
                )}
            </span>
        );
    }
);
Icon.displayName = "Checkbox.Icon";


// ============================================================================
// Content / Text Wrappers
// ============================================================================

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    description?: string;
    size: CheckboxSize;
    disabled: boolean;
    labelClassName?: string;
}

const Content = forwardRef<HTMLDivElement, ContentProps>(
    ({ label, description, size, disabled, labelClassName, className, ...props }, ref) => (
        <div ref={ref} className={clsx("flex-1 pt-0.5 select-none", className)} {...props}>
            {label && (
                <LabelText size={size} disabled={disabled} className={labelClassName}>
                    {label}
                </LabelText>
            )}
            {description && (
                <Description size={size} disabled={disabled}>
                    {description}
                </Description>
            )}
        </div>
    )
);
Content.displayName = "Checkbox.Content";

interface LabelTextProps extends HTMLAttributes<HTMLSpanElement> {
    size: CheckboxSize;
    disabled: boolean;
}

const LabelText = forwardRef<HTMLSpanElement, LabelTextProps>(
    ({ size, disabled, className, ...props }, ref) => {
        const sizeClasses = {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
        };
        return (
            <span
                ref={ref}
                className={clsx(
                    "block font-medium font-primary text-neutral-900 dark:text-neutral-100",
                    sizeClasses[size],
                    disabled && "opacity-50",
                    className
                )}
                {...props}
            />
        );
    }
);
LabelText.displayName = "Checkbox.LabelText";


interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    size: CheckboxSize;
    disabled: boolean;
}

const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
    ({ size, disabled, className, ...props }, ref) => {
        const sizeClasses = {
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
        };
        return (
            <p
                ref={ref}
                className={clsx(
                    "text-neutral-500 dark:text-neutral-400 font-secondary mt-0.5",
                    sizeClasses[size],
                    disabled && "opacity-50",
                    className
                )}
                {...props}
            />
        );
    }
);
Description.displayName = "Checkbox.Description";

// ============================================================================
// Error Text
// ============================================================================

interface ErrorTextProps extends HTMLAttributes<HTMLParagraphElement> {
    size: CheckboxSize;
}

const ErrorText = forwardRef<HTMLParagraphElement, ErrorTextProps>(
    ({ size, className, ...props }, ref) => {
        const marginClasses = {
            sm: "ml-7",
            md: "ml-8",
            lg: "ml-9",
        };
        return (
            <p
                ref={ref}
                className={clsx(
                    "text-xs font-secondary text-error-500 dark:text-error-400 mt-1",
                    marginClasses[size],
                    className
                )}
                role="alert"
                {...props}
            />
        );
    }
);
ErrorText.displayName = "Checkbox.ErrorText";


// ============================================================================
// Group Components
// ============================================================================

interface CheckboxGroupProps extends HTMLAttributes<HTMLFieldSetElement> {
    label?: string;
    description?: string;
    error?: boolean;
    errorText?: string;
    orientation?: CheckboxOrientation;
    size?: CheckboxSize;
    variant?: CheckboxVariant;
    disabled?: boolean;
    required?: boolean;
}

const Group = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
    (
        {
            children,
            label,
            description,
            error = false,
            errorText,
            orientation = "vertical",
            size = "md",
            variant = "primary",
            disabled = false,
            required = false,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <CheckboxContext.Provider value={{ size, variant, disabled, error }}>
                <fieldset
                    ref={ref}
                    disabled={disabled}
                    aria-invalid={error}
                    aria-required={required}
                    className={clsx("flex flex-col gap-3", className)}
                    {...props}
                >
                    {(label || description) && (
                        <div className="mb-1">
                            {label && (
                                <legend className="block font-medium font-primary text-sm text-neutral-900 dark:text-neutral-100">
                                    {label}
                                    {required && <span className="text-error-500 ml-1">*</span>}
                                </legend>
                            )}
                            {description && (
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-secondary">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                    <div className={clsx("flex gap-4", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap")}>
                        {children}
                    </div>
                    {error && errorText && (
                        <p className="text-xs text-error-500 dark:text-error-400 mt-1 font-secondary" role="alert">
                            {errorText}
                        </p>
                    )}
                </fieldset>
            </CheckboxContext.Provider>
        );
    }
);
Group.displayName = "Checkbox.Group";

// ============================================================================
// Exports
// ============================================================================

export const Checkbox = Object.assign(CheckboxRoot, {
    Label,
    Input,
    Box,
    Icon,
    Content,
    LabelText,
    Description,
    ErrorText,
    Group,
});

export type {
    CheckboxProps,
    CheckboxGroupProps,
    CheckboxSize,
    CheckboxVariant,
};
