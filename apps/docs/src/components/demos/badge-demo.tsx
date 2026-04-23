'use client';

import React, { useState } from 'react';
import { Badge, Button, Divider, Typography } from 'vayu-ui';

export default function BadgeDemoPage() {
  // State for Dismissible Demos
  const [tags, setTags] = useState(['React', 'Tailwind', 'Typescript', 'Next.js']);
  const [filters, setFilters] = useState([
    { id: 'f1', label: 'Active' },
    { id: 'f2', label: 'Verified' },
  ]);

  // Handlers
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const resetDemo = () => {
    setTags(['React', 'Tailwind', 'Typescript', 'Next.js']);
    setFilters([
      { id: 'f1', label: 'Active' },
      { id: 'f2', label: 'Verified' },
    ]);
  };

  return (
    <div className="w-full max-w-md not-prose">
      <div className="space-y-8">
        <Typography.H5>Badge Examples</Typography.H5>
        {/* Section 1: Variants */}
        <section className="space-y-2">
          <Typography.H5>
            Variants
          </Typography.H5>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="brand">Brand</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 2: Sizes */}
        <section className="space-y-2">
          <Typography.H5>
            Sizes
          </Typography.H5>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge size="sm" variant="brand">
              Small (24px)
            </Badge>
            <Badge size="md" variant="brand">
              Medium (28px)
            </Badge>
            <Badge size="lg" variant="brand">
              Large (32px)
            </Badge>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 3: Interactive (Clickable) */}
        <section className="space-y-2">
          <Typography.H5>
            Interactive
          </Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Click to trigger an alert.
          </Typography.P>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="info" onClick={() => alert('Badge clicked!')}>
              Click Me
            </Badge>

            <Badge variant="muted" onClick={() => alert('Action triggered!')}>
              Action
            </Badge>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 4: Dismissible (Stateful) */}
        <section className="space-y-2">
          <Typography.H5>
            Dismissible
          </Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Click the X to remove tags.
          </Typography.P>

          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="muted"
                  onDismiss={() => removeTag(tag)}
                  dismissLabel={`Remove ${tag}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-border rounded-lg text-center bg-surface">
              <Typography.P variant="secondary" className="text-sm">
                All tags removed.
              </Typography.P>
            </div>
          )}
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 5: Interactive & Dismissible (Complex) */}
        <section className="space-y-2">
          <Typography.H5>
            Interactive + Dismissible
          </Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Click text to trigger filter, click X to remove.
          </Typography.P>

          {filters.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant="brand"
                  onClick={() => alert(`Filter applied: ${filter.label}`)}
                  onDismiss={() => removeFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-border rounded-lg text-center bg-surface">
              <Typography.P variant="secondary" className="text-sm">
                No filters active.
              </Typography.P>
            </div>
          )}
        </section>

        {/* Reset Button */}
        <div className="pt-4">
          <Button variant="secondary" onClick={resetDemo}>
            <Button.Text>Reset Demos</Button.Text>
          </Button>
        </div>
      </div>
    </div>
  );
}
