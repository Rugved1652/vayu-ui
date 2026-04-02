// ============================================================================
// get_design_rules - Get design tokens and state styling rules
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
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
        component: c.component,
        designTokens: c.design_tokens ?? { _note: 'No design tokens documented' },
        states: includeStates ? (c.states ?? { _note: 'No states documented' }) : undefined,
        accessibility: c.accessibility,
      });
    },
  );
}
