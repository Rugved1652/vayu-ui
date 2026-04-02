// types.ts
// Types

import { createContext, HTMLAttributes, ReactNode } from 'react';

export type DraggableDirection = 'vertical' | 'horizontal' | 'grid';

export interface DraggableItem {
  id: string;
  [key: string]: unknown;
}

export interface DraggableListProps<T extends DraggableItem> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /** Items array — each must have a unique `id`. */
  items: T[];
  /** Called with the reordered array after a drop. */
  onReorder: (items: T[]) => void;
  /** Layout direction. */
  direction?: DraggableDirection;
  /** Grid columns (only used when `direction="grid"`). */
  columns?: number;
  /** Render each item. */
  children: (
    item: T,
    props: {
      dragHandleProps: DragHandleProps;
      isDragging: boolean;
      isOver: boolean;
    },
  ) => ReactNode;
}

export interface DragHandleProps {
  role: string;
  tabIndex: number;
  'aria-roledescription': string;
  'aria-describedby': string;
  'aria-pressed': boolean | undefined;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export interface Ctx {
  draggedId: string | null;
  overId: string | null;
}

export const DraggableContext = createContext<Ctx>({
  draggedId: null,
  overId: null,
});

// Helpers

export function reorder<T>(list: T[], from: number, to: number): T[] {
  const result = [...list];
  const [moved] = result.splice(from, 1);
  result.splice(to, 0, moved);
  return result;
}
