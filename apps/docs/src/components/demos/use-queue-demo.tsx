'use client';

import { useQueue } from 'vayu-ui';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export function UseQueueDemo() {
  const { queue, add, remove, clear, first, last, size } = useQueue<string>();
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
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
          placeholder="Add item..."
          className="flex-1 px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={remove}
          disabled={size === 0}
          className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <X className="h-4 w-4" /> Remove First
        </button>
        <button
          onClick={clear}
          disabled={size === 0}
          className="flex-1 px-3 py-2 bg-destructive/10 text-destructive rounded-md text-sm hover:bg-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Trash2 className="h-4 w-4" /> Clear
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="p-2 bg-muted/30 rounded border">
          <span className="text-muted-foreground block mb-1">First:</span>
          <span className="font-mono font-medium">{first ?? '-'}</span>
        </div>
        <div className="p-2 bg-muted/30 rounded border">
          <span className="text-muted-foreground block mb-1">Last:</span>
          <span className="font-mono font-medium">{last ?? '-'}</span>
        </div>
        <div className="p-2 bg-muted/30 rounded border col-span-2 flex justify-between items-center">
          <span className="text-muted-foreground">Size:</span>
          <span className="font-mono font-medium">{size}</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Queue:</p>
        <div className="min-h-[100px] bg-muted/20 rounded-md border p-2 flex flex-wrap gap-2 content-start">
          {queue.map((item, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-background border rounded text-xs font-mono shadow-sm animate-in fade-in zoom-in-95 duration-200"
            >
              {item}
            </div>
          ))}
          {queue.length === 0 && (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs italic opacity-50">
              Queue is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
