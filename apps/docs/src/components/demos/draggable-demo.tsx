'use client';

import { useState } from 'react';
import { Draggable, type ContainersMap } from 'vayu-ui';
import { Mail, Image, FileText, Music, Video, Archive, Star, Heart, Zap } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  image: Image,
  document: FileText,
  music: Music,
  video: Video,
  archive: Archive,
  star: Star,
  heart: Heart,
  zap: Zap,
};

const listItems = [
  { id: '1', title: 'Inbox', subtitle: '12 unread', icon: 'mail' },
  { id: '2', title: 'Photos', subtitle: '3,429 items', icon: 'image' },
  { id: '3', title: 'Documents', subtitle: '156 files', icon: 'document' },
  { id: '4', title: 'Music', subtitle: '2,847 tracks', icon: 'music' },
  { id: '5', title: 'Videos', subtitle: '89 clips', icon: 'video' },
  { id: '6', title: 'Archives', subtitle: '24 files', icon: 'archive' },
];

const gridItems = [
  { id: 'g1', title: 'Inbox', subtitle: '12', icon: 'mail' },
  { id: 'g2', title: 'Photos', subtitle: '3,429', icon: 'image' },
  { id: 'g3', title: 'Docs', subtitle: '156', icon: 'document' },
  { id: 'g4', title: 'Music', subtitle: '2,847', icon: 'music' },
  { id: 'g5', title: 'Videos', subtitle: '89', icon: 'video' },
  { id: 'g6', title: 'Archives', subtitle: '24', icon: 'archive' },
  { id: 'g7', title: 'Starred', subtitle: '7', icon: 'star' },
  { id: 'g8', title: 'Favorites', subtitle: '31', icon: 'heart' },
  { id: 'g9', title: 'Quick', subtitle: '5', icon: 'zap' },
];

/* ------------------------------------------------------------------ */
/*  List Demo                                                          */
/* ------------------------------------------------------------------ */

function DraggableListDemo() {
  const [items, setItems] = useState(listItems);

  const handleReorder = (newOrder: string[]) => {
    setItems((prev) => newOrder.map((id) => prev.find((i) => i.id === id)!));
  };

  return (
    <div className="max-w-md">
      <p className="text-xs font-secondary text-muted-content mb-3">
        List — Drag or keyboard (Space → Arrow ↑↓ → Space)
      </p>

      <Draggable items={items.map((i) => i.id)} onReorder={handleReorder}>
        <Draggable.Container layout="list">
          {items.map((item) => {
            const Icon = ICONS[item.icon] ?? FileText;
            return (
              <Draggable.Item key={item.id} value={item.id}>
                <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-surface hover:border-brand/30 transition-colors">
                  <Draggable.Handle />
                  <div className="flex items-center justify-center w-9 h-9 rounded-control bg-brand/10">
                    <Icon className="w-4 h-4 text-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-secondary font-semibold text-surface-content truncate">
                      {item.title}
                    </p>
                    <p className="text-xs font-secondary text-muted-content">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </Draggable.Item>
            );
          })}
        </Draggable.Container>

        <Draggable.Preview />
        <Draggable.DropIndicator />
      </Draggable>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Grid Demo                                                          */
/* ------------------------------------------------------------------ */

function DraggableGridDemo() {
  const [items, setItems] = useState(gridItems);

  const handleReorder = (newOrder: string[]) => {
    setItems((prev) => newOrder.map((id) => prev.find((i) => i.id === id)!));
  };

  return (
    <div>
      <p className="text-xs font-secondary text-muted-content mb-3">
        Grid — Drag or keyboard (Space → Arrow ←→↑↓ → Space)
      </p>

      <Draggable items={items.map((i) => i.id)} onReorder={handleReorder}>
        <Draggable.Container layout="grid" columns={3}>
          {items.map((item) => {
            const Icon = ICONS[item.icon] ?? FileText;
            return (
              <Draggable.Item key={item.id} value={item.id}>
                <div className="flex flex-col items-center gap-2 p-4 bg-surface border border-border rounded-surface hover:border-brand/30 transition-colors">
                  <div className="flex items-center justify-between w-full">
                    <Draggable.Handle />
                    <span className="text-[10px] font-secondary text-muted-content">
                      {item.subtitle}
                    </span>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-control bg-brand/10">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <p className="text-xs font-secondary font-semibold text-surface-content">
                    {item.title}
                  </p>
                </div>
              </Draggable.Item>
            );
          })}
        </Draggable.Container>

        <Draggable.Preview />
        <Draggable.DropIndicator />
      </Draggable>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cross-List Demo                                                    */
/* ------------------------------------------------------------------ */

function DraggableCrossListDemo() {
  const [containers, setContainers] = useState<ContainersMap>({
    todo: ['t1', 't2', 't3'],
    done: ['t4', 't5'],
  });

  const taskMap: Record<string, string> = {
    t1: 'Write unit tests',
    t2: 'Review PR #42',
    t3: 'Update changelog',
    t4: 'Setup CI pipeline',
    t5: 'Design token audit',
  };

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-secondary text-muted-content mb-3">
        Cross-list — Drag items between columns
      </p>

      <Draggable containers={containers} onContainersChange={setContainers}>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-canvas rounded-surface p-4 border border-border">
            <h3 className="text-sm font-secondary font-bold text-surface-content mb-3 uppercase tracking-wide">
              To Do ({containers.todo.length})
            </h3>
            <Draggable.Container containerId="todo" layout="list" aria-label="To Do items" className="min-h-[80px]">
              {containers.todo.map((id) => (
                <Draggable.Item key={id} value={id}>
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-surface border border-border">
                    <Draggable.Handle />
                    <span className="text-sm font-secondary text-surface-content">{taskMap[id]}</span>
                  </div>
                </Draggable.Item>
              ))}
            </Draggable.Container>
          </div>

          <div className="bg-canvas rounded-surface p-4 border border-border">
            <h3 className="text-sm font-secondary font-bold text-surface-content mb-3 uppercase tracking-wide">
              Done ({containers.done.length})
            </h3>
            <Draggable.Container containerId="done" layout="list" aria-label="Done items" className="min-h-[80px]">
              {containers.done.map((id) => (
                <Draggable.Item key={id} value={id}>
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-surface border border-border">
                    <Draggable.Handle />
                    <span className="text-sm font-secondary text-surface-content">{taskMap[id]}</span>
                  </div>
                </Draggable.Item>
              ))}
            </Draggable.Container>
          </div>
        </div>

        <Draggable.Preview />
        <Draggable.DropIndicator />
      </Draggable>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Default Export                                                     */
/* ------------------------------------------------------------------ */

export default function DraggableDemo() {
  return (
    <div className="not-prose flex flex-col gap-10 w-full">
      <DraggableListDemo />
      <DraggableGridDemo />
      <DraggableCrossListDemo />
    </div>
  );
}
