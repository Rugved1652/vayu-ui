'use client';

import { useState } from 'react';
import { GridLayout, type GridLayoutItem } from 'vayu-ui';
import {
  BarChart3,
  Users,
  Activity,
  Bell,
  Settings,
  TrendingUp,
  FileText,
  Zap,
} from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  chart: BarChart3,
  users: Users,
  activity: Activity,
  bell: Bell,
  settings: Settings,
  trending: TrendingUp,
  file: FileText,
  zap: Zap,
};

/* ------------------------------------------------------------------ */
/*  Basic Dashboard Demo                                               */
/* ------------------------------------------------------------------ */

const basicLayout: GridLayoutItem[] = [
  { i: 'a', x: 0, y: 0, w: 4, h: 2 },
  { i: 'b', x: 4, y: 0, w: 4, h: 2 },
  { i: 'c', x: 8, y: 0, w: 4, h: 4 },
  { i: 'd', x: 0, y: 2, w: 8, h: 2 },
  { i: 'e', x: 0, y: 4, w: 6, h: 3 },
  { i: 'f', x: 6, y: 4, w: 6, h: 3 },
];

const widgetLabels: Record<string, { title: string; icon: string; color: string }> = {
  a: { title: 'Revenue', icon: 'chart', color: 'bg-brand/10 text-brand' },
  b: { title: 'Users', icon: 'users', color: 'bg-success/10 text-success' },
  c: { title: 'Activity', icon: 'activity', color: 'bg-info/10 text-info' },
  d: { title: 'Notifications', icon: 'bell', color: 'bg-warning/10 text-warning' },
  e: { title: 'Growth', icon: 'trending', color: 'bg-success/10 text-success' },
  f: { title: 'Quick Actions', icon: 'zap', color: 'bg-brand/10 text-brand' },
};

