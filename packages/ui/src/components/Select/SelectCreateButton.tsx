// create-button.tsx
// UI: Creatable option action

'use client';

import React from 'react';
import { Loader2, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { useSelect } from './Select';
import type { SelectCreateButtonProps } from './types';

export const SelectCreateButton: React.FC<SelectCreateButtonProps> = ({ children, className }) => {
  const {
    showCreateOption,
    handleCreateOption,
    isCreating,
    search,
    createText = 'Create option',
  } = useSelect();
  if (!showCreateOption) return null;
  return (
    <div
      role="option"
      aria-selected={false}
      tabIndex={0}
      onClick={handleCreateOption}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCreateOption();
        }
      }}
      className={clsx(
        'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
        'text-elevated-content bg-elevated hover:text-brand-content focus:text-brand-content hover:bg-brand/90 focus:bg-brand/90',
        isCreating && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      </span>
      <span className="block truncate">
        {children || (isCreating ? 'Creating...' : `${createText} "${search}"`)}
      </span>
    </div>
  );
};

SelectCreateButton.displayName = 'Select.CreateButton';
