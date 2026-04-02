'use client';

import { useWindowSize } from 'vayu-ui';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

export function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();

  const getDeviceIcon = () => {
    if (width < 640) return <Smartphone className="w-12 h-12 text-primary" />;
    if (width < 1024) return <Tablet className="w-12 h-12 text-primary" />;
    return <Monitor className="w-12 h-12 text-primary" />;
  };

  const getDeviceLabel = () => {
    if (width < 640) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  };

  // Prevent hydration mismatch for initial render if possible,
  // though the hook inits with 0/0 so it might "flash" or just render 0.
  // Using a mounted check is cleaner for UI that depends on width/height.
  if (width === 0 && height === 0) {
    return (
      <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col items-center gap-6 opacity-50">
        Loading window size...
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col items-center gap-6 transition-all duration-300">
      <div className="p-4 rounded-full bg-primary/10">{getDeviceIcon()}</div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-2xl font-bold">
          {width}px x {height}px
        </span>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
          {getDeviceLabel()}
        </p>
      </div>

      <div className="w-full text-center text-xs text-muted-foreground">
        Resize your browser window to see the values update.
      </div>
    </div>
  );
}
