'use client';

import { useOnClickOutside } from 'vayu-ui';
import { useRef, useState } from 'react';

export function UseOnClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    [triggerRef, dropdownRef] as React.RefObject<HTMLElement>[],
    () => setIsOpen(false),
  );

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full h-[300px] flex flex-col items-center justify-center relative bg-muted/20">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
      >
        {isOpen ? 'Close Dropdown' : 'Open Dropdown'}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-card p-4 rounded-lg shadow-xl border w-[240px] animate-in fade-in zoom-in-95 duration-200"
        >
          <p className="text-sm font-medium mb-2">Dropdown Menu</p>
          <p className="text-xs text-muted-foreground mb-3">
            Clicking the button or inside this panel does nothing. Click
            anywhere else to close.
          </p>
          <ul className="space-y-1 text-sm">
            <li className="px-2 py-1 rounded hover:bg-muted cursor-pointer">
              Profile
            </li>
            <li className="px-2 py-1 rounded hover:bg-muted cursor-pointer">
              Settings
            </li>
            <li className="px-2 py-1 rounded hover:bg-muted cursor-pointer">
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
