"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils";
import { ContextMenuContext, useBodyScrollLock, useTypeahead } from "./hooks";
import type { ContextMenuProps } from "./types";

const ContextMenuRoot = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, onOpenChange, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const cursorPositionRef = useRef({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement | null>(null);

    useBodyScrollLock(isOpen);

    const handleTypeahead = useTypeahead(menuRef);

    const setIsOpenWrapped = useCallback(
      (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
      },
      [onOpenChange]
    );

    const closeMenu = useCallback(() => {
      setIsOpenWrapped(false);
    }, [setIsOpenWrapped]);

    // Click outside to close
    useEffect(() => {
      if (!isOpen) return;
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          !target.closest("[data-contextmenu]") &&
          !target.closest("[data-contextmenu-portal]")
        ) {
          closeMenu();
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, closeMenu]);

    // Escape to close
    useEffect(() => {
      if (!isOpen) return;
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeMenu();
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, closeMenu]);

    return (
      <ContextMenuContext.Provider
        value={{
          isOpen,
          setIsOpen: setIsOpenWrapped,
          closeMenu,
          cursorPositionRef,
          menuRef,
          handleTypeahead,
        }}
      >
        <div ref={ref} data-contextmenu className={cn(className)} {...props}>
          {children}
        </div>
      </ContextMenuContext.Provider>
    );
  }
);

ContextMenuRoot.displayName = "ContextMenu";

export { ContextMenuRoot };
