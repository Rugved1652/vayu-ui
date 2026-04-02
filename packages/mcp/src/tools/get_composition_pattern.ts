// ============================================================================
// get_composition_pattern - Get compound component structure and rules
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
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
        component: c.component,
        hasComposition: true,
        root: c.composition.root,
        slots: c.composition.slots,
        structure: c.composition.structure,
        rules: c.composition.rules,
      });
    },
  );
}
