// ============================================================================
// modify_component_structure - Guidance for compound structure changes
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Registry } from 'vayu-ui-registry';
import { ok, err, resolveComponent } from '../utils.js';

export function register(server: McpServer, registry: Registry) {
  server.tool(
    'modify_component_structure',
    "Get guidance for modifying the component's compound structure or adding new parts.",
    {
      component: z.string().describe('Component name or slug'),
      modificationType: z
        .enum(['add_slot', 'modify_slot', 'reorder_slots', 'nest_slots'])
        .describe('Type of structural modification'),
      slotName: z.string().describe('Name of the slot to add/modify'),
      parentSlot: z.string().optional().describe('Parent slot for nested modifications'),
    },
    async ({ component, modificationType, slotName, parentSlot }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      if (!c.composition) {
        return ok({
          _note: `${c.component} does not use a compound component pattern`,
          _suggestion: 'Consider using modify_component_props for simple component modifications',
        });
      }

      const existingSlots = c.composition.slots ?? [];
      const slotExists = existingSlots.includes(slotName);

      const baseResponse = {
        component: c.component,
        modificationType,
        slotName,
        parentSlot,
        existingSlots,
      };

      switch (modificationType) {
        case 'add_slot':
          return ok({
            ...baseResponse,
            instructions: [
              `To add "${slotName}" slot to ${c.component}:`,
              `1. Create a new sub-component: ${c.component}.${slotName}`,
              `2. Add context provider if state sharing is needed`,
              `3. Export the new slot in the compound object`,
              `4. Update composition.slots in the registry`,
              ...(parentSlot ? [`5. Nest under parent: ${parentSlot}`] : []),
            ],
            codeHint: `// In ${c.source?.file ?? 'component.tsx'}\nconst ${slotName} = React.forwardRef<${slotName}Element, ${slotName}Props>(\n  (props, ref) => {\n    // Implementation\n  }\n);\n\n${c.component}.${slotName} = ${slotName};`,
          });

        case 'modify_slot':
          return ok({
            ...baseResponse,
            slotExists,
            instructions: [
              `To modify "${slotName}" in ${c.component}:`,
              `1. Locate the ${slotName} component definition`,
              `2. Current slot is at position: ${existingSlots.indexOf(slotName) + 1}`,
              `3. Modify props interface if needed`,
              `4. Update implementation`,
            ],
          });

        case 'reorder_slots':
          return ok({
            ...baseResponse,
            instructions: [
              `To reorder slots in ${c.component}:`,
              `1. Current order: ${existingSlots.join(' > ')}`,
              `2. Reorder exports in the compound assignment`,
              `3. Update structure documentation`,
            ],
          });

        case 'nest_slots':
          return ok({
            ...baseResponse,
            instructions: [
              `To nest "${slotName}" under "${parentSlot}":`,
              `1. Create context in parent: ${parentSlot}Context`,
              `2. Consume context in child: ${slotName}`,
              `3. Ensure proper type definitions`,
            ],
          });
      }
    },
  );
}
