"use client";

import { clsx } from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

type CollapsibleVariant = "default" | "bordered" | "filled";
type CollapsibleSize = "sm" | "md" | "lg";

interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    trigger: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    variant?: CollapsibleVariant;
    size?: CollapsibleSize;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    triggerClassName?: string;
    contentClassName?: string;
    animationDuration?: number;
}

interface CollapsibleGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    allowMultiple?: boolean;
    defaultOpenItems?: number[];
}

// ============================================================================
// Config
// ============================================================================

const sizeClasses: Record<
    CollapsibleSize,
    { trigger: string; content: string; icon: string }
> = {
    sm: {
        trigger: "px-3 py-2 text-sm",
        content: "px-3 py-2 text-sm",
        icon: "w-4 h-4",
    },
    md: {
        trigger: "px-4 py-3 text-base",
        content: "px-4 py-3 text-base",
        icon: "w-5 h-5",
    },
    lg: {
        trigger: "px-6 py-4 text-lg",
        content: "px-6 py-4 text-lg",
        icon: "w-6 h-6",
    },
};

const variantClasses: Record<
    CollapsibleVariant,
    { container: string; trigger: string; content: string }
> = {
    default: {
        container: "",
        trigger:
            "bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
        content: "",
    },
    bordered: {
        container:
            "border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden",
        trigger:
            "bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800",
        content:
            "border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
    },
    filled: {
        container: "rounded-lg overflow-hidden",
        trigger:
            "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700",
        content:
            "bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700",
    },
};

// ============================================================================
// Collapsible Component
// ============================================================================

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(
    (
        {
            children,
            trigger,
            defaultOpen = false,
            open: controlledOpen,
            onOpenChange,
            variant = "default",
            size = "md",
            disabled = false,
            icon,
            iconPosition = "right",
            className,
            triggerClassName,
            contentClassName,
            animationDuration = 300,
            ...props
        },
        ref
    ) => {
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const isControlled = controlledOpen !== undefined;
        const isOpen = isControlled ? controlledOpen : internalOpen;

        const contentRef = useRef<HTMLDivElement>(null);
        const [height, setHeight] = useState<number | undefined>(
            isOpen ? undefined : 0
        );

        const uniqueId = useId();
        const contentId = `${uniqueId}-content`;
        const triggerId = `${uniqueId}-trigger`;

        // Animate height
        useEffect(() => {
            if (!contentRef.current) return;

            if (isOpen) {
                const contentHeight = contentRef.current.scrollHeight;
                setHeight(contentHeight);

                const timer = setTimeout(() => {
                    setHeight(undefined);
                }, animationDuration);

                return () => clearTimeout(timer);
            } else {
                const contentHeight = contentRef.current.scrollHeight;
                setHeight(contentHeight);

                requestAnimationFrame(() => {
                    setHeight(0);
                });
            }
        }, [isOpen, animationDuration]);

        const handleToggle = useCallback(() => {
            if (disabled) return;
            const newOpen = !isOpen;
            if (!isControlled) {
                setInternalOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        }, [disabled, isOpen, isControlled, onOpenChange]);

        // Render chevron icon
        const chevronIcon =
            icon ||
            (iconPosition === "left" ? (
                <ChevronRight
                    className={clsx(
                        sizeClasses[size].icon,
                        "transition-transform duration-300",
                        isOpen && "rotate-90"
                    )}
                />
            ) : (
                <ChevronDown
                    className={clsx(
                        sizeClasses[size].icon,
                        "transition-transform duration-300",
                        isOpen && "rotate-180"
                    )}
                />
            ));

        return (
            <div
                ref={ref}
                className={clsx(
                    variantClasses[variant].container,
                    className
                )}
                {...props}
            >
                {/* Trigger */}
                <button
                    id={triggerId}
                    type="button"
                    onClick={handleToggle}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className={clsx(
                        "w-full flex items-center gap-3",
                        sizeClasses[size].trigger,
                        variantClasses[variant].trigger,
                        "font-secondary font-medium",
                        "text-neutral-900 dark:text-white",
                        "transition-colors duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                        disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer",
                        triggerClassName
                    )}
                >
                    {iconPosition === "left" && (
                        <span
                            className="flex-shrink-0 text-neutral-500 dark:text-neutral-400"
                            aria-hidden="true"
                        >
                            {chevronIcon}
                        </span>
                    )}

                    <span className="flex-1 text-left">{trigger}</span>

                    {iconPosition === "right" && (
                        <span
                            className="flex-shrink-0 text-neutral-500 dark:text-neutral-400"
                            aria-hidden="true"
                        >
                            {chevronIcon}
                        </span>
                    )}
                </button>

                {/* Content */}
                <div
                    id={contentId}
                    ref={contentRef}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    style={{
                        height:
                            height !== undefined ? `${height}px` : "auto",
                        transition: `height ${animationDuration}ms ease-in-out`,
                    }}
                    className="overflow-hidden"
                >
                    <div
                        className={clsx(
                            sizeClasses[size].content,
                            variantClasses[variant].content,
                            "font-secondary",
                            "text-neutral-700 dark:text-neutral-300",
                            contentClassName
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);

CollapsibleRoot.displayName = "Collapsible";

// ============================================================================
// CollapsibleGroup Component
// ============================================================================

const CollapsibleGroup = forwardRef<HTMLDivElement, CollapsibleGroupProps>(
    (
        {
            children,
            allowMultiple = false,
            defaultOpenItems = [],
            className,
            ...props
        },
        ref
    ) => {
        const [openItems, setOpenItems] = useState<Set<number>>(
            new Set(defaultOpenItems)
        );

        const handleOpenChange = useCallback(
            (index: number) => (open: boolean) => {
                setOpenItems((prev) => {
                    const next = new Set(prev);
                    if (open) {
                        if (!allowMultiple) next.clear();
                        next.add(index);
                    } else {
                        next.delete(index);
                    }
                    return next;
                });
            },
            [allowMultiple]
        );

        const processedChildren = React.Children.map(
            children,
            (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(
                        child as React.ReactElement<CollapsibleProps>,
                        {
                            open: openItems.has(index),
                            onOpenChange: handleOpenChange(index),
                        }
                    );
                }
                return child;
            }
        );

        return (
            <div
                ref={ref}
                className={clsx("space-y-2", className)}
                {...props}
            >
                {processedChildren}
            </div>
        );
    }
);

CollapsibleGroup.displayName = "Collapsible.Group";

// ============================================================================
// Compound Export
// ============================================================================

export const Collapsible = Object.assign(CollapsibleRoot, {
    Group: CollapsibleGroup,
});

export type {
    CollapsibleGroupProps,
    CollapsibleProps,
    CollapsibleSize,
    CollapsibleVariant,
};
