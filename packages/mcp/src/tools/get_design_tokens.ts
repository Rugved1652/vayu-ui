// ============================================================================
// get_design_tokens - Get design tokens for a component
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, err, resolveComponent } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "get_design_tokens",
    "Get design tokens (colors, spacing, typography, etc.) for a component.",
    {
      component: z.string().describe("Component name or slug"),
      tokenType: z
        .enum(["all", "colors", "spacing", "typography", "border", "radius"])
        .default("all")
        .describe("Filter by token type"),
    },
    async ({ component, tokenType }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      if (!c.design_tokens) {
        return ok({
          _note: `No design tokens documented for ${c.component}`,
          _suggestion: "This component may use default theme tokens",
        });
      }

      if (tokenType === "all") {
        return ok({
          component: c.component,
          designTokens: c.design_tokens,
        });
      }

      const filteredTokens = c.design_tokens[tokenType as keyof typeof c.design_tokens];
      return ok({
        component: c.component,
        tokenType,
        tokens: filteredTokens ?? { _note: `No ${tokenType} tokens documented` },
      });
    }
  );
}
