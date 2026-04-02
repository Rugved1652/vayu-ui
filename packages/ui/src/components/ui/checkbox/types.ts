// types.ts
// Types

import { InputHTMLAttributes, HTMLAttributes } from 'react';

export interface CheckboxContextValue {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  error: boolean;
  checkboxId: string;
  errorId: string;
  descriptionId: string;
  name?: string;
  value?: string;
  required?: boolean;
  onChange: (checked: boolean) => void;
}

export interface CheckboxRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
}

export interface CheckboxIndicatorProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {}

export interface CheckboxLabelProps extends HTMLAttributes<HTMLLabelElement> {}

export interface CheckboxDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export interface CheckboxErrorProps extends HTMLAttributes<HTMLParagraphElement> {}
