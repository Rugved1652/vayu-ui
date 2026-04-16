import { HookRegistryEntry } from '../types.js';

export const useRenderCountEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-render-count',
  name: 'useRenderCount',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Returns the number of times the component has rendered, starting at 1 on mount, using a persistent ref counter.',
  longDescription:
    'Tracks how many times a React component has rendered by incrementing a useRef counter on every render cycle. Because useRef persists across renders without triggering re-renders itself, the counter increments exactly once per render call — including the initial mount. The returned value starts at 1 (the first render) and increases by one on every subsequent render, regardless of what caused it (state changes, prop updates, parent re-renders, context changes). The hook is fully SSR-safe: it uses only useRef with no browser-specific APIs, so server and client produce the same initial output (1) with no hydration mismatch. Choose this hook over manually adding a counter in useEffect when you need a zero-config, declarative way to measure render frequency for debugging, profiling, or verifying that memoization strategies are working correctly.',
  tags: [
    'render',
    'count',
    'debug',
    'performance',
    'profiling',
    're-render',
    'mount',
    'lifecycle',
    'devtools',
    'memoization',
  ],
  category: 'lifecycle',
  useCases: [
    'Debug unnecessary re-renders by displaying the render count inline to quickly spot components that render far more often than expected',
    'Verify that React.memo, useMemo, or useCallback are actually preventing re-renders by comparing the render count before and after applying memoization',
    'Detect infinite re-render loops during development by watching the count climb continuously in a dev overlay instead of waiting for the UI to freeze',
    'Log render frequency in a development dashboard or overlay to profile component performance and identify the most render-heavy parts of a component tree',
    'Conditionally show a performance warning badge when a component exceeds a render count threshold, signaling that optimization may be needed',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useRenderCount.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useRenderCount(): number',
  returnType: 'number',
  parameters: [],
  returnValues: [
    {
      name: 'renderCount',
      type: 'number',
      description:
        'The total number of times the component has rendered. Starts at 1 on the initial mount and increments by one on every subsequent render. This value is synchronous and immediately reflects the current render cycle — no delay or async update.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Render Counter Display',
      description:
        'A simple component that displays how many times it has rendered, useful as a quick debugging aid during development.',
      code: `import { useRenderCount } from 'vayu-ui';
import { useState } from 'react';

export default function RenderCounter() {
  const renders = useRenderCount();
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3 p-4 rounded-surface border bg-surface text-surface-content max-w-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Counter</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-content font-mono">
          Renders: {renders}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="inline-flex items-center justify-center rounded-control border border-input bg-canvas shadow-control hover:bg-muted h-8 w-8 text-sm"
        >
          −
        </button>
        <span className="text-2xl font-bold tabular-nums w-12 text-center">{count}</span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex items-center justify-center rounded-control border border-input bg-canvas shadow-control hover:bg-muted h-8 w-8 text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}`,
      tags: ['debug', 'basic', 'counter'],
    },
    {
      title: 'Memoization Effectiveness Check',
      description:
        'Compares render counts between an un-memoized component and a memoized version to verify that React.memo is preventing unnecessary re-renders when the parent state changes.',
      code: `import { useRenderCount } from 'vayu-ui';
import { useState, memo } from 'react';

function ChildItem({ name }: { name: string }) {
  const renders = useRenderCount();
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b last:border-b-0">
      <span className="text-sm">{name}</span>
      <span className="text-xs font-mono text-muted-content">Renders: {renders}</span>
    </div>
  );
}

const MemoizedChild = memo(ChildItem);

export default function MemoizationCheck() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const items = ['Alice', 'Bob', 'Charlie'];

  return (
    <div className="space-y-3 p-4 rounded-surface border bg-surface text-surface-content max-w-sm">
      <h3 className="text-sm font-semibold">Memoization Check</h3>
      <p className="text-xs text-muted-content">
        Type in the search box — MemoizedChild should NOT re-render.
      </p>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter (does not affect children)..."
        className="w-full px-3 py-2 rounded-control border bg-canvas text-canvas-content"
      />
      <div className="border rounded-control">
        {items.map((item) => (
          <MemoizedChild
            key={item}
            name={item}
          />
        ))}
      </div>
    </div>
  );
}`,
      tags: ['memoization', 'performance', 'react-memo', 'comparison'],
    },
    {
      title: 'Dev-Only Render Badge',
      description:
        'A wrapper component that shows a small render count badge in the corner during development and strips itself entirely in production builds.',
      code: `import { useRenderCount } from 'vayu-ui';
import { useState, type ReactNode } from 'react';

function RenderBadge({ children, label }: { children: ReactNode; label: string }) {
  const renders = useRenderCount();

  if (process.env.NODE_ENV === 'production') {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <span className="absolute top-1 right-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-destructive/80 text-white leading-none pointer-events-none select-none z-50">
        {label}: {renders}
      </span>
    </div>
  );
}

export default function DevRenderBadge() {
  const [value, setValue] = useState(0);

  return (
    <div className="space-y-4 max-w-md">
      <RenderBadge label="Card">
        <div className="p-4 rounded-surface border bg-surface text-surface-content">
          <p className="text-sm">This card shows its render count in dev mode.</p>
          <p className="text-xs text-muted-content mt-1">
            Current value: {value}
          </p>
        </div>
      </RenderBadge>
      <button
        onClick={() => setValue((v) => v + 1)}
        className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm"
      >
        Trigger Re-render
      </button>
    </div>
  );
}`,
      tags: ['devtools', 'badge', 'development', 'production'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using render count in production business logic',
      bad: `const renders = useRenderCount();
if (renders > 3) {
  setShowTooltip(false); // Driving UI from render count
}`,
      good: `const renders = useRenderCount();
// Only use for debugging, profiling, or dev overlays
console.debug('Component rendered', renders, 'times');
// Use proper state management for production UI logic`,
      reason:
        'Render count is a debugging and profiling tool, not a reliable state variable. The count depends on React\'s internal scheduling and can vary between React versions or modes (concurrent vs. legacy). Never drive production UI behavior from render counts.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (process.env.NODE_ENV === 'development') {
  const renders = useRenderCount();
}`,
      good: `const renders = useRenderCount();
// Consume the value conditionally instead
const renderLabel = process.env.NODE_ENV === 'development'
  ? \`Renders: \${renders}\`
  : '';`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useRenderCount inside a conditional, loop, or nested function violates the Rules of Hooks and will cause crashes or stale values. Always call hooks at the top level and use the result conditionally.',
    },
    {
      title: 'Trying to reset the render count',
      bad: `const renders = useRenderCount();
// Trying to "reset" by unmounting and remounting
// or expecting renders to go back to 0`,
      good: `const renders = useRenderCount();
// The count always increments — design your code around that.
// On mount it starts at 1 and only goes up.
// If you need a resettable counter, use useState instead.`,
      reason:
        'The hook uses a useRef internally that persists for the lifetime of the component instance. There is no reset mechanism — the count monotonically increases from 1. If you need a resettable counter, use useState or useReducer instead.',
    },
    {
      title: 'Expecting the hook to distinguish mount from update',
      bad: `const renders = useRenderCount();
if (renders === 1) {
  // Treating this as "on mount" lifecycle
  fetchData();
}`,
      good: `import { useEffect } from 'react';
// Use useEffect for mount-time side effects
useEffect(() => {
  fetchData();
}, []); // Empty dependency array = mount only`,
      reason:
        'While renders === 1 does coincidentally correspond to the first render, using it as an "on mount" hook is fragile and semantically wrong. Use useEffect with an empty dependency array for mount-time side effects — it is the canonical React pattern and correctly handles cleanup, strict mode double-invocation, and concurrent mode.',
    },
  ],
};
