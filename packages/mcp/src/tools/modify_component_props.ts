// ============================================================================
// modify_component_props - Guidance for adding/modifying props
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
  server.tool(
    'modify_component_props',
    'Get guidance for adding or modifying component props.',
    {
      component: z.string().describe('Component name or slug'),
      propName: z.string().describe('Name of the prop to add/modify'),
      propType: z.string().describe('TypeScript type for the prop'),
      required: z.boolean().default(false).describe('Whether the prop is required'),
      defaultValue: z.string().optional().describe('Default value for the prop'),
      description: z.string().optional().describe('Description of the prop'),
    },
    async ({ component, propName, propType, required, defaultValue, description }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      // Check if prop exists in any prop group
      let propExists = false;
      let existingProp = undefined;
      for (const [, props] of Object.entries(c.props ?? {})) {
        const found = props.find((p) => p.name === propName);
        if (found) {
          propExists = true;
          existingProp = found;
          break;
        }
      }

      // Collect all prop names
      const allProps: string[] = [];
      Object.values(c.props ?? {}).forEach((props) => {
        props.forEach((p) => allProps.push(p.name));
      });

      return ok({
        component: c.component,
        propModification: {
          name: propName,
          type: propType,
          required,
          defaultValue,
          description,
          isExisting: propExists,
          existingDefinition: existingProp,
        },
        instructions: [
          `To ${propExists ? 'modify' : 'add'} the "${propName}" prop for ${c.component}:`,
          `1. ${propExists ? 'Update' : 'Add to'} the Props interface:`,
          `   ${propName}${required ? '' : '?'}: ${propType};`,
          ...(defaultValue ? [`2. Set default value: ${propName} = ${defaultValue}`] : []),
          `3. Update component implementation to use the new prop`,
          `4. ${propExists ? 'Update' : 'Add'} JSDoc comment${description ? `: ${description}` : ''}`,
        ],
        codeHint: `// In ${c.source?.file ?? 'component.tsx'}\ninterface ${c.component}Props {\n  // ...existing props\n  ${propName}${required ? '' : '?'}: ${propType};${description ? ` // ${description}` : ''}\n}\n\nconst ${c.component} = ({ ${propName}${defaultValue ? ` = ${defaultValue}` : ''}, ...props }: ${c.component}Props) => {\n  // Implementation\n};`,
        allProps,
      });
    },
  );
}
