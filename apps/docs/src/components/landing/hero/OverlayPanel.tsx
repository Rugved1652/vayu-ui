'use client';

import { useState } from 'react';
import { Layers, Info } from 'lucide-react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  HoverCard,
  Modal,
  Popover,
  RadioGroup,
  Switch,
  TextInput,
  Tooltip,
} from 'vayu-ui';

export function OverlayPanel() {
  const [remember, setRemember] = useState(false);

  return (
    <div className="hero-collage-panel h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Overlays</span>
        </div>
        <Badge variant="warning" size="sm">
          Dialog
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <Drawer side="right">
            <Drawer.Trigger asChild>
              <Button variant="outline" className="w-full">
                Open Drawer
              </Button>
            </Drawer.Trigger>
            <Drawer.Overlay />
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Quick Settings</Drawer.Title>
                <Drawer.Description>Adjust your workspace preferences.</Drawer.Description>
              </Drawer.Header>
              <div className="py-4 px-4 space-y-4">
                <TextInput defaultValue="My Project">
                  <TextInput.Label>Project name</TextInput.Label>
                  <TextInput.Field>
                    <TextInput.Input />
                  </TextInput.Field>
                </TextInput>
              </div>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button variant="outline" size="small">
                    Cancel
                  </Button>
                </Drawer.Close>
                <Button variant="primary" size="small">
                  Save
                </Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>

          <Modal>
            <Modal.Trigger asChild>
              <Button variant="primary" className="w-full">
                Open Modal
              </Button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header>
                <div className="flex-1">
                  <Modal.Title>Confirm Action</Modal.Title>
                  <Modal.Description>This is a modal dialog with focus trap.</Modal.Description>
                </div>
                <Modal.Close />
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-muted-content">
                  Modals trap focus and support Escape to close. Click outside or press X to
                  dismiss.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close asChild>
                  <Button variant="outline" size="small">
                    Cancel
                  </Button>
                </Modal.Close>
                <Button variant="primary" size="small">
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>

        <div className="flex items-center justify-between">
          <Switch
            label="Remember choice"
            description="Persist dialog preferences"
            checked={remember}
            onCheckedChange={setRemember}
          />
          <Tooltip content="Overlays appear above the page content" position="top">
            <span className="text-xs text-muted-content underline decoration-dotted underline-offset-2 cursor-help">
              What are overlays?
            </span>
          </Tooltip>
        </div>

        <Divider spacing="sm" />

        <div className="flex flex-wrap items-center gap-2">
          <HoverCard
            side="bottom"
            content={
              <div className="w-56 space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar size="small" username="Vayu UI">
                    <Avatar.Initials username="Vayu UI" />
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-surface-content">Vayu UI</p>
                    <p className="text-xs text-muted-content">@vayuui</p>
                  </div>
                </div>
                <p className="text-xs text-muted-content">
                  A modern React component library with WCAG 2.2 AA compliance and compound
                  patterns.
                </p>
              </div>
            }
          >
            <button className="text-sm font-medium text-brand underline underline-offset-2 hover:text-brand/80 transition-colors mr-2">
              @vayuui
            </button>
          </HoverCard>

          <Tooltip content="HoverCard appears on hover" position="top">
            <Badge variant="muted" size="md" className="cursor-pointer">
              Hover for info
            </Badge>
          </Tooltip>
          <Tooltip content="Tooltips are lightweight popups" position="right">
            <Badge variant="brand" size="md" className="cursor-pointer">
              Another tip
            </Badge>
          </Tooltip>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <Popover.Trigger asChild>
              <Button variant="outline" size="small" className="w-full">
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
              <Button variant="outline" size="small" className="w-full">
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

        <Alert variant="info" className="mt-auto">
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
