// list.tsx
// UI: Ordered list container

import { cn } from "../utils";
import type { BreadcrumbListProps } from "./types";

const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => (
  <ol
    className={cn(
      "flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-muted-content sm:gap-2.5",
      className
    )}
    {...props}
  />
);

export default BreadcrumbList;
