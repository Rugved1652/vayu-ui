'use client';

import { useState } from 'react';
import { Layers } from 'lucide-react';
import {
  Badge,
  Button,
  Divider,
  Drawer,
  Modal,
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

      <div className="flex-1 flex flex-col gap-4">
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

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>Modal</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

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
                Modals trap focus and support Escape to close. Click outside or press X to dismiss.
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

        <div className="flex items-center gap-3">
          <Tooltip content="Overlays appear above the page content" position="top">
            <span className="text-xs text-muted-content underline decoration-dotted underline-offset-2 cursor-help">
              What are overlays?
            </span>
          </Tooltip>
        </div>

        <Switch
          label="Remember choice"
          description="Persist dialog preferences"
          checked={remember}
          onCheckedChange={setRemember}
        />
      </div>
    </div>
  );
}
