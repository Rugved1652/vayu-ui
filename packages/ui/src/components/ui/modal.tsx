"use client";

import { clsx } from "clsx";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import React, {
    ButtonHTMLAttributes,
    createContext,
    forwardRef,
    HTMLAttributes,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Types & Interfaces
// ============================================================================

type ModalVariant = "default" | "danger" | "success" | "warning" | "info";
type ModalSize =
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";

interface ModalContextValue {
    isOpen: boolean;
    onClose: () => void;
    variant: ModalVariant;
    size: ModalSize;
    closeOnOverlayClick: boolean;
    closeOnEscape: boolean;
    showCloseButton: boolean;
    labelledBy: string;
    describedBy: string;
}

// ============================================================================
// Context
// ============================================================================

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("Modal compound components must be used within Modal");
    }
    return context;
};

// ============================================================================
// Main Modal Component
// ============================================================================

interface ModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    variant?: ModalVariant;
    size?: ModalSize;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    centered?: boolean;
    preventScroll?: boolean;
    initialFocus?: React.RefObject<HTMLElement>;
    restoreFocus?: boolean;
    children: React.ReactNode;
    className?: string;
}

const ModalRoot = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            open = false,
            onOpenChange,
            variant = "default",
            size = "md",
            closeOnOverlayClick = true,
            closeOnEscape = true,
            showCloseButton = true,
            centered = true,
            preventScroll = true,
            initialFocus,
            restoreFocus = true,
            className,
            children,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(open);
        const [mounted, setMounted] = useState(false);
        const overlayRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const previousFocusRef = useRef<HTMLElement | null>(null);

        // Generate unique IDs for ARIA
        const modalId = useRef(`modal-${Math.random().toString(36).substr(2, 9)}`);
        const labelledBy = `${modalId.current}-title`;
        const describedBy = `${modalId.current}-description`;

        // Mount check for portal
        useEffect(() => {
            setMounted(true);
        }, []);

        // Update internal state when prop changes
        useEffect(() => {
            setIsOpen(open);
        }, [open]);

        const handleClose = () => {
            setIsOpen(false);
            onOpenChange?.(false);
        };

        const handleOverlayClick = (e: React.MouseEvent) => {
            if (closeOnOverlayClick && e.target === overlayRef.current) {
                handleClose();
            }
        };

        // Handle escape key
        useEffect(() => {
            if (!isOpen) return;

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape" && closeOnEscape) {
                    e.preventDefault();
                    handleClose();
                }
            };

            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }, [isOpen, closeOnEscape]);

        // Focus management
        useEffect(() => {
            if (!isOpen) return;

            // Store previously focused element
            previousFocusRef.current = document.activeElement as HTMLElement;

            // Focus management after modal opens
            const timeoutId = setTimeout(() => {
                if (initialFocus?.current) {
                    // Focus on specified element
                    initialFocus.current.focus();
                } else {
                    // Auto-focus on first focusable element
                    const focusableElements =
                        contentRef.current?.querySelectorAll<HTMLElement>(
                            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
                        );

                    if (focusableElements && focusableElements.length > 0) {
                        // Skip close button and focus on first interactive element
                        const filtered = Array.from(focusableElements).filter(
                            (el) => el.getAttribute("aria-label") !== "Close modal"
                        );

                        if (filtered.length > 0) {
                            filtered[0].focus();
                        } else {
                            // Fallback to modal title or content
                            const titleElement =
                                contentRef.current?.querySelector<HTMLElement>(
                                    `#${labelledBy}`
                                );
                            if (titleElement) {
                                titleElement.setAttribute("tabindex", "-1");
                                titleElement.focus();
                            } else {
                                contentRef.current?.focus();
                            }
                        }
                    }
                }
            }, 100);

            return () => {
                clearTimeout(timeoutId);
                // Restore focus when modal closes
                if (restoreFocus && previousFocusRef.current) {
                    previousFocusRef.current.focus();
                }
            };
        }, [isOpen, initialFocus, restoreFocus]);

        // Focus trap
        useEffect(() => {
            if (!isOpen) return;

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key !== "Tab") return;

                const focusableElements =
                    contentRef.current?.querySelectorAll<HTMLElement>(
                        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
                    );

                if (!focusableElements || focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            document.addEventListener("keydown", handleTabKey);
            return () => document.removeEventListener("keydown", handleTabKey);
        }, [isOpen]);

        // Prevent body scroll when modal is open
        useEffect(() => {
            if (!isOpen || !preventScroll) return;

            const originalStyle = window.getComputedStyle(document.body).overflow;
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            return () => {
                document.body.style.overflow = originalStyle;
                document.body.style.paddingRight = "";
            };
        }, [isOpen, preventScroll]);

        const contextValue: ModalContextValue = {
            isOpen,
            onClose: handleClose,
            variant,
            size,
            closeOnOverlayClick,
            closeOnEscape,
            showCloseButton,
            labelledBy,
            describedBy,
        };

        if (!mounted || !isOpen) {
            return null;
        }

        return createPortal(
            <ModalContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={clsx("fixed inset-0 z-50", className)}
                    role="presentation"
                >
                    {/* Overlay */}
                    <div
                        ref={overlayRef}
                        className={clsx(
                            "fixed inset-0 bg-black/50",
                            "animate-fade-in",
                            "duration-75"
                            
                        )}
                        onClick={handleOverlayClick}
                        aria-hidden="true"
                    />

                    {/* Modal content container */}
                    <div
                        className={clsx(
                            "fixed inset-0 z-10 overflow-y-auto",
                            centered
                                ? "flex items-center justify-center"
                                : "flex items-start justify-center pt-16",
                            "p-4"
                        )}
                    >
                        <div ref={contentRef}>{children}</div>
                    </div>
                </div>
            </ModalContext.Provider>,
            document.body
        );
    }
);

