// ============================================================================
// get_component_examples - Get code examples for a component
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, err, resolveComponent } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "get_component_examples",
    "Get code examples for a component. Returns all examples or a specific one.",
    {
      component: z.string().describe("Component name or slug"),
      example: z
        .string()
        .optional()
        .describe("Specific example name (omit to list available)"),
    },
    async ({ component, example }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      if (!c.examples || c.examples.length === 0) {
        return ok({ _note: `No examples documented for ${c.component}` });
      }

      // If no specific example requested, list available
      if (!example) {
        return ok({
          component: c.component,
          availableExamples: c.examples.map((ex) => ({
            name: ex.name,
            description: ex.description ?? "No description",
          })),
        });
      }

      // Return specific example
      const ex = c.examples.find((e) => e.name.toLowerCase() === example.toLowerCase());
      if (!ex) {
        return err(
          `Example "${example}" not found. Available: ${c.examples.map((e) => e.name).join(", ")}`
        );
      }

      return ok({
        component: c.component,
        example: ex.name,
        description: ex.description,
        code: ex.code,
      });
    }
  );
}
