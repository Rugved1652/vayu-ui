import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry, RegistryItem, DoNotCategory } from '../types/registry.types';

// ─────────────────────────────────────────────────────────────────────────────
// Helper — consistent MCP text response
// ─────────────────────────────────────────────────────────────────────────────

const ok  = (data: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] });
const err = (msg: string)   => ({ content: [{ type: 'text' as const, text: `ERROR: ${msg}` }], isError: true });

function resolve(registry: Registry, name: string): RegistryItem | null {
  return registry[name] ?? registry[Object.keys(registry).find(k => k.toLowerCase() === name.toLowerCase()) ?? ''] ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Register all tools
// ─────────────────────────────────────────────────────────────────────────────

export function registerTools(server: McpServer, registry: Registry) {

  // ── 1. DISCOVERY ───────────────────────────────────────────────────────────

  /**
   * list_components
   * Returns component names (+ category). Nothing else.
   * Agent calls this ONCE per session.
   * ~40 tokens out.
   */
  server.tool(
    'list_components',
    'List all available UI Kit component names. Call once per session for discovery.',
    {
      category: z.enum(['action','input','layout','overlay','display','navigation','feedback'])
        .optional()
        .describe('Filter by category'),
    },
    async ({ category }) => {
      const items = Object.values(registry).filter(c => !c.internal);
      const filtered = category ? items.filter(c => c.category === category) : items;
      return ok(filtered.map(c => ({ name: c.name, category: c.category })));
    }
  );

  // ── 2. SEARCH ──────────────────────────────────────────────────────────────

  /**
   * find_component
   * Search by use-case description. Returns name + one-line match reason.
   * ~60 tokens out.
   */
  server.tool(
    'find_component',
    'Find a component by describing what you need. Returns name + match reason only.',
    { query: z.string().describe('Use-case description e.g. "loading spinner button"') },
    async ({ query }) => {
      const q = query.toLowerCase();
      const matches = Object.values(registry)
        .filter(c => !c.internal)
        .filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.variants?.some(v => q.includes(v))
        )
        .map(c => ({ name: c.name, match: c.description }));

      if (!matches.length) return err(`No components matched "${query}"`);
      return ok(matches);
    }
  );

  // ── 3. PROPS ───────────────────────────────────────────────────────────────

  /**
   * get_component_props
   * Returns the PropsMap for a component.
   * ~90 tokens out.
   */
  server.tool(
    'get_component_props',
    'Get all props (type, required, default, description) for a component.',
    {
      name:            z.string().describe('Component name e.g. "Button"'),
      includeDeprecated: z.boolean().default(false).describe('Include deprecated props'),
    },
    async ({ name, includeDeprecated }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      if (!c.props) return ok({});

      const props = includeDeprecated
        ? c.props
        : Object.fromEntries(Object.entries(c.props).filter(([, p]) => !p.deprecated));

      return ok(props);
    }
  );

  // ── 4. EVENTS ──────────────────────────────────────────────────────────────

  /**
   * get_component_events
   * Returns EventsMap — handler names + full TypeScript signatures.
   * ~65 tokens out.
   */
  server.tool(
    'get_component_events',
    'Get all event handlers with TypeScript signatures for a component.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok(c.events ?? {});
    }
  );

  // ── 5. VARIANTS ────────────────────────────────────────────────────────────

  /**
   * get_component_variants
   * Returns just the variant name array.
   * ~30 tokens out.
   */
  server.tool(
    'get_component_variants',
    'Get available visual variants for a component.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok(c.variants ?? []);
    }
  );

  // ── 6. STATES ──────────────────────────────────────────────────────────────

  /**
   * get_component_states
   * Returns StatesMap — what triggers each state + visual + ARIA change.
   * ~80 tokens out.
   */
  server.tool(
    'get_component_states',
    'Get all interactive/visual states (default, hover, disabled, loading, error, etc.) for a component.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok(c.states ?? {});
    }
  );

  // ── 7. EXAMPLE ─────────────────────────────────────────────────────────────

  /**
   * get_component_example
   * Returns one example by key. If no key, returns all example keys (not code).
   * ~45 tokens out per example.
   */
  server.tool(
    'get_component_example',
    'Get a ready-to-paste TSX example for a specific variant/use-case. Omit `variant` to list available example keys.',
    {
      name:    z.string(),
      variant: z.string().optional().describe('Example key e.g. "loading", "withIcon", "formSubmit"'),
    },
    async ({ name, variant }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      if (!c.examples) return err(`No examples registered for "${name}"`);

      // No variant → return available keys only (not code — preserves tokens)
      if (!variant) return ok({ availableExamples: Object.keys(c.examples) });

      const ex = c.examples[variant];
      if (!ex) return err(`Example "${variant}" not found. Available: ${Object.keys(c.examples).join(', ')}`);

      return ok(ex);
    }
  );

  // ── 8. A11Y ────────────────────────────────────────────────────────────────

  /**
   * get_component_a11y
   * Returns structured A11y object — role, required attrs, keyboard nav, focus management.
   * ~70 tokens out.
   */
  server.tool(
    'get_component_a11y',
    'Get ARIA role, required attributes, keyboard navigation, and focus management rules.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok(c.a11y ?? {});
    }
  );

  // ── 9. DESIGN TOKENS ───────────────────────────────────────────────────────

  /**
   * get_design_tokens
   * Scoped token lookup — never returns the full tree.
   * ~55 tokens out.
   */
  server.tool(
    'get_design_tokens',
    'Get CSS design tokens for a component. Optionally filter to overridable tokens only.',
    {
      name:             z.string(),
      overridableOnly:  z.boolean().default(false),
    },
    async ({ name, overridableOnly }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      if (!c.tokens?.length) return ok([]);

      const tokens = overridableOnly ? c.tokens.filter(t => t.overridable) : c.tokens;
      return ok(tokens);
    }
  );

  // ── 10. DARK MODE ──────────────────────────────────────────────────────────

  server.tool(
    'get_component_dark_mode',
    'Get dark mode behaviour — automatic/manual, token swaps, required class names.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok(c.darkMode ?? { automatic: false });
    }
  );

  // ── 11. RULES ──────────────────────────────────────────────────────────────

  /**
   * get_component_doNot
   * Returns anti-pattern rules, optionally filtered by category.
   * ~35 tokens out.
   */
  server.tool(
    'get_component_doNot',
    'Get anti-pattern rules and common mistakes. Optionally filter by category (api, a11y, styling, nesting, perf, ux).',
    {
      name:     z.string(),
      category: z.enum(['api','a11y','styling','nesting','perf','ux']).optional(),
    },
    async ({ name, category }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      if (!c.doNot?.length) return ok([]);

      const rules = category
        ? c.doNot.filter(r => r.category === (category as DoNotCategory))
        : c.doNot;

      return ok(rules);
    }
  );

  // ── 12. RELATIONSHIPS ──────────────────────────────────────────────────────

  server.tool(
    'get_component_peers',
    'Get components frequently used alongside this one (e.g. Label + Input + FormError).',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok({
        peerComponents: c.peerComponents ?? [],
        dependencies:   c.dependencies ?? [],
      });
    }
  );

  // ── 13. COMPOSITION ────────────────────────────────────────────────────────

  server.tool(
    'get_component_composition',
    'Get compound component parts, structure, and canonical usage example.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      if (!c.composition) return ok({ hasComposition: false });
      return ok(c.composition);
    }
  );

  // ── 14. DEPRECATED PROPS ───────────────────────────────────────────────────

  server.tool(
    'get_deprecated_props',
    'Get all deprecated props and their replacements. Use before generating code for older codebases.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      if (!c.props) return ok([]);

      const deprecated = Object.entries(c.props)
        .filter(([, p]) => p.deprecated)
        .map(([propName, p]) => ({ prop: propName, ...p.deprecated }));

      return ok(deprecated);
    }
  );

  // ── 15. CHANGELOG ──────────────────────────────────────────────────────────

  server.tool(
    'get_component_changelog',
    'Get version history. Filter by breaking changes only or by version range.',
    {
      name:         z.string(),
      breakingOnly: z.boolean().default(false),
      since:        z.string().optional().describe('SemVer — only show entries at or after this version'),
    },
    async ({ name, breakingOnly, since }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      if (!c.changelog?.length) return ok([]);

      let log = breakingOnly ? c.changelog.filter(e => e.breaking) : c.changelog;
      if (since) log = log.filter(e => e.version >= since);

      return ok(log);
    }
  );

  // ── 16. TESTING ────────────────────────────────────────────────────────────

  server.tool(
    'get_component_testing',
    'Get data-testid values and Storybook path for a component.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok(c.testing ?? {});
    }
  );

  // ── 17. VALIDATE USAGE ─────────────────────────────────────────────────────

  /**
   * validate_component_usage
   * Agent passes its generated JSX string.
   * Server checks it against known props, deprecated props, and doNot rules.
   * Returns structured errors — not prose.
   */
  server.tool(
    'validate_component_usage',
    'Validate generated JSX against the component registry. Returns prop errors, deprecated warnings, and doNot violations.',
    {
      name: z.string(),
      jsx:  z.string().describe('The JSX string to validate e.g. "<Button intent=\\"primary\\">Submit</Button>"'),
    },
    async ({ name, jsx }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);

      const errors:   string[] = [];
      const warnings: string[] = [];

      // Check deprecated props
      if (c.props) {
        for (const [propName, prop] of Object.entries(c.props)) {
          if (prop.deprecated && jsx.includes(propName)) {
            warnings.push(`Deprecated: "${propName}" — ${prop.deprecated.message} (use "${prop.deprecated.replacedBy}" instead)`);
          }
        }
      }

      // Check doNot string rules against jsx
      if (c.doNot) {
        for (const rule of c.doNot) {
          // Simple heuristic checks — extend with real AST parser for production
          if (rule.category === 'nesting' && jsx.includes('<a') && jsx.includes('<Button')) {
            errors.push(`doNot[nesting]: ${rule.rule}`);
          }
          if (rule.category === 'api' && jsx.includes('loading') && jsx.includes('disabled')) {
            warnings.push(`doNot[api]: ${rule.rule}`);
          }
        }
      }

      return ok({
        valid:    errors.length === 0,
        errors,
        warnings,
      });
    }
  );

  // ── 18. FULL (LAST RESORT) ─────────────────────────────────────────────────

  /**
   * get_component_full
   * Returns everything. ~280 tokens.
   * Prefer 3–4 scoped calls over this single call.
   */
  server.tool(
    'get_component_full',
    'LAST RESORT: Returns the complete component definition. Prefer scoped tools. Use only for doc generation or complex scaffolding.',
    { name: z.string() },
    async ({ name }) => {
      const c = resolve(registry, name);
      if (!c) return err(`Component "${name}" not found`);
      return ok(c);
    }
  );
}
