# Menubar

## Anatomy
- menubar.tsx — root composition (context provider + state)
- menu.tsx — top-level menu trigger + dropdown
- submenu.tsx — nested submenu trigger + dropdown
- item.tsx — menu item
- separator.tsx — visual separator
- label.tsx — section label
- checkbox-item.tsx — checkbox menu item
- radio-group.tsx — radio group + radio item
- portal.tsx — portal wrapper
- hooks.ts — shared logic (navigation, typeahead, focus)
- types.ts — TypeScript types
- index.ts — public API

## Use Cases
- Application-level navigation menus (File, Edit, View, etc.)
- Toolbar menus with keyboard navigation
- Nested submenus for grouped actions
- Menu items with checkboxes and radio groups for settings
