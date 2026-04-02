# Modal

## Anatomy

- modal.tsx — Composition: context, useModal hook, sizeWidths, FOCUSABLE, ModalRoot with compound placeholders
- trigger.tsx — UI: ModalTrigger (opens modal, supports asChild, merges triggerRef)
- overlay.tsx — UI: ModalOverlay (backdrop with close-on-click)
- content.tsx — UI: ModalContent (portal, focus management, keyboard trap, renders Overlay)
- header.tsx — UI: ModalHeader (layout wrapper)
- body.tsx — UI: ModalBody (scrollable layout wrapper)
- footer.tsx — UI: ModalFooter (layout wrapper)
- title.tsx — UI: ModalTitle (h2 with ARIA ID linking)
- description.tsx — UI: ModalDescription (p with ARIA ID linking)
- close.tsx — UI: ModalClose (closes modal, supports asChild, default X icon)
- types.ts — Types
- index.ts — Public API: compound exports

## Use Cases

- Confirmation dialogs and alerts
- Form dialogs (create, edit, delete)
- Informational popups with rich content
- Media viewers and lightboxes
