import { HookRegistryEntry } from '../types.js';

export const useQueueEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-queue',
  name: 'useQueue',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Generic state hook for managing a FIFO queue with enqueue, dequeue, peek, and clear operations — eliminating manual array shift/splice boilerplate.',
  longDescription:
    'Wraps React.useState<T[]> and exposes three immutable mutator functions — add(item) to enqueue to the back, remove() to dequeue from the front, and clear() to empty the queue — along with convenience accessors first, last, and size. Every mutator uses the functional updater form (prev => …) so it is safe under concurrent React rendering and batched updates. The hook requires no arguments and is fully SSR-safe since it has no browser API dependencies. Choose this over raw useState when you need first-in-first-out semantics — for example, task queues, notification stacks, print job managers, or any scenario where items must be processed in arrival order. Unlike useList which gives index-based access, useQueue enforces FIFO discipline by only allowing removal from the front.',
  tags: [
    'queue',
    'fifo',
    'enqueue',
    'dequeue',
    'state',
    'collection',
    'task-queue',
    'notification',
    'immutable',
    'generic',
  ],
  category: 'state',
  useCases: [
    'When you need to manage a first-in-first-out task queue where items are added to the back and processed from the front',
    'To build a notification or toast system where messages appear in order and are dismissed from the front of the queue',
    'When implementing a print job or upload queue that processes items sequentially in arrival order',
    'To manage a playlist or media queue where users add tracks to the end and the current track is consumed from the front',
    'When building a batch API processor that enqueues requests and processes them one at a time in order',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useQueue.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useQueue<T>(): { queue: T[]; first: T | undefined; last: T | undefined; size: number; add: (item: T) => void; remove: () => void; clear: () => void }',
  typeParams: ['T'],
  parameters: [],
  returnType:
    '{ queue: T[]; first: T | undefined; last: T | undefined; size: number; add: (item: T) => void; remove: () => void; clear: () => void }',
  returnValues: [
    {
      name: 'queue',
      type: 'T[]',
      description:
        'The current queue array in FIFO order, with the oldest item at index 0. Read-only — never mutate this directly; use add, remove, or clear to trigger re-renders.',
    },
    {
      name: 'first',
      type: 'T | undefined',
      description:
        'The item at the front of the queue (oldest, next to be dequeued). Returns undefined when the queue is empty. Useful for peeking at the next item without removing it.',
    },
    {
      name: 'last',
      type: 'T | undefined',
      description:
        'The item at the back of the queue (most recently enqueued). Returns undefined when the queue is empty. Useful for confirming what was just added.',
    },
    {
      name: 'size',
      type: 'number',
      description:
        'The current number of items in the queue. Equivalent to queue.length but provided as a convenience accessor for conditional rendering and display.',
    },
    {
      name: 'add',
      type: '(item: T) => void',
      description:
        'Enqueues an item to the back of the queue. Internally uses the functional updater form, so it is safe under batched state updates and concurrent rendering.',
    },
    {
      name: 'remove',
      type: '() => void',
      description:
        'Dequeues the item from the front of the queue (FIFO). If the queue is empty, this is a no-op — it does not throw and simply leaves the queue unchanged.',
    },
    {
      name: 'clear',
      type: '() => void',
      description:
        'Empties the queue entirely, resetting it to []. Useful for "Clear All" actions, resetting state, or cancelling all pending items.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Task Queue Manager',
      description:
        'A minimal task queue where users add tasks, view the next task to process, and dequeue tasks one by one.',
      code: `import { useQueue } from 'vayu-ui';
import { useState } from 'react';

export default function TaskQueueManager() {
  const { queue, first, size, add, remove, clear } = useQueue<string>();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed) {
      add(trimmed);
      setInput('');
    }
  };

  const handleProcess = () => {
    if (size > 0) {
      console.log('Processing:', first);
      remove();
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <h2 className="text-sm font-semibold">Task Queue ({size} pending)</h2>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a task..."
          className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
        >
          Enqueue
        </button>
      </div>

      {first && (
        <div className="px-3 py-2 rounded-control bg-muted/50 text-sm">
          <span className="text-muted-content text-xs">Next up:</span>{' '}
          <span className="font-medium">{first}</span>
          <button
            onClick={handleProcess}
            className="ml-2 text-brand text-xs hover:underline"
          >
            Process
          </button>
        </div>
      )}

      {size > 0 && (
        <ul className="space-y-1">
          {queue.map((task, i) => (
            <li
              key={i}
              className="flex items-center gap-2 px-2 py-1 rounded-control bg-muted/30 text-sm"
            >
              <span className="text-muted-content text-xs">{i + 1}.</span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      )}

      {size > 0 && (
        <button onClick={clear} className="text-xs text-muted-content hover:underline">
          Clear all tasks
        </button>
      )}
    </div>
  );
}`,
      tags: ['task', 'queue', 'fifo', 'process', 'dequeue'],
    },
    {
      title: 'Notification Queue',
      description:
        'A notification system that enqueues messages and auto-dismisses them from the front after a delay, with manual dismiss support.',
      code: `import { useQueue } from 'vayu-ui';
import { useState, useEffect, useCallback } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

let nextId = 0;

export default function NotificationQueue() {
  const { queue, first, size, add, remove, clear } = useQueue<Notification>();
  const [input, setInput] = useState('');
  const [type, setType] = useState<Notification['type']>('info');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed) {
      add({ id: nextId++, message: trimmed, type });
      setInput('');
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <h2 className="text-sm font-semibold">Notifications ({size} queued)</h2>

      <div className="flex gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as Notification['type'])}
          className="px-2 py-1.5 rounded-control border bg-field text-sm"
        >
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="error">Error</option>
        </select>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Notification text..."
          className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
        >
          Add
        </button>
      </div>

      {first && (
        <div
          className="flex items-center justify-between px-3 py-2 rounded-control text-sm font-medium"
          style={{
            backgroundColor:
              first.type === 'success'
                ? 'var(--color-success)'
                : first.type === 'error'
                  ? 'var(--color-destructive)'
                  : 'var(--color-info)',
            color: 'white',
          }}
        >
          <span>{first.message}</span>
          <button
            onClick={remove}
            className="ml-2 text-white/80 hover:text-white text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {size > 1 && (
        <p className="text-xs text-muted-content">
          {size - 1} more notification{size - 1 > 1 ? 's' : ''} waiting
        </p>
      )}

      {size > 0 && (
        <button onClick={clear} className="text-xs text-muted-content hover:underline">
          Dismiss all
        </button>
      )}
    </div>
  );
}`,
      tags: ['notification', 'toast', 'queue', 'dismiss', 'auto'],
    },
    {
      title: 'Print Job Queue with Peeking',
      description:
        'A print job manager that enqueues documents, shows the currently printing job, and lets users process or cancel jobs in FIFO order.',
      code: `import { useQueue } from 'vayu-ui';
import { useState } from 'react';

interface PrintJob {
  documentName: string;
  pages: number;
  submittedBy: string;
}

export default function PrintJobQueue() {
  const { queue, first, last, size, add, remove, clear } = useQueue<PrintJob>();
  const [docName, setDocName] = useState('');
  const [pages, setPages] = useState('1');
  const [user, setUser] = useState('');

  const handleSubmit = () => {
    const trimmedDoc = docName.trim();
    const trimmedUser = user.trim();
    const pageCount = parseInt(pages, 10);
    if (trimmedDoc && trimmedUser && pageCount > 0) {
      add({ documentName: trimmedDoc, pages: pageCount, submittedBy: trimmedUser });
      setDocName('');
      setPages('1');
      setUser('');
    }
  };

  const totalPages = queue.reduce((sum, job) => sum + job.pages, 0);

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Print Queue</h2>
        <span className="text-xs text-muted-content">
          {size} job{size !== 1 ? 's' : ''} · {totalPages} page{totalPages !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <input
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          placeholder="Document"
          className="px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <input
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="Pages"
          type="number"
          min="1"
          className="px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User"
          className="px-3 py-1.5 rounded-control border bg-field text-sm"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
      >
        Submit Print Job
      </button>

      {first && (
        <div className="px-3 py-2 rounded-control border-2 border-brand/30 bg-brand/5 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              Printing: {first.documentName} ({first.pages} pg)
            </span>
            <button
              onClick={remove}
              className="text-brand text-xs hover:underline"
            >
              Complete
            </button>
          </div>
          <span className="text-xs text-muted-content">by {first.submittedBy}</span>
        </div>
      )}

      {size > 1 && (
        <ul className="space-y-1">
          {queue.slice(1).map((job, i) => (
            <li
              key={i}
              className="flex items-center justify-between px-2 py-1 rounded-control bg-muted/30 text-sm"
            >
              <span>
                {job.documentName} ({job.pages} pg) — {job.submittedBy}
              </span>
              <span className="text-xs text-muted-content">#{i + 2}</span>
            </li>
          ))}
        </ul>
      )}

      {size > 0 && (
        <button onClick={clear} className="text-xs text-destructive hover:underline">
          Cancel all jobs
        </button>
      )}
    </div>
  );
}`,
      tags: ['print', 'job', 'queue', 'fifo', 'peek'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mutating the queue array directly',
      bad: `const { queue, add } = useQueue<string>();
queue.push('task'); // Direct mutation — no re-render`,
      good: `const { queue, add } = useQueue<string>();
add('task'); // Triggers a re-render with a new array`,
      reason:
        'The queue reference only changes when a mutator function is called. Directly pushing, shifting, or splicing the array mutates it in place without triggering a React re-render, leading to stale UI.',
    },
    {
      title: 'Treating the queue as a stack (LIFO)',
      bad: `const { queue, add, remove } = useQueue<string>();
// Expecting remove() to pop the LAST item (stack behavior)
add('first');
add('second');
remove(); // Removes 'first', not 'second'!`,
      good: `// useQueue is FIFO — remove() always dequeues the front (oldest) item.
// If you need LIFO/stack semantics, use a dedicated stack hook or useList.
const { add, remove, first } = useQueue<string>();
add('first');
add('second');
remove(); // Correctly removes 'first' (FIFO order)`,
      reason:
        'useQueue enforces FIFO semantics: remove() always dequeues from the front (index 0), not the back. If you need last-in-first-out behavior, use useList or implement a custom stack instead.',
    },
    {
      title: 'Using the queue for large datasets',
      bad: `const { queue, add, remove } = useQueue<string>();
// Enqueuing 100,000 items — each add creates a new array copy
for (let i = 0; i < 100000; i++) {
  add(\`item-\${i}\`); // O(n) per add = O(n²) total
}`,
      good: `// For large datasets, use a linked-list-based queue library
// or batch your initial state into a single setState call:
const [queue, setQueue] = useState(() =>
  Array.from({ length: 100000 }, (_, i) => \`item-\${i}\`)
);
// Then use useQueue for incremental operations only`,
      reason:
        'useQueue uses an array internally, so add() is O(n) due to array spread and remove() is O(n) due to slice. For queues with thousands of items, this creates excessive GC pressure and slow renders. Use a proper linked-list queue data structure for large-scale scenarios.',
    },
    {
      title: 'Not handling undefined first/last on empty queue',
      bad: `const { first, remove } = useQueue<string>();
// Assuming first is always a string — will crash at runtime when empty
const uppercased = first.toUpperCase(); // TypeError: Cannot read properties of undefined`,
      good: `const { first, size, remove } = useQueue<string>();
if (size > 0 && first) {
  const uppercased = first.toUpperCase(); // Safe — queue is non-empty
}`,
      reason:
        'first and last return T | undefined — they are undefined when the queue is empty. Always check size > 0 or use optional chaining before accessing properties on these values to avoid runtime TypeErrors.',
    },
  ],
};
