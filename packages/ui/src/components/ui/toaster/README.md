# Toaster

## Anatomy

- toast-provider.tsx — Composition: context, provider, useToast hook
- toast-container.tsx — UI: portal + position grouping
- toast-stack.tsx — UI: Sonner-style stack with expand/collapse
- toast-item.tsx — UI: individual toast (timer, swipe, drag, progress bar)
- compound.tsx — UI: Toast.Title, Toast.Description, Toast.Close
- icons.tsx — Inline SVG icons
- constants.ts — Type styles, layout constants, position classes
- types.ts — TypeScript interfaces
- index.ts — Public API

## Use Cases

- Display transient success, error, warning, and info messages
- Show loading states that auto-transition to success/error via `promise()`
- Render custom toast content with compound sub-components
