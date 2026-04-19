import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findComponent } from '../lib/registry.js';

export function registerGetComponentStates(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_states',
    'Get interactive and visual states for a component (loading, disabled, open, etc.) with their controlling props and default values.',
    {
      slug: z.string().describe('Component slug'),
    },
    async (params) => {
      const { slug } = params as { slug: string };
      const entry = findComponent(slug);
      if (!entry) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: `No component found for slug "${slug}"` }) }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                slug: entry.slug,
                name: entry.name,
                states: entry.states,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
