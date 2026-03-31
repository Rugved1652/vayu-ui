// menubar.tsx
// Composition: root menubar + context provider

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils";
import { MenubarContext } from "./hooks";
import type { MenubarProps } from "./types";

export const MenubarRoot = ({
    children,
    orientation = "horizontal",
    className = "",
    ...props
}: MenubarProps) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const triggersRef = useRef<Map<string, React.RefObject<HTMLButtonElement | null>>>(new Map());

    const closeAllMenus = useCallback(() => {
        setActiveMenu(null);
    }, []);

    const registerTrigger = useCallback((id: string, ref: React.RefObject<HTMLButtonElement | null>) => {
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
                className={cn(
                    "bg-surface dark:bg-surface",
                    "border border-border dark:border-border",
                    "rounded-surface p-1",
                    orientation === "horizontal" ? "flex items-center gap-1" : "flex flex-col gap-1",
                    "font-secondary",
                    "duration-(--transition-fast)",
                    className
                )}
                role="menubar"
                aria-orientation={orientation}
                {...props}
            >
                {children}
            </div>
        </MenubarContext.Provider>
    );
};
