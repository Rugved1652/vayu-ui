import { HookRegistryEntry } from '../types.js';

export const useIndexedDBEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-indexed-db',
  name: 'useIndexedDB',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Provides a typed, promise-based CRUD API over an IndexedDB object store, handling database opening, schema upgrades, indexing, and connection lifecycle automatically.',
  longDescription:
    'useIndexedDB wraps the browser IndexedDB API into a declarative React hook with full TypeScript generics. It opens (or creates) a database and object store on mount, creates optional indexes, and exposes promise-based CRUD methods (put, add, get, getAll, remove, clear, count, getByIndex) that internally manage IDBTransaction and IDBRequest lifecycle. The hook tracks readiness via an isReady boolean and surfaces any connection errors through an error state — so consumers can conditionally render loading states and gracefully handle failures. The database connection is held in a ref and automatically closed on unmount, preventing leaks. Schema upgrades are handled through the version parameter: incrementing it triggers the onupgradeneeded callback, which creates the store and indexes if they do not already exist. Because IndexedDB is a browser-only API, this hook is client-only — it must be used inside a "use client" component or guarded with a mount check in SSR contexts. Choose this hook over raw IndexedDB when you want a React-friendly, typed interface without manually managing IDBDatabase, transactions, and request callbacks. Choose it over localStorage when you need to store structured data larger than 5MB, perform indexed queries, or handle binary data.',
  tags: [
    'indexeddb',
    'storage',
    'database',
    'offline',
    'persist',
    'crud',
    'browser-storage',
    'local-storage',
    'structured-data',
    'index',
  ],
  category: 'async',
  useCases: [
    'Build offline-first applications that need to store and query structured data client-side without a server round-trip',
    'Persist data beyond the 5MB localStorage limit, such as large JSON payloads, user-generated content, or cached API responses',
    'Cache API responses client-side with IndexedDB so the app can serve stale-while-revalidate data when the network is unavailable',
    'Implement auto-save for form drafts or work-in-progress documents that survive page reloads and tab closures',
    'Create local-first apps like todo lists, note-taking tools, or Kanban boards where all data lives in the browser and syncs opportunistically',
    'Query records by secondary indexes (e.g., find all users by role, all orders by status) without loading the entire dataset into memory',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useIndexedDB.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useIndexedDB<T = unknown>(options: UseIndexedDBOptions): UseIndexedDBReturn<T>',
  typeParams: ['T'],
  returnType: 'UseIndexedDBReturn<T>',
  parameters: [
    {
      name: 'options',
      type: 'UseIndexedDBOptions',
      required: true,
      description:
        'Configuration object for the IndexedDB connection. Specifies the database name, object store name, schema version, primary key path, and optional indexes to create.',
    },
    {
      name: 'options.dbName',
      type: 'string',
      required: true,
      description:
        'The name of the IndexedDB database to open or create. This should be unique per application to avoid collisions. Changing this value after mount will close the current connection and open a new database.',
    },
    {
      name: 'options.storeName',
      type: 'string',
      required: true,
      description:
        'The name of the object store within the database. Analogous to a table name in SQL. All CRUD operations target this store. Multiple stores per database require separate hook instances.',
    },
    {
      name: 'options.version',
      type: 'number',
      required: false,
      defaultValue: '1',
      description:
        'Schema version number. Increment this when you need to change the store structure (e.g., adding indexes or changing the keyPath). Incrementing triggers the onupgradeneeded event, which creates or updates the store and indexes.',
    },
    {
      name: 'options.keyPath',
      type: 'string',
      required: false,
      defaultValue: "'id'",
      description:
        'The property name on stored objects that serves as the primary key. Defaults to "id". The value at this path must be unique across all records in the store. Used by get, put, add, and remove to identify records.',
    },
    {
      name: 'options.indexes',
      type: '{ name: string; keyPath: string; unique?: boolean }[]',
      required: false,
      description:
        'Array of secondary indexes to create on the object store. Each index has a name (used with getByIndex), a keyPath (the property to index), and an optional unique flag. Indexes are created during schema upgrades only — adding new indexes requires incrementing the version.',
    },
  ],
  returnValues: [
    {
      name: 'put',
      type: '(value: T) => Promise<IDBValidKey>',
      description:
        'Inserts a record or updates an existing one (upsert). If a record with the same keyPath value already exists, it is overwritten entirely. Returns the key of the stored record.',
    },
    {
      name: 'add',
      type: '(value: T) => Promise<IDBValidKey>',
      description:
        'Inserts a new record. Throws if a record with the same keyPath value already exists — use put instead when you want upsert semantics. Returns the key of the added record.',
    },
    {
      name: 'get',
      type: '(key: IDBValidKey) => Promise<T | undefined>',
      description:
        'Retrieves a single record by its primary key value. Returns undefined if no record matches. The key type must match the keyPath property type (typically string or number).',
    },
    {
      name: 'getAll',
      type: '() => Promise<T[]>',
      description:
        'Returns all records in the object store as an array. Results are ordered by the primary key. Returns an empty array if the store has no records.',
    },
    {
      name: 'remove',
      type: '(key: IDBValidKey) => Promise<void>',
      description:
        'Deletes a single record identified by its primary key value. Does nothing if no matching record exists. The promise resolves when the delete transaction completes.',
    },
    {
      name: 'clear',
      type: '() => Promise<void>',
      description:
        'Deletes all records in the object store. The store itself and its indexes are preserved. Use this to reset state without recreating the database.',
    },
    {
      name: 'count',
      type: '() => Promise<number>',
      description:
        'Returns the total number of records in the object store. Useful for displaying counts or deciding whether to paginate.',
    },
    {
      name: 'getByIndex',
      type: '(indexName: string, value: IDBValidKey) => Promise<T[]>',
      description:
        'Queries records using a secondary index. The indexName must match a name from the indexes option. Returns all records whose indexed property matches the given value. Returns an empty array if no matches are found.',
    },
    {
      name: 'isReady',
      type: 'boolean',
      description:
        'true once the IndexedDB connection has been successfully opened and all CRUD methods are safe to call. false during initial mount or after a connection error. Always guard async operations with this flag.',
    },
    {
      name: 'error',
      type: 'Error | null',
      description:
        'Holds any Error that occurred during database opening or CRUD operations. Reset to null on successful operations. Check this alongside isReady to distinguish between "still loading" and "failed to connect".',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Todo List with Full CRUD',
      description:
        'A complete todo manager that persists items in IndexedDB, with add, toggle, delete, and clear-all functionality. Shows proper isReady guarding and error handling.',
      code: `import { useIndexedDB } from 'vayu-ui';
import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export default function TodoApp() {
  const { put, getAll, remove, clear, count, isReady, error } = useIndexedDB<Todo>({
    dbName: 'my-app',
    storeName: 'todos',
    keyPath: 'id',
  });

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const refresh = async () => {
    const all = await getAll();
    setTodos(all.sort((a, b) => b.createdAt - a.createdAt));
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    await put({ id: crypto.randomUUID(), text: input.trim(), done: false, createdAt: Date.now() });
    setInput('');
    await refresh();
  };

  const toggleTodo = async (todo: Todo) => {
    await put({ ...todo, done: !todo.done });
    await refresh();
  };

  const deleteTodo = async (id: string) => {
    await remove(id);
    await refresh();
  };

  // Load once DB is ready
  if (isReady && todos.length === 0) {
    refresh();
  }

  return (
    <div className="p-6 max-w-md w-full rounded-surface border bg-surface text-surface-content shadow-surface">
      <h3 className="text-sm font-semibold mb-3">Todos</h3>

      {error && <p className="text-xs text-destructive mb-2">Error: {error.message}</p>}

      {!isReady && <p className="text-xs text-muted-content">Connecting to database…</p>}

      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 px-3 py-2 rounded-control border bg-transparent text-sm"
          placeholder="Add a todo…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          disabled={!isReady}
        />
        <button
          onClick={addTodo}
          disabled={!isReady || !input.trim()}
          className="px-3 py-2 rounded-control bg-brand text-brand-content text-sm disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-1 max-h-52 overflow-y-auto">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 text-sm group">
            <button
              onClick={() => toggleTodo(todo)}
              className={\`shrink-0 w-4 h-4 rounded border \${todo.done ? 'bg-brand border-brand' : 'border-border'}\`}
            />
            <span className={\`flex-1 truncate \${todo.done ? 'line-through opacity-50' : ''}\`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-content hover:text-destructive text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {todos.length > 0 && (
        <button onClick={async () => { await clear(); await refresh(); }} className="text-xs text-muted-content hover:text-destructive mt-2">
          Clear all
        </button>
      )}
    </div>
  );
}`,
      tags: ['todo', 'crud', 'persist', 'basic'],
    },
    {
      title: 'Offline-First API Cache',
      description:
        'Caches API responses in IndexedDB and serves them when the network is unavailable, implementing a stale-while-revalidate pattern with a configurable TTL.',
      code: `import { useIndexedDB } from 'vayu-ui';
import { useState, useEffect } from 'react';

interface CachedResponse<T> {
  url: string;
  data: T;
  cachedAt: number;
}

export function useOfflineCache<T>(url: string, ttlMs = 5 * 60 * 1000) {
  const { put, get, isReady } = useIndexedDB<CachedResponse<T>>({
    dbName: 'api-cache',
    storeName: 'responses',
    keyPath: 'url',
  });

  const [data, setData] = useState<T | null>(null);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const fetchData = async () => {
      try {
        const cached = await get(url);
        if (cached && Date.now() - cached.cachedAt < ttlMs) {
          setData(cached.data);
          setFromCache(true);
          return;
        }

        const res = await fetch(url);
        const json = (await res.json()) as T;
        setData(json);
        setFromCache(false);
        await put({ url, data: json, cachedAt: Date.now() });
      } catch {
        // Network failed — try cache regardless of TTL
        const cached = await get(url);
        if (cached) {
          setData(cached.data);
          setFromCache(true);
        }
      }
    };

    fetchData();
  }, [url, isReady, ttlMs]);

  return { data, fromCache, isReady };
}

export default function UserList() {
  const { data, fromCache, isReady } = useOfflineCache<{ id: number; name: string }[]>(
    '/api/users',
  );

  if (!isReady) return <p className="text-sm text-muted-content">Loading cache…</p>;
  if (!data) return <p className="text-sm text-muted-content">Loading…</p>;

  return (
    <div className="space-y-2">
      {fromCache && (
        <p className="text-xs text-warning">Showing cached data (offline or stale)</p>
      )}
      <ul className="divide-y border rounded-surface">
        {data.map((user) => (
          <li key={user.id} className="px-3 py-2 text-sm">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      tags: ['cache', 'offline', 'api', 'swr'],
    },
    {
      title: 'Indexed Query — User Directory',
      description:
        'Demonstrates creating secondary indexes and using getByIndex to filter users by role without loading all records into memory.',
      code: `import { useIndexedDB } from 'vayu-ui';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export default function UserDirectory() {
  const { put, getByIndex, getAll, isReady, error } = useIndexedDB<User>({
    dbName: 'my-app',
    storeName: 'users',
    keyPath: 'id',
    indexes: [
      { name: 'by-role', keyPath: 'role' },
      { name: 'by-email', keyPath: 'email', unique: true },
    ],
  });

  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    if (!isReady) return;
    (roleFilter === 'all' ? getAll() : getByIndex('by-role', roleFilter)).then(setUsers);
  }, [isReady, roleFilter]);

  const seedUsers = async () => {
    await put({ id: '1', name: 'Alice', email: 'alice@example.com', role: 'admin' });
    await put({ id: '2', name: 'Bob', email: 'bob@example.com', role: 'editor' });
    await put({ id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'viewer' });
    await put({ id: '4', name: 'Diana', email: 'diana@example.com', role: 'admin' });
    const all = await getAll();
    setUsers(all);
  };

  return (
    <div className="p-4 max-w-md rounded-surface border bg-surface text-surface-content">
      <h3 className="text-sm font-semibold mb-3">User Directory</h3>

      {error && <p className="text-xs text-destructive">Error: {error.message}</p>}

      <div className="flex gap-2 mb-3">
        {['all', 'admin', 'editor', 'viewer'].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={\`px-2 py-1 text-xs rounded-control \${roleFilter === role ? 'bg-brand text-brand-content' : 'border'}\`}
          >
            {role}
          </button>
        ))}
      </div>

      {isReady && users.length === 0 && (
        <button onClick={seedUsers} className="text-xs text-brand mb-2">
          Seed sample users
        </button>
      )}

      <ul className="divide-y border rounded-surface">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between px-3 py-2 text-sm">
            <span>{user.name}</span>
            <span className="text-xs text-muted-content">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      tags: ['index', 'query', 'filter', 'user-directory'],
    },
    {
      title: 'Form Draft Auto-Save',
      description:
        'Automatically saves form state to IndexedDB as the user types, and restores the draft on page reload so no work is lost.',
      code: `import { useIndexedDB } from 'vayu-ui';
import { useState, useEffect, useCallback } from 'react';

interface FormDraft {
  id: string;
  title: string;
  body: string;
  savedAt: number;
}

export default function DraftEditor() {
  const { put, get, isReady } = useIndexedDB<FormDraft>({
    dbName: 'my-app',
    storeName: 'drafts',
    keyPath: 'id',
  });

  const DRAFT_KEY = 'current-draft';

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  // Restore draft on mount
  useEffect(() => {
    if (!isReady) return;
    get(DRAFT_KEY).then((draft) => {
      if (draft) {
        setTitle(draft.title);
        setBody(draft.body);
        setLastSaved(draft.savedAt);
      }
    });
  }, [isReady]);

  // Auto-save with debounce via interval
  const saveDraft = useCallback(async () => {
    if (!isReady) return;
    await put({ id: DRAFT_KEY, title, body, savedAt: Date.now() });
    setLastSaved(Date.now());
  }, [isReady, title, body]);

  useEffect(() => {
    const interval = setInterval(saveDraft, 3000);
    return () => clearInterval(interval);
  }, [saveDraft]);

  return (
    <div className="p-4 max-w-md space-y-3 rounded-surface border bg-surface text-surface-content">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Draft Editor</h3>
        {lastSaved && (
          <span className="text-xs text-muted-content">
            Last saved: {new Date(lastSaved).toLocaleTimeString()}
          </span>
        )}
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 rounded-control border bg-transparent text-sm"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write something…"
        rows={6}
        className="w-full px-3 py-2 rounded-control border bg-transparent text-sm resize-y"
      />

      <p className="text-xs text-muted-content">
        Drafts auto-save every 3 seconds and persist across page reloads.
      </p>
    </div>
  );
}`,
      tags: ['form', 'draft', 'auto-save', 'persist'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Calling CRUD methods before isReady is true',
      bad: `const { put, isReady } = useIndexedDB({ dbName: 'app', storeName: 'items' });

// Called immediately on render — DB not open yet
await put({ id: '1', name: 'Item' });`,
      good: `const { put, isReady } = useIndexedDB({ dbName: 'app', storeName: 'items' });

// Guard all operations with isReady
if (isReady) {
  await put({ id: '1', name: 'Item' });
}`,
      reason:
        'The database connection opens asynchronously in useEffect. Calling any CRUD method before isReady is true will throw "IndexedDB is not ready yet". Always check isReady before calling operations, or use it as a dependency in useEffect.',
    },
    {
      title: 'Changing dbName or storeName dynamically on re-renders',
      bad: `const [name, setName] = useState('store-v1');
const { getAll } = useIndexedDB({ dbName: 'app', storeName: name });`,
      good: `// Keep dbName and storeName stable constants
const { getAll } = useIndexedDB({ dbName: 'app', storeName: 'items' });`,
      reason:
        'dbName, storeName, and version are in the useEffect dependency array. Changing them closes the current database connection and opens a new one, which can cause data loss or unexpected behavior. Treat these as static configuration defined outside the component or as constants.',
    },
    {
      title: 'Using add when put is intended',
      bad: `// This throws if a record with the same id already exists
await add({ id: 'user-1', name: 'Alice' });`,
      good: `// Use put for upsert — safely inserts or updates
await put({ id: 'user-1', name: 'Alice' });`,
      reason:
        'add() is an insert-only operation that throws a ConstraintError if a record with the same keyPath value already exists in the store. Use put() for idempotent upserts (insert-or-update), which is almost always the safer choice. Reserve add() for cases where duplicate keys must be explicitly rejected.',
    },
    {
      title: 'Ignoring the error state',
      bad: `const { getAll, isReady } = useIndexedDB({ dbName: 'app', storeName: 'items' });
// No error handling anywhere`,
      good: `const { getAll, isReady, error } = useIndexedDB({ dbName: 'app', storeName: 'items' });

if (error) {
  return <p className="text-destructive">Database error: {error.message}</p>;
}`,
      reason:
        'IndexedDB operations can fail for many reasons: quota exceeded, blocked by private browsing mode, corrupted database, or user clearing storage. The hook surfaces errors through the error state. Not checking it means failures are silently swallowed and the UI appears stuck or empty without explanation.',
    },
    {
      title: 'Mutating objects in-place before passing to put',
      bad: `const items = await getAll();
items[0].name = 'Updated';
await put(items[0]); // Works, but items state is now stale`,
      good: `const items = await getAll();
const updated = { ...items[0], name: 'Updated' };
await put(updated);
// Now call getAll() again to refresh state`,
      reason:
        'Mutating objects retrieved from IndexedDB in-place and then calling put creates confusing state management. React state and the IndexedDB store become out of sync. Always spread into a new object when modifying, then call getAll() or refresh your local state afterward to keep the UI consistent.',
    },
  ],
};
