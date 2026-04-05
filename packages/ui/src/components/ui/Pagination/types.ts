// types.ts
// Types

import React from 'react';

export type PageRange = 'compact' | 'extended' | 'full';

export interface BaseProps {
  className?: string;
}

export interface PaginationRootProps extends BaseProps, React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  'aria-label'?: string;
}

export interface PaginationInfoProps extends React.HTMLAttributes<HTMLParagraphElement> {
  totalItems: number;
  pageSize: number;
  currentPage: number;
}

export interface PaginationButtonsProps
  extends BaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  currentPage: number;
  totalPages: number;
  hrefBuilder: (page: number) => string;
  pageRange?: PageRange;
  siblingCount?: number;
}

export interface CompactPaginationProps extends BaseProps, React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  hrefBuilder: (page: number) => string;
  'aria-label'?: string;
}
