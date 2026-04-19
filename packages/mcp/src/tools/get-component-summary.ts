import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findBySlug } from '../lib/registry.js';

export function registerGetComponentSummary(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_summary',
    'Get a lightweight identity card for a component or hook. Returns name, type, category, description, tags, use cases, sub-component names (components only), and counts of examples and anti-patterns. Use this after find_component to decide which detail tools to call next.',
    {
      slug: z
        .string()
        .describe('Component or hook slug, e.g. "button", "modal", "use-debounce"'),
    },
    async (params) => {
      const { slug } = params as { slug: string };
      const entry = findBySlug(slug);
      if (!entry) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: `No entry found for slug "${slug}"` }) }],
          isError: true,
        };
      }

      if (entry.type === 'component') {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  slug: entry.slug,
                  name: entry.name,
                  type: entry.type,
                  category: entry.category,
                  description: entry.description,
                  longDescription: entry.longDescription,
                  tags: entry.tags,
                  useCases: entry.useCases,
                  rendersAs: entry.rendersAs,
                  rootComponent: entry.rootComponent,
                  subComponentNames: entry.subComponents.map((sc) => sc.name),
                  exampleCount: entry.examples.length,
                  doNotCount: entry.doNot.length,
                },
                null,
                2,
              ),
            },
          ],
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
                type: entry.type,
                category: entry.category,
                description: entry.description,
                longDescription: entry.longDescription,
                tags: entry.tags,
                useCases: entry.useCases,
                signature: entry.signature,
                exampleCount: entry.examples.length,
                doNotCount: entry.doNot.length,
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
