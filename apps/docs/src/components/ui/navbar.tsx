"use client";

import { clsx } from "clsx";
import {
    createContext,
    forwardRef,
    HTMLAttributes,
    KeyboardEvent,
    useCallback,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

type NavbarVariant = "default" | "floating" | "bordered";

interface NavbarContextValue {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    menuId: string;
    triggerId: string;
}

// ============================================================================
// Context
// ============================================================================

const NavbarContext = createContext<NavbarContextValue | null>(null);

function useNavbar() {
    const ctx = useContext(NavbarContext);
    if (!ctx) throw new Error("Navbar compound components must be used inside <Navbar>");
    return ctx;
}

// ============================================================================
// Navbar Root
// ============================================================================

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    variant?: NavbarVariant;
    /** Stick to the top of the viewport. */
    sticky?: boolean;
}

const NavbarRoot = forwardRef<HTMLElement, NavbarProps>(
    ({ variant = "default", sticky = false, className, children, ...props }, ref) => {
        const [mobileOpen, setMobileOpen] = useState(false);
        const id = useId();
        const menuId = `navbar-menu-${id}`;
        const triggerId = `navbar-trigger-${id}`;

        // Close mobile menu on Escape
        useEffect(() => {
            if (!mobileOpen) return;

            const handleEscape = (e: globalThis.KeyboardEvent) => {
                if (e.key === "Escape") setMobileOpen(false);
            };
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }, [mobileOpen]);

        // Lock body scroll when mobile menu is open
        useEffect(() => {
            if (mobileOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
            return () => {
                document.body.style.overflow = "";
            };
        }, [mobileOpen]);

        const variantClasses: Record<NavbarVariant, string> = {
            default: "bg-white dark:bg-ground-950 border-b border-ground-200 dark:border-ground-800",
            floating:
                "bg-white/80 dark:bg-ground-950/80 backdrop-blur-lg border border-ground-200 dark:border-ground-800 rounded-xl mx-4 mt-4 shadow-lg",
            bordered:
                "bg-white dark:bg-ground-950 border-2 border-ground-300 dark:border-ground-700",
        };

        return (
            <NavbarContext.Provider value={{ mobileOpen, setMobileOpen, menuId, triggerId }}>
                <nav
                    ref={ref}
                    aria-label="Main navigation"
                    className={clsx(
                        "relative z-40 w-full",
                        sticky && "sticky top-0",
                        variantClasses[variant],
                        className
                    )}
                    {...props}
                >
                    {children}
                </nav>
            </NavbarContext.Provider>
        );
    }
);

NavbarRoot.displayName = "Navbar";

// ============================================================================
// Navbar Container (inner wrapper for max-width + padding)
// ============================================================================

export interface NavbarContainerProps extends HTMLAttributes<HTMLDivElement> {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const NavbarContainer = forwardRef<HTMLDivElement, NavbarContainerProps>(
    ({ maxWidth = "xl", className, children, ...props }, ref) => {
        const maxWidthClasses: Record<string, string> = {
            sm: "max-w-screen-sm",
            md: "max-w-screen-md",
            lg: "max-w-screen-lg",
            xl: "max-w-screen-xl",
            "2xl": "max-w-screen-2xl",
            full: "max-w-full",
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    "mx-auto flex items-center justify-between px-4 py-3",
                    maxWidthClasses[maxWidth],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

NavbarContainer.displayName = "Navbar.Container";

// ============================================================================
// Navbar Brand
// ============================================================================

export interface NavbarBrandProps extends HTMLAttributes<HTMLDivElement> { }

const NavbarBrand = forwardRef<HTMLDivElement, NavbarBrandProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx("flex items-center gap-2 shrink-0", className)}
            {...props}
        >
            {children}
        </div>
    )
);

NavbarBrand.displayName = "Navbar.Brand";

// ============================================================================
// Navbar Items (desktop link group)
// ============================================================================

export interface NavbarItemsProps extends HTMLAttributes<HTMLUListElement> { }

const NavbarItems = forwardRef<HTMLUListElement, NavbarItemsProps>(
    ({ className, children, ...props }, ref) => (
        <ul
            ref={ref}
            role="menubar"
            className={clsx(
                "hidden md:flex items-center gap-1 list-none m-0 p-0",
                className
            )}
            {...props}
        >
            {children}
        </ul>
    )
);

NavbarItems.displayName = "Navbar.Items";

// ============================================================================
// Navbar Item (individual link / button)
// ============================================================================

export interface NavbarItemProps extends HTMLAttributes<HTMLLIElement> {
    active?: boolean;
}

const NavbarItem = forwardRef<HTMLLIElement, NavbarItemProps>(
    ({ active = false, className, children, ...props }, ref) => (
        <li
            ref={ref}
            role="none"
            className={clsx("list-none", className)}
            {...props}
        >
            {/* 
                Expects an <a> or <button> child. 
                We apply styling via CSS child selector so the consumer
                keeps full control of the element.
            */}
            <div
                role="menuitem"
                tabIndex={0}
                className={clsx(
                    "px-3 py-2 rounded-md text-sm font-medium font-secondary transition-colors cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ground-950",
                    active
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "text-ground-700 dark:text-ground-300 hover:text-ground-900 dark:hover:text-white hover:bg-ground-100 dark:hover:bg-ground-800"
                )}
                aria-current={active ? "page" : undefined}
            >
                {children}
            </div>
        </li>
    )
);

NavbarItem.displayName = "Navbar.Item";

// ============================================================================
// Navbar Actions (right side slot for buttons, avatars, etc.)
// ============================================================================

export interface NavbarActionsProps extends HTMLAttributes<HTMLDivElement> { }

const NavbarActions = forwardRef<HTMLDivElement, NavbarActionsProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx("hidden md:flex items-center gap-2 shrink-0", className)}
            {...props}
        >
            {children}
        </div>
    )
);

