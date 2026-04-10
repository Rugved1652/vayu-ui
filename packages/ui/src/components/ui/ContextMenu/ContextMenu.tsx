"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn, useMergeRefs } from "../utils";
import { ContextMenuContext, useTypeahead } from "./hooks";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { useLockBodyScroll } from "../../../hooks/useLockBodyScroll";
import type { ContextMenuProps } from "./types";

const ContextMenuRoot = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, onOpenChange, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const cursorPositionRef = useRef({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);

    useLockBodyScroll(isOpen);

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

    useOnClickOutside(
      [rootRef, menuRef] as React.RefObject<HTMLElement>[],
      () => {
        if (isOpen) closeMenu();
      },
    );

    // Escape to close
    useEffect(() => {
      if (!isOpen) return;
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeMenu();
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, closeMenu]);

    const mergedRef = useMergeRefs(rootRef, ref);

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
        <div ref={mergedRef} data-contextmenu className={cn(className)} {...props}>
          {children}
        </div>
      </ContextMenuContext.Provider>
    );
  }
);

ContextMenuRoot.displayName = "ContextMenu";

export { ContextMenuRoot };
