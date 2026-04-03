// TreeSearch.tsx
// Search input for Tree

'use client';

import { clsx } from 'clsx';
import { Search, X } from 'lucide-react';
import React, { useCallback, useId } from 'react';
import type { TreeSearchProps } from './types';

const TreeSearch: React.FC<TreeSearchProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = 'Search tree…',
  className,
}) => {
  const searchId = useId();

  const handleClear = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <div className={clsx('relative', className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-content"
        aria-hidden="true"
      />
      <input
        id={searchId}
        type="text"
        role="searchbox"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full min-h-11 pl-10 pr-10 py-2 text-sm',
          'bg-surface border border-field rounded-control',
          'text-surface-content placeholder:text-muted-content',
          'focus:outline-none focus:ring-2 focus:ring-focus focus:border-focus',
          'transition-colors duration-200',
          'font-secondary',
        )}
        aria-label="Search tree"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-content hover:text-surface-content transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

TreeSearch.displayName = 'Tree.Search';

export default TreeSearch;
