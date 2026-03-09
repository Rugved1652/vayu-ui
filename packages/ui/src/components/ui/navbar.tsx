"use client";

import { clsx } from "clsx";
import {
    createContext,
    HTMLAttributes,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
    AnchorHTMLAttributes,
} from "react";

// ============================================================================
// Types
// ============================================================================

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
    /** Stick to the top of the viewport */
    sticky?: boolean;
}

function NavbarRoot({ sticky = false, className, children, ...props }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const id = useId();
    const menuId = `navbar-menu-${id}`;
    const triggerId = `navbar-trigger-${id}`;

    // Close mobile menu on Escape
    useEffect(() => {
        if (!mobileOpen) return;

        const handleEscape = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileOpen(false);
                // Return focus to the trigger button on close
                document.getElementById(triggerId)?.focus();
            }
        };
        
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [mobileOpen, triggerId]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [mobileOpen]);

    return (
        <NavbarContext.Provider value={{ mobileOpen, setMobileOpen, menuId, triggerId }}>
            <nav
                aria-label="Main navigation"
                className={clsx(
                    "relative z-40 w-full",
                    // Default styling only
                    "bg-white dark:bg-ground-950 border-b border-ground-200 dark:border-ground-800",
                    sticky && "sticky top-0",
                    className
                )}
                {...props}
            >
                {children}
            </nav>
        </NavbarContext.Provider>
    );
}

NavbarRoot.displayName = "Navbar";

// ============================================================================
// Navbar Container
// ============================================================================

