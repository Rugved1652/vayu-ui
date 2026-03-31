// index.ts
// Public API

import Drawer from "./Drawer";
import { DrawerTrigger } from "./DrawerTrigger";
import { DrawerOverlay } from "./DrawerOverlay";
import { DrawerContent } from "./DrawerContent";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerFooter } from "./DrawerFooter";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerDescription } from "./DrawerDescription";
import { DrawerClose } from "./DrawerClose";
import { DrawerPortal } from "./DrawerPortal";

export type {
    DrawerSide,
    DrawerContextType,
    DrawerRootProps,
    DrawerTriggerProps,
    DrawerOverlayProps,
    DrawerContentProps,
    DrawerCloseProps,
} from "./types";

// Compound component pattern
Drawer.Trigger = DrawerTrigger;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
Drawer.Close = DrawerClose;
Drawer.Portal = DrawerPortal;

export { DrawerTrigger, DrawerOverlay, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose, DrawerPortal };
export { Drawer as default };
export { Drawer };
