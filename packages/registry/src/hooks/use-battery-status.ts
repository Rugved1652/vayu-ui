import { HookRegistryEntry } from '../types.js';

export const useBatteryStatusEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-battery-status',
  name: 'useBatteryStatus',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that monitors device battery level, charging state, and charge/discharge time estimates via the Battery Status API.',
  longDescription:
    'Wraps navigator.getBattery() into a React-friendly hook that returns a BatteryStatus object. It subscribes to all four BatteryManager events (chargingchange, chargingtimechange, dischargingtimechange, levelchange) so the component re-renders automatically whenever any battery property changes. On unsupported browsers or during SSR, isSupported stays false and safe defaults are returned (level: 1, charging: false, dischargingTime: Infinity, chargingTime: 0), avoiding hydration mismatches and runtime errors. No external dependencies beyond React are required.',
  tags: [
    'battery',
    'power',
    'charging',
    'device',
    'sensor',
    'hardware',
    'pwa',
    'progressive-web-app',
    'status',
    'reactive',
  ],
  category: 'sensor',
  useCases: [
    'Display a battery indicator in a PWA or mobile web app showing current charge level and charging status',
    'Conditionally reduce background sync, animations, or data fetching when the battery is low and the device is not charging',
    'Warn users before starting a long-running operation (e.g. file upload, video export) if battery level is critically low',
    'Build a power-aware UI that switches to a low-power color scheme or disables auto-play media when discharging',
    'Show estimated time remaining until full charge or until empty in a device dashboard or settings page',
    'Detect unsupported browsers and render a graceful fallback instead of a broken battery widget',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useBatteryStatus.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useBatteryStatus(): BatteryStatus',
  returnType: 'BatteryStatus',
  parameters: [],
  returnValues: [
    {
      name: 'charging',
      type: 'boolean',
      description:
        'Whether the device is currently plugged in and charging. Remains false on unsupported browsers.',
    },
    {
      name: 'chargingTime',
      type: 'number',
      description:
        'Seconds remaining until the battery is fully charged. Value is Infinity when not charging or already full. Zero on unsupported browsers.',
    },
    {
      name: 'dischargingTime',
      type: 'number',
      description:
        'Seconds remaining until the battery is completely discharged. Value is Infinity when the device is charging. Defaults to Infinity on unsupported browsers.',
    },
    {
      name: 'level',
      type: 'number',
      description:
        'Battery level as a float between 0 (empty) and 1 (full). Defaults to 1 on unsupported browsers.',
    },
    {
      name: 'isSupported',
      type: 'boolean',
      description:
        'Whether the Battery Status API is available in the current browser. Check this before rendering battery-dependent UI to avoid showing misleading data.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Battery Indicator',
      description:
        'A simple component that displays the current battery percentage and charging status with a color-coded progress bar.',
      code: `import { useBatteryStatus } from 'vayu-ui';

export default function BatteryIndicator() {
  const { level, charging, isSupported } = useBatteryStatus();

  if (!isSupported) {
    return <span>Battery API not supported in this browser</span>;
  }

  const pct = Math.round(level * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-4 bg-muted rounded-md overflow-hidden border">
        <div
          className={\`h-full transition-all duration-500 \${
            pct > 60 ? 'bg-green-500' : pct > 20 ? 'bg-amber-500' : 'bg-red-500'
          }\`}
          style={{ width: \`\${pct}%\` }}
        />
      </div>
      <span className="text-sm font-medium tabular-nums">
        {charging ? '⚡' : '🔋'} {pct}%
      </span>
    </div>
  );
}`,
      tags: ['basic', 'indicator', 'progress-bar'],
    },
    {
      title: 'Low Battery Warning Banner',
      description:
        'Shows a dismissible warning banner when the battery drops below 20% and the device is not charging, encouraging the user to plug in.',
      code: `import { useBatteryStatus } from 'vayu-ui';
import { useState } from 'react';

export default function LowBatteryWarning() {
  const { level, charging, isSupported } = useBatteryStatus();
  const [dismissed, setDismissed] = useState(false);

  if (!isSupported || dismissed || charging || level > 0.2) {
    return null;
  }

  return (
    <div
      className="flex items-center justify-between gap-4 p-3 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
      role="alert"
    >
      <span className="text-sm">
        Low battery ({Math.round(level * 100)}%). Consider plugging in to avoid data loss.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="text-sm underline hover:no-underline"
      >
        Dismiss
      </button>
    </div>
  );
}`,
      tags: ['warning', 'low-battery', 'alert', 'banner'],
    },
    {
      title: 'Power-Aware Data Sync',
      description:
        'Wraps a data-fetching operation that is skipped when the battery is below 30% and the device is discharging, conserving power.',
      code: `import { useBatteryStatus } from 'vayu-ui';
import { useEffect, useState } from 'react';

export default function PowerAwareSync() {
  const { level, charging, isSupported } = useBatteryStatus();
  const [data, setData] = useState<string | null>(null);

  const shouldSync = !isSupported || charging || level > 0.3;

  useEffect(() => {
    if (!shouldSync) return;

    const interval = setInterval(() => {
      setData(new Date().toISOString());
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldSync]);

  return (
    <div className="text-sm space-y-1">
      <p>Status: {shouldSync ? 'Syncing' : 'Paused (low battery)'}</p>
      {data && <p className="text-muted-foreground">Last sync: {data}</p>}
    </div>
  );
}`,
      tags: ['sync', 'power-aware', 'conditional', 'performance'],
    },
    {
      title: 'Battery Details Card',
      description:
        'A card layout displaying all four battery properties including charge/discharge time estimates in a human-readable format.',
      code: `import { useBatteryStatus } from 'vayu-ui';

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '—';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? \`\${hours}h \${minutes}m\` : \`\${minutes}m\`;
}

export default function BatteryDetailsCard() {
  const { charging, chargingTime, dischargingTime, level, isSupported } = useBatteryStatus();

  if (!isSupported) {
    return (
      <div className="p-4 rounded-md border bg-surface text-surface-content">
        <p className="text-sm text-muted">Battery API is not available.</p>
      </div>
    );
  }

  const pct = Math.round(level * 100);

  return (
    <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content w-72 space-y-3">
      <h3 className="text-sm font-semibold">Battery Details</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded-md bg-muted/50 space-y-1">
          <span className="text-muted-foreground">Status</span>
          <p className="font-medium">{charging ? 'Charging' : 'On Battery'}</p>
        </div>
        <div className="p-2 rounded-md bg-muted/50 space-y-1">
          <span className="text-muted-foreground">Level</span>
          <p className="font-medium">{pct}%</p>
        </div>
        <div className="p-2 rounded-md bg-muted/50 space-y-1">
          <span className="text-muted-foreground">Time to Full</span>
          <p className="font-medium">{formatTime(chargingTime)}</p>
        </div>
        <div className="p-2 rounded-md bg-muted/50 space-y-1">
          <span className="text-muted-foreground">Time to Empty</span>
          <p className="font-medium">{formatTime(dischargingTime)}</p>
        </div>
      </div>
    </div>
  );
}`,
      tags: ['card', 'details', 'time-estimate', 'full-example'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Assuming Battery Status API is universally available',
      bad: `const { level } = useBatteryStatus();
return <span>{Math.round(level * 100)}%</span>;`,
      good: `const { level, isSupported } = useBatteryStatus();
if (!isSupported) return <span>Battery info unavailable</span>;
return <span>{Math.round(level * 100)}%</span>;`,
      reason:
        'The Battery Status API is not supported in all browsers (notably absent in Safari and iOS WebView). Always check isSupported before rendering battery-dependent UI to avoid showing misleading default values.',
    },
    {
      title: 'Polling the hook or calling it in a timer',
      bad: `useEffect(() => {
  const id = setInterval(() => refetchBattery(), 30000);
  return () => clearInterval(id);
}, []);`,
      good: `const battery = useBatteryStatus();
// The hook subscribes to BatteryManager events internally —
// the component re-renders automatically when values change.`,
      reason:
        'The hook already subscribes to all four BatteryManager change events (chargingchange, chargingtimechange, dischargingtimechange, levelchange). Polling wastes resources and adds unnecessary re-renders.',
    },
    {
      title: 'Using on SSR without guarding',
      bad: `export default function Page() {
  const { level } = useBatteryStatus();
  return <span>{level}</span>;
}`,
      good: `export default function Page() {
  const { level, isSupported } = useBatteryStatus();
  if (!isSupported) return <span>Battery info unavailable</span>;
  return <span>{Math.round(level * 100)}%</span>;
}`,
      reason:
        'During server-side rendering, navigator is undefined. The hook guards against this internally, returning isSupported: false with safe defaults. But your component must also handle the unsupported state to avoid hydration mismatches between server (isSupported: false) and client.',
    },
    {
      title: 'Treating level as a percentage (0-100)',
      bad: `const { level } = useBatteryStatus();
return <span>{level}%</span>; // Shows "1%" when fully charged`,
      good: `const { level } = useBatteryStatus();
return <span>{Math.round(level * 100)}%</span>;`,
      reason:
        'The level property is a float between 0 and 1, not 0 and 100. Displaying it directly will show "1%" for a full battery. Always multiply by 100 before displaying.',
    },
  ],
};
