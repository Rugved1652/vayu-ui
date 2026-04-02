'use client';

import { Spinner, Typography, Divider, Button, Status } from 'vayu-ui';
import { useState } from 'react';

export default function SpinnerDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-md not-prose space-y-8">
      {/* Section: Sizes */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary" className="text-xs uppercase tracking-wide">
          Sizes
        </Typography.H6>
        <div className="flex items-center gap-6 p-4 bg-muted rounded-surface">
          <Spinner size="sm" aria-label="Loading (small)" />
          <Spinner size="md" aria-label="Loading (medium)" />
          <Spinner size="lg" aria-label="Loading (large)" />
        </div>
      </div>

      <Divider spacing="sm" decorative />

      {/* Section: With Loading Text */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary" className="text-xs uppercase tracking-wide">
          With Loading Text
        </Typography.H6>
        <div
          className="flex items-center gap-3 p-4 bg-muted rounded-surface"
          role="status"
          aria-live="polite"
        >
          <Spinner size="sm" aria-label="Fetching user data" />
          <Typography.P variant="secondary" className="text-sm">
            Fetching user data...
          </Typography.P>
        </div>
      </div>

      <Divider spacing="sm" decorative />

      {/* Section: Button Integration */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary" className="text-xs uppercase tracking-wide">
          Button Integration
        </Typography.H6>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="medium"
            loading={isLoading ? Status.PENDING : Status.IDLE}
            onClick={handleLoadingDemo}
            loadingText="Processing..."
          >
            Submit Form
          </Button>
        </div>
      </div>

      <Divider spacing="sm" decorative />

      {/* Section: Custom Colors */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary" className="text-xs uppercase tracking-wide">
          Custom Colors
        </Typography.H6>
        <div className="flex items-center gap-6 p-4 bg-muted rounded-surface">
          <Spinner
            size="md"
            className="border-info border-t-transparent"
            aria-label="Loading info"
          />
          <Spinner
            size="md"
            className="border-success border-t-transparent"
            aria-label="Loading success"
          />
          <Spinner
            size="md"
            className="border-warning border-t-transparent"
            aria-label="Loading warning"
          />
          <Spinner
            size="md"
            className="border-destructive border-t-transparent"
            aria-label="Loading error"
          />
        </div>
      </div>

      <Divider spacing="sm" decorative />

      {/* Section: Accessibility Example */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary" className="text-xs uppercase tracking-wide">
          Accessibility (Screen Reader)
        </Typography.H6>
        <div className="flex items-center gap-3 p-4 bg-muted rounded-surface">
          <Spinner size="md" aria-label="Loading your dashboard preferences" />
          <Typography.P variant="secondary" className="text-sm">
            Screen readers announce "Loading your dashboard preferences"
          </Typography.P>
        </div>
      </div>
    </div>
  );
}
