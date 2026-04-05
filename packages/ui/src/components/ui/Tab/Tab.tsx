// tab.tsx
// Composition: context provider + compound component wiring

'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '../utils';
import { TabsContext } from './hooks';
import TabsList from './TabsList';
import TabsTrigger from './TabsTrigger';
import TabsContent from './TabsContent';
import type { TabsProps, TabsOrientation, TabsContextValue } from './types';

/**
 * Tabs Component - Compound Pattern
 * A flexible, headless-style tabbed interface component with full dark/light mode support.
 * Supports controlled/uncontrolled modes, keyboard navigation, and full accessibility (WCAG 2.2 AA).
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs>
 * ```
 */
const TabsBase = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value,
      onValueChange,
      orientation = 'horizontal',
      autoFocus = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [activeTab, setActiveTab] = useState(value || defaultValue || '');
    const isControlled = value !== undefined;

    // Sync controlled value
    useEffect(() => {
      if (isControlled && value !== undefined) {
        setActiveTab(value);
      }
    }, [value, isControlled]);

    const handleTabChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setActiveTab(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    const contextValue: TabsContextValue = {
      activeTab: isControlled ? value! : activeTab,
      setActiveTab: handleTabChange,
      orientation,
      autoFocus,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'w-full',
            orientation === 'vertical' ? 'flex flex-row' : 'flex flex-col',
            className,
          )}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

TabsBase.displayName = 'Tabs';

// Attach compound components
Object.assign(TabsBase, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

const Tabs = TabsBase as React.ForwardRefExoticComponent<
  TabsProps & React.RefAttributes<HTMLDivElement>
> & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
};

export default Tabs;
