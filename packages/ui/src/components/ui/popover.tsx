"use client";
import React, {
    useState,
    useRef,
    useEffect,
    createContext,
    useContext,
    forwardRef,
    HTMLAttributes,
    useLayoutEffect,
    useCallback,
} from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "./utils";

// --- Utility: Merge Refs ---
// Fixes bug where asChild overwritten the child's existing ref
function useMergeRefs<T = any>(
    ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>
): React.RefCallback<T> {
    return useCallback(
        (node) => {
            refs.forEach((ref) => {
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref != null) {
                    (ref as React.MutableRefObject<T | null>).current = node;
                }
            });
        },
        [refs]
    );
}

// --- Context Setup ---
interface PopoverContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    modal: boolean;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopover = () => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error("Popover components must be used within Popover");
    }
    return context;
};

// --- Types ---
export type PopoverVariant = "default" | "bordered" | "elevated";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
}

export interface PopoverTriggerProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    asChild?: boolean;
    disabled?: boolean;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    alignOffset?: number;
    variant?: PopoverVariant;
    showArrow?: boolean;
    closeButton?: boolean;
    avoidCollisions?: boolean;
}

// --- Components ---

const PopoverRoot = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            children,
            defaultOpen = false,
            open: controlledOpen,
            onOpenChange,
            modal = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const triggerRef = useRef<HTMLElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const isControlled = controlledOpen !== undefined;
        const open = isControlled ? controlledOpen : internalOpen;

        const setOpen = (newOpen: boolean) => {
            if (!isControlled) {
                setInternalOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    contentRef.current &&
                    triggerRef.current &&
                    !contentRef.current.contains(event.target as Node) &&
                    !triggerRef.current.contains(event.target as Node)
                ) {
                    setOpen(false);
                }
            };

            const handleEscape = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    setOpen(false);
                    triggerRef.current?.focus();
                }
            };

            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
                document.addEventListener("keydown", handleEscape);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleEscape);
            };
        }, [open]);

        return (
            <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef, modal }}>
                <div ref={ref} className={cn("relative inline-block", className)} {...props}>
                    {children}
                </div>
            </PopoverContext.Provider>
        );
    }
);

