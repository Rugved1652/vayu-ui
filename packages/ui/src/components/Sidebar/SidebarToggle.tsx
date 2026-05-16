// SidebarToggle.tsx
// UI: collapse/expand button

'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from './hooks';
import type { SidebarToggleProps } from './types';

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ floating = true }) => {
  const { collapsed, setCollapsed, mobile } = useSidebar();

  if (mobile) {
    return null;
  }

  const baseClasses =
    'w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-muted-content hover:text-surface-content hover:bg-muted transition-all duration-200 shadow-lg z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar';

  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      aria-label={collapsed ? 'Expand sidebar navigation' : 'Collapse sidebar navigation'}
      aria-expanded={!collapsed}
      className={
        floating
          ? `absolute top-10 -right-6 -translate-x-1/2 translate-y-0 ${baseClasses}`
          : baseClasses
      }
    >
      {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </button>
  );
};
