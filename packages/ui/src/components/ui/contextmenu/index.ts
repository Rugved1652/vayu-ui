// index.ts
// Public API

import { ContextMenuRoot } from './contextmenu';
import { ContextMenuTrigger } from './trigger';
import { ContextMenuContent } from './content';
import { ContextMenuItem } from './item';
import { ContextMenuCheckboxItem } from './checkbox-item';
import { ContextMenuRadioGroup, ContextMenuRadioItem } from './radio-group';
import { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from './sub';
import { ContextMenuSeparator } from './separator';
import { ContextMenuLabel } from './label';

export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
  ContextMenuSeparatorProps,
  ContextMenuLabelProps,
} from './types';

const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Separator: ContextMenuSeparator,
  Label: ContextMenuLabel,
});

export { ContextMenu as default };
export { ContextMenu };
