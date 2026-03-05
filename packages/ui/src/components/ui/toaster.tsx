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
            error: ReactNode | ((error: any) => ReactNode);
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
                error: ReactNode | ((error: any) => ReactNode);
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
                    className={`fixed z-100 flex flex-col gap-2 pointer-events-none ${positionClasses[position as ToastPosition]
                        }`}
                    style={{ maxWidth: "calc(100vw - 2rem)" }}
                    role="region"
                    aria-label={`Notifications ${position}`}
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
    }, [toast.duration, isPaused, toast.id]); // Added toast.id for stability

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            onRemove(toast.id);
            toast.onClose?.();
        }, 200);
    }, [onRemove, toast]);

    const typeConfig = {
        success: {
            icon: CheckCircle,
            colors: "bg-white dark:bg-neutral-900 border-success-200 dark:border-success-800",
            iconColor: "text-success-600 dark:text-success-400",
            progressColor: "bg-success-600 dark:bg-success-400",
            role: "status",
        },
        error: {
            icon: AlertCircle,
            colors: "bg-white dark:bg-neutral-900 border-error-200 dark:border-error-800",
            iconColor: "text-error-600 dark:text-error-400",
            progressColor: "bg-error-600 dark:bg-error-400",
            role: "alert",
        },
        warning: {
            icon: AlertTriangle,
            colors: "bg-white dark:bg-neutral-900 border-warning-200 dark:border-warning-800",
            iconColor: "text-warning-600 dark:text-warning-400",
            progressColor: "bg-warning-600 dark:bg-warning-400",
            role: "alert",
        },
        info: {
            icon: Info,
            colors: "bg-white dark:bg-neutral-900 border-info-200 dark:border-info-800",
            iconColor: "text-info-600 dark:text-info-400",
            progressColor: "bg-info-600 dark:bg-info-400",
            role: "status",
        },
        loading: {
            icon: Loader2,
            colors: "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
            iconColor: "text-neutral-600 dark:text-neutral-400",
            progressColor: "bg-neutral-600 dark:bg-neutral-400",
            role: "status",
        },
    };

    const config = typeConfig[toast.type];
    const Icon = toast.icon ? () => <>{toast.icon}</> : config.icon;

    // Use custom content if provided
    if (toast.customContent) {
        return (
            <div
                className={clsx(
                    "pointer-events-auto relative w-auto max-w-[calc(100vw-2rem)] transition-all duration-300",
                    isExiting
                        ? "animate-out fade-out-0 slide-out-to-right-full"
                        : "animate-in fade-in-0 slide-in-from-right-full"
                )}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                role={config.role} // Pass role to wrapper for screen readers
            >
                {/* 
                  Allow custom content to be anything, but wrap it in a div 
                  that handles the exit animation and positioning context 
                */}
                {toast.customContent}
            </div>
        );
    }

    return (
        <div
            className={clsx(
                "pointer-events-auto relative w-[350px] max-w-[calc(100vw-2rem)]",
                "border rounded-lg shadow-lg overflow-hidden",
                "bg-white dark:bg-neutral-900", // Ensure background opacity
                config.colors,
                isExiting
                    ? "animate-out fade-out-0 slide-out-to-right-full duration-200"
                    : "animate-in fade-in-0 slide-in-from-right-full duration-300"
            )}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role={config.role}
        >
            {/* Progress Bar */}
            {toast.duration && toast.duration > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800">
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

            {/* Content using Compound Components internally */}
            <div className="p-4 flex gap-3 items-start">
                <div className={clsx("shrink-0 mt-0.5", config.iconColor)}>
                    <Icon className={clsx("w-5 h-5", toast.type === "loading" && "animate-spin")} />
                </div>

                <div className="flex-1 w-0"> {/* w-0 to allow text truncation */}
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
                    <Toast.Close onClick={handleClose} />
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
            className={clsx("font-semibold text-sm text-neutral-900 dark:text-neutral-50 mb-1 leading-none tracking-tight", className)}
            {...props}
        />
    )
);
ToastTitle.displayName = "Toast.Title";

const ToastDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx("text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed", className)}
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
                "mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50",
                "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
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
                "absolute right-2 top-2 rounded-md p-1 text-neutral-950/50 opacity-0 transition-opacity hover:text-neutral-950 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-neutral-50/50 dark:hover:text-neutral-50",
                "opacity-100", // Force visible for now as hover logic can be tricky on mobile
                className
            )}
            toast-close=""
            {...props}
        >
            <X className="h-4 w-4" />
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
