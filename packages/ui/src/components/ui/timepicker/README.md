# Timepicker

## Anatomy
- timepicker.tsx — Composition: context, useTimepicker hook, TimepickerRoot with compound placeholders
- trigger.tsx — UI: TimepickerTrigger (inline editing, keyboard navigation)
- content.tsx — UI: TimepickerContent (portal, positioning, scroll lock, focus trap)
- columns.tsx — UI: TimeColumn (internal), HourColumn, MinuteColumn, PeriodColumn, TimeGrid
- footer.tsx — UI: TimepickerFooter, TimepickerError
- utils.ts — Logic: time parsing, formatting, conversion, validation
- types.ts — Types
- index.ts — Public API: compound exports

## Use Cases
- Single time selection with inline editing or dropdown columns
- Time range selection (start/end) with tabbed phases
- 12h/24h format support with AM/PM toggle
- Disabled times, hours, and min/max time constraints
