'use client';

import { clsx } from 'clsx';
import { Check, ChevronRight, Circle } from 'lucide-react';
import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// Context types
// ============================================================================

interface ContextMenuContextValue {
  isOpen: boolean;
  closeMenu: () => void;
  openSubmenu: (id: string) => void;
  closeSubmenu: (id: string) => void;
  openSubmenus: Set<string>;
  menuId: string;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

const useContextMenuCtx = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error('ContextMenu compound components must be used within ContextMenu');
  return ctx;
};

interface RadioGroupCtxValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupCtxValue | null>(null);

interface SubmenuContextValue {
  id: string;
  isOpen: boolean;
  position: { x: number; y: number };
  triggerRef: React.RefObject<HTMLDivElement>;
  handleOpen: () => void;
  handleClose: () => void;
}

const SubmenuContext = createContext<SubmenuContextValue | null>(null);

// ============================================================================
// Prop interfaces
// ============================================================================

interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

interface ContextMenuCheckboxItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ContextMenuRadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface ContextMenuRadioItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ContextMenuSubProps {
  children: React.ReactNode;
}

interface ContextMenuSubTriggerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ContextMenuSubContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ContextMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

interface ContextMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ============================================================================
// Constants & Shared Utilities
// ============================================================================

const MENU_ITEM_SELECTOR =
  '[role="menuitem"]:not([aria-disabled="true"]), ' +
  '[role="menuitemcheckbox"]:not([aria-disabled="true"]), ' +
  '[role="menuitemradio"]:not([aria-disabled="true"])';

const VIEWPORT_PAD = 8;

// Fixed baseItemStyles: Added '!' to force focus styles over hover states
const baseItemStyles = (disabled: boolean, variant?: 'destructive') =>
  clsx(
    'px-3 py-2 mx-1 rounded-md flex items-center gap-3',
    'font-secondary text-sm transition-colors cursor-pointer',
    ' focus:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-600',
    'dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400',
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : variant === 'destructive'
        ? 'text-error-700 dark:text-error-300 hover:bg-error-50 dark:hover:bg-error-900/20'
        : 'text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20',
  );

// ============================================================================
// Shared Hooks
// ============================================================================

const useBodyScrollLock = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    const orig = window.getComputedStyle(document.body).overflow;
    const origPR = window.getComputedStyle(document.body).paddingRight;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    return () => {
      document.body.style.overflow = orig;
      document.body.style.paddingRight = origPR;
    };
  }, [enabled]);
};

/**
 * Clamps menu position to viewport and computes max-height to ensure
 * the menu scrolls if items are too long.
 */
const useMenuPosition = (
  position: { x: number; y: number } | undefined,
  contentRef: React.RefObject<HTMLDivElement | null>,
  sideOffset = 4,
  isSubmenu = false,
  enabled = true,
) => {
  const [adjusted, setAdjusted] = useState(position ?? { x: 0, y: 0 });
  const [maxHeight, setMaxHeight] = useState<number | undefined>();

  useEffect(() => {
    if (!enabled || !position || !contentRef.current) return;

    const rect = contentRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = position.x + sideOffset;
    if (x + rect.width > vw - VIEWPORT_PAD) {
      x = isSubmenu ? position.x - rect.width - sideOffset : vw - rect.width - VIEWPORT_PAD;
    }
    if (x < VIEWPORT_PAD) x = VIEWPORT_PAD;

    let y = isSubmenu ? position.y : position.y + sideOffset;
    if (y < VIEWPORT_PAD) y = VIEWPORT_PAD;

    // Calculate available space from the adjusted Y position to the bottom padding
    let calculatedMaxHeight = vh - y - VIEWPORT_PAD;

    setAdjusted({ x, y });
    setMaxHeight(Math.max(0, calculatedMaxHeight));
  }, [position, sideOffset, isSubmenu, enabled, contentRef]);

  return { adjusted, maxHeight };
};

/**
 * Keyboard navigation shared by Content and SubContent:
 *   ArrowUp/Down, Home/End, Tab trap, Escape, ArrowLeft, typeahead.
 */
