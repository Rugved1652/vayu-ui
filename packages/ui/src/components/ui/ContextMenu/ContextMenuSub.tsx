"use client";

import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";
import { SubContext, useContextMenuCtx, useTypeahead, getFocusableItems } from "./hooks";
import type {
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
} from "./types";

// ─── Sub (wrapper) ──────────────────────────────────────────

const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleTypeahead = useTypeahead(subMenuRef);

  const openSub = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => setIsOpen(true), 150);
  }, []);

  const closeSub = useCallback(() => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(openTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <SubContext.Provider
      value={{
        isOpen,
        setIsOpen,
        level: 1, // always 1 for submenus — enables ArrowLeft back-navigation
        subMenuRef,
        triggerRef,
        handleTypeahead,
        openSub,
        closeSub,
      }}
    >
      {children}
    </SubContext.Provider>
  );
};

ContextMenuSub.displayName = "ContextMenu.Sub";

// ─── SubTrigger ──────────────────────────────────────────────

const ContextMenuSubTrigger = forwardRef<HTMLButtonElement, ContextMenuSubTriggerProps>(
  ({ children, disabled = false, icon, className, ...props }, ref) => {
    const { closeMenu } = useContextMenuCtx();
    const subCtx = useContext(SubContext);
    if (!subCtx) throw new Error("SubTrigger must be used within ContextMenu.Sub");

    const { isOpen, setIsOpen, triggerRef, openSub, closeSub, subMenuRef } = subCtx;

    const handleMouseEnter = useCallback(() => {
      if (!disabled) openSub();
    }, [disabled, openSub]);

    const handleMouseLeave = useCallback(() => {
      closeSub();
    }, [closeSub]);

    const focusFirstItem = useCallback(() => {
      requestAnimationFrame(() => {
        const first = subMenuRef.current?.querySelector<HTMLElement>(
          '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
        );
        first?.focus();
      });
    }, [subMenuRef]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        const menuEl = triggerRef.current?.closest('[role="menu"]');
        const items = getFocusableItems(menuEl);

        switch (e.key) {
          case "Enter":
          case " ":
          case "ArrowRight":
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
            focusFirstItem();
            break;
          case "ArrowLeft":
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
            triggerRef.current?.focus();
            break;
          case "ArrowDown":
            e.preventDefault();
            e.stopPropagation();
            if (items.length > 0) {
              const idx = items.indexOf(triggerRef.current!);
              items[(idx + 1) % items.length]?.focus();
            }
            break;
          case "ArrowUp":
            e.preventDefault();
            e.stopPropagation();
            if (items.length > 0) {
              const idx = items.indexOf(triggerRef.current!);
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
        }
      },
      [disabled, setIsOpen, focusFirstItem, closeMenu, triggerRef]
    );

    return (
      <button
        ref={triggerRef}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        data-state={isOpen ? "open" : "closed"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        className={cn(
          "px-3 py-2 w-full mx-1 rounded-control flex items-center justify-between gap-3",
          "text-sm duration-(--transition-fast) cursor-pointer",
          "focus:outline-none",
          "focus-visible:bg-muted/80 focus-visible:text-brand",
          "dark:focus-visible:bg-white/10 dark:focus-visible:text-brand",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : isOpen
              ? "bg-muted/80 text-surface-content dark:bg-white/10 dark:text-surface-content"
              : "text-surface-content dark:text-surface-content hover:bg-muted/80 dark:hover:bg-white/10",
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
        <svg
          className="w-4 h-4 shrink-0 text-muted-content dark:text-muted-content"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }
);

ContextMenuSubTrigger.displayName = "ContextMenu.SubTrigger";

// ─── SubContent ──────────────────────────────────────────────

const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ children, className, ...props }, ref) => {
    const subCtx = useContext(SubContext);
    if (!subCtx) throw new Error("SubContent must be used within ContextMenu.Sub");

    const { isOpen, subMenuRef, triggerRef, handleTypeahead, openSub, closeSub } = subCtx;
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // Position relative to trigger with viewport clamping
    useLayoutEffect(() => {
      if (!isOpen || !triggerRef.current || !subMenuRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const subRect = subMenuRef.current.getBoundingClientRect();
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const pad = 8;

      let top = triggerRect.top;
      let left = triggerRect.right;

      // Flip left if overflows right
      if (left + subRect.width > vpW - pad) {
        left = triggerRect.left - subRect.width;
      }
      if (left < pad) left = pad;

      // Clamp vertical
      if (top + subRect.height > vpH - pad) {
        top = vpH - subRect.height - pad;
      }
      if (top < pad) top = pad;

      setPosition({ top, left });
    }, [isOpen, triggerRef, subMenuRef]);

    // Focus first item on open
    useEffect(() => {
      if (isOpen && subMenuRef.current) {
        requestAnimationFrame(() => {
          const first = subMenuRef.current?.querySelector<HTMLElement>(
            '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
          );
          first?.focus();
        });
      }
    }, [isOpen, subMenuRef]);

    // Typeahead on the submenu
    const handleMenuKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          closeSub();
          triggerRef.current?.focus();
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          e.stopPropagation();
          closeSub();
          triggerRef.current?.focus();
          return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          handleTypeahead(e.key);
        }
      },
      [handleTypeahead, closeSub, triggerRef]
    );

    if (!isOpen) return null;

    return createPortal(
      <div
        ref={subMenuRef}
        data-contextmenu-portal
        role="menu"
        aria-label="Submenu"
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 10000,
        }}
        className={cn(
          "min-w-[200px]",
          "bg-elevated dark:bg-elevated",
          "border border-border dark:border-border",
          "rounded-surface shadow-elevated",
          "py-1 animate-fade-in",
          "overflow-y-auto",
          className
        )}
        onMouseEnter={openSub}
        onMouseLeave={closeSub}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleMenuKeyDown}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>,
      document.body
    );
  }
);

ContextMenuSubContent.displayName = "ContextMenu.SubContent";

export { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent };
