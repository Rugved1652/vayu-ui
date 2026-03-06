Accessibility (WCAG 2.2 AA)
- All interactive components must support keyboard navigation
- Focus must be visible
- Proper ARIA roles required
- Semantic HTML preferred
- Screen reader labels required when needed

Architecture
- Prefer compound component pattern
- Root component exported
- Subcomponents namespaced

Example:
Dialog.Root
Dialog.Trigger
Dialog.Content

Styling
- Use tokens from global.css
- No hardcoded colors
- No inline style unless necessary

API
- Props extend HTMLAttributes
- Support asChild pattern where applicable
- Variants defined using CVA

Documentation
- Must follow documentation template