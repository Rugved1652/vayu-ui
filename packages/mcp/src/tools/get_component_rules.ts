// ============================================================================
// get_component_rules - Get when_to_use and anti_patterns for a component
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, err, resolveComponent } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "get_component_rules",
    "Get usage rules for a component: when to use it and anti-patterns to avoid.",
    {
      component: z.string().describe("Component name or slug"),
      includeAntiPatterns: z
        .boolean()
        .default(true)
        .describe("Include anti-patterns section"),
    },
    async ({ component, includeAntiPatterns }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      return ok({
        component: c.component,
        whenToUse: c.when_to_use ?? [],
        whenNotToUse: c.when_not_to_use ?? [],
        antiPatterns: includeAntiPatterns
          ? (c.anti_patterns ?? [])
          : undefined,
      });
    }
  );
}
