# Drawer

## Anatomy

- drawer.tsx — Root: context, useDrawer hook, DrawerRoot with compound placeholders
- trigger.tsx — UI: DrawerTrigger (opens drawer, supports asChild)
- overlay.tsx — UI: DrawerOverlay (backdrop for modal drawers)
- content.tsx — UI: DrawerContent (main panel with focus trap, keyboard nav, side positioning)
- header.tsx — UI: DrawerHeader (layout wrapper)
- footer.tsx — UI: DrawerFooter (layout wrapper with auto-margin)
- title.tsx — UI: DrawerTitle (h2 with ARIA ID linking)
- description.tsx — UI: DrawerDescription (p with ARIA ID linking)
- close.tsx — UI: DrawerClose (closes drawer, supports asChild)
- portal.tsx — UI: DrawerPortal (pass-through wrapper)
- types.ts — Types
- index.ts — Public API: compound exports

## Use Cases

- Navigation menus that slide in from any edge of the viewport
- Forms or supplementary content panels (filters, settings, details)
- Non-modal side panels for persistent contextual information
- Mobile-friendly overlays for responsive layouts
