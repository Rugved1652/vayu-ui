import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findComponent } from '../lib/registry.js';

export function registerGetComponentA11y(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_a11y',
    'Get accessibility information for a component: ARIA roles, attributes, keyboard interactions, focus management, and WCAG compliance level.',
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
                a11y: entry.a11y,
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
