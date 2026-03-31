// Public API

import NavbarRoot from "./navbar";
import { NavbarContainer } from "./container";
import { NavbarBrand } from "./brand";
import { NavbarItems, NavbarItem } from "./items";
import { NavbarActions } from "./actions";
import { NavbarToggle } from "./toggle";
import { NavbarMobileMenu, NavbarMobileItem } from "./mobile-menu";
import { NavbarSeparator } from "./separator";

export type {
    NavbarProps,
    NavbarContainerProps,
    NavbarBrandProps,
    NavbarItemsProps,
    NavbarItemProps,
    NavbarActionsProps,
    NavbarToggleProps,
    NavbarMobileMenuProps,
    NavbarMobileItemProps,
    NavbarContextValue,
    InjectedLinkProps,
} from "./types";

// Compound component pattern
const Navbar = Object.assign(NavbarRoot, {
    Container: NavbarContainer,
    Brand: NavbarBrand,
    Items: NavbarItems,
    Item: NavbarItem,
    Actions: NavbarActions,
    Toggle: NavbarToggle,
    MobileMenu: NavbarMobileMenu,
    MobileItem: NavbarMobileItem,
    Separator: NavbarSeparator,
});

export { Navbar };
export { Navbar as default };
