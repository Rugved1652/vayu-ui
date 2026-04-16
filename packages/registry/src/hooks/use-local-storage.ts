import { HookRegistryEntry } from '../types.js';

export const useLocalStorageEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-local-storage',
  name: 'useLocalStorage',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'A state hook that persists values to localStorage with automatic serialization, cross-tab synchronization via the StorageEvent, and SSR-safe initialization.',
  longDescription:
    'Wraps React.useState and keeps a localStorage key in sync with your component state. On mount, the hook reads the stored JSON value for the given key (falling back to initialValue if absent or corrupt). On every state change, it serializes and writes back to localStorage inside a useEffect. The hook also subscribes to the native "storage" event on window, so when another browser tab modifies the same key, the state updates in real time across all open tabs. Because localStorage.getItem is called inside a lazy useState initializer, it only runs once per mount — avoiding flicker from repeated reads. The hook is SSR-safe: the lazy initializer catches any errors (e.g., localStorage unavailable in Node.js) and gracefully falls back to initialValue. Errors during both read and write are caught and logged, so quota-exceeded or restricted-access scenarios do not crash your app. Choose this over raw useState when you need user preferences, form drafts, feature flags, or any client-side state that must survive page reloads and be shared across tabs.',
  tags: [
    'local-storage',
    'persist',
    'state',
    'storage',
    'hydration',
    'ssr-safe',
    'cross-tab',
    'browser-storage',
    'session',
    'client-side',
  ],
  category: 'state',
  useCases: [
    'When you need to persist user preferences (theme, language, sidebar collapsed state) across page reloads without hydration mismatches',
    'To save form draft data so users do not lose progress on accidental navigation or browser crash',
    'When building a settings panel where changes must be reflected in other open tabs in real time via the StorageEvent',
    'To cache feature flags or A/B test assignments on the client so they survive refreshes without re-fetching',
    'When you want a simple key-value store for small client-side data that does not justify IndexedDB or an external database',
    'To remember the last-selected value of a dropdown, tab, or accordion so the UI restores its previous state on revisit',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useLocalStorage.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>]',
  typeParams: ['T'],
  parameters: [
    {
      name: 'key',
      type: 'string',
      required: true,
      description:
        'The localStorage key to read from and write to. Must be unique across your app to avoid collisions. Changing the key between renders will read the new key from storage and persist future updates there.',
    },
    {
      name: 'initialValue',
      type: 'T',
      required: true,
      description:
        'The fallback value used when the key does not exist in localStorage yet or when JSON.parse fails. Also used during SSR when localStorage is unavailable. The generic T is inferred from this value, so useLocalStorage("count", 0) infers T as number.',
    },
  ],
  returnType: '[T, Dispatch<SetStateAction<T>>]',
  returnValues: [
    {
      name: 'storedValue',
      type: 'T',
      description:
        'The current persisted value. Initialized from localStorage on mount (or initialValue if absent/corrupt). Updates automatically when the setter is called or when another tab fires a StorageEvent for the same key.',
    },
    {
      name: 'setStoredValue',
      type: 'Dispatch<SetStateAction<T>>',
      description:
        'The standard React state setter. Accepts a new value or a functional updater (prev => next). Each call serializes the new value to localStorage via JSON.stringify and triggers a re-render.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Dark Mode Toggle',
      description:
        'Persists the user theme preference so it survives page reloads and is shared across open tabs.',
      code: `'use client';
import { useLocalStorage } from 'vayu-ui';
import { useEffect } from 'react';

export default function DarkModeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      className="px-4 py-2 rounded-control bg-surface text-surface-content shadow-control text-sm font-medium"
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}`,
      tags: ['theme', 'dark-mode', 'toggle', 'preference'],
    },
    {
      title: 'Persistent Form Draft',
      description:
        'Saves form input to localStorage on every keystroke so the user does not lose data on accidental navigation.',
      code: `'use client';
import { useLocalStorage } from 'vayu-ui';

interface FeedbackDraft {
  name: string;
  message: string;
}

export default function FeedbackForm() {
  const [draft, setDraft] = useLocalStorage<FeedbackDraft>('feedback-draft', {
    name: '',
    message: '',
  });

  const handleChange = (field: keyof FeedbackDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', draft);
    setDraft({ name: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <h2 className="text-sm font-semibold">Feedback</h2>

      <input
        value={draft.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Your name"
        className="w-full px-3 py-1.5 rounded-control border bg-field text-sm"
      />

      <textarea
        value={draft.message}
        onChange={(e) => handleChange('message', e.target.value)}
        placeholder="Your message..."
        rows={3}
        className="w-full px-3 py-1.5 rounded-control border bg-field text-sm resize-none"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-sm font-medium"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setDraft({ name: '', message: '' })}
          className="px-3 py-1.5 rounded-control border text-sm text-muted-content"
        >
          Clear draft
        </button>
      </div>
    </form>
  );
}`,
      tags: ['form', 'draft', 'auto-save', 'persistence'],
    },
    {
      title: 'Last Selected Tab',
      description:
        'Remembers which tab the user last selected so the same tab is active on revisit.',
      code: `'use client';
import { useLocalStorage } from 'vayu-ui';

const TABS = ['Overview', 'Analytics', 'Settings'] as const;
type Tab = (typeof TABS)[number];

export default function PersistentTabs() {
  const [activeTab, setActiveTab] = useLocalStorage<Tab>('active-tab', 'Overview');

  return (
    <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content max-w-md">
      <div className="flex border-b">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={\`px-4 py-2 text-sm font-medium transition-colors \${
              activeTab === tab
                ? 'border-b-2 border-brand text-brand'
                : 'text-muted-content hover:text-surface-content'
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="pt-4 text-sm">
        {activeTab === 'Overview' && <p>Welcome to the overview panel.</p>}
        {activeTab === 'Analytics' && <p>Your analytics data appears here.</p>}
        {activeTab === 'Settings' && <p>Configure your preferences below.</p>}
      </div>
    </div>
  );
}`,
      tags: ['tab', 'active', 'preference', 'persist'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Storing non-JSON-serializable values',
      bad: `const [fn, setFn] = useLocalStorage('callback', () => {}); // Functions cannot be serialized`,
      good: `// Store serializable data and derive functions from it
const [items, setItems] = useLocalStorage<string[]>('items', []);
const addItem = (item: string) => setItems((prev) => [...prev, item]);`,
      reason:
        'localStorage stores strings via JSON.stringify/parse. Functions, Symbols, undefined, Dates, and Map/Set instances lose their identity during serialization. Store plain JSON-compatible data and reconstruct complex objects from it.',
    },
    {
      title: 'Using localStorage key outside the lazy initializer',
      bad: `function Component({ userId }: { userId: string }) {
  const [value, setValue] = useLocalStorage('pref', null);
  // Reading localStorage directly causes hydration mismatches:
  useEffect(() => {
    const raw = localStorage.getItem('something-else');
    setValue(JSON.parse(raw)); // Unnecessary extra read + flicker
  }, []);`,
      good: `function Component({ userId }: { userId: string }) {
  const [value, setValue] = useLocalStorage('pref', null);
  // The hook already reads from localStorage on mount via the lazy initializer.
  // Just use value directly — no extra reads needed.`,
      reason:
        'The hook already handles reading from localStorage in its lazy useState initializer. Reading localStorage again in a useEffect causes an extra render cycle and can produce hydration mismatches in SSR frameworks like Next.js.',
    },
    {
      title: 'Changing the key dynamically without memoizing initialValue',
      bad: `const [val, setVal] = useLocalStorage(
  dynamicKey,        // Key changes every render
  computeExpensive(), // Recalculated every render
);`,
      good: `const key = useMemo(() => buildKey(userId, feature), [userId, feature]);
const initialVal = useMemo(() => computeDefault(userId), [userId]);
const [val, setVal] = useLocalStorage(key, initialVal);`,
      reason:
        'Changing the key causes the hook to re-initialize from localStorage. If initialValue is expensive to compute, it will recalculate every render. Memoize both the key and initialValue if they depend on props or state.',
    },
    {
      title: 'Storing large or sensitive data in localStorage',
      bad: `const [data, setData] = useLocalStorage('api-response', massiveJson);
const [token, setToken] = useLocalStorage('auth-token', '...');`,
      good: `// Use IndexedDB (via useIndexedDB) for large datasets
// Use httpOnly cookies or a secure auth provider for tokens
const [prefs, setPrefs] = useLocalStorage('user-prefs', { theme: 'light' });`,
      reason:
        'localStorage has a ~5 MB per-origin limit and is synchronous — storing large objects blocks the main thread during JSON.stringify/parse. Additionally, localStorage is readable by any JS on the page (XSS accessible) — never store tokens, secrets, or PII there.',
    },
    {
      title: 'Assuming the setter synchronously updates localStorage',
      bad: `setValue('new');
console.log(localStorage.getItem('key')); // May still show old value`,
      good: `setValue('new');
// localStorage is updated in a useEffect (async). Read from the returned
// state value instead of going back to localStorage directly:
console.log(value); // "new" — reflects the current React state`,
      reason:
        'The hook writes to localStorage inside a useEffect, which runs after the render commit. Immediately reading from localStorage after calling the setter will return the stale value. Always read from the returned state variable instead.',
    },
  ],
};
