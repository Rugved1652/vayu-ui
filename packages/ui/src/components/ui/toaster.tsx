"use client";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useId,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./utils";

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
  createdAt: number;
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
// Icons (inline SVGs — no external dependency)
// ============================================================================

const Icons = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  loading: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
  close: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ============================================================================
// Style maps (design-system tokens with dark mode)
// ============================================================================

const typeStyles = {
  success: {
    border: "border-l-success",
    icon: "text-success",
    progress: "bg-success",
    role: "status" as const,
    live: "polite" as const,
    label: "Success",
  },
  error: {
    border: "border-l-destructive",
    icon: "text-destructive",
    progress: "bg-destructive",
    role: "alert" as const,
    live: "assertive" as const,
    label: "Error",
  },
  warning: {
    border: "border-l-warning",
    icon: "text-warning",
    progress: "bg-warning",
    role: "alert" as const,
    live: "assertive" as const,
    label: "Warning",
  },
  info: {
    border: "border-l-info",
    icon: "text-info",
    progress: "bg-info",
    role: "status" as const,
    live: "polite" as const,
    label: "Information",
  },
  loading: {
    border: "border-l-muted",
    icon: "text-muted-content",
    progress: "bg-muted-content",
    role: "status" as const,
    live: "polite" as const,
    label: "Loading",
  },
};

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
  defaultPosition = "bottom-right",
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
        createdAt: Date.now(),
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

  const updateToast = useCallback((id: string, options: Partial<ToastOptions>) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id
          ? { ...toast, ...options, type: options.type || toast.type, createdAt: Date.now() }
          : toast
      )
    );
  }, []);

  const success = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "success", description: message }),
    [addToast]
  );

  const error = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "error", description: message }),
    [addToast]
  );

  const warning = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "warning", description: message }),
    [addToast]
  );

  const info = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "info", description: message }),
    [addToast]
  );

  const loading = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, "type">) =>
      addToast({
        ...options,
        type: "loading",
        description: message,
        duration: 0,
        dismissible: false,
      }),
    [addToast]
  );

  const custom = useCallback(
    (content: ReactNode, options?: Omit<ToastOptions, "type" | "customContent">) =>
      addToast({ ...options, type: "info", customContent: content }),
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
// Toast Container (portal + grouping by position)
// ============================================================================

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const PORTAL_ID = "vayu-toast-portal";

function getPortalRoot(): HTMLElement {
  let el = document.getElementById(PORTAL_ID);
  if (!el) {
    el = document.createElement("div");
    el.id = PORTAL_ID;
    el.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2147483647;isolation:isolate;";
    document.body.appendChild(el);
  }
  return el;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(getPortalRoot());
  }, []);

  if (!portalRoot) return null;

  const toastsByPosition = toasts.reduce(
    (acc, toast) => {
      const position = toast.position || "bottom-right";
      if (!acc[position]) acc[position] = [];
      acc[position].push(toast);
      return acc;
    },
    {} as Record<ToastPosition, Toast[]>
  );

  return createPortal(
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <ToastStack
          key={position}
          position={position as ToastPosition}
          toasts={positionToasts}
          onRemove={onRemove}
        />
      ))}
    </>,
    portalRoot
  );
};

// ============================================================================
// Sonner-style Stack
// ============================================================================

const VISIBLE_TOASTS = 3;
const GAP = 14;
const TOAST_HEIGHT_OFFSET = 10;
const SCALE_STEP = 0.05;

interface ToastStackProps {
  position: ToastPosition;
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastStack: React.FC<ToastStackProps> = ({ position, toasts, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [isAllPaused, setIsAllPaused] = useState(false);
  const regionId = useId();
  const isBottom = position.startsWith("bottom");

  const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-0 left-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-0 right-0",
  };

  const handleHeightUpdate = useCallback((id: string, height: number) => {
    setHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        const firstDismissible = toasts.find((t) => t.dismissible !== false);
        if (firstDismissible) onRemove(firstDismissible.id);
      }
    },
    [toasts, onRemove]
  );