NavbarActions.displayName = "Navbar.Actions";

// ============================================================================
// Mobile Toggle (hamburger)
// ============================================================================

export interface NavbarToggleProps extends HTMLAttributes<HTMLButtonElement> { }

const NavbarToggle = forwardRef<HTMLButtonElement, NavbarToggleProps>(
    ({ className, ...props }, ref) => {
        const { mobileOpen, setMobileOpen, menuId, triggerId } = useNavbar();

        return (
            <button
                ref={ref}
                id={triggerId}
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-controls={menuId}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                className={clsx(
                    "md:hidden relative flex items-center justify-center w-10 h-10 rounded-md transition-colors",
                    "text-ground-700 dark:text-ground-300 hover:bg-ground-100 dark:hover:bg-ground-800",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ground-950",
                    className
                )}
                {...props}
            >
                {/* Animated hamburger → X */}
                <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
                <span className="flex flex-col items-center justify-center w-5 h-5">
                    <span
                        className={clsx(
                            "block h-0.5 w-5 bg-current transition-all duration-300 rounded-full",
                            mobileOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-1"
                        )}
                    />
                    <span
                        className={clsx(
                            "block h-0.5 w-5 bg-current transition-all duration-300 rounded-full",
                            mobileOpen ? "opacity-0" : "opacity-100"
                        )}
                    />
                    <span
                        className={clsx(
                            "block h-0.5 w-5 bg-current transition-all duration-300 rounded-full",
                            mobileOpen ? "-rotate-45 -translate-y-[3px]" : "translate-y-1"
                        )}
                    />
                </span>
            </button>
        );
    }
);

NavbarToggle.displayName = "Navbar.Toggle";

// ============================================================================
// Mobile Menu (slide-in panel)
// ============================================================================

export interface NavbarMobileMenuProps extends HTMLAttributes<HTMLDivElement> { }

