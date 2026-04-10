// types.ts
// Types

import type { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  type: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: ReactNode;
    onClick: () => void;
  };
  onClose?: () => void;
  dismissible?: boolean;
  icon?: ReactNode;
  customContent?: ReactNode;
  createdAt: number;
}

export interface ToastOptions {
  type?: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: ReactNode;
    onClick: () => void;
  };
  onClose?: () => void;
  dismissible?: boolean;
  icon?: ReactNode;
  customContent?: ReactNode;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, options: Partial<ToastOptions>) => void;
  success: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  error: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  warning: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  info: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  loading: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  custom: (content: ReactNode, options?: Omit<ToastOptions, 'type' | 'customContent'>) => string;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: ReactNode;
      success: ReactNode | ((data: T) => ReactNode);
      error: ReactNode | ((error: unknown) => ReactNode);
    },
    options?: Omit<ToastOptions, 'type'>,
  ) => Promise<T>;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export interface ToastStackProps {
  position: ToastPosition;
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
  onHeightUpdate: (id: string, height: number) => void;
  isAllPaused: boolean;
  position: ToastPosition;
  isExiting?: boolean;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
  maxToasts?: number;
  defaultDuration?: number;
}
