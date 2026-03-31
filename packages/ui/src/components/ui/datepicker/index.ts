// index.ts
// Public API

import { DatePickerRoot } from "./datepicker";
import { DatePickerTrigger } from "./trigger";
import { DatePickerCalendar } from "./calendar";
import { DatePickerCalendarFooter } from "./footer";

// Compound API

const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  Trigger: DatePickerTrigger,
  Calendar: Object.assign(DatePickerCalendar, {
    Footer: DatePickerCalendarFooter,
  }),
});

export { DatePicker };
export default DatePicker;

// Subcomponents
export { DatePickerRoot } from "./datepicker";
export { DatePickerTrigger } from "./trigger";
export { DatePickerCalendar } from "./calendar";
export { DatePickerCalendarFooter } from "./footer";

// Public types
export type {
  DatePickerMode,
  DateRange,
  DatePickerValue,
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerCalendarProps,
  DatePickerCalendarFooterProps,
} from "./types";
