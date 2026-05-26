import { HookRegistryEntry } from '../types.js';

export const useCountdownEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-countdown',
  name: 'useCountdown',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'A declarative countdown timer hook with start, pause, and reset controls, plus optional tick and complete callbacks.',
  longDescription:
    'Manages a countdown timer that decrements from a specified number of seconds, ticking at a configurable interval. The hook tracks remaining time, running state, and exposes imperative controls (start, pause, reset) via stable callbacks. Optional onTick and onComplete callbacks fire as the timer progresses and finishes. The timer automatically stops when time reaches zero. Time updates use functional setState to avoid stale closures, and callback refs prevent effect restarts when handlers change. The countdown can auto-start on mount or remain idle until start() is called. Changing the seconds prop while the timer is paused resets the countdown to the new value.',
  tags: [
    'countdown',
    'timer',
    'interval',
    'animation',
    'stopwatch',
    'time',
    'delay',
    'timeout',
    'auto-start',
    'controls',
  ],
  category: 'animation',
  useCases: [
    'Display a visual countdown timer for OTP resend buttons that enables the button after the countdown completes',
    'Implement a timed quiz or game where the user has a fixed duration to answer or act',
    'Create a session expiry warning that counts down the remaining time before automatic logout',
    'Build a cooking or workout timer with play, pause, and reset controls',
    'Add a cooldown period between repeated actions like form submissions or API calls',
    'Animate a progress bar or circular indicator synchronized to a countdown value',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useCountdown.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useCountdown(options: UseCountdownOptions): UseCountdownReturn',
  returnType: 'UseCountdownReturn',
  parameters: [
    {
      name: 'options',
      type: 'UseCountdownOptions',
      required: true,
      description:
        'Configuration object controlling the countdown behavior. Contains seconds, interval, callbacks, and auto-start flag.',
    },
    {
      name: 'options.seconds',
      type: 'number',
      required: true,
      description:
        'The initial number of seconds to count down from. Must be a positive integer. Changing this while the timer is paused resets timeLeft to the new value.',
    },
    {
      name: 'options.interval',
      type: 'number',
      required: false,
      defaultValue: '1000',
      description:
        'Tick interval in milliseconds. Defaults to 1000ms (1 second). Use smaller values for sub-second precision or larger values for slower updates.',
    },
    {
      name: 'options.onTick',
      type: '(timeLeft: number) => void',
      required: false,
      description:
        'Callback invoked on every tick with the current timeLeft value. Useful for side effects like logging, analytics, or syncing external state.',
    },
    {
      name: 'options.onComplete',
      type: '() => void',
      required: false,
      description:
        'Callback invoked once when the countdown reaches zero. Use this to trigger follow-up actions like enabling a button, showing a notification, or navigating.',
    },
    {
      name: 'options.autoStart',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'Whether the countdown should start automatically on mount. Defaults to false — call start() to begin.',
    },
  ],
  returnValues: [
    {
      name: 'timeLeft',
      type: 'number',
      description:
        'The remaining time in seconds. Starts at options.seconds and decrements on each tick until reaching 0.',
    },
    {
      name: 'isRunning',
      type: 'boolean',
      description:
        'Whether the countdown is currently active and ticking. True after start() is called, false after pause(), reset(), or completion.',
    },
    {
      name: 'start',
      type: '() => void',
      description:
        'Begins the countdown. Idempotent — calling start() while already running has no effect.',
    },
    {
      name: 'pause',
      type: '() => void',
      description:
        'Pauses the countdown, preserving the current timeLeft. Call start() to resume from where it left off.',
    },
    {
      name: 'reset',
      type: '() => void',
      description:
        'Stops the countdown and resets timeLeft back to options.seconds. Sets isRunning to false.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'OTP Resend Countdown',
      description:
        'A button that is disabled during a 60-second countdown after sending an OTP, then re-enables with a reset option.',
      code: `import { useCountdown } from 'vayu-ui';
import { useState } from 'react';

export default function OtpResend() {
  const [sent, setSent] = useState(false);

  const { timeLeft, start, reset, isRunning } = useCountdown({
    seconds: 60,
    autoStart: false,
    onComplete: () => setSent(false),
  });

  const handleSend = () => {
    setSent(true);
    start();
    // Simulate OTP API call
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleSend}
        disabled={isRunning}
        className="px-4 py-2 rounded-control bg-brand text-brand-content disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? \`Resend in \${timeLeft}s\` : sent ? 'Resend OTP' : 'Send OTP'}
      </button>
      {timeLeft === 0 && sent && (
        <button
          onClick={reset}
          className="text-sm text-muted-content hover:text-surface-content underline"
        >
          Reset timer
        </button>
      )}
    </div>
  );
}`,
      tags: ['otp', 'resend', 'button', 'disabled'],
    },
    {
      title: 'Quiz Timer with Progress',
      description:
        'A 30-second quiz question timer that shows a linear progress bar and auto-submits when time runs out.',
      code: `import { useCountdown } from 'vayu-ui';
import { useState, useCallback } from 'react';

export default function QuizTimer() {
  const [submitted, setSubmitted] = useState(false);
  const totalSeconds = 30;

  const handleComplete = useCallback(() => {
    setSubmitted(true);
  }, []);

  const { timeLeft, start, isRunning } = useCountdown({
    seconds: totalSeconds,
    autoStart: true,
    onComplete: handleComplete,
  });

  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Question 1 of 10</span>
        <span className={timeLeft <= 5 ? 'text-danger font-bold' : 'text-muted-content'}>
          {timeLeft}s
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-brand transition-all duration-1000 ease-linear"
          style={{ width: \`\${progress}%\` }}
        />
      </div>
      <p className="text-surface-content">What is the capital of France?</p>
      <button
        onClick={() => setSubmitted(true)}
        disabled={submitted}
        className="px-4 py-2 rounded-control bg-surface text-surface-content border hover:bg-muted/50 disabled:opacity-50"
      >
        {submitted ? 'Submitted' : 'Submit Answer'}
      </button>
    </div>
  );
}`,
      tags: ['quiz', 'timer', 'progress', 'auto-submit'],
    },
    {
      title: 'Pomodoro Work Timer',
      description:
        'A simple Pomodoro-style work timer with 25-minute sessions, pause/resume, and a reset button.',
      code: `import { useCountdown } from 'vayu-ui';

export default function PomodoroTimer() {
  const workMinutes = 25;
  const workSeconds = workMinutes * 60;

  const { timeLeft, start, pause, reset, isRunning } = useCountdown({
    seconds: workSeconds,
    interval: 1000,
    autoStart: false,
  });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-surface bg-surface text-surface-content border max-w-sm">
      <h2 className="text-lg font-semibold">Pomodoro Focus</h2>
      <div className="text-6xl font-mono tabular-nums tracking-tight">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-5 py-2 rounded-control bg-brand text-brand-content font-medium"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-5 py-2 rounded-control bg-warning text-warning-content font-medium"
          >
            Pause
          </button>
        )}
        <button
          onClick={reset}
          className="px-5 py-2 rounded-control bg-muted text-muted-content font-medium"
        >
          Reset
        </button>
      </div>
      {timeLeft === 0 && (
        <p className="text-sm text-success font-medium">Session complete! Take a break.</p>
      )}
    </div>
  );
}`,
      tags: ['pomodoro', 'productivity', 'timer', 'controls'],
    },
    {
      title: 'Cooldown Gate for Actions',
      description:
        'Prevents a user from triggering an expensive action more than once every 10 seconds, showing remaining cooldown time.',
      code: `import { useCountdown } from 'vayu-ui';
import { useState } from 'react';

export default function CooldownAction() {
  const [result, setResult] = useState<string | null>(null);

  const { timeLeft, start, isRunning } = useCountdown({
    seconds: 10,
    autoStart: false,
    onComplete: () => setResult(null),
  });

  const handleAction = async () => {
    start();
    setResult('Processing...');
    // Simulate expensive API call
    await new Promise((r) => setTimeout(r, 1500));
    setResult('Completed!');
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleAction}
        disabled={isRunning}
        className="px-4 py-2 rounded-control bg-brand text-brand-content disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? \`Wait \${timeLeft}s\` : 'Run Expensive Action'}
      </button>
      {result && <p className="text-sm text-muted-content">{result}</p>}
    </div>
  );
}`,
      tags: ['cooldown', 'rate-limit', 'action', 'gate'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using the hook for upward counting (stopwatch)',
      bad: `const { timeLeft } = useCountdown({ seconds: 0 });
// Trying to increment timeLeft manually`,
      good: `// Use a dedicated stopwatch or interval hook
const [elapsed, setElapsed] = useState(0);
useEffect(() => {
  const id = setInterval(() => setElapsed((p) => p + 1), 1000);
  return () => clearInterval(id);
}, []);`,
      reason:
        'useCountdown is designed exclusively for decrementing from a starting value to zero. It does not support upward counting or arbitrary direction changes. For stopwatch behavior, use useInterval or a custom upward timer.',
    },
    {
      title: 'Calling start, pause, or reset conditionally',
      bad: `if (shouldStart) {
  start();
}`,
      good: `useEffect(() => {
  if (shouldStart) start();
}, [shouldStart]);`,
      reason:
        'The returned controls are stable callbacks, but they must still be called in a React-safe context. Calling them during render or conditionally without an effect can lead to unexpected timing, stale state, or infinite loops.',
    },
    {
      title: 'Expecting sub-tick precision without adjusting interval',
      bad: `const { timeLeft } = useCountdown({ seconds: 5 });
// timeLeft only updates every 1000ms by default`,
      good: `const { timeLeft } = useCountdown({ seconds: 5, interval: 100 });
// Updates every 100ms for finer granularity`,
      reason:
        'The default interval is 1000ms. If you need to display tenths of a second or smoother progress updates, you must set a smaller interval. Otherwise the UI will only update once per second.',
    },
    {
      title: 'Relying on timeLeft in a synchronous check immediately after start',
      bad: `start();
if (timeLeft === 0) { /* ... */ }
// timeLeft hasn't updated yet — state changes are batched`,
      good: `useEffect(() => {
  if (timeLeft === 0) {
    // Handle completion
  }
}, [timeLeft]);`,
      reason:
        'React state updates are asynchronous and batched. timeLeft will not change immediately after calling start(). Use useEffect to react to timeLeft changes, or use the onComplete callback for completion logic.',
    },
    {
      title: 'Passing a new onTick or onComplete on every render without memoization',
      bad: `const { timeLeft } = useCountdown({
  seconds: 10,
  onTick: (t) => console.log(t), // new function every render
});`,
      good: `const handleTick = useCallback((t: number) => console.log(t), []);
const { timeLeft } = useCountdown({
  seconds: 10,
  onTick: handleTick,
});`,
      reason:
        'While the hook uses callback refs internally to avoid restarting the interval when handlers change, creating new function references on every render still causes unnecessary ref updates. Memoize callbacks with useCallback for optimal performance.',
    },
  ],
};
