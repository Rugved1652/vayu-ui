import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findBySlug } from '../lib/registry.js';

export function registerGetComponentDoNot(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_do_not',
    'Get anti-pattern rules for a component or hook — common mistakes with bad code, good code, and reasons. Use this to avoid generating incorrect usage.',
    {
      slug: z.string().describe('Component or hook slug'),
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

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                slug: entry.slug,
                name: entry.name,
                doNot: entry.doNot,
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
