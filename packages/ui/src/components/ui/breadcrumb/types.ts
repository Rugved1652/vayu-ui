// types.ts
// Types

import type { LinkProps } from 'next/link';

export type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'>;

export type BreadcrumbListProps = React.OlHTMLAttributes<HTMLOListElement>;

export type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export type BreadcrumbLinkProps = Omit<LinkProps, 'className'> & {
  className?: string;
  children?: React.ReactNode;
};

export type BreadcrumbPageProps = React.HTMLAttributes<HTMLSpanElement>;

export type BreadcrumbSeparatorProps = React.LiHTMLAttributes<HTMLLIElement>;

export type BreadcrumbEllipsisProps = React.HTMLAttributes<HTMLSpanElement>;
