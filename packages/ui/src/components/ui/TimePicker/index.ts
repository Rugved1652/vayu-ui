// index.ts
// Public API

import Timepicker from './TimePicker';
import { TimepickerTrigger } from './TimePickerTrigger';
import { TimepickerContent } from './TimePickerContent';
import { HourColumn, MinuteColumn, PeriodColumn, TimeGrid } from './TimePickerColumns';
import { TimepickerFooter, TimepickerError } from './TimePickerFooter';

export type {
  TimeValue,
  TimeRange,
  TimeFormat,
  TimepickerMode,
  DisabledTimeConfig,
  TimepickerContextValue,
  TimepickerRootProps,
  TimepickerTriggerProps,
  TimepickerContentProps,
  HourColumnProps,
  MinuteColumnProps,
  PeriodColumnProps,
  TimeGridProps,
  TimepickerFooterProps,
  TimepickerErrorProps,
} from './types';

// Compound component pattern
Timepicker.Trigger = TimepickerTrigger;
Timepicker.Content = TimepickerContent;
Timepicker.HourColumn = HourColumn;
Timepicker.MinuteColumn = MinuteColumn;
Timepicker.PeriodColumn = PeriodColumn;
Timepicker.TimeGrid = TimeGrid;
Timepicker.Footer = TimepickerFooter;
Timepicker.Error = TimepickerError;

export {
  TimepickerTrigger,
  TimepickerContent,
  HourColumn,
  MinuteColumn,
  PeriodColumn,
  TimeGrid,
  TimepickerFooter,
  TimepickerError,
};
export { Timepicker as default };
export { Timepicker };
