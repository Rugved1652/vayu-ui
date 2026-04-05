// hooks.ts
// Logic

import { createContext, useContext } from 'react';
import type { CheckboxContextValue } from './types';

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('Checkbox compound components must be used within Checkbox.Root');
  }
  return context;
};
