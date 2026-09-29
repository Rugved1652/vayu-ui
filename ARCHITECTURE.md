# Vayu UI Architecture

> How UI components, hooks, the registry, MCP server, and CLI work together.

---

## Overview

Vayu UI is organized around a **registry-first** architecture. The actual React code lives in `packages/ui`, but all metadata about that code—props, files, dependencies, examples, accessibility, anti-patterns—is externalized into `packages/registry`. Both the CLI and the MCP server consume this registry as their single source of truth.

```
┌─────────────────┐      ┌──────────────────────┐
│  packages/ui    │◄────►│  packages/registry   │
│  (Source code)  │      │  (Metadata catalog)  │
└─────────────────┘      └──────────────────────┘
          ▲                        │
          │                        ▼
          │         ┌──────────────────────┐
          │         │   packages/mcp       │
          │         │   (MCP Server)       │
          │         │  - find_component    │
          │         │  - get_component_*   │
          │         │  - scaffold_usage    │
          │         │  - get_install_guide │
          │         └──────────────────────┘
          │                        │
          │         ┌──────────────────────┐
          └─────────┤   packages/cli       │
                    │   (vayu-ui-cli)      │
                    │  - add / remove      │
                    │  - init / list       │
                    │  - install-mcp       │
                    └──────────────────────┘
```

---

## 1. `packages/ui` — Source of Truth for Code

All React components and hooks live here.

### Components

- Located at `src/components/<PascalCaseName>/`
- Use the **compound component pattern** with namespaced subcomponents
- Example: `Button/` contains `Button.tsx`, `ButtonIcon.tsx`, `ButtonBadge.tsx`, `ButtonText.tsx`, `types.ts`
- Assembled via `Object.assign(ButtonRoot, { Icon, Badge, Text })`

### Hooks

- Located at `src/hooks/<hookName>.ts`
- Flat files, no subdirectories

### Exports

- `src/index.ts` → re-exports everything from hooks and components
- `src/components/index.ts` → barrel file for ~50+ components
- `src/hooks/index.ts` → barrel file for ~35 hooks

---

## 2. `packages/registry` — Metadata Catalog

The central metadata layer consumed by both MCP and CLI. Contains **no React code**—only TypeScript data objects.

### Schema (`src/types.ts`)

- `ComponentRegistryEntry` — identity, description, file list, compound component metadata, props, variants, sizes, states, events, a11y, dependencies, examples, anti-patterns
- `HookRegistryEntry` — identity, signature, parameters, return values, examples, anti-patterns
- `DesignToken`, `DesignTokenCategory`
- MCP response types (`FindComponentResponse`, `ScaffoldResponse`)
- `CliConfig`

### Entries

- `src/components/<slug>.ts` — one file per component
- `src/hooks/<slug>.ts` — one file per hook
- `src/entries.ts` — aggregates all into `componentEntries`, `hookEntries`, `allEntries`
- `src/index.ts` — exports everything

### Relationship to `packages/ui`

Every component/hook in `packages/ui` has a corresponding registry entry:

| UI Path                                     | Registry Field  |
| ------------------------------------------- | --------------- |
| `src/components/<DirectoryName>/`           | `directoryName` |
| `src/components/<DirectoryName>/<FileName>` | `files[].name`  |
| `src/hooks/<fileName>`                      | `fileName`      |

---

## 3. `packages/mcp` — AI Assistant Integration

Exposes the registry to AI tools via the Model Context Protocol (MCP).

### Tools (17 total)

| Tool                            | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| `list_components`               | List all components/hooks with filters        |
| `find_component`                | Natural language search                       |
| `get_component_summary`         | Identity card (name, category, subcomponents) |
| `get_component_props`           | Full prop definitions                         |
| `get_component_variants`        | Variant and size definitions                  |
| `get_component_states`          | Interactive/visual states                     |
| `get_component_events`          | Event handler signatures                      |
| `get_component_a11y`            | ARIA roles, keyboard interactions, WCAG       |
| `get_component_do_not`          | Anti-patterns                                 |
| `get_component_dependencies`    | NPM and registry dependencies                 |
| `get_component_peer_components` | Frequently co-used suggestions                |
| `get_component_composition`     | Compound component structure                  |
| `get_component_example`         | Ready-to-paste TSX examples                   |
| `scaffold_component_usage`      | Generate minimal working code                 |
| `get_hook_details`              | Hook signature, parameters, return values     |
| `get_design_tokens`             | Design tokens with Tailwind classes           |
| `get_install_guide`             | Exact CLI commands and imports                |

