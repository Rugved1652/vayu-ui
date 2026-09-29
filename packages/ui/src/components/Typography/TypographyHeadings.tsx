// headings.tsx
// UI: H1-H6 heading components

import React from 'react';
import { cn } from '../../utils';
import { getVariantClasses } from './utils';
import type { H1Props, H2Props, H3Props, H4Props, H5Props, H6Props } from './types';

export const H1 = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font,
  unsized,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: H1Props) => (
  <h1
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      !unsized && 'text-h1 font-semibold tracking-tight',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font = 'primary',
  unsized,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: H2Props) => (
  <h2
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      !unsized && 'text-h2 font-semibold tracking-tight',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </h2>
);

export const H3 = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font,
  unsized,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: H3Props) => (
  <h3
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      !unsized && 'text-h3 font-semibold tracking-tight',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </h3>
);

export const H4 = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font,
  unsized,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: H4Props) => (
  <h4
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      !unsized && 'text-h4 font-semibold tracking-tight',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </h4>
);

export const H5 = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font,
  unsized,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: H5Props) => (
  <h5
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      !unsized && 'text-h5 font-semibold tracking-tight',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </h5>
);

export const H6 = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font,
  unsized,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: H6Props) => (
  <h6
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      !unsized && 'text-h6 font-semibold tracking-tight',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </h6>
);
