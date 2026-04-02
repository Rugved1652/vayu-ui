'use client';

import { useOnClickOutside } from 'vayu-ui';
import { useRef, useState } from 'react';

export function UseOnClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
    setIsOpen(false);
  });

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full h-[300px] flex flex-col items-center justify-center relative bg-muted/20">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 animate-in fade-in duration-200">
          <div
            ref={ref}
            className="bg-card p-6 rounded-lg shadow-xl border w-[300px] animate-in zoom-in-95 duration-200"
          >
            <h3 className="text-lg font-semibold mb-2">Modal Title</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click outside of this box to close it. Clicking inside will keep it open.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-primary hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