const NavbarMobileMenu = forwardRef<HTMLDivElement, NavbarMobileMenuProps>(
    ({ className, children, ...props }, ref) => {
        const { mobileOpen, setMobileOpen, menuId, triggerId } = useNavbar();
        const menuRef = useRef<HTMLDivElement>(null);

        // Trap focus inside mobile menu
        useEffect(() => {
            if (!mobileOpen || !menuRef.current) return;

            const menu = menuRef.current;
            const focusableElements = menu.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, textarea, select'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            // Focus first element
            firstFocusable?.focus();

            const handleTab = (e: globalThis.KeyboardEvent) => {
                if (e.key !== "Tab") return;

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable?.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable?.focus();
                    }
                }
            };

            menu.addEventListener("keydown", handleTab);
            return () => menu.removeEventListener("keydown", handleTab);
        }, [mobileOpen]);

        return (
            <>
                {/* Backdrop */}
                <div
                    className={clsx(
                        "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
                        mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    aria-hidden="true"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Panel */}
                <div
                    ref={(node) => {
                        (menuRef as any).current = node;
                        if (typeof ref === "function") ref(node);
                        else if (ref) (ref as any).current = node;
                    }}
                    id={menuId}
                    role="dialog"
                    aria-modal={mobileOpen}
                    aria-label="Navigation menu"
                    aria-describedby={triggerId}
                    className={clsx(
                        "fixed top-0 right-0 z-50 h-full w-72 max-w-[80vw] md:hidden",
                        "bg-white dark:bg-ground-950 border-l border-ground-200 dark:border-ground-800",
                        "shadow-2xl",
                        "transform transition-transform duration-300 ease-in-out",
                        mobileOpen ? "translate-x-0" : "translate-x-full",
                        className
                    )}
                    {...props}
                >
                    {/* Close button inside panel */}
                    <div className="flex items-center justify-end p-4 border-b border-ground-200 dark:border-ground-800">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close navigation menu"
                            className={clsx(
                                "flex items-center justify-center w-9 h-9 rounded-md transition-colors",
                                "text-ground-500 hover:text-ground-900 dark:hover:text-white hover:bg-ground-100 dark:hover:bg-ground-800",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                            )}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu content */}
                    <div className="flex flex-col gap-1 p-4 overflow-y-auto max-h-[calc(100vh-65px)]">
                        {children}
                    </div>
                </div>
            </>
        );
    }
);

NavbarMobileMenu.displayName = "Navbar.MobileMenu";

// ============================================================================
// Mobile Item
// ============================================================================

export interface NavbarMobileItemProps extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
}

const NavbarMobileItem = forwardRef<HTMLDivElement, NavbarMobileItemProps>(
    ({ active = false, className, children, ...props }, ref) => {
        const { setMobileOpen } = useNavbar();

        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={0}
                onClick={() => setMobileOpen(false)}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setMobileOpen(false);
                    }
                }}
                className={clsx(
                    "px-4 py-3 rounded-lg text-sm font-medium font-secondary transition-colors cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    active
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "text-ground-700 dark:text-ground-300 hover:text-ground-900 dark:hover:text-white hover:bg-ground-100 dark:hover:bg-ground-800",
                    className
                )}
                aria-current={active ? "page" : undefined}
                {...props}
            >
                {children}
            </div>
        );
    }
);

NavbarMobileItem.displayName = "Navbar.MobileItem";

// ============================================================================
// Navbar Separator (for mobile menu)
// ============================================================================

const NavbarSeparator = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement>>(
    ({ className, ...props }, ref) => (
        <hr
            ref={ref}
            className={clsx("my-2 border-ground-200 dark:border-ground-800", className)}
            {...props}
        />
    )
);

NavbarSeparator.displayName = "Navbar.Separator";

// ============================================================================
// Compound Export
// ============================================================================

export const Navbar = Object.assign(NavbarRoot, {
    Container: NavbarContainer,
    Brand: NavbarBrand,
    Items: NavbarItems,
    Item: NavbarItem,
    Actions: NavbarActions,
    Toggle: NavbarToggle,
    MobileMenu: NavbarMobileMenu,
    MobileItem: NavbarMobileItem,
    Separator: NavbarSeparator,
});

export default Navbar;
