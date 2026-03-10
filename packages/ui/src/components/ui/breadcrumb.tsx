import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

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
    className={clsx(
      "flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-ground-600 sm:gap-2.5 dark:text-ground-400",
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
    className={clsx("inline-flex items-center gap-1.5", className)}
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
      className={clsx(
        // WCAG 2.2 AA: Minimum target size is 24x24px.
        // py-2 (8px top/bottom) + text height (~16px) ensures vertical size >= 24px.
        // px-3 provides horizontal spacing.
        // -mx-1 prevents the increased padding from shifting the visual layout alignment.
        "rounded px-3 py-2 -mx-1 text-ground-600 transition-colors duration-(--transition-fast) ease-in-out hover:text-ground-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ground-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-ground-400 dark:focus-visible:ring-ground-600 dark:focus-visible:ring-offset-ground-950 dark:hover:text-ground-100",
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
    className={clsx(
      // Matching padding of BreadcrumbLink for consistent layout and target size.
      "px-3 py-2 -mx-1 font-normal text-ground-950 dark:text-ground-100",
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
    className={clsx("[&>svg]:size-3.5", className)}
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
    className={clsx("flex h-9 w-9 items-center justify-center", className)}
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