ModalRoot.displayName = "Modal";

// ============================================================================
// Modal Content
// ============================================================================

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Content = forwardRef<HTMLDivElement, ModalContentProps>(
    ({ className, children, ...props }, ref) => {
        const { variant, size, labelledBy, describedBy } = useModalContext();

        const sizeClasses = {
            sm: "max-w-sm",
            md: "max-w-md",
            lg: "max-w-lg",
            xl: "max-w-xl",
            "2xl": "max-w-2xl",
            "3xl": "max-w-3xl",
            "4xl": "max-w-4xl",
            "5xl": "max-w-5xl",
            "6xl": "max-w-6xl",
            full: "max-w-[calc(100vw-2rem)] min-h-[calc(100vh-2rem)]",
        };

        const variantClasses = {
            default:
                "bg-ground-100 dark:bg-ground-900 border-ground-300 dark:border-ground-700",
            danger:
                "bg-ground-100 dark:bg-ground-900 border-error-600 dark:border-error-500",
            success:
                "bg-ground-100 dark:bg-ground-900 border-success-600 dark:border-success-500",
            warning:
                "bg-ground-100 dark:bg-ground-900 border-warning-600 dark:border-warning-500",
            info: "bg-ground-100 dark:bg-ground-900 border-info-600 dark:border-info-500",
        };

        return (
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                aria-describedby={describedBy}
                tabIndex={-1}
                className={clsx(
                    "relative w-full",
                    "rounded border-2 shadow-outer",
                    "animate-zoom-in",
                    
                    "focus:outline-none",
                    sizeClasses[size],
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Content.displayName = "Modal.Content";

// ============================================================================
// Modal Header
// ============================================================================

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    showIcon?: boolean;
}

const Header = forwardRef<HTMLDivElement, ModalHeaderProps>(
    ({ className, children, showIcon = true, ...props }, ref) => {
        const { variant, showCloseButton } = useModalContext();

        const variantClasses = {
            default: "border-ground-300 dark:border-ground-700",
            danger:
                "border-error-600 dark:border-error-500 bg-error-100 dark:bg-error-950",
            success:
                "border-success-600 dark:border-success-500 bg-success-100 dark:bg-success-950",
            warning:
                "border-warning-600 dark:border-warning-500 bg-warning-100 dark:bg-warning-950",
            info: "border-info-600 dark:border-info-500 bg-info-100 dark:bg-info-950",
        };

        const iconConfig = {
            default: { icon: Info, color: "text-ground-600 dark:text-ground-400" },
            danger: {
                icon: AlertCircle,
                color: "text-error-600 dark:text-error-400",
            },
            success: {
                icon: CheckCircle,
                color: "text-success-600 dark:text-success-400",
            },
            warning: {
                icon: AlertTriangle,
                color: "text-warning-600 dark:text-warning-400",
            },
            info: { icon: Info, color: "text-info-600 dark:text-info-400" },
        };

        const IconComponent = iconConfig[variant].icon;

        return (
            <div
                ref={ref}
                className={clsx(
                    "flex items-start gap-3 p-6 border-b-2",
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {showIcon && variant !== "default" && (
                    <div className="shrink-0" aria-hidden="true">
                        <IconComponent
                            className={clsx("w-6 h-6", iconConfig[variant].color)}
                        />
                    </div>
                )}
                <div className="flex-1 min-w-0">{children}</div>
                {showCloseButton && (
                    <div className="shrink-0">
                        <Close />
                    </div>
                )}
            </div>
        );
    }
);

Header.displayName = "Modal.Header";

// ============================================================================
// Modal Title
// ============================================================================

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title = forwardRef<HTMLHeadingElement, ModalTitleProps>(
    ({ className, children, as: Component = "h2", ...props }, ref) => {
        const { variant, labelledBy } = useModalContext();

        const variantClasses = {
            default: "text-ground-800 dark:text-ground-100",
            danger: "text-error-800 dark:text-error-100",
            success: "text-success-800 dark:text-success-100",
            warning: "text-warning-800 dark:text-warning-100",
            info: "text-info-800 dark:text-info-100",
        };

        return (
            <Component
                ref={ref}
                id={labelledBy}
                className={clsx(
                    "text-h4 font-primary font-bold leading-6",
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Title.displayName = "Modal.Title";

// ============================================================================
// Modal Description
// ============================================================================

interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

const Description = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        const { variant, describedBy } = useModalContext();

        const variantClasses = {
            default: "text-ground-600 dark:text-ground-400",
            danger: "text-error-700 dark:text-error-300",
            success: "text-success-700 dark:text-success-300",
            warning: "text-warning-700 dark:text-warning-300",
            info: "text-info-700 dark:text-info-300",
        };

        return (
            <p
                ref={ref}
                id={describedBy}
                className={clsx(
                    "text-para font-secondary mt-2 leading-relaxed",
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {children}
            </p>
        );
    }
);

Description.displayName = "Modal.Description";

// ============================================================================
// Modal Body
// ============================================================================

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Body = forwardRef<HTMLDivElement, ModalBodyProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "p-6 font-secondary",
                    "text-ground-700 dark:text-ground-300",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Body.displayName = "Modal.Body";

// ============================================================================
// Modal Footer
// ============================================================================

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    align?: "left" | "center" | "right" | "between";
}

const Footer = forwardRef<HTMLDivElement, ModalFooterProps>(
    ({ className, children, align = "right", ...props }, ref) => {
        const { variant } = useModalContext();

        const variantClasses = {
            default:
                "border-ground-300 dark:border-ground-700 bg-ground-200/50 dark:bg-ground-800/50",
            danger:
                "border-error-600 dark:border-error-500 bg-error-100/50 dark:bg-error-950/20",
            success:
                "border-success-600 dark:border-success-500 bg-success-100/50 dark:bg-success-950/20",
            warning:
                "border-warning-600 dark:border-warning-500 bg-warning-100/50 dark:bg-warning-950/20",
            info: "border-info-600 dark:border-info-500 bg-info-100/50 dark:bg-info-950/20",
        };

        const alignClasses = {
            left: "justify-start",
            center: "justify-center",
            right: "justify-end",
            between: "justify-between",
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    "flex items-center gap-3 p-6 border-t-2",
                    variantClasses[variant],
                    alignClasses[align],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Footer.displayName = "Modal.Footer";

// ============================================================================
// Modal Close Button
// ============================================================================

interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    asChild?: boolean;
}

const Close = forwardRef<HTMLButtonElement, ModalCloseProps>(
    ({ className, children, asChild = false, onClick, ...props }, ref) => {
        const { onClose, variant } = useModalContext();

        const variantClasses = {
            default:
                "text-ground-500 hover:text-ground-700 dark:text-ground-400 dark:hover:text-ground-300",
            danger:
                "text-error-500 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300",
            success:
                "text-success-500 hover:text-success-700 dark:text-success-400 dark:hover:text-success-300",
            warning:
                "text-warning-500 hover:text-warning-700 dark:text-warning-400 dark:hover:text-warning-300",
            info: "text-info-500 hover:text-info-700 dark:text-info-400 dark:hover:text-info-300",
        };

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            onClose();
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: handleClick,
            });
        }

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                aria-label="Close modal"
                className={clsx(
                    "rounded p-1 transition-colors",
                    "[transition-duration:var(--transition-fast)]",
                    "hover:bg-ground-200 dark:hover:bg-ground-800",
                    "focus:outline-none focus-visible:ring-2",
                    "focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-ground-100 dark:focus-visible:ring-offset-ground-900",
                    "disabled:pointer-events-none disabled:opacity-50",
                    variantClasses[variant],
                    className
                )}
                {...props}
            >
                {children || <X className="h-5 w-5" aria-hidden="true" />}
            </button>
        );
    }
);

Close.displayName = "Modal.Close";

// ============================================================================
// Modal Trigger (Optional helper component)
// ============================================================================

interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    asChild?: boolean;
}

const Trigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
    ({ className, children, asChild = false, ...props }, ref) => {
        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref,
                ...props,
            });
        }

        return (
            <button ref={ref} type="button" className={className} {...props}>
                {children}
            </button>
        );
    }
);

Trigger.displayName = "Modal.Trigger";

// ============================================================================
// Compound Component Export
// ============================================================================

export const Modal = Object.assign(ModalRoot, {
    Content,
    Header,
    Title,
    Description,
    Body,
    Footer,
    Close,
    Trigger,
});

export type {
    ModalBodyProps,
    ModalCloseProps,
    ModalContentProps,
    ModalDescriptionProps,
    ModalFooterProps,
    ModalHeaderProps,
    ModalProps,
    ModalSize,
    ModalTitleProps,
    ModalTriggerProps,
    ModalVariant,
};