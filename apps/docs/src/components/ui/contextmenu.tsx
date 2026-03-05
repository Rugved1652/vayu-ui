"use client";

import { clsx } from "clsx";
import { Check, ChevronRight, Circle } from "lucide-react";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Context types
// ============================================================================

interface ContextMenuContextValue {
    isOpen: boolean;
    closeMenu: () => void;
    openSubmenu: (id: string) => void;
    closeSubmenu: (id: string) => void;
    openSubmenus: Set<string>;
    menuId: string;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

const useContextMenuCtx = () => {
    const ctx = useContext(ContextMenuContext);
    if (!ctx) {
        throw new Error(
            "ContextMenu compound components must be used within ContextMenu"
        );
    }
    return ctx;
};

// RadioGroup context
interface RadioGroupCtxValue {
    value?: string;
    onValueChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupCtxValue | null>(null);

// Submenu context
const SubmenuContext = createContext<{ id: string } | null>(null);

// ============================================================================
// Prop interfaces
// ============================================================================

interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
}

interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    disabled?: boolean;
}

interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    onSelect?: () => void;
    disabled?: boolean;
    destructive?: boolean;
    icon?: React.ReactNode;
    shortcut?: string;
}

interface ContextMenuCheckboxItemProps
    extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    icon?: React.ReactNode;
}

interface ContextMenuRadioGroupProps {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
}

interface ContextMenuRadioItemProps
    extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    value: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

interface ContextMenuSubProps {
    children: React.ReactNode;
}

interface ContextMenuSubTriggerProps
    extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}

interface ContextMenuSubContentProps
    extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface ContextMenuSeparatorProps
    extends HTMLAttributes<HTMLDivElement> { }

interface ContextMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

// ============================================================================
// ContextMenu (Root)
// ============================================================================

