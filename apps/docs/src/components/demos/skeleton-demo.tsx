'use client';

import { useState } from 'react';
import { Skeleton, Typography, Divider, Button } from 'vayu-ui';

export default function SkeletonDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] = useState<'pulse' | 'wave' | 'none'>('pulse');

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl not-prose space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Typography.H3 id="skeleton-demo-label" variant="primary">
            Skeleton Components
          </Typography.H3>
          <Typography.P variant="secondary" className="mt-1">
            Loading placeholders with multiple animation styles
          </Typography.P>
        </div>
        <Button
          variant="outline"
          size="medium"
          onClick={handleRefresh}
          aria-label="Refresh demo to show loading states"
        >
          <Button.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </Button.Icon>
          <Button.Text>Refresh</Button.Text>
        </Button>
      </div>

      <Divider spacing="lg" />

      {/* Animation Selector */}
      <div className="flex items-center gap-3">
        <Typography.Label variant="secondary">Animation:</Typography.Label>
        <div className="flex gap-2" role="group" aria-label="Animation type selector">
          {(['pulse', 'wave', 'none'] as const).map((type) => (
            <Button
              key={type}
              variant={animationType === type ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setAnimationType(type)}
              aria-pressed={animationType === type}
            >
              <Button.Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Button.Text>
            </Button>
          ))}
        </div>
      </div>

      <Divider spacing="md" />

      {/* Text Skeleton */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          Text Loading
        </Typography.H5>
        <Skeleton.Text lines={3} animation={animationType} />
      </section>

      <Divider spacing="md" />

      {/* Avatar Skeleton */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          Avatar Loading
        </Typography.H5>
        <div className="flex items-center gap-6">
          <Skeleton.Avatar size="sm" animation={animationType} />
          <Skeleton.Avatar size="md" animation={animationType} />
          <Skeleton.Avatar size="lg" animation={animationType} />
          <Skeleton.Avatar size="xl" animation={animationType} />
        </div>
      </section>

      <Divider spacing="md" />

      {/* Card Skeleton */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          Card Loading
        </Typography.H5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton.Card animation={animationType} />
          <Skeleton.Card showImage={false} animation={animationType} />
        </div>
      </section>

      <Divider spacing="md" />

      {/* List Skeleton */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          List Loading
        </Typography.H5>
        <Skeleton.List items={3} animation={animationType} />
      </section>

      <Divider spacing="md" />

      {/* Table Skeleton */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          Table Loading
        </Typography.H5>
        <Skeleton.Table rows={4} columns={3} animation={animationType} />
      </section>

      <Divider spacing="md" />

      {/* Animation Variants */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          Animation Comparison
        </Typography.H5>
        <div className="space-y-4">
          <div>
            <Typography.Label variant="secondary" className="mb-2 block">
              Pulse (default)
            </Typography.Label>
            <Skeleton.Item variant="rectangular" height={48} animation="pulse" />
          </div>
          <div>
            <Typography.Label variant="secondary" className="mb-2 block">
              Wave
            </Typography.Label>
            <Skeleton.Item variant="rectangular" height={48} animation="wave" />
          </div>
          <div>
            <Typography.Label variant="secondary" className="mb-2 block">
              None
            </Typography.Label>
            <Skeleton.Item variant="rectangular" height={48} animation="none" />
          </div>
        </div>
      </section>

      <Divider spacing="md" />

      {/* With Root Wrapper */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          With Root Wrapper (Accessible)
        </Typography.H5>
        <Skeleton.Root animation={animationType} aria-label="Loading content">
          <Skeleton.Text lines={2} animation={animationType} />
        </Skeleton.Root>
      </section>

      <Divider spacing="md" />

      {/* Grid Skeleton */}
      <section>
        <Typography.H5 variant="primary" className="mb-3">
          Grid Loading
        </Typography.H5>
        <Skeleton.Grid items={4} columns={2} animation={animationType} />
      </section>
    </div>
  );
}
