# Changelog

## 1.1.0 — Stable release

- Bundle source files with the CLI and derive the registry file/dependency graph from the implementation. All 59 components and 34 hooks can be installed independently, with their required utilities and dependencies.
- Share installation logic between `add`, `update`, and `create`. Add `add --all`, component-name aliases, removal previews, working CSS token updates, and explicit workspace targeting through `--cwd`.
- Preserve configuration on repeated initialization. Support separate `paths.components`, `paths.hooks`, and `paths.utils`, a dependency `packagePath`, and import aliases for MCP guidance.
- Generate complete Next.js and Vite starters, including JavaScript application files, no-src layouts, Pages Router, and offline scaffolding. `create --turbo` adds a shared UI package, workspace manifests, Turbo tasks, and shared Tailwind scanning.
- Include Select and its required hooks and utilities in every initialized starter. Cover standalone Select installation and multiple-component `add` requests, including mixed hooks, duplicate names, interleaved flags, and invalid items, with regression tests.
- Merge project MCP settings for Claude Code, Cursor, OpenCode, VS Code, and Codex. Handle JSON comments and TOML; preserve other servers and reject malformed configuration.
- Return source imports resolved for the target file and configuration from MCP. Scaffolds use registry examples with correct compound nesting and Typography.
- Publish skills from one canonical `skills/` directory, compatible with the skills.sh CLI. Include Taste Design guidance for intentional layouts and restrained type.
- Give Modal and Drawer headers an in-flow accessible X control. Alert dismiss controls share the row with content. Close controls respect canceled click events; fix Modal accessibility and Drawer focus restoration.
- Add `TextInput.NumberInput format` for comma grouping, normalized leading zeros, and unformatted string callbacks. Preserve large integer precision, decimal editing, and cursor position.
- Fix missing named exports, browser timer types, React 19 nullable refs, and heading-token handling in `tailwind-merge`.
- Align Select and TextInput field heights, text, validation, and disabled styling. Add `Select.Root disabled`, disable field actions consistently, and let multi-select chips wrap without changing the single-line size.

- Refresh audited dependencies and pin the Markdown serializer to 2.1.2: 2.1.3 changes attention handlers incompatibly with Fumadocs MDX 14 processed Markdown output. Keep this pin until a compatible MDX upgrade is verified.

### Migration notes

`update` replaces changed copied files with the sources shipped in the CLI version you run. Preview with `--dry-run` and review local component customizations before updating.

Drawer's default close control now lives in `Drawer.Header`. Include a header or add `Drawer.Close` to a custom layout. Both overlay headers accept `showClose` and `closeLabel`; a direct existing Close child replaces the default button.

Typography uses `text-h1`–`text-h6` instead of large breakpoint-based defaults. Intentional marketing display type can use `unsized` and explicit styling. Navigation primitives use native anchors by default so Vite does not require Next.js. Navbar and FloatingDock retain their `linkComponent` adapter; use router links when client-side navigation is needed.

MCP installation/scaffold tools default to source imports. Pass the actual usage filename as `fromFile` and the relevant configuration as `config`. Choose `mode: "package"` for applications installing `vayu-ui` from npm.

New starters require Node.js 20.19 or newer; this repository's release validation uses Node.js 22.3 or newer. `--no-typescript` controls application files; Vayu's copied sources remain TypeScript.
