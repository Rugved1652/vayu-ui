# `vayu-ui-registry`

> Shared metadata registry for the Vayu UI CLI and MCP server.

---

## What It Does

This package holds structured metadata for every Vayu UI component and hook — names, slugs, categories, props, variants, accessibility info, dependencies, examples, and more. Both the [`vayu-ui-cli`](../cli/README.md) and [`vayu-ui-mcp`](../mcp/README.md) packages consume this registry at runtime.

---

## Contents

| Type       | Count |
| ---------- | ----- |
| Components | 50    |
| Hooks      | 30    |
| **Total**  | 80    |

### Component Categories

`inputs` · `feedback` · `overlay` · `layout` · `data-display` · `navigation` · `animation` · `utility` · `media` · `forms`

### Hook Categories

`state` · `lifecycle` · `dom` · `animation` · `sensor` · `side-effect` · `async` · `input`

---

## Usage

```ts
import {
  componentEntries,
  hookEntries,
  allEntries,
} from "vayu-ui-registry";

// Find by slug
const button = componentEntries.find((e) => e.slug === "button");

// Filter by category
const inputs = componentEntries.filter((e) => e.category === "inputs");
```

---

## Running Locally (Development)

```bash
# From the monorepo root
npm install

# Build the registry
cd packages/registry
npm run build
```

---

## Project Structure

```
packages/registry/
├── src/
│   ├── index.ts                   # Public exports
│   ├── entries.ts                 # Aggregates all entries
│   ├── types.ts                   # ComponentRegistryEntry & HookRegistryEntry types
│   ├── components/                # 50 component metadata files
│   │   ├── button.ts
│   │   ├── modal.ts
│   │   └── ...
│   └── hooks/                     # 30 hook metadata files
│       ├── use-local-storage.ts
│       ├── use-debounce.ts
│       └── ...
├── dist/                          # Build output (gitignored)
├── package.json
└── tsup.config.ts
```

---

## License

MIT © [Rugved Patel](https://github.com/Rugved1652)
