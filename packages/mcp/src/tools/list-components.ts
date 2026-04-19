import { z } from 'zod';
import { componentEntries, hookEntries } from 'vayu-ui-registry';
import { registerTool } from '../lib/register-tool.js';

export function registerListComponents(server: Parameters<typeof registerTool>[0]) {
  registerTool(
    server,
    'list_components',
    'List all available Vayu UI components and hooks. Returns slug, name, category, description, and tags for each entry. Use type or category filters to narrow results.',
    {
      type: z
        .enum(['component', 'hook'])
        .optional()
        .describe("Filter by type: 'component' or 'hook'"),
      category: z
        .string()
        .optional()
        .describe(
          'Filter by category. Components: inputs, feedback, overlay, layout, data-display, navigation, animation, utility, media, forms. Hooks: state, lifecycle, dom, animation, sensor, side-effect, async, input.',
        ),
    },
    async (params) => {
      const { type, category } = params as { type?: 'component' | 'hook'; category?: string };

      const components =
        type === 'hook'
          ? []
          : componentEntries
              .filter((c) => !category || c.category === category)
              .map((c) => ({
                slug: c.slug,
                name: c.name,
                category: c.category,
                description: c.description,
                tags: c.tags,
              }));

      const hooks =
        type === 'component'
          ? []
          : hookEntries
              .filter((h) => !category || h.category === category)
              .map((h) => ({
                slug: h.slug,
                name: h.name,
                category: h.category,
                description: h.description,
                tags: h.tags,
              }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ components, hooks }, null, 2),
          },
        ],
      };
    },
  );
}
