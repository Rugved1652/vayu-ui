// ============================================================================
// get_component_spec - Get props, variants, and slots for a component
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, err, resolveComponent } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "get_component_spec",
    "Get the complete specification for a component including props, variants, and slots.",
    {
      component: z
        .string()
        .describe("Component name or slug (e.g., 'Button', 'accordion')"),
    },
    async ({ component }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      // Build props spec - flatten the array structure
      const propsSpec = c.props ?? {};

      // Build variants spec
      const variantsSpec = c.variants?.length ? c.variants : null;

      // Build slots from composition
      const slotsSpec = c.composition?.slots ?? null;

      // Get default props from all prop groups
      const defaultProps: Record<string, unknown> = {};
      Object.entries(propsSpec).forEach(([group, props]) => {
        props.forEach((p) => {
          if (p.default !== undefined) {
            defaultProps[p.name] = p.default;
          }
        });
      });

      return ok({
        component: c.component,
        slug: c.slug,
        category: c.category,
        props: Object.keys(propsSpec).length > 0 ? propsSpec : { _note: "No props documented" },
        variants: variantsSpec ?? { _note: "No variants documented" },
        slots: slotsSpec ?? { _note: "This component does not use slots" },
        defaultProps,
      });
    }
  );
}