function BasicDashboardDemo() {
  const [layout, setLayout] = useState(basicLayout);

  return (
    <div>
      <p className="text-xs font-secondary text-muted-content mb-3">
        Dashboard — Drag items to reposition. Collision resolution pushes overlapping items.
      </p>

      <GridLayout layout={layout} onLayoutChange={setLayout} cols={12} rowHeight={60} gap={12}>
        <GridLayout.Container>
          {layout.map((item) => {
            const meta = widgetLabels[item.i] ?? { title: item.i, icon: 'file', color: 'bg-muted text-muted-content' };
            const Icon = ICONS[meta.icon] ?? FileText;
            return (
              <GridLayout.Item key={item.i} id={item.i}>
                <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-surface h-full overflow-hidden hover:border-brand/30 transition-colors">
                  <GridLayout.DragHandle />
                  <div className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-control ${meta.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-secondary font-semibold text-surface-content truncate">
                      {meta.title}
                    </p>
                    <p className="text-xs font-secondary text-muted-content">
                      {item.w}×{item.h}
                    </p>
                  </div>
                </div>
              </GridLayout.Item>
            );
          })}
        </GridLayout.Container>
        <GridLayout.Placeholder />
      </GridLayout>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Resizable Dashboard Demo                                           */
/* ------------------------------------------------------------------ */

const resizableLayout: GridLayoutItem[] = [
  { i: 'w1', x: 0, y: 0, w: 6, h: 2, minW: 2, minH: 1 },
  { i: 'w2', x: 6, y: 0, w: 6, h: 2, minW: 2, minH: 1 },
  { i: 'w3', x: 0, y: 2, w: 4, h: 3, minW: 2, minH: 2 },
  { i: 'w4', x: 4, y: 2, w: 4, h: 3, minW: 2, minH: 2 },
  { i: 'w5', x: 8, y: 2, w: 4, h: 3, minW: 2, minH: 2 },
];

const resizableLabels: Record<string, { title: string; icon: string; color: string }> = {
  w1: { title: 'Analytics', icon: 'chart', color: 'bg-brand/10 text-brand' },
  w2: { title: 'Reports', icon: 'file', color: 'bg-info/10 text-info' },
  w3: { title: 'Team', icon: 'users', color: 'bg-success/10 text-success' },
  w4: { title: 'Performance', icon: 'trending', color: 'bg-warning/10 text-warning' },
  w5: { title: 'Alerts', icon: 'bell', color: 'bg-destructive/10 text-destructive' },
};

function ResizableDashboardDemo() {
  const [layout, setLayout] = useState(resizableLayout);

  return (
    <div>
      <p className="text-xs font-secondary text-muted-content mb-3">
        Resizable — Drag to reposition, use corner handles to resize. Shift + Arrow keys for keyboard resize.
      </p>

      <GridLayout layout={layout} onLayoutChange={setLayout} cols={12} rowHeight={60} gap={12}>
        <GridLayout.Container>
          {layout.map((item) => {
            const meta = resizableLabels[item.i] ?? { title: item.i, icon: 'file', color: 'bg-muted text-muted-content' };
            const Icon = ICONS[meta.icon] ?? FileText;
            return (
              <GridLayout.Item key={item.i} id={item.i}>
                <div className="flex flex-col gap-2 p-4 bg-surface border border-border rounded-surface h-full overflow-hidden hover:border-brand/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <GridLayout.DragHandle />
                    <div className={`flex items-center justify-center w-8 h-8 rounded-control ${meta.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-secondary font-semibold text-surface-content truncate">
                      {meta.title}
                    </p>
                    <p className="text-xs font-secondary text-muted-content">
                      {item.w} cols × {item.h} rows
                    </p>
                  </div>
                </div>
                <GridLayout.ResizeHandle />
              </GridLayout.Item>
            );
          })}
        </GridLayout.Container>
        <GridLayout.Placeholder />
      </GridLayout>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static Items Demo                                                  */
/* ------------------------------------------------------------------ */

const mixedLayout: GridLayoutItem[] = [
  { i: 'header', x: 0, y: 0, w: 12, h: 1, static: true },
  { i: 'sidebar', x: 0, y: 1, w: 3, h: 4, static: true },
  { i: 'main', x: 3, y: 1, w: 6, h: 2 },
  { i: 'aside', x: 9, y: 1, w: 3, h: 2 },
  { i: 'footer', x: 3, y: 3, w: 9, h: 2 },
];

function StaticItemsDemo() {
  const [layout, setLayout] = useState(mixedLayout);

  return (
    <div>
      <p className="text-xs font-secondary text-muted-content mb-3">
        Static Items — Header and sidebar are locked (static: true). Drag the other widgets around them.
      </p>

      <GridLayout layout={layout} onLayoutChange={setLayout} cols={12} rowHeight={50} gap={12}>
        <GridLayout.Container>
          {layout.map((item) => {
            const isStatic = item.static;
            return (
              <GridLayout.Item key={item.i} id={item.i}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-surface h-full overflow-hidden transition-colors ${
                    isStatic
                      ? 'bg-canvas border-2 border-dashed border-border'
                      : 'bg-surface border border-border hover:border-brand/30'
                  }`}
                >
                  {!isStatic && <GridLayout.DragHandle />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-secondary font-semibold truncate ${isStatic ? 'text-muted-content' : 'text-surface-content'}`}>
                      {item.i.charAt(0).toUpperCase() + item.i.slice(1)}
                    </p>
                    <p className="text-xs font-secondary text-muted-content">
                      {isStatic ? 'Static' : `${item.w}×${item.h}`}
                    </p>
                  </div>
                </div>
              </GridLayout.Item>
            );
          })}
        </GridLayout.Container>
        <GridLayout.Placeholder />
      </GridLayout>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Default Export                                                     */
/* ------------------------------------------------------------------ */

export default function GridLayoutDemo() {
  return (
    <div className="not-prose flex flex-col gap-10 w-full">
      <BasicDashboardDemo />
      <ResizableDashboardDemo />
      <StaticItemsDemo />
    </div>
  );
}
