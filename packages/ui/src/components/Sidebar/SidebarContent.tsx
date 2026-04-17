// SidebarContent.tsx
// UI: presentational

'use client';

import React from 'react';
import type { SidebarContentProps } from './types';

export const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
  return (
    <div className="flex-1 px-3 py-4 scrollbar-thin overflow-y-auto overflow-x-hidden scrollbar-thumb-muted-content/30 scrollbar-track-transparent">
      {children}
    </div>
  );
};
