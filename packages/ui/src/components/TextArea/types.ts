// types.ts
// Types

import { TextareaHTMLAttributes } from 'react';
import type { InputSize, ValidationState } from '../../utils/input-styles';

export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';
export type { InputSize as TextAreaSize };

export interface TextAreaContextValue {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  charCount: number;
  setCharCount: (count: number) => void;
  maxLength?: number;
  validationState: ValidationState;
  size: InputSize;
  disabled?: boolean;
  loading?: boolean;
  inputId: string;
  supportTextId: string;
  errorTextId: string;
  labelId: string;
  setLabelId: (id: string) => void;
  hasSupportText: boolean;
  setHasSupportText: (has: boolean) => void;
}

export interface TextAreaRootProps {
  children: React.ReactNode;
  size?: InputSize;
  /** @deprecated Use `validationState` instead. */
  error?: boolean;
  validationState?: ValidationState;
  maxLength?: number;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface TextAreaLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  showCharCount?: boolean;
}

export interface TextAreaInputProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  resize?: TextAreaResize;
}

export interface TextAreaSupportTextProps {
  children: string | string[];
  className?: string;
}

export interface TextAreaErrorTextProps {
  children: string | string[];
  className?: string;
}

export interface TextAreaCharCountProps {
  className?: string;
}
