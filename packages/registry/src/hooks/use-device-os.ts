import { HookRegistryEntry } from '../types.js';

export const useDeviceOSEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-device-os',
  name: 'useDeviceOS',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Detects the user\'s operating system, browser, device type, and touch capability by parsing navigator.userAgent and exposes them as reactive, SSR-safe state.',
  longDescription:
    'Parses navigator.userAgent via regex-based detection to identify the OS (Windows, macOS, Linux, Android, iOS, ChromeOS), browser (Chrome, Firefox, Safari, Edge, Opera, Samsung Internet), and device category (mobile, tablet, desktop). Touch capability is determined by checking for the ontouchstart event or navigator.maxTouchPoints. The hook is fully SSR-safe — it initializes with safe defaults (os: "Unknown", browser: "Unknown", deviceType: "desktop", isTouchDevice: false, userAgent: "", isReady: false) and only runs detection inside a useEffect after mount. The isReady flag is the key differentiator from naive window.navigator checks: it lets components distinguish between "detection has not run yet" (SSR or initial render) and "detection ran but could not identify the platform". This prevents hydration mismatches in Next.js, Remix, or any framework that server-renders HTML. No external dependencies beyond React are required.',
  tags: [
    'device',
    'os',
    'browser',
    'user-agent',
    'detection',
    'platform',
    'responsive',
    'touch',
    'mobile',
    'ssr-safe',
  ],
  category: 'input',
  useCases: [
    'Render platform-specific keyboard shortcut hints — show Cmd on macOS and Ctrl on Windows/Linux without hardcoding per platform',
    'Conditionally switch between mobile and desktop layouts based on device type (mobile, tablet, desktop) for responsive single-page applications',
    'Display OS-appropriate download buttons on a landing page — show App Store for iOS, Google Play for Android, .exe for Windows, .dmg for macOS',
    'Detect touch-only devices to swap click handlers for touch-optimized interactions, or hide hover-dependent UI on touch screens',
    'Log user device and browser demographics for analytics dashboards without adding a third-party analytics script',
    'Show a browser upgrade prompt when users visit with an unsupported or outdated browser, improving compatibility without blocking access',
    'Customize form input types based on device — for example, use tel input mode on mobile for phone number fields while keeping standard text input on desktop',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useDeviceOS.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useDeviceOS(): DeviceOSInfo',
  returnType: 'DeviceOSInfo',
  parameters: [],
  returnValues: [
    {
      name: 'os',
      type: "'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS' | 'ChromeOS' | 'Unknown'",
      description:
        'Detected operating system derived from user-agent string parsing. Returns "Unknown" if no known OS signature matches. On SSR or before hydration, defaults to "Unknown".',
    },
    {
      name: 'browser',
      type: "'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Opera' | 'Samsung Internet' | 'Unknown'",
      description:
        'Detected browser from user-agent string parsing. Detection order matters — Samsung Internet and Opera are checked before Chrome since their UA strings also contain "Chrome". Returns "Unknown" if no match is found.',
    },
    {
      name: 'deviceType',
      type: "'mobile' | 'tablet' | 'desktop'",
      description:
        'Physical device category. "mobile" for phones with mobile UA strings (including Android Mobile and iPhone), "tablet" for iPad and non-mobile Android, and "desktop" as the fallback for laptops and desktops.',
    },
    {
      name: 'isTouchDevice',
      type: 'boolean',
      description:
        'Whether the device supports touch input, determined by checking for the ontouchstart event or a non-zero navigator.maxTouchPoints. Returns false during SSR.',
    },
    {
      name: 'userAgent',
      type: 'string',
      description:
        'The raw navigator.userAgent string used for detection. Empty string during SSR. Useful for custom parsing or logging.',
    },
    {
      name: 'isReady',
      type: 'boolean',
      description:
        'Whether client-side detection has completed. Stays false during SSR and on the initial server-rendered HTML. Check this before rendering device-dependent UI to avoid hydration mismatches.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Platform-Specific Keyboard Shortcuts',
      description:
        'Displays the correct modifier key symbol (Cmd on macOS, Ctrl elsewhere) in a keyboard shortcut hint, ensuring accuracy across platforms.',
      code: `import { useDeviceOS } from 'vayu-ui';

export default function KeyboardShortcutHint() {
  const { os, isReady } = useDeviceOS();

  if (!isReady) {
    return <span className="text-sm text-muted">Loading shortcuts...</span>;
  }

  const mod = os === 'macOS' ? '\u2318' : 'Ctrl';
  const alt = os === 'macOS' ? '\u2325' : 'Alt';

  return (
    <div className="space-y-1 text-sm">
      <p>
        <kbd className="px-1.5 py-0.5 rounded border bg-muted/50 text-xs font-mono">{mod}</kbd> +{' '}
        <kbd className="px-1.5 py-0.5 rounded border bg-muted/50 text-xs font-mono">K</kbd>{' '}
        Open command palette
      </p>
      <p>
        <kbd className="px-1.5 py-0.5 rounded border bg-muted/50 text-xs font-mono">{mod}</kbd> +{' '}
        <kbd className="px-1.5 py-0.5 rounded border bg-muted/50 text-xs font-mono">{alt}</kbd> +{' '}
        <kbd className="px-1.5 py-0.5 rounded border bg-muted/50 text-xs font-mono">R</kbd>{' '}
        Reload without cache
      </p>
    </div>
  );
}`,
      tags: ['keyboard', 'shortcuts', 'macos', 'windows', 'modifier-key'],
    },
    {
      title: 'Device-Aware Layout Switcher',
      description:
        'Renders a different layout structure depending on whether the user is on a mobile, tablet, or desktop device.',
      code: `import { useDeviceOS } from 'vayu-ui';

export default function ResponsiveDashboard() {
  const { deviceType, isReady } = useDeviceOS();

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-muted">Detecting device...</span>
      </div>
    );
  }

  if (deviceType === 'mobile') {
    return (
      <div className="flex flex-col gap-2 p-2">
        <header className="p-3 rounded-surface bg-surface border">Mobile Nav</header>
        <main className="p-3 rounded-surface bg-surface border">Stacked Content</main>
      </div>
    );
  }

  if (deviceType === 'tablet') {
    return (
      <div className="grid grid-cols-[220px_1fr] gap-2 p-2 h-screen">
        <aside className="p-3 rounded-surface bg-surface border">Sidebar</aside>
        <main className="p-3 rounded-surface bg-surface border overflow-auto">Content</main>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[260px_1fr_200px] gap-4 p-4 h-screen">
      <aside className="p-4 rounded-surface bg-surface border">Sidebar</aside>
      <main className="p-4 rounded-surface bg-surface border overflow-auto">Main Content</main>
      <aside className="p-4 rounded-surface bg-surface border">Panel</aside>
    </div>
  );
}`,
      tags: ['layout', 'responsive', 'mobile', 'tablet', 'desktop'],
    },
    {
      title: 'OS-Specific Download Buttons',
      description:
        'Shows the primary download button for the detected OS and secondary options for other platforms, ideal for product landing pages.',
      code: `import { useDeviceOS } from 'vayu-ui';
import { useState } from 'react';

const platforms = [
  { os: 'Windows' as const, label: 'Download for Windows', ext: '.exe' },
  { os: 'macOS' as const, label: 'Download for macOS', ext: '.dmg' },
  { os: 'Linux' as const, label: 'Download for Linux', ext: '.AppImage' },
  { os: 'Android' as const, label: 'Get on Google Play', ext: '' },
  { os: 'iOS' as const, label: 'Get on App Store', ext: '' },
];

export default function DownloadSection() {
  const { os, isReady } = useDeviceOS();
  const [showAll, setShowAll] = useState(false);

  const primary = isReady
    ? platforms.find((p) => p.os === os) ?? platforms[0]
    : platforms[0];
  const others = platforms.filter((p) => p.os !== primary.os);

  return (
    <div className="space-y-3 text-center">
      <button className="px-6 py-3 rounded-control bg-brand text-brand-content font-medium shadow-control hover:opacity-90 transition-opacity">
        {primary.label}
      </button>
      {!showAll ? (
        <button
          onClick={() => setShowAll(true)}
          className="block mx-auto text-sm text-muted-content underline hover:no-underline"
        >
          Also available for {others.map((p) => p.os).join(', ')}
        </button>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {others.map((p) => (
            <button
              key={p.os}
              className="px-4 py-2 rounded-control border bg-surface text-surface-content text-sm hover:bg-muted/30 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`,
      tags: ['download', 'landing-page', 'platform', 'os-detection'],
    },
    {
      title: 'Browser Compatibility Warning',
      description:
        'Detects the browser and renders a dismissible warning when the user is on a browser known to have limited support, guiding them to upgrade.',
      code: `import { useDeviceOS } from 'vayu-ui';
import { useState } from 'react';

export default function BrowserWarning() {
  const { browser, isReady } = useDeviceOS();
  const [dismissed, setDismissed] = useState(false);

  if (!isReady || dismissed) return null;

  const isLegacyOrUnsupported = browser === 'Unknown';

  // You can extend this with version-specific checks if needed
  const knownIssues: Record<string, string> = {
    Opera: 'Some CSS features may not render correctly.',
    'Samsung Internet': '某些高级功能可能不可用。',
  };

  const issue = knownIssues[browser];
  if (!isLegacyOrUnsupported && !issue) return null;

  return (
    <div
      className="flex items-center justify-between gap-4 p-3 rounded-md bg-warning/10 text-warning border border-warning/30"
      role="alert"
    >
      <span className="text-sm">
        {isLegacyOrUnsupported
          ? 'Your browser is not fully supported. Please update for the best experience.'
          : issue}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="text-sm underline hover:no-underline whitespace-nowrap"
      >
        Dismiss
      </button>
    </div>
  );
}`,
      tags: ['browser', 'compatibility', 'warning', 'alert'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Trusting detection results before isReady is true',
      bad: `const { os } = useDeviceOS();
return <span>You are on {os}</span>;`,
      good: `const { os, isReady } = useDeviceOS();
if (!isReady) return <span>Detecting...</span>;
return <span>You are on {os}</span>;`,
      reason:
        'During SSR and on the initial render, the hook returns safe defaults (os: "Unknown", deviceType: "desktop", isReady: false). Rendering device-dependent UI without checking isReady will cause hydration mismatches — the server renders "Unknown" while the client may render "macOS".',
    },
    {
      title: 'Using UA detection for security or auth decisions',
      bad: `const { os } = useDeviceOS();
if (os === 'Linux') {
  grantAdminAccess(); // UA can be spoofed!
}`,
      good: `// Never trust client-side UA for security decisions.
// Use server-side session validation and permission checks instead.`,
      reason:
        'User-agent strings are trivially spoofed via browser devtools or HTTP headers. Any security-critical logic — authentication, authorization, feature gating — must be enforced server-side, not derived from client-side UA parsing.',
    },
    {
      title: 'Using browser detection instead of feature detection',
      bad: `const { browser } = useDeviceOS();
const supportsViewTransitions = browser === 'Chrome';`,
      good: `const supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document;`,
      reason:
        'Browser detection is fragile — new browser versions add features constantly, and UA string formats change. Always use feature detection (checking if the API exists) for capability checks. Reserve browser detection for UX hints like upgrade prompts, not functional gates.',
    },
    {
      title: 'Polling or re-running detection on every render',
      bad: `useEffect(() => {
  const interval = setInterval(() => {
    reDetectDevice();
  }, 5000);
  return () => clearInterval(interval);
}, []);`,
      good: `const { os, browser, deviceType, isReady } = useDeviceOS();
// The hook runs detection once on mount via useEffect.
// OS and browser do not change during a session.`,
      reason:
        'The user\'s OS and browser do not change during a page session. The hook correctly runs detection once in a useEffect on mount. Polling wastes resources and introduces unnecessary re-renders.',
    },
    {
      title: 'Assuming 100% detection accuracy',
      bad: `const { deviceType } = useDeviceOS();
if (deviceType === 'desktop') {
  // Assume no touch support, disable all touch handlers
  return <DesktopOnlyUI />;
}`,
      good: `const { deviceType, isTouchDevice } = useDeviceOS();
// Some laptops are "desktop" devices but have touch screens.
// Use both deviceType and isTouchDevice for decisions.`,
      reason:
        'User-agent parsing is heuristic-based. Some devices blur categories — for example, touchscreen laptops report as "desktop" but have touch capability, and some Android tablets have keyboard attachments. Combine deviceType with isTouchDevice for robust decisions rather than relying on a single field.',
    },
  ],
};
