'use client';

import { Info, MessageSquare } from 'lucide-react';
import {
  Alert,
  Badge,
  Button,
  Divider,
  Popover,
  RadioGroup,
  Switch,
} from 'vayu-ui';

export function PopoverPanel() {
  return (
    <div className="hero-collage-panel hero-collage-panel-soft h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Popover</span>
        </div>
        <Badge variant="warning" size="sm">
          Click
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Popover>
            <Popover.Trigger asChild>
              <Button variant="outline" size="small">
                Theme
              </Button>
            </Popover.Trigger>
            <Popover.Content side="bottom" align="start" showArrow>
              <div className="p-3 space-y-2 w-48">
                <p className="text-sm font-semibold text-surface-content">Appearance</p>
                <RadioGroup defaultValue="system" orientation="vertical">
                  <RadioGroup.Item value="light" label="Light" />
                  <RadioGroup.Item value="dark" label="Dark" />
                  <RadioGroup.Item value="system" label="System" />
                </RadioGroup>
              </div>
            </Popover.Content>
          </Popover>

          <Popover>
            <Popover.Trigger asChild>
              <Button variant="outline" size="small">
                Share
              </Button>
            </Popover.Trigger>
            <Popover.Content side="bottom" align="end" showArrow>
              <div className="p-3 space-y-2 w-48">
                <p className="text-sm font-semibold text-surface-content">Share link</p>
                <p className="text-xs text-muted-content">
                  Copy the link below to share with your team.
                </p>
                <div className="rounded-control border border-border bg-canvas px-2 py-1.5 font-tertiary text-xs text-surface-content">
                  vayu-ui.dev/s/abc123
                </div>
              </div>
            </Popover.Content>
          </Popover>
        </div>

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>More</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

        <Popover>
          <Popover.Trigger asChild>
            <Button variant="primary" size="small" className="w-full">
              Open Settings
            </Button>
          </Popover.Trigger>
          <Popover.Content side="top" align="center" showArrow>
            <div className="p-3 space-y-3 w-56">
              <p className="text-sm font-semibold text-surface-content">Quick settings</p>
              <Switch label="Auto-update" description="Keep components synced" defaultChecked />
              <Switch label="Dev mode" description="Show debug overlays" />
            </div>
          </Popover.Content>
        </Popover>

        <Alert variant="info">
          <Alert.Icon variant="info">
            <Info className="w-4 h-4" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Click to interact</Alert.Title>
            <Alert.Description>Popovers stay open until you click outside.</Alert.Description>
          </Alert.Content>
        </Alert>
      </div>
    </div>
  );
}
