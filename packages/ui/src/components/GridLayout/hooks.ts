import { useContext } from "react";
import { GridLayoutContext, GridItemContext } from "./types";

export function useGridLayoutContext() {
  const ctx = useContext(GridLayoutContext);
  if (!ctx)
    throw new Error("GridLayout compound components must be used inside <GridLayout>");
  return ctx;
}

export function useGridItemContext() {
  const ctx = useContext(GridItemContext);
  if (!ctx)
    throw new Error("GridDragHandle and GridResizeHandle must be used inside <GridLayout.Item>");
  return ctx;
}
