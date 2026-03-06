import React, { HTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "./utils";

// ============================================================================
// Types & Interfaces
// ============================================================================

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertRootProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    children: React.ReactNode;
}

interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    children: React.ReactNode;
}

interface AlertDismissProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: AlertVariant;
    alertTitle?: string;
}

// ============================================================================
// Styling Maps
// ============================================================================

const variantStyles: Record<AlertVariant, string> = {
    info: "bg-info-100 border-info-200 text-info-900 dark:bg-info-950 dark:border-info-800 dark:text-info-100",
    success: "bg-success-100 border-success-200 text-success-900 dark:bg-success-950 dark:border-success-800 dark:text-success-100",
    warning: "bg-warning-100 border-warning-200 text-warning-900 dark:bg-warning-950 dark:border-warning-800 dark:text-warning-100",
    error: "bg-error-100 border-error-200 text-error-900 dark:bg-error-950 dark:border-error-800 dark:text-error-100",
};

const variantIconStyles: Record<AlertVariant, string> = {
    info: "text-info-600 dark:text-info-400",
    success: "text-success-600 dark:text-success-400",
    warning: "text-warning-600 dark:text-warning-400",
    error: "text-error-600 dark:text-error-400",
};

const variantFocusStyles: Record<AlertVariant, string> = {
    info: "focus-visible:ring-info-500 dark:focus-visible:ring-info-400",
    success: "focus-visible:ring-success-500 dark:focus-visible:ring-success-400",
    warning: "focus-visible:ring-warning-500 dark:focus-visible:ring-warning-400",
    error: "focus-visible:ring-error-500 dark:focus-visible:ring-error-400",
};

const variantRole: Record<AlertVariant, "alert" | "status"> = {
    info: "status",
    success: "status",
    warning: "alert",
    error: "alert",
};

const variantLive: Record<AlertVariant, "polite" | "assertive"> = {
    info: "polite",
    success: "polite",
    warning: "assertive",
    error: "assertive",
};

// ============================================================================
// Alert Root Component
// ============================================================================

const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(({
    variant = "info",
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            role={variantRole[variant]}
            aria-live={variantLive[variant]}
            aria-atomic="true"
            className={cn(
                "relative flex gap-3 p-4 border rounded w-full",
                variantStyles[variant],
                className
            )}
            data-variant={variant}
            {...props}
        >
            {children}
        </div>
    );
});
AlertRoot.displayName = "Alert";

// ============================================================================
// Alert Icon Component
// ============================================================================

const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(({
    variant = "info",
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "shrink-0",
                variantIconStyles[variant],
                className
            )}
            aria-hidden="true"
            {...props}
        >
            {children}
        </div>
    );
});
AlertIcon.displayName = "Alert.Icon";

// ============================================================================
// Alert Title Component
// ============================================================================

const AlertTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <h5
            ref={ref}
            className={cn(
                "font-primary font-semibold mb-1 leading-none tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h5>
    );
});
AlertTitle.displayName = "Alert.Title";

// ============================================================================
// Alert Description Component
// ============================================================================

const AlertDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "font-secondary text-para [&_p]:leading-relaxed",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
AlertDescription.displayName = "Alert.Description";

// ============================================================================
// Alert Dismiss Component
// ============================================================================

const AlertDismiss = forwardRef<HTMLButtonElement, AlertDismissProps>(({
    variant = "info",
    alertTitle,
    className,
    children,
    onClick,
    ...props
}, ref) => {
    const defaultIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );

    const ariaLabel = alertTitle
        ? `Dismiss ${variant} alert: ${alertTitle}`
        : `Dismiss ${variant} alert`;

    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            className={cn(
                "absolute top-4 right-4 rounded p-1 transition-colors",
                "hover:bg-ground-200 dark:hover:bg-ground-800",
                "focus-visible:outline-none focus-visible:ring-2 ring-offset-2",
                variantIconStyles[variant],
                variantFocusStyles[variant],
                className
            )}
            aria-label={ariaLabel}
            {...props}
        >
            {children || defaultIcon}
        </button>
    );
});
AlertDismiss.displayName = "Alert.Dismiss";

// ============================================================================
// Content Wrapper Component
// ============================================================================

const AlertContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex-1 pr-6", className)}
            {...props}
        >
            {children}
        </div>
    );
});
AlertContent.displayName = "Alert.Content";

// ============================================================================
// Compound Component Export
// ============================================================================

export const Alert = Object.assign(AlertRoot, {
    Icon: AlertIcon,
    Title: AlertTitle,
    Description: AlertDescription,
    Dismiss: AlertDismiss,
    Content: AlertContent,
});

export default Alert;