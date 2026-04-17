// text-elements.tsx
// UI: P, Label, CTA text components

import React from 'react';
import { cn } from '../../utils';
import { getVariantClasses } from './utils';
import type { PProps, LabelProps, CTAProps } from './types';

export const P = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font = 'secondary',
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: PProps) => (
  <p
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      'text-para text-paragraph text-para-size leading-relaxed',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </p>
);

export const Label = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font,
  id,
  htmlFor,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: LabelProps) => (
  <label
    id={id}
    htmlFor={htmlFor}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      'text-base leading-relaxed',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </label>
);

export const CTA = ({
  children,
  className = '',
  variant = 'primary',
  ellipsis,
  font,
  id,
  ariaLabel,
  ariaDescribedby,
  ariaHidden,
  lang,
  role,
  ...props
}: CTAProps) => (
  <p
    id={id}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    role={role}
    className={cn(
      'text-cta',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </p>
);
