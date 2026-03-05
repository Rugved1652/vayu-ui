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
} from "react";
import { X } from "lucide-react";
import { Button } from "./button";

interface PopoverContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopover = () => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error("Popover components must be used within Popover");
    }
    return context;
};

export type PopoverVariant = "default" | "bordered" | "elevated";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
}

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
            <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
                <div ref={ref} className={`relative inline-block ${className}`} {...props}>
                    {children}
                </div>
            </PopoverContext.Provider>
        );
    }
);

PopoverRoot.displayName = "Popover";

export interface PopoverTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    disabled?: boolean;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
    children,
    asChild = false,
    disabled = false,
}) => {
    const { open, setOpen, triggerRef } = usePopover();

    const handleClick = () => {
        if (!disabled) {
            setOpen(!open);
        }
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            ref: triggerRef,
            onClick: (e: React.MouseEvent) => {
                (children as React.ReactElement<any>).props.onClick?.(e);
                handleClick();
            },
            "aria-expanded": open,
            "aria-haspopup": "dialog",
            disabled,
        });
    }

    return (
        <Button
            ref={triggerRef as React.RefObject<HTMLButtonElement>}
            onClick={handleClick}
            type="button"
            aria-expanded={open}
            aria-haspopup="dialog"
            disabled={disabled}
            variant="ghost"
            className="font-secondary text-slate-200"
        >
            {children}
        </Button>
    );
};

PopoverTrigger.displayName = "Popover.Trigger";

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
        const { open, setOpen, contentRef, triggerRef } = usePopover();
        const [position, setPosition] = useState({ top: 0, left: 0 });
        const [currentSide, setCurrentSide] = useState(side);
        const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
        const [isPositioned, setIsPositioned] = useState(false);

        // Variant styles
        const variantClasses = {
            default:
                "bg-surface border border-border-subtle shadow-lg",
            bordered:
                "bg-surface border-2 border-primary shadow-lg",
            elevated:
                "bg-surface border border-border-subtle shadow-xl",
        };

        useLayoutEffect(() => {
            if (open && triggerRef.current && contentRef.current) {
                // Reset positioned state when opening
                setIsPositioned(false);

                const triggerRect = triggerRef.current.getBoundingClientRect();
                const contentRect = contentRef.current.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                let finalSide = side;
                let top = 0;
                let left = 0;

                // Check for collisions and adjust side if needed
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

                // Calculate position based on final side
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

                // Calculate alignment for top/bottom
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

                    // Prevent horizontal overflow
                    if (avoidCollisions) {
                        if (left < 0) left = 8;
                        if (left + contentRect.width > viewportWidth)
                            left = viewportWidth - contentRect.width - 8;
                    }
                }

                // Calculate alignment for left/right
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

                    // Prevent vertical overflow
                    if (avoidCollisions) {
                        if (top < 0) top = 8;
                        if (top + contentRect.height > viewportHeight)
                            top = viewportHeight - contentRect.height - 8;
                    }
                }

                setPosition({ top, left });

                // Calculate arrow position
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

                // Use requestAnimationFrame to ensure position is set before animation
                requestAnimationFrame(() => {
                    setIsPositioned(true);
                });
            } else {
                setIsPositioned(false);
            }
        }, [open, align, side, sideOffset, alignOffset, avoidCollisions, showArrow]);

        if (!open) return null;

        return (
            <>
                {/* Backdrop for modal variant */}


                {/* Content */}
                <div
                    ref={contentRef}
                    role="dialog"
                    aria-modal="true"
                    style={{
                        position: "fixed",
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        opacity: isPositioned ? undefined : 0,
                        visibility: isPositioned ? "visible" : "hidden",
                        zIndex: 50,
                    }}
                    className={`
            rounded-lg p-4
            ${isPositioned ? "animate-in fade-in-0 zoom-in-95 duration-200" : ""}
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
            ${variantClasses[variant]}
            ${className}
          `.trim()}
                    {...props}
                >
                    {/* Arrow */}
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
                                className={`
                  w-4 h-4 rotate-45
                  ${variant === "bordered"
                                        ? "bg-surface border-2 border-primary"
                                        : "bg-surface border border-border-subtle"
                                    }
                  ${currentSide === "bottom" && "border-b-0 border-r-0"}
                  ${currentSide === "top" && "border-t-0 border-l-0"}
                  ${currentSide === "left" && "border-l-0 border-b-0"}
                  ${currentSide === "right" && "border-r-0 border-t-0"}
                `}
                            />
                        </div>
                    )}

                    {/* Close Button */}
                    {closeButton && (
                        <Button
                            onClick={() => setOpen(false)}
                            variant="ghost"
                            size="small"
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-200"
                            aria-label="Close popover"
                        >
                            <Button.Icon>
                                <X className="w-4 h-4" />
                            </Button.Icon>
                        </Button>
                    )}

                    {/* Content */}
                    <div className="font-secondary text-slate-200">
                        {children}
                    </div>
                </div>
            </>
        );
    }
);

PopoverContent.displayName = "Popover.Content";

// Export main component with sub-components
export const Popover = Object.assign(PopoverRoot, {
    Trigger: PopoverTrigger,
    Content: PopoverContent,
});