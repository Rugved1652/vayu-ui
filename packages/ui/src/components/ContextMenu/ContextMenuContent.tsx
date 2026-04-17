"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils";
import { useContextMenuCtx, getFocusableItems } from "./hooks";
import type { ContextMenuContentProps } from "./types";

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ children, align = "start", sideOffset = 4, className, ...props }, ref) => {
    const { isOpen, cursorPositionRef, menuRef, handleTypeahead, closeMenu } =
      useContextMenuCtx();
    const [mounted, setMounted] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Compute position from cursor ref with viewport clamping
    const updatePosition = useCallback(() => {
      if (!menuRef.current) return;

      const el = menuRef.current;
      const { width, height } = el.getBoundingClientRect();
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const pad = 8;
      const cursor = cursorPositionRef.current;

      let top = cursor.y + sideOffset;
      let left = cursor.x;

      if (align === "center") left = cursor.x - width / 2;
      else if (align === "end") left = cursor.x - width;

      if (left < pad) left = pad;
      if (left + width > vpW - pad) left = vpW - width - pad;
      if (top + height > vpH - pad) top = cursor.y - height - sideOffset;
      if (top < pad) top = pad;

      setPosition({ top, left });
    }, [cursorPositionRef, align, sideOffset, menuRef]);

    useLayoutEffect(() => {
      if (isOpen) updatePosition();
    }, [isOpen, updatePosition]);

    // Recompute on scroll/resize
    useEffect(() => {
      if (!isOpen) return;
      const handle = () => requestAnimationFrame(updatePosition);
      window.addEventListener("scroll", handle, true);
      window.addEventListener("resize", handle);
      return () => {
        window.removeEventListener("scroll", handle, true);
        window.removeEventListener("resize", handle);
      };
    }, [isOpen, updatePosition]);

    // Focus first item on open
    useEffect(() => {
      if (isOpen && menuRef.current) {
        requestAnimationFrame(() => {
          const first = menuRef.current?.querySelector<HTMLElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
          );
          first?.focus();
        });
      }
    }, [isOpen]);

    // Typeahead on the menu
    const handleMenuKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          handleTypeahead(e.key);
        }
      },
      [handleTypeahead]
    );

    if (!isOpen || !mounted) return null;

    return createPortal(
      <div
        ref={menuRef}
        data-contextmenu-portal
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        style={{ top: position.top, left: position.left }}
        className={cn(
          "fixed min-w-[220px] z-50",
          "bg-elevated dark:bg-elevated",
          "border border-border dark:border-border",
          "rounded-surface shadow-elevated",
          "py-1",
          "animate-fade-in",
          className
        )}
        onKeyDown={handleMenuKeyDown}
        {...props}
      >
        {children}
      </div>,
      document.body
    );
  }
);

ContextMenuContent.displayName = "ContextMenu.Content";

export { ContextMenuContent };
