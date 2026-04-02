// types.ts
// Types

import { HTMLAttributes, ReactNode } from 'react';

// Core types
export type ColorFormat = 'hex' | 'rgb' | 'hsl';
export type ValidationState = 'default' | 'error' | 'warning' | 'success';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorPickerContextValue {
  color: string;
  format: ColorFormat;
  open: boolean;
  disabled: boolean;
  validationState: ValidationState;
  presets: string[];
  inputId: string;
  labelId: string;
  descriptionId: string;
  errorId: string;
  dropdownId: string;
  setColor: (color: string) => void;
  setOpen: (open: boolean) => void;
  setFormat: (format: ColorFormat) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

// Props
export interface ColorPickerRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  format?: ColorFormat;
  presets?: string[];
  disabled?: boolean;
  validationState?: ValidationState;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ColorPickerLabelProps {
  children: ReactNode;
  className?: string;
  optional?: boolean;
}

export interface ColorPickerDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface ColorPickerErrorProps {
  children: ReactNode;
  className?: string;
}

export interface ColorPickerTriggerProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'children'
> {
  size?: 'sm' | 'md' | 'lg';
}

export interface ColorPickerInputProps extends Omit<
  HTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  placeholder?: string;
}

export interface ColorPickerCopyButtonProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'children'
> {
  copiedText?: string;
}

export interface ColorPickerContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  sideOffset?: number;
}

export interface ColorPickerPaletteProps extends Omit<
  HTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  label?: string;
}

export interface ColorPickerEyedropperProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label?: string;
  unsupportedText?: string;
}

export interface ColorPickerPresetsProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  colors?: string[];
  columns?: number;
}

export interface ColorPickerSwatchesProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  colors: string[];
  value?: string;
  onChange?: (color: string) => void;
  size?: 'sm' | 'md' | 'lg';
  columns?: number;
  label?: string;
  disabled?: boolean;
}
