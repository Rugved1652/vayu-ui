import DraggableRoot from "./Draggable";
import { DraggableContainer } from "./DraggableContainer";
import { DraggableItem } from "./DraggableItem";
import { DraggableHandle } from "./DraggableHandle";
import { DraggablePreview } from "./DraggablePreview";
import { DraggablePlaceholder } from "./DraggablePlaceholder";
import { DraggableDropIndicator } from "./DraggableDropIndicator";

import type {
  DraggableRootProps,
  DraggableContainerProps,
  DraggableItemProps,
  DraggableHandleProps,
  DraggablePreviewProps,
  DraggablePlaceholderProps,
  DraggableDropIndicatorProps,
  DraggableContextValue,
  ContainersMap,
} from "./types";

const Draggable = Object.assign(DraggableRoot, {
  Container: DraggableContainer,
  Item: DraggableItem,
  Handle: DraggableHandle,
  Preview: DraggablePreview,
  Placeholder: DraggablePlaceholder,
  DropIndicator: DraggableDropIndicator,
});

export { Draggable };
export default Draggable;

export type {
  DraggableRootProps,
  DraggableContainerProps,
  DraggableItemProps,
  DraggableHandleProps,
  DraggablePreviewProps,
  DraggablePlaceholderProps,
  DraggableDropIndicatorProps,
  DraggableContextValue,
  ContainersMap,
};
