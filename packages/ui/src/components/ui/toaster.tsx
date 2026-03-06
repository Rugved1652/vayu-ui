"use client";
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle,
    Info,
    Loader2,
    X,
} from "lucide-react";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
    forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";

// ============================================================================
// Types
// ============================================================================

type ToastType = "success" | "error" | "warning" | "info" | "loading";
type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export interface Toast {
    id: string;
    type: ToastType;
    title?: ReactNode;
    description?: ReactNode;
    duration?: number;
    position?: ToastPosition;
    action?: {
        label: ReactNode;
        onClick: () => void;
    };
    onClose?: () => void;
    dismissible?: boolean;
    icon?: ReactNode;
    customContent?: ReactNode;
}

export interface ToastOptions {
    type?: ToastType;
    title?: ReactNode;
    description?: ReactNode;
    duration?: number;
    position?: ToastPosition;
    action?: {
        label: ReactNode;
        onClick: () => void;
    };
    onClose?: () => void;
    dismissible?: boolean;
    icon?: ReactNode;
    customContent?: ReactNode;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (options: ToastOptions) => string;
    removeToast: (id: string) => void;
    updateToast: (id: string, options: Partial<ToastOptions>) => void;
    success: (message: ReactNode, options?: Omit<ToastOptions, "type">) => string;
    error: (message: ReactNode, options?: Omit<ToastOptions, "type">) => string;
    warning: (message: ReactNode, options?: Omit<ToastOptions, "type">) => string;
    info: (message: ReactNode, options?: Omit<ToastOptions, "type">) => string;
    loading: (message: ReactNode, options?: Omit<ToastOptions, "type">) => string;
    custom: (
        content: ReactNode,
        options?: Omit<ToastOptions, "type" | "customContent">
    ) => string;
    promise: <T>(
        promise: Promise<T>,
        messages: {
            loading: ReactNode;
            success: ReactNode | ((data: T) => ReactNode);
            error: ReactNode | ((error: unknown) => ReactNode);
        },
        options?: Omit<ToastOptions, "type">
    ) => Promise<T>;
}

// ============================================================================
// Context & Provider
// ============================================================================

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
};

interface ToastProviderProps {
    children: React.ReactNode;
    defaultPosition?: ToastPosition;
    maxToasts?: number;
    defaultDuration?: number;
}

