import GridLayoutRoot from "./GridLayout";
import { GridLayoutContainer } from "./GridLayoutContainer";
import { GridItem } from "./GridItem";
import { GridDragHandle } from "./GridDragHandle";
import { GridResizeHandle } from "./GridResizeHandle";
import { GridPlaceholder } from "./GridPlaceholder";

import type {
  GridLayoutRootProps,
  GridContainerProps,
  GridItemProps,
  GridDragHandleProps,
  GridResizeHandleProps,
  GridPlaceholderProps,
  GridLayoutItem,
  GridLayoutContextValue,
  ResizeDirection,
  Breakpoints,
  ResponsiveBreakpoint,
} from "./types";

const GridLayout = Object.assign(GridLayoutRoot, {
  Container: GridLayoutContainer,
  Item: GridItem,
  DragHandle: GridDragHandle,
  ResizeHandle: GridResizeHandle,
  Placeholder: GridPlaceholder,
});

export { GridLayout };
export default GridLayout;

export type {
  GridLayoutRootProps,
  GridContainerProps,
  GridItemProps,
  GridDragHandleProps,
  GridResizeHandleProps,
  GridPlaceholderProps,
  GridLayoutItem,
  GridLayoutContextValue,
  ResizeDirection,
  Breakpoints,
  ResponsiveBreakpoint,
};
