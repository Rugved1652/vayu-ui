import { z } from 'zod';
import { designTokenCategories } from '../lib/design-tokens.js';
import { registerTool } from '../lib/register-tool.js';

export function registerGetDesignTokens(server: Parameters<typeof registerTool>[0]) {
  registerTool(
    server,
    'get_design_tokens',
    'Get Vayu UI design tokens (semantic color names, radius, shadows, fonts, animations) with Tailwind utility classes. Use these tokens instead of hardcoded colors or pixel values.',
    {
      group: z
        .string()
        .optional()
        .describe(
          'Filter by token group: "color", "radius", "shadow", "font", "animation". When omitted, returns all groups.',
        ),
    },
    async (params) => {
      const { group } = params as { group?: string };
      const categories = group
        ? designTokenCategories.filter((c) =>
            c.name.toLowerCase().includes(group.toLowerCase()),
          )
        : designTokenCategories;

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ categories }, null, 2),
          },
        ],
      };
    },
  );
}
