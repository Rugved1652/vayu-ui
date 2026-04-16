import { HookRegistryEntry } from '../types.js';

export const useDebounceEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-debounce',
  name: 'useDebounce',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Returns a debounced version of a value that only updates after the specified delay has elapsed without any new changes.',
  longDescription:
    'Wraps a value in a setTimeout-based debounce mechanism using React\'s useState and useEffect. Each time the input value changes, the previous timeout is cleared and a new one is scheduled. The returned debounced value only updates when the delay period expires without the value changing again — ideal for rate-limiting operations triggered by rapid user input. Because it relies solely on synchronous React state and useEffect cleanup, it is fully SSR-safe with no hydration mismatches: the initial render always returns the original value immediately, and debouncing only begins after mount. Choose this hook over a manual setTimeout when you need a declarative, React-friendly way to delay state propagation without managing timer lifecycle yourself.',
  tags: [
    'debounce',
    'delay',
    'search',
    'input',
    'performance',
    'timeout',
    'filter',
    'rate-limit',
    'typing',
    'throttle',
  ],
  category: 'animation',
  useCases: [
    'Prevent API spam when a user types rapidly in a search bar by only sending the request after they stop typing for a set duration',
    'Delay form validation until the user has stopped typing, avoiding jarring inline errors while they are still composing input',
    'Debounce rapidly changing values like window dimensions or scroll positions to avoid expensive re-renders or layout recalculations',
    'Implement auto-save functionality that only triggers a save request after the user stops editing for a configurable idle period',
    'Delay free-text filter application in data tables or lists so filtering does not fire on every keystroke',
    'Rate-limit expensive computations or visual updates driven by slider, range, or continuous input controls',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useDebounce.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useDebounce<T>(value: T, delay: number): T',
  typeParams: ['T'],
  returnType: 'T',
  parameters: [
    {
      name: 'value',
      type: 'T',
      required: true,
      description:
        'The value to debounce. Can be any type — string, number, boolean, object, or array. The hook tracks changes via React\'s dependency comparison, so primitive and reference types are both supported.',
    },
    {
      name: 'delay',
      type: 'number',
      required: true,
      description:
        'The debounce delay in milliseconds. The returned value will only update after this duration elapses without the input value changing. Typical values are 250–500ms for search inputs and 1000–2000ms for auto-save. Passing 0 effectively disables debouncing.',
    },
  ],
  returnValues: [
    {
      name: 'debouncedValue',
      type: 'T',
      description:
        'The delayed version of the input value. On the initial render it equals the input value immediately. On subsequent changes, it retains the previous value until the delay elapses without further changes.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Debounced Search Input',
      description:
        'A search bar that only triggers an API call after the user stops typing for 400ms, preventing excessive requests during fast typing.',
      code: `import { useDebounce } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    // Simulate API call
    const controller = new AbortController();
    fetch(\`/api/search?q=\${encodeURIComponent(debouncedQuery)}\`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setResults(data.items))
      .catch(() => {});

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full px-3 py-2 rounded-control border bg-surface text-surface-content"
      />
      {results.length > 0 && (
        <ul className="space-y-1">
          {results.map((item) => (
            <li key={item} className="px-2 py-1 text-sm rounded-md hover:bg-muted/50">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
      tags: ['search', 'input', 'api', 'fetch'],
    },
    {
      title: 'Auto-Saving Form',
      description:
        'A form that automatically saves its state to an API after the user stops editing for 1.5 seconds, providing visual feedback for the save status.',
      code: `import { useDebounce } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function AutoSaveForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const debouncedTitle = useDebounce(title, 1500);
  const debouncedBody = useDebounce(body, 1500);

  useEffect(() => {
    if (!debouncedTitle && !debouncedBody) return;

    setSaveStatus('saving');
    fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: debouncedTitle, body: debouncedBody }),
    })
      .then(() => setSaveStatus('saved'))
      .catch(() => setSaveStatus('idle'));
  }, [debouncedTitle, debouncedBody]);

  return (
    <div className="space-y-4 p-4 rounded-surface border bg-surface text-surface-content max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Edit Post</h2>
        <span className="text-xs text-muted-content">
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : ''}
        </span>
      </div>
      <input
        value={title}
        onChange={(e) => { setTitle(e.target.value); setSaveStatus('idle'); }}
        placeholder="Title"
        className="w-full px-3 py-2 rounded-control border"
      />
      <textarea
        value={body}
        onChange={(e) => { setBody(e.target.value); setSaveStatus('idle'); }}
        placeholder="Body"
        rows={5}
        className="w-full px-3 py-2 rounded-control border resize-y"
      />
    </div>
  );
}`,
      tags: ['auto-save', 'form', 'api', 'feedback'],
    },
    {
      title: 'Debounced Window Resize',
      description:
        'Debounces the window width to avoid recalculating layouts on every intermediate resize frame, only updating after the user stops resizing.',
      code: `import { useDebounce } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function ResponsiveLayout() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const debouncedWidth = useDebounce(width, 250);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = debouncedWidth >= 1024 ? 4 : debouncedWidth >= 768 ? 2 : 1;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-content">
        Viewport: {debouncedWidth}px — {columns} column{columns > 1 ? 's' : ''}
      </p>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\` }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-24 rounded-surface bg-muted/30 border" />
        ))}
      </div>
    </div>
  );
}`,
      tags: ['resize', 'responsive', 'layout', 'viewport'],
    },
    {
      title: 'Debounced Filter for Data Table',
      description:
        'A filterable list where the text filter is debounced by 300ms, so the expensive list re-rendering only happens after the user pauses typing.',
      code: `import { useDebounce } from 'vayu-ui';
import { useState, useMemo } from 'react';

const items = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer' },
  { id: 2, name: 'Bob Smith', role: 'Designer' },
  { id: 3, name: 'Charlie Lee', role: 'Engineer' },
  { id: 4, name: 'Diana Patel', role: 'Manager' },
  { id: 5, name: 'Ethan Brown', role: 'Designer' },
];

export default function DebouncedFilter() {
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 300);

  const filtered = useMemo(() => {
    if (!debouncedFilter.trim()) return items;
    const lower = debouncedFilter.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.role.toLowerCase().includes(lower),
    );
  }, [debouncedFilter]);

  return (
    <div className="space-y-3">
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by name or role..."
        className="w-full px-3 py-2 rounded-control border bg-surface text-surface-content"
      />
      <p className="text-xs text-muted-content">
        Showing {filtered.length} of {items.length}
      </p>
      <ul className="divide-y border rounded-surface">
        {filtered.map((item) => (
          <li key={item.id} className="flex justify-between px-3 py-2 text-sm">
            <span>{item.name}</span>
            <span className="text-muted-content">{item.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      tags: ['filter', 'data-table', 'list', 'search'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Setting delay to 0 or a negative number',
      bad: `const debounced = useDebounce(query, 0);`,
      good: `const debounced = useDebounce(query, 400);`,
      reason:
        'A delay of 0 means the setTimeout fires on the next event loop tick, which does not actually batch rapid changes. If you need no delay, skip the hook entirely and use the value directly.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (isEnabled) {
  const debounced = useDebounce(value, 300);
}`,
      good: `const debounced = useDebounce(isEnabled ? value : value, 300);`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useDebounce inside a conditional, loop, or nested function violates the Rules of Hooks and will cause crashes or stale state.',
    },
    {
      title: 'Using debounce for throttling',
      bad: `// Expecting this to fire every 300ms while typing
const throttled = useDebounce(query, 300);`,
      good: `// Use a proper throttle hook for periodic execution
// useDebounce only fires AFTER the user stops changing the value`,
      reason:
        'Debouncing resets the timer on every value change and only fires once after the user stops. Throttling fires at a fixed interval regardless of changes. If you need periodic updates during continuous input (e.g., live preview), use a throttle mechanism instead.',
    },
    {
      title: 'Debouncing callback functions instead of values',
      bad: `const debouncedFn = useDebounce(() => fetchResults(query), 300);
// This re-creates the function every render and debounces the reference, not the behavior`,
      good: `const debouncedQuery = useDebounce(query, 300);
useEffect(() => {
  fetchResults(debouncedQuery);
}, [debouncedQuery]);`,
      reason:
        'useDebounce is designed for values, not functions. Debouncing a callback reference compares function identity on each render, which changes every time, defeating the debounce. Instead, debounce the value and trigger the side effect with useEffect.',
    },
    {
      title: 'Expecting instant update on initial render',
      bad: `const debounced = useDebounce(initialValue, 500);
// Expecting debounced to be undefined or null on first render`,
      good: `const debounced = useDebounce(initialValue, 500);
// debounced === initialValue on first render — this is correct and SSR-safe`,
      reason:
        'On the initial render, useState is initialized with the input value directly, so the debounced value matches immediately. There is no delay on mount. This is by design for SSR compatibility — server and client will produce the same initial output.',
    },
  ],
};
