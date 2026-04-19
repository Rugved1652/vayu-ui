import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findComponent } from '../lib/registry.js';

export function registerGetComponentVariants(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_variants',
    'Get available visual variants and sizes for a component with their default values.',
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
                variants: entry.variants,
                sizes: entry.sizes,
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
