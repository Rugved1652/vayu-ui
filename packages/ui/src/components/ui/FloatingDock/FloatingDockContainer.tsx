// container.tsx
// UI: glassmorphism layout with cloneElement injection

import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ElementType,
} from 'react';
import { cn } from '../utils';
import type { InjectedDockProps } from './types';

const DockContainer = ({
  children,
  className,
  linkComponent: LinkComponent,
  ...props
}: HTMLAttributes<HTMLDivElement> & { linkComponent?: ElementType }) => {
  const renderedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<InjectedDockProps>, {
        linkComponent: LinkComponent,
      });
    }
    return child;
  });

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-3',
        'bg-surface/80 backdrop-blur-surface',
        'border border-border/50',
        'rounded-overlay shadow-elevated',
        className,
      )}
      {...props}
    >
      {renderedChildren}
    </div>
  );
};

export default DockContainer;
