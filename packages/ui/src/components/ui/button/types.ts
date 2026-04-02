// types.ts
// Types

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  REJECTED = 'rejected',
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

export type ButtonSize = 'small' | 'medium' | 'large';

export type BadgePosition = 'top-right' | 'top-left' | 'inline-right' | 'inline-left';

export type BadgeVariant = 'primary' | 'danger' | 'warning' | 'info' | 'success';

import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: Status;
  fullWidth?: boolean;
  loadingText?: string;
  'aria-label'?: string;
}

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: ButtonSize;
  children: React.ReactNode;
  label?: string;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: ButtonSize;
  value?: number | string;
  max?: number;
  position?: BadgePosition;
  variant?: BadgeVariant;
  showZero?: boolean;
  className?: string;
}

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}
