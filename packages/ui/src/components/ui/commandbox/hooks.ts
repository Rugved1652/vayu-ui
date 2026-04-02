// hooks.ts
// Logic: filtering and grouping

import { useMemo } from 'react';
import type { CommandGroup, CommandItem } from './types';

interface FilteredItemsResult {
  groupedItems: Record<string, CommandItem[]>;
  flatItems: CommandItem[];
}

export function useFilteredItems(
  items: CommandItem[],
  groups: CommandGroup[],
  search: string,
  filter: (value: string, search: string) => number,
): FilteredItemsResult {
  const allItems = useMemo(
    () => [
      ...items,
      ...groups.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          group: group.title,
        })),
      ),
    ],
    [items, groups],
  );

  const filteredItems = useMemo(
    () =>
      allItems.filter((item) => {
        if (search === '') return true;
        return filter(item.title + ' ' + (item.description || ''), search) > 0;
      }),
    [allItems, search, filter],
  );

  const groupedItems = useMemo(() => {
    return filteredItems.reduce(
      (acc, item) => {
        const groupName = item.group || 'Commands';
        if (!acc[groupName]) acc[groupName] = [];
        acc[groupName].push(item);
        return acc;
      },
      {} as Record<string, CommandItem[]>,
    );
  }, [filteredItems]);

  const flatItems = useMemo(() => Object.values(groupedItems).flat(), [groupedItems]);

  return { groupedItems, flatItems };
}
