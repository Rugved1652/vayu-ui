'use client';

import { useSet } from 'vayu-ui';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export function UseSetDemo() {
  const { set, add, remove, clear, has } = useSet<string>(['Item 1', 'Item 2']);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !has(inputValue.trim())) {
      add(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col gap-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add unique item..."
          className="flex-1 px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleAdd}
          disabled={!inputValue.trim() || has(inputValue.trim())}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          title={has(inputValue.trim()) ? 'Item already exists' : 'Add item'}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Set Values ({set.size}):</p>
          <button
            onClick={clear}
            disabled={set.size === 0}
            className="text-xs text-destructive hover:underline disabled:opacity-50 flex items-center gap-1"
          >
            <Trash2 className="h-3 w-3" /> Clear All
          </button>
        </div>

        <div className="min-h-[100px] bg-muted/20 rounded-md border p-2 flex flex-wrap gap-2 content-start">
          {Array.from(set).map((item) => (
            <div
              key={item}
              className="px-2 py-1 bg-background border rounded text-sm shadow-sm animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2 group"
            >
              <span>{item}</span>
              <button
                onClick={() => remove(item)}
                className="text-muted-foreground hover:text-destructive transition-colors opacity-50 group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {set.size === 0 && (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic opacity-50">
              Set is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
