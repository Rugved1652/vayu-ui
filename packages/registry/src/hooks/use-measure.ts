import { HookRegistryEntry } from '../types.js';

export const useMeasureEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-measure',
  name: 'useMeasure',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that tracks the pixel width and height of a DOM element using a ResizeObserver, returning a ref to attach and live dimension values.',
  longDescription:
    'Wraps the native ResizeObserver API into a React-friendly hook that returns a typed ref and reactive width/height numbers. Attach the ref to any HTML element and the hook automatically subscribes to size changes via ResizeObserver inside useLayoutEffect, cleaning up on unmount. The initial measurement happens synchronously during the layout phase (useLayoutEffect) so the first render already contains correct dimensions — no flash of zero values. The hook reports contentRect dimensions (content area only, excluding padding, border, and scrollbar), which matches the space available for child content. The ref is typed as HTMLElement, so it works with any HTML element without a generic parameter. It is client-only (use client directive) and handles null refs gracefully — safe during SSR since the ref is null on the server and no observer is created until the client hydrates. No external dependencies beyond React are required.',
  tags: [
    'measure',
    'dimensions',
    'resize',
    'resize-observer',
    'width',
    'height',
    'dom',
    'ref',
    'responsive',
    'layout',
  ],
  category: 'dom',
  useCases: [
    'Build a responsive layout that switches between grid and list views based on the container width rather than the viewport width, enabling component-level responsive behavior',
    'Display the live pixel dimensions of a resizable panel or container for debugging or user-facing size indicators',
    'Trigger repositioning or re-rendering of floating elements (tooltips, popovers) when their anchor container changes size due to content loading or collapsible sections',
    'Implement a sidebar that automatically collapses into a narrow icon-only mode when its container shrinks below a threshold width',
    'Maintain a fixed aspect ratio on a container by computing the height from the measured width and applying it as an inline style',
    'Conditionally show or hide child elements based on available space — for example, truncating a breadcrumb trail or hiding secondary actions when the container is too narrow',
    'Synchronize the width of an overlay or dropdown to match the width of its trigger element in real time as the trigger resizes',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useMeasure.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useMeasure(): { ref: React.RefObject<HTMLElement | null>; width: number; height: number }',
  parameters: [],
  returnType: '{ ref: React.RefObject<HTMLElement | null>; width: number; height: number }',
  returnValues: [
    {
      name: 'ref',
      type: 'React.RefObject<HTMLElement | null>',
      description:
        'A React ref object to attach to the target element via the ref prop. The hook creates a ResizeObserver on this element to track size changes. Initially null until the component mounts. Works with any HTML element (div, span, button, section, etc.).',
    },
    {
      name: 'width',
      type: 'number',
      description:
        'The current content width of the measured element in pixels. Reflects the contentRect.width from ResizeObserver, which excludes padding, border, and scrollbar. Starts at 0 and updates synchronously on the first layout pass, then reactively on every resize.',
    },
    {
      name: 'height',
      type: 'number',
      description:
        'The current content height of the measured element in pixels. Reflects the contentRect.height from ResizeObserver, which excludes padding, border, and scrollbar. Starts at 0 and updates synchronously on the first layout pass, then reactively on every resize.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Live Dimension Display',
      description:
        'A resizable container that displays its current width and height in real time, useful for debugging layouts or showing size information to users.',
      code: `'use client';

import { useMeasure } from 'vayu-ui';

export default function LiveDimensions() {
  const { ref, width, height } = useMeasure();

  return (
    <div
      ref={ref}
      className="relative w-full h-64 p-6 rounded-surface border bg-surface text-surface-content resize overflow-auto"
    >
      <p className="text-sm font-mono">
        {Math.round(width)} × {Math.round(height)} px
      </p>
      <p className="mt-2 text-xs text-muted">
        Drag the bottom-right corner to resize this container.
      </p>
    </div>
  );
}`,
      tags: ['basic', 'dimensions', 'resize', 'debug'],
    },
    {
      title: 'Responsive Grid/List Switch',
      description:
        'A container that automatically switches between a grid layout and a vertical list based on its measured width, enabling component-level responsive behavior independent of viewport breakpoints.',
      code: `'use client';

import { useMeasure } from 'vayu-ui';

const items = ['Dashboard', 'Analytics', 'Reports', 'Settings', 'Users', 'Billing'];

export default function ResponsiveList() {
  const { ref, width } = useMeasure();

  const isWide = width > 400;

  return (
    <div ref={ref} className="w-full rounded-surface border bg-surface text-surface-content p-4">
      <p className="text-xs text-muted mb-3">
        Layout: {isWide ? 'Grid' : 'List'} ({Math.round(width)}px)
      </p>
      <div
        className={isWide ? 'grid grid-cols-3 gap-2' : 'flex flex-col gap-2'}
      >
        {items.map((item) => (
          <div
            key={item}
            className="px-3 py-2 rounded-control border text-sm hover:bg-muted/50 transition-colors"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}`,
      tags: ['responsive', 'grid', 'list', 'layout', 'breakpoint'],
    },
    {
      title: 'Auto-Collapsing Sidebar',
      description:
        'A sidebar panel that collapses into a narrow icon-only mode when its container width drops below a threshold, preserving space without media queries.',
      code: `'use client';

import { useMeasure } from 'vayu-ui';
import { useState } from 'react';

const navItems = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '📈', label: 'Analytics' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '👤', label: 'Profile' },
];

export default function CollapsibleSidebar() {
  const { ref, width } = useMeasure();
  const [active, setActive] = useState('Dashboard');
  const collapsed = width < 160 && width > 0;

  return (
    <aside
      ref={ref}
      className="h-full min-w-[48px] bg-surface text-surface-content border-r flex flex-col"
    >
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={\`flex items-center gap-2 px-3 py-2 rounded-control text-sm transition-colors \${
              active === item.label
                ? 'bg-brand text-brand-content'
                : 'hover:bg-muted/50'
            }\`}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-base">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}`,
      tags: ['sidebar', 'collapse', 'navigation', 'responsive'],
    },
    {
      title: 'Aspect Ratio Container',
      description:
        'A container that maintains a fixed aspect ratio by computing its height from the measured width, useful for video players or image placeholders.',
      code: `'use client';

import { useMeasure } from 'vayu-ui';

export default function AspectRatioBox({ children }: { children: React.ReactNode }) {
  const { ref, width } = useMeasure();
  const aspectRatio = 16 / 9;
  const computedHeight = width > 0 ? width / aspectRatio : 0;

  return (
    <div
      ref={ref}
      style={{ height: computedHeight || undefined }}
      className="w-full rounded-surface border bg-surface text-surface-content overflow-hidden"
    >
      {width > 0 ? (
        children
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-muted">
          Measuring...
        </div>
      )}
    </div>
  );
}`,
      tags: ['aspect-ratio', 'video', 'placeholder', 'container'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Not attaching the ref to a DOM element',
      bad: `const { ref, width, height } = useMeasure();
return (
  <div>
    <p>{width} x {height}</p>
  </div>
);`,
      good: `const { ref, width, height } = useMeasure();
return (
  <div ref={ref}>
    <p>{Math.round(width)} x {Math.round(height)}</p>
  </div>
);`,
      reason:
        'The hook tracks dimensions via a ResizeObserver attached to the ref element. If you do not pass ref to a DOM element, the ref stays null, no observer is created, and width/height will remain at 0 forever.',
    },
    {
      title: 'Using this hook to measure the window or viewport',
      bad: `const { ref, width, height } = useMeasure();
// Attaching ref to a full-viewport div to track window size
return <div ref={ref} className="fixed inset-0">...</div>;`,
      good: `// Use useWindowSize for viewport-level measurements
import { useWindowSize } from 'vayu-ui';
const { width, height } = useWindowSize();`,
      reason:
        'useMeasure tracks a specific DOM element via ResizeObserver, not the viewport. For window-level dimensions, use useWindowSize which listens to the window resize event directly. Using useMeasure on a full-viewport div adds unnecessary overhead and may not report correct values during transitions.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (isVisible) {
  const { ref, width } = useMeasure();
}`,
      good: `const { ref, width } = useMeasure();
return isVisible ? <div ref={ref}>{width}px</div> : null;`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useMeasure inside a conditional violates the Rules of Hooks and will cause React to throw an error or produce inconsistent state. Always call the hook at the top level and conditionally render the measured element instead.',
    },
    {
      title: 'Relying on dimensions before the first layout pass',
      bad: `const { ref, width } = useMeasure();
// Width is 0 on the very first render
const columns = Math.floor(width / 200); // NaN or 0`,
      good: `const { ref, width } = useMeasure();
const columns = width > 0 ? Math.floor(width / 200) : 4; // sensible fallback`,
      reason:
        'Width and height start at 0 until the element mounts and the initial ResizeObserver callback fires. Any computation that divides by these values or uses them to calculate layout will produce incorrect results on the first render. Always guard against the zero case with a fallback value.',
    },
    {
      title: 'Sharing one ref across multiple elements',
      bad: `const { ref, width } = useMeasure();
return (
  <div>
    <div ref={ref}>Panel A</div>
    <div ref={ref}>Panel B</div>
  </div>
);`,
      good: `const { ref: refA, width: widthA } = useMeasure();
const { ref: refB, width: widthB } = useMeasure();
return (
  <div>
    <div ref={refA}>Panel A ({Math.round(widthA)}px)</div>
    <div ref={refB}>Panel B ({Math.round(widthB)}px)</div>
  </div>
);`,
      reason:
        'A single ref can only point to one DOM element at a time. Assigning the same ref to multiple elements means only the last rendered element will be observed. Call useMeasure separately for each element that needs independent dimension tracking.',
    },
  ],
};
