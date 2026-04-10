// hooks.ts
// Context creation + useCommandBox hook + fuzzy search utility

import { createContext, useContext } from 'react';
import type { CommandBoxContextValue } from './types';

// ============================================================================
// Context
// ============================================================================

export const CommandBoxContext = createContext<CommandBoxContextValue | undefined>(undefined);

export const CommandBoxGroupContext = createContext<string | undefined>(undefined);

export const useCommandBox = (): CommandBoxContextValue => {
  const context = useContext(CommandBoxContext);
  if (!context) {
    throw new Error('CommandBox compound components must be used within CommandBox');
  }
  return context;
};

// ============================================================================
// Fuzzy Search Utility
// ============================================================================

/**
 * Fuzzy search scoring algorithm.
 * Returns a score (0-100) indicating match quality:
 * - 100: Exact match
 * - 80: Starts with query
 * - 60: Contains query as substring
 * - 20-40: Fuzzy character match (consecutive bonus)
 * - 0: No match
 */
export function fuzzyScore(itemValue: string, search: string): number {
  if (!search) return 1;
  const lowerValue = itemValue.toLowerCase();
  const lowerSearch = search.toLowerCase();

  if (lowerValue === lowerSearch) return 100;
  if (lowerValue.startsWith(lowerSearch)) return 80;
  if (lowerValue.includes(lowerSearch)) return 60;

  // Fuzzy character match — all characters must appear in order
  let searchIndex = 0;
  let consecutiveCount = 0;
  let maxConsecutive = 0;

  for (let i = 0; i < lowerValue.length && searchIndex < lowerSearch.length; i++) {
    if (lowerValue[i] === lowerSearch[searchIndex]) {
      searchIndex++;
      consecutiveCount++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveCount);
    } else {
      consecutiveCount = 0;
    }
  }

  if (searchIndex === lowerSearch.length) {
    return 20 + Math.min(maxConsecutive * 5, 20);
  }

  return 0;
}
