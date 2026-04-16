import { HookRegistryEntry } from '../types.js';

export const useIntervalWhenEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-interval-when',
  name: 'useIntervalWhen',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Runs a callback on a fixed interval, but only when a boolean condition is true — with optional immediate execution on activation.',
  longDescription:
    'A declarative wrapper around setInterval that manages the timer lifecycle entirely through React effects. The hook stores the latest callback in a ref so the interval never re-creates when the callback identity changes — only when the interval duration (ms), the condition (when), or startImmediately change. When `when` flips to false, the interval is cleaned up automatically; when it flips back to true, a fresh interval starts. This makes it ideal for polling, live updates, and timed side effects that should pause and resume based on component state. Because the hook does not produce a return value and relies solely on useEffect cleanup, it is fully SSR-safe — no timers fire during server rendering. Choose this over a manual setInterval + useEffect combo when you need conditional activation without littering your component with timer management boilerplate.',
  tags: [
    'interval',
    'polling',
    'timer',
    'setinterval',
    'periodic',
    'conditional',
    'live-update',
    'refresh',
    'countdown',
    'repeat',
  ],
  category: 'animation',
  useCases: [
    'Poll an API endpoint every N seconds to keep a dashboard or notification feed up-to-date, but only while the component is visible or a toggle is active',
    'Build a live clock or elapsed-time counter that ticks every second while mounted, and pauses cleanly when the user navigates away',
    'Auto-refresh session tokens or heartbeats at a regular interval only while the user is authenticated or the tab is focused',
    'Implement a countdown timer that fires a tick callback every second while running, and stops automatically when the countdown reaches zero by setting `when` to false',
    'Periodically sync local state with a remote resource while a collaboration session is active, stopping when the session ends',
    'Create a rotating testimonial or carousel that auto-advances every few seconds, pausing when the user hovers or interacts',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useIntervalWhen.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useIntervalWhen(callback: () => void, ms: number, when: boolean, startImmediately?: boolean): void',
  parameters: [
    {
      name: 'callback',
      type: '() => void',
      required: true,
      description:
        'The function to execute on each interval tick. The hook stores the latest reference internally via a ref, so you do not need to wrap it in useCallback — the interval will always call the most recent version.',
    },
    {
      name: 'ms',
      type: 'number',
      required: true,
      description:
        'The interval duration in milliseconds. Changing this value while the interval is active will tear down and re-create the timer with the new duration. Typical values: 1000 for per-second ticks, 5000–30000 for API polling.',
    },
    {
      name: 'when',
      type: 'boolean',
      required: true,
      description:
        'Controls whether the interval is active. When true, the interval runs. When false, any running interval is cleared and the callback will not fire. Use this to conditionally start/stop the timer based on component state such as visibility, authentication, or user toggles.',
    },
    {
      name: 'startImmediately',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'When true, the callback fires once immediately upon activation (when `when` becomes true) before the first interval tick. Useful for polling scenarios where you want an initial fetch before waiting for the first interval cycle.',
    },
  ],
  returnType: 'void',
  returnValues: [],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Conditional API Polling',
      description:
        'Polls a notifications endpoint every 10 seconds while the panel is open, fetching immediately on open via startImmediately.',
      code: `import { useIntervalWhen } from 'vayu-ui';
import { useState, useCallback } from 'react';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data.items);
    } catch {
      // Silently ignore — next poll will retry
    }
  }, []);

  useIntervalWhen(fetchNotifications, 10_000, isOpen, true);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 rounded-control bg-brand text-brand-content"
      >
        {isOpen ? 'Close' : 'Open'} Notifications
      </button>

      {isOpen && (
        <ul className="border rounded-surface divide-y bg-surface text-surface-content">
          {notifications.map((n) => (
            <li key={n.id} className="px-3 py-2 text-sm flex items-center gap-2">
              {!n.read && <span className="h-2 w-2 rounded-full bg-brand" />}
              <span>{n.message}</span>
            </li>
          ))}
          {notifications.length === 0 && (
            <li className="px-3 py-4 text-sm text-muted-content text-center">
              No notifications yet
            </li>
          )}
        </ul>
      )}
    </div>
  );
}`,
      tags: ['polling', 'api', 'notifications', 'conditional'],
    },
    {
      title: 'Live Elapsed Timer',
      description:
        'Displays a running elapsed-time counter that ticks every second while active, showing hours, minutes, and seconds.',
      code: `import { useIntervalWhen } from 'vayu-ui';
import { useState, useCallback } from 'react';

function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const tick = useCallback(() => {
    setElapsed((prev) => prev + 1);
  }, []);

  useIntervalWhen(tick, 1000, running);

  return (
    <div className="space-y-4 p-6 rounded-surface border bg-surface text-surface-content text-center">
      <p className="text-4xl font-mono tracking-widest">{formatElapsed(elapsed)}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setRunning(true)}
          disabled={running}
          className="px-4 py-2 rounded-control bg-brand text-brand-content disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          disabled={!running}
          className="px-4 py-2 rounded-control border disabled:opacity-50"
        >
          Stop
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setElapsed(0);
          }}
          className="px-4 py-2 rounded-control border"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`,
      tags: ['timer', 'stopwatch', 'elapsed', 'clock'],
    },
    {
      title: 'Auto-Advancing Carousel',
      description:
        'A carousel that auto-advances every 4 seconds, pausing when the user hovers over it to prevent jarring transitions during interaction.',
      code: `import { useIntervalWhen, useHover } from 'vayu-ui';
import { useState, useRef, useCallback } from 'react';

const slides = [
  { id: 1, title: 'First Slide', color: 'bg-blue-500' },
  { id: 2, title: 'Second Slide', color: 'bg-emerald-500' },
  { id: 3, title: 'Third Slide', color: 'bg-amber-500' },
];

export default function AutoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(carouselRef);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  // Pause auto-advance while hovered
  useIntervalWhen(advance, 4000, !isHovered);

  return (
    <div ref={carouselRef} className="relative rounded-surface overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: \`translateX(-\${activeIndex * 100}%)\` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={\`\${slide.color} flex-shrink-0 w-full h-48 flex items-center justify-center text-white font-semibold text-lg\`}
          >
            {slide.title}
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={\`h-2 w-2 rounded-full transition-colors \${
              i === activeIndex ? 'bg-white' : 'bg-white/50'
            }\`}
          />
        ))}
      </div>
    </div>
  );
}`,
      tags: ['carousel', 'auto-advance', 'hover', 'pause'],
    },
    {
      title: 'Countdown Timer with Auto-Stop',
      description:
        'A countdown from 60 seconds that fires a tick every second, automatically stopping when it reaches zero by toggling the `when` parameter.',
      code: `import { useIntervalWhen } from 'vayu-ui';
import { useState, useCallback, useEffect } from 'react';

export default function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [running, setRunning] = useState(false);

  const tick = useCallback(() => {
    setSecondsLeft((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setRunning(false);
      }
      return Math.max(next, 0);
    });
  }, []);

  useIntervalWhen(tick, 1000, running && secondsLeft > 0);

  const percent = ((60 - secondsLeft) / 60) * 100;

  return (
    <div className="space-y-4 p-6 rounded-surface border bg-surface text-surface-content text-center max-w-xs mx-auto">
      <p className="text-5xl font-mono font-bold">{secondsLeft}s</p>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-brand transition-all duration-1000"
          style={{ width: \`\${percent}%\` }}
        />
      </div>

      <button
        onClick={() => {
          if (secondsLeft === 0) setSecondsLeft(60);
          setRunning(true);
        }}
        disabled={running}
        className="px-4 py-2 rounded-control bg-brand text-brand-content disabled:opacity-50"
      >
        {secondsLeft === 0 ? 'Restart' : 'Start'}
      </button>
    </div>
  );
}`,
      tags: ['countdown', 'timer', 'progress', 'auto-stop'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Forgetting to control `when` based on component lifecycle',
      bad: `// Interval runs forever, even when the data is no longer needed
useIntervalWhen(fetchData, 5000, true);`,
      good: `// Only poll while the panel is open
useIntervalWhen(fetchData, 5000, isPanelOpen);`,
      reason:
        'Passing a hardcoded `true` for `when` means the interval runs from mount to unmount with no way to pause it. Always wire `when` to a meaningful boolean — component visibility, feature toggle, or authentication state — so the timer stops when its work is no longer needed.',
    },
    {
      title: 'Wrapping the callback in useCallback thinking it matters',
      bad: `const tick = useCallback(() => {
  setCount((prev) => prev + 1);
}, []);

useIntervalWhen(tick, 1000, true);`,
      good: `// useCallback is unnecessary — the hook uses a ref internally
useIntervalWhen(() => {
  setCount((prev) => prev + 1);
}, 1000, true);`,
      reason:
        'useIntervalWhen stores the callback in a ref and reads from that ref on each tick, so it always calls the latest version regardless of reference identity. Wrapping the callback in useCallback adds no value and clutters the code. The only reason to use useCallback is if the same function is passed to other memoized consumers.',
    },
    {
      title: 'Using setInterval directly instead of the hook',
      bad: `useEffect(() => {
  const id = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]); // re-creates interval every time count changes`,
      good: `useIntervalWhen(() => {
  setCount((prev) => prev + 1);
}, 1000, isActive);`,
      reason:
        'A manual setInterval inside useEffect often ends up in the dependency array accidentally, causing the interval to be torn down and re-created on every tick. useIntervalWhen isolates the callback via a ref so the interval only re-creates when ms, when, or startImmediately actually change.',
    },
    {
      title: 'Passing a negative or zero interval duration',
      bad: `useIntervalWhen(tick, 0, true);
// or
useIntervalWhen(tick, -1000, true);`,
      good: `useIntervalWhen(tick, 1000, true);`,
      reason:
        'Passing 0 to setInterval creates a zero-delay timer that fires as fast as the event loop allows, which can freeze the browser. Negative values are coerced to 0 by the browser. Always use a meaningful positive duration. If you need an immediate one-shot action, use startImmediately: true with a reasonable interval.',
    },
    {
      title: 'Expecting a return value to read interval state',
      bad: `const { isActive, count } = useIntervalWhen(callback, 1000, true);
// Hook returns void — there is no isActive or count`,
      good: `const [ticks, setTicks] = useState(0);
useIntervalWhen(() => {
  setTicks((prev) => prev + 1);
}, 1000, true);
// Track state yourself — the hook only manages the timer lifecycle`,
      reason:
        'useIntervalWhen returns void. It is a fire-and-forget side-effect hook that manages timer lifecycle only. If you need to track how many times the callback has fired, whether the interval is active, or any other derived state, manage that state yourself in your component.',
    },
  ],
};
