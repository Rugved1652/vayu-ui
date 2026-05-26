// search-input.tsx
// UI: presentational

'use client';

import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils';
import { useTextInput } from './TextInput';
import { Input } from './Input';
import type { SearchInputProps } from './types';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ ...props }, ref) => {
  const { size } = useTextInput();
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <>
      <Search className={cn('text-muted-content', iconSize)} />
      <Input ref={ref} type="search" {...props} />
    </>
  );
});

SearchInput.displayName = 'TextInput.SearchInput';

export { SearchInput };