const ContextMenuRoot = forwardRef<HTMLDivElement, ContextMenuProps>(
    ({ children, onOpenChange, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(
            new Set()
        );

        const menuId = useId();

        const closeMenu = useCallback(() => {
            setIsOpen(false);
            setOpenSubmenus(new Set());
            onOpenChange?.(false);
        }, [onOpenChange]);

        const openSubmenu = useCallback((id: string) => {
            setOpenSubmenus((prev) => new Set(prev).add(id));
        }, []);

        const closeSubmenu = useCallback((id: string) => {
            setOpenSubmenus((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }, []);

        // Close on click outside or Escape
        useEffect(() => {
            if (!isOpen) return;

            const handleClickOutside = () => closeMenu();
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") closeMenu();
            };

            document.addEventListener("click", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            return () => {
                document.removeEventListener("click", handleClickOutside);
                document.removeEventListener("keydown", handleEscape);
            };
        }, [isOpen, closeMenu]);

        const contextValue: ContextMenuContextValue = {
            isOpen,
            closeMenu,
            openSubmenu,
            closeSubmenu,
            openSubmenus,
            menuId,
        };

        return (
            <ContextMenuContext.Provider value={contextValue}>
                <div ref={ref} {...props}>
                    {React.Children.map(children, (child) => {
                        if (
                            React.isValidElement(child) &&
                            child.type === ContextMenuTrigger
                        ) {
                            return React.cloneElement(
                                child as React.ReactElement<
                                    ContextMenuTriggerProps & {
                                        onContextMenu?: (
                                            e: React.MouseEvent
                                        ) => void;
                                    }
                                >,
                                {
                                    onContextMenu: (
                                        e: React.MouseEvent
                                    ) => {
                                        e.preventDefault();
                                        setPosition({
                                            x: e.clientX,
                                            y: e.clientY,
                                        });
                                        setIsOpen(true);
                                        onOpenChange?.(true);
                                    },
                                }
                            );
                        }
                        if (
                            React.isValidElement(child) &&
                            child.type === ContextMenuContent
                        ) {
                            return isOpen
                                ? React.cloneElement(
                                    child as React.ReactElement<
                                        ContextMenuContentProps & {
                                            position?: {
                                                x: number;
                                                y: number;
                                            };
                                        }
                                    >,
                                    { position }
                                )
                                : null;
                        }
                        return child;
                    })}
                </div>
            </ContextMenuContext.Provider>
        );
    }
);

ContextMenuRoot.displayName = "ContextMenu";

// ============================================================================
// Trigger
// ============================================================================

const ContextMenuTrigger = forwardRef<
    HTMLDivElement,
    ContextMenuTriggerProps & {
        onContextMenu?: (e: React.MouseEvent) => void;
    }
>(({ children, disabled = false, className, onContextMenu, ...props }, ref) => {
    const handleContextMenu = useCallback(
        (e: React.MouseEvent) => {
            if (!disabled) onContextMenu?.(e);
        },
        [disabled, onContextMenu]
    );

    return (
        <div
            ref={ref}
            onContextMenu={handleContextMenu}
            className={clsx(
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
            aria-disabled={disabled || undefined}
            {...props}
        >
            {children}
        </div>
    );
});

ContextMenuTrigger.displayName = "ContextMenu.Trigger";

// ============================================================================
// Content
// ============================================================================

const ContextMenuContent = forwardRef<
    HTMLDivElement,
    ContextMenuContentProps & { position?: { x: number; y: number } }
>(
    (
        {
            children,
            className,
            align = "start",
            sideOffset = 4,
            position,
            ...props
        },
        ref
    ) => {
        const { closeMenu, menuId } = useContextMenuCtx();
        const [mounted, setMounted] = useState(false);
        const contentRef = useRef<HTMLDivElement>(null);
        const [adjustedPosition, setAdjustedPosition] = useState(
            position || { x: 0, y: 0 }
        );

        useEffect(() => {
            setMounted(true);
        }, []);

        useEffect(() => {
            if (position && contentRef.current) {
                const rect = contentRef.current.getBoundingClientRect();
                const vw = window.innerWidth;
                const vh = window.innerHeight;

                let x = position.x + sideOffset;
                let y = position.y + sideOffset;

                if (x + rect.width > vw - 8) x = vw - rect.width - 8;
                if (y + rect.height > vh - 8) y = vh - rect.height - 8;
                if (x < 8) x = 8;
                if (y < 8) y = 8;

                setAdjustedPosition({ x, y });
            }
        }, [position, sideOffset]);

        if (!mounted || !position) return null;

        return createPortal(
            <div
                ref={contentRef}
                id={menuId}
                role="menu"
                aria-label="Context menu"
                style={{
                    position: "fixed",
                    top: `${adjustedPosition.y}px`,
                    left: `${adjustedPosition.x}px`,
                    zIndex: 9999,
                }}
                className={clsx(
                    "min-w-[220px] bg-white dark:bg-neutral-900",
                    "border-2 border-neutral-200 dark:border-neutral-800",
                    "rounded-lg shadow-2xl py-1",
                    "animate-in fade-in-0 zoom-in-95 duration-200",
                    className
                )}
                onClick={(e) => e.stopPropagation()}
                {...props}
            >
                {children}
            </div>,
            document.body
        );
    }
);

ContextMenuContent.displayName = "ContextMenu.Content";

// ============================================================================
// Item
// ============================================================================

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
    (
        {
            children,
            onSelect,
            disabled = false,
            destructive = false,
            icon,
            shortcut,
            className,
            ...props
        },
        ref
    ) => {
        const { closeMenu } = useContextMenuCtx();

        const handleClick = useCallback(() => {
            if (disabled) return;
            onSelect?.();
            closeMenu();
        }, [disabled, onSelect, closeMenu]);

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            },
            [handleClick]
        );

        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled || undefined}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "px-3 py-2 mx-1 rounded-md flex items-center justify-between gap-3",
                    "font-secondary text-sm transition-colors cursor-pointer",
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : destructive
                            ? "text-error-700 dark:text-error-300 hover:bg-error-50 dark:hover:bg-error-900/20"
                            : "text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20",
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {icon && (
                        <span className="shrink-0 w-4 h-4" aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    <span className="truncate">{children}</span>
                </div>
                {shortcut && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono shrink-0">
                        {shortcut}
                    </span>
                )}
            </div>
        );
    }
);

ContextMenuItem.displayName = "ContextMenu.Item";

// ============================================================================
// CheckboxItem
// ============================================================================

const ContextMenuCheckboxItem = forwardRef<
    HTMLDivElement,
    ContextMenuCheckboxItemProps
>(
    (
        {
            children,
            checked = false,
            onCheckedChange,
            disabled = false,
            icon,
            className,
            ...props
        },
        ref
    ) => {
        const handleClick = useCallback(() => {
            if (!disabled) onCheckedChange?.(!checked);
        }, [disabled, checked, onCheckedChange]);

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            },
            [handleClick]
        );

        return (
            <div
                ref={ref}
                role="menuitemcheckbox"
                aria-checked={checked}
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled || undefined}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "px-3 py-2 mx-1 rounded-md flex items-center gap-3",
                    "font-secondary text-sm transition-colors cursor-pointer",
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20",
                    className
                )}
                {...props}
            >
                <span className="shrink-0 w-4 h-4" aria-hidden="true">
                    {checked ? (
                        <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    ) : (
                        <span className="w-4 h-4" />
                    )}
                </span>
                {icon && (
                    <span className="shrink-0 w-4 h-4" aria-hidden="true">
                        {icon}
                    </span>
                )}
                <span className="truncate">{children}</span>
            </div>
        );
    }
);