  const getStackOffset = (index: number): number => {
    if (isExpanded) {
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += (heights[toasts[i]!.id] || 64) + GAP;
      }
      return offset;
    }
    if (index >= VISIBLE_TOASTS) return 0;
    return index * TOAST_HEIGHT_OFFSET;
  };

  return (
    <section
      aria-label={`Notifications (${position})`}
      aria-live="polite"
      aria-relevant="additions removals"
      id={regionId}
      tabIndex={-1}
      className={cn(
        "absolute flex flex-col p-4 pointer-events-none",
        positionClasses[position]
      )}
      style={{
        width: "100%",
        maxWidth: "420px",
      }}
      onKeyDown={handleKeyDown}
    >
      <ol
        className="relative flex w-full flex-col pointer-events-auto list-none m-0 p-0"
        onMouseEnter={() => {
          setIsExpanded(true);
          setIsAllPaused(true);
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
          setIsAllPaused(false);
        }}
        onFocus={() => {
          setIsExpanded(true);
          setIsAllPaused(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsExpanded(false);
            setIsAllPaused(false);
          }
        }}
        style={{
          height: isExpanded
            ? toasts.reduce((sum, t, i) => sum + (heights[t.id] || 64) + (i < toasts.length - 1 ? GAP : 0), 0)
            : (heights[toasts[0]?.id] || 64) + (Math.min(toasts.length, VISIBLE_TOASTS) - 1) * TOAST_HEIGHT_OFFSET,
          transition: "height 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {toasts.map((toast, index) => {
          const isHidden = !isExpanded && index >= VISIBLE_TOASTS;
          const scale = isExpanded ? 1 : 1 - index * SCALE_STEP;
          const offset = getStackOffset(index);
          const direction = isBottom ? -1 : 1;

          return (
            <li
              key={toast.id}
              className="absolute left-0 right-0"
              style={{
                zIndex: toasts.length - index,
                transform: `translateY(${offset * direction}px) scale(${scale})`,
                transformOrigin: isBottom ? "bottom center" : "top center",
                opacity: isHidden ? 0 : 1,
                pointerEvents: isHidden ? "none" : "auto",
                transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                ...(isBottom ? { bottom: 0 } : { top: 0 }),
              }}
              aria-hidden={isHidden}
            >
              <ToastItem
                toast={toast}
                onRemove={onRemove}
                onHeightUpdate={handleHeightUpdate}
                isAllPaused={isAllPaused}
              />
            </li>
          );
        })}
      </ol>

      {!isExpanded && toasts.length > VISIBLE_TOASTS && (
        <div
          className={cn(
            "pointer-events-auto mt-1 self-center rounded-full px-2.5 py-1",
            "bg-surface-content text-surface",
            "text-xs font-medium shadow-control cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          )}
          role="button"
          tabIndex={0}
          aria-label={`Show all ${toasts.length} notifications`}
          onClick={() => setIsExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsExpanded(true);
            }
          }}
        >
          +{toasts.length - VISIBLE_TOASTS}
        </div>
      )}
    </section>
  );
};

