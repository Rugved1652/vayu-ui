"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
    forwardRef,
    HTMLAttributes,
} from "react";
import { clsx } from "clsx";
import { X } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

type DrawerSide = "left" | "right" | "top" | "bottom";

interface DrawerContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    side: DrawerSide;
    titleId: string;
    descriptionId: string;
    modal: boolean;
}

// ============================================================================
// Context
// ============================================================================

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("Drawer compound components must be used within Drawer");
    }
    return context;
};

// ============================================================================
// Main Drawer Component
// ============================================================================

interface DrawerProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: DrawerSide;
    modal?: boolean;
    defaultOpen?: boolean;
}

const DrawerRoot: React.FC<DrawerProps> = ({
    children,
    open: controlledOpen,
    onOpenChange,
    side = "right",
    modal = true,
    defaultOpen = false,
}) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    // Stable IDs for ARIA
    const titleId = useId();
    const descriptionId = useId();

    const setOpen = useCallback(
        (value: boolean) => {
            if (!isControlled) {
                setInternalOpen(value);
            }
            onOpenChange?.(value);
        },
        [isControlled, onOpenChange]
    );

    // Lock body scroll when modal
    useEffect(() => {
        if (open && modal) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = "hidden";
            // Prevent layout shift if scrollbar disappears
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }

            return () => {
                document.body.style.overflow = originalStyle;
                document.body.style.paddingRight = "";
            };
        }
    }, [open, modal]);

    return (
        <DrawerContext.Provider
            value={{ open, setOpen, side, titleId, descriptionId, modal }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
DrawerRoot.displayName = "Drawer";

// ============================================================================
// Drawer Trigger
// ============================================================================

interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
    ({ children, asChild = false, className, onClick, ...props }, ref) => {
        const { setOpen, open } = useDrawer();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            if (!e.defaultPrevented) {
                setOpen(true);
            }
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref,
                onClick: handleClick,
                "aria-expanded": open,
                "aria-haspopup": "dialog",
                ...props,
            });
        }

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                className={clsx(
                    "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors",
                    "bg-ground-100 text-ground-900 hover:bg-ground-200",
                    "dark:bg-ground-800 dark:text-ground-100 dark:hover:bg-ground-700",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    "dark:focus:ring-offset-ground-950",
                    className
                )}
                aria-expanded={open}
                aria-haspopup="dialog"
                {...props}
            >
                {children}
            </button>
        );
    }
);
DrawerTrigger.displayName = "Drawer.Trigger";

// ============================================================================
// Drawer Overlay
// ============================================================================

interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {
    dismissible?: boolean;
}

const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
    ({ className, dismissible = true, onClick, ...props }, ref) => {
        const { open, setOpen, modal } = useDrawer();

        if (!open || !modal) return null;

        return (
            <div
                ref={ref}
                data-state={open ? "open" : "closed"}
                className={clsx(
                    "fixed inset-0 z-40 bg-ground-950/50 backdrop-blur-sm",
                    "data-[state=open]:animate-in data-[state=open]:fade-in-0",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                    className
                )}
                onClick={(e) => {
                    onClick?.(e);
                    if (dismissible) setOpen(false);
                }}
                aria-hidden="true"
                {...props}
            />
        );
    }
);
DrawerOverlay.displayName = "Drawer.Overlay";

// ============================================================================
// Drawer Content
// ============================================================================

interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
    trapFocus?: boolean;
}

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ children, className, trapFocus = true, onKeyDown, ...props }, ref) => {
        const { open, setOpen, side, titleId, descriptionId } = useDrawer();
        const contentRef = useRef<HTMLDivElement>(null);

        // Merge refs
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                contentRef.current = node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
            },
            [ref]
        );

        // Focus management
        useEffect(() => {
            if (open && trapFocus) {
                // Focus first interactive element
                const focusable = contentRef.current?.querySelector<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                // Simple timeout to ensure animation frame is ready
                setTimeout(() => focusable?.focus(), 50);
            }
        }, [open, trapFocus]);

        // Keyboard navigation
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(e);

            if (e.key === "Escape") {
                setOpen(false);
            }

            if (e.key === "Tab" && trapFocus) {
                const focusableElements = contentRef.current?.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                if (!focusableElements || focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        if (!open) return null;

        const sideClasses = {
            top: "inset-x-0 top-0 border-b border-ground-200 dark:border-ground-700 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom: "inset-x-0 bottom-0 border-t border-ground-200 dark:border-ground-700 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r border-ground-200 dark:border-ground-700 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4 border-l border-ground-200 dark:border-ground-700 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        };

        return (
            <div
                ref={setRefs}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                data-state={open ? "open" : "closed"}
                className={clsx(
                    "fixed z-50 flex flex-col bg-ground-50 dark:bg-ground-950 p-6 shadow-outer",
                    "transition ease-in-out duration-300",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    sideClasses[side],
                    className
                )}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
                <DrawerClose
                    className={clsx(
                        "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity",
                        "hover:opacity-100 focus:outline-none focus:ring-2",
                        "focus:ring-ground-900 focus:ring-offset-2 focus:ring-offset-ground-50",
                        "disabled:pointer-events-none",
                        "data-[state=open]:bg-ground-100",
                        "dark:focus:ring-ground-300 dark:ring-offset-ground-950",
                        "dark:data-[state=open]:bg-ground-800"
                    )}
                    aria-label="Close drawer"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DrawerClose>
            </div>
        );
    }
);
DrawerContent.displayName = "Drawer.Content";

// ============================================================================
// Drawer Header
// ============================================================================

const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx("flex flex-col space-y-2 text-center sm:text-left", className)}
            {...props}
        />
    )
);
DrawerHeader.displayName = "Drawer.Header";

// ============================================================================
// Drawer Footer
// ============================================================================

const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx(
                "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto pt-4",
                className
            )}
            {...props}
        />
    )
);
DrawerFooter.displayName = "Drawer.Footer";

// ============================================================================
// Drawer Title
// ============================================================================

const DrawerTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => {
        const { titleId } = useDrawer();
        return (
            <h2
                id={titleId}
                ref={ref}
                className={clsx(
                    "text-lg font-semibold text-ground-900 dark:text-ground-100",
                    className
                )}
                {...props}
            />
        );
    }
);
DrawerTitle.displayName = "Drawer.Title";

// ============================================================================
// Drawer Description
// ============================================================================

const DrawerDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
        const { descriptionId } = useDrawer();
        return (
            <p
                id={descriptionId}
                ref={ref}
                className={clsx("text-sm text-ground-500 dark:text-ground-400", className)}
                {...props}
            />
        );
    }
);
DrawerDescription.displayName = "Drawer.Description";

// ============================================================================
// Drawer Close
// ============================================================================

interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
    ({ className, onClick, asChild = false, children, ...props }, ref) => {
        const { setOpen } = useDrawer();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            setOpen(false);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref,
                onClick: handleClick,
                ...props,
            });
        }

        return (
            <button
                ref={ref}
                type="button"
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        );
    }
);
DrawerClose.displayName = "Drawer.Close";

// ============================================================================
// Drawer Portal
// ============================================================================

const DrawerPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};
DrawerPortal.displayName = "Drawer.Portal";

// ============================================================================
// Export Compound Component
// ============================================================================

export const Drawer = Object.assign(DrawerRoot, {
    Trigger: DrawerTrigger,
    Overlay: DrawerOverlay,
    Content: DrawerContent,
    Header: DrawerHeader,
    Footer: DrawerFooter,
    Title: DrawerTitle,
    Description: DrawerDescription,
    Close: DrawerClose,
    Portal: DrawerPortal,
});

export default Drawer;
