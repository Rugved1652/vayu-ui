# ResizablePane

## Anatomy

- resizablepane.tsx — composition (context provider + state + registration)
- panel.tsx — UI: individual resizable panel
- handle.tsx — UI: drag handle (mouse/touch/keyboard)
- types.ts — types
- index.ts — public API

## Use Cases

- Split-pane layouts with draggable dividers (code editors, file explorers)
- Resizable sidebar/content arrangements
- Any layout requiring user-adjustable panel proportions
