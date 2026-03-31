// index.ts
// Public API

import Dock from "./floatingdock";
import DockContainer from "./container";
import DockItem from "./item";
import DockLogo from "./logo";
import { Divider } from "../divider";

export type {
    DockBaseProps,
    DockItemProps,
    DockLogoProps,
    InjectedDockProps,
} from "./types";

// Compound component pattern
const FloatingDock = Object.assign(Dock, {
    Container: DockContainer,
    Item: DockItem,
    Logo: DockLogo,
    Divider: Divider,
});

export { FloatingDock as default };
export { FloatingDock };
