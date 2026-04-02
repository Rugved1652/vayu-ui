// ============================================================================
// modify_component_variant - Guidance for creating/modifying variants
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
  server.tool(
    'modify_component_variant',
    'Generate guidance for modifying or creating a component variant.',
    {
      component: z.string().describe('Component name or slug'),
      variant: z.string().describe('Variant name to create or modify'),
      baseOn: z.string().optional().describe('Existing variant to use as base'),
      customizations: z.record(z.string()).optional().describe('Key-value pairs of customizations'),
    },
    async ({ component, variant, baseOn, customizations }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      // Get existing variants
      const existingVariants = c.variants ?? [];
      const existingVariant = existingVariants.find(
        (v) => v.name.toLowerCase() === variant.toLowerCase(),
      );

      const baseResponse = {
        component: c.component,
        targetVariant: variant,
        isExisting: !!existingVariant,
        existingVariantDef: existingVariant,
        baseVariant: baseOn,
        customizations: customizations ?? {},
      };

      // If modifying existing variant
      if (existingVariant) {
        return ok({
          ...baseResponse,
          action: 'modify',
          instructions: [
            `To modify the "${variant}" variant of ${c.component}:`,
            `1. Current values: ${existingVariant.values.join(' | ')}`,
            `2. Default: ${existingVariant.default ?? 'none'}`,
            `3. Locate the variant definition in ${c.source?.file ?? 'component file'}`,
            `4. Add or modify values in the variant config`,
            ...(customizations
              ? [`5. Apply customizations: ${JSON.stringify(customizations)}`]
              : []),
          ],
          codeHint: `// In ${c.source?.file ?? 'component.tsx'}\nconst ${variant}Variant = {\n  // Add your variant styles here\n};`,
        });
      }

      // Creating new variant
      return ok({
        ...baseResponse,
        action: 'create',
        instructions: [
          `To create a new "${variant}" variant for ${c.component}:`,
          ...(baseOn ? [`1. Base variant "${baseOn}" selected`] : ['1. Using default as base']),
          `2. Define variant styles following the pattern of existing variants`,
          `3. Add the variant to the component's variant prop type`,
          `4. Implement the variant styling logic`,
          ...(customizations ? [`5. Apply customizations: ${JSON.stringify(customizations)}`] : []),
        ],
        existingVariants: existingVariants.map((v) => ({
          name: v.name,
          values: v.values,
          default: v.default,
        })),
        codeHint: `// Add to ${c.source?.file ?? 'component.tsx'}\n// 1. Add to variant type\ntype Variant = '${variant}' | existing_variants;\n\n// 2. Add variant styles\nconst ${variant}Styles = {\n  // Your styles here\n};`,
      });
    },
  );
}
