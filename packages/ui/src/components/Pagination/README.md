# Pagination

## Anatomy

- pagination.tsx — composition (compound export)
- pagination-root.tsx — UI: nav wrapper
- pagination-info.tsx — UI: "Showing X to Y of Z" display
- pagination-buttons.tsx — UI: full page navigation
- compact-pagination.tsx — UI: prev/next only variant
- types.ts — types
- utils.ts — logic: page range calculation
- index.ts — export

## Use Cases

- Server-rendered paginated lists with Next.js Link navigation
- Data tables with page number controls and item count info
- Compact prev/next navigation for mobile or constrained layouts
