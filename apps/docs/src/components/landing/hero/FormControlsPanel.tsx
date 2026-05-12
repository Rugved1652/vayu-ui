'use client';

import { useState } from 'react';
import { ArrowRight, Check, SlidersHorizontal, AlertCircle, Info, TriangleAlert } from 'lucide-react';
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Divider,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextInput,
  type SelectValue,
} from 'vayu-ui';

export function FormControlsPanel() {
  const [brief, setBrief] = useState('Build a landing hero collage with real Vayu components.');
  const [tone, setTone] = useState<SelectValue>('neutral');
  const [layout, setLayout] = useState('grid');
  const [accessible, setAccessible] = useState(true);
  const [density, setDensity] = useState([24, 76]);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="hero-collage-panel hero-collage-panel-main xl:row-span-2 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-control bg-brand text-brand-content">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <div>
              <p className="font-primary text-base font-semibold text-surface-content">
                Form Controls
              </p>
              <p className="font-secondary text-xs text-muted-content">
                Input, Select, Checkbox, Radio, Slider, Switch & more
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand" size="sm">
              Live Components
            </Badge>
            <Badge variant="muted" size="sm">
              Interactive
            </Badge>
          </div>
        </div>
        <span className="rounded-full border border-border px-3 py-1 font-tertiary text-[11px] text-muted-content">
          controls
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <TextInput value={brief} onChange={setBrief}>
          <TextInput.Label>Project brief</TextInput.Label>
          <TextInput.Field>
            <TextInput.Input />
          </TextInput.Field>
          <TextInput.Description>
            Keep it calm, useful, and visibly component-driven.
          </TextInput.Description>
        </TextInput>

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>Selections</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

        <div className="grid gap-4 lg:grid-cols-2">
          <Select.Root value={tone} onValueChange={setTone} label="Visual Tone">
            <Select.Trigger placeholder="Choose a tone..." />
            <Select.Content>
              <Select.List>
                <Select.Item value="neutral">Neutral</Select.Item>
                <Select.Item value="structured">Structured</Select.Item>
                <Select.Item value="playful">Playful</Select.Item>
              </Select.List>
              <Select.NotFound />
            </Select.Content>
          </Select.Root>

          <div className="space-y-1">
            <span className="text-sm font-medium text-surface-content">Layout</span>
            <RadioGroup value={layout} onChange={setLayout} orientation="horizontal">
              <RadioGroup.Item value="grid" label="Grid" />
              <RadioGroup.Item value="stack" label="Stack" />
              <RadioGroup.Item value="flow" label="Flow" />
            </RadioGroup>
          </div>
        </div>

        <Divider spacing="sm">
          <Divider.Line />
          <Divider.Label>Options</Divider.Label>
          <Divider.Line />
        </Divider>

        <div className="flex flex-col gap-4">


          <Switch
            label="Auto-save drafts"
            description="Persist changes locally as you type"
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
        </div>

        <div className="rounded-surface border border-border bg-canvas p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-surface-content">Collage density</span>
            <span className="font-tertiary text-xs text-muted-content">
              {density[0]} — {density[1]}
            </span>
          </div>
          <Slider
            value={density}
            min={0}
            max={100}
            step={4}
            label="Collage density"
            onValueChange={setDensity}
          />
        </div>

        <Alert variant="success">
          <Alert.Icon variant="success">
            <Check className="w-4 h-4" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Ready to generate</Alert.Title>
            <Alert.Description>All form controls are live and interactive. Try changing values above.</Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert variant="error">
          <Alert.Icon variant="error">
            <AlertCircle className="w-4 h-4" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Action Required</Alert.Title>
            <Alert.Description>Please resolve the missing inputs before generating the layout.</Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert variant="warning">
          <Alert.Icon variant="warning">
            <TriangleAlert className="w-4 h-4" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Approaching limits</Alert.Title>
            <Alert.Description>You are close to exceeding the maximum component density.</Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert variant="info">
          <Alert.Icon variant="info">
            <Info className="w-4 h-4" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>New update available</Alert.Title>
            <Alert.Description>A new version of the design system is ready to be installed.</Alert.Description>
          </Alert.Content>
        </Alert>
      </div>
    </div>
  );
}
