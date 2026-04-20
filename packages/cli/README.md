# `vayu-ui` CLI

> The official command-line tool for adding Vayu UI hooks and components to your React project.

---

## Requirements

| Requirement | Version  |
| ----------- | -------- |
| Node.js     | ≥ 18.0.0 |
| npm         | ≥ 10.0.0 |

---

## Quick Start (Production)

No installation needed — use `npx`:

```bash
# List all available components and hooks
npx vayu-ui-cli list

# Filter by type
npx vayu-ui-cli list --type component
npx vayu-ui-cli list --type hook

# Filter by category
npx vayu-ui-cli list --category inputs
npx vayu-ui-cli list --type component --category overlay
```

---

## Commands

### `vayu-ui list`

Displays all hooks and components available in the Vayu UI registry, grouped by type and category.

```bash
vayu-ui list
```

**Output:**

```
  Components
  ─────────────────────────────────────────────────────

    inputs
      button                        A versatile button component with variants, sizes, l...
      checkbox                      An accessible checkbox control with support for chec...
      text-input                    A compound text input component supporting multiple ...

    feedback
      alert                         A contextual feedback banner that communicates statu...
      spinner                       A WCAG 2.2 AA compliant animated circular loading in...

    overlay
      modal                         An accessible dialog component with focus trapping, ...
      tooltip                       A portal-based tooltip component that displays conte...

    ...

  Hooks
  ─────────────────────────────────────────────────────

    state
      use-local-storage             A state hook that persists values to localStorage wi...
      use-debounce                  Returns a debounced version of a value that only upd...

    ...

  50 components, 31 hooks
```

**Flags:**

| Flag                       | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `--type <component\|hook>` | Filter by item type                              |
| `--category <name>`        | Filter by category (e.g. inputs, state, overlay) |

```bash
# Only hooks
npx vayu-ui-cli list --type hook

# Only components in the overlay category
npx vayu-ui-cli list --type component --category overlay

# Filter by any category
npx vayu-ui-cli list --category sensor
```

---

### `vayu-ui init`

Sets up Vayu UI in your project — creates the folder structure, injects design tokens, and optionally installs Tailwind CSS v4.

```bash
npx vayu-ui-cli init
```

**What it does:**

1. Detects your project framework (Next.js, Vite, CRA, or generic)
2. Creates `ui/components/`, `ui/hooks/`, `ui/utils/` (inside `src/` if it exists)
3. Creates `vayu-ui-tokens.css` with all design tokens next to your main CSS
4. Adds `@import './vayu-ui-tokens.css'` to your existing CSS file
5. Prompts to install Tailwind CSS v4 if not found
6. Creates `vayu-ui.config.json` to remember paths for future commands

**Output:**

```
  Vayu UI Init
  ─────────────────────────────────────────────────────

  Framework:       next-app
  Package manager: npm
  Tailwind CSS:    installed
  UI folder:       src/ui/
  CSS file:        src/app/globals.css

  Created src/ui/ with components/, hooks/, utils/
  Created src/app/vayu-ui-tokens.css
  Added @import to src/app/globals.css
  Created vayu-ui.config.json

  Done! Vayu UI is ready.
```

**Flags:**

| Flag                | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `--path <dir>`      | Custom path for the ui/ folder (default: auto-detect `src/ui` or `ui`) |
| `--css-path <file>` | Custom path for the main CSS file                                      |
| `--merge`           | Merge tokens into existing CSS instead of creating a separate file     |
| `--skip-tailwind`   | Skip Tailwind CSS installation check                                   |
| `--force`           | Skip all prompts and use defaults                                      |

```bash
# Merge tokens into your existing globals.css
npx vayu-ui-cli init --merge

# Custom UI folder path
npx vayu-ui-cli init --path src/lib/ui

# Skip Tailwind check
npx vayu-ui-cli init --skip-tailwind
```

---

### `vayu-ui add <slugs...>`

Copies one or more components or hooks from the Vayu UI GitHub repo into your project. Automatically resolves transitive dependencies and installs required npm packages.

```bash
npx vayu-ui-cli add button
npx vayu-ui-cli add button modal tooltip
npx vayu-ui-cli add use-debounce
```

**What it does:**

1. Looks up each slug in the registry
2. Recursively resolves dependencies (e.g., sidebar → tooltip)
3. Fetches source files from GitHub
4. Copies them into `{uiPath}/components/{Name}/` or `{uiPath}/hooks/`
5. Auto-includes the `cn` utility if adding any component
6. Installs npm packages (clsx, tailwind-merge, lucide-react, etc.)

**Output:**

```
  Adding:

    Button  (6 files → src/ui/components/Button/)

  npm packages: clsx, tailwind-merge

    wrote utils/index.ts
    wrote components/Button/Button.tsx
    wrote components/Button/ButtonIcon.tsx
    wrote components/Button/ButtonBadge.tsx
    wrote components/Button/ButtonText.tsx
    wrote components/Button/types.ts
    wrote components/Button/index.ts

  Added 1 item.

  Import:
    import { Button } from '@/src/ui/components/Button'
```

**Flags:**

| Flag             | Short | Description                                 |
| ---------------- | ----- | ------------------------------------------- |
| `--overwrite`    | `-o`  | Overwrite existing files                    |
| `--dry-run`      | —     | Preview what would be added without writing |
| `--skip-install` | —     | Skip npm dependency installation            |
| `--yes`          | `-y`  | Skip confirmation prompts                   |