export interface NavbarContainerProps extends HTMLAttributes<HTMLDivElement> {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

function NavbarContainer({ maxWidth = "xl", className, children, ...props }: NavbarContainerProps) {
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

NavbarContainer.displayName = "Navbar.Container";

// ============================================================================
// Navbar Brand
// ============================================================================

export interface NavbarBrandProps extends HTMLAttributes<HTMLDivElement> {}

function NavbarBrand({ className, children, ...props }: NavbarBrandProps) {
    return (
        <div
            className={clsx("flex items-center gap-2 shrink-0", className)}
            {...props}
        >
            {children}
        </div>
    );
}

NavbarBrand.displayName = "Navbar.Brand";

// ============================================================================
// Navbar Items (Desktop)
// ============================================================================

export interface NavbarItemsProps extends HTMLAttributes<HTMLUListElement> {}

function NavbarItems({ className, children, ...props }: NavbarItemsProps) {
    return (
        <ul
            className={clsx(
                "hidden md:flex items-center gap-1 list-none m-0 p-0",
                className
            )}
            {...props}
        >
            {children}
        </ul>
    );
}

NavbarItems.displayName = "Navbar.Items";

// ============================================================================
// Navbar Item (Desktop Link)
// ============================================================================

export interface NavbarItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Highlights the item as the current page */
    active?: boolean;
}

function NavbarItem({ active = false, className, children, href = "#", ...props }: NavbarItemProps) {
    return (
        <li className="list-none">
            <a
                href={href}
                className={clsx(
                    "px-3 py-2 rounded text-sm font-medium font-secondary transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ground-950",
                    active
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "text-ground-700 dark:text-ground-300 hover:text-ground-900 dark:hover:text-white hover:bg-ground-100 dark:hover:bg-ground-800",
                    className
                )}
                aria-current={active ? "page" : undefined}
                {...props}
            >
                {children}
            </a>
        </li>
    );
}

NavbarItem.displayName = "Navbar.Item";

// ============================================================================
// Navbar Actions
// ============================================================================

export interface NavbarActionsProps extends HTMLAttributes<HTMLDivElement> {}

function NavbarActions({ className, children, ...props }: NavbarActionsProps) {
    return (
        <div
            className={clsx("hidden md:flex items-center gap-2 shrink-0", className)}
            {...props}
        >
            {children}
        </div>
    );
}

NavbarActions.displayName = "Navbar.Actions";

// ============================================================================
// Mobile Toggle
// ============================================================================

export interface NavbarToggleProps extends HTMLAttributes<HTMLButtonElement> {}

function NavbarToggle({ className, ...props }: NavbarToggleProps) {
    const { mobileOpen, setMobileOpen, menuId, triggerId } = useNavbar();

    return (
        <button
            id={triggerId}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className={clsx(
                "md:hidden relative flex items-center justify-center w-10 h-10 rounded transition-colors",
                "text-ground-700 dark:text-ground-300 hover:bg-ground-100 dark:hover:bg-ground-800",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ground-950",
                className
            )}
            {...props}
        >
            <span className="flex flex-col items-center justify-center w-5 h-5">
                <span
                    className={clsx(
                        "block h-0.5 w-5 bg-current transition-all rounded-full",
                        mobileOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-1"
                    )}
                />
                <span
                    className={clsx(
                        "block h-0.5 w-5 bg-current transition-all rounded-full my-0.5",
                        mobileOpen ? "opacity-0" : "opacity-100"
                    )}
                />
                <span
                    className={clsx(
                        "block h-0.5 w-5 bg-current transition-all rounded-full",
                        mobileOpen ? "-rotate-45 -translate-y-[3px]" : "translate-y-1"
                    )}
                />
            </span>
        </button>
    );
}

NavbarToggle.displayName = "Navbar.Toggle";

// ============================================================================
// Mobile Menu (Panel)
// ============================================================================

export interface NavbarMobileMenuProps extends HTMLAttributes<HTMLDivElement> {}

function NavbarMobileMenu({ className, children, ...props }: NavbarMobileMenuProps) {
    const { mobileOpen, setMobileOpen, menuId } = useNavbar();
    const menuRef = useRef<HTMLDivElement>(null);

    // Basic Focus Trap: Keep focus inside the mobile menu while open
    useEffect(() => {
        if (!mobileOpen) return;

        const menu = menuRef.current;
        if (!menu) return;

        // Focus the menu container initially to capture tab
        menu.focus();

        const handleTab = (e: globalThis.KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const focusableEls = menu.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled])'
            );
            const firstFocusable = focusableEls[0];
            const lastFocusable = focusableEls[focusableEls.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable?.focus();
                }
            } else {
                // Tab
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
                    "fixed inset-0 z-40 bg-ground-950/50 transition-opacity md:hidden",
                    mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
                onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <div
                ref={menuRef}
                id={menuId}
                role="dialog"
                tabIndex={-1} // Required for focus trapping
                aria-modal="true"
                aria-label="Navigation menu"
                className={clsx(
                    "fixed top-0 right-0 z-50 h-full w-72 max-w-[80vw] md:hidden",
                    "bg-white dark:bg-ground-950 border-l border-ground-200 dark:border-ground-800",
                    "shadow-outer",
                    "transform transition-transform ease-in-out duration-300",
                    mobileOpen ? "translate-x-0" : "translate-x-full",
                    className
                )}
                {...props}
            >
                {/* Close button */}
                <div className="flex items-center justify-end p-4 border-b border-ground-200 dark:border-ground-800">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close navigation menu"
                        className={clsx(
                            "flex items-center justify-center w-9 h-9 rounded transition-colors",
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

NavbarMobileMenu.displayName = "Navbar.MobileMenu";

// ============================================================================
// Mobile Item (Link)
// ============================================================================

export interface NavbarMobileItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Highlights the item as the current page */
    active?: boolean;
}

function NavbarMobileItem({ active = false, className, children, href = "#", ...props }: NavbarMobileItemProps) {
    const { setMobileOpen } = useNavbar();

    return (
        <a
            href={href}
            onClick={() => setMobileOpen(false)}
            className={clsx(
                "px-4 py-3 rounded text-sm font-medium font-secondary transition-colors",
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
        </a>
    );
}

NavbarMobileItem.displayName = "Navbar.MobileItem";

// ============================================================================
// Navbar Separator
// ============================================================================

function NavbarSeparator({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
    return (
        <hr
            className={clsx("my-2 border-ground-200 dark:border-ground-800", className)}
            {...props}
        />
    );
}

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