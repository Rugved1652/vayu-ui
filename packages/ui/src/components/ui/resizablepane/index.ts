// index.ts
// Public API

import ResizablePaneRoot, { useResizablePane } from "./resizablepane";
import ResizablePanePanel from "./panel";
import ResizablePaneHandle from "./handle";

export type { Direction, HandleProps, PanelProps, ResizablePaneProps } from "./types";

// Compound component pattern
const ResizablePane = Object.assign(ResizablePaneRoot, {
    Panel: ResizablePanePanel,
    Handle: ResizablePaneHandle,
});

export { ResizablePane as default };
export { ResizablePane, useResizablePane };
