// index.ts
// Public API

import { ToastTitle, ToastDescription, ToastClose } from "./compound";
import { ToastProvider, useToast } from "./toast-provider";

// Compound component
export const Toast = {
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
};

export { ToastProvider, useToast };
export type { ToastOptions, ToastType, ToastPosition, ToastContextType } from "./types";
export type { Toast as ToastData } from "./types";
