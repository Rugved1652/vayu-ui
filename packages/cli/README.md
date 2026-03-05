# `vayu-ui` CLI

> The official command-line tool for adding Vayu UI hooks and components to your React project.

```bash
npx vayu-ui-cli <command>
```

---

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Commands](#commands)
  - [`vayu-ui init`](#vayu-ui-init)
  - [`vayu-ui add <name>`](#vayu-ui-add-name)
  - [`vayu-ui list`](#vayu-ui-list)
  - [`vayu-ui update`](#vayu-ui-update)
  - [`vayu-ui create <template>`](#vayu-ui-create-template)
- [Using Locally (Development)](#using-locally-development)
- [Updating the CLI](#updating-the-cli)
- [Removing the CLI](#removing-the-cli)
- [Adding Components to the Registry (GitHub)](#adding-components-to-the-registry-github)
- [Project Structure](#project-structure)

---

## Overview

`vayu-ui-cli` is a terminal tool that lets you:

- **Initialize** Vayu UI design tokens + Tailwind CSS in any React project
- **Add** individual hooks or components directly into your codebase (you own the code)
- **List** everything available in the registry
- **Update** installed items to the latest version from GitHub
- **Scaffold** new projects from Vayu UI templates

---

## Requirements

| Requirement | Version  |
|-------------|----------|
| Node.js     | ≥ 18.0.0 |
| npm / pnpm / yarn / bun | any |

---

## Quick Start

No installation needed — just use `npx`:

```bash
# 1. Set up Vayu UI in your existing project
npx vayu-ui-cli init

# 2. Browse what's available
npx vayu-ui-cli list

# 3. Add a hook
npx vayu-ui-cli add use-battery-status
```

---

## Commands

### `vayu-ui init`

Sets up Vayu UI design tokens and Tailwind CSS v4 in your project. Automatically detects **Next.js**, **Vite**, and **CRA** project types.

```bash
npx vayu-ui-cli init
```

**What it does:**
- Writes a `globals.css` (or `index.css`) with all Vayu UI CSS design tokens (colors, radii, shadows, fonts, transitions, keyframes)
- Creates `postcss.config.mjs` if missing
- Installs `tailwindcss`, `@tailwindcss/postcss`, and `postcss` if not already present

**Flags:**

| Flag | Short | Description |
|------|-------|-------------|
| `--path <file>` | `-p` | Custom CSS file path |
| `--overwrite` | `-o` | Overwrite existing CSS file |
| `--force` | `-f` | Skip project type detection |

```bash
# Custom CSS path
npx vayu-ui-cli init --path src/styles/vedui.css

# Overwrite existing
npx vayu-ui-cli init --overwrite
```

---

### `vayu-ui add <name>`

Copies a hook or component from the Vayu UI registry into your project. Automatically installs all required peer dependencies.

```bash
npx vayu-ui-cli add <slug>
```

**Example:**

```bash
npx vayu-ui-cli add use-battery-status
```

**What happens:**
1. Looks up `use-battery-status` in the registry
2. Resolves all transitive dependencies (e.g., if `modal` needs `button`, both are installed)
3. Copies files into your project at the correct target path
4. Installs any npm packages required by the component

**Flags:**

| Flag | Short | Description |
|------|-------|-------------|
| `--overwrite` | `-o` | Overwrite existing file if it already exists |
| `--path <dir>` | `-p` | Custom directory to write the file into |

```bash
# Overwrite if already installed
npx vayu-ui-cli add use-battery-status --overwrite

# Write to a custom path
npx vayu-ui-cli add use-battery-status --path src/lib/hooks
```

**After installing**, import it like this:

```ts
import { useBatteryStatus } from "@/hooks/use-battery-status";
```

---

### `vayu-ui list`

Displays all hooks and components available in the Vayu UI registry, grouped by type.

```bash
npx vayu-ui-cli list
```

**Output example:**

```
  Hooks
  ─────────────────────────────────────────────
  use-battery-status             Tracks the device battery level and status
  use-clipboard                  Copy text to clipboard with ease

  Components
  ─────────────────────────────────────────────
  button                         Accessible button with variant support
  modal                          Animated modal dialog
```

**Flags:**

| Flag | Short | Description |
|------|-------|-------------|
| `--type <hook\|component>` | `-t` | Filter by type |
| `--tag <tag>` | — | Filter by tag |

```bash
# Only hooks
npx vayu-ui-cli list --type hook

# Filter by tag
npx vayu-ui-cli list --tag browser-api
```

---

### `vayu-ui update`

Scans your project for installed Vayu UI files, fetches the latest versions from GitHub, and updates only what has changed (using content hashing — no unnecessary writes).

```bash
npx vayu-ui-cli update
```

**Update a single item:**

```bash
npx vayu-ui-cli update use-battery-status
```

**Flags:**

| Flag | Short | Description |
|------|-------|-------------|
| `--css` | — | Also update Vayu UI CSS design tokens (`globals.css`) |
| `--dry-run` | — | Preview what would be updated without making changes |
| `--force` | `-f` | Force update even if content hash matches |

```bash
# Preview changes first
npx vayu-ui-cli update --dry-run

# Update everything including CSS
npx vayu-ui-cli update --css

# Force overwrite all
npx vayu-ui-cli update --force
```

---

### `vayu-ui create <template>`

Scaffolds a full project from a GitHub template repository. Downloads, extracts, and installs dependencies.

```bash
npx vayu-ui-cli create <template>
```

**Accepted formats:**

| Format | Example |
|--------|---------|
| Registered template name | `vayu-ui create starter` |
| GitHub `owner/repo` slug | `vayu-ui create Rugved1652/my-template` |
| Full GitHub URL | `vayu-ui create https://github.com/Rugved1652/my-template` |

**Flags:**

| Flag | Short | Description |
|------|-------|-------------|
| `--dir <name>` | `-d` | Custom output directory name |
| `--branch <branch>` | `-b` | Git branch to download (default: `main`) |
| `--no-install` | — | Skip dependency installation |

```bash
# Create from a registered template
npx vayu-ui-cli create starter

# Custom output directory
npx vayu-ui-cli create dashboard --dir my-dashboard

# Skip npm install
npx vayu-ui-cli create starter --no-install

# Use a specific branch
npx vayu-ui-cli create starter --branch develop
```

---

## Using Locally (Development)

To work on the CLI locally and test changes without publishing:

### 1. Clone the monorepo

```bash
git clone https://github.com/Rugved1652/vayu-ui-docs.git
cd vayu-ui-docs
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Build the CLI package

```bash
cd packages/cli
pnpm build
```

### 4. Link the CLI globally with `npm link`

```bash
# From packages/cli
npm link
```

> **What is `npm link`?**
> `npm link` creates a **global symlink** that points the `vayu-ui` binary on your machine to your local source code.
> Instead of installing from the npm registry, any terminal running `vayu-ui` will execute your local build.
> This lets you test changes in real projects instantly — no publish step needed.

Now you can run `vayu-ui` globally and it will use your local build.

### 5. Test a command

```bash
vayu-ui list
vayu-ui add use-battery-status
```

### 6. Re-build after changes

Whenever you change source files, rebuild and the linked binary will pick up the changes:

```bash
pnpm build
```

> **Tip:** Use `tsup --watch` for auto-rebuild on save: `cd packages/cli && npx tsup --watch`

### 7. Unlink when you're done with `npm unlink`

```bash
# From packages/cli
npm unlink

# Or remove the global symlink by name
npm unlink -g vayu-ui-cli
```

> **What is `npm unlink`?**
> `npm unlink` **removes the global symlink** created by `npm link`.
> After unlinking, `vayu-ui` will no longer resolve to your local code.
> If you had the published package installed globally before, reinstall it:
> ```bash
> npm install -g vayu-ui-cli
> ```

---

## Updating the CLI

### If installed via `npx` (no local install)

`npx` always fetches the latest version automatically. No action needed.

### If installed globally

```bash
npm update -g vayu-ui-cli
# or
pnpm update -g vayu-ui-cli
```

### Update your installed components

```bash
# Dry-run to preview
npx vayu-ui-cli update --dry-run

# Apply all updates
npx vayu-ui-cli update

# Update a specific item
npx vayu-ui-cli update use-battery-status

# Update everything including CSS tokens
npx vayu-ui-cli update --css
```

---

## Removing the CLI

### If used via `npx`

Nothing to remove — `npx` doesn't permanently install packages.

### If installed globally

```bash
npm uninstall -g vayu-ui-cli
# or
pnpm remove -g vayu-ui-cli
# or
yarn global remove vayu-ui-cli
```

### Remove installed components from your project

Since `vayu-ui add` copies files directly into your project, just delete them:

```bash
rm src/hooks/use-battery-status.ts
```

---

## Adding Components to the Registry (GitHub)

Components are sourced from the **`vayu-ui-docs`** repository. Here's where things live:

| Type | Location in `vayu-ui-docs` repo |
|------|-------------------------------|
| Hooks | `src/hooks/<slug>.ts` |
| Components | `src/components/ui/<slug>.tsx` |
| Registry entries | `packages/registry/src/` (components.ts / hooks.ts) |

### To add a new hook or component:

**1. Create the source file**

For a hook named `use-scroll-position`:

```
src/hooks/use-scroll-position.ts
```

**2. Add a registry entry**

In `packages/registry/src/hooks.ts` (or `components.ts`):

```ts
{
  slug: "use-scroll-position",
  name: "useScrollPosition",
  type: "hook",
  fileName: "use-scroll-position.ts",
  targetPath: "src/hooks",
  description: "Track window scroll position in real time",
  tags: ["browser-api", "scroll"],
  dependencies: [],        // npm packages this file requires
  registryDeps: [],        // other Vayu UI items this depends on
}
```

**3. Open a Pull Request**

- Fork the repo
- Make your changes
- Open a PR to `main` on `Rugved1652/vayu-ui-docs`

The CLI fetches files directly from `raw.githubusercontent.com`, so once merged to `main`, your component is immediately available to all users via `vayu-ui add`.

---

## Project Structure

```
packages/cli/
├── src/
│   ├── commands/
│   │   ├── add.ts        # vayu-ui add <name>
│   │   ├── list.ts       # vayu-ui list
│   │   ├── update.ts     # vayu-ui update
│   │   ├── init.ts       # vayu-ui init
│   │   └── create.ts     # vayu-ui create <template>
│   ├── utils/
│   │   └── installer.ts  # File copy, GitHub fetch, npm install helpers
│   ├── registry/
│   │   └── templates.ts  # Template registry for `create` command
│   └── index.ts          # Re-exports from vayu-ui-registry
├── bin/
│   └── run.js            # CLI entry point
├── package.json
└── tsup.config.ts        # Build config
```

---

## License

MIT © [Rugved Patel](https://github.com/Rugved1652)
