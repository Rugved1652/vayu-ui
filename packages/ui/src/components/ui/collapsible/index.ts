// index.ts
// Public API

import Collapsible from "./Collapsible";
import { CollapsibleContent } from "./CollapsibleContent";
import { CollapsibleTrigger } from "./CollapsibleTrigger";

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
