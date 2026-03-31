// Sidebar.tsx
// Composition: context provider + sidebar shell

"use client";

import React, { useState, useEffect, useRef } from "react";
import { SidebarContext } from "./hooks";
import { useSidebar } from "./hooks";
import type { SidebarProviderProps, SidebarProps } from "./types";

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
    children,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobile, setMobile] = useState(false);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth < 768;
            setMobile(isMobile);
            if (!isMobile && mobileOpen) {
                setMobileOpen(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [mobileOpen]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && mobileOpen) {
                setMobileOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [mobileOpen]);

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed,
                mobile,
                mobileOpen,
                setMobileOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const { collapsed, mobile, mobileOpen, setMobileOpen } = useSidebar();
    const sidebarRef = useRef<HTMLElement>(null);

    // Focus trap for mobile menu
    useEffect(() => {
        if (mobile && mobileOpen && sidebarRef.current) {
            sidebarRef.current.focus();

            const focusableElements = sidebarRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key === "Tab") {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            };

            document.addEventListener("keydown", handleTabKey);
            return () => document.removeEventListener("keydown", handleTabKey);
        }
    }, [mobile, mobileOpen]);

    return (
        <>
            {/* Mobile Overlay */}
            {mobile && mobileOpen && (
                <div
                    role="presentation"
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/50 dark:bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                id="sidebar-navigation"
                aria-label="Main navigation"
                tabIndex={mobile ? -1 : undefined}
                className={`
                    bg-sidebar
                    border-r border-border z-50 transition-all duration-300 ease-in-out
                    ${mobile ? "absolute inset-y-0 left-0 h-full" : "h-screen relative"}
                    ${collapsed && !mobile ? "w-20" : "w-72"}
                    ${mobile
                        ? mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        : "translate-x-0"
                    }
                    focus:outline-none
                `}
            >
                <div className="flex flex-col h-full ">{children}</div>
            </aside>
        </>
    );
};
