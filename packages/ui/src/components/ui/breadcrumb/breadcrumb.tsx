// breadcrumb.tsx
// Composition: Root nav

import type { BreadcrumbProps } from './types';

const Breadcrumb = ({ ...props }: BreadcrumbProps) => {
  return <nav aria-label="breadcrumb" {...props} />;
};

export default Breadcrumb;
