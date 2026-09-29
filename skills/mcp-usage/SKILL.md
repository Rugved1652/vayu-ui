---
name: mcp-usage
description: Use the Vayu UI MCP server as the source of truth for choosing, installing, composing, and coding Vayu UI components/hooks. Trigger for selecting the right component or hook, exact props/variants/sizes/states/events, examples, accessibility, anti-patterns, registry installs, design tokens, scaffolding, or "when should I use which component?". This skill is for consuming MCP tools precisely, not maintaining the MCP server.
---

# Vayu UI MCP Usage

Use MCP discovery before writing Vayu UI code when the server is available. If it is unavailable, inspect the installed source, registry, and project config and state that fallback; do not invent APIs or block independent work.

## Hard Gates (Non-Negotiable)

| Gate                    | Requirement                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Component/hook choice   | MUST call `find_component` when slug/name is unknown, then MUST call `get_component_summary` before implementation. |
| API accuracy            | MUST confirm props/variants/states/events with MCP detail tools before final code.                                  |
| Overlay/form/focus UI   | MUST call `get_component_a11y` for dialogs, popovers, menus, tooltips, forms, and keyboard-driven interactions.     |
| Compound components     | MUST call `get_component_composition` before writing nested sub-components.                                         |
| Safety checks           | MUST call `get_component_do_not` before finalizing code.                                                            |
| Install/import commands | MUST call `get_install_guide`; never invent commands or import paths.                                               |
| Custom alternatives     | MUST justify in one line when not using a Vayu component/hook that MCP indicates is suitable.                       |

## Tool Map

| Need                                             | Tool                            |
| ------------------------------------------------ | ------------------------------- |
| Browse available items                           | `list_components`               |
| Search by intent                                 | `find_component`                |
| Confirm identity/use cases/sub-components/counts | `get_component_summary`         |
| Props and accepted values                        | `get_component_props`           |
| Variants and sizes                               | `get_component_variants`        |
| Loading/disabled/open/etc. state props           | `get_component_states`          |
| Event handlers and TS signatures                 | `get_component_events`          |
| ARIA, roles, keyboard, focus, WCAG               | `get_component_a11y`            |
| Mistakes with corrected code                     | `get_component_do_not`          |
| NPM, registry, React dependencies                | `get_component_dependencies`    |
| Frequently co-used components                    | `get_component_peer_components` |
| Root/sub-component anatomy and hooks             | `get_component_composition`     |
| Example list or tagged example code              | `get_component_example`         |
| Minimal TSX snippet/imports/deps                 | `scaffold_component_usage`      |
| Hook signature/params/return/deps                | `get_hook_details`              |
| Token-backed Tailwind classes                    | `get_design_tokens`             |
| Exact init/add/install/import commands           | `get_install_guide`             |

## Workflow

1. Discover: if slug is unknown, call `find_component` with natural language; use `type: "hook"` for hooks. Use `list_components` only for broad browsing by `type` or `category`.
2. Confirm: call `get_component_summary`; compare description, tags, use cases, and sub-components. If top results are close, summarize each before choosing.
3. Inspect only what the task needs: props, variants, states, events, composition, a11y, hook details, peers, dependencies, or tokens.
4. Generate: call `scaffold_component_usage` with `slug` plus confirmed `variant`, `size`, and `features` (`icon`, `badge`, `loading`, `disabled`, `text`, `label`, `header`, `footer`).
5. Refine: use examples, props/events, composition, a11y, and do-not rules to adapt scaffold output to the app.
6. Install: call `get_install_guide` before giving CLI commands or imports; use `get_component_dependencies` when dependency review matters.

Good `find_component` queries describe behavior/context: `"floating dialog with overlay"`, `"button with loading state and icon"`, `"temporary message after successful save"`, `"debounce rapidly changing value"`, `"accessible hover preview card"`. If results are weak, add interaction/category words such as `open`, `dismiss`, `select`, `submit`, `preview`, `validate`, `announce`, `overlay`, `feedback`, `forms`, `input`, `navigation`, `state`, `dom`.