### Key Files

- `src/lib/registry.ts` — wrapper around `vayu-ui-registry` for lookups
- `src/lib/search.ts` — scoring algorithm for natural language search
- `src/lib/scaffold-templates/index.ts` — code generation logic
- `src/lib/design-tokens.ts` — design token catalog

---

## 4. `packages/cli` — Developer CLI

Oclif-based CLI distributed as `vayu-ui-cli` (binary: `vayu-ui`).

### Commands

- `init` — Setup project, install Tailwind v4, inject design tokens
- `add <slug...>` — Copy components/hooks into the user's project
- `remove <slug...>` — Delete installed files
- `list` — Display all available components/hooks by category
- `install-mcp` — Configure MCP for Claude, Cursor, OpenCode
- `create`, `check`, `update`, `version`

### How `add` Works

1. Parse slugs from argv
2. Build lookup Map from `allEntries` (from `vayu-ui-registry`)
3. Resolve transitive `registryDependencies` recursively
4. Separate components vs. hooks
5. Collect NPM dependencies from all resolved entries
6. Read release-bundled source files, using the generated import graph:
   - Components: `.../components/<DirectoryName>/<FileName>`
   - Hooks: `.../hooks/<FileName>`
   - Utils: `.../utils/index.ts`
7. Write files to user's project
8. Install NPM deps via detected package manager
9. Update `vayu-ui.config.json`

### Configuration

- `vayu-ui.config.json` tracks `uiPath`, optional separate `paths`, import `aliases`, `packagePath`, `cssFile`, `tokensFile`, and installed items

---

## Data Flows

### Flow 1: AI-Assisted Development (via MCP)

```
AI Assistant
    │
    ├─► find_component("floating dialog with overlay")
    │       └──► MCP search.ts scores registry entries
    │
    ├─► get_component_summary("modal")
    ├─► get_component_props("modal")
    ├─► get_component_a11y("modal")
    ├─► get_component_do_not("modal")
    │
    ├─► get_install_guide("modal")
    │       └──► "npx vayu-ui-cli add modal"
    │
    └─► scaffold_component_usage("modal")
            └──► Ready-to-paste TSX
```

### Flow 2: CLI Installation

```
Developer
    │
    └─► npx vayu-ui-cli add button modal
            │
            ├─► Resolve "button" + "modal" from vayu-ui-registry
            ├─► Resolve transitive dependencies
            ├─► Read bundled source files
            ├─► Write to <uiDir>/components/
            ├─► npm install <deps>
            └─► Update vayu-ui.config.json
```

### Flow 3: Registry-First Updates

```
Add new component to packages/ui
    │
    ├─► Create packages/registry/src/components/<slug>.ts
    ├─► Export in entries.ts + index.ts
    │
    ├─► MCP automatically sees it (consumes vayu-ui-registry)
    └─► CLI automatically sees it (consumes vayu-ui-registry)
            └──► Rebuild registry and CLI so metadata and bundled source match
```

### Flow 4: MCP Installation via CLI

```
Developer
    │
    └─► vayu-ui install-mcp
            │
            ├─► Detects AI tools (Claude, Cursor, OpenCode)
            ├─► Writes MCP config (e.g., claude_desktop_config.json)
            │
            └─► MCP server runs via: npx -y vayu-ui-mcp
                    └──► Always up-to-date, no local installation needed
```

---

## Key Principles

1. **Registry is the single source of truth** — MCP and CLI both consume `vayu-ui-registry`
2. **Metadata is externalized** — Props, a11y, examples, anti-patterns live in the registry, not inline
3. **Release-bundled generation** — CLI copies sources bundled at build time; the registry source manifest is generated from imports
4. **Zero-local-install MCP** — MCP server runs via `npx`, always latest
5. **Compound component pattern** — Components are assembled from subcomponents via `Object.assign`

---

## Package Dependency Graph

```
packages/ui          (no internal deps)
     │
     │    mirrors metadata
     ▼
packages/registry    (no internal deps)
     │
     ├──────────────┐
     ▼              ▼
packages/mcp    packages/cli
(depends on     (depends on
 registry)      registry)
```

Both `packages/mcp` and `packages/cli` import from `vayu-ui-registry` (the published name of `packages/registry`). They do not import from `packages/ui` directly—only the registry metadata connects them.
