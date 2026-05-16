// SidebarFooter.tsx
// UI: presentational

'use client';

import React from 'react';
import { useSidebar } from './hooks';
import type { SidebarFooterProps } from './types';

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children }) => {
  const { collapsed, mobile } = useSidebar();

  const content = typeof children === 'function'
    ? children({ collapsed, mobile })
    : children;

  return (
    <div className={`p-4 border-t border-border ${collapsed && !mobile ? 'px-2' : ''}`}>
      {content}
    </div>
  );
};
