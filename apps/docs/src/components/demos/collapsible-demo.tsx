'use client';
import { useState } from 'react';
import { Collapsible, Typography } from 'vayu-ui';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`;

export default function CollapsibleDemo() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="w-full max-w-md space-y-8 not-prose">
      {/* Basic Usage */}
      <div>
        <Typography.H5 className="mb-3">Basic Collapsible (3 lines)</Typography.H5>
        <Collapsible>
          <Collapsible.Content lines={3}>{longText}</Collapsible.Content>
          <Collapsible.Trigger />
        </Collapsible>
      </div>

      {/* Different Line Counts */}
      <div>
        <Typography.H5 className="mb-3">2 Line Clamp</Typography.H5>
        <Collapsible>
          <Collapsible.Content lines={2}>{longText}</Collapsible.Content>
          <Collapsible.Trigger showText="Read more" hideText="Read less" />
        </Collapsible>
      </div>

      {/* Controlled State */}
      <div>
        <Typography.H5 className="mb-3">Controlled State</Typography.H5>
        <Collapsible open={controlledOpen} onOpenChange={setControlledOpen}>
          <Collapsible.Content lines={2}>
            This is a controlled collapsible. The open state is managed externally. You can use the
            trigger below or the button outside to toggle.
          </Collapsible.Content>
          <Collapsible.Trigger />
        </Collapsible>
        <button
          onClick={() => setControlledOpen(!controlledOpen)}
          className="mt-2 px-4 py-2 text-sm bg-muted text-muted-content rounded-control hover:bg-muted/80 transition-colors"
        >
          External Toggle ({controlledOpen ? 'Open' : 'Closed'})
        </button>
      </div>

      {/* Default Open */}
      <div>
        <Typography.H5 className="mb-3">Default Open</Typography.H5>
        <Collapsible defaultOpen>
          <Collapsible.Content lines={2}>
            This collapsible starts in the open state by default. Click &quot;Show less&quot; to
            collapse it.
          </Collapsible.Content>
          <Collapsible.Trigger />
        </Collapsible>
      </div>
    </div>
  );
}
