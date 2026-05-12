'use client';

import { useState } from 'react';
import { Layers } from 'lucide-react';
import { Badge, Checkbox, Collapsible, Divider, Tabs } from 'vayu-ui';

export function TabsPanel() {
  const [accessible, setAccessible] = useState(true);

  return (
    <div className="hero-collage-panel hero-collage-panel-soft h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Tabs</span>
        </div>
        <Badge variant="muted" size="sm">
          Content
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <Tabs defaultValue="code">
          <Tabs.List>
            <Tabs.Trigger value="code">Code</Tabs.Trigger>
            <Tabs.Trigger value="design">Design</Tabs.Trigger>
            <Tabs.Trigger value="docs">Docs</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="code">
            <div className="rounded-surface border border-border bg-canvas p-3">
              <p className="font-tertiary text-xs text-muted-content">
                npx vayu-ui-cli add button
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="design">
            <div className="rounded-surface border border-border bg-canvas p-3">
              <p className="text-xs text-muted-content">
                All components follow compound patterns with design tokens for consistent theming.
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="docs">
            <div className="rounded-surface border border-border bg-canvas p-3">
              <p className="text-xs text-muted-content">
                Built-in WCAG 2.2 AA support with keyboard navigation and screen reader compatibility.
              </p>
            </div>
          </Tabs.Content>
        </Tabs>

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>Details</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

        <Collapsible>
          <Collapsible.Content lines={2}>
            <p className="text-xs text-muted-content">
              Vayu UI is an AI-optimized React component library with 50+ components, 35+ hooks, and
              full Tailwind v4 token support. Each component follows the compound component pattern
              for maximum flexibility and composability.
            </p>
          </Collapsible.Content>
          <Collapsible.Trigger showText="Read more" hideText="Show less" />
        </Collapsible>

        <Checkbox checked={accessible} onChange={setAccessible}>
          <div className="flex items-center gap-3">
            <Checkbox.Indicator />
            <div className="flex flex-col">
              <Checkbox.Label>Keep accessibility-first defaults enabled</Checkbox.Label>
              <Checkbox.Description>
                Preserve keyboard support and clean contrast.
              </Checkbox.Description>
            </div>
          </div>
        </Checkbox>
      </div>
    </div>
  );
}
