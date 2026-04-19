import { z } from 'zod';
import { findBySlug } from '../lib/registry.js';
import { scaffoldComponent } from '../lib/scaffold-templates/index.js';
import { registerTool } from '../lib/register-tool.js';

export function registerScaffoldComponentUsage(server: Parameters<typeof registerTool>[0]) {
  registerTool(
    server,
    'scaffold_component_usage',
    'Generate a minimal working code snippet for a component or hook with the specified configuration. Returns ready-to-paste TSX code, import statements, and required dependencies.',
    {
      slug: z.string().describe('Component or hook slug'),
      variant: z.string().optional().describe('Desired variant, e.g. "primary", "outline"'),
      size: z.string().optional().describe('Desired size, e.g. "small", "medium", "large"'),
      features: z
        .array(z.string())
        .optional()
        .describe(
          'Features to include: "icon", "badge", "loading", "disabled", "text", "label", "header", "footer"',
        ),
    },
    async (params) => {
      const { slug, variant, size, features } = params as {
        slug: string;
        variant?: string;
        size?: string;
        features?: string[];
      };

      const entry = findBySlug(slug);
      if (!entry) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: `No entry found for slug "${slug}"` }) }],
          isError: true,
        };
      }

      const result = scaffoldComponent(entry, { variant, size, features });

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                slug: entry.slug,
                name: entry.name,
                code: result.code,
                imports: result.imports,
                dependencies: result.dependencies,
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