const useMenuKeyboard = (
  contentRef: React.RefObject<HTMLDivElement | null>,
  onEscape: () => void,
  onArrowLeft?: () => void,
) => {
  const typeahead = useRef({
    buffer: '',
    timeout: null as ReturnType<typeof setTimeout> | null,
  });

  const getItems = useCallback(() => {
    if (!contentRef.current) return [];
    return Array.from(contentRef.current.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR));
  }, [contentRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = getItems();
      if (items.length === 0) return;

      const cur = items.findIndex((i) => i === document.activeElement);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          e.stopPropagation();
          items[cur < items.length - 1 ? cur + 1 : 0]?.focus();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          e.stopPropagation();
          items[cur > 0 ? cur - 1 : items.length - 1]?.focus();
          break;
        }
        case 'Home':
          e.preventDefault();
          e.stopPropagation();
          items[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          e.stopPropagation();
          items[items.length - 1]?.focus();
          break;
        case 'Tab': {
          e.preventDefault();
          e.stopPropagation();
          const next = e.shiftKey
            ? cur > 0
              ? cur - 1
              : items.length - 1
            : cur < items.length - 1
              ? cur + 1
              : 0;
          items[next]?.focus();
          break;
        }
        case 'Escape':
          e.preventDefault();
          e.stopPropagation();
          onEscape();
          break;
        case 'ArrowLeft':
          if (onArrowLeft) {
            e.preventDefault();
            e.stopPropagation();
            onArrowLeft();
          }
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            if (typeahead.current.timeout) clearTimeout(typeahead.current.timeout);
            typeahead.current.buffer += e.key.toLowerCase();
            const match = items.find((i) =>
              i.textContent?.toLowerCase().startsWith(typeahead.current.buffer),
            );
            match?.focus();
            typeahead.current.timeout = setTimeout(() => {
              typeahead.current.buffer = '';
            }, 500);
          }
          break;
      }
    },
    [getItems, onEscape, onArrowLeft],
  );

  return handleKeyDown;
};

/** Shared Enter / Space handler for Item, CheckboxItem, RadioItem. */
const useItemKeyDown = (disabled: boolean, action: () => void) =>
  useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        action();
      }
    },
    [disabled, action],
  );

// ============================================================================
// ContextMenu (Root) — stores previous focus, restores on close
// ============================================================================

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
                  ContextMenuTriggerProps & {
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
                      ContextMenuContentProps & {
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

// ============================================================================
// Trigger
// ============================================================================

const ContextMenuTrigger = forwardRef<
  HTMLDivElement,
  ContextMenuTriggerProps & {
    onContextMenu?: (e: React.MouseEvent) => void;
  }
>(({ children, disabled = false, className, onContextMenu, ...props }, ref) => {
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (!disabled) onContextMenu?.(e);
    },
    [disabled, onContextMenu],
  );

  return (
    <div
      ref={ref}
      onContextMenu={handleContextMenu}
      className={clsx(disabled && 'opacity-50 cursor-not-allowed', className)}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
    </div>
  );
});

ContextMenuTrigger.displayName = 'ContextMenu.Trigger';

// ============================================================================
// Content
// ============================================================================

const ContextMenuContent = forwardRef<
  HTMLDivElement,
  ContextMenuContentProps & { position?: { x: number; y: number } }
