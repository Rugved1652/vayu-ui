// apps/docs/src/components/demos/rate-demo.tsx

'use client';
import React, { useState } from 'react';
import { Rate, Typography, Divider } from 'vayu-ui';
import { HomeIcon, Star, StarHalf } from 'lucide-react';

const { H5, Label, P } = Typography;

export default function RateDemo() {
  const [value, setValue] = useState(3);

  return (
    <div className="w-full max-w-md not-prose space-y-8">
      <H5 font="primary">Rate Examples</H5>

      {/* Basic Usage */}
      <div className="space-y-3">
        <Label>Basic Usage</Label>
        <Rate value={value} onChange={setValue} />
        <P variant="secondary">Current value: {value}</P>
      </div>

      <Divider spacing="sm" />

      {/* Read Only */}
      <div className="space-y-3">
        <Label>Read Only</Label>
        <Rate defaultValue={3.5} readOnly />
      </div>

      <Divider spacing="sm" />

      {/* Disabled */}
      <div className="space-y-3">
        <Label>Disabled</Label>
        <Rate defaultValue={2} disabled />
      </div>

      <Divider spacing="sm" />

      {/* Sizes */}
      <div className="space-y-3">
        <Label>Sizes</Label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-content w-12 font-secondary">Small</span>
            <Rate defaultValue={3} size="sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-content w-12 font-secondary">Medium</span>
            <Rate defaultValue={3} size="md" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-content w-12 font-secondary">Large</span>
            <Rate defaultValue={3} size="lg" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-content w-12 font-secondary">XLarge</span>
            <Rate defaultValue={3} size="xl" />
          </div>
        </div>
      </div>

      <Divider spacing="sm" />

      {/* With Labels */}
      <div className="space-y-3">
        <Label>With Labels</Label>
        <Rate defaultValue={3} labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}>
          <Rate.Container>
            <Rate.Label>Product Rating</Rate.Label>
            <Rate.Stars />
            <Rate.TextLabel />
          </Rate.Container>
          <Rate.Description>Rate the product quality.</Rate.Description>
        </Rate>
      </div>

      <Divider spacing="sm" />

      {/* With Value Display */}
      <div className="space-y-3">
        <Label>With Value Display</Label>
        <Rate defaultValue={3.5}>
          <Rate.Container>
            <Rate.Stars />
            <Rate.Value />
          </Rate.Container>
        </Rate>
      </div>

      <Divider spacing="sm" />

      {/* Custom Icon */}
      <div className="space-y-3">
        <Label>Custom Icon</Label>
        <Rate defaultValue={3} icon={<HomeIcon />} />
      </div>

      <Divider spacing="sm" />

      {/* Custom Filled & Half Icons */}
      <div className="space-y-3">
        <Label>Custom Filled & Half Icons</Label>
        <Rate
          defaultValue={3.5}
          allowHalf
          icon={<Star className="text-muted-content" />}
          filledIcon={<Star className="fill-warning text-warning" strokeWidth={0} />}
          halfIcon={<StarHalf className="fill-warning text-warning" strokeWidth={0} />}
        />
        <P variant="secondary">Using custom icons for empty, filled, and half states</P>
      </div>

      <Divider spacing="sm" />

      {/* Error State */}
      <div className="space-y-3">
        <Label>Error State</Label>
        <Rate defaultValue={0} error>
          <Rate.Label>Rating Required</Rate.Label>
          <Rate.Stars />
          <Rate.ErrorText>Please select a rating</Rate.ErrorText>
        </Rate>
      </div>

      <Divider spacing="sm" />

      {/* Half Star Support */}
      <div className="space-y-3">
        <Label>Half Star Support</Label>
        <Rate defaultValue={3.5} allowHalf />
        <P variant="secondary">Hover on the left or right half of a star to select half values</P>
      </div>

      <Divider spacing="sm" />

      {/* Full Star Only */}
      <div className="space-y-3">
        <Label>Full Star Only</Label>
        <Rate defaultValue={3} allowHalf={false} />
      </div>
    </div>
  );
}
