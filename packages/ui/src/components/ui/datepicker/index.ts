// index.ts
// Public API

import { DatePickerRoot } from './DatePicker';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerCalendarFooter } from './DatePickerFooter';

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
export { DatePickerRoot } from './DatePicker';
export { DatePickerTrigger } from './DatePickerTrigger';
export { DatePickerCalendar } from './DatePickerCalendar';
export { DatePickerCalendarFooter } from './DatePickerFooter';

// Public types
export type {
  DatePickerMode,
  DateRange,
  DatePickerValue,
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerCalendarProps,
  DatePickerCalendarFooterProps,
} from './types';