```bash
# Preview without writing
npx vayu-ui-cli add modal --dry-run

# Force overwrite
npx vayu-ui-cli add button --overwrite

# Skip npm install
npx vayu-ui-cli add sidebar --skip-install
```

---

### `vayu-ui update [slugs...]`

Re-fetches installed components and hooks from GitHub. Compares content and only overwrites changed files.

```bash
# Update all installed items
npx vayu-ui-cli update

# Update specific items
npx vayu-ui-cli update button modal
```

**Flags:**

| Flag        | Short | Description                                         |
| ----------- | ----- | --------------------------------------------------- |
| `--force`   | `-f`  | Overwrite all files even if content is unchanged    |
| `--dry-run` | —     | Preview what would be updated without writing files |
| `--css`     | —     | Also update Vayu UI CSS design tokens               |

```bash
# Preview changes
npx vayu-ui-cli update --dry-run

# Force update everything
npx vayu-ui-cli update --force
```

---

### `vayu-ui remove <slugs...>`

Removes one or more installed components or hooks. Warns if other installed items depend on what you are removing. Auto-cleans `utils/` when no components remain.

```bash
npx vayu-ui-cli remove button
npx vayu-ui-cli remove button modal
```

**Flags:**

| Flag      | Short | Description              |
| --------- | ----- | ------------------------ |
| `--force` | `-f`  | Skip confirmation prompt |

```bash
# Remove without prompt
npx vayu-ui-cli remove button --force
```

---

### `vayu-ui install-mcp`

Configures the Vayu UI MCP server (17 tools for component discovery, props, variants, scaffolding, etc.) for AI coding tools. The server runs via `npx` — no local installation needed.

Supports **Claude Code**, **Cursor**, **VS Code Copilot**, **Windsurf**, and **Antigravity**.

```bash
# Interactive — prompts which tools to configure
npx vayu-ui-cli install-mcp

# Configure specific tools
npx vayu-ui-cli install-mcp --tool claude
npx vayu-ui-cli install-mcp --tool claude,cursor

# Configure globally (home directory)
npx vayu-ui-cli install-mcp --global

# Preview without writing
npx vayu-ui-cli install-mcp --dry-run
```

**What it does:**

1. Detects or prompts for which AI tools to configure
2. Writes the MCP server config to each tool's settings file
3. Creates parent directories if needed
4. Skips tools that already have the config (unless `--force`)

**Config files written:**

| Tool            | Project-level             | Global                 |
| --------------- | ------------------------- | ---------------------- |
| Claude Code     | `.mcp.json`               | `~/.claude.json`       |
| Cursor          | `.cursor/mcp.json`        | `~/.cursor/mcp.json`   |
| VS Code Copilot | `.vscode/mcp.json`        | `~/.vscode/mcp.json`   |
| Windsurf        | `.windsurf/mcp.json`      | `~/.windsurf/mcp.json` |
| Antigravity     | `antigravity.config.json` | —                      |

**Entry added:**

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

**Flags:**

| Flag        | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `--tool`    | Comma-separated AI tools: `claude`, `cursor`, `vscode`, `windsurf`, `antigravity` |
| `--global`  | Configure globally (home directory) instead of project-level                      |
| `--dry-run` | Preview changes without writing files                                             |
| `--force`   | Skip prompts and overwrite existing entries                                       |

```bash
# Overwrite existing config
npx vayu-ui-cli install-mcp --tool claude --force
```

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

### 3. Build the registry (required — CLI depends on it)

```bash
cd packages/registry
npm run build
```

### 4. Build the CLI

```bash
cd packages/cli
npm run build
```

### 5. Run commands via the bin

```bash
# Production build
node bin/run.js list

# With flags
node bin/run.js list --type hook --category sensor

# View help
node bin/run.js help list
```

### 6. Development mode (TypeScript, no build step)

```bash
node bin/dev.js list
```

> Uses `ts-node` to run TypeScript source files directly. No build step needed, but slower than the compiled output.

### 7. Watch mode (auto-rebuild on changes)

```bash
cd packages/cli
npx tsup --watch
```

Then in another terminal, run commands with `node bin/run.js`.

### 8. Link globally for testing

```bash
# From packages/cli
npm link

# Now available globally as vayu-ui
vayu-ui list
vayu-ui list --type component

# Unlink when done
npm unlink -g vayu-ui-cli
```

---

## Project Structure

```
packages/cli/
├── bin/
│   ├── run.js            # Production entry point
│   └── dev.js            # Development entry point (ts-node)
├── src/
│   ├── commands/
│   │   ├── add.ts        # vayu-ui add <slugs>
│   │   ├── init.ts       # vayu-ui init
│   │   ├── install-mcp.ts # vayu-ui install-mcp
│   │   ├── list.ts       # vayu-ui list
│   │   ├── remove.ts     # vayu-ui remove <slugs>
│   │   └── update.ts     # vayu-ui update [slugs]
│   ├── templates/
│   │   └── tokens.ts     # Design tokens CSS template
│   ├── utils/
│   │   ├── config.ts     # Config read/write & install tracking
│   │   ├── fetcher.ts    # GitHub raw file fetcher
│   │   ├── mcp-config.ts # MCP server config for AI tools
│   │   └── project.ts    # Framework & project detection
│   └── index.ts
├── dist/                 # Build output (gitignored)
├── package.json
└── tsup.config.ts
```

---

## License

MIT © [Rugved Patel](https://github.com/Rugved1652)
