import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findComponent } from '../lib/registry.js';

export function registerGetComponentPeerComponents(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_peer_components',
    'Get frequently co-used components for a given component, with reasons why they are used together.',
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
                peerComponents: entry.peerComponents,
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
