'use client';

import { Package } from 'lucide-react';
import { Badge, Divider, Skeleton, Spinner } from 'vayu-ui';

export function SkeletonPanel() {
  return (
    <div className="hero-collage-panel h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Loading</span>
        </div>
        <Badge variant="info" size="sm">
          Skeleton
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Spinner size="md" aria-label="Loading" />
          <span className="text-sm text-muted-content">Loading data...</span>
        </div>

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>Preview</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

        <div className="space-y-4">
          <Skeleton.Avatar size="md" animation="pulse" />

          <div className="space-y-2">
            <Skeleton.Text lines={1} animation="pulse" />
            <Skeleton.Text lines={2} animation="pulse" />
          </div>

          <Skeleton.List items={2} animation="pulse" />
        </div>
      </div>
    </div>
  );
}