const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    defaultPosition = "top-right",
    maxToasts = 5,
    defaultDuration = 5000,
}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback(
        (options: ToastOptions): string => {
            const id = Math.random().toString(36).substring(2, 9);
            const toast: Toast = {
                id,
                type: options.type || "info",
                title: options.title,
                description: options.description,
                duration: options.duration ?? defaultDuration,
                position: options.position || defaultPosition,
                action: options.action,
                onClose: options.onClose,
                dismissible: options.dismissible ?? true,
                icon: options.icon,
                customContent: options.customContent,
            };

            setToasts((prev) => {
                const newToasts = [toast, ...prev];
                return newToasts.slice(0, maxToasts);
            });

            return id;
        },
        [maxToasts, defaultDuration, defaultPosition]
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const updateToast = useCallback(
        (id: string, options: Partial<ToastOptions>) => {
            setToasts((prev) =>
                prev.map((toast) =>
                    toast.id === id
                        ? {
                            ...toast,
                            ...options,
                            type: options.type || toast.type,
                        }
                        : toast
                )
            );
        },
        []
    );

    const success = useCallback(
        (message: ReactNode, options?: Omit<ToastOptions, "type">) => {
            return addToast({ ...options, type: "success", description: message });
        },
        [addToast]
    );

    const error = useCallback(
        (message: ReactNode, options?: Omit<ToastOptions, "type">) => {
            return addToast({ ...options, type: "error", description: message });
        },
        [addToast]
    );

    const warning = useCallback(
        (message: ReactNode, options?: Omit<ToastOptions, "type">) => {
            return addToast({ ...options, type: "warning", description: message });
        },
        [addToast]
    );

    const info = useCallback(
        (message: ReactNode, options?: Omit<ToastOptions, "type">) => {
            return addToast({ ...options, type: "info", description: message });
        },
        [addToast]
    );

    const loading = useCallback(
        (message: ReactNode, options?: Omit<ToastOptions, "type">) => {
            return addToast({
                ...options,
                type: "loading",
                description: message,
                duration: 0,
                dismissible: false,
            });
        },
        [addToast]
    );

    const custom = useCallback(
        (
            content: ReactNode,
            options?: Omit<ToastOptions, "type" | "customContent">
        ) => {
            return addToast({
                ...options,
                type: "info",
                customContent: content,
            });
        },
        [addToast]
    );

    const promise = useCallback(
        async <T,>(
            promise: Promise<T>,
            messages: {
                loading: ReactNode;
                success: ReactNode | ((data: T) => ReactNode);
                error: ReactNode | ((error: unknown) => ReactNode);
            },
            options?: Omit<ToastOptions, "type">
        ): Promise<T> => {
            const toastId = loading(messages.loading, options);

            try {
                const data = await promise;
                const successMessage =
                    typeof messages.success === "function"
                        ? messages.success(data)
                        : messages.success;
                updateToast(toastId, {
                    type: "success",
                    description: successMessage,
                    duration: defaultDuration,
                    dismissible: true,
                });
                return data;
            } catch (err) {
                const errorMessage =
                    typeof messages.error === "function"
                        ? messages.error(err)
                        : messages.error;
                updateToast(toastId, {
                    type: "error",
                    description: errorMessage,
                    duration: defaultDuration,
                    dismissible: true,
                });
                throw err;
            }
        },
        [loading, updateToast, defaultDuration]
    );

    return (
        <ToastContext.Provider
            value={{
                toasts,
                addToast,
                removeToast,
                updateToast,
                success,
                error,
                warning,
                info,
                loading,
                custom,
                promise,
            }}
        >
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

// ============================================================================
// Internal Container & Items
// ============================================================================

interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    toasts,
    onRemove,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Group toasts by position
    const toastsByPosition = toasts.reduce(
        (acc, toast) => {
            const position = toast.position || "top-right";
            if (!acc[position]) {
                acc[position] = [];
            }
            acc[position].push(toast);
            return acc;
        },
        {} as Record<ToastPosition, Toast[]>
    );

    const positionClasses: Record<ToastPosition, string> = {
        "top-left": "top-4 left-4 items-start",
        "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
        "top-right": "top-4 right-4 items-end",
        "bottom-left": "bottom-4 left-4 items-start",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
        "bottom-right": "bottom-4 right-4 items-end",
    };

    return createPortal(
        <>
            {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
                <div
                    key={position}
                    className={clsx(
                        "fixed z-100 flex flex-col gap-2 pointer-events-none",
                        positionClasses[position as ToastPosition]
                    )}
                    style={{ maxWidth: "calc(100vw - 2rem)" }}
                    role="region"
                    aria-label={`Notifications ${position}`}
                    aria-live="polite"
                >
                    {positionToasts.map((toast) => (
                        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
                    ))}
                </div>
            ))}
        </>,
        document.body
    );
};

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-dismiss logic
    useEffect(() => {
        if (toast.duration && toast.duration > 0 && !isPaused) {
            const startTime = Date.now();
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(
                    0,
                    100 - (elapsed / (toast?.duration ?? 0)) * 100
                );
                setProgress(remaining);

                if (remaining === 0) {
                    clearInterval(interval);
                }
            }, 16);

            const timer = setTimeout(() => {
                handleClose();
            }, toast.duration);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [toast.duration, isPaused, toast.id]);

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            onRemove(toast.id);
            toast.onClose?.();
        }, 200);
    }, [onRemove, toast]);

    // Keyboard dismiss support
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "Escape" && toast.dismissible) {
                handleClose();
            }
        },
        [handleClose, toast.dismissible]
    );

    const typeConfig = {
        success: {
            icon: CheckCircle,
            borderColor: "border-success-300 dark:border-success-700",
            iconColor: "text-success-600 dark:text-success-400",
            progressColor: "bg-success-500",
            progressBg: "bg-success-100 dark:bg-success-900",
            role: "status" as const,
        },
        error: {
            icon: AlertCircle,
            borderColor: "border-error-300 dark:border-error-700",
            iconColor: "text-error-600 dark:text-error-400",
            progressColor: "bg-error-500",
            progressBg: "bg-error-100 dark:bg-error-900",
            role: "alert" as const,
        },
        warning: {
            icon: AlertTriangle,
            borderColor: "border-warning-300 dark:border-warning-700",
            iconColor: "text-warning-600 dark:text-warning-400",
            progressColor: "bg-warning-500",
            progressBg: "bg-warning-100 dark:bg-warning-900",
            role: "alert" as const,
        },
        info: {
            icon: Info,
            borderColor: "border-info-300 dark:border-info-700",
            iconColor: "text-info-600 dark:text-info-400",
            progressColor: "bg-info-500",
            progressBg: "bg-info-100 dark:bg-info-900",
            role: "status" as const,
        },
        loading: {
            icon: Loader2,
            borderColor: "border-ground-300 dark:border-ground-700",
            iconColor: "text-ground-500 dark:text-ground-400",
            progressColor: "bg-ground-500",
            progressBg: "bg-ground-200 dark:bg-ground-800",
            role: "status" as const,
        },
    };

    const config = typeConfig[toast.type];
    const Icon = toast.icon ? () => <>{toast.icon}</> : config.icon;

    // Use custom content if provided
    if (toast.customContent) {
        return (
            <div
                className={clsx(
                    "pointer-events-auto relative w-auto max-w-[calc(100vw-2rem)]",
                    "transition-all duration-300",
                    isExiting
                        ? "animate-out fade-out-0 slide-out-to-right-full"
                        : "animate-in fade-in-0 slide-in-from-right-full"
                )}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onKeyDown={handleKeyDown}
                role={config.role}
                tabIndex={-1}
            >
                {toast.customContent}
            </div>
        );
    }

    return (
        <div
            className={clsx(
                "pointer-events-auto relative w-80 max-w-[calc(100vw-2rem)]",
                "border shadow-outer overflow-hidden",
                "bg-ground-50 dark:bg-ground-900",
                config.borderColor,
                isExiting
                    ? "animate-out fade-out-0 slide-out-to-right-full duration-200"
                    : "animate-in fade-in-0 slide-in-from-right-full duration-300"
            )}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            role={config.role}
            aria-live={config.role === "alert" ? "assertive" : "polite"}
            tabIndex={-1}
        >
            {/* Progress Bar */}
            {toast.duration && toast.duration > 0 && (
                <div className={clsx("absolute bottom-0 left-0 right-0 h-1", config.progressBg)}>
                    <div
                        className={clsx(
                            "h-full transition-all",
                            !isPaused && "ease-linear",
                            config.progressColor
                        )}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-4 flex gap-3 items-start">
                <div className={clsx("shrink-0 mt-0.5", config.iconColor)} aria-hidden="true">
                    <Icon className={clsx("w-5 h-5", toast.type === "loading" && "animate-spin")} />
                </div>

                <div className="flex-1 min-w-0 font-secondary">
                    {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                    {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
                    {toast.action && (
                        <Toast.Action onClick={() => {
                            toast.action?.onClick();
                            handleClose();
                        }}>
                            {toast.action.label}
                        </Toast.Action>
                    )}
                </div>

                {toast.dismissible && (
                    <Toast.Close onClick={handleClose} aria-label="Dismiss notification" />
                )}
            </div>
        </div>
    );
};

// ============================================================================
// Compound Components (Exported for Custom Usage)
// ============================================================================

const ToastTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx(
                "font-primary font-semibold text-sm text-ground-800 dark:text-ground-100 mb-1 leading-none tracking-tight",
                className
            )}
            {...props}
        />
    )
);
ToastTitle.displayName = "Toast.Title";

const ToastDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx(
                "font-secondary text-sm text-ground-600 dark:text-ground-400 leading-relaxed",
                className
            )}
            {...props}
        />
    )
);
ToastDescription.displayName = "Toast.Description";

const ToastAction = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => (
        <button
            ref={ref}
            className={clsx(
                "mt-2 inline-flex items-center justify-center text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ground-500 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "bg-ground-900 text-ground-50 hover:bg-ground-800",
                "dark:bg-ground-100 dark:text-ground-900 dark:hover:bg-ground-200",
                "h-8 px-3 text-xs",
                className
            )}
            {...props}
        />
    )
);
ToastAction.displayName = "Toast.Action";

const ToastClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => (
        <button
            ref={ref}
            className={clsx(
                "absolute right-2 top-2 p-1.5",
                "text-ground-500 hover:text-ground-700 dark:text-ground-400 dark:hover:text-ground-200",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ground-500 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            type="button"
            {...props}
        >
            <X className="h-4 w-4" aria-hidden="true" />
        </button>
    )
);
ToastClose.displayName = "Toast.Close";


// Export Compound Object
export const Toast = {
    Title: ToastTitle,
    Description: ToastDescription,
    Action: ToastAction,
    Close: ToastClose,
};

export { ToastProvider };