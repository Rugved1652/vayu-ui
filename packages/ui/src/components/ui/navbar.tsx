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
    useCallback,
} from "react";

// ============================================================================
// Types
// ============================================================================

interface NavbarContextValue {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    /** Closes the menu and returns focus to the toggle button */
    closeMenu: () => void;
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
// Helper: Calculate Scrollbar Width
// ============================================================================

function getScrollbarWidth() {
    if (typeof window === "undefined") return 0;
    return window.innerWidth - document.documentElement.clientWidth;
}

// ============================================================================
// Navbar Root
// ============================================================================

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    sticky?: boolean;
    mainContentSelector?: string;
}

function NavbarRoot({ 
    sticky = false, 
    className, 
    children, 
    mainContentSelector = "main", 
    ...props 
}: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const id = useId();
    const menuId = `navbar-menu-${id}`;
    const triggerId = `navbar-trigger-${id}`;

    // FIX: Unified close function to handle state + focus return (WCAG 2.4.3)
    const closeMenu = useCallback(() => {
        setMobileOpen(false);
        // Return focus to the trigger button
        document.getElementById(triggerId)?.focus();
    }, [triggerId]);

    // Close mobile menu on Escape
    useEffect(() => {
        if (!mobileOpen) return;

        const handleEscape = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") {
                closeMenu(); // Use unified close function
            }
        };
        
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [mobileOpen, closeMenu]);

    // Lock body scroll & Inert background
    useEffect(() => {
        const mainContent = document.querySelector(mainContentSelector);
        
        if (mobileOpen) {
            const scrollbarWidth = getScrollbarWidth();
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = "hidden";
            
            if (mainContent) {
                (mainContent as HTMLElement).inert = true;
            }
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            
            if (mainContent) {
                (mainContent as HTMLElement).inert = false;
            }
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            if (mainContent) {
                (mainContent as HTMLElement).inert = false;
            }
        };
    }, [mobileOpen, mainContentSelector]);

    return (
        <NavbarContext.Provider value={{ mobileOpen, setMobileOpen, closeMenu, menuId, triggerId }}>
            <nav
                aria-label="Main navigation"
                className={clsx(
                    "relative z-40 w-full",
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
                        mobileOpen ? "rotate-45 translate-y-0.75" : "-translate-y-1"
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
                        mobileOpen ? "-rotate-45 -translate-y-0.75" : "translate-y-1"
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
    const { mobileOpen, closeMenu, menuId } = useNavbar();
    const menuRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // Robust Focus Trap & Initial Focus
    useEffect(() => {
        if (!mobileOpen) return;

        // Initial focus to close button
        const timer = setTimeout(() => {
            closeBtnRef.current?.focus();
        }, 50);

        const menu = menuRef.current;
        if (!menu) return;

        const handleTab = (e: globalThis.KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const focusableEls = menu.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            
            const visibleFocusable = Array.from(focusableEls).filter(el => 
                el.offsetParent !== null || el.getAttribute('tabindex') === '0'
            );

            if (visibleFocusable.length === 0) return;

            const firstFocusable = visibleFocusable[0];
            const lastFocusable = visibleFocusable[visibleFocusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable || document.activeElement === menu) {
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
        return () => {
            clearTimeout(timer);
            menu.removeEventListener("keydown", handleTab);
        };
    }, [mobileOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 z-40 bg-ground-950/50 transition-opacity duration-300 md:hidden",
                    mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
                onClick={closeMenu} // FIX: Use closeMenu for focus return
            />

            {/* Panel */}
            <div
                ref={menuRef}
                id={menuId}
                role="dialog"
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
                        ref={closeBtnRef}
                        type="button"
                        onClick={closeMenu} // FIX: Use closeMenu
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
    active?: boolean;
}

function NavbarMobileItem({ active = false, className, children, href = "#", ...props }: NavbarMobileItemProps) {
    const { closeMenu } = useNavbar();

    return (
        <a
            href={href}
            onClick={closeMenu} // FIX: Use closeMenu for focus return
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