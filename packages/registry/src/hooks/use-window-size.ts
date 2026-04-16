import { HookRegistryEntry } from '../types.js';

export const useWindowSizeEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-window-size',
  name: 'useWindowSize',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that tracks the browser viewport width and height, updating on every resize event with SSR-safe defaults.',
  longDescription:
    'Wraps window.innerWidth and window.innerHeight into a React-friendly hook that returns a WindowSize object ({ width, height }). It subscribes to the native resize event inside a useEffect so the component re-renders automatically whenever the viewport changes. On the initial render (and during SSR), width and height are both 0, which avoids hydration mismatches because the real dimensions are only read client-side after mount. Cleanup is handled automatically — the resize listener is removed when the component unmounts. No external dependencies beyond React are required. Use this hook when you need the actual viewport dimensions for responsive logic, layout calculations, or conditional rendering — it is lighter and more targeted than useMeasure, which tracks a specific DOM element rather than the viewport.',
  tags: [
    'window',
    'viewport',
    'resize',
    'dimensions',
    'responsive',
    'width',
    'height',
    'breakpoint',
    'sensor',
    'ssr-safe',
  ],
  category: 'sensor',
  useCases: [
    'When you need to switch between mobile and desktop layouts based on the actual viewport width instead of CSS media queries',
    'To dynamically adjust the number of columns in a grid or masonry layout as the user resizes the browser window',
    'When building a dashboard that needs to calculate chart dimensions or canvas sizes from the available viewport space',
    'To conditionally render a mobile navigation drawer vs. a desktop sidebar based on the current window width',
    'When you need to detect orientation changes on tablets or mobile devices by comparing width against height',
    'To implement a responsive data table that collapses columns when the viewport shrinks below a threshold',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useWindowSize.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useWindowSize(): WindowSize',
  returnType: 'WindowSize',
  parameters: [],
  returnValues: [
    {
      name: 'width',
      type: 'number',
      description:
        'Current viewport width in pixels (window.innerWidth). Value is 0 during SSR and on the initial server-rendered HTML before the client-side hydration sets the real value.',
    },
    {
      name: 'height',
      type: 'number',
      description:
        'Current viewport height in pixels (window.innerHeight). Value is 0 during SSR and on the initial server-rendered HTML before the client-side hydration sets the real value.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Responsive Layout Switch',
      description:
        'Renders a mobile-friendly stacked layout when the viewport is narrow and a multi-column layout when it is wide, switching in real-time as the user resizes.',
      code: `import { useWindowSize } from 'vayu-ui';

export default function ResponsiveLayout() {
  const { width } = useWindowSize();

  if (width === 0) {
    return <div className="animate-pulse h-96 bg-muted rounded-surface" />;
  }

  const isMobile = width < 768;

  return (
    <div className={isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-3 gap-4'}>
      <div className="p-4 rounded-surface bg-surface text-surface-content border">Sidebar</div>
      <div className={isMobile ? '' : 'col-span-2'} >
        <div className="p-4 rounded-surface bg-surface text-surface-content border">Main Content</div>
      </div>
    </div>
  );
}`,
      tags: ['responsive', 'layout', 'mobile', 'breakpoint'],
    },
    {
      title: 'Dynamic Grid Columns',
      description:
        'Calculates the optimal number of columns for a card grid based on viewport width, with a minimum column width of 280px.',
      code: `import { useWindowSize } from 'vayu-ui';
import { useMemo } from 'react';

export default function DynamicCardGrid() {
  const { width } = useWindowSize();

  const columns = useMemo(() => {
    if (width === 0) return 1;
    const colCount = Math.floor(width / 280);
    return Math.max(1, Math.min(colCount, 5));
  }, [width]);

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\` }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="p-4 rounded-surface bg-surface text-surface-content border">
          Card {i + 1}
        </div>
      ))}
    </div>
  );
}`,
      tags: ['grid', 'columns', 'dynamic', 'card'],
    },
    {
      title: 'Orientation Detection',
      description:
        'Detects whether the device is in portrait or landscape orientation by comparing width and height, and displays a visual indicator.',
      code: `import { useWindowSize } from 'vayu-ui';

export default function OrientationIndicator() {
  const { width, height } = useWindowSize();

  if (width === 0 || height === 0) {
    return null;
  }

  const isLandscape = width > height;
  const orientation = isLandscape ? 'Landscape' : 'Portrait';

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-control bg-surface text-surface-content border text-sm">
      <span
        className={\`inline-block w-4 h-4 border-2 border-current rounded-sm transition-transform \${
          isLandscape ? 'rotate-90' : ''
        }\`}
      />
      <span>{orientation}</span>
      <span className="text-muted tabular-nums">
        {width} &times; {height}
      </span>
    </div>
  );
}`,
      tags: ['orientation', 'portrait', 'landscape', 'display'],
    },
    {
      title: 'Viewport-Aware Canvas',
      description:
        'Renders a canvas element that fills the available viewport and resizes automatically, useful for full-screen visualizations or games.',
      code: `import { useWindowSize } from 'vayu-ui';
import { useEffect, useRef } from 'react';

export default function ViewportCanvas() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#e94560';
    ctx.font = \`\${Math.max(16, width * 0.03)}px sans-serif\`;
    ctx.textAlign = 'center';
    ctx.fillText(\`Viewport: \${width} × \${height}\`, width / 2, height / 2);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="block w-full h-full"
    />
  );
}`,
      tags: ['canvas', 'full-screen', 'visualization', 'resize'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using width/height before the client has mounted',
      bad: `const { width } = useWindowSize();
const columns = Math.floor(width / 300);
// On SSR, columns = Math.floor(0 / 300) = 0 — layout breaks`,
      good: `const { width } = useWindowSize();
if (width === 0) return <Skeleton />;
const columns = Math.floor(width / 300);`,
      reason:
        'During SSR and the initial client render before the useEffect fires, width and height are both 0. Any layout calculations, divisions, or responsive logic that uses these values will produce incorrect results (e.g., zero columns, divide-by-zero). Always guard against the zero state.',
    },
    {
      title: 'Calling the hook conditionally or inside a loop',
      bad: `if (isResponsive) {
  const { width } = useWindowSize();
}`,
      good: `const { width } = useWindowSize();
// Use the value conditionally instead
const isMobile = width < 768 && isResponsive;`,
      reason:
        'useWindowSize uses useState and useEffect internally, which means it must follow the Rules of Hooks — it cannot be called conditionally, inside loops, or after early returns. Always call the hook at the top level of your component.',
    },
    {
      title: 'Using this to measure a specific DOM element',
      bad: `const { width } = useWindowSize();
// width is the viewport, not the element!
const shouldWrap = myElementRef.current.offsetWidth > width;`,
      good: `import { useMeasure } from 'vayu-ui';
const [ref, { width }] = useMeasure();
// width is now the actual element width
<div ref={ref}>...</div>`,
      reason:
        'useWindowSize returns the viewport (window) dimensions, not the dimensions of a specific DOM element. If you need to measure a particular element, use useMeasure instead, which uses a ResizeObserver on the attached ref.',
    },
    {
      title: 'Expecting pixel-perfect values on every frame during rapid resizing',
      bad: `const { width, height } = useWindowSize();
// Using these for smooth animations or frame-by-frame rendering
const scaleX = width / previousWidth;`,
      good: `const { width, height } = useWindowSize();
// Use for layout decisions, not animation keyframes
const isWide = width >= 1280;`,
      reason:
        'The hook relies on the native resize event, which is throttled by the browser and may not fire on every animation frame during rapid resizing. For smooth resize-driven animations, use CSS transitions or a ResizeObserver-based approach instead.',
    },
  ],
};
