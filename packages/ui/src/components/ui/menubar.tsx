"use client";
import React, {
    createContext,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
    useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useElementPosition } from "vayu-ui";

// ==================== Types ====================

type Orientation = "horizontal" | "vertical";

interface MenubarContextValue {
    orientation: Orientation;
    activeMenu: string | null;
    setActiveMenu: (id: string | null) => void;
    closeAllMenus: () => void;
}

interface MenuContextValue {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    level: number;
    parentId: string;
}

interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    orientation?: Orientation;
}

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    trigger: React.ReactNode;
    disabled?: boolean;
}

interface MenuItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    danger?: boolean;
    onSelect?: () => void;
}

interface MenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface MenuCheckboxItemProps extends Omit<MenuItemProps, "onSelect"> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

interface MenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
}

interface MenuRadioItemProps extends Omit<MenuItemProps, "onSelect"> {
    value: string;
}

// ==================== Menubar Context ====================

const MenubarContext = createContext<MenubarContextValue | undefined>(undefined);

const useMenubarContext = () => {
    const context = useContext(MenubarContext);
    if (!context) {
        throw new Error("Menubar compound components must be used within Menubar");
    }
    return context;
};

// ==================== Menu Context ====================

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("Menu compound components must be used within Menu");
    }
    return context;
};

// ==================== Portal Component ====================

interface PortalProps {
    children: React.ReactNode;
}

const Portal = ({ children }: PortalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(children, document.body);
};

// ==================== Main Menubar Component ====================

export const Menubar = ({
    children,
    orientation = "horizontal",
    className = "",
    ...props
}: MenubarProps) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const closeAllMenus = useCallback(() => {
        setActiveMenu(null);
    }, []);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest("[data-menubar]") &&
                !target.closest("[data-menu-portal]")
            ) {
                closeAllMenus();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeAllMenus]);

    // Close menus on Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeAllMenus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closeAllMenus]);

    return (
        <MenubarContext.Provider
            value={{ orientation, activeMenu, setActiveMenu, closeAllMenus }}
        >
            <div
                data-menubar
                className={`
                    bg-white dark:bg-ground-900
                    border border-ground-200 dark:border-ground-700
                    rounded p-1
                    ${orientation === "horizontal" ? "flex items-center gap-1" : "flex flex-col gap-1"}
                    font-secondary
                    duration-[var(--transition-fast)]
                    ${className}
                `}
                role="menubar"
                aria-orientation={orientation}
                {...props}
            >
                {children}
            </div>
        </MenubarContext.Provider>
    );
};

// ==================== Menu Component ====================

const Menu = ({
    children,
    trigger,
    disabled = false,
    className = "",
    ...props
}: MenuProps) => {
    const { orientation, activeMenu, setActiveMenu } = useMenubarContext();
    const menuId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const level = 0;

    const position = useElementPosition(triggerRef, isOpen);

    // Sync with global active menu state
    useEffect(() => {
        setIsOpen(activeMenu === menuId);
    }, [activeMenu, menuId]);

    const handleTriggerClick = () => {
        if (disabled) return;
        if (activeMenu === menuId) {
            setActiveMenu(null);
        } else {
            setActiveMenu(menuId);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
            case "ArrowDown":
                e.preventDefault();
                setActiveMenu(menuId);
                setTimeout(() => {
                    const firstItem = menuRef.current?.querySelector<HTMLElement>(
                        '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                    );
                    firstItem?.focus();
                }, 0);
                break;
            case "Escape":
                e.preventDefault();
                setActiveMenu(null);
                triggerRef.current?.focus();
                break;
            case "ArrowRight":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    const nextTrigger =
                        triggerRef.current?.parentElement?.nextElementSibling?.querySelector(
                            "button[aria-haspopup]"
                        );
                    (nextTrigger as HTMLElement)?.focus();
                }
                break;
            case "ArrowLeft":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    const prevTrigger =
                        triggerRef.current?.parentElement?.previousElementSibling?.querySelector(
                            "button[aria-haspopup]"
                        );
                    (prevTrigger as HTMLElement)?.focus();
                }
                break;
        }
    };

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen, level, parentId: menuId }}>
            <div className={`relative ${className}`} {...props}>
                <button
                    ref={triggerRef}
                    className={`
                        text-ground-900 dark:text-ground-100
                        hover:bg-ground-100 dark:hover:bg-ground-800
                        data-[state=open]:bg-ground-100 dark:data-[state=open]:bg-ground-800
                        px-3 py-2 rounded-sm
                        duration-[var(--transition-fast)]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                        dark:focus-visible:ring-offset-ground-900
                        disabled:opacity-50 disabled:cursor-not-allowed
                        text-sm font-medium
                    `}
                    onClick={handleTriggerClick}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    data-state={isOpen ? "open" : "closed"}
                >
                    {trigger}
                </button>

                {isOpen && (
                    <Portal>
                        <div
                            ref={menuRef}
                            data-menu-portal
                            className={`
                                fixed min-w-[200px] z-50
                                bg-white dark:bg-ground-800
                                border border-ground-200 dark:border-ground-700
                                rounded shadow-outer
                                py-1
                                animate-fade-in
                            `}
                            style={{
                                top: `${position.top}px`,
                                left: `${position.left}px`,
                            }}
                            role="menu"
                            aria-orientation="vertical"
                        >
                            {children}
                        </div>
                    </Portal>
                )}
            </div>
        </MenuContext.Provider>
    );
};

