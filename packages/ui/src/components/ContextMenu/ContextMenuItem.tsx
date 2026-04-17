"use client";

import React, { forwardRef, useCallback, useRef } from "react";
import { cn } from "../../utils";
import { useContextMenuCtx, useSubCtx, getFocusableItems, useItemKeyDown, baseItemStyles } from "./hooks";
import type { ContextMenuItemProps } from "./types";

const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  ({ children, onSelect, disabled = false, destructive = false, icon, shortcut, className, ...props }, ref) => {
    const { closeMenu } = useContextMenuCtx();
    const subCtx = React.useContext(
      React.createContext<ReturnType<typeof useSubCtx> | null>(null)
    );
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback(() => {
      if (disabled) return;
      onSelect?.();
      closeMenu();
    }, [disabled, onSelect, closeMenu]);

    const handleKeyDown = useItemKeyDown(disabled, handleClick);

    // ArrowUp/Down/Home/End navigation
    const handleNavKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        const menuEl = itemRef.current?.closest('[role="menu"]');
        const items = getFocusableItems(menuEl);

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            e.stopPropagation();
            if (items.length > 0) {
              const idx = items.indexOf(itemRef.current!);
              items[(idx + 1) % items.length]?.focus();
            }
            break;
          case "ArrowUp":
            e.preventDefault();
            e.stopPropagation();
            if (items.length > 0) {
              const idx = items.indexOf(itemRef.current!);
              items[idx <= 0 ? items.length - 1 : idx - 1]?.focus();
            }
            break;
          case "Home":
            e.preventDefault();
            e.stopPropagation();
            items[0]?.focus();
            break;
          case "End":
            e.preventDefault();
            e.stopPropagation();
            if (items.length > 0) items[items.length - 1]?.focus();
            break;
          case "Escape":
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
            break;
          default:
            handleKeyDown(e);
            break;
        }
      },
      [disabled, handleKeyDown, closeMenu]
    );

    return (
      <button
        ref={itemRef}
        role="menuitem"
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleNavKeyDown}
        className={cn(
          baseItemStyles(disabled, destructive ? "destructive" : undefined),
          "justify-between w-full",
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
          <span className="text-xs text-muted-content dark:text-muted-content shrink-0">
            {shortcut}
          </span>
        )}
      </button>
    );
  }
);

ContextMenuItem.displayName = "ContextMenu.Item";

export { ContextMenuItem };
