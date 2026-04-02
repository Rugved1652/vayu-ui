# Table

## Anatomy

- table.tsx — composition (UI + wiring, compound component attachment)
- table-caption.tsx — UI: caption with visually-hidden support
- table-head.tsx — UI: thead section
- table-body.tsx — UI: tbody section with empty state
- table-footer.tsx — UI: tfoot section
- table-row.tsx — UI: row with selectable state
- table-header.tsx — UI: th cell with sort icon logic
- table-cell.tsx — UI: td cell
- types.ts — all interfaces
- index.ts — public API

## Use Cases

- Displaying tabular data with WCAG 2.2 AA compliance
- Sortable column headers with aria-sort indicators
- Selectable rows with keyboard focus support
- Responsive tables with horizontal overflow scrolling