// ==================== SubMenu Component ====================

const SubMenu = ({
    children,
    trigger,
    disabled = false,
    className = "",
    ...props
}: MenuProps) => {
    const parentContext = useMenuContext();
    const submenuId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const level = parentContext.level + 1;
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const position = useElementPosition(triggerRef, isOpen);

    const handleMouseEnter = () => {
        if (disabled) return;
        clearTimeout(closeTimeoutRef.current);
        openTimeoutRef.current = setTimeout(() => {
            setIsOpen(true);
        }, 150);
    };

    const handleMouseLeave = () => {
        clearTimeout(openTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
            case "ArrowRight":
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => {
                    const firstItem = menuRef.current?.querySelector<HTMLElement>(
                        '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                    );
                    firstItem?.focus();
                }, 0);
                break;
            case "ArrowLeft":
                e.preventDefault();
                setIsOpen(false);
                triggerRef.current?.focus();
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                triggerRef.current?.focus();
                break;
        }
    };

    return (
        <MenuContext.Provider
            value={{
                isOpen,
                setIsOpen,
                level,
                parentId: submenuId,
            }}
        >
            <div
                className={`relative ${className}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <button
                    ref={triggerRef}
                    className={`
                        text-ground-900 dark:text-ground-100
                        hover:bg-ground-100 dark:hover:bg-ground-800
                        data-[state=open]:bg-ground-100 dark:data-[state=open]:bg-ground-800
                        w-full px-3 py-2 text-left text-sm
                        duration-[var(--transition-fast)]
                        focus:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-600
                        dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-between gap-2
                    `}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    data-state={isOpen ? "open" : "closed"}
                >
                    <span>{trigger}</span>
                    <svg
                        className="w-4 h-4 shrink-0 text-ground-500 dark:text-ground-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <Portal>
                        <div
                            ref={menuRef}
                            data-menu-portal
                            className={`
                                fixed min-w-[200px] z-50
                                bg-white dark:bg-ground-800
                                border border-ground-200 dark:border-ground-700
                                rounded shadow-outer
                                py-1
                                animate-fade-in
                            `}
                            style={{
                                top: `${position.top}px`,
                                left: `${position.left + position.width}px`,
                            }}
                            role="menu"
                            aria-orientation="vertical"
                        >
                            {children}
                        </div>
                    </Portal>
                )}
            </div>
        </MenuContext.Provider>
    );
};

// ==================== MenuItem Component ====================

const MenuItem = ({
    children,
    icon,
    shortcut,
    disabled = false,
    danger = false,
    onSelect,
    className = "",
    ...props
}: MenuItemProps) => {
    const { closeAllMenus } = useMenubarContext();
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (disabled) return;
        onSelect?.();
        closeAllMenus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                handleClick();
                break;
            case "ArrowDown":
                e.preventDefault();
                const nextItem =
                    itemRef.current?.parentElement?.nextElementSibling?.querySelector<HTMLElement>(
                        '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                    );
                nextItem?.focus();
                break;
            case "ArrowUp":
                e.preventDefault();
                const prevItem =
                    itemRef.current?.parentElement?.previousElementSibling?.querySelector<HTMLElement>(
                        '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                    );
                prevItem?.focus();
                break;
        }
    };

    const itemClasses = danger
        ? "text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950"
        : "text-ground-900 dark:text-ground-100 hover:bg-ground-100 dark:hover:bg-ground-800";

    return (
        <button
            ref={itemRef}
            className={`
                ${itemClasses}
                w-full px-3 py-2 text-left text-sm
                duration-[var(--transition-fast)]
                focus:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-600
                dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-between gap-2
                ${className}
            `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            {...props}
        >
            <div className="flex items-center gap-2">
                {icon && (
                    <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                        {icon}
                    </span>
                )}
                <span>{children}</span>
            </div>
            {shortcut && (
                <span className="text-xs text-ground-500 dark:text-ground-400" aria-label={`Shortcut: ${shortcut}`}>
                    {shortcut}
                </span>
            )}
        </button>
    );
};

// ==================== MenuSeparator Component ====================

const MenuSeparator = ({ className = "", ...props }: MenuSeparatorProps) => {
    return (
        <div
            className={`my-1 h-px bg-ground-200 dark:bg-ground-700 ${className}`}
            role="separator"
            aria-orientation="horizontal"
            {...props}
        />
    );
};

// ==================== MenuLabel Component ====================

const MenuLabel = ({ children, className = "", ...props }: MenuLabelProps) => {
    return (
        <div
            className={`
                px-3 py-2 text-xs font-semibold uppercase tracking-wide
                text-ground-500 dark:text-ground-400
                ${className}
            `}
            role="presentation"
            {...props}
        >
            {children}
        </div>
    );
};

// ==================== MenuCheckboxItem Component ====================

const MenuCheckboxItem = ({
    children,
    icon,
    shortcut,
    checked = false,
    disabled = false,
    onCheckedChange,
    className = "",
    ...props
}: MenuCheckboxItemProps) => {
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (disabled) return;
        onCheckedChange?.(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                handleClick();
                break;
            case "ArrowDown":
                e.preventDefault();
                const nextItem =
                    itemRef.current?.parentElement?.nextElementSibling?.querySelector<HTMLElement>(
                        '[role="menuitemcheckbox"]:not([disabled]), [role="menuitem"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                    );
                nextItem?.focus();
                break;
            case "ArrowUp":
                e.preventDefault();
                const prevItem =
                    itemRef.current?.parentElement?.previousElementSibling?.querySelector<HTMLElement>(
                        '[role="menuitemcheckbox"]:not([disabled]), [role="menuitem"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                    );
                prevItem?.focus();
                break;
        }
    };

    return (
        <button
            ref={itemRef}
            className={`
                text-ground-900 dark:text-ground-100
                hover:bg-ground-100 dark:hover:bg-ground-800
                w-full px-3 py-2 text-left text-sm
                duration-[var(--transition-fast)]
                focus:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-600
                dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-between gap-2
                ${className}
            `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            role="menuitemcheckbox"
            aria-checked={checked}
            tabIndex={disabled ? -1 : 0}
            {...props}
        >
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    {checked && (
                        <svg
                            className="w-4 h-4 text-primary-600 dark:text-primary-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </span>
                {icon && (
                    <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                        {icon}
                    </span>
                )}
                <span>{children}</span>
            </div>
            {shortcut && (
                <span className="text-xs text-ground-500 dark:text-ground-400" aria-label={`Shortcut: ${shortcut}`}>
                    {shortcut}
                </span>
            )}
        </button>
    );
};

// ==================== MenuRadioGroup Context ====================

const MenuRadioGroupContext = createContext<
    | {
        value?: string;
        onValueChange?: (value: string) => void;
    }
    | undefined
>(undefined);

// ==================== MenuRadioGroup Component ====================

const MenuRadioGroup = ({
    children,
    value,
    onValueChange,
    className = "",
    ...props
}: MenuRadioGroupProps) => {
    return (
        <MenuRadioGroupContext.Provider value={{ value, onValueChange }}>
            <div className={className} role="group" {...props}>
                {children}
            </div>
        </MenuRadioGroupContext.Provider>
    );
};

// ==================== MenuRadioItem Component ====================

const MenuRadioItem = ({
    children,
    icon,
    shortcut,
    value,
    disabled = false,
    className = "",
    ...props
}: MenuRadioItemProps) => {
    const radioContext = useContext(MenuRadioGroupContext);
    const itemRef = useRef<HTMLButtonElement>(null);

    const isChecked = radioContext?.value === value;

    const handleClick = () => {
        if (disabled) return;
        radioContext?.onValueChange?.(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                handleClick();
                break;
            case "ArrowDown":
                e.preventDefault();
                const nextItem =
                    itemRef.current?.parentElement?.nextElementSibling?.querySelector<HTMLElement>(
                        '[role="menuitemradio"]:not([disabled])'
                    );
                nextItem?.focus();
                break;
            case "ArrowUp":
                e.preventDefault();
                const prevItem =
                    itemRef.current?.parentElement?.previousElementSibling?.querySelector<HTMLElement>(
                        '[role="menuitemradio"]:not([disabled])'
                    );
                prevItem?.focus();
                break;
        }
    };

    return (
        <button
            ref={itemRef}
            className={`
                text-ground-900 dark:text-ground-100
                hover:bg-ground-100 dark:hover:bg-ground-800
                w-full px-3 py-2 text-left text-sm
                duration-[var(--transition-fast)]
                focus:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-600
                dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-between gap-2
                ${className}
            `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            role="menuitemradio"
            aria-checked={isChecked}
            tabIndex={disabled ? -1 : 0}
            {...props}
        >
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    {isChecked && (
                        <svg
                            className="w-4 h-4 text-primary-600 dark:text-primary-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="4" />
                        </svg>
                    )}
                </span>
                {icon && (
                    <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                        {icon}
                    </span>
                )}
                <span>{children}</span>
            </div>
            {shortcut && (
                <span className="text-xs text-ground-500 dark:text-ground-400" aria-label={`Shortcut: ${shortcut}`}>
                    {shortcut}
                </span>
            )}
        </button>
    );
};

// ==================== Attach Compound Components ====================

Menubar.Menu = Menu;
Menubar.SubMenu = SubMenu;
Menubar.Item = MenuItem;
Menubar.Separator = MenuSeparator;
Menubar.Label = MenuLabel;
Menubar.CheckboxItem = MenuCheckboxItem;
Menubar.RadioGroup = MenuRadioGroup;
Menubar.RadioItem = MenuRadioItem;

// ==================== Exports ====================

export default Menubar;