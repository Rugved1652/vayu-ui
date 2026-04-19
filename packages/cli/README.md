# `vayu-ui` CLI

> The official command-line tool for adding Vayu UI hooks and components to your React project.

---

## Requirements

| Requirement | Version  |
| ----------- | -------- |
| Node.js     | ≥ 18.0.0 |
| npm         | any      |

---

## Quick Start (Production)

No installation needed — use `npx`:

```bash
# List all available components and hooks
npx vayu-ui list

# Filter by type
npx vayu-ui list --type component
npx vayu-ui list --type hook

# Filter by category
npx vayu-ui list --category inputs
npx vayu-ui list --type component --category overlay
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

| Flag                       | Description                          |
| -------------------------- | ------------------------------------ |
| `--type <component\|hook>` | Filter by item type                  |
| `--category <name>`        | Filter by category (e.g. inputs, state, overlay) |

```bash
# Only hooks
npx vayu-ui list --type hook

# Only components in the overlay category
npx vayu-ui list --type component --category overlay

# Filter by any category
npx vayu-ui list --category sensor
```

---

### `vayu-ui init`

Sets up Vayu UI in your project — creates the folder structure, injects design tokens, and optionally installs Tailwind CSS v4.

```bash
npx vayu-ui init
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

| Flag                | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `--path <dir>`      | Custom path for the ui/ folder (default: auto-detect `src/ui` or `ui`) |
| `--css-path <file>` | Custom path for the main CSS file                                |
| `--merge`           | Merge tokens into existing CSS instead of creating a separate file |
| `--skip-tailwind`   | Skip Tailwind CSS installation check                             |
| `--force`           | Skip all prompts and use defaults                                |

```bash
# Merge tokens into your existing globals.css
npx vayu-ui init --merge

# Custom UI folder path
npx vayu-ui init --path src/lib/ui

# Skip Tailwind check
npx vayu-ui init --skip-tailwind
```

---

### `vayu-ui add <slugs...>`

Copies one or more components or hooks from the Vayu UI GitHub repo into your project. Automatically resolves transitive dependencies and installs required npm packages.

```bash
npx vayu-ui add button
npx vayu-ui add button modal tooltip
npx vayu-ui add use-debounce
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

| Flag             | Short | Description                                     |
| ---------------- | ----- | ----------------------------------------------- |
| `--overwrite`    | `-o`  | Overwrite existing files                        |
| `--dry-run`      | —     | Preview what would be added without writing     |
| `--skip-install` | —     | Skip npm dependency installation                |
| `--yes`          | `-y`  | Skip confirmation prompts                       |

```bash
# Preview without writing
npx vayu-ui add modal --dry-run

# Force overwrite
npx vayu-ui add button --overwrite

# Skip npm install
npx vayu-ui add sidebar --skip-install
```

---

### `vayu-ui update [slugs...]`

Re-fetches installed components and hooks from GitHub. Compares content and only overwrites changed files.

```bash
# Update all installed items
npx vayu-ui update

# Update specific items
npx vayu-ui update button modal
```

**Flags:**

| Flag        | Short | Description                                           |
| ----------- | ----- | ----------------------------------------------------- |
| `--force`   | `-f`  | Overwrite all files even if content is unchanged      |
| `--dry-run` | —     | Preview what would be updated without writing files   |
| `--css`     | —     | Also update Vayu UI CSS design tokens                 |

```bash
# Preview changes
npx vayu-ui update --dry-run

# Force update everything
npx vayu-ui update --force
```

---

### `vayu-ui remove <slugs...>`

Removes one or more installed components or hooks. Warns if other installed items depend on what you are removing. Auto-cleans `utils/` when no components remain.

```bash
npx vayu-ui remove button
npx vayu-ui remove button modal
```

**Flags:**

| Flag      | Short | Description                |
| --------- | ----- | -------------------------- |
| `--force` | `-f`  | Skip confirmation prompt   |

```bash
# Remove without prompt
npx vayu-ui remove button --force
```

---

### Coming Soon

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `vayu-ui create`       | Scaffold a project from a template               |
| `vayu-ui install-mcp`  | Install the Vayu UI MCP server for AI tools      |

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
│   │   ├── list.ts       # vayu-ui list
│   │   ├── remove.ts     # vayu-ui remove <slugs>
│   │   └── update.ts     # vayu-ui update [slugs]
│   ├── templates/
│   │   └── tokens.ts     # Design tokens CSS template
│   ├── utils/
│   │   ├── config.ts     # Config read/write & install tracking
│   │   ├── fetcher.ts    # GitHub raw file fetcher
│   │   └── project.ts    # Framework & project detection
│   └── index.ts
├── dist/                 # Build output (gitignored)
├── package.json
└── tsup.config.ts
```

---

## License

MIT © [Rugved Patel](https://github.com/Rugved1652)