ContextMenuCheckboxItem.displayName = "ContextMenu.CheckboxItem";

// ============================================================================
// RadioGroup
// ============================================================================

const ContextMenuRadioGroup: React.FC<ContextMenuRadioGroupProps> = ({
    children,
    value,
    onValueChange,
}) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <div role="group">{children}</div>
    </RadioGroupContext.Provider>
);

ContextMenuRadioGroup.displayName = "ContextMenu.RadioGroup";

// ============================================================================
// RadioItem
// ============================================================================

const ContextMenuRadioItem = forwardRef<
    HTMLDivElement,
    ContextMenuRadioItemProps
>(({ children, value, disabled = false, icon, className, ...props }, ref) => {
    const radioCtx = useContext(RadioGroupContext);
    const isSelected = radioCtx?.value === value;

    const handleClick = useCallback(() => {
        if (!disabled) radioCtx?.onValueChange?.(value);
    }, [disabled, radioCtx, value]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
            }
        },
        [handleClick]
    );

    return (
        <div
            ref={ref}
            role="menuitemradio"
            aria-checked={isSelected}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled || undefined}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={clsx(
                "px-3 py-2 mx-1 rounded-md flex items-center gap-3",
                "font-secondary text-sm transition-colors cursor-pointer",
                disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20",
                className
            )}
            {...props}
        >
            <span className="shrink-0 w-4 h-4" aria-hidden="true">
                {isSelected ? (
                    <Circle className="w-4 h-4 fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400" />
                ) : (
                    <Circle className="w-4 h-4 text-neutral-300 dark:text-neutral-700" />
                )}
            </span>
            {icon && (
                <span className="shrink-0 w-4 h-4" aria-hidden="true">
                    {icon}
                </span>
            )}
            <span className="truncate">{children}</span>
        </div>
    );
});

ContextMenuRadioItem.displayName = "ContextMenu.RadioItem";

// ============================================================================
// Sub (wrapper)
// ============================================================================

const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children }) => {
    const id = useId();
    return (
        <SubmenuContext.Provider value={{ id }}>
            {children}
        </SubmenuContext.Provider>
    );
};

ContextMenuSub.displayName = "ContextMenu.Sub";

// ============================================================================
// SubTrigger
// ============================================================================

const ContextMenuSubTrigger = forwardRef<
    HTMLDivElement,
    ContextMenuSubTriggerProps
>(({ children, disabled = false, icon, className, ...props }, ref) => {
    const { openSubmenu, closeSubmenu, openSubmenus } = useContextMenuCtx();
    const submenuCtx = useContext(SubmenuContext);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const submenuId = submenuCtx?.id ?? "";
    const isOpen = submenuId ? openSubmenus.has(submenuId) : false;

    const handleMouseEnter = useCallback(() => {
        if (disabled || !submenuId) return;
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({ x: rect.right, y: rect.top });
        }
        openSubmenu(submenuId);
    }, [disabled, submenuId, openSubmenu]);

    const handleMouseLeave = useCallback(() => {
        if (submenuId) closeSubmenu(submenuId);
    }, [submenuId, closeSubmenu]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (
                (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") &&
                !disabled
            ) {
                e.preventDefault();
                handleMouseEnter();
            }
            if (e.key === "ArrowLeft" || e.key === "Escape") {
                handleMouseLeave();
            }
        },
        [disabled, handleMouseEnter, handleMouseLeave]
    );

    return (
        <>
            <div
                ref={triggerRef}
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled || undefined}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "px-3 py-2 mx-1 rounded-md flex items-center justify-between gap-3",
                    "font-secondary text-sm transition-colors cursor-pointer",
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20",
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {icon && (
                        <span className="shrink-0 w-4 h-4" aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    <span className="truncate">{children}</span>
                </div>
                <ChevronRight
                    className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400"
                    aria-hidden="true"
                />
            </div>

            {isOpen &&
                React.Children.map(children, (child) => {
                    if (
                        React.isValidElement(child) &&
                        child.type === ContextMenuSubContent
                    ) {
                        return React.cloneElement(
                            child as React.ReactElement<
                                ContextMenuSubContentProps & {
                                    position?: { x: number; y: number };
                                    onMouseEnter?: () => void;
                                    onMouseLeave?: () => void;
                                }
                            >,
                            {
                                position,
                                onMouseEnter: handleMouseEnter,
                                onMouseLeave: handleMouseLeave,
                            }
                        );
                    }
                    return null;
                })}
        </>
    );
});

