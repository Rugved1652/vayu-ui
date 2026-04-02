## Vayu UI Monorepo

Vayu UI is an AI-optimized React UI system with:

- **Core library**: `vayu-ui` (components + hooks, in `packages/ui`)
- **CLI**: `vayu-ui-cli` (scaffolds CSS tokens, installs components/hooks from this repo)
- **Registry**: `vayu-ui-registry` (shared metadata for CLI & MCP)
- **MCP server**: `vayu-ui-mcp` (exposes the registry to AI tools)
- **Docs app**: `vayu-ui-docs` (Next.js + Fumadocs, in `apps/docs`)

### Repository layout

- `apps/docs` – Documentation site (Next.js App Router + Fumadocs)
- `packages/ui` – Source of all Vayu UI components and hooks
- `packages/cli` – `vayu-ui` CLI (Oclif)
- `packages/registry` – Typed registry consumed by CLI and MCP
- `packages/mcp` – MCP server exposing the registry over stdio

### Getting started (local dev)

```bash
git clone https://github.com/your-org/vayu-ui.git
cd vayu-ui
npm install

# Build everything
npm run build

# Run docs locally
cd apps/docs
npm run dev
```

### Components and hooks

**Components** (in `packages/ui/src/components/ui` and exposed via the registry), including:

- Accordion, Affix, Alert, Animation, AspectRatio, AudioPlayer
- Avatar, AvatarGroup, Badge, BigCalendar, Breadcrumb
- Button, ButtonGroup, Card, Carousel, Checkbox, Collapsible, ColorPicker, Combobox, CommandBox
- ContextMenu, DateTimePicker, Divider, Draggable, Drawer, FileUpload
- FloatingDock, Footer, HoverCard, Marquee, Menubar, Modal, Navbar
- OTPInput, Pagination, Popover, QRCode, RadioGroup, Rate, ResizablePane, RichTextEditor
- RoleGuard, Select, Show, Sidebar, Skeleton, Slider, Spinner, Stepper, Switch
- Tab, Table, TextArea, TextInput, Toast, Tooltip, Tour, Tree, Typography, VideoPlayer

**Hooks** (in `packages/ui/src/hooks` and exposed via the registry):

- `useBatteryStatus`, `useConfirmExit`, `useCopyToClipboard`, `useCountdown`
- `useDebounce`, `useDeviceOS`, `useElementPosition`, `useHover`, `useIdle`
- `useIndexedDB`, `useIntervalWhen`, `useIsMount`, `useKeyPress`
- `useList`, `useLocalStorage`, `useLockBodyScroll`, `useMap`, `useMeasure`
- `useMediaQuery`, `useMouseTrack`, `useNetworkStatus`, `useOnClickOutside`
- `usePageLeave`, `usePermission`, `usePreviousState`, `useQueue`
- `useRenderCount`, `useScrollPosition`, `useSet`, `useThrottle`
- `useTimeout`, `useVisibilityChange`, `useWindowSize`

### Using the CLI

Install or run via `npx`:

```bash
# Initialize Vayu UI tokens and Tailwind CSS in an existing project
npx vayu-ui-cli init

# List available components and hooks
npx vayu-ui-cli list

# Add a component or hook (copies source from this monorepo)
npx vayu-ui-cli add button
```

### MCP server

The `vayu-ui-mcp` package exposes the same registry over MCP so AI tools can:

- Discover components/hooks
- Inspect props, events, a11y, examples, and design tokens

It runs as a stdio server:

```bash
cd packages/mcp
npm run build
npm start
```

### License

MIT © Rugved Patel
