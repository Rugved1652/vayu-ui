// item.tsx
// UI: List item container

import { cn } from '../../utils';
import type { BreadcrumbItemProps } from './types';

const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => (
  <li className={cn('inline-flex items-center gap-1.5', className)} {...props} />
);

export default BreadcrumbItem;
