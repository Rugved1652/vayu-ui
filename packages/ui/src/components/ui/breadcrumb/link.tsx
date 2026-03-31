// link.tsx
// UI: Clickable navigation link

import Link from "next/link";
import { cn } from "../utils";
import type { BreadcrumbLinkProps } from "./types";

const BreadcrumbLink = ({ className, ...props }: BreadcrumbLinkProps) => {
  return (
    <Link
      className={cn(
        // WCAG 2.2 AA: Minimum target size is 24x24px.
        // py-2 (8px top/bottom) + text height (~16px) ensures vertical size >= 24px.
        // px-3 provides horizontal spacing.
        // -mx-1 prevents the increased padding from shifting the visual layout alignment.
        "rounded px-3 py-2 -mx-1 text-muted-content transition-colors duration-(--transition-fast) ease-in-out hover:text-canvas-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className
      )}
      {...props}
    />
  );
};

export default BreadcrumbLink;
