"use client";

import React, { HTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "./utils";
import { XIcon } from "../icons/x-icon";

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
    info: "bg-info/10 border-info/30 text-canvas-content",
    success: "bg-success/10 border-success/30 text-canvas-content",
    warning: "bg-warning/10 border-warning/30 text-canvas-content",
    error: "bg-destructive/10 border-destructive/30 text-canvas-content",
};

const variantIconStyles: Record<AlertVariant, string> = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
};

const variantFocusStyles: Record<AlertVariant, string> = {
    info: "focus-visible:ring-info",
    success: "focus-visible:ring-success",
    warning: "focus-visible:ring-warning",
    error: "focus-visible:ring-destructive",
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
                "relative flex gap-3 p-4 border rounded-surface w-full font-secondary",
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
                "font-primary font-semibold mb-1 text-h5 leading-none tracking-tight",
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
                "font-secondary text-para leading-relaxed",
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
    onClick,
    ...props
}, ref) => {
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
                "hover:bg-black/10 dark:hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "ring-offset-surface",
                variantIconStyles[variant],
                variantFocusStyles[variant],
                className
            )}
            aria-label={ariaLabel}
            {...props}
        >
            <XIcon />
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
            className={cn("flex-1 pr-10", className)}
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