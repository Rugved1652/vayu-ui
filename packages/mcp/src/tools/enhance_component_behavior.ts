// ============================================================================
// enhance_component_behavior - Guidance for adding/modifying state behaviors
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
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
      const stateExists = existingStates.includes(state);

      return ok({
        component: c.component,
        stateEnhancement: {
          state,
          behavior,
          triggerType: triggerType ?? 'prop',
          isExisting: stateExists,
          existingStates,
        },
        instructions: [
          `To ${behavior} "${state}" state behavior for ${c.component}:`,
          `1. Add state prop to interface: ${state}?: boolean`,
          `2. Add visual styling for ${state} state`,
          `3. Update ARIA attributes for accessibility`,
          `4. ${triggerType === 'event' ? 'Add event handler for state changes' : 'Handle prop-driven state'}`,
          ...(stateExists ? [`5. Current state already exists - consider extending behavior`] : []),
        ],
        codeHint: `// In ${c.source?.file ?? 'component.tsx'}\n// 1. Add prop\ninterface ${c.component}Props {\n  ${state}?: boolean;\n}\n\n// 2. Add styles\nconst ${state}Styles = clsx(\n  baseStyles,\n  props.${state} && "${state.toLowerCase()}-styles"\n);\n\n// 3. Add ARIA\naria-${state}={props.${state}}`,
        accessibility: c.accessibility,
      });
    },
  );
}
