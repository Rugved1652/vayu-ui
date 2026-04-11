'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardContent,
  Tabs,
  Switch,
  TextInput,
  Tooltip,
  Animation,
  Status,
} from 'vayu-ui';
import { Info } from 'lucide-react';

function ButtonsDemo() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" size="small">
        Primary
      </Button>
      <Button variant="secondary" size="small">
        Secondary
      </Button>
      <Button variant="outline" size="small">
        Outline
      </Button>
      <Button variant="ghost" size="small">
        Ghost
      </Button>
      <Button variant="destructive" size="small">
        Destructive
      </Button>
      <Button
        variant="primary"
        size="small"
        loading={loading ? Status.PENDING : Status.IDLE}
        onClick={handleClick}
      >
        {loading ? 'Saving...' : 'Click me'}
      </Button>
    </div>
  );
}

function BadgesAndSwitchDemo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="brand" size="sm">Brand</Badge>
        <Badge variant="muted" size="sm">Muted</Badge>
        <Badge variant="success" size="sm">Success</Badge>
        <Badge variant="warning" size="sm">Warning</Badge>
        <Badge variant="destructive" size="sm">Error</Badge>
        <Badge variant="info" size="sm">Info</Badge>
      </div>
      <Switch label="Enable notifications" defaultChecked />
    </div>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="preview">
      <Tabs.List>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
        <Tabs.Trigger value="api">API</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="preview">
        <p className="text-sm font-secondary text-surface-content mt-4">
          This is a live, interactive Tabs component. Click between tabs to see the content change.
        </p>
      </Tabs.Content>
      <Tabs.Content value="code">
        <pre className="mt-4 rounded-surface bg-canvas border border-border p-4 text-xs font-tertiary text-surface-content overflow-x-auto">
          <code>{`import { Tabs } from 'vayu-ui';

<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>`}</code>
        </pre>
      </Tabs.Content>
      <Tabs.Content value="api">
        <div className="mt-4 space-y-2 text-sm font-secondary text-surface-content">
          <p><code className="font-tertiary text-brand">defaultValue</code> — Initial active tab (uncontrolled)</p>
          <p><code className="font-tertiary text-brand">value</code> — Active tab (controlled)</p>
          <p><code className="font-tertiary text-brand">onValueChange</code> — Callback on tab switch</p>
        </div>
      </Tabs.Content>
    </Tabs>
  );
}

function FormDemo() {
  return (
    <div className="space-y-4">
      <TextInput defaultValue="">
        <TextInput.Label>Email</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input placeholder="you@example.com" type="email" />
        </TextInput.Field>
      </TextInput>
      <div className="flex items-center gap-3">
        <span className="text-sm font-secondary text-surface-content">Need help?</span>
        <Tooltip content="Enter your work email for best results" position="top">
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-content hover:text-surface-content hover:bg-surface transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export function ComponentShowcase() {
  return (
    <section className="bg-surface px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-primary text-3xl sm:text-4xl font-bold text-canvas-content">
            Built with VedUI
          </h2>
          <p className="mt-4 text-lg font-secondary text-surface-content max-w-2xl mx-auto">
            Every component on this page is a real, interactive VedUI component. Not a screenshot, not a mockup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Animation.Fade delay="none">
            <Card>
              <CardHeader title="Buttons" subtitle="Five variants, loading states, three sizes" />
              <CardContent>
                <ButtonsDemo />
              </CardContent>
            </Card>
          </Animation.Fade>

          <Animation.Fade delay="short">
            <Card>
              <CardHeader title="Badges & Switch" subtitle="Status indicators and toggles" />
              <CardContent>
                <BadgesAndSwitchDemo />
              </CardContent>
            </Card>
          </Animation.Fade>

          <Animation.Fade delay="medium">
            <Card>
              <CardHeader title="Tabs" subtitle="Accessible tabbed interfaces" />
              <CardContent>
                <TabsDemo />
              </CardContent>
            </Card>
          </Animation.Fade>

          <Animation.Fade delay="long">
            <Card>
              <CardHeader title="Form Elements" subtitle="Inputs, tooltips, and validation" />
              <CardContent>
                <FormDemo />
              </CardContent>
            </Card>
          </Animation.Fade>
        </div>
      </div>
    </section>
  );
}
