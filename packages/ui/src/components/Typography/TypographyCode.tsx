// code.tsx
// UI: Code component

import React from 'react';
import { cn } from '../../utils';
import { getVariantClasses } from './utils';
import type { CodeProps } from './types';

export const Code = ({
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
  codeLang,
  role,
  ...props
}: CodeProps) => (
  <code
    id={id}
    aria-label={ariaLabel || (codeLang ? `${codeLang} code` : undefined)}
    aria-describedby={ariaDescribedby}
    aria-hidden={ariaHidden}
    lang={lang}
    data-code-lang={codeLang}
    role={role || 'code'}
    className={cn(
      'relative rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      getVariantClasses(variant),
      ellipsis && 'truncate',
      font && `font-${font}`,
      className,
    )}
    {...props}
  >
    {children}
  </code>
);
