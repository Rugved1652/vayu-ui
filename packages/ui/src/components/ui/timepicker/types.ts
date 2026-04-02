// types.ts
// Types

import type { ReactNode, RefObject } from 'react';

export interface TimeValue {
  hour: number;
  minute: number;
}

export interface TimeRange {
  start: TimeValue | null;
  end: TimeValue | null;
}

export type TimeFormat = '12h' | '24h';
export type TimepickerMode = 'single' | 'range';

export interface DisabledTimeConfig {
  disabledTimes?: string[];
  disabledHours?: number[];
  minTime?: string;
  maxTime?: string;
}

export interface TimepickerContextValue extends DisabledTimeConfig {
  value: TimeValue | TimeRange | null;
  onValueChange: (value: TimeValue | TimeRange | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  format: TimeFormat;
  mode: TimepickerMode;
  rangePhase: 'start' | 'end';
  setRangePhase: (phase: 'start' | 'end') => void;
  label?: string;
  error?: string;
  disabled: boolean;
  triggerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  id: string;
  minuteStep: number;
  placeholder?: string;
  clearable: boolean;
  showApplyButton: boolean;
  tempValue: TimeValue | TimeRange | null;
  setTempValue: (value: TimeValue | TimeRange | null) => void;
  applySelection: () => void;
  clearSelection: () => void;
}

export interface TimepickerRootProps extends DisabledTimeConfig {
  children: ReactNode;
  value?: TimeValue | TimeRange | null;
  defaultValue?: TimeValue | TimeRange | null;
  onValueChange?: (value: TimeValue | TimeRange | null) => void;
  format?: TimeFormat;
  mode?: TimepickerMode;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  minuteStep?: number;
  placeholder?: string;
  clearable?: boolean;
  showApplyButton?: boolean;
}

export interface TimepickerTriggerProps {
  className?: string;
}

export interface TimepickerContentProps {
  children?: ReactNode;
  className?: string;
}

interface TimeColumnProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export type { TimeColumnProps };

export interface HourColumnProps {
  className?: string;
}

export interface MinuteColumnProps {
  className?: string;
}

export interface PeriodColumnProps {
  className?: string;
}

export interface TimeGridProps {
  className?: string;
}

export interface TimepickerFooterProps {
  children?: ReactNode;
  className?: string;
}

export interface TimepickerErrorProps {
  children?: ReactNode;
  className?: string;
}
