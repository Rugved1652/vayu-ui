# TextInput

## Anatomy
- textinput.tsx — Composition: context, useTextInput hook, TextInputRoot with compound placeholders
- label.tsx — UI: Label (accessible label linked to input via htmlFor)
- field.tsx — UI: Field (input container with size, state, focus styling)
- input.tsx — UI: Input (core input element)
- password-input.tsx — UI: PasswordInput (with show/hide toggle)
- number-input.tsx — UI: NumberInput (with numeric validation and min/max)
- search-input.tsx — UI: SearchInput (with search icon)
- description.tsx — UI: Description (helper text)
- error-message.tsx — UI: ErrorMessage (error feedback)
- warning-message.tsx — UI: WarningMessage (warning feedback)
- success-message.tsx — UI: SuccessMessage (success feedback)
- icon.tsx — UI: Icon (decorative icon wrapper)
- loading-spinner.tsx — UI: LoadingSpinner (loading indicator)
- character-count.tsx — UI: CharacterCount (character counter)
- clear-button.tsx — UI: ClearButton (clear input button)
- types.ts — Types
- index.ts — Public API: compound exports

## Use Cases
- Text input with labels, descriptions, and validation feedback
- Password fields with visibility toggle
- Search fields with built-in icon
- Number inputs with keyboard validation and min/max constraints
- Form fields with character counting and clear functionality
