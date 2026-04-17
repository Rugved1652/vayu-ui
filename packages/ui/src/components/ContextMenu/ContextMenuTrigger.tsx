"use client";

import React, { forwardRef, useCallback, useRef } from "react";
import { cn } from "../../utils";
import { useContextMenuCtx } from "./hooks";
import type { ContextMenuTriggerProps } from "./types";

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, disabled = false, className, ...props }, ref) => {
    const { isOpen, setIsOpen, closeMenu, cursorPositionRef } = useContextMenuCtx();
    const triggerRef = useRef<HTMLDivElement>(null);

    // Right-click opens menu
    const handleContextMenu = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        cursorPositionRef.current = { x: e.clientX, y: e.clientY };
        setIsOpen(true);
      },
      [disabled, setIsOpen, cursorPositionRef]
    );

    // Left-click closes menu when already open
    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        if (e.button === 0 && isOpen) {
          closeMenu();
        }
      },
      [disabled, isOpen, closeMenu]
    );

    // Context Menu key / Shift+F10
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === "ContextMenu" || (e.shiftKey && e.key === "F10")) {
          e.preventDefault();
          const rect = triggerRef.current?.getBoundingClientRect();
          if (rect) {
            cursorPositionRef.current = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            };
          }
          setIsOpen(true);
        }
      },
      [disabled, setIsOpen, cursorPositionRef]
    );

    return (
      <div
        ref={triggerRef}
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        className={cn(
          "select-none",
          disabled ? "cursor-default" : "cursor-context-menu",
          className
        )}
        aria-haspopup="menu"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuTrigger.displayName = "ContextMenu.Trigger";

export { ContextMenuTrigger };
