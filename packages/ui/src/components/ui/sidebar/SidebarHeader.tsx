// SidebarHeader.tsx
// UI: presentational

'use client';

import React from 'react';
import { useSidebar } from './hooks';
import type { SidebarHeaderProps } from './types';

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children }) => {
  const { collapsed, mobile } = useSidebar();

  return (
    <div
      className={`p-6 border-b border-border ${collapsed && !mobile ? 'px-4 overflow-hidden' : ''}`}
    >
      {children}
    </div>
  );
};
