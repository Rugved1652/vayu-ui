import { HookRegistryEntry } from '../types.js';

export const useMapEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-map',
  name: 'useMap',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Generic state hook for managing a Map with built-in set, remove, clear, and has operations, eliminating manual immutable Map boilerplate inside setState callbacks.',
  longDescription:
    'Wraps React.useState<Map<K, V>> and exposes four immutable mutator functions — set(key, value), remove(key), clear(), and has(key) — so you never need to write new Map(prev).set(…) boilerplate inside setState callbacks. Every mutator uses the functional updater form (prev => …), creating a new Map instance on each call so it is safe under concurrent React rendering and batched updates. The hook accepts optional initialEntries (an array of [K, V] tuples) to pre-populate the Map. It is fully SSR-safe since it has no browser API dependencies. Choose this over raw useState when you need key-value state with unique keys — unlike useList which manages ordered arrays, useMap guarantees key uniqueness and provides O(1) lookups via the native Map.has() method. The dual generics <K, V> allow any key type (not just strings), making it suitable for object-keyed caches, DOM element mappings, and enum-keyed feature flags.',
  tags: [
    'map',
    'state',
    'key-value',
    'collection',
    'crud',
    'immutable',
    'dictionary',
    'lookup',
    'reactive',
    'generic',
  ],
  category: 'state',
  useCases: [
    'When you need key-value state with unique keys and O(1) lookups, such as a dictionary or lookup table, without repeatedly writing new Map(prev).set(…) inside setState',
    'To manage user permissions or feature flags keyed by string or enum identifiers where each key maps to a boolean or config object',
    'When building a multi-select UI where selected items are tracked by a unique ID, and you need fast existence checks without scanning an array',
    'To cache API responses or computed values keyed by request parameters, ensuring duplicate keys overwrite rather than accumulate',
    'When maintaining a mapping from DOM elements or IDs to metadata (e.g., hover states, ref associations) where object identity matters as a key',
    'To track form field errors keyed by field name, allowing individual errors to be set, removed, and checked without reimplementing Map logic',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useMap.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useMap<K, V>(initialEntries?: [K, V][]): { map: Map<K, V>; set: (key: K, value: V) => void; remove: (key: K) => void; clear: () => void; has: (key: K) => boolean }',
  typeParams: ['K', 'V'],
  parameters: [
    {
      name: 'initialEntries',
      type: '[K, V][]',
      required: false,
      defaultValue: 'undefined',
      description:
        'Optional array of key-value tuples to pre-populate the Map. When omitted, the Map starts empty. The generics K and V are inferred from the tuples you pass, so useMap([["age", 25]]) infers K as string and V as number.',
    },
  ],
  returnType:
    '{ map: Map<K, V>; set: (key: K, value: V) => void; remove: (key: K) => void; clear: () => void; has: (key: K) => boolean }',
  returnValues: [
    {
      name: 'map',
      type: 'Map<K, V>',
      description:
        'The current Map instance. Read-only — never mutate this directly (no .set, .delete, or .clear on this reference). Use the returned mutator functions to trigger re-renders.',
    },
    {
      name: 'set',
      type: '(key: K, value: V) => void',
      description:
        'Sets or overwrites a key-value pair. Internally creates a new Map via the functional updater form, so concurrent batched updates are safe. If the key already exists, its value is replaced without changing insertion order.',
    },
    {
      name: 'remove',
      type: '(key: K) => void',
      description:
        'Deletes the entry for the given key. Does nothing if the key does not exist (Map.delete returns false for missing keys). Creates a new Map instance to trigger a re-render.',
    },
    {
      name: 'clear',
      type: '() => void',
      description:
        'Removes all entries from the Map, resetting it to an empty Map. Useful for "Clear All" or reset actions.',
    },
    {
      name: 'has',
      type: '(key: K) => boolean',
      description:
        'Returns true if the Map contains the given key. This reads from the current render\'s Map instance, so it reflects the state at the time of the last render — not pending mutator calls.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Map Manager',
      description:
        'A minimal component that lets users add key-value entries, remove by key, check existence, and clear the Map.',
      code: `'use client';
import { useMap } from 'vayu-ui';
import { useState } from 'react';

export default function BasicMapManager() {
  const { map, set, remove, clear, has } = useMap<string, string>();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const trimmedKey = key.trim();
    const trimmedValue = value.trim();
    if (trimmedKey && trimmedValue) {
      set(trimmedKey, trimmedValue);
      setKey('');
      setValue('');
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <div className="flex gap-2">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Key"
          className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="flex-1 px-3 py-1.5 rounded-control border bg-field text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
        >
          Set
        </button>
      </div>

      {map.size > 0 && (
        <ul className="space-y-1">
          {[...map.entries()].map(([k, v]) => (
            <li key={k} className="flex items-center justify-between px-2 py-1 rounded-control bg-muted/50 text-sm">
              <span>
                <strong>{k}</strong>: {v}
              </span>
              <button
                onClick={() => remove(k)}
                className="text-destructive text-xs hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {map.size > 0 && (
        <button onClick={clear} className="text-xs text-muted-content hover:underline">
          Clear all
        </button>
      )}
    </div>
  );
}`,
      tags: ['basic', 'set', 'remove', 'clear', 'key-value'],
    },
    {
      title: 'User Permissions Lookup',
      description:
        'Tracks user permissions as a boolean Map keyed by permission name, with toggle and check functionality.',
      code: `'use client';
import { useMap } from 'vayu-ui';

const PERMISSIONS = ['read', 'write', 'delete', 'admin'] as const;

export default function PermissionsPanel() {
  const { map, set, remove, has, clear } = useMap<string, boolean>([
    ['read', true],
    ['write', false],
  ]);

  const toggle = (perm: string) => {
    if (has(perm)) {
      remove(perm);
    } else {
      set(perm, true);
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <h2 className="text-sm font-semibold">Permissions</h2>

      <div className="space-y-1">
        {PERMISSIONS.map((perm) => (
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
          onClick={() => PERMISSIONS.forEach((p) => set(p, true))}
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

      <p className="text-xs text-muted-content">
        Active: {[...map.keys()].filter((k) => has(k)).join(', ') || 'none'}
      </p>
    </div>
  );
}`,
      tags: ['permissions', 'toggle', 'lookup', 'checkbox', 'access-control'],
    },
    {
      title: 'Feature Flags',
      description:
        'Manages feature flags as a Map keyed by flag name with typed config objects, demonstrating non-string value generics.',
      code: `'use client';
import { useMap } from 'vayu-ui';

interface FlagConfig {
  enabled: boolean;
  description: string;
}

const INITIAL_FLAGS: [string, FlagConfig][] = [
  ['dark-mode', { enabled: true, description: 'Dark theme support' }],
  ['new-dashboard', { enabled: false, description: 'Redesigned dashboard layout' }],
  ['beta-api', { enabled: false, description: 'Beta API endpoints' }],
];

export default function FeatureFlags() {
  const { map, set, has } = useMap<string, FlagConfig>(INITIAL_FLAGS);

  const toggle = (flag: string) => {
    const config = map.get(flag);
    if (config) {
      set(flag, { ...config, enabled: !config.enabled });
    }
  };

  return (
    <div className="space-y-2 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-md">
      <h2 className="text-sm font-semibold">Feature Flags</h2>

      {[...map.entries()].map(([flag, config]) => (
        <div
          key={flag}
          className="flex items-center justify-between px-3 py-2 rounded-control bg-muted/50 text-sm"
        >
          <div>
            <p className="font-medium">{flag}</p>
            <p className="text-xs text-muted-content">{config.description}</p>
          </div>
          <button
            onClick={() => toggle(flag)}
            className={\`px-2.5 py-1 rounded-control text-xs font-medium transition-colors \${
              config.enabled
                ? 'bg-success/15 text-success'
                : 'bg-muted text-muted-content'
            }\`}
          >
            {config.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      ))}
    </div>
  );
}`,
      tags: ['feature-flags', 'config', 'toggle', 'object-value', 'settings'],
    },
    {
      title: 'Multi-Select with Counts',
      description:
        'Tracks selected items and their quantities using a Map, demonstrating numeric value generics for a shopping cart or quantity picker.',
      code: `'use client';
import { useMap } from 'vayu-ui';

const PRODUCTS = [
  { id: 'apple', name: 'Apple', price: 1.5 },
  { id: 'banana', name: 'Banana', price: 0.75 },
  { id: 'cherry', name: 'Cherry', price: 3.0 },
  { id: 'date', name: 'Date', price: 2.25 },
];

export default function QuantityPicker() {
  const { map, set, remove, has, clear } = useMap<string, number>();

  const increment = (id: string) => {
    set(id, (map.get(id) ?? 0) + 1);
  };

  const decrement = (id: string) => {
    const current = map.get(id) ?? 0;
    if (current <= 1) {
      remove(id);
    } else {
      set(id, current - 1);
    }
  };

  const total = [...map.entries()].reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return sum + (product?.price ?? 0) * qty;
  }, 0);

  return (
    <div className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <h2 className="text-sm font-semibold">Select Items</h2>

      <div className="space-y-1">
        {PRODUCTS.map((product) => {
          const qty = map.get(product.id) ?? 0;
          return (
            <div
              key={product.id}
              className="flex items-center justify-between px-3 py-2 rounded-control bg-muted/50 text-sm"
            >
              <div>
                <span className="font-medium">{product.name}</span>
                <span className="text-xs text-muted-content ml-2">
                  \${product.price.toFixed(2)} each
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => decrement(product.id)}
                  className="w-6 h-6 rounded-control border text-xs flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-6 text-center text-xs font-medium">{qty}</span>
                <button
                  onClick={() => increment(product.id)}
                  className="w-6 h-6 rounded-control bg-brand text-brand-content text-xs flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {map.size > 0 && (
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm font-semibold">Total: \${total.toFixed(2)}</span>
          <button onClick={clear} className="text-xs text-destructive hover:underline">
            Clear cart
          </button>
        </div>
      )}
    </div>
  );
}`,
      tags: ['quantity', 'multi-select', 'cart', 'counter', 'shopping'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mutating the Map instance directly',
      bad: `const { map } = useMap<string, number>();
map.set('key', 42); // Direct mutation — no re-render`,
      good: `const { map, set } = useMap<string, number>();
set('key', 42); // Creates a new Map, triggers re-render`,
      reason:
        'The map reference only changes when a mutator function is called. Calling .set(), .delete(), or .clear() on the Map directly mutates it in place without creating a new reference, so React does not detect the change and the UI stays stale.',
    },
    {
      title: 'Iterating the Map directly in JSX',
      bad: `{map.forEach((value, key) => (
  <div key={String(key)}>{value}</div>
))}`,
      good: `{[...map.entries()].map(([key, value]) => (
  <div key={String(key)}>{value}</div>
))}`,
      reason:
        'Map.forEach does not return an array, so React cannot use it as a valid JSX expression. Always spread Map into an array ([...map.entries()], [...map.keys()], or [...map.values()]) before mapping over it in JSX.',
    },
    {
      title: 'Using non-serializable values as keys unnecessarily',
      bad: `const { set, has } = useMap<object, string>();
// Each render creates a new object reference, so has() always returns false:
set({ id: 1 }, 'value');
has({ id: 1 }); // false — different reference`,
      good: `const { set, has } = useMap<number, string>();
// Use a primitive key that can be compared by value:
set(1, 'value');
has(1); // true`,
      reason:
        'Map uses SameValueZero for key equality. While object keys are technically allowed, most UI state should use primitives (strings, numbers) as keys. Object references created inline during render are never equal to previously stored keys, causing duplicate entries and failed lookups.',
    },
    {
      title: 'Reading stale state from has() inside event handlers',
      bad: `const { map, set, has } = useMap<string, boolean>();

const handleClick = () => {
  set('flag', true);
  if (has('flag')) {
    // has() still reads the OLD Map — set() hasn't re-rendered yet
    console.log('flag exists'); // May not print on first call
  }
};`,
      good: `const { map, set, has } = useMap<string, boolean>();

const handleClick = () => {
  set('flag', true);
  // has() reflects the current render's state, not the pending update.
  // If you need the updated value immediately, track it locally:
  console.log('Flag will be set');
};

// Or read after re-render:
useEffect(() => {
  if (has('flag')) {
    console.log('flag exists after render');
  }
}, [map]);`,
      reason:
        'has() reads from the Map captured during the current render. Calling set() schedules a state update but does not synchronously update the Map reference. Inside the same event handler, has() will return the pre-update value. Use useEffect or track the value locally if you need to react to the new state immediately.',
    },
  ],
};