// ============================================================================
// Toast Item
// ============================================================================

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
  onHeightUpdate: (id: string, height: number) => void;
  isAllPaused: boolean;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove, onHeightUpdate, isAllPaused }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isLocalPaused, setIsLocalPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(toast.duration || 0);
  const prevTypeRef = useRef<ToastType>(toast.type);

  const progressRef = useRef<HTMLDivElement>(null);

  // Combined pause state - paused if either global or local pause is true
  const isPaused = isAllPaused || isLocalPaused;

  // Measure height for stack layout
  useEffect(() => {
    if (!itemRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) onHeightUpdate(toast.id, entry.contentRect.height);
    });
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [toast.id, onHeightUpdate]);

  // Timer with pause/resume
  useEffect(() => {
    // Clear any existing timer when effect runs
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (toast.duration === 0 || toast.type === "loading") {
      prevTypeRef.current = toast.type;
      return;
    }

    // Reset remaining time when transitioning from loading to success/error
    if (prevTypeRef.current === "loading") {
      remainingTimeRef.current = toast.duration || 0;
    }
    prevTypeRef.current = toast.type;

    if (!isPaused) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        handleClose();
      }, remainingTimeRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, toast.duration, toast.type]);

  // Progress bar animation via CSS custom properties
  useEffect(() => {
    if (!progressRef.current || toast.duration === 0 || toast.type === "loading") return;
    const el = progressRef.current;
    el.style.animationPlayState = isPaused ? "paused" : "running";
  }, [isPaused, toast.duration, toast.type]);

  // Swipe to dismiss
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setIsLocalPaused(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartRef.current.x);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsLocalPaused(false);
    if (Math.abs(dragOffset) > 100) {
      handleClose();
    } else {
      setDragOffset(0);
    }
  };

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
      toast.onClose?.();
    }, 300);
  }, [onRemove, toast]);

  const config = typeStyles[toast.type];
  const Icon = toast.icon ?? Icons[toast.type];
  const hasDuration = toast.duration !== undefined && toast.duration > 0 && toast.type !== "loading";
  const dragOpacity = Math.max(0, 1 - Math.abs(dragOffset) / 150);

  return (
    <div
      ref={itemRef}
      className={cn(
        "pointer-events-auto relative w-full overflow-hidden rounded-surface shadow-elevated",
        !toast.customContent && "border border-l-4",
        !toast.customContent && "bg-surface",
        !toast.customContent && "border-border",
        !toast.customContent && config.border,
        "transition-all duration-300 ease-out",
        isExiting && "animate-toast-exit",
        !isExiting && "animate-toast-enter",
        isDragging && "select-none cursor-grabbing"
      )}
      style={{
        transform: `translateX(${dragOffset}px)`,
        opacity: isDragging ? dragOpacity : undefined,
        transition: isDragging ? "none" : undefined,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role={config.role}
      aria-live={config.live}
      aria-atomic="true"
      aria-label={`${config.label} notification`}
      tabIndex={0}
    >
      {toast.customContent ? (
        toast.customContent
      ) : (
        <div className="flex items-start gap-3 p-4">
          <div className={cn("shrink-0 mt-0.5", config.icon)} aria-hidden="true">
            {Icon}
          </div>

          <div className="flex-1 min-w-0 font-secondary">
            {toast.title && (
              <div className="font-semibold font-primary text-sm text-surface-content mb-1 leading-tight">
                {toast.title}
              </div>
            )}
            {toast.description && (
              <div className="text-sm text-muted-content leading-relaxed">
                {toast.description}
              </div>
            )}
            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  handleClose();
                }}
                className={cn(
                  "mt-2 text-sm font-medium text-surface-content underline-offset-2 hover:underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
                  "min-h-6 min-w-6"
                )}
              >
                {toast.action.label}
              </button>
            )}
          </div>

          {toast.dismissible && (
            <button
              onClick={handleClose}
              className={cn(
                "shrink-0 flex items-center justify-center rounded-control p-1.5",
                "min-h-7 min-w-7",
                "text-muted-content",
                "hover:text-surface-content",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
                "transition-colors"
              )}
              aria-label={`Dismiss ${config.label.toLowerCase()} notification`}
            >
              {Icons.close}
            </button>
          )}
        </div>
      )}

      {/* Countdown progress bar */}
      {hasDuration && !toast.customContent && (
        <div
          className="h-[3px] w-full bg-muted"
          role="progressbar"
          aria-label="Time remaining before auto-dismiss"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            ref={progressRef}
            className={cn("h-full origin-left", config.progress)}
            style={{
              animation: `toast-progress ${toast.duration}ms linear forwards`,
              animationPlayState: isPaused ? "paused" : "running",
              willChange: "transform",
            }}
          />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Compound sub-components for custom toast content
// ============================================================================

const ToastTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "font-semibold font-primary text-sm text-surface-content",
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
      className={cn(
        "text-sm font-secondary text-muted-content",
        className
      )}
      {...props}
    />
  )
);
ToastDescription.displayName = "Toast.Description";

const ToastClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "p-1.5 min-h-[28px] min-w-[28px] rounded-control",
        "text-muted-content",
        "hover:text-surface-content",
        "hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
        "transition-colors",
        className
      )}
      {...props}
    />
  )
);
ToastClose.displayName = "Toast.Close";

export const Toast = {
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
};

export { ToastProvider };
