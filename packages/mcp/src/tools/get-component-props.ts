import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findComponent } from '../lib/registry.js';

export function registerGetComponentProps(server: Parameters<typeof registerTool>[0]) {
  registerTool(
    server,
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
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: `No component found for slug "${slug}"` }),
            },
          ],
          isError: true,
        };
      }

      const response: Record<string, unknown> = {
        slug: entry.slug,
        name: entry.name,
        rootProps: entry.rootProps,
        subComponentProps: entry.subComponents.map((sc) => ({
          subComponent: sc.name,
          props: sc.props,
        })),
      };

      // Surface known caveats that className alone can't cover
      if (slug === 'typography') {
        response.caveats = [
          {
            component: 'H1-H6',
            note: 'Responsive size classes (sm:/lg:) are baked in by default. Passing a size class via className only overrides the base breakpoint because twMerge does not resolve conflicts across breakpoints. Use the `unsized` prop to opt out of default sizing, then provide your own size classes.',
          },
        ];
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(response, null, 2),
          },
        ],
      };
    },
  );
}
