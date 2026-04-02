// FooterRoot.tsx
// UI: presentational

import React from 'react';
import { cn } from '../utils';
import type { FooterVariant, FooterRootProps } from './types';

function FooterRoot({ children, variant = 'default', className = '', ...props }: FooterRootProps) {
  return (
    <footer
      data-variant={variant}
      className={cn(
        'group/footer',
        'bg-canvas text-canvas-content',
        'font-secondary',
        'transition-colors duration-300',
        className,
      )}
      role="contentinfo"
      {...props}
    >
      {children}
    </footer>
  );
}
FooterRoot.displayName = 'Footer';

export { FooterRoot };
