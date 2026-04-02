// ============================================================================
// Vayu UI MCP Server — Tool Handlers
// 16 tools for AI-native UI development
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent, resolveBySlug, filterPublic } from '../utils.js';

// ─────────────────────────────────────────────────────────────────────────────
// Register All Tools
// ─────────────────────────────────────────────────────────────────────────────

export function registerTools(server: McpServer, registry: Registry) {
  // ═══════════════════════════════════════════════════════════════════════════
  // DISCOVERY TOOLS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * search_components
   * Search for components by intent, keywords, or description with relevance scoring.
   */
  server.tool(
    'search_components',
    'Search for Vayu UI components by intent, keywords, or description. Returns matching components with relevance scores.',
    {
      query: z.string().describe('Natural language search query describing what you need'),
      searchIn: z
        .enum(['all', 'intent', 'keywords', 'description'])
        .default('all')
        .describe('Where to search - defaults to all fields'),
      limit: z.number().min(1).max(20).default(5).describe('Maximum number of results to return'),
    },
    async ({ query, searchIn, limit }) => {
      const q = query.toLowerCase();
      const items = filterPublic(Object.values(registry));

      const scored = items
        .map((c) => {
          let score = 0;
          const matchReasons: string[] = [];

          // Search in intent (highest priority - 3x weight)
          if ((searchIn === 'all' || searchIn === 'intent') && c.intent) {
            const intentMatches = c.intent.filter((i) => i.toLowerCase().includes(q));
            if (intentMatches.length > 0) {
              score += intentMatches.length * 3;
              matchReasons.push(`Intent: ${intentMatches.join(', ')}`);
            }
          }

          // Search in ai_keywords (high priority - 2x weight)
          if ((searchIn === 'all' || searchIn === 'keywords') && c.ai_keywords) {
            const keywordMatches = c.ai_keywords.filter((k) => k.toLowerCase().includes(q));
            if (keywordMatches.length > 0) {
              score += keywordMatches.length * 2;
              matchReasons.push(`Keywords: ${keywordMatches.join(', ')}`);
            }
          }

          // Search in tags
          if ((searchIn === 'all' || searchIn === 'keywords') && c.tags) {
            const tagMatches = c.tags.filter((t) => t.toLowerCase().includes(q));
            if (tagMatches.length > 0) {
              score += tagMatches.length;
              matchReasons.push(`Tags: ${tagMatches.join(', ')}`);
            }
          }

          // Search in description (standard priority - 1x weight)
          if (searchIn === 'all' || searchIn === 'description') {
            if (c.description?.toLowerCase().includes(q)) {
              score += 1;
              matchReasons.push('Description match');
            }
            if (c.ai_summary?.toLowerCase().includes(q)) {
              score += 1;
              matchReasons.push('Summary match');
            }
          }

          return { component: c, score, matchReasons };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      if (!scored.length) {
        return err(
          `No components matched "${query}". Try different keywords or use list_components().`,
        );
      }

      return ok(
        scored.map((r) => ({
          name: r.component.name,
          slug: r.component.slug,
          category: r.component.category,
          description: r.component.description,
          relevanceScore: r.score,
          matchReasons: r.matchReasons,
        })),
      );
    },
  );

  /**
   * list_components
   * List all available components with optional filtering.
   */
  server.tool(
    'list_components',
    'List all available Vayu UI components. Optionally filter by category or type.',
    {
      category: z
        .enum([
          'action',
          'input',
          'layout',
          'overlay',
          'display',
          'navigation',
          'feedback',
          'utility',
          'animation',
        ])
        .optional()
        .describe('Filter by component category'),
      type: z.enum(['component', 'hook']).optional().describe('Filter by type - component or hook'),
    },
    async ({ category, type }) => {
      let items = filterPublic(Object.values(registry));

      if (category) {
        items = items.filter((c) => c.category === category);
      }
      if (type) {
        items = items.filter((c) => c.type === type);
      }

      return ok(
        items.map((c) => ({
          name: c.name,
          slug: c.slug,
          category: c.category,
          type: c.type,
          description: c.description,
          intent: c.intent,
        })),
      );
    },
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPONENT INFO TOOLS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * get_component_spec
   * Get the complete specification for a component including props, variants, and slots.
   */
  server.tool(
    'get_component_spec',
    'Get the complete specification for a component including props, variants, and slots.',
    {
      component: z.string().describe("Component name or slug (e.g., 'Button', 'accordion')"),
      includeDeprecated: z.boolean().default(false).describe('Include deprecated props'),
    },
    async ({ component, includeDeprecated }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      // Build props spec
      let propsSpec = c.props;
      if (!includeDeprecated && propsSpec) {
        propsSpec = Object.fromEntries(Object.entries(propsSpec).filter(([, p]) => !p.deprecated));
      }

      // Build variants spec
      const variantsSpec = c.variants?.length ? c.variants : null;

      // Build slots from composition
      const slotsSpec =
        c.composition?.slots ?? (c.composition?.parts ? Object.keys(c.composition.parts) : null);

      // Get default props
      const defaultProps = Object.entries(propsSpec ?? {})
        .filter(([, p]) => p.default !== undefined)
        .reduce((acc, [k, p]) => ({ ...acc, [k]: p.default }), {});

      return ok({
        name: c.name,
        slug: c.slug,
        category: c.category,
        type: c.type,
        props: propsSpec ?? { _note: 'No props documented' },
        variants: variantsSpec ?? { _note: 'No variants documented' },
        slots: slotsSpec ?? { _note: 'This component does not use slots' },
        defaultProps,
      });
    },
  );

  /**
   * get_component_examples
   * Get code examples for a component.
   */
  server.tool(
    'get_component_examples',
    'Get code examples for a component. Returns all examples or a specific one.',
    {
      component: z.string().describe('Component name or slug'),
      example: z.string().optional().describe('Specific example name (omit to list available)'),
    },
    async ({ component, example }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      if (!c.examples || Object.keys(c.examples).length === 0) {
        return ok({ _note: `No examples documented for ${c.name}` });
      }

      // If no specific example requested, list available
      if (!example) {
        return ok({
          component: c.name,
          availableExamples: Object.entries(c.examples).map(([key, ex]) => ({
            key,
            description: ex.description ?? 'No description',
          })),
        });
      }

      // Return specific example
      const ex = c.examples[example];
      if (!ex) {
        return err(
          `Example "${example}" not found. Available: ${Object.keys(c.examples).join(', ')}`,
        );
      }

      return ok({
        component: c.name,
        example: example,
        description: ex.description,
        code: ex.code,
      });
    },
  );

  /**
   * get_component_rules
   * Get usage rules for a component: when to use it and anti-patterns to avoid.
   */
  server.tool(
    'get_component_rules',
    'Get usage rules for a component: when to use it and anti-patterns to avoid.',
    {
      component: z.string().describe('Component name or slug'),
      includeAntiPatterns: z.boolean().default(true).describe('Include anti-patterns section'),
    },
    async ({ component, includeAntiPatterns }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      return ok({
        component: c.name,
        whenToUse: c.when_to_use ?? [],
        whenNotToUse: c.when_not_to_use ?? [],
        antiPatterns: includeAntiPatterns ? (c.anti_patterns ?? c.doNot ?? []) : undefined,
      });
    },
  );

  /**
   * get_composition_pattern
   * Get the compound component structure and composition rules.
   */
  server.tool(
    'get_composition_pattern',
    'Get the compound component structure and composition rules.',
    {
      component: z.string().describe('Component name or slug'),
    },
    async ({ component }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      if (!c.composition) {
        return ok({
          hasComposition: false,
          _note: 'This component does not use the compound pattern',
          _suggestion: 'Use get_component_spec() for simple component props and variants',
        });
      }

      return ok({
        component: c.name,
        hasComposition: true,
        root: c.composition.root ?? Object.keys(c.composition.parts ?? {})[0],
        slots: c.composition.slots ?? Object.keys(c.composition.parts ?? {}),
        structure: c.composition.structure ?? [],
        rules: c.composition.rules ?? [],
        parts: c.composition.parts,
        example: c.composition.example,
        partsRequired: c.composition.partsRequired,
      });
    },
  );

  /**
   * suggest_component_stack
   * Get suggested related components and dependencies for building a complete UI pattern.
   */
  server.tool(
    'suggest_component_stack',
    'Get suggested related components and dependencies for building a complete UI pattern.',
    {
      component: z.string().describe('Component name or slug'),
      includeDependencies: z.boolean().default(true).describe('Include NPM dependencies'),
    },
    async ({ component, includeDependencies }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      // Resolve related components with their details
      const relatedComponents = (c.related_components ?? c.peerComponents ?? [])
        .map((slug) => {
          const related = resolveBySlug(registry, slug);
          return related
            ? {
                name: related.name,
                slug: related.slug,
                category: related.category,
                reason: `Commonly used with ${c.name}`,
              }
            : null;
        })
        .filter(Boolean);

      // Get registry dependencies
      const registryDeps = (c.registryDependencies ?? []).map((slug) => {
        const dep = resolveBySlug(registry, slug);
        return dep ? { name: dep.name, slug: dep.slug, required: true } : { slug, required: true };
      });

      return ok({
        component: c.name,
        relatedComponents,
        registryDependencies: registryDeps,
        npmDependencies: includeDependencies ? (c.dependencies ?? []) : undefined,
        installCommand: `npx Vayu UI add ${c.slug}`,
      });
    },
  );

  /**
   * get_design_tokens
   * Get design tokens (colors, spacing, typography, etc.) for a component.
   */
  server.tool(
    'get_design_tokens',
    'Get design tokens (colors, spacing, typography, etc.) for a component.',
    {
      component: z.string().describe('Component name or slug'),
      tokenType: z
        .enum(['all', 'colors', 'spacing', 'typography', 'border', 'radius'])
        .default('all')
        .describe('Filter by token type'),
    },
    async ({ component, tokenType }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      if (!c.design_tokens && !c.tokens) {
        return ok({
          _note: `No design tokens documented for ${c.name}`,
          _suggestion: 'This component may use default theme tokens',
        });
      }

      // Handle both design_tokens and legacy tokens format
      if (tokenType === 'all') {
        return ok({
          component: c.name,
          designTokens: c.design_tokens ?? c.tokens,
        });
      }

      const filteredTokens = c.design_tokens?.[tokenType as keyof typeof c.design_tokens];
      return ok({
        component: c.name,
        tokenType,
        tokens: filteredTokens ?? { _note: `No ${tokenType} tokens documented` },
      });
    },
  );

  /**
   * get_design_rules
   * Get design rules including tokens and state-specific styling guidance.
   */
  server.tool(
    'get_design_rules',
    'Get design rules including tokens and state-specific styling guidance.',
    {
      component: z.string().describe('Component name or slug'),
      includeStates: z.boolean().default(true).describe('Include state styling rules'),
    },
    async ({ component, includeStates }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      return ok({
        component: c.name,
        designTokens: c.design_tokens ?? c.tokens ?? { _note: 'No design tokens documented' },
        states: includeStates ? (c.states ?? { _note: 'No states documented' }) : undefined,
        accessibility: c.a11y,
      });
    },
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // MODIFICATION/GENERATION TOOLS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * modify_component_variant
   * Generate guidance for modifying or creating a component variant.
   */
  server.tool(
    'modify_component_variant',
    'Generate guidance for modifying or creating a component variant.',
    {
      component: z.string().describe('Component name or slug'),
      variant: z.string().describe('Variant name to create or modify'),
      baseOn: z.string().optional().describe('Existing variant to use as base'),
      customizations: z
        .record(z.string())
        .optional()
        .describe("Key-value pairs of customizations (e.g., { color: 'primary', size: 'lg' })"),
    },
    async ({ component, variant, baseOn, customizations }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      // Get existing variants
      const existingVariants = c.variants ?? [];
      const existingVariant = existingVariants.find(
        (v) => v.name.toLowerCase() === variant.toLowerCase(),
      );

      const baseResponse = {
        component: c.name,
        targetVariant: variant,
        isExisting: !!existingVariant,
        existingVariantDef: existingVariant,
        baseVariant: baseOn,
        customizations: customizations ?? {},
      };

      // If modifying existing variant
      if (existingVariant) {
        return ok({
          ...baseResponse,
          action: 'modify',
          instructions: [
            `To modify the "${variant}" variant of ${c.name}:`,
            `1. Current values: ${existingVariant.values.join(' | ')}`,
            `2. Default: ${existingVariant.default ?? 'none'}`,
            `3. Locate the variant definition in ${c.fileName ?? 'component file'}`,
            `4. Add or modify values in the variant config`,
            ...(customizations
              ? [`5. Apply customizations: ${JSON.stringify(customizations)}`]
              : []),
          ],
          codeHint: `// In ${c.fileName ?? 'component.tsx'}\nconst ${variant}Variant = {\n  // Add your variant styles here\n};`,
        });
      }

      // Creating new variant
      return ok({
        ...baseResponse,
        action: 'create',
        instructions: [
          `To create a new "${variant}" variant for ${c.name}:`,
          ...(baseOn ? [`1. Base variant "${baseOn}" selected`] : ['1. Using default as base']),
          `2. Define variant styles following the pattern of existing variants`,
          `3. Add the variant to the component's variant prop type`,
          `4. Implement the variant styling logic`,
          ...(customizations ? [`5. Apply customizations: ${JSON.stringify(customizations)}`] : []),
        ],
        existingVariants: existingVariants.map((v) => ({
          name: v.name,
          values: v.values,
          default: v.default,
        })),
        codeHint: `// Add to ${c.fileName ?? 'component.tsx'}\n// 1. Add to variant type\ntype Variant = '${variant}' | existing_variants;\n\n// 2. Add variant styles\nconst ${variant}Styles = {\n  // Your styles here\n};`,
      });
    },
  );

  /**
   * modify_component_structure
   * Get guidance for modifying the component's compound structure or adding new parts.
   */
  server.tool(
    'modify_component_structure',
    "Get guidance for modifying the component's compound structure or adding new parts.",
    {
      component: z.string().describe('Component name or slug'),
      modificationType: z
        .enum(['add_part', 'modify_part', 'reorder_parts', 'nest_parts'])
        .describe('Type of structural modification'),
      partName: z.string().describe('Name of the part to add/modify'),
      parentPart: z.string().optional().describe('Parent part for nested modifications'),
    },
    async ({ component, modificationType, partName, parentPart }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      if (!c.composition) {
        return ok({
          _note: `${c.name} does not use a compound component pattern`,
          _suggestion: 'Consider using modify_component_props for simple component modifications',
        });
      }

      const existingParts = c.composition.parts ?? {};
      const partExists = partName in existingParts;

      const baseResponse = {
        component: c.name,
        modificationType,
        partName,
        parentPart,
        existingStructure: existingParts,
      };

      switch (modificationType) {
        case 'add_part':
          return ok({
            ...baseResponse,
            instructions: [
              `To add "${partName}" part to ${c.name}:`,
              `1. Create a new sub-component: ${c.name}.${partName}`,
              `2. Add context provider if state sharing is needed`,
              `3. Export the new part in the compound object`,
              ...(parentPart ? [`4. Nest under parent: ${parentPart}`] : []),
            ],
            codeHint: `// In ${c.fileName ?? 'component.tsx'}\nconst ${partName} = React.forwardRef<${partName}Element, ${partName}Props>(\n  (props, ref) => {\n    // Implementation\n  }\n);\n\n${c.name}.${partName} = ${partName};`,
          });

        case 'modify_part':
          return ok({
            ...baseResponse,
            partExists,
            currentDefinition: existingParts[partName],
            instructions: [
              `To modify "${partName}" in ${c.name}:`,
              `1. Locate the ${partName} component definition`,
              `2. Current behavior: ${existingParts[partName] ?? 'Unknown'}`,
              `3. Modify props interface if needed`,
              `4. Update implementation`,
            ],
          });

        case 'reorder_parts':
          return ok({
            ...baseResponse,
            instructions: [
              `To reorder parts in ${c.name}:`,
              `1. Current order: ${Object.keys(existingParts).join(' > ')}`,
              `2. Reorder exports in the compound assignment`,
              `3. Update structure documentation`,
            ],
          });

        case 'nest_parts':
          return ok({
            ...baseResponse,
            instructions: [
              `To nest "${partName}" under "${parentPart}":`,
              `1. Create context in parent: ${parentPart}Context`,
              `2. Consume context in child: ${partName}`,
              `3. Ensure proper type definitions`,
            ],
          });
      }
    },
  );

  /**
   * modify_component_props
   * Get guidance for adding or modifying component props.
   */
  server.tool(
    'modify_component_props',
    'Get guidance for adding or modifying component props.',
    {
      component: z.string().describe('Component name or slug'),
      propName: z.string().describe('Name of the prop to add/modify'),
      propType: z.string().describe('TypeScript type for the prop'),
      required: z.boolean().default(false).describe('Whether the prop is required'),
      defaultValue: z.string().optional().describe('Default value for the prop'),
      description: z.string().optional().describe('Description of the prop'),
    },
    async ({ component, propName, propType, required, defaultValue, description }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;
      const existingProps = c.props ?? {};
      const propExists = propName in existingProps;
      const existingProp = existingProps[propName];

      return ok({
        component: c.name,
        propModification: {
          name: propName,
          type: propType,
          required,
          defaultValue,
          description,
          isExisting: propExists,
          existingDefinition: propExists ? existingProp : undefined,
        },
        instructions: [
          `To ${propExists ? 'modify' : 'add'} the "${propName}" prop for ${c.name}:`,
          `1. ${propExists ? 'Update' : 'Add to'} the Props interface:`,
          `   ${propName}${required ? '' : '?'}: ${propType};`,
          ...(defaultValue ? [`2. Set default value: ${propName} = ${defaultValue}`] : []),
          `3. Update component implementation to use the new prop`,
          `4. ${propExists ? 'Update' : 'Add'} JSDoc comment${description ? `: ${description}` : ''}`,
        ],
        codeHint: `// In ${c.fileName ?? 'component.tsx'}\ninterface ${c.name}Props {\n  // ...existing props\n  ${propName}${required ? '' : '?'}: ${propType};${description ? ` // ${description}` : ''}\n}\n\nconst ${c.name} = ({ ${propName}${defaultValue ? ` = ${defaultValue}` : ''}, ...props }: ${c.name}Props) => {\n  // Implementation\n};`,
        allProps: Object.keys(existingProps),
      });
    },
  );

  /**
   * enhance_component_behavior
   * Get guidance for adding or modifying component state behaviors.
   */
  server.tool(
    'enhance_component_behavior',
    'Get guidance for adding or modifying component state behaviors.',
    {
      component: z.string().describe('Component name or slug'),
      state: z.string().describe("State to add/modify (e.g., 'loading', 'disabled', 'error')"),
      behavior: z.enum(['add', 'modify', 'extend']).describe('Type of behavior enhancement'),
      triggerType: z
        .enum(['prop', 'event', 'internal'])
        .optional()
        .describe('How the state is triggered'),
    },
    async ({ component, state, behavior, triggerType }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;
      const existingStates = c.states ?? [];
      const stateExists =
        typeof existingStates === 'object' &&
        (Array.isArray(existingStates) ? existingStates.includes(state) : state in existingStates);

      return ok({
        component: c.name,
        stateEnhancement: {
          state,
          behavior,
          triggerType: triggerType ?? 'prop',
          isExisting: !!stateExists,
          existingStates,
        },
        instructions: [
          `To ${behavior} "${state}" state behavior for ${c.name}:`,
          `1. Add state prop to interface: ${state}?: boolean`,
          `2. Add visual styling for ${state} state`,
          `3. Update ARIA attributes for accessibility`,
          `4. ${triggerType === 'event' ? 'Add event handler for state changes' : 'Handle prop-driven state'}`,
          ...(stateExists ? [`5. Current state already exists - consider extending behavior`] : []),
        ],
        codeHint: `// In ${c.fileName ?? 'component.tsx'}\n// 1. Add prop\ninterface ${c.name}Props {\n  ${state}?: boolean;\n}\n\n// 2. Add styles\nconst ${state}Styles = clsx(\n  baseStyles,\n  props.${state} && "${state.toLowerCase()}-styles"\n);\n\n// 3. Add ARIA\naria-${state}={props.${state}}`,
        accessibility: c.a11y,
      });
    },
  );

  /**
   * apply_responsive_layout
   * Get guidance for making a component responsive.
   */
  server.tool(
    'apply_responsive_layout',
    'Get guidance for making a component responsive.',
    {
      component: z.string().describe('Component name or slug'),
      breakpoints: z
        .array(z.string())
        .optional()
        .describe("Target breakpoints (e.g., ['sm', 'md', 'lg'])"),
      strategy: z
        .enum(['mobile-first', 'desktop-first', 'container-query'])
        .default('mobile-first')
        .describe('Responsive strategy'),
    },
    async ({ component, breakpoints, strategy }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;
      const responsiveConfig = c.responsive ?? { allowed: false, patterns: [] };
      const targetBreakpoints = breakpoints ?? ['sm', 'md', 'lg', 'xl'];

      return ok({
        component: c.name,
        responsiveSupport: {
          isResponsive: responsiveConfig.allowed,
          existingPatterns: responsiveConfig.patterns,
          strategy,
          targetBreakpoints,
        },
        instructions: [
          `To apply responsive layout to ${c.name}:`,
          `1. Strategy: ${strategy}`,
          `2. Add responsive prop variants if not present`,
          `3. Use Tailwind responsive prefixes: ${targetBreakpoints.map((b) => `${b}:`).join(', ')}`,
          ...(strategy === 'container-query'
            ? [`4. For container queries, wrap in a container with @container class`]
            : []),
          `5. Test at all target breakpoints`,
          ...(responsiveConfig.allowed
            ? [
                `6. Component already supports responsiveness via: ${responsiveConfig.patterns?.join(', ')}`,
              ]
            : []),
        ],
        codeHint: `// In ${c.fileName ?? 'component.tsx'}\n// Using ${strategy}\nconst responsiveStyles = clsx(\n  baseStyles,\n  ${targetBreakpoints.map((b) => `"${b}:breakpoint-styles"`).join(',\n  ')}\n);\n\n// Props pattern\ninterface ${c.name}Props {\n  size?: 'sm' | 'md' | 'lg';\n  // Or responsive object\n  size?: { base: 'sm'; md: 'md'; lg: 'lg' };\n}`,
      });
    },
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDATION TOOLS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * validate_ui_code
   * Validate UI code against component specifications and best practices.
   */
  server.tool(
    'validate_ui_code',
    'Validate UI code against component specifications and best practices.',
    {
      component: z.string().describe('Component name or slug'),
      code: z.string().describe('Code snippet to validate'),
      strictMode: z.boolean().default(false).describe('Enable strict validation'),
    },
    async ({ component, code, strictMode }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;
      const validationRules = c.validation_rules ?? [];
      const validProps = Object.keys(c.props ?? {});
      const requiredProps = Object.entries(c.props ?? {})
        .filter(([, p]) => p.required)
        .map(([name]) => name);

      // Basic validation checks
      const issues: Array<{ type: 'error' | 'warning' | 'info'; message: string }> = [];

      // Check for required props
      requiredProps.forEach((prop) => {
        if (!code.includes(prop)) {
          issues.push({
            type: 'error',
            message: `Missing required prop: ${prop}`,
          });
        }
      });

      // Check for invalid props (simple regex-based)
      const propPattern = /(\w+)=/g;
      let match;
      while ((match = propPattern.exec(code)) !== null) {
        const propName = match[1];
        if (
          !validProps.includes(propName) &&
          !propName.startsWith('on') &&
          !propName.startsWith('aria-') &&
          !propName.startsWith('data-') &&
          !['className', 'style', 'id', 'key', 'ref', 'children'].includes(propName)
        ) {
          issues.push({
            type: strictMode ? 'error' : 'warning',
            message: `Unknown prop: ${propName}`,
          });
        }
      }

      // Check composition structure
      if (c.composition?.partsRequired) {
        const requiredParts = Object.keys(c.composition.parts ?? {});
        requiredParts.forEach((part) => {
          if (!code.includes(part)) {
            issues.push({
              type: 'warning',
              message: `Missing compound part: ${part}`,
            });
          }
        });
      }

      // Check against validation rules
      validationRules.forEach((rule) => {
        issues.push({
          type: 'info',
          message: `Rule reminder: ${rule}`,
        });
      });

      const hasErrors = issues.some((i) => i.type === 'error');
      const hasWarnings = issues.some((i) => i.type === 'warning');

      return ok({
        component: c.name,
        valid: !hasErrors,
        strictMode,
        issues,
        summary: {
          errors: issues.filter((i) => i.type === 'error').length,
          warnings: issues.filter((i) => i.type === 'warning').length,
          info: issues.filter((i) => i.type === 'info').length,
        },
        componentSpec: {
          validProps,
          requiredProps,
          validationRules,
        },
      });
    },
  );

  /**
   * fix_ui_code
   * Get fix suggestions for UI code issues based on component specifications.
   */
  server.tool(
    'fix_ui_code',
    'Get fix suggestions for UI code issues based on component specifications.',
    {
      component: z.string().describe('Component name or slug'),
      code: z.string().describe('Code snippet with issues to fix'),
      issues: z
        .array(z.string())
        .optional()
        .describe('Specific issues to fix (omit for auto-detection)'),
    },
    async ({ component, code, issues }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;
      const validProps = c.props ?? {};
      const requiredProps = Object.entries(validProps)
        .filter(([, p]) => p.required)
        .map(([name]) => name);

      // Detect issues if not provided
      const detectedIssues = issues ? [...issues] : [];

      // Auto-detect common issues
      requiredProps.forEach((prop) => {
        if (!code.includes(prop)) {
          detectedIssues.push(`Missing required prop: ${prop}`);
        }
      });

      // Generate fixes
      const fixes: Array<{
        issue: string;
        suggestion: string;
        codeChange?: string;
      }> = [];

      detectedIssues.forEach((issue) => {
        if (issue.includes('Missing required prop')) {
          const propName = issue.split(': ')[1];
          const propDef = validProps[propName];
          fixes.push({
            issue,
            suggestion: `Add the required "${propName}" prop`,
            codeChange: `${propName}={${propDef?.default ? `"${propDef.default}"` : `"value"`}}`,
          });
        }
      });

      // Check composition
      if (c.composition?.partsRequired) {
        const requiredParts = Object.keys(c.composition.parts ?? {});
        const missingParts = requiredParts.filter((part) => !code.includes(part));

        missingParts.forEach((part) => {
          const exampleLine = c.composition?.example
            ?.split('\n')
            .find((line) => line.includes(part));
          fixes.push({
            issue: `Missing compound part: ${part}`,
            suggestion: `Add the ${part} component to the composition`,
            codeChange: exampleLine ?? '',
          });
        });
      }

      // Build fixed code suggestion
      let fixedCode = code;
      fixes.forEach((fix) => {
        if (fix.codeChange && !fixedCode.includes(fix.codeChange)) {
          // Simple insertion - add props to the component tag
          fixedCode = fixedCode.replace(
            new RegExp(`<${c.name}([^>]*)>`, 'g'),
            `<${c.name}$1 ${fix.codeChange}>`,
          );
        }
      });

      return ok({
        component: c.name,
        originalCode: code,
        detectedIssues,
        fixes,
        fixedCode: fixes.length > 0 ? fixedCode : undefined,
        componentReference: {
          validProps: Object.keys(validProps),
          requiredProps,
          composition: c.composition,
          examples: c.examples,
        },
      });
    },
  );
}
