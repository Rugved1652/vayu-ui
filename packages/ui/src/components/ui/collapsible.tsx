"use client";
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    forwardRef,
    type HTMLAttributes,
    type ReactNode,
} from "react";
import { cn } from "./utils";

/* ---------------- TYPES ---------------- */

interface CollapsibleRootProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    lines?: number;
}

interface CollapsibleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    showText?: string;
    hideText?: string;
}

interface CollapsibleContextType {
    isOpen: boolean;
    toggle: () => void;
    contentId: string;
    triggerId: string;
}

/* ---------------- CONTEXT ---------------- */

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

const useCollapsible = () => {
    const context = useContext(CollapsibleContext);
    if (!context) {
        throw new Error("Collapsible components must be used within Collapsible.Root");
    }
    return context;
};

/* ---------------- ROOT ---------------- */

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
    ({ children, defaultOpen = false, open, onOpenChange, className, ...props }, ref) => {
        const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
        const idRef = useRef(`collapsible-${Math.random().toString(36).slice(2, 9)}`);

        const isControlled = open !== undefined;
        const isOpen = isControlled ? open : uncontrolledOpen;

        const toggle = useCallback(() => {
            if (isControlled) {
                onOpenChange?.(!open);
            } else {
                setUncontrolledOpen((prev) => {
                    const next = !prev;
                    onOpenChange?.(next);
                    return next;
                });
            }
        }, [isControlled, open, onOpenChange]);

        const contextValue = useMemo(
            () => ({
                isOpen,
                toggle,
                contentId: `${idRef.current}-content`,
                triggerId: `${idRef.current}-trigger`,
            }),
            [isOpen, toggle]
        );

        return (
            <CollapsibleContext.Provider value={contextValue}>
                <div ref={ref} className={cn("w-full", className)} {...props}>
                    {children}
                </div>
            </CollapsibleContext.Provider>
        );
    }
);

CollapsibleRoot.displayName = "Collapsible.Root";

/* ---------------- CONTENT ---------------- */

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
    ({ children, lines = 3, className, ...props }, ref) => {
        const { isOpen, contentId, triggerId } = useCollapsible();

        // Line-clamp styles for collapsed state
        const clampedStyle = {
            display: "-webkit-box" as unknown as "block",
            WebkitLineClamp: lines,
            WebkitBoxOrient: "vertical" as unknown as "horizontal",
            overflow: "hidden" as const,
        };

        return (
            <div
                ref={ref}
                id={contentId}
                role="region"
                aria-labelledby={triggerId}
                className={cn(
                    "text-surface-content font-secondary text-para leading-relaxed",
                    className
                )}
                style={!isOpen ? clampedStyle : undefined}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CollapsibleContent.displayName = "Collapsible.Content";

/* ---------------- TRIGGER ---------------- */

const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
    ({ showText = "Show more", hideText = "Show less", className, ...props }, ref) => {
        const { isOpen, toggle, contentId, triggerId } = useCollapsible();

        return (
            <button
                ref={ref}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={toggle}
                className={cn(
                    "mt-2 text-sm font-medium text-brand",
                    "hover:underline underline-offset-2",
                    "focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:rounded-sm",
                    "transition-colors duration-fast",
                    className
                )}
                {...props}
            >
                {isOpen ? hideText : showText}
            </button>
        );
    }
);

CollapsibleTrigger.displayName = "Collapsible.Trigger";

/* ---------------- COMPOUND EXPORT ---------------- */

export const Collapsible = {
    Root: CollapsibleRoot,
    Content: CollapsibleContent,
    Trigger: CollapsibleTrigger,
};

export default Collapsible;
