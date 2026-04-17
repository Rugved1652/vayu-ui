// index.ts
// Public API

import { ContextMenuRoot } from './ContextMenu';
import { ContextMenuTrigger } from './ContextMenuTrigger';
import { ContextMenuContent } from './ContextMenuContent';
import { ContextMenuItem } from './ContextMenuItem';
import { ContextMenuCheckboxItem } from './ContextMenuCheckBoxItem';
import { ContextMenuRadioGroup, ContextMenuRadioItem } from './ContextMenuRadioGroup';
import { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from './ContextMenuSub';
import { ContextMenuSeparator } from './ContextMenuSeparator';
import { ContextMenuLabel } from './ContextMenuLabel';

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
