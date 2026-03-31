// radio-group.tsx
// UI: presentational

import { clsx } from 'clsx';
import { Circle } from 'lucide-react';
import React, { forwardRef, useContext, useCallback } from 'react';
import { RadioGroupContext, useItemKeyDown, baseItemStyles } from './hooks';
import type { ContextMenuRadioGroupProps, ContextMenuRadioItemProps } from './types';

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

export { ContextMenuRadioGroup, ContextMenuRadioItem };
