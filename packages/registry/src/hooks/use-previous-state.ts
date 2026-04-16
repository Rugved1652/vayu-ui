import { HookRegistryEntry } from '../types.js';

export const usePreviousStateEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-previous-state',
  name: 'usePreviousState',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Returns the value from the previous render, or undefined on the first render, so you can compare current vs. previous state without extra bookkeeping.',
  longDescription:
    'Tracks the most recent value of any variable across React renders by storing it in a useRef that gets updated inside a useEffect. Because useEffect runs after the paint, the ref always holds the value from the *previous* render cycle on the next call — giving you a clean "before" snapshot without managing a second piece of state yourself. On the very first render the ref starts as undefined, which makes it trivial to distinguish "no previous value" from a legitimate falsy value like 0 or an empty string. The hook is fully SSR-safe: since it only uses useRef and useEffect with no browser-specific APIs, server and client produce the same initial output (undefined) with no hydration mismatch. Choose this hook over manually maintaining a prevState variable when you need a declarative, React-idiomatic way to detect value changes, compute diffs, or conditionally fire side effects only when a value actually changes.',
  tags: [
    'previous',
    'state',
    'render',
    'diff',
    'change',
    'compare',
    'history',
    'dirty',
    'undo',
    'snapshot',
  ],
  category: 'state',
  useCases: [
    'Detect whether a form has unsaved changes by comparing the current field values against their previous values, enabling a dirty-form indicator or a confirm-before-navigate prompt',
    'Display an undo label or revert button that shows what the previous value was before the user changed it (e.g., "Previously: Alice")',
    'Conditionally trigger a side effect only when a specific value actually changes between renders, such as re-fetching data when a selected ID shifts from one value to another',
    'Highlight or animate a value in the UI when it changes by comparing the current and previous values and conditionally applying a CSS transition class',
    'Track the previous page number or sort column in a paginated data table to determine whether to scroll to the top or preserve scroll position',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'usePreviousState.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function usePreviousState<T>(value: T): T | undefined',
  typeParams: ['T'],
  returnType: 'T | undefined',
  parameters: [
    {
      name: 'value',
      type: 'T',
      required: true,
      description:
        'The value whose previous render state you want to track. Can be any type — string, number, boolean, object, or array. The hook stores a reference to the value passed on the previous render cycle and returns it. On the first render, returns undefined because no previous value exists yet.',
    },
  ],
  returnValues: [
    {
      name: 'previousValue',
      type: 'T | undefined',
      description:
        'The value that was passed to this hook on the previous render. On the very first render, this is undefined. On every subsequent render it equals the value argument from the prior render cycle, allowing you to compare current vs. previous state.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Counter with Previous Value Display',
      description:
        'A simple counter that shows both the current count and the previous count, demonstrating the basic one-call usage of usePreviousState.',
      code: `import { usePreviousState } from 'vayu-ui';
import { useState } from 'react';

export default function PreviousCounter() {
  const [count, setCount] = useState(0);
  const prevCount = usePreviousState(count);

  return (
    <div className="space-y-3 p-4 rounded-surface border bg-surface text-surface-content max-w-xs">
      <h3 className="text-sm font-semibold">Counter</h3>
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
      <p className="text-xs text-muted-content">
        Previous:{' '}
        <code className="bg-muted px-1 py-0.5 rounded">{prevCount ?? 'undefined'}</code>
      </p>
    </div>
  );
}`,
      tags: ['counter', 'basic', 'display'],
    },
    {
      title: 'Dirty Form Detection',
      description:
        'A form that tracks whether any field has been modified by comparing current values against their previous snapshots, showing a "Unsaved changes" indicator.',
      code: `import { usePreviousState } from 'vayu-ui';
import { useState } from 'react';

export default function DirtyForm() {
  const [title, setTitle] = useState('My Post');
  const [status, setStatus] = useState('draft');
  const prevTitle = usePreviousState(title);
  const prevStatus = usePreviousState(status);

  const isDirty = title !== prevTitle || status !== prevStatus;

  return (
    <div className="space-y-4 p-4 rounded-surface border bg-surface text-surface-content max-w-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Edit Post</h2>
        {isDirty && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning font-medium">
            Unsaved changes
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-xs text-muted-content">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-control border bg-canvas text-canvas-content"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs text-muted-content">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 rounded-control border bg-canvas text-canvas-content"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
  );
}`,
      tags: ['form', 'dirty', 'unsaved', 'detect'],
    },
    {
      title: 'Conditional Side Effect on Value Change',
      description:
        'Fetches user data only when the selected user ID actually changes between renders, avoiding redundant API calls when the component re-renders for unrelated reasons.',
      code: `import { usePreviousState } from 'vayu-ui';
import { useState, useEffect } from 'react';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export default function UserDetail() {
  const [selectedId, setSelectedId] = useState(1);
  const [detail, setDetail] = useState<string>('');
  const prevId = usePreviousState(selectedId);

  useEffect(() => {
    if (selectedId === prevId) return;

    fetch(\`/api/users/\${selectedId}\`)
      .then((res) => res.json())
      .then((data) => setDetail(data.bio))
      .catch(() => setDetail('Failed to load'));
  }, [selectedId, prevId]);

  return (
    <div className="space-y-3 p-4 rounded-surface border bg-surface text-surface-content max-w-sm">
      <h3 className="text-sm font-semibold">User Detail</h3>
      <div className="flex gap-1.5">
        {users.map((u) => (
          <button
            key={u.id}
            onClick={() => setSelectedId(u.id)}
            className={\`px-2.5 py-1 rounded-control text-xs font-medium transition-colors \${
              selectedId === u.id
                ? 'bg-brand text-brand-content'
                : 'bg-muted text-muted-content hover:bg-elevated'
            }\`}
          >
            {u.name}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-content">
        {prevId !== undefined ? \`Changed from user \${prevId} to \${selectedId}\` : 'Initial load'}
      </p>
      <p className="text-sm">{detail || 'Loading...'}</p>
    </div>
  );
}`,
      tags: ['fetch', 'conditional', 'effect', 'api'],
    },
    {
      title: 'Value Change Animation',
      description:
        'Applies a CSS transition class when a numeric value changes direction (increase vs. decrease), providing visual feedback for the direction of change.',
      code: `import { usePreviousState } from 'vayu-ui';
import { useState } from 'react';

export default function AnimatedScore() {
  const [score, setScore] = useState(50);
  const prevScore = usePreviousState(score);

  const direction =
    prevScore === undefined
      ? 'neutral'
      : score > prevScore
        ? 'up'
        : score < prevScore
          ? 'down'
          : 'neutral';

  return (
    <div className="space-y-3 p-4 rounded-surface border bg-surface text-surface-content max-w-xs text-center">
      <h3 className="text-sm font-semibold">Score</h3>
      <span
        className={\`text-4xl font-bold tabular-nums transition-colors duration-300 \${
          direction === 'up'
            ? 'text-success'
            : direction === 'down'
              ? 'text-destructive'
              : 'text-surface-content'
        }\`}
      >
        {score}
      </span>
      {prevScore !== undefined && direction !== 'neutral' && (
        <p className="text-xs text-muted-content">
          {direction === 'up' ? '↑' : '↓'} Changed by {Math.abs(score - prevScore)}
        </p>
      )}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setScore((s) => Math.max(0, s - 10))}
          className="px-3 py-1.5 rounded-control border text-sm hover:bg-muted"
        >
          −10
        </button>
        <button
          onClick={() => setScore((s) => Math.min(100, s + 10))}
          className="px-3 py-1.5 rounded-control border text-sm hover:bg-muted"
        >
          +10
        </button>
      </div>
    </div>
  );
}`,
      tags: ['animation', 'transition', 'direction', 'visual'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Expecting the previous value on the first render',
      bad: `const prev = usePreviousState(count);
// Expecting prev to be the initial value of count on first render
console.log(prev); // undefined`,
      good: `const prev = usePreviousState(count);
// Always check for undefined on first render
if (prev !== undefined) {
  console.log('Changed from', prev, 'to', count);
}`,
      reason:
        'On the very first render, the ref has not been populated by a useEffect yet, so the return value is undefined. This is by design — it lets you distinguish "no previous value" from a legitimate falsy previous value like 0, false, or "". Always guard against undefined.',
    },
    {
      title: 'Using for derived state that can be computed inline',
      bad: `const [items, setItems] = useState([]);
const prevLength = usePreviousState(items.length);
const grew = prevLength !== undefined && items.length > prevLength;`,
      good: `const [items, setItems] = useState([]);
// If you just need the count, track it directly
const [prevLength, setPrevLength] = useState(items.length);
const grew = items.length > prevLength;
// Or use usePreviousState only when you actually need to diff complex state`,
      reason:
        'If the "previous" value is simple derived data that can be tracked with a second useState or computed from a single source of truth, adding usePreviousState may be over-engineering. Reserve it for cases where you genuinely need to compare arbitrary values across renders without adding extra state management.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (shouldTrack) {
  const prev = usePreviousState(value);
}`,
      good: `const prev = usePreviousState(shouldTrack ? value : value);
// Or always call it and ignore the result when not needed
const prev = usePreviousState(value);`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling usePreviousState inside a conditional, loop, or nested function violates the Rules of Hooks and will cause crashes or stale refs. Always call hooks at the top level.',
    },
    {
      title: 'Expecting synchronous update within the same render',
      bad: `const prev = usePreviousState(count);
setCount(count + 1);
// Expecting prev to reflect the new count immediately
console.log(prev); // Still the value from the *previous* render`,
      good: `const prev = usePreviousState(count);
// prev reflects the value from the last completed render cycle.
// It will NOT update until the next render.
setCount(count + 1);
// On the NEXT render, prev will equal the current count`,
      reason:
        'usePreviousState stores the value via useEffect, which runs after paint. Within the current render, the returned value is always from the previous completed render cycle. It will never reflect state updates made during the same render — those only become visible on the next render.',
    },
  ],
};
