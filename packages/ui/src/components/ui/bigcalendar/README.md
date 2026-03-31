# BigCalendar

## Anatomy
- bigcalendar.tsx — composition (root with state, context provider, default children)
- toolbar.tsx — UI: navigation controls and view switcher
- month-view.tsx — UI: month grid view with day cells and events
- week-view.tsx — UI: week view with hour grid and day columns
- day-view.tsx — UI: single day view with all-day events and hour grid
- hooks.ts — logic: calendar context and consumer hook
- types.ts — types: props, events, context value
- utils.ts — logic: date helpers, event filtering, display constants
- index.ts — export: compound component with subcomponents

## Use Cases
- Displaying events in month, week, or day views
- Navigating between dates and switching calendar views
- Custom event rendering with `renderEvent` prop
- Controlled or uncontrolled date and view state
