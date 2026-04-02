# Tour

## Anatomy

- tour.tsx — composition (UI + wiring)
- overlay.tsx — UI: SVG mask + spotlight border
- popover.tsx — UI: dialog with arrow, header, body, progress, footer
- use-target.ts — logic: target finding, MutationObserver, scroll/resize
- use-position.ts — logic: popover position calculation
- hooks.ts — logic: useTour context consumer
- types.ts — types
- index.ts — export

## Use Cases

- Guided product tours with step-by-step spotlight on specific elements
- Onboarding flows with keyboard navigation and progress tracking
- Feature discovery with popover annotations and async step hooks
