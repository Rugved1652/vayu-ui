# `vayu-ui-mcp`

> MCP Server for Vayu UI — exposes the component/hook registry to AI assistants.

---

## Requirements

| Requirement | Version  |
| ----------- | -------- |
| Node.js     | ≥ 18.0.0 |

---

## What It Does

This is a [Model Context Protocol](https://modelcontextprotocol.io/) server that gives AI coding assistants (Claude Code, Cursor, OpenCode, VS Code, Codex) access to the Vayu UI component and hook registry. It exposes **17 tools** for discovering, inspecting, and scaffolding components and hooks — so your AI assistant can suggest the right component, generate correct imports, and follow best practices automatically.

---

## Installation

### Via CLI (recommended)

The easiest way to configure the MCP server for your AI tools:

```bash
npx vayu-ui-cli install-mcp
```

This interactively prompts which AI tools to configure and writes the correct config files. See the [CLI README](../cli/README.md) for full `install-mcp` flags.

### Manual configuration

Add the following to your AI tool's MCP config file:

```json
{
  "mcpServers": {
    "vayu-ui": {
      "command": "npx",
      "args": ["-y", "vayu-ui-mcp"]
    }
  }
}
```

---

## Supported AI Tools

| Tool        | Project-level config | Global config          |
| ----------- | -------------------- | ---------------------- |
| Claude Code | `.mcp.json`          | `~/.claude.json`       |
| Cursor      | `.cursor/mcp.json`   | `~/.cursor/mcp.json`   |
| OpenCode    | `opencode.json`      | —                      |
| VS Code     | `.vscode/mcp.json`   | —                      |
| Codex       | `.codex/config.toml` | `~/.codex/config.toml` |

---

## Tools Reference

### Discovery

| Tool              | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `list_components` | List all components and hooks with optional filters by type and category |
| `find_component`  | Natural language search with relevance scoring (returns top 5 matches)   |

### Component Detail

| Tool                            | Description                                                     |
| ------------------------------- | --------------------------------------------------------------- |
| `get_component_summary`         | Name, type, category, description, tags, and use cases          |
| `get_component_props`           | All props for root and sub-components with types and defaults   |
| `get_component_variants`        | Visual variants and sizes with default values                   |
| `get_component_states`          | Interactive states (loading, disabled, open, etc.)              |
| `get_component_events`          | Event handlers with TypeScript signatures                       |
| `get_component_a11y`            | Accessibility info (ARIA, keyboard nav, focus, WCAG compliance) |
| `get_component_do_not`          | Anti-patterns to avoid with bad vs. good code examples          |
| `get_component_dependencies`    | NPM packages and registry dependencies                          |
| `get_component_peer_components` | Frequently co-used components                                   |
| `get_component_composition`     | Compound component structure (sub-components, hooks)            |
| `get_component_example`         | Code examples filterable by tag                                 |

### Code Generation

| Tool                       | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| `scaffold_component_usage` | Generate working TSX code snippets with imports and dependencies |

### Hooks

| Tool               | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `get_hook_details` | Full API details — signature, parameters, return values |

### Design System

| Tool                | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `get_install_guide` | CLI commands and imports needed to install and use a component |
| `get_design_tokens` | Design tokens (colors, radius, shadows) with Tailwind classes  |

---

## Running Locally (Development)

### 1. Clone the monorepo

```bash
git clone https://github.com/Rugved1652/vayu-ui-docs.git
cd vayu-ui-docs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the registry (required — MCP depends on it)

```bash
cd packages/registry
npm run build
```

### 4. Build the MCP server

```bash
cd packages/mcp
npm run build
```

### 5. Run the server

```bash
node bin/vayu-ui-mcp.js
```

### 6. Watch mode (auto-rebuild on changes)

```bash
cd packages/mcp
npm run dev
```

---

## Project Structure

```
packages/mcp/
├── bin/
│   └── vayu-ui-mcp.js        # Entry point
├── src/
│   ├── index.ts               # MCP server initialization & tool registration
│   ├── lib/
│   │   ├── registry.ts        # Registry access helpers
│   │   ├── search.ts          # Fuzzy search with relevance scoring
│   │   ├── design-tokens.ts   # Design token definitions
│   │   ├── register-tool.ts   # Type-safe tool registration wrapper
│   │   └── scaffold-templates/
│   │       └── index.ts       # Code generation templates
│   └── tools/
│       ├── list-components.ts
│       ├── find-component.ts
│       ├── get-component-summary.ts
│       ├── get-component-props.ts
│       ├── get-component-variants.ts
│       ├── get-component-states.ts
│       ├── get-component-events.ts
│       ├── get-component-a11y.ts
│       ├── get-component-do-not.ts
│       ├── get-component-dependencies.ts
│       ├── get-component-peer-components.ts
│       ├── get-component-composition.ts
│       ├── get-component-example.ts
│       ├── scaffold-component-usage.ts
│       ├── get-hook-details.ts
│       ├── get-design-tokens.ts
│       └── get-install-guide.ts
├── dist/                      # Build output (gitignored)
├── package.json
└── tsup.config.ts
```

---

## License

MIT © [Rugved Patel](https://github.com/Rugved1652)

## Source imports and design guidance

`get_install_guide`, `get_component_example`, and `scaffold_component_usage` default to imports from CLI-generated source files. Pass `fromFile` (the project-relative destination file) and `config` (the `uiPath`, `paths`, and configured `aliases` from `vayu-ui.config.json`) for accurate imports. Use `mode: "package"` only when installing the `vayu-ui` npm package.

Scaffold features select supported example tags. Discover tags with `get_component_example`; unsupported combinations and invalid variants return tool errors with guidance. Application text uses Typography on the standard heading scale; compound overlay titles retain their accessible relationships.

`install-mcp --all --force` configures all five project clients. VS Code uses the `servers` JSON key; Codex uses TOML `mcp_servers`. Project Codex configurations require a trusted project. Existing servers and unrelated settings are preserved. The generic `mcpServers` JSON example above applies to Claude Code and Cursor.
