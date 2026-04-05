// index.ts
// Public API — compound component export

import CommandBoxRoot from './CommandBox';
import { CommandBoxEmpty } from './CommandBoxEmpty';
import { CommandBoxGroup } from './CommandBoxGroup';
import { CommandBoxInput } from './CommandBoxInput';
import { CommandBoxItem } from './CommandBoxItem';
import { CommandBoxList } from './CommandBoxList';
import { CommandBoxOverlay } from './CommandBoxOverlay';
import { CommandBoxSeparator } from './CommandBoxSeparator';

const CommandBox = Object.assign(CommandBoxRoot, {
  Input: CommandBoxInput,
  List: CommandBoxList,
  Item: CommandBoxItem,
  Group: CommandBoxGroup,
  Empty: CommandBoxEmpty,
  Separator: CommandBoxSeparator,
  Overlay: CommandBoxOverlay,
});

export { CommandBox as default };
export { CommandBox };

export type {
  CommandBoxRootProps,
  CommandBoxItemData,
  CommandBoxInputProps,
  CommandBoxListProps,
  CommandBoxItemProps,
  CommandBoxGroupProps,
  CommandBoxEmptyProps,
  CommandBoxSeparatorProps,
  CommandBoxOverlayProps,
} from './types';
