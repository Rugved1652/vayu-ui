"use client";

import React, { forwardRef, useCallback, useRef } from "react";
import { cn } from "../utils";
import { useContextMenuCtx, getFocusableItems, useItemKeyDown, baseItemStyles } from "./hooks";
import { SubContext } from "./hooks";
import type { ContextMenuCheckboxItemProps } from "./types";

const ContextMenuCheckboxItem = forwardRef<HTMLButtonElement, ContextMenuCheckboxItemProps>(
  ({ children, checked = false, onCheckedChange, disabled = false, icon, shortcut, className, ...props }, ref) => {
    const { closeMenu } = useContextMenuCtx();
    const subCtx = React.useContext(SubContext);
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback(() => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    }, [disabled, checked, onCheckedChange]);

    const handleActionKeyDown = useItemKeyDown(disabled, handleClick);

    const handleKeyDown = useCallback(
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
            handleActionKeyDown(e);
            break;
        }
      },
      [disabled, handleActionKeyDown, closeMenu]
    );

    return (
      <button
        ref={itemRef}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(baseItemStyles(disabled), className, "w-full")}
        {...props}
      >
        <span className="shrink-0 w-4 h-4 flex items-center justify-center" aria-hidden="true">
          {checked && (
            <svg className="w-4 h-4 text-brand dark:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        {icon && (
          <span className="shrink-0 w-4 h-4" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
        {shortcut && (
          <span className="text-xs text-muted-content dark:text-muted-content shrink-0 ml-auto">
            {shortcut}
          </span>
        )}
      </button>
    );
  }
);

ContextMenuCheckboxItem.displayName = "ContextMenu.CheckboxItem";

export { ContextMenuCheckboxItem };
