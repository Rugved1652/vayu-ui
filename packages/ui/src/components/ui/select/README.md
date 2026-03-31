# Select

## Anatomy
- select.tsx — composition (Context + Root with state management)
- trigger.tsx — UI: search input, multi-value chips, keyboard nav
- content.tsx — UI: portal dropdown with positioning
- item.tsx — UI: selectable option with keyboard nav
- create-button.tsx — UI: creatable option action
- list.tsx — UI: static and async option list renderers
- select-states.tsx — UI: Loading, NotFound, SearchHint, Error, Footer states
- types.ts — types
- index.ts — export

## Use Cases
- Single and multi-select dropdowns with search filtering
- Async search with debounced API calls
- Creatable options with validation
- Accessible keyboard navigation (Arrow keys, Tab, Escape, Enter)
