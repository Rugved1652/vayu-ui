import { HookRegistryEntry } from '../types.js';

export const useIsMountEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-is-mount',
  name: 'useIsMount',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Returns true during the initial render (mount) and false on all subsequent renders, useful for distinguishing first-run behavior.',
  longDescription:
    "Uses a ref initialized to true that is flipped to false inside a layout-effect-like useEffect with an empty dependency array. On the very first render of the component, the ref still reads true, so the hook returns true. After the effect runs post-mount, the ref becomes false and stays false for the lifetime of the component. This hook is valuable when you need to skip an effect on the initial render, gate animations to only run on mount, or detect SSR vs. hydrated client renders. Because it relies on useRef rather than useState, reading the mount status does not trigger a re-render. Note that in Strict Mode's double-render behavior in development, the hook still correctly identifies the initial render because the ref is only reset by the effect, not by render.",
  tags: [
    'mount',
    'lifecycle',
    'first-render',
    'initial',
    'ssr',
    'hydration',
    'ref',
    'effect-guard',
    'animation-gate',
    'state',
  ],
  category: 'lifecycle',
  useCases: [
    'Skip running a useEffect logic on the initial render so it only fires when dependencies change after mount',
    'Prevent an entrance animation from replaying when a parent re-renders, ensuring it only plays once on mount',
    'Detect whether a component is rendering for the first time to initialize client-only state differently from SSR defaults',
    'Gate analytics or logging so an event is only sent on the first meaningful user interaction after mount',
    'Avoid fetching data on mount when the initial props already contain the required data, only refetching on prop changes',
    'Implement a one-time confetti or toast notification that should only appear when a component first mounts',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useIsMount.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useIsMount(): boolean',
  returnType: 'boolean',
  parameters: [],
  returnValues: [
    {
      name: 'isMount',
      type: 'boolean',
      description:
        'True during the initial render before the effect has run. False on every render after the component has mounted.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Skip Effect on Initial Render',
      description:
        'A search input that only triggers an API call when the query changes after mount, not on the initial empty value.',
      code: `import { useIsMount } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function SearchOnChange() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) return; // Skip initial render
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setResults(data.items))
      .catch(() => {});
    return () => controller.abort();
  }, [query, isMount]);

  return (
    <div className="space-y-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full px-3 py-2 rounded-control border bg-surface text-surface-content"
      />
      <ul className="space-y-1">
        {results.map((item) => (
          <li key={item} className="px-2 py-1 text-sm rounded-md hover:bg-muted/50">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      tags: ['effect-guard', 'api', 'search', 'skip-mount'],
    },
    {
      title: 'Mount-Only Entrance Animation',
      description:
        'A card that slides in only on its first mount, ignoring subsequent parent re-renders.',
      code: `import { useIsMount } from 'vayu-ui';

export default function AnimatedCard({ title }: { title: string }) {
  const isMount = useIsMount();

  return (
    <div
      className={\`p-6 rounded-surface bg-surface text-surface-content border transition-all duration-500 \${
        isMount ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }\`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-content mt-1">
        This card animates in once on mount.
      </p>
    </div>
  );
}`,
      tags: ['animation', 'entrance', 'mount-only', 'transition'],
    },
    {
      title: 'SSR Hydration Gate',
      description:
        'Conditionally renders client-only content after hydration to avoid SSR mismatches with window-dependent values.',
      code: `import { useIsMount } from 'vayu-ui';

export default function ClientOnlyClock() {
  const isMount = useIsMount();
  const now = new Date();
  const time = now.toLocaleTimeString();

  // During SSR, render a placeholder to match server output
  if (isMount) {
    return (
      <div className="px-4 py-2 rounded-control bg-surface text-surface-content border">
        <span className="text-muted-content">--:--:--</span>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 rounded-control bg-surface text-surface-content border">
      <span className="font-mono tabular-nums">{time}</span>
    </div>
  );
}`,
      tags: ['ssr', 'hydration', 'client-only', 'placeholder'],
    },
    {
      title: 'One-Time Welcome Toast',
      description:
        'Displays a welcome toast notification only the first time a dashboard component mounts.',
      code: `import { useIsMount } from 'vayu-ui';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const isMount = useIsMount();
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!isMount) {
      setToastVisible(true);
      const timer = setTimeout(() => setToastVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isMount]);

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold text-surface-content">Dashboard</h1>
      {toastVisible && (
        <div className="absolute top-4 right-4 px-4 py-2 rounded-control bg-success text-success-content shadow-lg animate-slide-in-down">
          Welcome back! You have 3 new notifications.
        </div>
      )}
    </div>
  );
}`,
      tags: ['toast', 'notification', 'welcome', 'one-time'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using useIsMount inside a custom hook that is called conditionally',
      bad: `function useConditionalLogic(enabled: boolean) {
  if (!enabled) return null;
  const isMount = useIsMount(); // Violates Rules of Hooks
  return isMount;
}`,
      good: `function useConditionalLogic(enabled: boolean) {
  const isMount = useIsMount();
  if (!enabled) return null;
  return isMount;
}`,
      reason:
        'Like all hooks, useIsMount must be called unconditionally at the top level of a component or custom hook. Calling it after a conditional return, inside a loop, or in a nested function breaks React\'s hook ordering and causes crashes or stale state.',
    },
    {
      title: 'Relying on isMount to persist across Strict Mode double renders',
      bad: `const isMount = useIsMount();
useEffect(() => {
  if (isMount) console.log('Only on mount');
}, [isMount]);`,
      good: `const isMount = useIsMount();
useEffect(() => {
  if (isMount) return; // Skip on mount
  console.log('Only after mount when deps change');
}, [someDep]);`,
      reason:
        'In React Strict Mode, components may render twice in development without running cleanup between renders. The ref is only flipped by the effect, so isMount still correctly identifies the first render. However, you should not use isMount as a dependency for effects that need to run once — use an empty dependency array or a dedicated flag ref instead.',
    },
    {
      title: 'Expecting isMount to become true again on re-mount without unmounting',
      bad: `const isMount = useIsMount();
// Toggling visibility with CSS display:none and expecting isMount to be true again`,
      good: `// Use a key prop to force remount, or track visibility with a separate state
const [visible, setVisible] = useState(true);
{visible && <MyComponent key={resetKey} />}`,
      reason:
        'useIsMount only identifies the first render of a mounted component instance. If the component stays mounted but is hidden via CSS, the ref remains false. To re-trigger mount behavior, you must unmount and remount the component, typically by changing its key or conditional rendering.',
    },
    {
      title: 'Using isMount to gate data fetching that should run on mount',
      bad: `const isMount = useIsMount();
useEffect(() => {
  if (!isMount) fetchData();
}, [isMount]);`,
      good: `useEffect(() => {
  fetchData();
}, []);`,
      reason:
        'The primary use case for useIsMount is to skip effects on the initial render, not to trigger them. If you need data fetching on mount, use an empty dependency array directly. Inverting the logic makes the code harder to understand and can cause issues with React\'s concurrent rendering.',
    },
    {
      title: 'Replacing isMount with useState for mount detection',
      bad: `const [isMount, setIsMount] = useState(true);
useEffect(() => {
  setIsMount(false);
}, []);`,
      good: `const isMount = useIsMount();
// No re-render triggered, works immediately on first render`,
      reason:
        'Using useState to track mount status causes an unnecessary re-render after the initial render because setState triggers a state update. useIsMount uses a ref, which is mutable without causing re-renders, making it more efficient for this specific purpose.',
    },
  ],
};
