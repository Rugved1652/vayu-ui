import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import { cn } from "../utils";
import type {
  ContextMenuContextValue,
  SubContextValue,
  RadioGroupCtxValue,
} from "./types";

// ─── Contexts ───────────────────────────────────────────────

export const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);
export const SubContext = createContext<SubContextValue | null>(null);
export const RadioGroupContext = createContext<RadioGroupCtxValue | null>(null);

// ─── Context Hooks ──────────────────────────────────────────

export const useContextMenuCtx = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error("ContextMenu components must be used within <ContextMenu>");
  return ctx;
};

export const useSubCtx = () => {
  const ctx = useContext(SubContext);
  if (!ctx) throw new Error("SubMenu components must be used within <ContextMenu.Sub>");
  return ctx;
};

// ─── Typeahead ──────────────────────────────────────────────

export const useTypeahead = (menuRef: React.RefObject<HTMLElement | null>) => {
  const bufferRef = useRef({ buffer: "", timeout: null as ReturnType<typeof setTimeout> | null });

  const handler = useCallback(
    (key: string) => {
      if (!menuRef.current) return;
      if (bufferRef.current.timeout) clearTimeout(bufferRef.current.timeout);

      bufferRef.current.buffer += key.toLowerCase();

      const items = menuRef.current.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
      );
      const match = Array.from(items).find((item) =>
        item.textContent?.toLowerCase().startsWith(bufferRef.current.buffer)
      );
      match?.focus();

      bufferRef.current.timeout = setTimeout(() => {
        bufferRef.current.buffer = "";
      }, 500);
    },
    [menuRef]
  );

  return handler;
};

// ─── Item Keyboard Navigation ───────────────────────────────

export const useItemKeyDown = (disabled: boolean, action: () => void) =>
  useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        action();
      }
    },
    [disabled, action]
  );

// ─── Focusable Items Helper ─────────────────────────────────

export function getFocusableItems(container: Element | null | undefined): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
    )
  );
}

// ─── Shared Item Styles ─────────────────────────────────────

export const baseItemStyles = (disabled: boolean, variant?: "destructive") =>
  cn(
    "px-3 py-2 rounded-control flex items-center gap-3",
    "text-sm duration-(--transition-fast) cursor-pointer",
    "focus:outline-none",
    "focus-visible:bg-muted/80 focus-visible:text-brand",
    "dark:focus-visible:bg-white/10 dark:focus-visible:text-brand",
    disabled
      ? "opacity-50 cursor-not-allowed"
      : variant === "destructive"
        ? "text-destructive dark:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10"
        : "text-surface-content dark:text-surface-content hover:bg-muted/80 dark:hover:bg-white/10"
  );