## Minimum Required Call Sequences

| Case                        | Call Sequence                                                                                                                                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New component selection     | `find_component` (if needed) -> `get_component_summary` -> `get_component_variants` -> `scaffold_component_usage` -> `get_component_do_not`                                                                                                         |
| Compound/overlay component  | `find_component` (if needed) -> `get_component_summary` -> `get_component_composition` -> `get_component_props` -> `get_component_states` -> `get_component_events` -> `get_component_a11y` -> `scaffold_component_usage` -> `get_component_do_not` |
| Hook selection              | `find_component` with `type: "hook"` (if needed) -> `get_component_summary` -> `get_hook_details` -> `get_component_example` -> `get_component_do_not`                                                                                              |
| Styling                     | `get_design_tokens` with focused `group`: `color`, `radius`, `shadow`, `font`, or `animation`                                                                                                                                                       |
| Install/import verification | `get_install_guide` -> `get_component_dependencies` (if dependency review is needed)                                                                                                                                                                |

## Examples

Use `get_component_example` in two steps:

1. Call without `tag` to get titles, descriptions, and tags only.
2. Call with the relevant `tag` to get full code.

If no tag matches, read `availableTags` from the response and retry. Skip step 1 only when the exact tag is already known.

## Scaffolding Rules

- Pass `variant` and `size` only after `get_component_variants`, unless the user supplied them.
- Choose `features` from the user's intent and supported composition.
- Treat scaffold output as a working baseline, not final truth.
- Reconcile final code against props, events, states, composition, a11y, examples, and anti-patterns.

## Token And Install Rules

- Use `get_design_tokens` instead of raw hex colors, arbitrary pixels, or invented semantic names.
- Use token groups to keep responses small: `color`, `radius`, `shadow`, `font`, `animation`.
- Use `get_install_guide` for `npx vayu-ui-cli init`, exact `npx vayu-ui-cli add ...`, npm deps, and imports.
- Adapt imports only when the local app has an established wrapper/barrel.

## Final Checks

- Chosen slug matches the user's job.
- Every variant, size, state, event, prop, and sub-component exists in MCP output.
- Compound markup follows `get_component_composition`.
- A11y guidance is reflected for overlays, dialogs, popovers, tooltips, hover cards, menus, forms, focus, labels, keyboard paths, and ARIA.
- `get_component_do_not` mistakes are avoided.
- Styling uses Vayu tokens where possible.
- Install commands/imports came from `get_install_guide`.

## Anti-Patterns

- Never choose components or hooks from memory when MCP can search.
- Never use unconfirmed props, variants, sizes, events, sub-components, imports, or CLI commands.
- Never skip `get_component_a11y` for focusable, overlay, keyboard, form, or feedback UI.
- Never paste scaffold output blindly; refine it with detail tools.
- Never hardcode design values when `get_design_tokens` exposes a semantic token.

## Typography and proportion

Use `Typography.H1`–`H6`, `Typography.P`, `Typography.Label`, and `Typography.Link` for application headings and text. Keep `Modal.Title`, `Drawer.Title`, and other compound titles for their accessible relationships. Native elements inside primitive implementations are appropriate; avoid replacing application Typography with custom styled heading/paragraph wrappers.

Use semantic heading levels with the default `text-h1`–`text-h6` tokens (30/24/20/18/16/14px at the default base). Page headings should not inherit marketing hero sizes. Card and overlay titles usually need 16–20px. Large display type is an explicit design decision, not an automatic responsive enlargement. Read the optional `taste-design` skill when composing or reviewing a whole screen.

Read `vayu-ui.config.json` before installation. Pass `--cwd` for the intended app or use a workspace-root config with `packagePath` and explicit `paths`. Request `get_install_guide` with those paths/aliases and use imports for copied sources. Use package imports only when the `vayu-ui` package is installed.
