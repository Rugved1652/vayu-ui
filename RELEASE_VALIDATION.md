# Vayu UI 1.1.0 validation

Validated on September 29, 2026 with Node.js 22.23.3. The automated suite contains 39 CLI tests, 20 UI tests, five MCP protocol tests, and 93 compiled scaffolds.

The release is prepared locally. Packages and documentation have not been published.

## Reproducible checks

Use Node.js 22.3 or newer from the repository root:

```bash
npm ci
npm run test:release
npm run lint
npm run build
npm audit --omit=dev
npm pack --workspace vayu-ui-registry --workspace vayu-ui-cli --workspace vayu-ui-mcp --workspace vayu-ui --dry-run
```

The Stability GitHub Actions workflow runs the installation, release tests, lint, build, and package checks. Run `npm run registry:sync` after changing source imports, exports, or dependencies; `registry:check` rejects missing registrations, unresolved imports, and stale dependency manifests.

## Coverage

| Area                    | What is verified                                                                                                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry and generation | All 59 components and 34 hooks have complete local import graphs when installed independently, including separate component/hook/utility destinations. All entries are installed together and type-checked.                                                                                             |
| CLI lifecycle           | Add, update, remove, init, check, list, version, help, and MCP setup; Select alone; multiple components and hooks with duplicate names, interleaved flags, and invalid items; dry runs, aliases, missing-file repair, noninteractive usage, nested workspace execution, and configuration preservation. |
| Boilerplates            | Next.js and Vite; TypeScript and JavaScript; standalone and Turbo layouts; Select and its dependencies in all eight starter variants; Pages Router, no-src, no-Tailwind, and skipped installation.                                                                                                      |
| MCP                     | All 17 tools exercised over stdio, including every registered component/hook and tagged examples. All 93 default scaffolds type-check against CLI-generated sources. Configured imports and invalid requests are checked.                                                                               |
| Client setup            | Claude Code, Cursor, OpenCode, VS Code, and Codex configuration formats; existing-server preservation, JSON comments, TOML, idempotence, and malformed input.                                                                                                                                           |
| Skills                  | All eight canonical skill files pass skill validation are discovered by `npx skills add . --list`, and install successfully for Codex in a separate project. CLI packages contain the same skills.                                                                                                      |
| UI behavior             | Numeric grouping, leading zeros, paste, invalid input, large integers, min/max, caret editing, accessible close controls, canceled clicks, focus restoration, immediate Escape, and heading tokens.                                                                                                     |
| Browser checks          | Chromium at 375px and 1280px: long Modal/Drawer titles remain clear of the in-flow X; keyboard dismissal works; numeric examples and the 30px application H1 render correctly.                                                                                                                          |
| Distribution            | CLI and MCP tarballs installed outside the monorepo and exercised without access to workspace packages or source fallback directories.                                                                                                                                                                  |

Real builds supplement the scaffold matrix: a generated Vite TypeScript project with all registry items, a generated Turbo Next.js project with shared UI sources, a Vite JavaScript project without `src/`, a Next.js JavaScript Pages Router project without `src/`, and a pnpm Turborepo/Vite project with all 93 entries in its shared UI package.

A separate fresh Vite starter confirms Select exists immediately after `create`. A single `add select modal --skip-install drawer text-input use-in-view --yes` invocation generates the requested components and hook. A clean npm install, TypeScript check, production build using an MCP-generated Select example, and application lint all pass.

After updating Select and TextInput together through the CLI, Chromium checks 30 side-by-side field pairs at both 375px and 1280px. All three sizes match in height, typography, padding, border, background, opacity, and placeholder color across empty, filled, disabled, validation, password, and multi-select states. Disabled controls do not highlight on hover or open; selection preserves height and wrapped chips grow without horizontal overflow. Interaction tests cover disabling an open Select, re-enabling it, chip removal, and disabled TextInput actions.

## Compatibility notes

Read [CHANGELOG.md](./CHANGELOG.md) before updating copied components. In particular, Drawer places its default close button in its header, heading defaults use the application token scale, navigation defaults use native anchors, and MCP code-generation tools default to source imports.

The repository pins `mdast-util-to-markdown` to 2.1.2 because 2.1.3 introduces attention-handler behavior incompatible with Fumadocs MDX 14 processed Markdown generation. The direct development dependency ensures npm resolves that version consistently. Revisit the pin when upgrading the documentation compiler.

Client configuration tests verify generated files and the server protocol; they do not automate each external editor's trust or restart workflow. The browser checks focus on changed UI behavior, rather than asserting exhaustive interaction coverage for every component. Lint retains nonblocking CLI complexity/style warnings.
