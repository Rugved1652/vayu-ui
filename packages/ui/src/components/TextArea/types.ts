// types.ts
// Types

import { TextareaHTMLAttributes } from 'react';

export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';
export type TextAreaSize = 'sm' | 'md' | 'lg';

export interface TextAreaContextValue {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  charCount: number;
  setCharCount: (count: number) => void;
  maxLength?: number;
  error?: boolean;
  size: TextAreaSize;
  disabled?: boolean;
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
  size?: TextAreaSize;
  error?: boolean;
  maxLength?: number;
  disabled?: boolean;
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
