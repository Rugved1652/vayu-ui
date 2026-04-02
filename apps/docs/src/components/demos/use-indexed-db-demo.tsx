'use client';

import { useIndexedDB } from 'vayu-ui';
import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export function UseIndexedDBDemo() {
  const { put, getAll, remove, clear, count, isReady, error } = useIndexedDB<Todo>({
    dbName: 'vayu-ui-demo',
    storeName: 'todos',
    keyPath: 'id',
  });

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const refresh = async () => {
    const all = await getAll();
    setTodos(all.sort((a, b) => b.createdAt - a.createdAt));
    setTotalCount(await count());
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    await put({
      id: crypto.randomUUID(),
      text: input.trim(),
      done: false,
      createdAt: Date.now(),
    });
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

  const clearAll = async () => {
    await clear();
    await refresh();
  };

  // Load on first ready
  if (isReady && todos.length === 0 && totalCount === 0) {
    refresh();
  }

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">IndexedDB Todos</h3>
          <span className="text-xs text-muted-foreground">
            {isReady ? `${totalCount} items stored` : 'Connecting…'}
          </span>
        </div>

        {error && <p className="text-xs text-red-500">Error: {error.message}</p>}

        <div className="flex gap-2">
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Add a todo…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            disabled={!isReady}
          />
          <button
            onClick={addTodo}
            disabled={!isReady || !input.trim()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-3"
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-1 max-h-52 overflow-y-auto">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent text-sm group"
            >
              <button
                onClick={() => toggleTodo(todo)}
                className={`shrink-0 w-4 h-4 rounded border transition-colors ${
                  todo.done ? 'bg-primary border-primary' : 'border-input'
                }`}
                aria-label={todo.done ? 'Mark incomplete' : 'Mark complete'}
              >
                {todo.done && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="w-full h-full p-0.5"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className={`flex-1 truncate ${todo.done ? 'line-through opacity-50' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity text-xs"
                aria-label="Delete"
              >
                ✕
              </button>
            </div>
          ))}
          {todos.length === 0 && isReady && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No todos yet. Add one above!
            </p>
          )}
        </div>

        {todos.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors self-end"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
