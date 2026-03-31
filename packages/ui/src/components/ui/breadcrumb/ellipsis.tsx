// ellipsis.tsx
// UI: Overflow indicator

import { MoreHorizontal } from "lucide-react";
import { cn } from "../utils";
import type { BreadcrumbEllipsisProps } from "./types";

const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);

export default BreadcrumbEllipsis;
