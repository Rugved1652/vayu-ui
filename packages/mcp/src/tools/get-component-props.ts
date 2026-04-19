import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findComponent } from '../lib/registry.js';

export function registerGetComponentProps(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_props',
    'Get all props for a component including root props and sub-component props with types, defaults, descriptions, and accepted values.',
    {
      slug: z.string().describe('Component slug, e.g. "button", "modal", "tooltip"'),
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
                rootProps: entry.rootProps,
                subComponentProps: entry.subComponents.map((sc) => ({
                  subComponent: sc.name,
                  props: sc.props,
                })),
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
