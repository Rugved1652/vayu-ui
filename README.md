# Vayu UI

Accessible, TypeScript-first React component library with Tailwind CSS v4 design tokens. 59 components, 34 hooks, a CLI for scaffolding, and an MCP server for AI tool integration.

[![npm version](https://img.shields.io/npm/v/vayu-ui-cli.svg)](https://www.npmjs.com/package/vayu-ui-cli)
[![license](https://img.shields.io/github/license/Rugved1652/vayu-ui.svg)](https://github.com/Rugved1652/vayu-ui/blob/main/LICENSE)
[![react](https://img.shields.io/badge/react-%5E19.0.0-blue.svg)](https://react.dev)

## Features

- **59 components** — Inputs, overlays, navigation, data display, animation, media, and more
- **34 hooks** — State management, DOM, sensors, timing, side effects
- **Tailwind v4 tokens** — Semantic design tokens for colors, radii, shadows, and layers
- **Compound components** — Composable APIs with namespaced subcomponents
- **Accessible** — Keyboard navigation, focus management, ARIA support
- **CLI** — Scaffold components and hooks into any React project
- **MCP server** — Expose the registry to AI coding assistants

## Installation

### Peer Dependencies

Vayu UI requires React 19+:

```bash
npm install react@^19 react-dom@^19
```

## Quick Start

### Use the CLI to copy source files

```bash
# Initialize Vayu UI in your project (sets up Tailwind + tokens)
npx vayu-ui-cli init

# Add individual components (copies source to your project)
npx vayu-ui-cli add button

# Add hooks
npx vayu-ui-cli add use-debounce
```

## Design Tokens

Vayu UI uses semantic design tokens defined in CSS via Tailwind v4's `@theme`:

```tsx
<div className="bg-surface text-surface-content rounded-surface shadow-surface">
  <button className="bg-brand text-brand-content rounded-control shadow-control">Action</button>
</div>
```

| Token Layer | Class Prefix                           | Use For           |
| ----------- | -------------------------------------- | ----------------- |
| Canvas      | `bg-canvas`, `text-canvas-content`     | App backgrounds   |
| Surface     | `bg-surface`, `text-surface-content`   | Cards, containers |
| Elevated    | `bg-elevated`, `text-elevated-content` | Modals, dropdowns |
| Brand       | `bg-brand`, `text-brand-content`       | Primary actions   |

## Components

### Inputs & Forms

Button, ButtonGroup, Checkbox, ColorPicker, DatePicker, FileUpload, OTPInput, RadioGroup, Rate, Select, Slider, Switch, TextArea, TextInput

### Layout & Data Display

AspectRatio, Avatar, AvatarGroup, Badge, Breadcrumb, Card, Divider, Footer, GridLayout, Navbar, Pagination, Sidebar, Skeleton, Table, Typography

### Overlay & Feedback

Alert, Collapsible, CommandBox, ContextMenu, Drawer, HoverCard, Modal, Popover, Show, Toaster, Tooltip

### Navigation

MenuBar, Stepper, Tab, Tour, Tree

### Animation & Effects

Affix, Animation, Carousel, Draggable, FloatingDock, Marquee, ResizablePane, Spinner

### Media

AudioPlayer, BigCalendar, QRCode, VideoPlayer

## Hooks

### State

`useLocalStorage` `useList` `useMap` `useSet` `useQueue`

### Lifecycle

`useIsMount` `useRenderCount`

### DOM & Interaction

`useOnClickOutside` `useMeasure` `useElementPosition` `useHover` `useKeyPress` `usePermission` `useDeviceOS`

### Animation & Timing

`useDebounce` `useThrottle` `useTimeout` `useCountdown` `useIntervalWhen`

### Sensors

`useBatteryStatus` `useNetworkStatus` `useWindowSize` `useScrollPosition` `useMouseTrack` `useIdle` `useVisibilityChange`

### Side Effects

`useCopyToClipboard` `useLockBodyScroll` `useConfirmExit` `usePageLeave`

### Async

`useIndexedDB`

### Utilities

`useMediaQuery` `usePreviousState`

## CLI

```bash
npx vayu-ui-cli init                    # Initialize Vayu UI in your project
npx vayu-ui-cli list                    # List all available components and hooks
npx vayu-ui-cli add <slug>              # Add a component or hook
npx vayu-ui-cli remove <slug>           # Remove an installed component or hook
npx vayu-ui-cli update <slug>           # Update to the latest version
npx vayu-ui-cli install-mcp --tool claude  # Configure MCP for AI tools
```

Supported MCP tools: `claude`, `cursor`, `opencode`, `vscode`, `codex`

## MCP Server

The `vayu-ui-mcp` package exposes the component and hook registry to AI assistants via the Model Context Protocol:

```bash
npx vayu-ui-cli install-mcp --tool claude
```

This gives AI tools access to 17 capabilities including component discovery, prop inspection, accessibility info, code examples, and design token lookups.

## Monorepo Structure

```
├── apps/docs/           # Documentation site (Next.js + Fumadocs)
├── packages/
│   ├── ui/              # Core components and hooks (vayu-ui)
│   ├── cli/             # CLI tool (vayu-ui-cli)
│   ├── registry/        # Shared metadata (vayu-ui-registry)
│   └── mcp/             # MCP server (vayu-ui-mcp)
└── scripts/             # Build utilities
```

## Local Development

```bash
git clone https://github.com/Rugved1652/vayu-ui.git && cd vayu-ui
npm install
npm run build

# Start docs at localhost:3000
npm run dev
```

## Documentation

Full documentation with interactive examples is available in the docs app. Run `npm run dev` to start it locally at `http://localhost:3000`.

## License

MIT &copy; Rugved Patel

## Stable release workflow

```bash
# New standalone or shared-workspace project
npx vayu-ui-cli@latest create my-app --framework vite
npx vayu-ui-cli@latest create my-workspace --framework next --turbo

# Install the full registry or target another workspace
npx vayu-ui-cli@latest add --all --yes
npx vayu-ui-cli@latest add text-input --cwd apps/web --yes

# Agent skills (select agents interactively)
npx skills add Rugved1652/vayu-ui
npx skills add Rugved1652/vayu-ui --skill taste-design
```

The CLI bundles source files with each release and uses `vayu-ui.config.json` to resolve their destinations. Optional `paths.components`, `paths.hooks`, and `paths.utils` support separate folders; `packagePath` selects a shared package for dependencies. Relative imports are rewritten to match the layout. `--skip-install` still records all dependencies for a later install.

MCP setup supports Claude Code, Cursor, OpenCode, VS Code, and Codex. Source import guidance accepts your configuration and target filename. Typography and Taste Design guidance keep application headings proportionate and reuse Vayu text primitives.

See [migration notes](CHANGELOG.md) for close-button placement, Typography sizing, and framework-neutral links. Before releasing, run `npm run test:release` and `npm run build`; source graph checks and MCP scaffold compilation are included in release validation.

See [release changes and migration notes](./CHANGELOG.md) and [validation coverage](./RELEASE_VALIDATION.md) for the 1.1.0 release.
