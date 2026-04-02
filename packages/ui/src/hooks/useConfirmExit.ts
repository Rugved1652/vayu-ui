'use client';
import { useCallback, useEffect, useRef } from 'react';

export interface UseConfirmExitOptions {
  enabled: boolean;
  message?: string;
}

export const useConfirmExit = ({
  enabled,
  message = 'You have unsaved changes. Are you sure you want to leave?',
}: UseConfirmExitOptions): void => {
  const messageRef = useRef(message);
  messageRef.current = message;

  const handler = useCallback(
    (e: BeforeUnloadEvent) => {
      if (!enabled) return;
      e.preventDefault();
      e.returnValue = messageRef.current;
      return messageRef.current;
    },
    [enabled],
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [enabled, handler]);
};
