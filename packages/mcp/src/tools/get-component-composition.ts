import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findComponent } from '../lib/registry.js';

export function registerGetComponentComposition(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_composition',
    'Get the compound component structure for a component: root component name, sub-components with descriptions and props, and internal hooks used.',
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
                rootComponent: entry.rootComponent,
                subComponents: entry.subComponents.map((sc) => ({
                  name: sc.name,
                  fileName: sc.fileName,
                  description: sc.description,
                  supportsAsChild: sc.supportsAsChild,
                })),
                hooks: entry.hooks,
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
