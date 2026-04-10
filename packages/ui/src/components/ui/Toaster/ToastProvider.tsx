// toast-provider.tsx
// Composition: context + provider + hook

'use client';

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import type { Toast, ToastOptions, ToastContextType, ToastProviderProps } from './types';
import { ToastContainer } from './ToastContainer';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'bottom-right',
  maxToasts = 5,
  defaultDuration = 5000,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = Math.random().toString(36).substring(2, 9);
      const toast: Toast = {
        id,
        type: options.type || 'info',
        title: options.title,
        description: options.description,
        duration: options.duration ?? defaultDuration,
        position: options.position || defaultPosition,
        action: options.action,
        onClose: options.onClose,
        dismissible: options.dismissible ?? true,
        icon: options.icon,
        customContent: options.customContent,
        createdAt: Date.now(),
      };

      setToasts((prev) => [toast, ...prev]);

      return id;
    },
    [maxToasts, defaultDuration, defaultPosition],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const updateToast = useCallback((id: string, options: Partial<ToastOptions>) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id
          ? { ...toast, ...options, type: options.type || toast.type, createdAt: Date.now() }
          : toast,
      ),
    );
  }, []);

  const success = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
      addToast({ ...options, type: 'success', description: message }),
    [addToast],
  );

  const error = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
      addToast({ ...options, type: 'error', description: message }),
    [addToast],
  );

  const warning = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
      addToast({ ...options, type: 'warning', description: message }),
    [addToast],
  );

  const info = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
      addToast({ ...options, type: 'info', description: message }),
    [addToast],
  );

  const loading = useCallback(
    (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
      addToast({
        ...options,
        type: 'loading',
        description: message,
        duration: 0,
        dismissible: false,
      }),
    [addToast],
  );

  const custom = useCallback(
    (content: ReactNode, options?: Omit<ToastOptions, 'type' | 'customContent'>) =>
      addToast({ ...options, type: 'info', customContent: content }),
    [addToast],
  );

  const promise = useCallback(
    async <T,>(
      promise: Promise<T>,
      messages: {
        loading: ReactNode;
        success: ReactNode | ((data: T) => ReactNode);
        error: ReactNode | ((error: unknown) => ReactNode);
      },
      options?: Omit<ToastOptions, 'type'>,
    ): Promise<T> => {
      const toastId = loading(messages.loading, options);

      try {
        const data = await promise;
        const successMessage =
          typeof messages.success === 'function' ? messages.success(data) : messages.success;
        updateToast(toastId, {
          type: 'success',
          description: successMessage,
          duration: defaultDuration,
          dismissible: true,
        });
        return data;
      } catch (err) {
        const errorMessage =
          typeof messages.error === 'function' ? messages.error(err) : messages.error;
        updateToast(toastId, {
          type: 'error',
          description: errorMessage,
          duration: defaultDuration,
          dismissible: true,
        });
        throw err;
      }
    },
    [loading, updateToast, defaultDuration],
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        updateToast,
        success,
        error,
        warning,
        info,
        loading,
        custom,
        promise,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export { ToastProvider };
