// index.ts
// Public API

import Dock from "./FloatingDock";
import DockContainer from "./FloatingDockContainer";
import DockItem from "./FloatingDockItem";
import DockLogo from "./FloatingDockLogo";
import { Divider } from "../Divider";

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
