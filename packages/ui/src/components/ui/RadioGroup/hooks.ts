// hooks.ts
// Logic

import { createContext, useContext } from 'react';
import type { RadioGroupContextType } from './types';

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup components must be used within RadioGroup.Root');
  }
  return context;
};

export { RadioGroupContext, useRadioGroup };
