// index.ts
// Public API

import Drawer from "./drawer";
import { DrawerTrigger } from "./trigger";
import { DrawerOverlay } from "./overlay";
import { DrawerContent } from "./content";
import { DrawerHeader } from "./header";
import { DrawerFooter } from "./footer";
import { DrawerTitle } from "./title";
import { DrawerDescription } from "./description";
import { DrawerClose } from "./close";
import { DrawerPortal } from "./portal";

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
