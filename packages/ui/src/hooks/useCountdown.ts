'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCountdownOptions {
  seconds: number;
  interval?: number;
  onTick?: (timeLeft: number) => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

export const useCountdown = ({
  seconds,
  interval = 1000,
  onTick,
  onComplete,
  autoStart = false,
}: UseCountdownOptions) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ref-stabilize callbacks to avoid stale closures and effect restarts
  const onTickRef = useRef(onTick);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Main interval effect — depends only on isRunning and interval.
  // Uses functional setState so it never needs timeLeft in deps.
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        onTickRef.current?.(newTime);
        if (newTime <= 0) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          onCompleteRef.current?.();
        }
        return newTime > 0 ? newTime : 0;
      });
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, interval]);

  // Sync timeLeft when seconds prop changes and countdown is not running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(seconds);
    }
  }, [seconds, isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(seconds);
    setIsRunning(false);
  }, [seconds]);

  return { timeLeft, start, pause, reset, isRunning };
};
