import { ComponentRegistryEntry } from '../types.js';

export const timePickerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'time-picker',
  name: 'TimePicker',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible time selection component with single time and time-range modes, 12h/24h formats, inline editing, keyboard navigation, and disabled time support using the compound component pattern.',
  longDescription:
    'The TimePicker component provides an interactive time input with a dropdown panel containing hour, minute, and AM/PM columns. It supports single time selection and time-range selection with start/end tabs. Users can type directly into the trigger inputs or pick from scrollable columns. Features include 12-hour and 24-hour formats, configurable minute step intervals, disabled hours/times, min/max time constraints, body scroll locking, focus trapping, and full keyboard navigation. The compound component API (Timepicker.Trigger, Timepicker.Content, Timepicker.TimeGrid, Timepicker.Footer) allows flexible composition.',
  tags: [
    'time',
    'time-picker',
    'timepicker',
    'clock',
    'schedule',
    'input',
    'form',
    'range',
    '12h',
    '24h',
    'hours',
    'minutes',
  ],
  useCases: [
    'Form time inputs where users need to select a single time (e.g. appointment time, event start)',
    'Time range selection for booking systems, shift schedulers, or availability windows',
    'Scheduling interfaces that need to block specific hours or time slots',
    'Quick time entry via direct keyboard input with automatic formatting and validation',
    'Any form requiring accessible, keyboard-navigable time entry with a visual picker',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'TimePicker',
  files: [
    {
      name: 'TimePicker.tsx',
      description:
        'Root component providing TimepickerContext, controlled/uncontrolled state management for single/range mode, temp value handling, and click-outside/Escape dismissal',
    },
    {
      name: 'TimePickerTrigger.tsx',
      description:
        'Trigger with inline hour/minute/period inputs, range display, clear button, loading spinner, and chevron toggle. Supports direct keyboard entry and arrow-key increment/decrement',
    },
    {
      name: 'TimePickerContent.tsx',
      description:
        'Portal-rendered dropdown dialog with focus trapping, body scroll lock, automatic positioning, and range mode start/end tab navigation',
    },
    {
      name: 'TimePickerColumns.tsx',
      description:
        'Scrollable hour, minute, and AM/PM columns with role="listbox" semantics, auto-scroll to selected value, and keyboard navigation across columns',
    },
    {
      name: 'TimePickerFooter.tsx',
      description:
        'Footer with Clear and Apply buttons for range and apply-button modes, plus an Error display sub-component',
    },
    {
      name: 'utils.ts',
      description:
        'Time utility functions: parseTimeString, formatTimeValue, convertTo12Hour, convertTo24Hour, isTimeDisabled, timeToMinutes, isValidTimeRange, clampTimeSegment',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript type definitions for TimeValue, TimeRange, TimeFormat, TimepickerMode, TimepickerRootProps, and all sub-component prop interfaces',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component and re-exporting all types',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Timepicker',
  subComponents: [
    {
      name: 'Trigger',
      fileName: 'TimePickerTrigger.tsx',
      description:
        'Renders the trigger with inline editable hour/minute/period inputs, clock icon, clear button, and dropdown toggle. Supports direct typing and arrow-key adjustments.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the trigger container',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          required: false,
          description: 'Override the trigger size; falls back to the root size prop',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'TimePickerContent.tsx',
      description:
        'Portal-rendered dropdown dialog with range mode tabs, focus trapping, body scroll lock, and keyboard navigation',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Content to render inside the dropdown (typically Timepicker.TimeGrid and Timepicker.Footer)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the dropdown container',
        },
      ],
    },
    {
      name: 'HourColumn',
      fileName: 'TimePickerColumns.tsx',
      description:
        'Scrollable hour column (1-12 for 12h, 0-23 for 24h) with auto-scroll to selection and disabled hour support',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the hour column container',
        },
      ],
    },
    {
      name: 'MinuteColumn',
      fileName: 'TimePickerColumns.tsx',
      description:
        'Scrollable minute column filtered by minuteStep, with auto-scroll to selection and disabled minute support',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the minute column container',
        },
      ],
    },
    {
      name: 'PeriodColumn',
      fileName: 'TimePickerColumns.tsx',
      description:
        'AM/PM period column rendered only when format is "12h". Supports keyboard selection and auto-closing in single mode.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the period column container',
        },
      ],
    },
    {
      name: 'TimeGrid',
      fileName: 'TimePickerColumns.tsx',
      description:
        'Convenience layout that renders HourColumn, MinuteColumn, and PeriodColumn side by side in a single row',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the grid row container',
        },
      ],
    },
    {
      name: 'Footer',
      fileName: 'TimePickerFooter.tsx',
      description:
        'Renders Clear and Apply buttons. In range mode, the Apply button is disabled until a valid range is selected.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom footer content; when omitted, renders Clear and Apply buttons',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the footer container',
        },
      ],
    },
    {
      name: 'Error',
      fileName: 'TimePickerFooter.tsx',
      description: 'Renders an error message with an alert icon, displaying the root error prop or custom children',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom error message; falls back to the root error prop',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the error container',
        },
      ],
    },
  ],
  hooks: ['useTimepicker'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'Compound sub-components to render inside the time picker (Trigger, Content, TimeGrid, Footer, etc.)',
    },
    {
      name: 'value',
      type: 'TimeValue | TimeRange | null',
      required: false,
      description:
        'Controlled value. TimeValue for single mode, TimeRange for range mode, or null. When provided, the component operates in controlled mode.',
    },
    {
      name: 'defaultValue',
      type: 'TimeValue | TimeRange | null',
      required: false,
      description: 'Initial value for uncontrolled mode',
    },
    {
      name: 'onValueChange',
      type: '(value: TimeValue | TimeRange | null) => void',
      required: false,
      description: 'Callback fired when the selected time or range changes',
    },
    {
      name: 'format',
      type: "'12h' | '24h'",
      required: false,
      defaultValue: "'12h'",
      description: 'Time display format: 12-hour with AM/PM or 24-hour',
      options: ['12h', '24h'],
    },
    {
      name: 'mode',
      type: "'single' | 'range'",
      required: false,
      defaultValue: "'single'",
      description: "Selection mode: 'single' for one time, 'range' for start and end time selection",
      options: ['single', 'range'],
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text rendered above the trigger with htmlFor linked to the input',
    },
    {
      name: 'error',
      type: 'string',
      required: false,
      description: 'Deprecated. Error message text. Use validationState instead.',
    },
    {
      name: 'validationState',
      type: "'default' | 'error' | 'success' | 'warning'",
      required: false,
      description: 'Visual validation state applied to the trigger border',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      defaultValue: "'md'",
      description: 'Size of the trigger input',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables the entire time picker — trigger becomes non-interactive and visually muted',
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Shows a loading spinner in the trigger',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root container',
    },
    {
      name: 'minuteStep',
      type: 'number',
      required: false,
      defaultValue: '5',
      description: 'Step interval for minute column values (e.g. 5 renders 00, 05, 10, ...)',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'Placeholder text shown in the trigger when no time is selected',
    },
    {
      name: 'clearable',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, shows a clear button in the trigger to reset the selection',
    },
    {
      name: 'showApplyButton',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, selections in the dropdown update a temporary value until Apply is pressed',
    },
    {
      name: 'disabledTimes',
      type: 'string[]',
      required: false,
      description: 'Array of time strings in "HH:MM" format to disable from selection',
    },
    {
      name: 'disabledHours',
      type: 'number[]',
      required: false,
      description: 'Array of hour numbers (0-23) to disable entirely from selection',
    },
    {
      name: 'minTime',
      type: 'string',
      required: false,
      description: 'Minimum selectable time in "HH:MM" format',
    },
    {
      name: 'maxTime',
      type: 'string',
      required: false,
      description: 'Maximum selectable time in "HH:MM" format',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Whether the time picker dropdown is visible. Toggled by trigger click, keyboard, or programmatic control.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Disables the entire time picker. The trigger shows a disabled cursor and muted styling; no dropdown interaction is possible.',
    },
    {
      name: 'loading',
      prop: 'loading',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Shows a loading spinner in the trigger, indicating an external loading state.',
    },
    {
      name: 'mode',
      prop: 'mode',
      isBoolean: false,
      values: ['single', 'range'],
      defaultValue: "'single'",
      description:
        "Selection mode — 'single' allows picking one time, 'range' allows selecting a start and end time with tab navigation.",
    },
    {
      name: 'format',
      prop: 'format',
      isBoolean: false,
      values: ['12h', '24h'],
      defaultValue: "'12h'",
      description:
        'Display format — 12h shows AM/PM period column and accepts 1-12 hours; 24h shows 0-23 hours with no period column.',
    },
    {
      name: 'rangePhase',
      prop: 'rangePhase',
      isBoolean: false,
      values: ['start', 'end'],
      defaultValue: "'start'",
      description:
        'In range mode, indicates whether the user is currently selecting the start or end time. Controlled via tabs in the dropdown.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onValueChange',
      signature: '(value: TimeValue | TimeRange | null) => void',
      description:
        'Fired when the user selects a time or range. In single mode, receives TimeValue or null. In range mode, receives TimeRange or null.',
    },
    {
      name: 'onClick (Trigger)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Clicking the trigger toggles the dropdown open/closed and focuses the input.',
    },
    {
      name: 'onKeyDown (hour input)',
      signature: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
      description:
        'Keyboard navigation within the hour input: ArrowRight moves to minutes, ArrowUp/ArrowDown increments/decrements, Enter commits and moves to minutes.',
    },
    {
      name: 'onKeyDown (minute input)',
      signature: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
      description:
        'Keyboard navigation within the minute input: ArrowLeft moves to hours, ArrowRight moves to period (12h), ArrowUp/ArrowDown increments/decrements, Enter commits.',
    },
    {
      name: 'onKeyDown (dropdown)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description:
        'Escape closes the dropdown and returns focus to the trigger. Tab traps focus within the dropdown content.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'combobox',
    attributes: [
      {
        name: 'role="combobox"',
        description:
          'Applied to the trigger element to indicate it controls a popup listbox for time selection.',
        managedByComponent: true,
      },
      {
        name: 'role="dialog"',
        description:
          'Applied to the dropdown content container for screen reader dialog semantics.',
        managedByComponent: true,
      },
      {
        name: 'role="listbox"',
        description: 'Applied to each hour/minute/period column container.',
        managedByComponent: true,
      },
      {
        name: 'role="option"',
        description: 'Applied to each selectable time value within the columns.',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Set on the trigger to indicate whether the dropdown is open.',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup="listbox"',
        description: 'Set on the trigger to indicate it opens a listbox popup.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Set on the trigger when the component is disabled.',
        managedByComponent: true,
      },
      {
        name: 'aria-selected',
        description: 'Set on each option to indicate whether it is currently selected.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled (options)',
        description: 'Set on options that fall within disabled hours, times, or min/max constraints.',
        managedByComponent: true,
      },
      {
        name: 'aria-modal="true"',
        description: 'Set on the dropdown dialog to indicate modal behavior.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description:
          'Provided on individual inputs ("Hour", "Minute", "AM/PM") and the dropdown dialog ("Time selection").',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowDown / ArrowUp',
        behavior: 'Within a column: moves focus to the next/previous option and scrolls into view.',
      },
      {
        key: 'ArrowRight / ArrowLeft',
        behavior: 'Moves focus between columns (hour -> minute -> period).',
      },
      {
        key: 'Home',
        behavior: 'Within a column: jumps focus to the first option.',
      },
      {
        key: 'End',
        behavior: 'Within a column: jumps focus to the last option.',
      },
      {
        key: 'Enter / Space',
        behavior: 'Selects the focused option. In single mode without apply button, closes the dropdown.',
      },
      {
        key: 'Escape',
        behavior: 'Closes the dropdown, discards temporary changes, and returns focus to the trigger.',
      },
      {
        key: 'Tab',
        behavior: 'Traps focus within the dropdown content, cycling through focusable elements.',
      },
      {
        key: 'ArrowUp / ArrowDown (trigger inputs)',
        behavior: 'Increments or decrements the hour/minute/period value.',
      },
    ],
    focusManagement:
      'When the dropdown opens, focus is moved to the first selected option or the first focusable element after a short delay. Tab cycles within the dropdown. Escape closes the dropdown and returns focus to the trigger. Body scroll is locked while the dropdown is open.',
    wcagLevel: 'AA',
    notes:
      'The TimePicker follows WAI-ARIA combobox and dialog patterns. Hour, minute, and period inputs have numeric inputMode for mobile keyboards. The trigger supports direct text entry with automatic clamping and validation against disabled times. In range mode, the Apply button validates that the end time is not before the start time.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'lucide-react' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'text-input',
      reason:
        'Commonly paired in forms where a text input collects a title or description alongside the selected time',
    },
    {
      slug: 'button',
      reason:
        'Submit and reset buttons are needed in time forms to confirm or clear the selected time/range',
    },
    {
      slug: 'date-picker',
      reason:
        'Time pickers are frequently combined with date pickers to create complete datetime selection interfaces',
    },
    {
      slug: 'card',
      reason:
        'Cards are frequently used to contain time pickers in booking forms, settings panels, or filter sections',
    },
    {
      slug: 'form',
      reason:
        'Time pickers are a core form input and are commonly integrated into form validation flows',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Single Time Selection',
      description: 'A simple 12-hour time picker with default configuration.',
      code: `import { Timepicker } from 'vayu-ui';

export default function BasicTimePicker() {
  return (
    <Timepicker.Root>
      <Timepicker.Trigger />
      <Timepicker.Content>
        <Timepicker.TimeGrid />
      </Timepicker.Content>
    </Timepicker.Root>
  );
}`,
      tags: ['basic', 'single', '12h'],
    },
    {
      title: '24-Hour Format Time Picker',
      description: 'Time picker using 24-hour format with a 15-minute step interval.',
      code: `import { Timepicker } from 'vayu-ui';
import { useState } from 'react';

export default function TimePicker24h() {
  const [value, setValue] = useState<{ hour: number; minute: number } | null>(null);

  return (
    <Timepicker.Root
      format="24h"
      minuteStep={15}
      value={value}
      onValueChange={setValue}
      placeholder="Select time"
    >
      <Timepicker.Trigger />
      <Timepicker.Content>
        <Timepicker.TimeGrid />
      </Timepicker.Content>
    </Timepicker.Root>
  );
}`,
      tags: ['24h', 'step', 'controlled'],
    },
    {
      title: 'Time Range Selection',
      description: 'Range-mode time picker with apply button for selecting start and end times.',
      code: `import { Timepicker } from 'vayu-ui';
import { useState } from 'react';

export default function TimeRangePicker() {
  const [range, setRange] = useState<{ start: { hour: number; minute: number } | null; end: { hour: number; minute: number } | null } | null>(null);

  return (
    <Timepicker.Root
      mode="range"
      showApplyButton
      value={range}
      onValueChange={setRange}
      placeholder="Select time range"
    >
      <Timepicker.Trigger />
      <Timepicker.Content>
        <Timepicker.TimeGrid />
        <Timepicker.Footer />
      </Timepicker.Content>
    </Timepicker.Root>
  );
}`,
      tags: ['range', 'apply', 'start-end'],
    },
    {
      title: 'Disabled Times and Hours',
      description: 'Time picker with blocked lunch hours and specific disabled time slots.',
      code: `import { Timepicker } from 'vayu-ui';

export default function RestrictedTimePicker() {
  return (
    <Timepicker.Root
      disabledHours={[0, 1, 2, 3, 4, 5, 6, 22, 23]}
      disabledTimes={['12:00', '12:30']}
      minTime="09:00"
      maxTime="18:00"
    >
      <Timepicker.Trigger />
      <Timepicker.Content>
        <Timepicker.TimeGrid />
      </Timepicker.Content>
    </Timepicker.Root>
  );
}`,
      tags: ['disabled', 'constraints', 'business-hours'],
    },
    {
      title: 'Controlled Time Picker with Label',
      description: 'A controlled time picker with a label and validation error state.',
      code: `import { Timepicker } from 'vayu-ui';
import { useState } from 'react';

export default function ControlledTimePicker() {
  const [time, setTime] = useState<{ hour: number; minute: number } | null>({ hour: 9, minute: 0 });

  return (
    <Timepicker.Root
      value={time}
      onValueChange={setTime}
      label="Meeting Time"
      validationState="error"
      error="Please select a time during business hours"
    >
      <Timepicker.Trigger />
      <Timepicker.Content>
        <Timepicker.TimeGrid />
      </Timepicker.Content>
    </Timepicker.Root>
  );
}`,
      tags: ['controlled', 'label', 'validation', 'error'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside Timepicker.Root',
      bad: '<Timepicker.Trigger /><Timepicker.Content />',
      good: '<Timepicker.Root><Timepicker.Trigger /><Timepicker.Content /></Timepicker.Root>',
      reason:
        'All Timepicker sub-components depend on TimepickerContext provided by Timepicker.Root. Rendering them outside Root throws a "must be used within Timepicker.Root" error.',
    },
    {
      title: 'Mixing controlled and uncontrolled value props',
      bad: '<Timepicker.Root value={time} defaultValue={{ hour: 9, minute: 0 }}>',
      good: '<Timepicker.Root value={time} onValueChange={setTime}>',
      reason:
        'Passing both value and defaultValue creates conflicting state management. Use value + onValueChange for controlled mode, or defaultValue alone for uncontrolled mode.',
    },
    {
      title: 'Using Timepicker.TimeGrid with individual columns outside it',
      bad: '<Timepicker.TimeGrid /><Timepicker.HourColumn />',
      good: '<Timepicker.Content><Timepicker.TimeGrid /></Timepicker.Content>',
      reason:
        'Timepicker.TimeGrid already renders HourColumn, MinuteColumn, and PeriodColumn together. Adding individual columns separately creates duplicate UI elements.',
    },
    {
      title: 'Passing invalid time strings to minTime or maxTime',
      bad: '<Timepicker.Root minTime="9am" maxTime="5pm">',
      good: '<Timepicker.Root minTime="09:00" maxTime="17:00">',
      reason:
        'minTime and maxTime expect strings in "HH:MM" 24-hour format. Invalid formats will fail silently during comparison and may not apply constraints correctly.',
    },
    {
      title: 'Forgetting Timepicker.Footer in range mode with showApplyButton',
      bad: '<Timepicker.Root mode="range" showApplyButton><Timepicker.Trigger /><Timepicker.Content><Timepicker.TimeGrid /></Timepicker.Content></Timepicker.Root>',
      good: '<Timepicker.Root mode="range" showApplyButton><Timepicker.Trigger /><Timepicker.Content><Timepicker.TimeGrid /><Timepicker.Footer /></Timepicker.Content></Timepicker.Root>',
      reason:
        'When showApplyButton is true in range mode, the user needs the Footer with Apply/Clear buttons to confirm or discard their selection. Without it, the temporary value cannot be committed.',
    },
  ],
};
