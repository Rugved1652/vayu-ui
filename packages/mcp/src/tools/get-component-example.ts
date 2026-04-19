import { z } from 'zod';
import { findBySlug } from '../lib/registry.js';
import { registerTool } from '../lib/register-tool.js';

export function registerGetComponentExample(server: Parameters<typeof registerTool>[0]) {
  registerTool(
    server,
    'get_component_example',
    'Get code examples for a component or hook. Without a tag filter, returns only example titles and descriptions (no code). With a tag, returns full code for matching examples.',
    {
      slug: z.string().describe('Component or hook slug'),
      tag: z
        .string()
        .optional()
        .describe(
          'Filter examples by tag (e.g. "loading", "compound", "basic"). When omitted, returns titles and descriptions only.',
        ),
    },
    async (params) => {
      const { slug, tag } = params as { slug: string; tag?: string };
      const entry = findBySlug(slug);
      if (!entry) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: `No entry found for slug "${slug}"` }) }],
          isError: true,
        };
      }

      if (tag) {
        const matching = entry.examples.filter(
          (ex) => ex.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase())),
        );

        if (matching.length === 0) {
          const allTags = [...new Set(entry.examples.flatMap((ex) => ex.tags ?? []))];
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  message: `No examples match tag "${tag}".`,
                  availableTags: allTags,
                  allExampleTitles: entry.examples.map((ex) => ex.title),
                }),
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
                  examples: matching,
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      // No tag — return titles and descriptions only (token-efficient)
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                slug: entry.slug,
                name: entry.name,
                examples: entry.examples.map((ex) => ({
                  title: ex.title,
                  description: ex.description,
                  tags: ex.tags,
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
