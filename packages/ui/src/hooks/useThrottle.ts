'use client';
import { useState, useEffect, useRef } from 'react';

export const useThrottle = <T>(value: T, interval: number): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const delay = Math.max(0, interval - (Date.now() - lastExecuted.current));
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - lastExecuted.current >= interval) {
        setThrottledValue(value);
        lastExecuted.current = now;
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, interval]);

  return throttledValue;
};
