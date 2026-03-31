// index.ts
// Public API

import Collapsible from "./collapsible";
import { CollapsibleContent } from "./content";
import { CollapsibleTrigger } from "./trigger";

export type {
    CollapsibleRootProps,
    CollapsibleContentProps,
    CollapsibleTriggerProps,
    CollapsibleContextType,
} from "./types";

Collapsible.Content = CollapsibleContent;
Collapsible.Trigger = CollapsibleTrigger;

export { Collapsible };
export default Collapsible;
