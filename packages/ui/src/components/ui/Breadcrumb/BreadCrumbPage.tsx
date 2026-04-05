// page.tsx
// UI: Current page indicator

import { cn } from '../utils';
import type { BreadcrumbPageProps } from './types';

const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  <span
    aria-current="page"
    className={cn(
      // Matching padding of BreadcrumbLink for consistent layout and target size.
      'px-3 py-2 -mx-1 font-normal text-canvas-content',
      className,
    )}
    {...props}
  />
);

export default BreadcrumbPage;
