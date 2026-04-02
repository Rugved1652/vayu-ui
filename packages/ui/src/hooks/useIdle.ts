'use client';
import { useState, useEffect, useRef } from 'react';

export const useIdle = (timeout: number) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsIdle(false);
    timeoutRef.current = setTimeout(() => setIsIdle(true), timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'wheel', 'touchstart', 'scroll'];

    resetTimer();

    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [timeout]);

  return isIdle;
};
