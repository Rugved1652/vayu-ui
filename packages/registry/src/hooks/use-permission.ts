import { HookRegistryEntry } from '../types.js';

export const usePermissionEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-permission',
  name: 'usePermission',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that queries and monitors browser permission states (camera, microphone, geolocation, notifications, clipboard, and more) with a built-in request function to trigger the browser permission prompt.',
  longDescription:
    'Wraps the Permissions API (navigator.permissions.query) into a React-friendly hook that returns the current state of a given browser permission along with boolean convenience flags and a request() function. The hook subscribes to the PermissionStatus "change" event, so the component re-renders automatically when the user grants or denies a permission through the browser UI — even if it happens in another tab or via the browser address bar. The request() function is permission-aware: it invokes the appropriate browser API to trigger the actual permission prompt (getUserMedia for camera/microphone, getCurrentPosition for geolocation, Notification.requestPermission for notifications, navigator.clipboard for clipboard access). For permissions without a direct request mechanism (e.g. persistent-storage, push), request() is a no-op and the user must change the permission via browser settings. On unsupported browsers or during SSR, isSupported stays false and state defaults to "unsupported", preventing hydration mismatches and runtime errors. The hook accepts a union type of 10 well-known permission names, ensuring type safety and preventing typos. No external dependencies beyond React are required.',

  tags: [
    'permission',
    'browser-api',
    'privacy',
    'camera',
    'microphone',
    'geolocation',
    'notifications',
    'clipboard',
    'media',
    'consent',
  ],
  category: 'input',
  useCases: [
    'Build a permission settings page that displays the current state of camera, microphone, geolocation, and notification permissions with individual request buttons',
    'Conditionally render a camera view or microphone recorder only after the user has granted the corresponding permission, showing a prompt screen otherwise',
    'Detect when a user has previously denied a permission and show a message directing them to browser settings to re-enable it',
    'Monitor permission state changes in real time so the UI reacts immediately when a user grants or revokes a permission via the browser chrome',
    'Before initiating a WebRTC call, check if camera and microphone permissions are already granted to avoid unexpected browser prompts mid-flow',
    'Build an onboarding flow that walks users through granting required permissions one at a time with contextual explanations before each request',
    'Create a clipboard read/write feature that checks permission state first and degrades gracefully when clipboard access is denied or unsupported',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'usePermission.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function usePermission(permissionName: PermissionName): UsePermissionReturn',
  parameters: [
    {
      name: 'permissionName',
      type:
        "'camera' | 'microphone' | 'geolocation' | 'notifications' | 'persistent-storage' | 'push' | 'screen-wake-lock' | 'midi' | 'clipboard-read' | 'clipboard-write'",
      required: true,
      description:
        'The browser permission to query. Must be one of the 10 supported PermissionName literals. Changing this value between renders will unsubscribe from the old permission status and subscribe to the new one. Each permission maps to a specific browser API — the request() function uses the appropriate API for each name (e.g. getUserMedia for camera, getCurrentPosition for geolocation).',
    },
  ],
  returnType: 'UsePermissionReturn',
  returnValues: [
    {
      name: 'state',
      type: "'granted' | 'denied' | 'prompt' | 'unsupported' | 'loading'",
      description:
        'The current permission state as reported by the Permissions API. "loading" is the initial value before the async query resolves. "unsupported" means the Permissions API is not available or the specific permission name is not recognized by the browser. "prompt" means the user has not yet been asked. "granted" and "denied" reflect the user\'s decision. This value updates reactively when the user changes the permission through the browser UI.',
    },
    {
      name: 'isGranted',
      type: 'boolean',
      description:
        'Shorthand for state === "granted". Use this for conditional rendering when you only care whether access is allowed, e.g. showing a camera preview only when permission is granted.',
    },
    {
      name: 'isDenied',
      type: 'boolean',
      description:
        'Shorthand for state === "denied". Use this to detect when a user has explicitly blocked a permission so you can show a message directing them to browser settings.',
    },
    {
      name: 'isPrompt',
      type: 'boolean',
      description:
        'Shorthand for state === "prompt". Use this to show a "Request Permission" button only when the user has not yet been asked, avoiding unnecessary repeated prompts.',
    },
    {
      name: 'isSupported',
      type: 'boolean',
      description:
        'Whether the Permissions API (navigator.permissions) is available in the current environment. Returns false during SSR and on browsers that do not implement the Permissions API. Always check this before rendering permission-dependent UI to avoid showing misleading controls.',
    },
    {
      name: 'request',
      type: '() => Promise<void>',
      description:
        'An async function that triggers the browser permission prompt for the queried permission. It uses the appropriate browser API for each permission type: getUserMedia for camera/microphone, getCurrentPosition for geolocation, Notification.requestPermission for notifications, and navigator.clipboard methods for clipboard access. The promise resolves when the prompt flow completes (or silently catches rejections). For permissions without a direct request mechanism (persistent-storage, push, screen-wake-lock, midi), this is a no-op. Call this from a user gesture handler (e.g. button onClick) — browsers may reject programmatic permission requests not triggered by user interaction.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Permission Status Dashboard',
      description:
        'Displays the current state of multiple browser permissions with color-coded badges and individual request buttons.',
      code: `'use client';
import { usePermission, type PermissionName } from 'vayu-ui';

const PERMISSIONS: { name: PermissionName; label: string }[] = [
  { name: 'camera', label: 'Camera' },
  { name: 'microphone', label: 'Microphone' },
  { name: 'geolocation', label: 'Geolocation' },
  { name: 'notifications', label: 'Notifications' },
  { name: 'clipboard-read', label: 'Clipboard Read' },
];

const stateStyles: Record<string, string> = {
  granted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  denied: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  prompt: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  unsupported: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  loading: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

function PermissionRow({ name, label }: { name: PermissionName; label: string }) {
  const { state, isGranted, request } = usePermission(name);

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50 text-sm">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className={\`text-xs font-medium px-2 py-0.5 rounded-full \${stateStyles[state]}\`}>
          {state}
        </span>
        {!isGranted && state !== 'unsupported' && (
          <button onClick={request} className="text-xs font-medium text-brand hover:underline">
            Request
          </button>
        )}
      </div>
    </div>
  );
}

export default function PermissionDashboard() {
  return (
    <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content w-80 space-y-3">
      <h3 className="text-sm font-semibold">Browser Permissions</h3>
      <div className="flex flex-col gap-2">
        {PERMISSIONS.map((p) => (
          <PermissionRow key={p.name} name={p.name} label={p.label} />
        ))}
      </div>
    </div>
  );
}`,
      tags: ['dashboard', 'status', 'multi-permission', 'settings'],
    },
    {
      title: 'Conditional Camera View',
      description:
        'Shows a camera preview only after the user grants camera permission, with a styled prompt screen otherwise.',
      code: `'use client';
import { usePermission } from 'vayu-ui';
import { useEffect, useRef } from 'react';

export default function CameraView() {
  const { isGranted, isDenied, isPrompt, isSupported, request } = usePermission('camera');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isGranted) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, [isGranted]);

  if (!isSupported) {
    return (
      <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content">
        <p className="text-sm text-muted">Camera API is not available in this browser.</p>
      </div>
    );
  }

  if (isDenied) {
    return (
      <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content space-y-2">
        <p className="text-sm text-destructive font-medium">Camera access denied</p>
        <p className="text-xs text-muted">
          Enable camera access in your browser settings to use this feature.
        </p>
      </div>
    );
  }

  if (isPrompt) {
    return (
      <div className="p-6 rounded-surface shadow-surface border bg-surface text-surface-content text-center space-y-3">
        <p className="text-sm font-medium">Camera access is required</p>
        <button
          onClick={request}
          className="px-4 py-2 rounded-control bg-brand text-brand-content text-sm font-medium shadow-control"
        >
          Allow Camera
        </button>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full max-w-sm rounded-surface shadow-surface"
    />
  );
}`,
      tags: ['camera', 'conditional-render', 'webrtc', 'media'],
    },
    {
      title: 'Location Permission Gate',
      description:
        'Checks geolocation permission state before attempting to fetch the position, avoiding unexpected browser prompts.',
      code: `'use client';
import { usePermission } from 'vayu-ui';
import { useState } from 'react';

export default function LocationGate() {
  const { state, isGranted, isDenied, request } = usePermission('geolocation');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => setLoading(false),
    );
  };

  return (
    <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content w-72 space-y-3">
      <h3 className="text-sm font-semibold">Your Location</h3>
      {isDenied && (
        <p className="text-xs text-destructive">
          Location access is blocked. Enable it in browser settings.
        </p>
      )}
      {coords && (
        <p className="text-xs font-mono text-muted">
          {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </p>
      )}
      {loading && <p className="text-xs text-muted">Locating...</p>}
      <div className="flex gap-2">
        {!isGranted && (
          <button
            onClick={request}
            className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-xs font-medium shadow-control"
          >
            Grant Access
          </button>
        )}
        {isGranted && !coords && (
          <button
            onClick={fetchLocation}
            className="px-3 py-1.5 rounded-control bg-brand text-brand-content text-xs font-medium shadow-control"
          >
            Get Location
          </button>
        )}
      </div>
      <p className="text-xs text-muted">Permission state: {state}</p>
    </div>
  );
}`,
      tags: ['geolocation', 'permission-gate', 'location', 'gps'],
    },
    {
      title: 'Notification Permission with Subscribe Flow',
      description:
        'A notification subscription component that guides the user through granting notification permission and displays the current state.',
      code: `'use client';
import { usePermission } from 'vayu-ui';

export default function NotificationSubscribe() {
  const { isGranted, isDenied, isPrompt, state, request } = usePermission('notifications');

  return (
    <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content w-72 space-y-3">
      <h3 className="text-sm font-semibold">Push Notifications</h3>

      {state === 'loading' && (
        <p className="text-xs text-muted">Checking permission...</p>
      )}

      {isPrompt && (
        <div className="space-y-2">
          <p className="text-xs text-muted">
            Stay updated with real-time notifications for important events.
          </p>
          <button
            onClick={request}
            className="w-full px-3 py-2 rounded-control bg-brand text-brand-content text-sm font-medium shadow-control"
          >
            Enable Notifications
          </button>
        </div>
      )}

      {isGranted && (
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          <span className="font-medium">Notifications enabled</span>
        </div>
      )}

      {isDenied && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
            <span className="font-medium text-destructive">Notifications blocked</span>
          </div>
          <p className="text-xs text-muted">
            Open browser settings to re-enable notifications for this site.
          </p>
        </div>
      )}
    </div>
  );
}`,
      tags: ['notifications', 'push', 'subscribe', 'opt-in'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Calling request() on mount instead of from a user gesture',
      bad: `useEffect(() => {
  request(); // Triggers browser prompt immediately on page load
}, []);`,
      good: `// Only call request() from a user-triggered event handler
<button onClick={() => request()}>Grant Permission</button>;`,
      reason:
        'Most browsers require permission prompts to be triggered by a user gesture (click, tap). Calling request() in useEffect or during render will either be silently ignored or anger users with unexpected popups. Always bind it to a button click or equivalent interaction.',
    },
    {
      title: 'Assuming all permissions support the request() method',
      bad: `// persistent-storage has no direct user-facing prompt
const { request } = usePermission('persistent-storage');
// User clicks button, nothing visible happens
<button onClick={() => request()}>Request</button>;`,
      good: `const { state, isSupported } = usePermission('persistent-storage');
// For permissions without a browser prompt, guide the user to settings
if (!isSupported || state !== 'granted') {
  return <p>Enable persistent storage in your browser settings.</p>;
}`,
      reason:
        'The request() function is a no-op for permissions that lack a direct browser API prompt mechanism (persistent-storage, push, screen-wake-lock, midi). For these, the user must change the permission through browser settings. Check the permission state and provide appropriate guidance instead of showing a non-functional request button.',
    },
    {
      title: 'Ignoring the unsupported state during SSR',
      bad: `const { isGranted } = usePermission('camera');
// On server: isGranted is false, on client hydration: might be true
return isGranted ? <CameraView /> : null;`,
      good: `const { state, isSupported } = usePermission('camera');
if (state === 'loading' || !isSupported) return <Skeleton />;
if (isGranted) return <CameraView />;
return <PromptScreen />;`,
      reason:
        'During SSR, navigator is undefined so the hook returns isSupported: false. If your component conditionally renders based solely on isGranted (which is false during SSR), you may still get hydration mismatches if the client immediately resolves to granted. Handle the "loading" and "unsupported" states explicitly to avoid flicker.',
    },
    {
      title: 'Not handling the "denied" state separately from "prompt"',
      bad: `const { isGranted, request } = usePermission('camera');
return isGranted ? <Camera /> : <button onClick={request}>Allow</button>;`,
      good: `const { isGranted, isDenied, isPrompt, request } = usePermission('camera');
if (isGranted) return <Camera />;
if (isDenied) return <p>Camera blocked. Enable it in browser settings.</p>;
if (isPrompt) return <button onClick={request}>Allow Camera</button>;
return null;`,
      reason:
        'When a permission is "denied", calling request() again typically does nothing — the browser will not re-show the prompt. The user must manually re-enable the permission via browser settings. Treating "denied" and "prompt" the same leads to a broken UX where clicking "Allow" does nothing. Always differentiate these states and guide denied users to their browser settings.',
    },
    {
      title: 'Querying unsupported permission names',
      bad: `// Typo or unsupported name — TypeScript catches this, but not if you cast
const { state } = usePermission('camer' as any);`,
      good: `// Use the typed PermissionName union — the hook accepts only valid names
const { state } = usePermission('camera');`,
      reason:
        'The PermissionName type restricts input to the 10 supported permission names. Casting to any or using a string variable bypasses this safety. If the Permissions API does not recognize the name, the hook catches the error and sets state to "unsupported", but the intent is likely wrong. Always use the typed literal to catch mistakes at compile time.',
    },
  ],
};