ContextMenuSubTrigger.displayName = "ContextMenu.SubTrigger";

// ============================================================================
// SubContent
// ============================================================================

const ContextMenuSubContent = forwardRef<
    HTMLDivElement,
    ContextMenuSubContentProps & {
        position?: { x: number; y: number };
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
    }
>(
    (
        {
            children,
            className,
            position,
            onMouseEnter,
            onMouseLeave,
            ...props
        },
        ref
    ) => {
        const [mounted, setMounted] = useState(false);
        const contentRef = useRef<HTMLDivElement>(null);
        const [adjustedPosition, setAdjustedPosition] = useState(
            position || { x: 0, y: 0 }
        );

        useEffect(() => {
            setMounted(true);
        }, []);

        useEffect(() => {
            if (position && contentRef.current) {
                const rect = contentRef.current.getBoundingClientRect();
                const vw = window.innerWidth;
                const vh = window.innerHeight;

                let x = position.x + 4;
                let y = position.y;

                if (x + rect.width > vw - 8) x = position.x - rect.width - 8;
                if (y + rect.height > vh - 8) y = vh - rect.height - 8;
                if (x < 8) x = 8;
                if (y < 8) y = 8;

                setAdjustedPosition({ x, y });
            }
        }, [position]);

        if (!mounted || !position) return null;

        return createPortal(
            <div
                ref={contentRef}
                role="menu"
                aria-label="Submenu"
                style={{
                    position: "fixed",
                    top: `${adjustedPosition.y}px`,
                    left: `${adjustedPosition.x}px`,
                    zIndex: 10000,
                }}
                className={clsx(
                    "min-w-[200px] bg-white dark:bg-neutral-900",
                    "border-2 border-neutral-200 dark:border-neutral-800",
                    "rounded-lg shadow-2xl py-1",
                    "animate-in fade-in-0 zoom-in-95 duration-200",
                    className
                )}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={(e) => e.stopPropagation()}
                {...props}
            >
                {children}
            </div>,
            document.body
        );
    }
);

ContextMenuSubContent.displayName = "ContextMenu.SubContent";

// ============================================================================
// Separator
// ============================================================================

const ContextMenuSeparator = forwardRef<
    HTMLDivElement,
    ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        role="separator"
        className={clsx(
            "my-1 mx-2 h-px bg-neutral-200 dark:bg-neutral-800",
            className
        )}
        {...props}
    />
));

ContextMenuSeparator.displayName = "ContextMenu.Separator";

// ============================================================================
// Label
// ============================================================================

const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            role="presentation"
            className={clsx(
                "px-3 py-2 text-xs font-secondary font-semibold",
                "text-neutral-500 dark:text-neutral-400 uppercase tracking-wider",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);

ContextMenuLabel.displayName = "ContextMenu.Label";

// ============================================================================
// Compound export
// ============================================================================

const ContextMenu = Object.assign(ContextMenuRoot, {
    Trigger: ContextMenuTrigger,
    Content: ContextMenuContent,
    Item: ContextMenuItem,
    CheckboxItem: ContextMenuCheckboxItem,
    RadioGroup: ContextMenuRadioGroup,
    RadioItem: ContextMenuRadioItem,
    Sub: ContextMenuSub,
    SubTrigger: ContextMenuSubTrigger,
    SubContent: ContextMenuSubContent,
    Separator: ContextMenuSeparator,
    Label: ContextMenuLabel,
});

export { ContextMenu };

export type {
    ContextMenuCheckboxItemProps,
    ContextMenuContentProps,
    ContextMenuItemProps,
    ContextMenuLabelProps,
    ContextMenuProps,
    ContextMenuRadioGroupProps,
    ContextMenuRadioItemProps,
    ContextMenuSeparatorProps,
    ContextMenuSubContentProps,
    ContextMenuSubProps,
    ContextMenuSubTriggerProps,
    ContextMenuTriggerProps,
};
