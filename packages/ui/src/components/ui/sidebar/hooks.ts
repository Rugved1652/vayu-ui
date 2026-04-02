// Logic

import { createContext, useContext } from 'react';
import type { SidebarContextType } from './types';

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within SidebarProvider');
  }
  return context;
};
