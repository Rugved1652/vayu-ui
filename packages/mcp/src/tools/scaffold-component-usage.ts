import { importOptionsSchema } from '../lib/imports.js';
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
      ...importOptionsSchema,
      slug: z.string().describe('Component or hook slug'),
      variant: z.string().optional().describe('Desired variant, e.g. "primary", "outline"'),
      size: z.string().optional().describe('Desired size, e.g. "small", "medium", "large"'),
      features: z
        .array(z.string())
        .optional()
        .describe(
          'Example tags to include; discover supported combinations with get_component_example. Unsupported combinations return an actionable error.',
        ),
    },
    async (params) => {
      const { slug } = params as {
        slug: string;
        variant?: string;
        size?: string;
        features?: string[];
      };

      const entry = findBySlug(slug);
      if (!entry) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: `No entry found for slug "${slug}"` }),
            },
          ],
          isError: true,
        };
      }

      let result;
      try {
        result = scaffoldComponent(entry, params);
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
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
                code: result.code,
                imports: result.imports,
                dependencies: result.dependencies,
                installCommand: `npx vayu-ui-cli add ${result.installSlugs.join(' ')}`,
                designGuidance:
                  'Use Typography for application text; retain compound titles for accessible overlays. Use the default text-h1–text-h6 scale; large hero type requires an explicit design brief.',
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
