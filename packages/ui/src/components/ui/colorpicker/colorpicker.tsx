// colorpicker.tsx
// Composition: state + context provider

'use client';

import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../utils';
import { ColorPickerContext } from './hooks';
import { parseColor, DEFAULT_PRESETS } from './utils';
import type { ColorPickerRootProps, ColorPickerContextValue } from './types';

const ColorPickerRoot = forwardRef<HTMLDivElement, ColorPickerRootProps>(
  (
    {
      children,
      value: controlledValue,
      defaultValue = '#3b82f6',
      onChange,
      format = 'hex',
      presets = DEFAULT_PRESETS,
      disabled = false,
      validationState = 'default',
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      className,
      ...props
    },
    ref,
  ) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [internalColor, setInternalColor] = useState(defaultValue);
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const baseId = useId();
    const inputId = `${baseId}-input`;
    const labelId = `${baseId}-label`;
    const descriptionId = `${baseId}-description`;
    const errorId = `${baseId}-error`;
    const dropdownId = `${baseId}-dropdown`;

    const isControlledColor = controlledValue !== undefined;
    const isControlledOpen = controlledOpen !== undefined;

    const color = isControlledColor ? controlledValue : internalColor;
    const open = isControlledOpen ? controlledOpen : internalOpen;

    const setColor = useCallback(
      (newColor: string) => {
        const parsed = parseColor(newColor);
        if (parsed) {
          if (!isControlledColor) {
            setInternalColor(parsed);
          }
          onChange?.(parsed);
        }
      },
      [isControlledColor, onChange],
    );

    const setOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlledOpen) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlledOpen, onOpenChange],
    );

    const setFormat = useCallback(() => {
      // Format is controlled via props, this is for future extensibility
    }, []);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          triggerRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };

      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, setOpen]);

    const contextValue = useMemo<ColorPickerContextValue>(
      () => ({
        color,
        format,
        open,
        disabled,
        validationState,
        presets,
        inputId,
        labelId,
        descriptionId,
        errorId,
        dropdownId,
        setColor,
        setOpen,
        setFormat,
        triggerRef,
        contentRef,
        inputRef,
      }),
      [
        color,
        format,
        open,
        disabled,
        validationState,
        presets,
        inputId,
        labelId,
        descriptionId,
        errorId,
        dropdownId,
        setColor,
        setOpen,
        setFormat,
      ],
    );

    return (
      <ColorPickerContext.Provider value={contextValue}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </ColorPickerContext.Provider>
    );
  },
);

ColorPickerRoot.displayName = 'ColorPicker.Root';

export default ColorPickerRoot;
