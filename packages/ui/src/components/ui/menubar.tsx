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
    registerTrigger: (id: string, ref: React.RefObject<HTMLButtonElement>) => void;
    unregisterTrigger: (id: string) => void;
    getAllTriggers: () => Array<{ id: string; ref: React.RefObject<HTMLButtonElement> }>;
}

interface MenuContextValue {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    level: number;
    parentId: string;
    menuRef: React.RefObject<HTMLDivElement | null>;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    handleTypeahead: (key: string) => void;
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
    const triggersRef = useRef<Map<string, React.RefObject<HTMLButtonElement>>>(new Map());

    const closeAllMenus = useCallback(() => {
        setActiveMenu(null);
    }, []);

    const registerTrigger = useCallback((id: string, ref: React.RefObject<HTMLButtonElement>) => {
        triggersRef.current.set(id, ref);
    }, []);

    const unregisterTrigger = useCallback((id: string) => {
        triggersRef.current.delete(id);
    }, []);

    const getAllTriggers = useCallback(() => {
        return Array.from(triggersRef.current.entries()).map(([id, ref]) => ({ id, ref }));
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
            value={{ 
                orientation, 
                activeMenu, 
                setActiveMenu, 
                closeAllMenus,
                registerTrigger,
                unregisterTrigger,
                getAllTriggers,
            }}
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
    const { orientation, activeMenu, setActiveMenu, registerTrigger, unregisterTrigger, getAllTriggers } = useMenubarContext();
    const menuId = useId();
    const triggerId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const level = 0;
    const typeaheadRef = useRef<{ buffer: string; timeout: ReturnType<typeof setTimeout> | null }>({
        buffer: '',
        timeout: null
    });

    const position = useElementPosition(triggerRef, isOpen);

    // Register this trigger
    useEffect(() => {
        registerTrigger(menuId, triggerRef);
        return () => unregisterTrigger(menuId);
    }, [menuId, registerTrigger, unregisterTrigger]);

    // Sync with global active menu state
    useEffect(() => {
        setIsOpen(activeMenu === menuId);
    }, [activeMenu, menuId]);

    // Typeahead navigation
    const handleTypeahead = useCallback((key: string) => {
        if (!menuRef.current) return;

        // Clear previous timeout
        if (typeaheadRef.current.timeout) {
            clearTimeout(typeaheadRef.current.timeout);
        }

        // Add key to buffer
        typeaheadRef.current.buffer += key.toLowerCase();

        // Find matching items
        const items = menuRef.current.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
        );

        // Find first item that starts with the buffer
        const match = Array.from(items).find(item =>
            item.textContent?.toLowerCase().startsWith(typeaheadRef.current.buffer)
        );
        match?.focus();

        // Reset buffer after 500ms
        typeaheadRef.current.timeout = setTimeout(() => {
            typeaheadRef.current.buffer = '';
        }, 500);
    }, []);

    const handleTriggerClick = () => {
        if (disabled) return;
        if (activeMenu === menuId) {
            setActiveMenu(null);
        } else {
            setActiveMenu(menuId);
        }
    };

    const focusFirstItem = useCallback(() => {
        requestAnimationFrame(() => {
            const firstItem = menuRef.current?.querySelector<HTMLElement>(
                '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
            );
            firstItem?.focus();
        });
    }, []);

    const focusLastItem = useCallback(() => {
        requestAnimationFrame(() => {
            const items = menuRef.current?.querySelectorAll<HTMLElement>(
                '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
            );
            const lastItem = items?.[items.length - 1];
            lastItem?.focus();
        });
    }, []);

    // Focus first item when menu opens
    useEffect(() => {
        if (isOpen) {
            focusFirstItem();
        }
    }, [isOpen, focusFirstItem]);

    const navigateToAdjacentMenu = useCallback((direction: 'next' | 'prev') => {
        const triggers = getAllTriggers();
        const currentIndex = triggers.findIndex(t => t.id === menuId);
        
        if (currentIndex === -1) return;

        const targetIndex = direction === 'next' 
            ? (currentIndex + 1) % triggers.length
            : currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;

        const targetTrigger = triggers[targetIndex];
        if (targetTrigger && targetTrigger.ref.current) {
            // Focus the target trigger
            targetTrigger.ref.current.focus();
            // If current menu was open, open the target menu too
            if (isOpen) {
                setActiveMenu(targetTrigger.id);
            }
        }
    }, [getAllTriggers, menuId, isOpen, setActiveMenu]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                setActiveMenu(menuId);
                break;
            case "ArrowDown":
                e.preventDefault();
                setActiveMenu(menuId);
                focusFirstItem();
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveMenu(menuId);
                focusLastItem();
                break;
            case "Escape":
                e.preventDefault();
                setActiveMenu(null);
                triggerRef.current?.focus();
                break;
            case "ArrowRight":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    navigateToAdjacentMenu('next');
                }
                break;
            case "ArrowLeft":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    navigateToAdjacentMenu('prev');
                }
                break;
            case "Home":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    const triggers = getAllTriggers();
                    triggers[0]?.ref.current?.focus();
                }
                break;
            case "End":
                if (orientation === "horizontal") {
                    e.preventDefault();
                    const triggers = getAllTriggers();
                    triggers[triggers.length - 1]?.ref.current?.focus();
                }
                break;
        }
    };

    // Handle printable characters for typeahead
    const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            handleTypeahead(e.key);
        }
    }, [handleTypeahead]);

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen, level, parentId: menuId, menuRef, triggerRef, handleTypeahead }}>
            <div className={`relative ${className}`} data-menu-id={menuId} {...props}>
                <button
                    ref={triggerRef}
                    id={triggerId}
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
                    aria-controls={isOpen ? menuId : undefined}
                    aria-disabled={disabled || undefined}
                    data-state={isOpen ? "open" : "closed"}
                >
                    {trigger}
                </button>

                {isOpen && (
                    <Portal>
                        <div
                            ref={menuRef}
                            id={menuId}
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
                            aria-labelledby={triggerId}
                            onKeyDown={handleMenuKeyDown}
                            tabIndex={-1}
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
    const triggerId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const level = parentContext.level + 1;
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const typeaheadRef = useRef<{ buffer: string; timeout: ReturnType<typeof setTimeout> | null }>({
        buffer: '',
        timeout: null
    });

    const position = useElementPosition(triggerRef, isOpen);

    // Typeahead navigation
    const handleTypeahead = useCallback((key: string) => {
        if (!menuRef.current) return;

        // Clear previous timeout
        if (typeaheadRef.current.timeout) {
            clearTimeout(typeaheadRef.current.timeout);
        }

        // Add key to buffer
        typeaheadRef.current.buffer += key.toLowerCase();

        // Find matching items
        const items = menuRef.current.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
        );

        // Find first item that starts with the buffer
        const match = Array.from(items).find(item =>
            item.textContent?.toLowerCase().startsWith(typeaheadRef.current.buffer)
        );
        match?.focus();

        // Reset buffer after 500ms
        typeaheadRef.current.timeout = setTimeout(() => {
            typeaheadRef.current.buffer = '';
        }, 500);
    }, []);

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

    const focusFirstItem = useCallback(() => {
        requestAnimationFrame(() => {
            const firstItem = menuRef.current?.querySelector<HTMLElement>(
                '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
            );
            firstItem?.focus();
        });
    }, []);

    const focusLastItem = useCallback(() => {
        requestAnimationFrame(() => {
            const items = menuRef.current?.querySelectorAll<HTMLElement>(
                '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
            );
            const lastItem = items?.[items.length - 1];
            lastItem?.focus();
        });
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
            case " ":
            case "ArrowRight":
                e.preventDefault();
                e.stopPropagation(); // Stop propagation to prevent parent menu from handling
                setIsOpen(true);
                focusFirstItem();
                break;
            case "ArrowLeft":
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
                triggerRef.current?.focus();
                break;
            case "ArrowDown":
                e.preventDefault();
                e.stopPropagation();
                // Navigate to next item in parent menu
                const parentMenu = triggerRef.current?.closest('[role="menu"]');
                const items = parentMenu?.querySelectorAll<HTMLElement>(
                    '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                );
                if (items && items.length > 0) {
                    const currentIndex = Array.from(items).indexOf(triggerRef.current!);
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex]?.focus();
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                e.stopPropagation();
                // Navigate to previous item in parent menu
                const parentMenuUp = triggerRef.current?.closest('[role="menu"]');
                const itemsUp = parentMenuUp?.querySelectorAll<HTMLElement>(
                    '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                );
                if (itemsUp && itemsUp.length > 0) {
                    const currentIndex = Array.from(itemsUp).indexOf(triggerRef.current!);
                    const prevIndex = currentIndex <= 0 ? itemsUp.length - 1 : currentIndex - 1;
                    itemsUp[prevIndex]?.focus();
                }
                break;
            case "Escape":
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
                triggerRef.current?.focus();
                break;
            case "Home":
                e.preventDefault();
                e.stopPropagation();
                const parentMenuHome = triggerRef.current?.closest('[role="menu"]');
                const itemsHome = parentMenuHome?.querySelectorAll<HTMLElement>(
                    '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                );
                itemsHome?.[0]?.focus();
                break;
            case "End":
                e.preventDefault();
                e.stopPropagation();
                const parentMenuEnd = triggerRef.current?.closest('[role="menu"]');
                const itemsEnd = parentMenuEnd?.querySelectorAll<HTMLElement>(
                    '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
                );
                if (itemsEnd && itemsEnd.length > 0) {
                    itemsEnd[itemsEnd.length - 1]?.focus();
                }
                break;
        }
    };

    // Handle printable characters for typeahead on submenu
    const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            handleTypeahead(e.key);
        }
    }, [handleTypeahead]);

    return (
        <MenuContext.Provider
            value={{
                isOpen,
                setIsOpen,
                level,
                parentId: submenuId,
                menuRef,
                triggerRef,
                handleTypeahead,
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
                    id={triggerId}
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
                    aria-controls={isOpen ? submenuId : undefined}
                    aria-disabled={disabled || undefined}
                    data-state={isOpen ? "open" : "closed"}
                    tabIndex={0}
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
                            id={submenuId}
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
                            aria-labelledby={triggerId}
                            onKeyDown={handleMenuKeyDown}
                            tabIndex={-1}
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
    const { closeAllMenus, orientation, getAllTriggers, activeMenu } = useMenubarContext();
    const menuContext = useMenuContext();
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (disabled) return;
        onSelect?.();
        closeAllMenus();
    };

    const navigateToAdjacentMenu = useCallback((direction: 'next' | 'prev') => {
        const triggers = getAllTriggers();
        const currentIndex = triggers.findIndex(t => t.id === activeMenu);
        
        if (currentIndex === -1) return;

        const targetIndex = direction === 'next' 
            ? (currentIndex + 1) % triggers.length
            : currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;

        const targetTrigger = triggers[targetIndex];
        if (targetTrigger && targetTrigger.ref.current) {
            // Close current menu and open target menu
            closeAllMenus();
            requestAnimationFrame(() => {
                targetTrigger.ref.current?.click();
            });
        }
    }, [getAllTriggers, activeMenu, closeAllMenus]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        const menuEl = itemRef.current?.closest('[role="menu"]');
        const items = menuEl?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
        );

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                e.stopPropagation();
                handleClick();
                break;
            case "ArrowDown":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    const currentIndex = Array.from(items).indexOf(itemRef.current!);
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex]?.focus();
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    const currentIndex = Array.from(items).indexOf(itemRef.current!);
                    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                    items[prevIndex]?.focus();
                }
                break;
            case "Home":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    items[0]?.focus();
                }
                break;
            case "End":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    items[items.length - 1]?.focus();
                }
                break;
            case "ArrowRight":
                // Only navigate to next menubar menu if at level 0 and horizontal orientation
                if (orientation === "horizontal" && menuContext.level === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateToAdjacentMenu('next');
                }
                break;
            case "ArrowLeft":
                // Only navigate to previous menubar menu if at level 0 and horizontal orientation
                if (orientation === "horizontal" && menuContext.level === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateToAdjacentMenu('prev');
                }
                // If in submenu (level > 0), close submenu and return to parent
                else if (menuContext.level > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    menuContext.triggerRef.current?.focus();
                }
                break;
            case "Escape":
                e.preventDefault();
                e.stopPropagation();
                closeAllMenus();
                // Focus the trigger of the top-level menu
                const topLevelTrigger = menuEl?.closest('[data-menu-id]')?.querySelector<HTMLButtonElement>('[aria-haspopup="true"]');
                topLevelTrigger?.focus();
                break;
        }
    };

    const itemClasses = danger
        ? "text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950 focus-visible:bg-error-50 focus-visible:text-error-600 dark:focus-visible:bg-error-950 dark:focus-visible:text-error-400"
        : "text-ground-900 dark:text-ground-100 hover:bg-ground-100 dark:hover:bg-ground-800 focus-visible:bg-primary-50 focus-visible:text-primary-600 dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400";

    return (
        <button
            ref={itemRef}
            className={`
                ${itemClasses}
                w-full px-3 py-2 text-left text-sm min-h-10
                duration-[var(--transition-fast)]
                focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-between gap-2
                ${className}
            `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            role="menuitem"
            aria-disabled={disabled || undefined}
            tabIndex={0}
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
    const { orientation, getAllTriggers, activeMenu, closeAllMenus } = useMenubarContext();
    const menuContext = useMenuContext();
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (disabled) return;
        onCheckedChange?.(!checked);
    };

    const navigateToAdjacentMenu = useCallback((direction: 'next' | 'prev') => {
        const triggers = getAllTriggers();
        const currentIndex = triggers.findIndex(t => t.id === activeMenu);
        
        if (currentIndex === -1) return;

        const targetIndex = direction === 'next' 
            ? (currentIndex + 1) % triggers.length
            : currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;

        const targetTrigger = triggers[targetIndex];
        if (targetTrigger && targetTrigger.ref.current) {
            closeAllMenus();
            requestAnimationFrame(() => {
                targetTrigger.ref.current?.click();
            });
        }
    }, [getAllTriggers, activeMenu, closeAllMenus]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        const menuEl = itemRef.current?.closest('[role="menu"]');
        const items = menuEl?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
        );

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                e.stopPropagation();
                handleClick();
                break;
            case "ArrowDown":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    const currentIndex = Array.from(items).indexOf(itemRef.current!);
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex]?.focus();
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    const currentIndex = Array.from(items).indexOf(itemRef.current!);
                    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                    items[prevIndex]?.focus();
                }
                break;
            case "Home":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    items[0]?.focus();
                }
                break;
            case "End":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    items[items.length - 1]?.focus();
                }
                break;
            case "ArrowRight":
                if (orientation === "horizontal" && menuContext.level === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateToAdjacentMenu('next');
                }
                break;
            case "ArrowLeft":
                if (orientation === "horizontal" && menuContext.level === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateToAdjacentMenu('prev');
                } else if (menuContext.level > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    menuContext.triggerRef.current?.focus();
                }
                break;
            case "Escape":
                e.preventDefault();
                e.stopPropagation();
                closeAllMenus();
                const topLevelTrigger = menuEl?.closest('[data-menu-id]')?.querySelector<HTMLButtonElement>('[aria-haspopup="true"]');
                topLevelTrigger?.focus();
                break;
        }
    };

    return (
        <button
            ref={itemRef}
            className={`
                text-ground-900 dark:text-ground-100
                hover:bg-ground-100 dark:hover:bg-ground-800
                w-full px-3 py-2 text-left text-sm min-h-10
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
            aria-disabled={disabled || undefined}
            tabIndex={0}
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
    const { orientation, getAllTriggers, activeMenu, closeAllMenus } = useMenubarContext();
    const menuContext = useMenuContext();
    const radioContext = useContext(MenuRadioGroupContext);
    const itemRef = useRef<HTMLButtonElement>(null);

    const isChecked = radioContext?.value === value;

    const handleClick = () => {
        if (disabled) return;
        radioContext?.onValueChange?.(value);
    };

    const navigateToAdjacentMenu = useCallback((direction: 'next' | 'prev') => {
        const triggers = getAllTriggers();
        const currentIndex = triggers.findIndex(t => t.id === activeMenu);
        
        if (currentIndex === -1) return;

        const targetIndex = direction === 'next' 
            ? (currentIndex + 1) % triggers.length
            : currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;

        const targetTrigger = triggers[targetIndex];
        if (targetTrigger && targetTrigger.ref.current) {
            closeAllMenus();
            requestAnimationFrame(() => {
                targetTrigger.ref.current?.click();
            });
        }
    }, [getAllTriggers, activeMenu, closeAllMenus]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        const menuEl = itemRef.current?.closest('[role="menu"]');
        const items = menuEl?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
        );

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                e.stopPropagation();
                handleClick();
                break;
            case "ArrowDown":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    const currentIndex = Array.from(items).indexOf(itemRef.current!);
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex]?.focus();
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    const currentIndex = Array.from(items).indexOf(itemRef.current!);
                    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                    items[prevIndex]?.focus();
                }
                break;
            case "Home":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    items[0]?.focus();
                }
                break;
            case "End":
                e.preventDefault();
                e.stopPropagation();
                if (items && items.length > 0) {
                    items[items.length - 1]?.focus();
                }
                break;
            case "ArrowRight":
                if (orientation === "horizontal" && menuContext.level === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateToAdjacentMenu('next');
                }
                break;
            case "ArrowLeft":
                if (orientation === "horizontal" && menuContext.level === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateToAdjacentMenu('prev');
                } else if (menuContext.level > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    menuContext.triggerRef.current?.focus();
                }
                break;
            case "Escape":
                e.preventDefault();
                e.stopPropagation();
                closeAllMenus();
                const topLevelTrigger = menuEl?.closest('[data-menu-id]')?.querySelector<HTMLButtonElement>('[aria-haspopup="true"]');
                topLevelTrigger?.focus();
                break;
        }
    };

    return (
        <button
            ref={itemRef}
            className={`
                text-ground-900 dark:text-ground-100
                hover:bg-ground-100 dark:hover:bg-ground-800
                w-full px-3 py-2 text-left text-sm min-h-10
                duration-(--transition-fast)
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
            aria-disabled={disabled || undefined}
            tabIndex={0}
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