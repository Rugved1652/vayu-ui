'use client';

import { ColorPicker } from 'vayu-ui';
import { useState } from 'react';

export default function ColorPickerDemo() {
  const [color, setColor] = useState('#3b82f6');
  const [rgbColor, setRgbColor] = useState('#22c55e');
  const [hslColor, setHslColor] = useState('#8b5cf6');
  const [swatchColor, setSwatchColor] = useState('#ef4444');

  return (
    <div className="not-prose flex flex-col gap-4 w-full max-w-md">
      {/* Basic ColorPicker with all features */}
      <ColorPicker value={color} onChange={setColor}>
        <ColorPicker.Label>Brand Color</ColorPicker.Label>
        <ColorPicker.Description>Choose a primary color for your brand.</ColorPicker.Description>
        <div className="flex items-center gap-2">
          <ColorPicker.Trigger />
          <ColorPicker.Input />
          <ColorPicker.CopyButton />
        </div>
        <ColorPicker.Content>
          <div className="flex flex-col gap-4">
            <ColorPicker.Palette />
            <ColorPicker.Eyedropper />
            <ColorPicker.Presets />
          </div>
        </ColorPicker.Content>
      </ColorPicker>

      {/* RGB Format */}
      <ColorPicker value={rgbColor} onChange={setRgbColor} format="rgb">
        <ColorPicker.Label>Background Color (RGB)</ColorPicker.Label>
        <div className="flex items-center gap-2">
          <ColorPicker.Trigger size="sm" />
          <ColorPicker.Input />
          <ColorPicker.CopyButton />
        </div>
        <ColorPicker.Content>
          <div className="flex flex-col gap-4">
            <ColorPicker.Palette label="Choose background" />
            <ColorPicker.Presets columns={6} />
          </div>
        </ColorPicker.Content>
      </ColorPicker>

      {/* HSL Format */}
      <ColorPicker value={hslColor} onChange={setHslColor} format="hsl">
        <ColorPicker.Label>Accent Color (HSL)</ColorPicker.Label>
        <div className="flex items-center gap-2">
          <ColorPicker.Trigger size="lg" />
          <ColorPicker.Input />
          <ColorPicker.CopyButton />
        </div>
        <ColorPicker.Content align="end">
          <div className="flex flex-col gap-4">
            <ColorPicker.Palette />
            <ColorPicker.Eyedropper label="Pick accent from screen" />
            <ColorPicker.Presets label="Theme Colors" />
          </div>
        </ColorPicker.Content>
      </ColorPicker>

      {/* Standalone Swatches */}
      <ColorPicker.Swatches
        label="Quick Pick"
        colors={[
          '#ef4444',
          '#f97316',
          '#eab308',
          '#22c55e',
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#171717',
        ]}
        value={swatchColor}
        onChange={setSwatchColor}
        size="lg"
        columns={4}
      />

      {/* Disabled State */}
      <ColorPicker defaultValue="#6366f1" disabled>
        <ColorPicker.Label>Locked Color</ColorPicker.Label>
        <div className="flex items-center gap-2">
          <ColorPicker.Trigger />
          <ColorPicker.Input />
        </div>
      </ColorPicker>

      {/* Error State */}
      <ColorPicker validationState="error">
        <ColorPicker.Label>Theme Color</ColorPicker.Label>
        <ColorPicker.Description>Select a color for your theme.</ColorPicker.Description>
        <div className="flex items-center gap-2">
          <ColorPicker.Trigger />
          <ColorPicker.Input />
        </div>
        <ColorPicker.Error>This color does not meet contrast requirements.</ColorPicker.Error>
      </ColorPicker>

      {/* Minimal ColorPicker (Trigger only) */}
      <ColorPicker defaultValue="#10b981">
        <ColorPicker.Label>Minimal Picker</ColorPicker.Label>
        <ColorPicker.Trigger />
        <ColorPicker.Content>
          <ColorPicker.Palette />
        </ColorPicker.Content>
      </ColorPicker>
    </div>
  );
}
