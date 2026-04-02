// search-input.tsx
// UI: presentational

'use client';

import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from './Input';
import type { SearchInputProps } from './types';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ ...props }, ref) => {
  return (
    <>
      <Search className="w-5 h-5 text-muted-content" />
      <Input ref={ref} type="search" {...props} />
    </>
  );
});

SearchInput.displayName = 'TextInput.SearchInput';

export { SearchInput };
