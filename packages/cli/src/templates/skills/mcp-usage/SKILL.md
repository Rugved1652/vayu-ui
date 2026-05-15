---
name: mcp-usage
description: Use the Vayu UI MCP server as the source of truth for choosing, installing, composing, and coding Vayu UI components/hooks. Trigger for selecting the right component or hook, exact props/variants/sizes/states/events, examples, accessibility, anti-patterns, registry installs, design tokens, scaffolding, or "when should I use which component?". This skill is for consuming MCP tools precisely, not maintaining the MCP server.
---

# Vayu UI MCP Usage

Before writing Vayu UI code, query MCP instead of guessing names, props, variants, states, events, examples, install commands, tokens, or composition. Treat MCP as the toolkit oracle; scaffold first, then verify with exact detail tools.

## Tool Map

| Need | Tool |
| --- | --- |
| Browse available items | `list_components` |
| Search by intent | `find_component` |
| Confirm identity/use cases/sub-components/counts | `get_component_summary` |
| Props and accepted values | `get_component_props` |
| Variants and sizes | `get_component_variants` |
| Loading/disabled/open/etc. state props | `get_component_states` |
| Event handlers and TS signatures | `get_component_events` |
| ARIA, roles, keyboard, focus, WCAG | `get_component_a11y` |
| Mistakes with corrected code | `get_component_do_not` |
| NPM, registry, React dependencies | `get_component_dependencies` |
| Frequently co-used components | `get_component_peer_components` |
| Root/sub-component anatomy and hooks | `get_component_composition` |
| Example list or tagged example code | `get_component_example` |
| Minimal TSX snippet/imports/deps | `scaffold_component_usage` |
| Hook signature/params/return/deps | `get_hook_details` |
| Token-backed Tailwind classes | `get_design_tokens` |
| Exact init/add/install/import commands | `get_install_guide` |

## Workflow

1. Discover: if slug is unknown, call `find_component` with natural language; use `type: "hook"` for hooks. Use `list_components` only for broad browsing by `type` or `category`.
2. Confirm: call `get_component_summary`; compare description, tags, use cases, and sub-components. If top results are close, summarize each before choosing.
3. Inspect only what the task needs: props, variants, states, events, composition, a11y, hook details, peers, dependencies, or tokens.
4. Generate: call `scaffold_component_usage` with `slug` plus confirmed `variant`, `size`, and `features` (`icon`, `badge`, `loading`, `disabled`, `text`, `label`, `header`, `footer`).
5. Refine: use examples, props/events, composition, a11y, and do-not rules to adapt scaffold output to the app.
6. Install: call `get_install_guide` before giving CLI commands or imports; use `get_component_dependencies` when dependency review matters.

Good `find_component` queries describe behavior/context: `"floating dialog with overlay"`, `"button with loading state and icon"`, `"temporary message after successful save"`, `"debounce rapidly changing value"`, `"accessible hover preview card"`. If results are weak, add interaction/category words such as `open`, `dismiss`, `select`, `submit`, `preview`, `validate`, `announce`, `overlay`, `feedback`, `forms`, `input`, `navigation`, `state`, `dom`.

## Detail Recipes

| Case | Call Sequence |
| --- | --- |
| Simple visual component | `get_component_summary` -> `get_component_variants` -> `scaffold_component_usage` -> `get_component_do_not` |
| Compound/overlay component | `get_component_summary` -> `get_component_composition` -> `get_component_props` -> `get_component_states` -> `get_component_events` -> `get_component_a11y` -> `scaffold_component_usage` -> `get_component_do_not` |
| Hook | `find_component` with `type: "hook"` if needed -> `get_component_summary` -> `get_hook_details` -> `get_component_example` -> `get_component_do_not` |
| Styling | `get_design_tokens` with focused `group`: `color`, `radius`, `shadow`, `font`, or `animation` |
| Install/imports | `get_install_guide`; do not invent paths or CLI commands |

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

- Do not choose components or hooks from memory when MCP can search.
- Do not use unconfirmed props, variants, sizes, events, sub-components, imports, or CLI commands.
- Do not skip `get_component_a11y` for focusable, overlay, keyboard, form, or feedback UI.
- Do not paste scaffold output blindly; refine it with detail tools.
- Do not hardcode design values when `get_design_tokens` exposes a semantic token.
