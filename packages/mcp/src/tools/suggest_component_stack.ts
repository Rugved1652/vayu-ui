// ============================================================================
// suggest_component_stack - Get related components and dependencies
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent, resolveBySlug } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
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
      const relatedComponents = (c.related_components ?? [])
        .map((slug) => {
          const related = resolveBySlug(registry, slug);
          return related
            ? {
                component: related.component,
                slug: related.slug,
                category: related.category,
                reason: `Commonly used with ${c.component}`,
              }
            : null;
        })
        .filter(Boolean);

      // Get component dependencies
      const componentDeps = (c.dependencies?.components ?? []).map((slug) => {
        const dep = resolveBySlug(registry, slug);
        return dep
          ? { component: dep.component, slug: dep.slug, required: true }
          : { slug, required: true };
      });

      return ok({
        component: c.component,
        relatedComponents,
        componentDependencies: componentDeps,
        npmDependencies: includeDependencies
          ? {
              icons: c.dependencies?.icons ?? [],
              utilities: c.dependencies?.utilities ?? [],
            }
          : undefined,
        installCommand: `npx vedui add ${c.slug}`,
      });
    },
  );
}
