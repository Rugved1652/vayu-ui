# Animation

## Anatomy

- animation.tsx — composition (UI + wiring)
- fade.tsx, slide.tsx, bounce.tsx, flip.tsx, rotate.tsx, zoom.tsx, roll.tsx, jackinthebox.tsx, hinge.tsx — UI variant components
- utils.ts — utility functions (buildAnimationClasses)
- types.ts — types and mapping objects
- index.ts — public API

## Use Cases

- Entrance animations for modals, dialogs, and tooltips
- Page transitions and route changes
- Loading states and skeleton screen reveals
- Micro-interactions for user feedback
- Respecting user accessibility preferences (reduced motion via CSS)
