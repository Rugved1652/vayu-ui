import { HookRegistryEntry } from '../types.js';

export const useSetEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-set',
  name: 'useSet',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Generic state hook for managing a Set with built-in add, remove, clear, and has operations, guaranteeing uniqueness without manual duplicate-checking boilerplate.',
  longDescription:
    'Wraps React.useState<Set<T>> and exposes four functions — add(value) to insert, remove(value) to delete, clear() to empty, and has(value) for O(1) membership checks — so you never need to write duplicate-filtering logic or new Set(prev) boilerplate inside setState callbacks. Every mutator uses the functional updater form (prev => …), creating a new Set instance on each call so it is safe under concurrent React rendering and batched updates. The hook accepts optional initialValues (an array that is passed to the Set constructor) to pre-populate the Set. It is fully SSR-safe since it has no browser API dependencies. Choose this over raw useState when you need a collection that guarantees uniqueness — unlike useList which allows duplicates, useSet silently ignores duplicate additions via the native Set semantics. The generic <T> supports any value type, though primitive types (strings, numbers) are recommended since Set uses SameValueZero equality. For key-value pairs, use useMap instead.',
  tags: [
    'set',
    'unique',
    'state',
    'collection',
    'membership',
    'deduplication',
    'immutable',
    'reactive',
    'generic',
    'lookup',
  ],
  category: 'state',
  useCases: [
    'When you need a collection of unique values where duplicates must be silently ignored, such as selected IDs, active filters, or tagged items, without manually checking before every add',
    'To build a tag input or chip selector where users can add tags but duplicates are automatically prevented without extra validation logic',
    'When implementing a permission or feature guard that checks membership with O(1) lookups — e.g., checking if a user has a specific role or if a feature is enabled',
    'To deduplicate a list of values — convert an array with duplicates into a Set, then spread back to an array for unique items',
    'When tracking selected items in a multi-select UI where each item can only be selected once, and you need fast has() checks for conditional styling',
    'To manage a transient "seen" or "visited" tracker — add items as they are encountered and use has() to skip already-processed entries',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useSet.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useSet<T>(initialValues?: T[]): { set: Set<T>; add: (value: T) => void; remove: (value: T) => void; clear: () => void; has: (value: T) => boolean }',
  typeParams: ['T'],
  parameters: [
    {
      name: 'initialValues',
      type: 'T[]',
      required: false,
      defaultValue: 'undefined',
      description:
        'Optional array of initial values passed to the Set constructor. Duplicates in the array are automatically collapsed by Set semantics. When omitted, the Set starts empty. The generic T is inferred from the elements you pass, so useSet(["a", "b"]) infers T as string.',
    },
  ],
  returnType:
    '{ set: Set<T>; add: (value: T) => void; remove: (value: T) => void; clear: () => void; has: (value: T) => boolean }',
  returnValues: [
    {
      name: 'set',
      type: 'Set<T>',
      description:
        'The current Set instance. Read-only — never mutate this directly (no .add, .delete, or .clear on this reference). Use the returned mutator functions to trigger re-renders.',
    },
    {
      name: 'add',
      type: '(value: T) => void',
      description:
        'Adds a value to the Set. If the value already exists, this is a no-op — Set silently ignores duplicates. Internally creates a new Set via the functional updater form, so concurrent batched updates are safe.',
    },
    {
      name: 'remove',
      type: '(value: T) => void',
      description:
        'Deletes the given value from the Set. Does nothing if the value does not exist (Set.delete returns false for missing values). Creates a new Set instance to trigger a re-render.',
    },
    {
      name: 'clear',
      type: '() => void',
      description:
        'Removes all values from the Set, resetting it to an empty Set. Useful for "Clear All" or reset actions.',
    },
    {
      name: 'has',
      type: '(value: T) => boolean',
      description:
        "Returns true if the Set contains the given value. This reads from the current render's Set instance, so it reflects the state at the time of the last render — not pending mutator calls. Provides O(1) lookup performance.",
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Set Manager',
      description:
        'A minimal component that lets users add unique values to a Set, remove individual items, check membership, and clear all.',
      code: `'use client';
import { useSet } from 'vayu-ui';
import { useState } from 'react';

export default function BasicSetManager() {
  const { set, add, remove, clear, has } = useSet<string>();
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
      <h2 className="text-sm font-semibold">Unique Items ({set.size})</h2>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add unique item..."
          className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
        >
          Add
        </button>
      </div>

      {set.size > 0 && (
        <ul className="space-y-1">
          {Array.from(set).map((item) => (
            <li
              key={item}
              className="flex items-center justify-between px-2 py-1 rounded-control bg-muted/50 text-sm"
            >
              <span>{item}</span>
              <button
                onClick={() => remove(item)}
                className="text-destructive text-xs hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {set.size > 0 && (
        <button onClick={clear} className="text-xs text-muted-content hover:underline">
          Clear all
        </button>
      )}
    </div>
  );
}`,
      tags: ['basic', 'add', 'remove', 'clear', 'unique'],
    },
    {
      title: 'Tag Input with Duplicate Prevention',
      description:
        'A tag input where pressing Enter adds a tag, duplicates are silently ignored, and existing tags can be removed individually.',
      code: `'use client';
import { useSet } from 'vayu-ui';
import { useState } from 'react';

export default function TagInput() {
  const { set: tags, add, remove, clear, has } = useSet<string>(['react', 'typescript']);
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = input.trim().toLowerCase();
      if (trimmed) {
        add(trimmed);
        setInput('');
      }
    } else if (e.key === 'Backspace' && input === '' && tags.size > 0) {
      const lastTag = Array.from(tags).pop();
      if (lastTag) remove(lastTag);
    }
  };

  return (
    <div className="space-y-2 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <label className="text-sm font-medium">Tags</label>

      <div className="flex flex-wrap gap-1.5 p-2 rounded-control border bg-field min-h-[40px]">
        {Array.from(tags).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-control bg-brand/10 text-brand text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
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
          placeholder={tags.size === 0 ? 'Type and press Enter...' : ''}
          className="flex-1 min-w-[100px] bg-transparent text-sm outline-none"
        />
      </div>

      {input.trim() && (
        <p className="text-xs text-muted-content">
          {has(input.trim().toLowerCase())
            ? \`"\${input.trim().toLowerCase()}" already exists — duplicate will be ignored\`
            : 'Press Enter to add'}
        </p>
      )}

      {tags.size > 0 && (
        <button onClick={clear} className="text-xs text-muted-content hover:underline">
          Clear all tags
        </button>
      )}
    </div>
  );
}`,
      tags: ['tag', 'input', 'chips', 'duplicate', 'keyboard'],
    },
    {
      title: 'Permission Guard with has() Checks',
      description:
        'Tracks active user permissions as a Set of strings, using has() for O(1) membership checks to conditionally render UI elements.',
      code: `'use client';
import { useSet } from 'vayu-ui';

const ALL_PERMISSIONS = ['dashboard.view', 'dashboard.edit', 'users.view', 'users.manage', 'settings.read', 'settings.write'] as const;

export default function PermissionGuard() {
  const { set: activePermissions, add, remove, has, clear } = useSet<string>([
    'dashboard.view',
    'users.view',
  ]);

  const toggle = (perm: string) => {
    if (has(perm)) {
      remove(perm);
    } else {
      add(perm);
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-md">
      <h2 className="text-sm font-semibold">Permissions ({activePermissions.size} active)</h2>

      <div className="space-y-1">
        {ALL_PERMISSIONS.map((perm) => (
          <label key={perm} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={has(perm)}
              onChange={() => toggle(perm)}
              className="rounded-control"
            />
            <span className={has(perm) ? 'text-success font-medium' : 'text-muted-content'}>
              {perm}
            </span>
          </label>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => ALL_PERMISSIONS.forEach((p) => add(p))}
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-xs font-medium"
        >
          Grant all
        </button>
        <button
          onClick={clear}
          className="px-3 py-1.5 rounded-control border text-xs text-muted-content"
        >
          Revoke all
        </button>
      </div>

      <div className="px-3 py-2 rounded-control bg-muted/50 text-xs text-muted-content">
        <strong>Access:</strong>{' '}
        {has('dashboard.edit') ? 'Full dashboard' : has('dashboard.view') ? 'View-only dashboard' : 'No dashboard access'}
        {' | '}
        {has('users.manage') ? 'User admin' : has('users.view') ? 'User viewer' : 'No user access'}
      </div>
    </div>
  );
}`,
      tags: ['permissions', 'guard', 'membership', 'toggle', 'access-control'],
    },
    {
      title: 'Multi-Select Filter with Set',
      description:
        'A filter bar where users toggle category filters. Selected filters are stored in a Set for uniqueness and fast has() checks during rendering.',
      code: `'use client';
import { useSet } from 'vayu-ui';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Food'] as const;

const PRODUCTS = [
  { name: 'Laptop', category: 'Electronics' },
  { name: 'T-Shirt', category: 'Clothing' },
  { name: 'Novel', category: 'Books' },
  { name: 'Headphones', category: 'Electronics' },
  { name: 'Football', category: 'Sports' },
  { name: 'Blender', category: 'Home' },
  { name: 'JavaScript Guide', category: 'Books' },
  { name: 'Running Shoes', category: 'Sports' },
];

export default function MultiSelectFilter() {
  const { set: selected, add, remove, has, clear } = useSet<string>();

  const toggle = (category: string) => {
    if (has(category)) {
      remove(category);
    } else {
      add(category);
    }
  };

  const filteredProducts =
    selected.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => has(p.category));

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Categories</h2>
        {selected.size > 0 && (
          <button onClick={clear} className="text-xs text-muted-content hover:underline">
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={\`px-2.5 py-1 rounded-control text-xs font-medium transition-colors \${
              has(cat)
                ? 'bg-brand text-brand-content'
                : 'bg-muted text-muted-content hover:bg-muted/80'
            }\`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-content">
          Showing {filteredProducts.length} of {PRODUCTS.length} products
          {selected.size > 0 && \` · Filtered by: \${Array.from(selected).join(', ')}\`}
        </p>

        <ul className="space-y-1">
          {filteredProducts.map((product) => (
            <li
              key={product.name}
              className="flex items-center justify-between px-3 py-1.5 rounded-control bg-muted/50 text-sm"
            >
              <span>{product.name}</span>
              <span className="text-xs text-muted-content">{product.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`,
      tags: ['filter', 'multi-select', 'toggle', 'category', 'unique'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mutating the Set instance directly',
      bad: `const { set, add } = useSet<string>();
set.add('value'); // Direct mutation — no re-render`,
      good: `const { set, add } = useSet<string>();
add('value'); // Creates a new Set, triggers re-render`,
      reason:
        'The set reference only changes when a mutator function is called. Calling .add(), .delete(), or .clear() on the Set directly mutates it in place without creating a new reference, so React does not detect the change and the UI stays stale.',
    },
    {
      title: 'Iterating the Set directly in JSX',
      bad: `{set.forEach((value) => (
  <div key={value}>{value}</div>
))}`,
      good: `{Array.from(set).map((value) => (
  <div key={value}>{value}</div>
))}`,
      reason:
        'Set.forEach does not return an array, so React cannot use it as a valid JSX expression. Always convert the Set to an array using Array.from(set) or the spread operator [...set] before mapping over it in JSX.',
    },
    {
      title: 'Using the Set for ordered data',
      bad: `const { set, add } = useSet<string>();
// Expecting items to maintain insertion order for rendering
add('first');
add('second');
add('third');
// JS Sets DO preserve insertion order, but this is an implementation detail
// — if you need ordered indexed access, use useList instead`,
      good: `// If order matters and you need index-based access, use useList:
const { list, add } = useList<string>();
add('first');
add('second');

// If you only need uniqueness and membership checks, useSet is correct:
const { set, has, add } = useSet<string>();
add('item');
has('item'); // true`,
      reason:
        'While JavaScript Sets technically preserve insertion order, useSet is designed for uniqueness and membership checks, not ordered access. If you need to sort, index, or reorder items, useList provides a more appropriate API with update() and index-based remove().',
    },
    {
      title: 'Using non-primitive values that break equality',
      bad: `const { set, add, has } = useSet<object>();
add({ id: 1 });
has({ id: 1 }); // false — different object reference`,
      good: `const { set, add, has } = useSet<number>();
add(1);
has(1); // true — primitive value equality`,
      reason:
        'Set uses SameValueZero for equality. While object values are technically allowed, each inline object literal creates a new reference that will never match an existing entry. Use primitive types (strings, numbers) as Set values to ensure has() and duplicate prevention work correctly.',
    },
    {
      title: 'Reading stale state from has() inside event handlers',
      bad: `const { set, add, has } = useSet<string>();

const handleClick = () => {
  add('item');
  if (has('item')) {
    // has() still reads the OLD Set — add() hasn't re-rendered yet
    console.log('item exists'); // May not print on first call
  }
};`,
      good: `const { set, add, has } = useSet<string>();

const handleClick = () => {
  add('item');
  // has() reflects the current render's state, not the pending update.
  // Track locally if you need to react immediately:
  console.log('Item will be added');
};

// Or read after re-render:
useEffect(() => {
  if (has('item')) {
    console.log('item exists after render');
  }
}, [set]);`,
      reason:
        "has() reads from the Set captured during the current render. Calling add() schedules a state update but does not synchronously update the Set reference. Inside the same event handler, has() will return the pre-update value. Use useEffect or track the value locally if you need to react to the new state immediately.",
    },
  ],
};
