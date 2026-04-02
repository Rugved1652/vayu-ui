// context.ts
// Logic

import { createContext, useContext } from 'react';
import type { TabsContextValue } from './types';

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
};

export { TabsContext, useTabsContext };
