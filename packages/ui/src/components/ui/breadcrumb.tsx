import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "./utils";

// ============================================================================
// Breadcrumb Root
// ============================================================================

type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav">;

const Breadcrumb = ({ ...props }: BreadcrumbProps) => {
  return <nav aria-label="breadcrumb" {...props} />;
};

// ============================================================================
// Breadcrumb List
// ============================================================================

type BreadcrumbListProps = React.OlHTMLAttributes<HTMLOListElement>;

const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => (
  <ol
    className={cn(
      "flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-muted-content sm:gap-2.5",
      className
    )}
    {...props}
  />
);

// ============================================================================
// Breadcrumb Item
// ============================================================================

type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement>;

const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
);

// ============================================================================
// Breadcrumb Link
// ============================================================================

import type { LinkProps } from "next/link";

type BreadcrumbLinkProps = Omit<LinkProps, "className"> & {
  className?: string;
  children?: React.ReactNode;
};

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

// ============================================================================
// Breadcrumb Page
// ============================================================================

type BreadcrumbPageProps = React.HTMLAttributes<HTMLSpanElement>;

const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  <span
    aria-current="page"
    className={cn(
      // Matching padding of BreadcrumbLink for consistent layout and target size.
      "px-3 py-2 -mx-1 font-normal text-canvas-content",
      className
    )}
    {...props}
  />
);

// ============================================================================
// Breadcrumb Separator
// ============================================================================

type BreadcrumbSeparatorProps = React.LiHTMLAttributes<HTMLLIElement>;

const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

// ============================================================================
// Breadcrumb Ellipsis
// ============================================================================

type BreadcrumbEllipsisProps = React.HTMLAttributes<HTMLSpanElement>;

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

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};