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
                            "fixed inset-0 bg-black/50 backdrop-blur-sm",
                            "dark:bg-black/60",
                            "animate-in fade-in-0 duration-300",
                            "transition-all"
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
                "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700",
            danger:
                "bg-white dark:bg-neutral-900 border-error-300 dark:border-error-700",
            success:
                "bg-white dark:bg-neutral-900 border-success-300 dark:border-success-700",
            warning:
                "bg-white dark:bg-neutral-900 border-warning-300 dark:border-warning-700",
            info: "bg-white dark:bg-neutral-900 border-info-300 dark:border-info-700",
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
                    "rounded-lg border-2 shadow-2xl",
                    "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300",
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
            default: "border-neutral-200 dark:border-neutral-700",
            danger:
                "border-error-200 dark:border-error-700 bg-error-50/50 dark:bg-error-900/20",
            success:
                "border-success-200 dark:border-success-700 bg-success-50/50 dark:bg-success-900/20",
            warning:
                "border-warning-200 dark:border-warning-700 bg-warning-50/50 dark:bg-warning-900/20",
            info: "border-info-200 dark:border-info-700 bg-info-50/50 dark:bg-info-900/20",
        };

        const iconConfig = {
            default: { icon: Info, color: "text-neutral-600 dark:text-neutral-400" },
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
            default: "text-neutral-900 dark:text-white",
            danger: "text-error-900 dark:text-error-100",
            success: "text-success-900 dark:text-success-100",
            warning: "text-warning-900 dark:text-warning-100",
            info: "text-info-900 dark:text-info-100",
        };

        return (
            <Component
                ref={ref}
                id={labelledBy}
                className={clsx(
                    "text-xl font-primary font-bold leading-6",
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
            default: "text-neutral-600 dark:text-neutral-400",
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
                    "text-sm font-secondary mt-2 leading-relaxed",
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
                    "text-neutral-700 dark:text-neutral-300",
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
                "border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50",
            danger:
                "border-error-200 dark:border-error-700 bg-error-50/30 dark:bg-error-900/10",
            success:
                "border-success-200 dark:border-success-700 bg-success-50/30 dark:bg-success-900/10",
            warning:
                "border-warning-200 dark:border-warning-700 bg-warning-50/30 dark:bg-warning-900/10",
            info: "border-info-200 dark:border-info-700 bg-info-50/30 dark:bg-info-900/10",
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
                "text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300",
            danger:
                "text-error-400 hover:text-error-600 dark:text-error-500 dark:hover:text-error-300",
            success:
                "text-success-400 hover:text-success-600 dark:text-success-500 dark:hover:text-success-300",
            warning:
                "text-warning-400 hover:text-warning-600 dark:text-warning-500 dark:hover:text-warning-300",
            info: "text-info-400 hover:text-info-600 dark:text-info-500 dark:hover:text-info-300",
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
                    "rounded-md p-1 transition-all duration-200",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    "focus:outline-none focus-visible:ring-2",
                    "focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900",
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
