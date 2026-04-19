import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findBySlug } from '../lib/registry.js';

export function registerGetComponentDependencies(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_component_dependencies',
    'Get NPM dependencies, registry dependencies, and React peer dependency for a component or hook. Use this before scaffolding to know what packages to install.',
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

      const reactPeer = entry.type === 'component' ? entry.reactPeerDependency : undefined;

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                slug: entry.slug,
                name: entry.name,
                npmDependencies: entry.npmDependencies,
                registryDependencies: entry.registryDependencies,
                reactPeerDependency: reactPeer,
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
