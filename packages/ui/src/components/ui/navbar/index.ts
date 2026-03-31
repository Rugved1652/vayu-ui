// Public API

import NavbarRoot from "./NavBar";
import { NavbarContainer } from "./NavbarContainer";
import { NavbarBrand } from "./NavBarBrand";
import { NavbarItems, NavbarItem } from "./NavbarMenuItems";
import { NavbarActions } from "./NavBarActions";
import { NavbarToggle } from "./NavBarToggle";
import { NavbarMobileMenu, NavbarMobileItem } from "./NavBarMobileMenu";
import { NavbarSeparator } from "./NavBarSeparator";

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
