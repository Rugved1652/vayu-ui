# ColorPicker

## Anatomy
- colorpicker.tsx — composition (context provider + state management)
- label.tsx — UI: accessible label
- description.tsx — UI: helper text
- error.tsx — UI: error message
- trigger.tsx — UI: color swatch button
- input.tsx — UI: text input with format sync
- copy-button.tsx — UI: clipboard copy
- content.tsx — UI: dropdown with positioning
- palette.tsx — UI: native color input
- eyedropper.tsx — UI: EyeDropper API
- presets.tsx — UI: preset color grid (context-dependent)
- swatches.tsx — UI: standalone swatch selector
- hooks.ts — context + useColorPicker hook
- utils.ts — color conversion utilities
- types.ts — types
- index.ts — public API

## Use Cases
- Form color selection with hex/rgb/hsl format support
- Theme builder or design tool color pickers
- Standalone swatch grids for quick color selection
- Screen color picking via EyeDropper API
