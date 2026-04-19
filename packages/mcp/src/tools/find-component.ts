import { z } from 'zod';
import { allEntries } from 'vayu-ui-registry';
import { searchEntries } from '../lib/search.js';
import { registerTool } from '../lib/register-tool.js';

export function registerFindComponent(server: Parameters<typeof registerTool>[0]) {
  registerTool(
    server,
    'find_component',
    'Search for Vayu UI components and hooks by natural language query. Matches against name, description, tags, and use cases. Returns top 5 results with relevance reasons.',
    {
      query: z
        .string()
        .describe(
          'Natural language description of what you need, e.g. "floating dialog with overlay" or "debounce rapidly changing value"',
        ),
      type: z
        .enum(['component', 'hook'])
        .optional()
        .describe('Restrict results to components or hooks'),
    },
    async (params) => {
      const { query, type } = params as { query: string; type?: 'component' | 'hook' };

      const pool = type
        ? allEntries.filter((e) => e.type === type)
        : allEntries;

      const results = searchEntries(query, pool, 5).map((r) => ({
        slug: r.entry.slug,
        name: r.entry.name,
        type: r.entry.type,
        category: r.entry.category,
        description: r.entry.description,
        relevanceReason: r.reasons.slice(0, 3).join('; '),
      }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ results }, null, 2),
          },
        ],
      };
    },
  );
}