PopoverRoot.displayName = "Popover";

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
    (
        {
            children,
            asChild = false,
            disabled = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const { open, setOpen, triggerRef } = usePopover();

        const handleClick = () => {
            if (!disabled) {
                setOpen(!open);
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
            }
        };

        // Merge internal triggerRef with the ref passed from parent (fixes ref overwriting bug)
        const mergedRefs = useMergeRefs(triggerRef, ref);

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref: mergedRefs,
                onClick: (e: React.MouseEvent) => {
                    (children as React.ReactElement<any>).props.onClick?.(e);
                    handleClick();
                },
                onKeyDown: handleKeyDown,
                "aria-expanded": open,
                "aria-haspopup": "dialog",
                disabled,
            });
        }

        return (
            <Button
                ref={mergedRefs as React.RefObject<HTMLButtonElement>}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                type="button"
                aria-expanded={open}
                aria-haspopup="dialog"
                disabled={disabled}
                variant="ghost"
                className={cn(
                    "font-secondary",
                    "text-muted-content hover:text-canvas-content",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

PopoverTrigger.displayName = "Popover.Trigger";

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
    (
        {
            children,
            align = "center",
            side = "bottom",
            sideOffset = 8,
            alignOffset = 0,
            variant = "default",
            className = "",
            showArrow = false,
            closeButton = false,
            avoidCollisions = true,
            ...props
        },
        ref
    ) => {
        const { open, setOpen, contentRef, triggerRef, modal } = usePopover();
        const [position, setPosition] = useState({ top: 0, left: 0 });
        const [currentSide, setCurrentSide] = useState(side);
        const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
        const [isPositioned, setIsPositioned] = useState(false);

        const variantClasses = {
            default: cn(
                "bg-elevated text-elevated-content",
                "border border-border",
                "shadow-elevated"
            ),
            bordered: cn(
                "bg-elevated text-elevated-content",
                "border-2 border-brand",
                "shadow-elevated"
            ),
            elevated: cn(
                "bg-elevated text-elevated-content",
                "border border-border",
                "shadow-elevated",
                "[box-shadow:0_10px_15px_-3px_rgb(var(--shadow)/0.15),0_4px_6px_-4px_rgb(var(--shadow)/0.15)]"
            ),
        };

        // Extracted positioning logic to be reused on scroll, resize, and content change
        const updatePosition = useCallback(() => {
            if (!triggerRef.current || !contentRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let finalSide = side;
            let top = 0;
            let left = 0;

            if (avoidCollisions) {
                const spaceAbove = triggerRect.top;
                const spaceBelow = viewportHeight - triggerRect.bottom;
                const spaceLeft = triggerRect.left;
                const spaceRight = viewportWidth - triggerRect.right;

                if (
                    side === "bottom" &&
                    spaceBelow < contentRect.height + sideOffset &&
                    spaceAbove > spaceBelow
                ) {
                    finalSide = "top";
                } else if (
                    side === "top" &&
                    spaceAbove < contentRect.height + sideOffset &&
                    spaceBelow > spaceAbove
                ) {
                    finalSide = "bottom";
                } else if (
                    side === "right" &&
                    spaceRight < contentRect.width + sideOffset &&
                    spaceLeft > spaceRight
                ) {
                    finalSide = "left";
                } else if (
                    side === "left" &&
                    spaceLeft < contentRect.width + sideOffset &&
                    spaceRight > spaceLeft
                ) {
                    finalSide = "right";
                }
            }

            setCurrentSide(finalSide);

            switch (finalSide) {
                case "top":
                    top = triggerRect.top - contentRect.height - sideOffset;
                    break;
                case "bottom":
                    top = triggerRect.bottom + sideOffset;
                    break;
                case "left":
                    left = triggerRect.left - contentRect.width - sideOffset;
                    top = triggerRect.top;
                    break;
                case "right":
                    left = triggerRect.right + sideOffset;
                    top = triggerRect.top;
                    break;
            }

            if (finalSide === "top" || finalSide === "bottom") {
                switch (align) {
                    case "start":
                        left = triggerRect.left + alignOffset;
                        break;
                    case "center":
                        left =
                            triggerRect.left +
                            triggerRect.width / 2 -
                            contentRect.width / 2 +
                            alignOffset;
                        break;
                    case "end":
                        left = triggerRect.right - contentRect.width - alignOffset;
                        break;
                }

                if (avoidCollisions) {
                    if (left < 0) left = 8;
                    if (left + contentRect.width > viewportWidth)
                        left = viewportWidth - contentRect.width - 8;
                }
            }

            if (finalSide === "left" || finalSide === "right") {
                switch (align) {
                    case "start":
                        top = triggerRect.top + alignOffset;
                        break;
                    case "center":
                        top =
                            triggerRect.top +
                            triggerRect.height / 2 -
                            contentRect.height / 2 +
                            alignOffset;
                        break;
                    case "end":
                        top = triggerRect.bottom - contentRect.height - alignOffset;
                        break;
                }

                if (avoidCollisions) {
                    if (top < 0) top = 8;
                    if (top + contentRect.height > viewportHeight)
                        top = viewportHeight - contentRect.height - 8;
                }
            }

            setPosition({ top, left });

            if (showArrow) {
                const arrowSize = 8;
                let arrowTop = 0;
                let arrowLeft = 0;

                if (finalSide === "top" || finalSide === "bottom") {
                    arrowLeft =
                        triggerRect.left + triggerRect.width / 2 - left - arrowSize;
                    arrowTop = finalSide === "bottom" ? -arrowSize : contentRect.height;
                } else {
                    arrowTop = triggerRect.top + triggerRect.height / 2 - top - arrowSize;
                    arrowLeft = finalSide === "right" ? -arrowSize : contentRect.width;
                }

                setArrowPosition({ top: arrowTop, left: arrowLeft });
            }
        }, [align, side, sideOffset, alignOffset, avoidCollisions, showArrow, triggerRef, contentRef]);

        // Fix: Handle scroll and window resize
        useEffect(() => {
            if (!open) return;

            const handleUpdate = () => updatePosition();

            window.addEventListener("resize", handleUpdate);
            // capture: true ensures we catch scroll events inside scrollable containers
            window.addEventListener("scroll", handleUpdate, true);

            return () => {
                window.removeEventListener("resize", handleUpdate);
                window.removeEventListener("scroll", handleUpdate, true);
            };
        }, [open, updatePosition]);

        // Fix: Handle content resize (dynamic children)
        useEffect(() => {
            if (!open || !contentRef.current) return;

            const observer = new ResizeObserver(() => {
                updatePosition();
            });

            observer.observe(contentRef.current);

            return () => observer.disconnect();
        }, [open, contentRef, updatePosition]);

        // Initial positioning
        useLayoutEffect(() => {
            if (open && triggerRef.current && contentRef.current) {
                setIsPositioned(false);
                
                // Calculate immediately
                updatePosition();

                requestAnimationFrame(() => {
                    setIsPositioned(true);
                    contentRef.current?.focus();
                });
            } else {
                setIsPositioned(false);
            }
        }, [open, updatePosition]);

        if (!open) return null;

        return (
            <>
                {modal && (
                    <div
                        className="fixed inset-0 bg-canvas-content/50 z-40"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />
                )}
                <div
                    ref={contentRef}
                    role="dialog"
                    aria-modal={modal ? "true" : "false"}
                    tabIndex={-1}
                    style={{
                        position: "fixed",
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        opacity: isPositioned ? undefined : 0,
                        visibility: isPositioned ? "visible" : "hidden",
                        zIndex: 50,
                    }}
                    className={cn(
                        "rounded-overlay p-4",
                        isPositioned && "animate-zoom-in-small",
                        variantClasses[variant],
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-elevated",
                        className
                    )}
                    {...props}
                >
                    {showArrow && (
                        <div
                            style={{
                                position: "absolute",
                                top: `${arrowPosition.top}px`,
                                left: `${arrowPosition.left}px`,
                            }}
                            className="w-4 h-4"
                        >
                            <div
                                className={cn(
                                    "w-4 h-4 rotate-45",
                                    variant === "bordered"
                                        ? "bg-elevated border-2 border-brand"
                                        : "bg-elevated border border-border",
                                    currentSide === "bottom" && "border-b-0 border-r-0",
                                    currentSide === "top" && "border-t-0 border-l-0",
                                    currentSide === "left" && "border-l-0 border-b-0",
                                    currentSide === "right" && "border-r-0 border-t-0"
                                )}
                            />
                        </div>
                    )}

                    {closeButton && (
                        <Button
                            onClick={() => setOpen(false)}
                            variant="ghost"
                            size="small"
                            className="absolute top-2 right-2 p-1 text-muted-content hover:text-elevated-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                            aria-label="Close popover"
                        >
                            <Button.Icon>
                                <X className="w-4 h-4" />
                            </Button.Icon>
                        </Button>
                    )}

                    <div className="font-secondary text-elevated-content">
                        {children}
                    </div>
                </div>
            </>
        );
    }
);

PopoverContent.displayName = "Popover.Content";

export const Popover = Object.assign(PopoverRoot, {
    Trigger: PopoverTrigger,
    Content: PopoverContent,
});