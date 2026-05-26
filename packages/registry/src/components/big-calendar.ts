import { ComponentRegistryEntry } from '../types.js';

export const bigCalendarEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'big-calendar',
  name: 'BigCalendar',
  type: 'component',
  category: 'data-display',
  capabilities: ['content-primitive'],

  // ── Description ───────────────────────────────────────
  description:
    'A flexible calendar component with month, week, and day views, event display, navigation, keyboard accessibility, and compound sub-components.',
  longDescription:
    'The BigCalendar component displays events in three view modes (month, week, day) using the compound component pattern. It supports controlled and uncontrolled date/view state, custom event rendering, click handlers for events and date cells, event removal, Monday/Sunday week start options, and full keyboard navigation within the calendar grid. The default layout includes a toolbar with navigation buttons and view switcher, but all sub-components can be composed manually for custom layouts.',
  tags: [
    'calendar',
    'events',
    'schedule',
    'month-view',
    'week-view',
    'day-view',
    'date-picker',
    'planning',
    'agenda',
    'appointment',
  ],
  useCases: [
    'Team scheduling dashboards showing meetings and deadlines in month or week views',
    'Booking systems where users select available dates and time slots',
    'Project management tools visualizing task timelines and milestones',
    'Personal planners with event creation, editing, and removal workflows',
    'Resource allocation calendars for rooms, equipment, or personnel',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'BigCalendar',
  files: [
    {
      name: 'BigCalendar.tsx',
      description:
        'Root component with CalendarContext provider, date/view state management, navigation logic, and default composed children (Toolbar + current view)',
    },
    {
      name: 'BigCalendarToolbar.tsx',
      description:
        'Toolbar with Today/Prev/Next navigation buttons, dynamic period title, and Month/Week/Day view switcher radiogroup',
    },
    {
      name: 'BigCalendarMonthView.tsx',
      description:
        'Month grid view with 7-column day headers, 6-week day cells, event chips, overflow counters, and keyboard arrow navigation',
    },
    {
      name: 'BigCalendarWeekView.tsx',
      description:
        'Week view with day column headers, 24-hour time grid, event positioning by start hour, and keyboard navigation across hours and days',
    },
    {
      name: 'BigCalendarDayView.tsx',
      description:
        'Day view with all-day events section, 24-hour time grid, and focused keyboard navigation up/down through hours',
    },
    {
      name: 'BigCalendarEvent.tsx',
      description:
        'Reusable event chip with color theming, compact/default variants, optional remove button, and click/keydown handling',
    },
    {
      name: 'hooks.ts',
      description:
        'CalendarContext creation and useCalendar hook for consuming calendar state and actions in sub-components',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript types for CalendarView, CalendarEvent, BigCalendarProps, CalendarContextValue, and BigCalendarEventProps',
    },
    {
      name: 'utils.ts',
      description:
        'Date helpers (isSameDay, isToday, startOfWeek, addDays, getMonthDays, getWeekDays), hour formatting, event filtering, color classes, and ARIA label formatters',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component and re-exporting all public types',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'BigCalendar',
  subComponents: [
    {
      name: 'Toolbar',
      fileName: 'BigCalendarToolbar.tsx',
      description:
        'Navigation and view switcher toolbar with Today, Previous, Next buttons and Month/Week/Day toggle.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the toolbar container',
        },
      ],
    },
    {
      name: 'MonthView',
      fileName: 'BigCalendarMonthView.tsx',
      description:
        'Month grid displaying 6 weeks of day cells with events, overflow indicators, and keyboard navigation.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the month view container',
        },
      ],
    },
    {
      name: 'WeekView',
      fileName: 'BigCalendarWeekView.tsx',
      description:
        'Week grid with 7 day columns and 24 hour rows, showing timed events at their start hour.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the week view container',
        },
      ],
    },
    {
      name: 'DayView',
      fileName: 'BigCalendarDayView.tsx',
      description:
        'Single day view with all-day events header and 24-hour time grid for timed events.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the day view container',
        },
      ],
    },
    {
      name: 'Event',
      fileName: 'BigCalendarEvent.tsx',
      description:
        'Event chip with color theming, title display, optional remove button, and keyboard interaction support.',
      props: [
        {
          name: 'event',
          type: 'CalendarEvent',
          required: true,
          description: 'The calendar event object to display',
        },
        {
          name: 'showRemove',
          type: 'boolean',
          required: false,
          description:
            'Whether to show the remove button. Defaults to true when onEventRemove is provided on the root.',
        },
        {
          name: 'height',
          type: 'number',
          required: false,
          description: 'Fixed height in pixels for timed events in WeekView and DayView',
        },
        {
          name: 'variant',
          type: "'compact' | 'default'",
          required: false,
          defaultValue: "'default'",
          description: 'Layout variant: compact for month view lists, default for absolute-positioned time blocks',
          options: ['compact', 'default'],
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the event chip',
        },
      ],
    },
  ],
  hooks: ['useCalendar'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'events',
      type: 'CalendarEvent[]',
      required: false,
      defaultValue: '[]',
      description: 'Array of events to display on the calendar',
    },
    {
      name: 'defaultDate',
      type: 'Date',
      required: false,
      description: 'Initial date to display for uncontrolled usage',
    },
    {
      name: 'date',
      type: 'Date',
      required: false,
      description: 'Controlled current date. Use with onDateChange for fully controlled mode.',
    },
    {
      name: 'view',
      type: 'CalendarView',
      required: false,
      description: 'Controlled active view. Use with onViewChange for fully controlled mode.',
    },
    {
      name: 'defaultView',
      type: 'CalendarView',
      required: false,
      defaultValue: "'month'",
      description: 'Initial view for uncontrolled usage',
      options: ['month', 'week', 'day'],
    },
    {
      name: 'onDateChange',
      type: '(date: Date) => void',
      required: false,
      description: 'Callback fired when the displayed date changes via navigation',
    },
    {
      name: 'onViewChange',
      type: '(view: CalendarView) => void',
      required: false,
      description: 'Callback fired when the active view changes',
    },
    {
      name: 'onEventClick',
      type: '(event: CalendarEvent) => void',
      required: false,
      description: 'Callback fired when an event chip is clicked',
    },
    {
      name: 'onDateClick',
      type: '(date: Date) => void',
      required: false,
      description: 'Callback fired when a day cell or hour slot is clicked',
    },
    {
      name: 'onEventRemove',
      type: '(event: CalendarEvent) => void',
      required: false,
      description: 'Callback fired when an event remove button is clicked',
    },
    {
      name: 'weekStartsOn',
      type: '0 | 1',
      required: false,
      defaultValue: '0',
      description: 'Day the week starts on: 0 for Sunday, 1 for Monday',
      options: ['0', '1'],
    },
    {
      name: 'renderEvent',
      type: '(event: CalendarEvent) => React.ReactNode',
      required: false,
      description: 'Custom renderer for events. When provided, the default Event chip is not used.',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'currentDate',
      prop: 'date',
      isBoolean: false,
      description: 'The date currently being displayed. Controlled via date prop or internal state.',
    },
    {
      name: 'view',
      prop: 'view',
      isBoolean: false,
      defaultValue: "'month'",
      values: ['month', 'week', 'day'],
      description: 'The active calendar view mode',
    },
    {
      name: 'weekStartsOn',
      prop: 'weekStartsOn',
      isBoolean: false,
      defaultValue: '0',
      values: ['0', '1'],
      description: 'First day of the week: 0 (Sunday) or 1 (Monday)',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onDateChange',
      signature: '(date: Date) => void',
      description: 'Fired when the user navigates to a different date via toolbar or keyboard',
    },
    {
      name: 'onViewChange',
      signature: '(view: CalendarView) => void',
      description: 'Fired when the user switches between month, week, and day views',
    },
    {
      name: 'onEventClick',
      signature: '(event: CalendarEvent) => void',
      description: 'Fired when an event chip is clicked',
    },
    {
      name: 'onDateClick',
      signature: '(date: Date) => void',
      description: 'Fired when a day cell (MonthView) or hour slot (WeekView/DayView) is clicked',
    },
    {
      name: 'onEventRemove',
      signature: '(event: CalendarEvent) => void',
      description: 'Fired when the remove button on an event chip is clicked',
    },
    {
      name: 'onClick (Event)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Native click on the event chip element',
    },
    {
      name: 'onKeyDown (Event)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Enter or Space on a focused event chip triggers onEventClick',
    },
    {
      name: 'onKeyDown (Day cell)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Arrow keys navigate between cells; Enter/Space triggers onDateClick',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'application',
    attributes: [
      {
        name: 'aria-label',
        description: 'Set to "Calendar" on the root container',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Toolbar navigation)',
        description: 'Toolbar buttons have aria-labels: "Previous period", "Next period"',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Toolbar view switcher)',
        description: 'View switcher is a radiogroup with aria-label="Calendar view"',
        managedByComponent: true,
      },
      {
        name: 'aria-checked',
        description: 'Applied to view switcher buttons to indicate the active view',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Set to "polite" on the toolbar title for screen reader announcements when navigating',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Month grid)',
        description: 'Month grid has aria-label with the current month and year',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Week grid)',
        description: 'Week grid has aria-label with the week range',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Day grid)',
        description: 'Day grid has aria-label with the full date',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Day cell)',
        description: 'Each day cell has a descriptive aria-label with the full date',
        managedByComponent: true,
      },
      {
        name: 'aria-selected',
        description: 'Set on the current day cell in month view to indicate today',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Event)',
        description: 'Event chips have aria-label with the event title and all-day status',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Remove button)',
        description: 'Remove button has aria-label="Remove {event title}"',
        managedByComponent: true,
      },
      {
        name: 'role (Toolbar)',
        description: 'Toolbar has role="toolbar" and date buttons are grouped with role="group"',
        managedByComponent: true,
      },
      {
        name: 'role (Grid)',
        description: 'Month, week, and day views use role="grid" with row, columnheader, gridcell, and rowheader roles',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowRight',
        behavior: 'Moves focus to the next day cell in month view, or next day column in week view',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Moves focus to the previous day cell or day column',
      },
      {
        key: 'ArrowDown',
        behavior: 'Moves focus to the next week in month view, or next hour in week/day view',
      },
      {
        key: 'ArrowUp',
        behavior: 'Moves focus to the previous week in month view, or previous hour in week/day view',
      },
      {
        key: 'Enter / Space',
        behavior: 'Activates the focused day cell (triggers onDateClick) or event chip (triggers onEventClick)',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus out of the calendar grid to the next focusable element',
      },
    ],
    focusManagement:
      'The first focusable cell in each view has tabIndex={0}; others have tabIndex={-1}. Arrow keys programmatically move focus between cells using refs. Event chips are focusable buttons with tabIndex={0}.',
    wcagLevel: 'AA',
    notes:
      'Day names use columnheader with full names as aria-labels and abbreviated names as visible text. Event images are aria-hidden. Overflow counters ("+3 more") have explicit aria-labels. The toolbar title announces changes politely.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'moment' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'modal',
      reason: 'Event detail views and creation forms commonly open inside a Modal from calendar interactions',
    },
    {
      slug: 'button',
      reason: 'Custom toolbar actions or event CTAs often use Button for consistent styling',
    },
    {
      slug: 'card',
      reason: 'Event detail popups and side panels are often rendered as Cards',
    },
    {
      slug: 'typography',
      reason: 'Typography components style event titles, descriptions, and calendar headings',
    },
    {
      slug: 'popover',
      reason: 'Quick event previews and tooltips on hover use Popover for lightweight overlays',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Month Calendar',
      description: 'Uncontrolled month view with sample events and click handlers.',
      code: `import { BigCalendar } from 'vayu-ui';

const events = [
  {
    id: 1,
    title: 'Team Standup',
    start: new Date(2026, 4, 27, 9, 0),
    end: new Date(2026, 4, 27, 9, 30),
    color: 'blue',
  },
  {
    id: 2,
    title: 'Design Review',
    start: new Date(2026, 4, 28, 14, 0),
    end: new Date(2026, 4, 28, 15, 0),
    color: 'purple',
    allDay: false,
  },
  {
    id: 3,
    title: 'Company Holiday',
    start: new Date(2026, 4, 30, 0, 0),
    end: new Date(2026, 4, 30, 23, 59),
    color: 'green',
    allDay: true,
  },
];

export default function BasicCalendarDemo() {
  return (
    <BigCalendar
      events={events}
      defaultDate={new Date(2026, 4, 27)}
      onEventClick={(e) => console.log('Event:', e.title)}
      onDateClick={(d) => console.log('Date:', d)}
    />
  );
}`,
      tags: ['basic', 'month', 'events'],
    },
    {
      title: 'Controlled View Switching',
      description: 'Controlled calendar with external state for date and view.',
      code: `import { useState } from 'react';
import { BigCalendar } from 'vayu-ui';

export default function ControlledCalendarDemo() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  return (
    <BigCalendar
      events={[]}
      date={date}
      view={view}
      onDateChange={setDate}
      onViewChange={setView}
      weekStartsOn={1}
    />
  );
}`,
      tags: ['controlled', 'state', 'week-starts-monday'],
    },
    {
      title: 'Custom Event Rendering',
      description: 'Calendar with fully custom event chips using the renderEvent prop.',
      code: `import { BigCalendar } from 'vayu-ui';

const events = [
  {
    id: 1,
    title: 'Sprint Planning',
    start: new Date(2026, 4, 27, 10, 0),
    end: new Date(2026, 4, 27, 11, 30),
    description: 'Q3 roadmap discussion',
  },
];

export default function CustomEventDemo() {
  return (
    <BigCalendar
      events={events}
      defaultDate={new Date(2026, 4, 27)}
      renderEvent={(event) => (
        <div className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded border-l-2 border-amber-500 truncate">
          <strong>{event.title}</strong>
          {event.description && (
            <span className="block text-[10px] opacity-80">{event.description}</span>
          )}
        </div>
      )}
    />
  );
}`,
      tags: ['custom', 'render-event', 'styling'],
    },
    {
      title: 'Event Removal',
      description: 'Calendar with remove buttons on events and an onEventRemove handler.',
      code: `import { useState } from 'react';
import { BigCalendar } from 'vayu-ui';

export default function RemovableEventsDemo() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting A', start: new Date(2026, 4, 27, 9), end: new Date(2026, 4, 27, 10), color: 'blue' },
    { id: 2, title: 'Meeting B', start: new Date(2026, 4, 28, 14), end: new Date(2026, 4, 28, 15), color: 'red' },
  ]);

  return (
    <BigCalendar
      events={events}
      defaultDate={new Date(2026, 4, 27)}
      onEventRemove={(event) =>
        setEvents((prev) => prev.filter((e) => e.id !== event.id))
      }
      onDateClick={(date) =>
        setEvents((prev) => [
          ...prev,
          {
            id: Date.now(),
            title: 'New Event',
            start: date,
            end: new Date(date.getTime() + 60 * 60 * 1000),
            color: 'brand',
          },
        ])
      }
    />
  );
}`,
      tags: ['removal', 'interactive', 'add-event'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside BigCalendar',
      bad: '<div><BigCalendar.Toolbar /></div>',
      good: '<BigCalendar><BigCalendar.Toolbar /><BigCalendar.MonthView /></BigCalendar>',
      reason:
        'All sub-components consume CalendarContext. Rendering them outside the root throws an error because the context is null.',
    },
    {
      title: 'Mixing controlled and uncontrolled props',
      bad: '<BigCalendar date={myDate} defaultDate={new Date()} />',
      good: '<BigCalendar date={myDate} onDateChange={setMyDate} />',
      reason:
        'Passing both date and defaultDate creates conflicting state management. Use date + onDateChange for controlled mode, or defaultDate for uncontrolled mode.',
    },
    {
      title: 'Passing invalid event dates',
      bad: '{ id: 1, title: "Event", start: "2026-05-27", end: "2026-05-27" }',
      good: '{ id: 1, title: "Event", start: new Date(2026, 4, 27), end: new Date(2026, 4, 27) }',
      reason:
        'The CalendarEvent interface requires start and end to be Date objects. String values will cause filtering and display errors.',
    },
    {
      title: 'Omitting event id',
      bad: '{ title: "Event", start: new Date(), end: new Date() }',
      good: '{ id: 1, title: "Event", start: new Date(), end: new Date() }',
      reason:
        'Events must have a unique id for React keys and for reliable identification in event handlers. Missing ids cause rendering issues.',
    },
  ],
};
