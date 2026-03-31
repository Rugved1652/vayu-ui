// hooks.ts
// Logic

import React, { createContext, useCallback, useContext, useRef } from "react";
import type { MenubarContextValue, MenuContextValue, Orientation } from "./types";
import { MENU_ITEM_SELECTOR } from "./types";

// Contexts

export const MenubarContext = createContext<MenubarContextValue | undefined>(undefined);

export const MenuContext = createContext<MenuContextValue | undefined>(undefined);

// Context hooks

export const useMenubarContext = () => {
    const context = useContext(MenubarContext);
    if (!context) {
        throw new Error("Menubar compound components must be used within Menubar");
    }
    return context;
};

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("Menu compound components must be used within Menu");
    }
    return context;
};

// Shared: typeahead navigation

export const useTypeahead = (menuRef: React.RefObject<HTMLDivElement | null>) => {
    const typeaheadRef = useRef<{ buffer: string; timeout: ReturnType<typeof setTimeout> | null }>({
        buffer: "",
        timeout: null,
    });

    const handleTypeahead = useCallback((key: string) => {
        if (!menuRef.current) return;

        if (typeaheadRef.current.timeout) {
            clearTimeout(typeaheadRef.current.timeout);
        }

        typeaheadRef.current.buffer += key.toLowerCase();

        const items = menuRef.current.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR);
        const match = Array.from(items).find((item) =>
            item.textContent?.toLowerCase().startsWith(typeaheadRef.current.buffer)
        );
        match?.focus();

        typeaheadRef.current.timeout = setTimeout(() => {
            typeaheadRef.current.buffer = "";
        }, 500);
    }, [menuRef]);

    return handleTypeahead;
};

// Shared: focus first/last item helpers

export const useFocusItems = (menuRef: React.RefObject<HTMLDivElement | null>) => {
    const focusFirstItem = useCallback(() => {
        requestAnimationFrame(() => {
            const firstItem = menuRef.current?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR);
            firstItem?.focus();
        });
    }, [menuRef]);

    const focusLastItem = useCallback(() => {
        requestAnimationFrame(() => {
            const items = menuRef.current?.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR);
            const lastItem = items?.[items.length - 1];
            lastItem?.focus();
        });
    }, [menuRef]);

    return { focusFirstItem, focusLastItem };
};

// Shared: keyboard navigation for menu items (MenuItem, CheckboxItem, RadioItem)

export const useMenuNavigation = (
    itemRef: React.RefObject<HTMLButtonElement | null>,
    disabled: boolean,
    orientation: Orientation,
    level: number,
) => {
    const { getAllTriggers, activeMenu, closeAllMenus } = useMenubarContext();
    const menuContext = useMenuContext();

    const navigateToAdjacentMenu = useCallback(
        (direction: "next" | "prev") => {
            const triggers = getAllTriggers();
            const currentIndex = triggers.findIndex((t) => t.id === activeMenu);

            if (currentIndex === -1) return;

            const targetIndex =
                direction === "next"
                    ? (currentIndex + 1) % triggers.length
                    : currentIndex === 0
                      ? triggers.length - 1
                      : currentIndex - 1;

            const targetTrigger = triggers[targetIndex];
            if (targetTrigger && targetTrigger.ref.current) {
                closeAllMenus();
                requestAnimationFrame(() => {
                    targetTrigger.ref.current?.click();
                });
            }
        },
        [getAllTriggers, activeMenu, closeAllMenus],
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (disabled) return;

            const menuEl = itemRef.current?.closest('[role="menu"]');
            const items = menuEl?.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR);

            switch (e.key) {
                case "Enter":
                case " ":
                    e.preventDefault();
                    e.stopPropagation();
                    // Caller handles click via onClick
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    e.stopPropagation();
                    if (items && items.length > 0) {
                        const currentIndex = Array.from(items).indexOf(itemRef.current!);
                        const nextIndex = (currentIndex + 1) % items.length;
                        items[nextIndex]?.focus();
                    }
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    e.stopPropagation();
                    if (items && items.length > 0) {
                        const currentIndex = Array.from(items).indexOf(itemRef.current!);
                        const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                        items[prevIndex]?.focus();
                    }
                    break;
                case "Home":
                    e.preventDefault();
                    e.stopPropagation();
                    if (items && items.length > 0) {
                        items[0]?.focus();
                    }
                    break;
                case "End":
                    e.preventDefault();
                    e.stopPropagation();
                    if (items && items.length > 0) {
                        items[items.length - 1]?.focus();
                    }
                    break;
                case "ArrowRight":
                    if (orientation === "horizontal" && level === 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        navigateToAdjacentMenu("next");
                    }
                    break;
                case "ArrowLeft":
                    if (orientation === "horizontal" && level === 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        navigateToAdjacentMenu("prev");
                    } else if (level > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        menuContext.triggerRef.current?.focus();
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    e.stopPropagation();
                    closeAllMenus();
                    const topLevelTrigger = menuEl
                        ?.closest("[data-menu-id]")
                        ?.querySelector<HTMLButtonElement>('[aria-haspopup="true"]');
                    topLevelTrigger?.focus();
                    break;
            }
        },
        [disabled, itemRef, orientation, level, navigateToAdjacentMenu, closeAllMenus, menuContext],
    );

    return handleKeyDown;
};
