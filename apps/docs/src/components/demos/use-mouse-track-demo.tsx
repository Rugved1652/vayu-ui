'use client';

import { useMouseTrack } from 'vayu-ui';
import { MousePointer2 } from 'lucide-react';

export function UseMouseTrackDemo() {
  const { x, y } = useMouseTrack();

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full flex flex-col items-center gap-6 relative min-h-[200px] justify-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="flex flex-col items-center gap-2 z-10">
        <div className="p-4 bg-primary/10 rounded-full text-primary animate-pulse">
          <MousePointer2 className="h-8 w-8" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Move your mouse around!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-[200px] z-10">
        <div className="flex flex-col items-center p-3 rounded-md bg-muted/50 border">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">X Position</span>
          <span className="text-xl font-bold font-mono">{x}</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-md bg-muted/50 border">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Y Position</span>
          <span className="text-xl font-bold font-mono">{y}</span>
        </div>
      </div>
    </div>
  );
}
