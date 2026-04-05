// types.ts
// Types

import { ReactNode } from 'react';

interface ShowProps<T> {
  when: T | undefined | null | false;
  fallback?: ReactNode;
  children: ReactNode | ((value: T) => ReactNode);
}

interface CaseProps {
  condition: boolean;
  children: ReactNode;
}

interface DefaultProps {
  children: ReactNode;
}

interface SwitchProps {
  children: ReactNode;
}

export type { ShowProps, CaseProps, DefaultProps, SwitchProps };
