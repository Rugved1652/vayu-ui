import { ComponentRegistryEntry } from '../types.js';

export const datePickerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'date-picker',
  name: 'DatePicker',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A date and date-range selection component with calendar popup, month/year dropdowns, disabled date support, and WCAG 2.2 AA accessibility using the compound component pattern.',
  longDescription:
    'The DatePicker component provides interactive date selection with support for single-date and date-range modes. It features a calendar popup with month/year dropdown navigation, configurable disabled weekdays and specific disabled dates, controlled and uncontrolled modes, and a footer with Today and Clear actions. It uses the compound component pattern (DatePicker.Trigger, DatePicker.Calendar, DatePicker.Calendar.Footer) for flexible composition. Full keyboard navigation (arrow keys, Home/End, PageUp/PageDown) and ARIA dialog/grid semantics are built in for WCAG 2.2 AA compliance.',
  tags: [
    'date',
    'date-picker',
    'calendar',
    'date-range',
    'datepicker',
    'input',
    'form',
    'time',
    'schedule',
    'picker',
  ],
  useCases: [
    'Form date inputs where users need to select a single date (e.g. birth date, appointment date)',
    'Date range selection for booking systems, trip planners, or report date filters',
    'Scheduling interfaces that need to block specific dates (holidays, blackout days)',
    'Business-day-only selection by disabling weekends via disabledWeekdays',
    'Any form requiring accessible, keyboard-navigable date entry with a visual calendar',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'DatePicker',
  files: [
    {
      name: 'DatePicker.tsx',
      description:
        'Root component providing the DatePickerContext provider, internal state management for single/range mode, date validation, and calendar open/close logic',
    },
    {
      name: 'DatePickerTrigger.tsx',
      description:
        'Trigger button that displays the selected date or range and toggles the calendar popup, with aria-haspopup="dialog" and aria-expanded',
    },
    {
      name: 'DatePickerCalendar.tsx',
      description:
        'Calendar popup with month/year navigation dropdowns, date grid rendering, range hover highlighting, and fixed positioning with collision detection',
    },
    {
      name: 'DatePickerDropDowns.tsx',
      description:
        'Month and year dropdown lists with listbox ARIA pattern, keyboard navigation (Arrow keys, Home/End, PageUp/PageDown for years)',
    },
    {
      name: 'DatePickerFooter.tsx',
      description:
        'Footer bar with "Today" button to jump to current date and "Clear" button to reset selection',
    },
    {
      name: 'DatePickerIcons.tsx',
      description:
        'Internal SVG icon components: ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, CalendarIcon, XIcon',
    },
    {
      name: 'utils.ts',
      description:
        'Date utility functions: getMonthDays, isSameDay, isSameMonth, isToday, formatDate, isDateInRange, isRangeStart, isRangeEnd, isRangeHovered, plus DAY_NAMES and MONTH_NAMES constants',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript type definitions for DatePickerMode, DateRange, DatePickerValue, and all component prop interfaces',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component (DatePicker.Trigger, DatePicker.Calendar, DatePicker.Calendar.Footer) and re-exporting all types',
    },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'DatePicker',
  subComponents: [
    {
      name: 'Trigger',
      fileName: 'DatePickerTrigger.tsx',
      description:
        'Renders the trigger button that displays the selected date or placeholder text and toggles the calendar popup open/closed',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          defaultValue: "'Select date'",
          description:
            'Text displayed when no date is selected. Falls back to the root placeholder prop if not provided.',
        },
      ],
    },
    {
      name: 'Calendar',
      fileName: 'DatePickerCalendar.tsx',
      description:
        'Renders the calendar popup dialog with month/year navigation, date grid with keyboard navigation, and range hover highlighting',
      props: [],
    },
    {
      name: 'Calendar.Footer',
      fileName: 'DatePickerFooter.tsx',
      description:
        'Renders the footer with a "Today" button to jump to the current date and a "Clear" button to reset the selection',
      props: [],
    },
  ],
  hooks: ['useDatePicker', 'useMergeRefs'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'Compound sub-components to render inside the date picker (Trigger, Calendar, etc.)',
    },
    {
      name: 'mode',
      type: "'single' | 'range'",
      required: false,
      defaultValue: "'single'",
      description:
        "Selection mode: 'single' for one date, 'range' for start and end date selection",
      options: ['single', 'range'],
    },
    {
      name: 'value',
      type: 'Date | DateRange | null',
      required: false,
      description:
        'Controlled value. Date for single mode, { startDate, endDate } object for range mode. When provided, the component operates in controlled mode.',
    },
    {
      name: 'defaultValue',
      type: 'Date | DateRange | null',
      required: false,
      description: 'Initial value for uncontrolled mode',
    },
    {
      name: 'onChange',
      type: '(value: DatePickerValue) => void',
      required: false,
      description:
        'Callback fired when the user selects a date or range. Receives Date (single mode) or DateRange (range mode) or null.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables the entire date picker — trigger becomes non-interactive and visually muted',
    },
    {
      name: 'disabledWeekdays',
      type: 'number[]',
      required: false,
      defaultValue: '[]',
      description:
        'Array of weekday indices to disable (0 = Sunday, 6 = Saturday). Disabled days show with strikethrough styling.',
    },
    {
      name: 'disabledDates',
      type: 'Date[]',
      required: false,
      defaultValue: '[]',
      description:
        'Array of specific Date objects to disable from selection (e.g. holidays, blackout dates)',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      defaultValue: "'Select date'",
      description:
        'Default placeholder text shown in the trigger when no date is selected. Can be overridden by the Trigger sub-component.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — styling is fixed via design tokens

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Whether the calendar popup is visible. Managed internally via context — toggled by Trigger click or keyboard.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Disables the entire date picker. The trigger shows a disabled cursor and muted styling; no calendar interaction is possible.',
    },
    {
      name: 'mode',
      prop: 'mode',
      isBoolean: false,
      values: ['single', 'range'],
      defaultValue: "'single'",
      description:
        "Selection mode — 'single' allows picking one date, 'range' allows selecting a start and end date with hover preview.",
    },
    {
      name: 'rangeHover',
      prop: 'rangeHoverDate',
      isBoolean: false,
      defaultValue: 'null',
      description:
        'Internal hover state in range mode. While the user hovers after selecting a start date, dates between start and hover are highlighted as a preview.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature: '(value: DatePickerValue) => void',
      description:
        "Fired when the user selects a date. In single mode, receives the selected Date or null when cleared. In range mode, receives a DateRange { startDate, endDate } or null.",
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'dialog',
    attributes: [
      {
        name: 'role="dialog" (Calendar)',
        description:
          'The calendar popup container has role="dialog" so screen readers recognize it as a modal dialog.',
        managedByComponent: true,
      },
      {
        name: 'aria-modal="false" (Calendar)',
        description:
          'Set to false on the calendar dialog to indicate the background content remains interactive.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Calendar)',
        description:
          'The calendar dialog receives an aria-label like "Select date, January 2026" describing the currently viewed month.',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup="dialog" (Trigger)',
        description:
          'The trigger button has aria-haspopup="dialog" indicating it opens a dialog.',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded (Trigger)',
        description:
          'The trigger button has aria-expanded reflecting whether the calendar is open or closed.',
        managedByComponent: true,
      },
      {
        name: 'role="gridcell" (Date buttons)',
        description:
          'Each date button in the grid has role="gridcell" for grid-based navigation semantics.',
        managedByComponent: true,
      },
      {
        name: 'aria-selected (Date buttons)',
        description:
          'Applied to date gridcells when the date is part of the current selection.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled (Date buttons)',
        description:
          'Applied to date gridcells when the date is disabled via disabledWeekdays or disabledDates.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Date buttons)',
        description:
          'Each date button has a full aria-label like "Monday, January 5, 2026" for screen reader announcements.',
        managedByComponent: true,
      },
      {
        name: 'role="columnheader" (Day headers)',
        description:
          'Day-of-week header cells use role="columnheader" with aria-label containing the full day name.',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup="listbox" (Dropdown buttons)',
        description:
          'Month and year dropdown toggle buttons have aria-haspopup="listbox".',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded (Dropdown buttons)',
        description:
          'Month and year dropdown toggle buttons have aria-expanded reflecting dropdown state.',
        managedByComponent: true,
      },
      {
        name: 'role="listbox" (Dropdown lists)',
        description:
          'Month and year dropdown containers have role="listbox" with aria-activedescendant tracking keyboard focus.',
        managedByComponent: true,
      },
      {
        name: 'role="option" (Dropdown items)',
        description:
          'Individual month and year items have role="option" with aria-selected reflecting the current value.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      { key: 'ArrowRight', behavior: 'Move focus to the next day in the calendar grid' },
      { key: 'ArrowLeft', behavior: 'Move focus to the previous day in the calendar grid' },
      { key: 'ArrowDown', behavior: 'Move focus to the same day in the next week' },
      { key: 'ArrowUp', behavior: 'Move focus to the same day in the previous week' },
      { key: 'Home', behavior: 'Move focus to the first day of the current month' },
      { key: 'End', behavior: 'Move focus to the last day of the current month' },
      { key: 'PageUp', behavior: 'Navigate to the same day in the previous month' },
      { key: 'PageDown', behavior: 'Navigate to the same day in the next month' },
      {
        key: 'Enter / Space',
        behavior:
          'On a date cell: select the focused date. On the trigger: toggle the calendar open/closed.',
      },
      { key: 'Escape', behavior: 'Close the calendar popup and return focus to the trigger button' },
      {
        key: 'PageUp/PageDown (Year dropdown)',
        behavior: 'Jump 10 years backward/forward in the year list',
      },
    ],
    focusManagement:
      'Focus is trapped within the calendar popup when open. Date cells use roving tabindex (only the focused date has tabIndex=0). On Escape or date selection, focus returns to the trigger button via triggerRef. Dropdown lists manage their own roving tabIndex with aria-activedescendant.',
    wcagLevel: 'AA',
    notes:
      'The DatePicker follows the WAI-ARIA dialog and grid patterns. The calendar uses role="dialog" with a grid of role="gridcell" date buttons. Month and year dropdowns follow the listbox pattern with aria-activedescendant for virtual focus. The trigger button uses aria-haspopup="dialog" and aria-expanded to communicate state. Date buttons have full date aria-labels (e.g. "Monday, January 5, 2026") for clear screen reader announcements.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'moment' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'text-input',
      reason:
        'Commonly paired in forms where a text input collects a title or description alongside the selected date',
    },
    {
      slug: 'button',
      reason:
        'Submit and reset buttons are needed in date forms to confirm or clear the selected date/range',
    },
    {
      slug: 'card',
      reason:
        'Cards are frequently used to contain date pickers in booking forms, settings panels, or filter sections',
    },
    {
      slug: 'popover',
      reason:
        'Date pickers are often placed inside popovers or dropdown containers in complex form layouts',
    },
    {
      slug: 'form',
      reason:
        'Date pickers are a core form input and are commonly integrated into form validation flows',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Single Date Selection',
      description:
        'A controlled date picker for selecting a single date with calendar popup and footer actions.',
      code: `import { DatePicker } from 'vayu-ui';
import React, { useState } from 'react';

export default function BasicDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker.Root
      value={selectedDate}
      onChange={(value) => setSelectedDate(value as Date | null)}
      placeholder="Pick a date"
    >
      <DatePicker.Trigger />
      <DatePicker.Calendar>
        <DatePicker.Calendar.Footer />
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
}`,
      tags: ['basic', 'single', 'controlled'],
    },
    {
      title: 'Date Range Selection',
      description:
        'A range-mode date picker for selecting start and end dates, useful for booking or report filters.',
      code: `import { DatePicker, DateRange } from 'vayu-ui';
import React, { useState } from 'react';

export default function RangeDatePicker() {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  return (
    <DatePicker.Root
      mode="range"
      value={dateRange}
      onChange={(value) => setDateRange(value as DateRange | null)}
      placeholder="Select date range"
    >
      <DatePicker.Trigger />
      <DatePicker.Calendar>
        <DatePicker.Calendar.Footer />
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
}`,
      tags: ['range', 'date-range', 'controlled'],
    },
    {
      title: 'Disabled Weekdays (No Weekends)',
      description:
        'Disable specific weekdays such as Saturday and Sunday for business-day-only selection.',
      code: `import { DatePicker } from 'vayu-ui';
import React, { useState } from 'react';

export default function WeekdayDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker.Root
      value={date}
      onChange={(value) => setDate(value as Date | null)}
      disabledWeekdays={[0, 6]}
      placeholder="Select a weekday"
    >
      <DatePicker.Trigger />
      <DatePicker.Calendar>
        <DatePicker.Calendar.Footer />
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
}`,
      tags: ['disabled-weekdays', 'weekends', 'business-days'],
    },
    {
      title: 'Disabled Specific Dates',
      description:
        'Block specific dates such as holidays or blackout days from selection.',
      code: `import { DatePicker } from 'vayu-ui';
import React, { useState } from 'react';

export default function HolidayDatePicker() {
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 15),
    new Date(today.getFullYear(), today.getMonth(), 20),
  ];

  return (
    <DatePicker.Root
      value={date}
      onChange={(value) => setDate(value as Date | null)}
      disabledDates={disabledDates}
      placeholder="Select a date"
    >
      <DatePicker.Trigger />
      <DatePicker.Calendar>
        <DatePicker.Calendar.Footer />
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
}`,
      tags: ['disabled-dates', 'holidays', 'blackout'],
    },
    {
      title: 'Disabled State',
      description:
        'A fully disabled date picker that prevents all interaction.',
      code: `import { DatePicker } from 'vayu-ui';

export default function DisabledDatePicker() {
  return (
    <DatePicker.Root disabled placeholder="Cannot select">
      <DatePicker.Trigger />
    </DatePicker.Root>
  );
}`,
      tags: ['disabled', 'read-only'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside DatePicker.Root',
      bad: '<DatePicker.Trigger /><DatePicker.Calendar />',
      good: '<DatePicker.Root><DatePicker.Trigger /><DatePicker.Calendar /></DatePicker.Root>',
      reason:
        'All DatePicker sub-components depend on the DatePickerContext provided by DatePicker.Root. Rendering them outside Root will throw a "must be used within DatePicker" error.',
    },
    {
      title: 'Omitting Calendar.Footer',
      bad: '<DatePicker.Calendar />',
      good: '<DatePicker.Calendar><DatePicker.Calendar.Footer /></DatePicker.Calendar>',
      reason:
        'Without Calendar.Footer, users have no way to jump to today or clear their selection. Always include the footer for a complete date picking experience.',
    },
    {
      title: 'Passing string dates instead of Date objects',
      bad: '<DatePicker.Root value="2026-01-15" />',
      good: '<DatePicker.Root value={new Date(2026, 0, 15)} />',
      reason:
        'The value, defaultValue, and disabledDates props expect Date objects, not strings. Passing strings will cause runtime errors in date comparisons and moment.js formatting.',
    },
    {
      title: 'Using both value and defaultValue',
      bad: '<DatePicker.Root value={new Date()} defaultValue={new Date()} />',
      good: '<DatePicker.Root value={new Date()} onChange={handleChange} />',
      reason:
        'When value is provided, the component is in controlled mode and defaultValue is ignored. Passing both is misleading — pick one pattern.',
    },
    {
      title: 'Casting onChange value without checking mode',
      bad: '<DatePicker.Root mode="range" onChange={(v) => setDate(v as Date)} />',
      good: '<DatePicker.Root mode="range" onChange={(v) => setRange(v as DateRange)} />',
      reason:
        'In range mode, onChange returns a DateRange object { startDate, endDate }, not a Date. Casting to the wrong type causes silent bugs. Match the cast to the mode.',
    },
  ],
};
