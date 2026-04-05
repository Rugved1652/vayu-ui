// track.tsx
// UI: presentational

import { cn } from '../utils';

interface SwitchTrackProps {
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
}

export function SwitchTrack({ checked, disabled, error }: SwitchTrackProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        // Base
        'relative inline-flex items-center',
        'w-11 h-6 p-0.5 rounded-full',
        'transition-colors duration-200 ease-in-out',
        // Background colors (semantic tokens)
        checked ? 'bg-brand' : 'bg-field',
        // Focus visible ring (WCAG 2.2)
        'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas',
        // Disabled state
        'peer-disabled:opacity-50',
        // Error state (only when not checked and not disabled)
        error && !disabled && !checked && 'ring-2 ring-destructive',
      )}
    >
      {/* Thumb */}
      <span
        className={cn(
          'pointer-events-none',
          'w-5 h-5 rounded-full',
          'bg-surface shadow-sm ring-1 ring-border',
          'transition-transform duration-200 ease-in-out',
        )}
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </span>
  );
}
