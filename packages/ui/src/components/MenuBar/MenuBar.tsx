// menubar.tsx
// Composition: root menubar + context provider

import React, { useCallback, useRef, useState } from 'react';
import { cn } from '../../utils';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { MenubarContext } from './hooks';
import type { MenubarProps } from './types';

export const MenubarRoot = ({
  children,
  orientation = 'horizontal',
  className = '',
  ...props
}: MenubarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const triggersRef = useRef<Map<string, React.RefObject<HTMLButtonElement | null>>>(new Map());
  const menubarRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const closeAllMenus = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const registerTrigger = useCallback(
    (id: string, ref: React.RefObject<HTMLButtonElement | null>) => {
      triggersRef.current.set(id, ref);
    },
    [],
  );

  const unregisterTrigger = useCallback((id: string) => {
    triggersRef.current.delete(id);
  }, []);

  const getAllTriggers = useCallback(() => {
    return Array.from(triggersRef.current.entries()).map(([id, ref]) => ({ id, ref }));
  }, []);

  // Close menus when clicking outside
  useOnClickOutside(menubarRef, (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-menu-portal]')) {
      closeAllMenus();
    }
  });

  // Close menus on Escape key
  useKeyPress('Escape', () => {
    closeAllMenus();
  });

  return (
    <MenubarContext.Provider
      value={{
        orientation,
        activeMenu,
        setActiveMenu,
        closeAllMenus,
        registerTrigger,
        unregisterTrigger,
        getAllTriggers,
      }}
    >
      <div
        ref={menubarRef}
        data-menubar
        className={cn(
          'bg-surface dark:bg-surface',
          'border border-border dark:border-border',
          'rounded-surface p-1',
          orientation === 'horizontal' ? 'flex items-center gap-1' : 'flex flex-col gap-1',
          'font-secondary',
          'duration-(--transition-fast)',
          className,
        )}
        role="menubar"
        aria-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  );
};
