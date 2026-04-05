# ContextMenu

## Anatomy

- contextmenu.tsx — composition (root + state + context providers)
- trigger.tsx — UI: right-click trigger area
- content.tsx — UI: portal menu with viewport clamping
- item.tsx — UI: menu item with destructive variant
- checkbox-item.tsx — UI: toggleable checkbox item
- radio-group.tsx — UI: radio group + radio item
- sub.tsx — UI: submenu (wrapper + trigger + content)
- separator.tsx — UI: divider line
- label.tsx — UI: section label
- hooks.ts — shared hooks (scroll lock, positioning, keyboard nav)
- types.ts — types
- index.ts — export

## Use Cases

- Right-click context menus with keyboard navigation
- Nested submenus with hover/keyboard interaction
- Checkbox and radio item groups for stateful selections
