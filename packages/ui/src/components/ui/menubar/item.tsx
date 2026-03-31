// item.tsx
// UI: presentational

import React, { useRef } from "react";
import { cn } from "../utils";
import { useMenubarContext, useMenuContext, useMenuNavigation } from "./hooks";
import type { MenuItemProps } from "./types";

export const MenuItem = ({
    children,
    icon,
    shortcut,
    disabled = false,
    danger = false,
    onSelect,
    className = "",
    ...props
}: MenuItemProps) => {
    const { closeAllMenus, orientation } = useMenubarContext();
    const menuContext = useMenuContext();
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (disabled) return;
        onSelect?.();
        closeAllMenus();
    };

    const handleKeyDown = useMenuNavigation(itemRef, disabled, orientation, menuContext.level);

    const itemClasses = danger
        ? cn(
            "text-destructive dark:text-destructive",
            "hover:bg-destructive/10 dark:hover:bg-destructive/20",
            "focus-visible:bg-destructive/10 focus-visible:text-destructive",
            "dark:focus-visible:bg-destructive/20 dark:focus-visible:text-destructive"
        )
        : cn(
            "text-surface-content dark:text-surface-content",
            "hover:bg-muted/80 dark:hover:bg-white/10",
            "focus-visible:bg-muted/80 focus-visible:text-brand",
            "dark:focus-visible:bg-white/10 dark:focus-visible:text-brand"
        );

    return (
        <button
            ref={itemRef}
            className={cn(
                itemClasses,
                "w-full px-3 py-2 text-left text-sm min-h-10",
                "duration-(--transition-fast)",
                "focus:outline-none",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-between gap-2",
                className
            )}
            onClick={handleClick}
            onKeyDown={(e) => {
                handleKeyDown(e);
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                    handleClick();
                }
            }}
            disabled={disabled}
            role="menuitem"
            aria-disabled={disabled || undefined}
            tabIndex={0}
            {...props}
        >
            <div className="flex items-center gap-2">
                {icon && (
                    <span className="w-4 h-4 shrink-0" aria-hidden="true">
                        {icon}
                    </span>
                )}
                <span>{children}</span>
            </div>
            {shortcut && (
                <span className="text-xs text-muted-content dark:text-muted-content" aria-label={`Shortcut: ${shortcut}`}>
                    {shortcut}
                </span>
            )}
        </button>
    );
};
