'use client';

import { useTimeout } from 'vayu-ui';
import { useState } from 'react';
import { TimerReset, XCircle } from 'lucide-react';

export function UseTimeoutDemo() {
  const [status, setStatus] = useState('Pending...');
  const [trigger, setTrigger] = useState(0); // Used to re-trigger the timeout

  const { clearTimeout } = useTimeout(() => {
    setStatus('Executed!');
  }, 2000);

  const handleRestart = () => {
    setStatus('Pending...');
    clearTimeout(); // Ensure previous is cleared (though hook logic handles new timeout on re-render if we were to remount)
    // In this specific hook implementation, we need to remount or change dependencies to restart.
    // Since the hook takes 'callback', making 'callback' change or 'ms' change would restart it.
    // However, the cleanest way to "restart" with this hook API is to remount the component using the hook,
    // or we can't really "restart" without changing props.
    // Let's force a re-mount logic by using a key on a wrapper or just simulating it here.
    // But wait, the hook returns { clearTimeout }. It doesn't have a start function.
    // So this demo needs to be clever.
    setTrigger((t) => t + 1);
  };

  // Wrapper component to key it
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col items-center gap-6">
      <TimeoutInner
        key={trigger}
        onRestart={handleRestart}
        statusParent={status}
        setStatusParent={setStatus}
      />
    </div>
  );
}

function TimeoutInner({
  onRestart,
  statusParent,
  setStatusParent,
}: {
  onRestart: () => void;
  statusParent: string;
  setStatusParent: (s: string) => void;
}) {
  // We lift state up just to show it, or we can keep it local.
  // Actually, let's keep it local to this inner component for the actual timeout logic.
  // But to match the outer expectation, let's just use the hook here.

  useTimeout(() => {
    setStatusParent('Executed!');
  }, 2000);

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
          Timeout Status
        </span>
        <span
          className={`text-4xl font-black tabular-nums ${statusParent === 'Executed!' ? 'text-green-500' : 'text-yellow-500'}`}
        >
          {statusParent}
        </span>
        <p className="text-xs text-muted-foreground mt-1">
          {statusParent === 'Pending...' ? 'Waiting 2 seconds...' : 'Timeout completed.'}
        </p>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
      >
        <TimerReset className="h-4 w-4" />
        Restart Timeout
      </button>
    </>
  );
}
