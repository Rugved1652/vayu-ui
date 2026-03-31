// Navbar.tsx
// Composition: context + provider + state management

"use client";

import { cn } from "../utils";
import { createContext, useContext, useEffect, useId, useState, useCallback } from "react";
import type { NavbarContextValue, NavbarProps } from "./types";

// Context

const NavbarContext = createContext<NavbarContextValue | null>(null);

export function useNavbar() {
    const ctx = useContext(NavbarContext);
    if (!ctx) throw new Error("Navbar compound components must be used inside <Navbar>");
    return ctx;
}

// Scrollbar width

function getScrollbarWidth() {
    if (typeof window === "undefined") return 0;
    return window.innerWidth - document.documentElement.clientWidth;
}

// Root

function NavbarRoot({
    className,
    children,
    mainContentSelector = "main",
    ...props
}: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const id = useId();
    const menuId = `navbar-menu-${id}`;
    const triggerId = `navbar-trigger-${id}`;

    const closeMenu = useCallback(() => {
        setMobileOpen(false);
        document.getElementById(triggerId)?.focus();
    }, [triggerId]);

    // Close on Escape
    useEffect(() => {
        if (!mobileOpen) return;

        const handleEscape = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [mobileOpen, closeMenu]);

    // Lock body scroll & inert background
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
                className={cn(
                    "relative z-40 w-full",
                    "bg-surface border-b border-border",
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

export default NavbarRoot;
