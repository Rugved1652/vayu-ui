import { HookRegistryEntry } from '../types.js';

export const useListEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-list',
  name: 'useList',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Generic state hook for managing an array with built-in add, remove, update, and clear operations, eliminating boilerplate spread/filter/map patterns.',
  longDescription:
    'Wraps React.useState<T[]> and exposes four immutable mutator functions — add(item), remove(index), update(index, newItem), and clear() — so you never need to write spread/filter/map boilerplate inside setState callbacks. Every mutator uses the functional updater form (prev => …) so it is safe under concurrent React rendering and batched updates. The hook accepts an optional initial array (defaults to []) and is fully SSR-safe since it has no browser API dependencies. Choose this over raw useState when you find yourself repeatedly writing setList(prev => […prev, item]) or setList(prev => prev.filter(…)) — useList packages those patterns into named, intent-revealing functions.',
  tags: [
    'array',
    'list',
    'state',
    'collection',
    'crud',
    'immutable',
    'generic',
    'reactive',
    'items',
    'management',
  ],
  category: 'state',
  useCases: [
    'When you need to manage a dynamic list of items (e.g. tags, todos, form fields) without repeatedly writing spread/filter/map boilerplate inside setState',
    'To build a tag input where users can add and remove tags by index without manually managing immutable array updates',
    'When creating a dynamic form with add/remove field rows and you want each row updatable by index',
    'To maintain a selection list where items can be added, removed by position, or replaced in-place without leaking mutable state',
    'When building a notification stack or toast queue that supports appending, dismissing by index, and clearing all at once',
    'To manage an ordered collection in state where the position of each item matters for rendering or further processing',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useList.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useList<T>(initialList?: T[]): { list: T[]; add: (item: T) => void; remove: (index: number) => void; update: (index: number, newItem: T) => void; clear: () => void }',
  typeParams: ['T'],
  parameters: [
    {
      name: 'initialList',
      type: 'T[]',
      required: false,
      defaultValue: '[]',
      description:
        'The starting array. Omit to begin with an empty list. The generic T is inferred from the elements you pass, so useList([{ name: "a" }]) infers T as { name: string }.',
    },
  ],
  returnType:
    '{ list: T[]; add: (item: T) => void; remove: (index: number) => void; update: (index: number, newItem: T) => void; clear: () => void }',
  returnValues: [
    {
      name: 'list',
      type: 'T[]',
      description:
        'The current array state. Read-only — never mutate this directly; use the mutator functions to trigger re-renders.',
    },
    {
      name: 'add',
      type: '(item: T) => void',
      description:
        'Appends an item to the end of the list. Internally uses the functional updater form, so it is safe under batched state updates.',
    },
    {
      name: 'remove',
      type: '(index: number) => void',
      description:
        'Removes the item at the given zero-based index. Does nothing if the index is out of bounds (filter naturally excludes it).',
    },
    {
      name: 'update',
      type: '(index: number, newItem: T) => void',
      description:
        'Replaces the item at the given zero-based index with newItem. If the index does not exist, the list is unchanged (map returns the original item).',
    },
    {
      name: 'clear',
      type: '() => void',
      description:
        'Empties the list entirely, resetting it to []. Useful for "Clear All" actions or resetting form state.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic List Manager',
      description:
        'A minimal component that lets users type an item name, add it to the list, remove any item, and clear all items.',
      code: `import { useList } from 'vayu-ui';
import { useState } from 'react';

export default function BasicListManager() {
  const { list, add, remove, clear } = useList<string>();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed) {
      add(trimmed);
      setInput('');
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add an item..."
          className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
        >
          Add
        </button>
      </div>

      {list.length > 0 && (
        <ul className="space-y-1">
          {list.map((item, i) => (
            <li key={i} className="flex items-center justify-between px-2 py-1 rounded-control bg-muted/50 text-sm">
              <span>{item}</span>
              <button onClick={() => remove(i)} className="text-destructive text-xs hover:underline">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {list.length > 0 && (
        <button onClick={clear} className="text-xs text-muted-content hover:underline">
          Clear all
        </button>
      )}
    </div>
  );
}`,
      tags: ['basic', 'add', 'remove', 'clear', 'input'],
    },
    {
      title: 'Todo List with Update',
      description:
        'A todo list that uses add, remove, and update to toggle completion status on each item by replacing it in-place.',
      code: `import { useList } from 'vayu-ui';
import { useState } from 'react';

interface Todo {
  text: string;
  done: boolean;
}

export default function TodoList() {
  const { list, add, remove, update } = useList<Todo>();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed) {
      add({ text: trimmed, done: false });
      setInput('');
    }
  };

  const toggle = (index: number) => {
    const item = list[index];
    update(index, { ...item, done: !item.done });
  };

  const remaining = list.filter((t) => !t.done).length;

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <h2 className="text-sm font-semibold">Todos ({remaining} remaining)</h2>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="What needs to be done?"
          className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
        >
          Add
        </button>
      </div>

      <ul className="space-y-1">
        {list.map((todo, i) => (
          <li key={i} className="flex items-center gap-2 px-2 py-1 rounded-control bg-muted/50 text-sm">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggle(i)}
              className="rounded-control"
            />
            <span className={todo.done ? 'line-through text-muted-content' : ''}>{todo.text}</span>
            <button
              onClick={() => remove(i)}
              className="ml-auto text-destructive text-xs hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      tags: ['todo', 'update', 'toggle', 'checkbox', 'crud'],
    },
    {
      title: 'Dynamic Form Fields',
      description:
        'A form that lets users add and remove participant rows. Each row has a name and email field, updatable by index.',
      code: `import { useList } from 'vayu-ui';

interface Participant {
  name: string;
  email: string;
}

export default function DynamicFormFields() {
  const { list, add, remove, update } = useList<Participant>();

  const handleChange = (index: number, field: keyof Participant, value: string) => {
    update(index, { ...list[index], [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Participants:', list);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-md">
      <h2 className="text-sm font-semibold">Participants</h2>

      {list.map((p, i) => (
        <div key={i} className="flex gap-2 items-start">
          <input
            value={p.name}
            onChange={(e) => handleChange(i, 'name', e.target.value)}
            placeholder="Name"
            className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
          />
          <input
            value={p.email}
            onChange={(e) => handleChange(i, 'email', e.target.value)}
            placeholder="Email"
            className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="px-2 py-1.5 text-destructive text-xs border rounded-control hover:bg-destructive/10"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => add({ name: '', email: '' })}
          className="px-3 py-1.5 rounded-control border text-sm"
        >
          + Add Row
        </button>
        {list.length > 0 && (
          <button
            type="submit"
            className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}`,
      tags: ['form', 'dynamic', 'fields', 'rows', 'participant'],
    },
    {
      title: 'Tag Input',
      description:
        'A tag input component that lets users type and press Enter to add tags, click to remove them, and clear all at once.',
      code: `import { useList } from 'vayu-ui';
import { useState } from 'react';

export default function TagInput() {
  const { list: tags, add, remove, clear } = useList<string>();
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = input.trim().toLowerCase();
      if (trimmed && !tags.includes(trimmed)) {
        add(trimmed);
        setInput('');
      }
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      remove(tags.length - 1);
    }
  };

  return (
    <div className="space-y-2 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <label className="text-sm font-medium">Tags</label>

      <div className="flex flex-wrap gap-1.5 p-2 rounded-control border bg-field min-h-[40px]">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-control bg-brand/10 text-brand text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(i)}
              className="hover:text-destructive"
              aria-label={\`Remove \${tag}\`}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? 'Type and press Enter...' : ''}
          className="flex-1 min-w-[100px] bg-transparent text-sm outline-none"
        />
      </div>

      {tags.length > 0 && (
        <button onClick={clear} className="text-xs text-muted-content hover:underline">
          Clear all tags
        </button>
      )}
    </div>
  );
}`,
      tags: ['tag', 'input', 'chips', 'clear', 'keyboard'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mutating the list array directly',
      bad: `const { list, add } = useList<string>();
list.push('new item'); // Direct mutation — no re-render`,
      good: `const { list, add } = useList<string>();
add('new item'); // Triggers a re-render with a new array`,
      reason:
        'The list reference only changes when a mutator function is called. Directly pushing, splicing, or assigning to indices mutates the existing array in place without triggering a React re-render, leading to stale UI.',
    },
    {
      title: 'Using list from the same render in an updater',
      bad: `const { list, update } = useList<number>();
const handleClick = (i: number) => {
  update(i, list[i] + 1); // list may be stale if other updates batched
};`,
      good: `const { list, update } = useList<number>();
const handleClick = (i: number) => {
  // Read from list — safe because update uses the functional updater internally,
  // but if you need the latest value, keep a local reference from the same render.
  update(i, list[i] + 1);
};`,
      reason:
        'In concurrent mode, multiple state updates may batch together. If you read list[i] from a stale closure and another update has already changed that index, you will overwrite the newer value. For critical sequential updates, consider using a single event handler or useRef to track the latest state.',
    },
    {
      title: 'Removing items while iterating with index',
      bad: `list.forEach((_, i) => {
  if (shouldRemove(i)) remove(i); // Indices shift after each removal
});`,
      good: `// Filter in a single pass, then rebuild:
const { list, clear, add } = useList<string>();
const kept = list.filter((_, i) => !shouldRemove(i));
clear();
kept.forEach((item) => add(item));

// Or better: use raw setState for batch removals:
const [, setList] = useState(list);
setList(prev => prev.filter((_, i) => !shouldRemove(i)));`,
      reason:
        'remove(i) uses filter internally, which shifts all subsequent indices down by one. Calling remove in a loop causes later indices to point to wrong elements, leading to incorrect deletions.',
    },
    {
      title: 'Ignoring the returned mutator functions and using raw setState',
      bad: `const [list, setList] = useState<string[]>([]);
// Writing manual immutable updates everywhere
setList((prev) => [...prev, 'item']);
setList((prev) => prev.filter((_, i) => i !== 2));`,
      good: `const { list, add, remove } = useList<string>();
add('item');
remove(2);`,
      reason:
        'The entire purpose of useList is to encapsulate immutable array operations behind named functions. Bypassing the mutators defeats the hook and leads to inconsistent patterns across the codebase. If you need raw setState control, use useState directly instead.',
    },
  ],
};
