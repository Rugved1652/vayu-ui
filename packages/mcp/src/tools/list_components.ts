// ============================================================================
// list_components - List all available components with optional filtering
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, filterPublic } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "list_components",
    "List all available VedUI components. Optionally filter by category.",
    {
      category: z
        .enum([
          "action",
          "input",
          "layout",
          "overlay",
          "display",
          "navigation",
          "feedback",
          "utility",
          "animation",
        ])
        .optional()
        .describe("Filter by component category"),
    },
    async ({ category }) => {
      let items = filterPublic(Object.values(registry));

      if (category) {
        items = items.filter((c) => c.category === category);
      }

      return ok(
        items.map((c) => ({
          component: c.component,
          slug: c.slug,
          category: c.category,
          description: c.description,
          intent: c.intent,
        }))
      );
    }
  );
}
