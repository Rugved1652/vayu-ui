---
description: Guide for working with Fumadocs in this project
---

# Fumadocs Skill

This skill provides context and guidelines for working with the Fumadocs documentation framework in this project.

## Project Structure

- **`content/docs`**: Contains the MDX documentation files. The folder structure maps directly to the URL structure (e.g., `content/docs/components/button.mdx` -> `/docs/components/button`).
- **`src/app/docs/[[...slug]]/page.tsx`**: The Next.js page that renders the documentation.
- **`src/lib/source.ts`**: Configuration for the documentation source, including base URL and plugins.
- **`fumadocs.config.js`**: (If present) Global configuration for Fumadocs.

## File Conventions

### MDX Files (`.mdx`)

All documentation pages should be `.mdx` files located in `content/docs`.

**Frontmatter:**
Every MDX file must have the following frontmatter:

```yaml
---
title: Page Title
description: A brief description of the page content.
---
```

### Automatic Routing

Fumadocs generates routes based on the file system structure.
- `content/docs/index.mdx` -> `/docs`
- `content/docs/guide/hello.mdx` -> `/docs/guide/hello`

### Meta Files (`meta.json`)

To customize the order of pages in the sidebar or grouping, use `meta.json` files in directories.

```json
{
  "title": "Section Title",
  "pages": [
    "index",
    "guides",
    "components"
  ]
}
```

## Common Components

When writing documentation, you can use standard Markdown and MDX.

### Callouts

```tsx
<Callout title="Note" type="info">
  This is a note.
</Callout>
```

Types: `info` (default), `warn`, `error`.

### Code Blocks

Use standard markdown code blocks.

\`\`\`tsx
import { Button } from '@ved-ui/react';
\`\`\`

## Adding New Skills (Component Docs)

When adding documentation for a new component:

1. **Source Code**: Ensure the component source code is in `src/components/ui/<component-name>.tsx` (or appropriate directory).
2. **Documentation**: Create `content/docs/components/<component-name>.mdx`.
3. **Frontmatter**:
   ```yaml
   ---
   title: Component Name
   description: Brief description of the component.
   ---
   ```
4. **Demo/Usage**:
   - **Simple**: Import the component directly and render it.
     ```tsx
     import { Button } from '@/components/ui/button';

     <Button>Click me</Button>
     ```
   - **Complex**: Create a demo component in `src/components/demos/<component-name>-demo.tsx` and import it.
     ```tsx
     import { ButtonDemo } from '@/components/demos/button-demo';

     <ButtonDemo />
     ```
5. **API Reference**: Document props, types, and variants.

## Adding New Hooks

1. **Source Code**: Ensure the hook source code is in `src/hooks/<hook-name>.ts`.
2. **Documentation**: Create `content/docs/hooks/<hook-name>.mdx`.
3. **Frontmatter**:
   ```yaml
   ---
   title: useHookName
   description: Description of what the hook does.
   ---
   ```
4. **Usage**: Provide a code block showing how to use the hook.
5. **API Reference**: Document parameters and return values.
