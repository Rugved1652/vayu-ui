// show.tsx
// Composition: UI + logic

import { ReactNode } from 'react';
import type { ShowProps } from './types';

function Show<T>({ when, fallback = null, children }: ShowProps<T>): ReactNode {
  if (!when) return fallback;

  if (typeof children === 'function') {
    return (children as (value: T) => ReactNode)(when);
  }

  return children;
}

export { Show };
export default Show;
