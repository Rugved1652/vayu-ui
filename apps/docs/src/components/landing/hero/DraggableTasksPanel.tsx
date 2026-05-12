'use client';

import { useState } from 'react';
import { GripVertical } from 'lucide-react';
import {
  Accordion,
  Badge,
  Divider,
  Draggable,
} from 'vayu-ui';
import { taskSeed } from './constants';

export function DraggableTasksPanel() {
  const [items, setItems] = useState(taskSeed);

  const handleReorder = (newOrder: string[]) => {
    setItems((prev) => newOrder.map((id) => prev.find((item) => item.id === id)!));
  };

  return (
    <div className="hero-collage-panel h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Tasks</span>
        </div>
        <Badge variant="muted" size="sm">
          Reorder
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <Draggable items={items.map((item) => item.id)} onReorder={handleReorder}>
          <Draggable.Container layout="list">
            {items.map((item) => (
              <Draggable.Item key={item.id} value={item.id}>
                <div className="flex items-center gap-3 rounded-surface border border-border bg-canvas px-3 py-2.5 transition-colors hover:border-brand/30">
                  <Draggable.Handle />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-surface-content">{item.title}</p>
                    <p className="text-xs text-muted-content">{item.detail}</p>
                  </div>
                </div>
              </Draggable.Item>
            ))}
          </Draggable.Container>
          <Draggable.Preview />
          <Draggable.DropIndicator />
        </Draggable>

        <Divider spacing="sm">
          <Divider.Line />
          <Divider.Label>Details</Divider.Label>
          <Divider.Line />
        </Divider>

        <Accordion>
          <Accordion.Item itemId="task-help">
            <Accordion.Header itemId="task-help">How do tasks work?</Accordion.Header>
            <Accordion.Body itemId="task-help">
              <p className="text-xs text-muted-content">
                Drag items by their handle to reorder. Tasks represent component groups in your project.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item itemId="customization">
            <Accordion.Header itemId="customization">Can I customize the tasks?</Accordion.Header>
            <Accordion.Body itemId="customization">
              <p className="text-xs text-muted-content">
                Yes, you can completely customize the visual style and behavior of the tasks using our design tokens.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item itemId="data-source">
            <Accordion.Header itemId="data-source">Where is the data stored?</Accordion.Header>
            <Accordion.Body itemId="data-source">
              <p className="text-xs text-muted-content">
                Currently, it's stored in local state. You can easily connect the Draggable component to your own backend.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
