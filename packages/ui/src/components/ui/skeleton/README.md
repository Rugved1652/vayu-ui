# Skeleton

## Anatomy
- skeleton-root.tsx — Composition: Root component with ARIA live region for accessibility
- skeleton-item.tsx — UI: Core skeleton rendering primitive with variant, animation, and count support
- primitives.tsx — UI: Variant-specific wrappers (Text, Circle, Rectangle)
- composites.tsx — UI: Pre-built skeleton patterns (Card, Avatar, List, Table, Grid, Group)
- config.ts — Configuration: size/animation classes and helper functions
- types.ts — Types: TypeScript interfaces
- index.ts — Public API: Compound exports

## Use Cases
- Display loading placeholders while content is being fetched
- Provide visual feedback during asynchronous operations
- Maintain layout stability during content loading
- Pre-built patterns for Card, Avatar, List, Table, and Grid layouts