>(({ children, className, align = 'start', sideOffset = 4, position, ...props }, ref) => {
  const { closeMenu, menuId } = useContextMenuCtx();
  const [isMounted, setIsMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { adjusted, maxHeight } = useMenuPosition(
    position,
    contentRef,
    sideOffset,
    false,
    isMounted,
  );

  const handleKeyDown = useMenuKeyboard(contentRef, closeMenu);

  useEffect(() => {
    if (isMounted && contentRef.current) {
      requestAnimationFrame(() => {
        contentRef.current?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)?.focus();
      });
    }
  }, [isMounted]);

  if (!isMounted || !position) return null;

  return createPortal(
    <div
      ref={contentRef}
      id={menuId}
      role="menu"
      aria-label="Context menu"
      style={{
        position: 'fixed',
        top: `${adjusted.y}px`,
        left: `${adjusted.x}px`,
        zIndex: 9999,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
      }}
      className={clsx(
        'min-w-[220px] bg-white dark:bg-neutral-900',
        'border-2 border-neutral-200 dark:border-neutral-800',
        'rounded-lg shadow-2xl py-1',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        'overflow-y-auto', // Ensure scroll if max-height is hit
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
});

ContextMenuContent.displayName = 'ContextMenu.Content';

// ============================================================================
// Item
// ============================================================================

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (
    {
      children,
      onSelect,
      disabled = false,
      destructive = false,
      icon,
      shortcut,
      className,
      ...props
    },
    ref,
  ) => {
    const { closeMenu } = useContextMenuCtx();
    const [isFocused, setIsFocused] = useState(false);

    const handleClick = useCallback(() => {
      if (disabled) return;
      onSelect?.();
      closeMenu();
    }, [disabled, onSelect, closeMenu]);

    const handleKeyDown = useItemKeyDown(disabled, handleClick);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-focused={isFocused ? '' : undefined}
        className={clsx(
          baseItemStyles(disabled, destructive ? 'destructive' : undefined),
          // Change this line from "focus:bg-primary-500! focus:text-white!"
          'focus:bg-primary-500! focus:text-white!',
          'justify-between',
          className,
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
        {shortcut && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono shrink-0">
            {shortcut}
          </span>
        )}
      </div>
    );
  },
);

ContextMenuItem.displayName = 'ContextMenu.Item';

// ============================================================================
// CheckboxItem
// ============================================================================

const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  (
    { children, checked = false, onCheckedChange, disabled = false, icon, className, ...props },
    ref,
  ) => {
    const handleClick = useCallback(() => {
      if (!disabled) onCheckedChange?.(!checked);
    }, [disabled, checked, onCheckedChange]);

    const handleKeyDown = useItemKeyDown(disabled, handleClick);

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={clsx(baseItemStyles(disabled), className)}
        {...props}
      >
        <span className="shrink-0 w-4 h-4" aria-hidden="true">
          {checked ? (
            <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
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
      </div>
    );
  },
);

ContextMenuCheckboxItem.displayName = 'ContextMenu.CheckboxItem';

// ============================================================================
// RadioGroup
// ============================================================================

const ContextMenuRadioGroup: React.FC<ContextMenuRadioGroupProps> = ({
  children,
  value,
  onValueChange,
}) => (
  <RadioGroupContext.Provider value={{ value, onValueChange }}>
    <div role="radiogroup">{children}</div>
  </RadioGroupContext.Provider>
);

ContextMenuRadioGroup.displayName = 'ContextMenu.RadioGroup';

// ============================================================================
// RadioItem
// ============================================================================

const ContextMenuRadioItem = forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ children, value, disabled = false, icon, className, ...props }, ref) => {
    const radioCtx = useContext(RadioGroupContext);
    const isSelected = radioCtx?.value === value;

    const handleClick = useCallback(() => {
      if (!disabled) radioCtx?.onValueChange?.(value);
    }, [disabled, radioCtx, value]);

    const handleKeyDown = useItemKeyDown(disabled, handleClick);

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={isSelected}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={clsx(baseItemStyles(disabled), className)}
        {...props}
      >
        <span className="shrink-0 w-4 h-4" aria-hidden="true">
          {isSelected ? (
            <Circle className="w-4 h-4 fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400" />
          ) : (
            <Circle className="w-4 h-4 text-neutral-300 dark:text-neutral-700" />
          )}
        </span>
        {icon && (
          <span className="shrink-0 w-4 h-4" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
      </div>
    );
  },
);

ContextMenuRadioItem.displayName = 'ContextMenu.RadioItem';

// ============================================================================
// Sub (wrapper)
// ============================================================================

