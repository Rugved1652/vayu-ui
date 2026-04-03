// TreeContainer.tsx
// Bordered container with empty state

'use client';

import { clsx } from 'clsx';
import { Filter } from 'lucide-react';
import React from 'react';
import type { TreeContainerProps } from './types';

const TreeContainer: React.FC<TreeContainerProps> = ({
  children,
  empty,
  className,
}) => (
  <div
    className={clsx(
      'bg-surface border border-border rounded-surface overflow-hidden',
      className,
    )}
  >
    {children ||
      empty || (
        <div className="p-8 text-center" role="status">
          <Filter
            className="w-8 h-8 text-muted-content mx-auto mb-2"
            aria-hidden="true"
          />
          <p className="text-muted-content font-secondary text-sm">No data</p>
        </div>
      )}
  </div>
);

TreeContainer.displayName = 'Tree.Container';

export default TreeContainer;
