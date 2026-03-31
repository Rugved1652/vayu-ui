// index.ts
// Public API

import { MenubarRoot } from "./Menubar";
import { Menu } from "./Menu";
import { SubMenu } from "./MenubarSubMenu";
import { MenuItem } from "./MenubarItem";
import { MenuSeparator } from "./MenubarSeparator";
import { MenuLabel } from "./MenubarLabel";
import { MenuCheckboxItem } from "./MenubarCheckBoxItem";
import { MenuRadioGroup, MenuRadioItem } from "./MenubarRadioGroup";

export type {
    Orientation,
    MenubarProps,
    MenuProps,
    MenuItemProps,
    MenuSeparatorProps,
    MenuLabelProps,
    MenuCheckboxItemProps,
    MenuRadioGroupProps,
    MenuRadioItemProps,
} from "./types";

// Compound component pattern
const Menubar = Object.assign(MenubarRoot, {
    Menu,
    SubMenu,
    Item: MenuItem,
    Separator: MenuSeparator,
    Label: MenuLabel,
    CheckboxItem: MenuCheckboxItem,
    RadioGroup: MenuRadioGroup,
    RadioItem: MenuRadioItem,
});

export { Menubar as default };
export { Menubar };
