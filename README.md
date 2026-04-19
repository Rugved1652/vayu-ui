# Vayu UI

Accessible, TypeScript-first React component library with Tailwind CSS v4 design tokens. 50+ components, 31 hooks, a CLI for scaffolding, and an MCP server for AI tool integration.

[![npm version](https://img.shields.io/npm/v/vayu-ui.svg)](https://www.npmjs.com/package/vayu-ui)
[![license](https://img.shields.io/npm/l/vayu-ui.svg)](https://github.com/VayuUI/vayu-ui-cli/blob/main/LICENSE)
[![react](https://img.shields.io/npm/dependency-version/vayu-ui/peer/react.svg)](https://react.dev)

## Features

- **50+ components** — Inputs, overlays, navigation, data display, animation, media, and more
- **31 hooks** — State management, DOM, sensors, timing, side effects
- **Tailwind v4 tokens** — Semantic design tokens for colors, radii, shadows, and layers
- **Compound components** — Composable APIs with namespaced subcomponents
- **WCAG 2.2 AA** — Keyboard navigation, focus management, ARIA support
- **CLI** — Scaffold components and hooks into any React project
- **MCP server** — Expose the registry to AI coding assistants

## Installation

```bash
npm install vayu-ui
```

### Peer Dependencies

Vayu UI requires React 19+:

```bash
npm install react@^19 react-dom@^19
```

## Quick Start

### Option 1: Install the package

```bash
npm install vayu-ui
```

```tsx
import { Button } from "vayu-ui";

export default function App() {
  return (
    <Button variant="solid" colorScheme="brand">
      <Button.Text>Get Started</Button.Text>
    </Button>
  );
}
```

### Option 2: Use the CLI to copy source files

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
  <button className="bg-brand text-brand-content rounded-control shadow-control">
    Action
  </button>
</div>
```

| Token Layer | Class Prefix | Use For |
|---|---|---|
| Canvas | `bg-canvas`, `text-canvas-content` | App backgrounds |
| Surface | `bg-surface`, `text-surface-content` | Cards, containers |
| Elevated | `bg-elevated`, `text-elevated-content` | Modals, dropdowns |
| Brand | `bg-brand`, `text-brand-content` | Primary actions |

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

Supported MCP tools: `claude`, `cursor`, `vscode`, `windsurf`, `antigravity`

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
git clone <!-- TODO: add repo URL --> && cd vayu-ui
npm install
npm run build

# Start docs at localhost:3000
npm run dev
```

## Documentation

<!-- TODO: add docs site URL -->
Full documentation with interactive examples is available in the docs app.

## License

MIT &copy; Rugved Patel
