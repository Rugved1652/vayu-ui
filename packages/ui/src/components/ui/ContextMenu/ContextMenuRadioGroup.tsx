"use client";

import React, { forwardRef, useCallback, useContext, useRef } from "react";
import { cn } from "../utils";
import { RadioGroupContext, useContextMenuCtx, getFocusableItems, useItemKeyDown, baseItemStyles } from "./hooks";
import { SubContext } from "./hooks";
import type { ContextMenuRadioGroupProps, ContextMenuRadioItemProps } from "./types";

// ─── RadioGroup ──────────────────────────────────────────────

const ContextMenuRadioGroup: React.FC<ContextMenuRadioGroupProps> = ({
  children,
  value,
  onValueChange,
}) => (
  <RadioGroupContext.Provider value={{ value, onValueChange }}>
    <div role="group">{children}</div>
  </RadioGroupContext.Provider>
);

ContextMenuRadioGroup.displayName = "ContextMenu.RadioGroup";

// ─── RadioItem ───────────────────────────────────────────────

const ContextMenuRadioItem = forwardRef<HTMLButtonElement, ContextMenuRadioItemProps>(
  ({ children, value, disabled = false, icon, shortcut, className, ...props }, ref) => {
    const { closeMenu } = useContextMenuCtx();
    const radioCtx = useContext(RadioGroupContext);
    const isSelected = radioCtx?.value === value;
    const itemRef = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback(() => {
      if (!disabled) radioCtx?.onValueChange?.(value);
    }, [disabled, radioCtx, value]);

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
        role="menuitemradio"
        aria-checked={isSelected}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(baseItemStyles(disabled), className, "w-full")}
        {...props}
      >
        <span className="shrink-0 w-4 h-4 flex items-center justify-center" aria-hidden="true">
          {isSelected ? (
            <svg className="w-4 h-4 text-brand dark:text-brand" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
            </svg>
          ) : (
            <span className="w-4 h-4" />
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

ContextMenuRadioItem.displayName = "ContextMenu.RadioItem";

export { ContextMenuRadioGroup, ContextMenuRadioItem };
