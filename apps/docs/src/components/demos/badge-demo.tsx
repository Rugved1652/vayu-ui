"use client";

import React, { useState } from "react";
import { Badge, Button, Divider, Typography } from "vayu-ui";

export default function BadgeDemoPage() {
  // State for Dismissible Demos
  const [tags, setTags] = useState(["React", "Tailwind", "Typescript", "Next.js"]);
  const [filters, setFilters] = useState([
    { id: "f1", label: "Active" },
    { id: "f2", label: "Verified" },
  ]);

  // Handlers
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const resetDemo = () => {
    setTags(["React", "Tailwind", "Typescript", "Next.js"]);
    setFilters([
      { id: "f1", label: "Active" },
      { id: "f2", label: "Verified" },
    ]);
  };

  return (
    <div className="min-h-screen bg-canvas p-8 md:p-16 font-secondary">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <div className="space-y-4">
          <Typography.H1 variant="primary">
            Badge Component
          </Typography.H1>
          <Typography.P variant="secondary" className="max-w-2xl">
            A flexible, accessible Badge component. Supports variants, interactive modes (onClick),
            and dismissible states. Compliant with WCAG 2.2 target sizes.
          </Typography.P>
        </div>

        <Divider spacing="lg">
          <Divider.Line color="ground" />
        </Divider>

        {/* Section 1: Variants */}
        <section className="space-y-4">
          <Typography.H3 variant="primary" className="border-b border-border pb-2">
            Variants
          </Typography.H3>
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
          <Divider.Line color="ground" />
        </Divider>

        {/* Section 2: Sizes */}
        <section className="space-y-4">
          <Typography.H3 variant="primary" className="border-b border-border pb-2">
            Sizes
          </Typography.H3>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge size="sm" variant="brand">Small (24px)</Badge>
            <Badge size="md" variant="brand">Medium (28px)</Badge>
            <Badge size="lg" variant="brand">Large (32px)</Badge>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="ground" />
        </Divider>

        {/* Section 3: Interactive (Clickable) */}
        <section className="space-y-4">
          <Typography.H3 variant="primary" className="border-b border-border pb-2">
            Interactive
          </Typography.H3>
          <Typography.P variant="secondary" className="text-sm">
            Click to trigger an alert.
          </Typography.P>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge
              variant="info"
              onClick={() => alert("Badge clicked!")}
            >
              Click Me
            </Badge>

            <Badge
              variant="muted"
              onClick={() => alert("Action triggered!")}
            >
              Action
            </Badge>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="ground" />
        </Divider>

        {/* Section 4: Dismissible (Stateful) */}
        <section className="space-y-4">
          <Typography.H3 variant="primary" className="border-b border-border pb-2">
            Dismissible
          </Typography.H3>
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
          <Divider.Line color="ground" />
        </Divider>

        {/* Section 5: Interactive & Dismissible (Complex) */}
        <section className="space-y-4">
          <Typography.H3 variant="primary" className="border-b border-border pb-2">
            Interactive + Dismissible
          </Typography.H3>
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
        <div className="pt-8">
          <Button variant="secondary" onClick={resetDemo}>
            <Button.Text>Reset Demos</Button.Text>
          </Button>
        </div>

      </div>
    </div>
  );
}
