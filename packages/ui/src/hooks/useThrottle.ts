'use client';
import { useState, useEffect, useRef } from 'react';

export const useThrottle = <T>(value: T, interval: number): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        const now = Date.now();
        if (now - lastExecuted.current >= interval) {
          setThrottledValue(value);
          lastExecuted.current = now;
        }
      },
      interval - (Date.now() - lastExecuted.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, interval]);

  return throttledValue;
};
