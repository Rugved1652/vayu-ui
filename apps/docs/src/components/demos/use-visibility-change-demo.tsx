'use client';

import { useVisibilityChange } from 'vayu-ui';
import { Eye, EyeOff } from 'lucide-react';

export function UseVisibilityChangeDemo() {
  const isVisible = useVisibilityChange();

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col items-center gap-6">
      <div
        className={`p-4 rounded-full ${isVisible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} transition-colors duration-300`}
      >
        {isVisible ? <Eye className="w-12 h-12" /> : <EyeOff className="w-12 h-12" />}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-2xl font-bold">{isVisible ? 'Visible' : 'Hidden'}</span>
        <p className="text-sm text-muted-foreground">
          Switch tabs or minimize the window to see the state change.
        </p>
      </div>

      <div className="w-full p-4 bg-muted/40 rounded-md text-sm border">
        <p className="font-mono">
          document.hidden: <span className="font-bold text-primary">{(!isVisible).toString()}</span>
        </p>
        <p className="font-mono">
          Document State:{' '}
          <span className="font-bold text-primary">{isVisible ? 'Active' : 'Background'}</span>
        </p>
      </div>
    </div>
  );
}
