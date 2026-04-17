// TreeActions.tsx
// Expand All / Collapse All toolbar

'use client';

import { clsx } from 'clsx';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import type { TreeActionsProps } from './types';

const TreeActions: React.FC<TreeActionsProps> = ({
  onExpandAll,
  onCollapseAll,
  className,
}) => (
  <div
    className={clsx('flex items-center gap-2', className)}
    role="toolbar"
    aria-label="Tree actions"
  >
    <button
      onClick={onExpandAll}
      className={clsx(
        'px-3 py-1.5 text-xs font-secondary font-medium',
        'bg-muted hover:bg-muted/80',
        'text-surface-content rounded-control transition-colors',
        'flex items-center gap-1',
      )}
      aria-label="Expand all nodes"
    >
      <Plus className="w-3 h-3" aria-hidden="true" />
      Expand All
    </button>
    <button
      onClick={onCollapseAll}
      className={clsx(
        'px-3 py-1.5 text-xs font-secondary font-medium',
        'bg-muted hover:bg-muted/80',
        'text-surface-content rounded-control transition-colors',
        'flex items-center gap-1',
      )}
      aria-label="Collapse all nodes"
    >
      <Minus className="w-3 h-3" aria-hidden="true" />
      Collapse All
    </button>
  </div>
);

TreeActions.displayName = 'Tree.Actions';

export default TreeActions;
