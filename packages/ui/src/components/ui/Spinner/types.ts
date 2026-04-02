// types.ts
// Types

import { HTMLAttributes } from 'react';

// ============================================================================
// Types
// ============================================================================

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export type { SpinnerProps, SpinnerSize };
