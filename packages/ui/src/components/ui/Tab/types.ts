// types.ts
// Types

import React from 'react';

type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: TabsOrientation;
  autoFocus?: boolean;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  /** Automatically move focus to the tab panel when a tab is activated */
  autoFocus?: boolean;
  children: React.ReactNode;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the tab list. Required for WCAG 2.2 AA compliance. */
  'aria-label'?: string;
  /** Alternative to aria-label, references an element that labels the tab list */
  'aria-labelledby'?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  forceMount?: boolean;
}

export type {
  TabsOrientation,
  TabsContextValue,
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
};
