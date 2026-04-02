'use client';

import { useLockBodyScroll } from 'vayu-ui';
import { useState } from 'react';
import { X, Lock, Unlock } from 'lucide-react';

// Modal component that locks body scroll when mounted
const Modal = ({ onClose }: { onClose: () => void }) => {
  useLockBodyScroll();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative bg-background text-foreground rounded-lg shadow-lg max-w-md w-full p-6 border animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Scroll Locked</h3>
          <p className="text-sm text-muted-foreground">
            Try scrolling the page background. You shouldn't be able to. This modal uses{' '}
            <code>useLockBodyScroll</code> to prevent background scrolling while open.
          </p>
          <button
            onClick={onClose}
            className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export function UseLockBodyScrollDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Unlock className="h-5 w-5" />
        <span className="text-sm font-medium">Scroll is currently unlocked</span>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
      >
        Open Modal (Lock Scroll)
      </button>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}

      {/* Some dummy content to make sure the page is scrollable if it wasn't already */}
      <div className="opacity-0 h-0 w-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>Hidden scrollable content {i}</p>
        ))}
      </div>
    </div>
  );
}
