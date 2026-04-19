import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findHook } from '../lib/registry.js';

export function registerGetHookDetails(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_hook_details',
    'Get full API details for a hook: TypeScript signature, parameters, return values, and dependencies. For code examples and anti-patterns, use get_component_example and get_component_do_not with the hook slug.',
    {
      slug: z
        .string()
        .describe('Hook slug, e.g. "use-debounce", "use-local-storage"'),
    },
    async (params) => {
      const { slug } = params as { slug: string };
      const entry = findHook(slug);
      if (!entry) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: `No hook found for slug "${slug}"` }) }],
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
                description: entry.description,
                longDescription: entry.longDescription,
                signature: entry.signature,
                typeParams: entry.typeParams,
                parameters: entry.parameters,
                returnType: entry.returnType,
                returnValues: entry.returnValues,
                npmDependencies: entry.npmDependencies,
                registryDependencies: entry.registryDependencies,
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
