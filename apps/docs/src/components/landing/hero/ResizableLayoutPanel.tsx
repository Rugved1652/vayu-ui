'use client';

import { PanelsTopLeft } from 'lucide-react';
import { Badge, ResizablePane } from 'vayu-ui';

export function ResizableLayoutPanel() {
  return (
    <div className="hero-collage-panel h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PanelsTopLeft className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Resizable Workspace</span>
        </div>
        <Badge variant="muted" size="sm">
          Layout
        </Badge>
      </div>

      <div className="overflow-hidden rounded-surface border border-border bg-canvas min-h-[160px]">
        <ResizablePane direction="horizontal">
          <ResizablePane.Panel defaultSize={34} minSize={20}>
            <div className="h-full bg-surface p-4">
              <p className="text-sm font-semibold text-surface-content">Sidebar</p>
              <p className="mt-1 text-xs text-muted-content">
                Tokens, navigation, and quick actions.
              </p>
            </div>
          </ResizablePane.Panel>
          <ResizablePane.Handle aria-label="Resize sidebar and workspace" />
          <ResizablePane.Panel defaultSize={66} minSize={35}>
            <ResizablePane direction="vertical">
              <ResizablePane.Panel defaultSize={56} minSize={24}>
                <div className="h-full border-b border-border bg-brand/10 p-4">
                  <p className="text-sm font-semibold text-surface-content">Preview</p>
                  <p className="mt-1 text-xs text-muted-content">
                    Drag the handles to reshape the composition.
                  </p>
                </div>
              </ResizablePane.Panel>
              <ResizablePane.Handle aria-label="Resize preview and notes" />
              <ResizablePane.Panel defaultSize={44} minSize={24}>
                <div className="h-full bg-surface p-4">
                  <p className="text-sm font-semibold text-surface-content">Notes</p>
                  <p className="mt-1 text-xs text-muted-content">
                    Keep the collage lively, but not noisy.
                  </p>
                </div>
              </ResizablePane.Panel>
            </ResizablePane>
          </ResizablePane.Panel>
        </ResizablePane>
      </div>
    </div>
  );
}
