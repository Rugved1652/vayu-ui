// collapsible.tsx
// Composition: context + root

'use client';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useId,
  useState,
  forwardRef,
} from 'react';
import { cn } from '../../utils';
import type {
  CollapsibleRootProps,
  CollapsibleContextType,
  CollapsibleContentProps,
  CollapsibleTriggerProps,
} from './types';
import { CollapsibleContent } from './CollapsibleContent';
import { CollapsibleTrigger } from './CollapsibleTrigger';

// Context

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

export const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible components must be used within Collapsible.Root');
  }
  return context;
};

// Root

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  ({ children, defaultOpen = false, open, onOpenChange, className, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const id = useId();

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;

    const toggle = useCallback(() => {
      if (isControlled) {
        onOpenChange?.(!open);
      } else {
        setUncontrolledOpen((prev) => {
          const next = !prev;
          onOpenChange?.(next);
          return next;
        });
      }
    }, [isControlled, open, onOpenChange]);

    const contextValue = useMemo(
      () => ({
        isOpen,
        toggle,
        contentId: `${id}-content`,
        triggerId: `${id}-trigger`,
      }),
      [isOpen, toggle],
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);

CollapsibleRoot.displayName = 'Collapsible.Root';

const Collapsible = Object.assign(CollapsibleRoot, {
  Content: CollapsibleContent,
  Trigger: CollapsibleTrigger,
});

export default Collapsible;
