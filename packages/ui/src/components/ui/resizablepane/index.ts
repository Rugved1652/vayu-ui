// index.ts
// Public API

import ResizablePaneRoot, { useResizablePane } from "./ResizablePane";
import ResizablePanePanel from "./ResizablePanel";
import ResizablePaneHandle from "./ResizablePaneHandle";

export type { Direction, HandleProps, PanelProps, ResizablePaneProps } from "./types";

// Compound component pattern
const ResizablePane = Object.assign(ResizablePaneRoot, {
    Panel: ResizablePanePanel,
    Handle: ResizablePaneHandle,
});

export { ResizablePane as default };
export { ResizablePane, useResizablePane };
