// index.ts
// Public API

import Timepicker from "./timepicker";
import { TimepickerTrigger } from "./trigger";
import { TimepickerContent } from "./content";
import { HourColumn, MinuteColumn, PeriodColumn, TimeGrid } from "./columns";
import { TimepickerFooter, TimepickerError } from "./footer";

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
} from "./types";

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