const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children }) => {
  const id = useId();
  const { openSubmenu, closeSubmenu, openSubmenus } = useContextMenuCtx();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const isOpen = openSubmenus.has(id);

  const handleOpen = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ x: rect.right, y: rect.top });
    }
    openSubmenu(id);
  }, [id, openSubmenu]);

  const handleClose = useCallback(() => {
    closeSubmenu(id);
  }, [id, closeSubmenu]);

  return (
    <SubmenuContext.Provider
      value={{
        id,
        isOpen,
        position,
        triggerRef,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </SubmenuContext.Provider>
  );
};

ContextMenuSub.displayName = 'ContextMenu.Sub';

// ============================================================================
// SubTrigger
// ============================================================================

const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ children, disabled = false, icon, className, ...props }, ref) => {
    const submenuCtx = useContext(SubmenuContext);
    if (!submenuCtx) throw new Error('SubTrigger must be used within Sub');

    const { isOpen, triggerRef, handleOpen, handleClose } = submenuCtx;

    const handleMouseEnter = useCallback(() => {
      if (!disabled) handleOpen();
    }, [disabled, handleOpen]);

    const handleMouseLeave = useCallback(() => {
      if (!disabled) handleClose();
    }, [disabled, handleClose]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        switch (e.key) {
          case 'Enter':
          case ' ':
          case 'ArrowRight':
            e.preventDefault();
            e.stopPropagation();
            handleOpen();
            break;
          case 'ArrowLeft':
          case 'Escape':
            e.preventDefault();
            e.stopPropagation();
            handleClose();
            triggerRef.current?.focus();
            break;
        }
      },
      [disabled, handleOpen, handleClose, triggerRef],
    );

    return (
      <div
        ref={triggerRef}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        className={clsx(
          'px-3 py-2 mx-1 rounded-md flex items-center justify-between gap-3',
          'font-secondary text-sm transition-colors cursor-pointer',
          'focus-visible:bg-primary-50 focus-visible:text-primary-600',
          'dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : isOpen
              ? 'bg-primary-50 dark:bg-primary-900/20 text-neutral-900 dark:text-white'
              : 'text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20',
          className,
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
        <ChevronRight
          className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400"
          aria-hidden="true"
        />
      </div>
    );
  },
);

ContextMenuSubTrigger.displayName = 'ContextMenu.SubTrigger';

// ============================================================================
// SubContent — Escape / ArrowLeft close only this submenu
// ============================================================================

const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ children, className, ...props }, ref) => {
    const submenuCtx = useContext(SubmenuContext);
    if (!submenuCtx) throw new Error('SubContent must be used within Sub');

    const { isOpen, position, triggerRef, handleOpen, handleClose } = submenuCtx;

    const [isMounted, setIsMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const { adjusted, maxHeight } = useMenuPosition(
      position,
      contentRef,
      4,
      true,
      isMounted && isOpen,
    );

    const returnToTrigger = useCallback(() => {
      handleClose();
      triggerRef.current?.focus();
    }, [handleClose, triggerRef]);

    const handleKeyDown = useMenuKeyboard(contentRef, returnToTrigger, returnToTrigger);

    useEffect(() => {
      if (isOpen && isMounted && contentRef.current) {
        requestAnimationFrame(() => {
          contentRef.current?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)?.focus();
        });
      }
    }, [isOpen, isMounted]);

    if (!isMounted || !isOpen) return null;

    return createPortal(
      <div
        ref={contentRef}
        role="menu"
        aria-label="Submenu"
        style={{
          position: 'fixed',
          top: `${adjusted.y}px`,
          left: `${adjusted.x}px`,
          zIndex: 10000,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        }}
        className={clsx(
          'min-w-[200px] bg-white dark:bg-neutral-900',
          'border-2 border-neutral-200 dark:border-neutral-800',
          'rounded-lg shadow-2xl py-1',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'overflow-y-auto', // Ensure scroll
          className,
        )}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>,
      document.body,
    );
  },
);

ContextMenuSubContent.displayName = 'ContextMenu.SubContent';

// ============================================================================
// Separator
// ============================================================================

const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={clsx('my-1 mx-2 h-px bg-neutral-200 dark:bg-neutral-800', className)}
      {...props}
    />
  ),
);

ContextMenuSeparator.displayName = 'ContextMenu.Separator';

// ============================================================================
// Label
// ============================================================================

const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="presentation"
      className={clsx(
        'px-3 py-2 text-xs font-secondary font-semibold',
        'text-neutral-500 dark:text-neutral-400 uppercase tracking-wider',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

ContextMenuLabel.displayName = 'ContextMenu.Label';

// ============================================================================
// Compound export
// ============================================================================

const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Separator: ContextMenuSeparator,
  Label: ContextMenuLabel,
});

export { ContextMenu };

export type {
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSeparatorProps,
  ContextMenuSubContentProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps,
};
