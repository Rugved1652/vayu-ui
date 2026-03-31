// contextmenu.tsx
// Composition: UI + wiring

import React, { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import { ContextMenuContext, useBodyScrollLock } from './hooks';
import { ContextMenuContent } from './content';
import { ContextMenuTrigger } from './trigger';
import type { ContextMenuProps } from './types';

const ContextMenuRoot = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, onOpenChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const menuId = useId();

    useBodyScrollLock(isOpen);

    const closeMenu = useCallback(() => {
      setIsOpen(false);
      setOpenSubmenus(new Set());
      onOpenChange?.(false);
      requestAnimationFrame(() => {
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      });
    }, [onOpenChange]);

    const openSubmenu = useCallback((id: string) => {
      setOpenSubmenus((prev) => new Set(prev).add(id));
    }, []);

    const closeSubmenu = useCallback((id: string) => {
      setOpenSubmenus((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, []);

    useEffect(() => {
      if (!isOpen) return;

      const onClickOutside = () => closeMenu();
      const onEscapeFallback = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !e.defaultPrevented) closeMenu();
      };

      document.addEventListener('click', onClickOutside);
      document.addEventListener('keydown', onEscapeFallback);
      return () => {
        document.removeEventListener('click', onClickOutside);
        document.removeEventListener('keydown', onEscapeFallback);
      };
    }, [isOpen, closeMenu]);

    return (
      <ContextMenuContext.Provider
        value={{
          isOpen,
          closeMenu,
          openSubmenu,
          closeSubmenu,
          openSubmenus,
          menuId,
        }}
      >
        <div ref={ref} {...props}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === ContextMenuTrigger) {
              return React.cloneElement(
                child as React.ReactElement<
                  React.ComponentProps<typeof ContextMenuTrigger> & {
                    onContextMenu?: (e: React.MouseEvent) => void;
                  }
                >,
                {
                  onContextMenu: (e: React.MouseEvent) => {
                    e.preventDefault();
                    previousFocusRef.current = document.activeElement as HTMLElement;
                    setPosition({
                      x: e.clientX,
                      y: e.clientY,
                    });
                    setIsOpen(true);
                    onOpenChange?.(true);
                  },
                },
              );
            }
            if (React.isValidElement(child) && child.type === ContextMenuContent) {
              return isOpen
                ? React.cloneElement(
                    child as React.ReactElement<
                      React.ComponentProps<typeof ContextMenuContent> & {
                        position?: {
                          x: number;
                          y: number;
                        };
                      }
                    >,
                    { position },
                  )
                : null;
            }
            return child;
          })}
        </div>
      </ContextMenuContext.Provider>
    );
  },
);

ContextMenuRoot.displayName = 'ContextMenu';

export { ContextMenuRoot };
