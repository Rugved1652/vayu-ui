// index.ts
// Public API

import { MenubarRoot } from "./menubar";
import { Menu } from "./menu";
import { SubMenu } from "./submenu";
import { MenuItem } from "./item";
import { MenuSeparator } from "./separator";
import { MenuLabel } from "./label";
import { MenuCheckboxItem } from "./checkbox-item";
import { MenuRadioGroup, MenuRadioItem } from "./radio-group";

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
