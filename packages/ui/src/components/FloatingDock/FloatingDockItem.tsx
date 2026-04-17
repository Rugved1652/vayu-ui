// item.tsx
// UI: interactive navigation item with tooltip

import type { HTMLAttributes, ElementType, ComponentType } from 'react';
import Link from 'next/link';
import { cn } from '../../utils';
import { Tooltip } from '../Tooltip';
import type { DockItemProps, InjectedDockProps } from './types';

const DockItem = (allProps: DockItemProps & InjectedDockProps) => {
  const {
    icon: Icon,
    label,
    href,
    onClick,
    className,
    linkComponent: LinkComponent = Link,
    ...props
  } = allProps;

  // Layout
  const itemClasses = cn(
    'group relative p-3 rounded-surface cursor-pointer',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'motion-safe:hover:scale-110 motion-safe:hover:-translate-y-2',
    'bg-transparent hover:bg-muted/50',
    className,
  );

  const content = (
    <>
      {Icon && (
        <Icon
          className="w-5 h-5 text-muted-content group-hover:text-brand transition-colors"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Tooltip content={label} position="bottom">
        <LinkComponent
          href={href}
          className={itemClasses}
          onClick={onClick}
          aria-label={label}
          {...props}
        >
          {content}
        </LinkComponent>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={label} position="bottom">
      <button type="button" className={itemClasses} onClick={onClick} aria-label={label} {...props}>
        {content}
      </button>
    </Tooltip>
  );
};

export default DockItem;
