import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry, RegistryItem, DoNotCategory } from "vayu-ui-registry";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const ok = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });
const err = (msg: string) => ({ content: [{ type: "text" as const, text: `ERROR: ${msg}` }], isError: true });

/** Case-insensitive lookup by name */
function resolve(registry: Registry, name: string): RegistryItem | null {
    return registry[name]
        ?? registry[Object.keys(registry).find(k => k.toLowerCase() === name.toLowerCase()) ?? ""]
        ?? null;
}

/** Lookup by slug */
function resolveBySlug(registry: Registry, slug: string): RegistryItem | null {
    return Object.values(registry).find(c => c.slug === slug) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Register all tools
// ─────────────────────────────────────────────────────────────────────────────

export function registerTools(server: McpServer, registry: Registry) {

    // ── DISCOVERY ─────────────────────────────────────────────────────────────

    /**
     * list_components
     * Returns name + category for all non-internal items.
     * Agent calls this ONCE per session for discovery.
     */
    server.tool(
        "list_components",
        "List all available Vayu UI components and hooks. Optionally filter by category or type.",
        {
            category: z.enum(["action", "input", "layout", "overlay", "display", "navigation", "feedback", "utility"])
                .optional().describe("Filter by category"),
            type: z.enum(["component", "hook"])
                .optional().describe("Filter by type"),
        },
        async ({ category, type }) => {
            let items = Object.values(registry).filter(c => !c.internal);
            if (category) items = items.filter(c => c.category === category);
            if (type) items = items.filter(c => c.type === type);
            return ok(items.map(c => ({ name: c.name, slug: c.slug, category: c.category, type: c.type, description: c.description })));
        }
    );

    /**
     * find_component
     * Search by use-case description. Returns name + one-line match reason.
     */
    server.tool(
        "find_component",
        "Find a Vayu UI component or hook by describing what you need. Returns name + description.",
        { query: z.string().describe("Use-case description e.g. \"countdown timer\" or \"overlay dialog\"") },
        async ({ query }) => {
            const q = query.toLowerCase();
            const matches = Object.values(registry)
                .filter(c => !c.internal)
                .filter(c =>
                    c.name.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q) ||
                    c.category.toLowerCase().includes(q) ||
                    c.tags.some(t => t.toLowerCase().includes(q)) ||
                    c.variants?.some(v => q.includes(v))
                )
                .map(c => ({ name: c.name, slug: c.slug, type: c.type, match: c.description }));
            if (!matches.length) return err(`No items matched "${query}". Try list_components() to browse.`);
            return ok(matches);
        }
    );

    // ── SINGLE COMPONENT ──────────────────────────────────────────────────────

    /**
     * get_component_props
     * Returns PropsMap — keyed by prop name.
     */
    server.tool(
        "get_component_props",
        "Get all props (type, required, default, description) for a component or hook.",
        {
            name: z.string().describe("Component name e.g. \"Button\", \"TextInput\""),
            includeDeprecated: z.boolean().default(false).describe("Include deprecated props"),
        },
        async ({ name, includeDeprecated }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found. Use find_component() to search.`);
            if (!c.props) return ok({ _note: "No props documented yet" });
            const props = includeDeprecated
                ? c.props
                : Object.fromEntries(Object.entries(c.props).filter(([, p]) => !p.deprecated));
            return ok(props);
        }
    );

    /**
     * get_component_variants
     * Returns the available visual variant names.
     */
    server.tool(
        "get_component_variants",
        "Get available visual variants for a component.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            return ok(c.variants?.length ? c.variants : { _note: "No variants documented" });
        }
    );

    /**
     * get_component_states
     * Returns StatesMap — trigger, visualChange, ariaAttr per state.
     */
    server.tool(
        "get_component_states",
        "Get all interactive/visual states (default, hover, disabled, loading, error…) for a component.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            return ok(c.states ?? { _note: "No states documented" });
        }
    );

    /**
     * get_component_events
     * Returns EventsMap — handler names and full TypeScript signatures.
     */
    server.tool(
        "get_component_events",
        "Get all event handlers with TypeScript signatures for a component.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            return ok(c.events ?? { _note: "No events documented" });
        }
    );

    /**
     * get_component_example
     * Returns one ready-to-paste TSX example by variant key.
     * Omit variant to list available keys first.
     */
    server.tool(
        "get_component_example",
        "Get a ready-to-paste TSX example. Omit `variant` to list available example keys first.",
        {
            name: z.string(),
            variant: z.string().optional().describe("Example key e.g. \"loading\", \"withIcon\", \"danger\""),
        },
        async ({ name, variant }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            if (!c.examples) return err(`No examples registered for "${name}" yet.`);
            if (!variant) return ok({ availableExamples: Object.keys(c.examples) });
            const ex = c.examples[variant];
            if (!ex) return err(`Example "${variant}" not found. Available: ${Object.keys(c.examples).join(", ")}`);
            return ok(ex);
        }
    );

    /**
     * get_component_a11y
     * Returns role, required attrs, keyboard nav, focus management.
     */
    server.tool(
        "get_component_a11y",
        "Get ARIA role, required attributes, keyboard navigation, and focus management rules.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            return ok(c.a11y ?? { _note: "No accessibility metadata documented yet" });
        }
    );

    /**
     * get_component_doNot
     * Returns anti-pattern rules, optionally filtered by category.
     */
    server.tool(
        "get_component_doNot",
        "Get anti-pattern rules and common mistakes. Optionally filter by category: api | a11y | styling | nesting | perf | ux.",
        {
            name: z.string(),
            category: z.enum(["api", "a11y", "styling", "nesting", "perf", "ux"]).optional(),
        },
        async ({ name, category }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            if (!c.doNot?.length) return ok([]);
            const rules = category ? c.doNot.filter(r => r.category === (category as DoNotCategory)) : c.doNot;
            return ok(rules);
        }
    );

    /**
     * get_component_dependencies
     * Returns NPM deps, registry deps, and CLI install command.
     */
    server.tool(
        "get_component_dependencies",
        "Get NPM dependencies, registry dependencies, and the CLI install command for a component.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            return ok({
                npmDependencies: c.dependencies,
                registryDependencies: c.registryDependencies,
                installCommand: `npx vayu-ui add ${c.slug}`,
                targetPath: `${c.targetPath}/${c.fileName}`,
            });
        }
    );

    /**
     * get_component_peer_components
     * Returns peer components + dependencies.
     */
    server.tool(
        "get_component_peer_components",
        "Get components frequently used alongside this one.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            return ok({
                peerComponents: c.peerComponents ?? [],
                internalDeps: c.registryDependencies,
            });
        }
    );

    // ── PATTERNS ──────────────────────────────────────────────────────────────

    /**
     * get_component_composition
     * Returns compound component parts, structure, and canonical example.
     */
    server.tool(
        "get_component_composition",
        "Get compound component parts, structure, and canonical usage pattern.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            if (!c.composition) return ok({ hasComposition: false, _note: "This component does not use the compound pattern" });
            return ok(c.composition);
        }
    );

    /**
     * scaffold_component_usage
     * Generates a ready-to-use TSX snippet with imports and state.
     */
    server.tool(
        "scaffold_component_usage",
        "Generate a copy-paste ready TSX snippet with imports, state hook, and JSX for a component.",
        {
            name: z.string().describe("Component name e.g. \"Button\", \"Modal\""),
            variant: z.string().optional().describe("Variant key for the example to scaffold"),
            withState: z.boolean().default(false).describe("Wrap in a useState-controlled example"),
        },
        async ({ name, variant, withState }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);

            const importPath = c.type === "hook"
                ? `import { ${c.name} } from "@/hooks/${c.fileName.replace(/\.tsx?$/, "")}";`
                : `import { ${c.name} } from "@/components/ui/${c.fileName.replace(/\.tsx?$/, "")}";`;

            const exampleKey = variant ?? "default";
            const example = c.examples?.[exampleKey];

            const stateWrapper = withState
                ? `const [open, setOpen] = React.useState(false);\n\n`
                : "";

            const code = example
                ? `${importPath}\n\n${stateWrapper}${example.code}`
                : `${importPath}\n\n${stateWrapper}<${c.name} />\n{/* Add props from get_component_props("${c.name}") */}`;

            return ok({ scaffold: code, installCommand: `npx vayu-ui add ${c.slug}` });
        }
    );

    // ── DESIGN SYSTEM ─────────────────────────────────────────────────────────

    /**
     * get_design_tokens
     * Returns CSS tokens for a component with optional overridable filter.
     */
    server.tool(
        "get_design_tokens",
        "Get CSS design tokens for a component. Optionally filter to overridable tokens only.",
        {
            name: z.string(),
            overridableOnly: z.boolean().default(false).describe("Return only tokens safe to override"),
        },
        async ({ name, overridableOnly }) => {
            const c = resolve(registry, name);
            if (!c) return err(`"${name}" not found.`);
            if (!c.tokens?.length) return ok({ _note: "No design tokens documented for this component" });
            const tokens = overridableOnly ? c.tokens.filter(t => t.overridable) : c.tokens;
            return ok(tokens);
        }
    );

    // ── FULL (LAST RESORT) ────────────────────────────────────────────────────

    /**
     * get_component_full
     * Returns everything. Prefer 3-4 scoped calls over this.
     */
    server.tool(
        "get_component_full",
        "LAST RESORT: Returns the complete component definition including all props, events, examples, a11y, tokens, and rules. Prefer scoped tools. Use only for doc generation or complex scaffolding.",
        { name: z.string() },
        async ({ name }) => {
            const c = resolve(registry, name);
            if (!c) {
                // Try slug fallback
                const bySlug = resolveBySlug(registry, name);
                if (!bySlug) return err(`"${name}" not found. Use find_component() to search.`);
                return ok(bySlug);
            }
            return ok(c);
        }
    );
}
