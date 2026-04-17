// separator.tsx
// UI: Visual separator between items

import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils';
import type { BreadcrumbSeparatorProps } from './types';

const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

export default BreadcrumbSeparator;
