// ============================================================================
// apply_responsive_layout - Guidance for responsive implementation
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, err, resolveComponent } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "apply_responsive_layout",
    "Get guidance for making a component responsive.",
    {
      component: z.string().describe("Component name or slug"),
      breakpoints: z
        .array(z.string())
        .optional()
        .describe("Target breakpoints (e.g., ['sm', 'md', 'lg'])"),
      strategy: z
        .enum(["mobile-first", "desktop-first", "container-query"])
        .default("mobile-first")
        .describe("Responsive strategy"),
    },
    async ({ component, breakpoints, strategy }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;
      const responsiveConfig = c.responsive ?? { allowed: false, patterns: [] };
      const targetBreakpoints = breakpoints ?? ["sm", "md", "lg", "xl"];

      return ok({
        component: c.component,
        responsiveSupport: {
          isResponsive: responsiveConfig.allowed,
          existingPatterns: responsiveConfig.patterns,
          strategy,
          targetBreakpoints,
        },
        instructions: [
          `To apply responsive layout to ${c.component}:`,
          `1. Strategy: ${strategy}`,
          `2. Add responsive prop variants if not present`,
          `3. Use Tailwind responsive prefixes: ${targetBreakpoints.map((b) => `${b}:`).join(", ")}`,
          ...(strategy === "container-query"
            ? [`4. For container queries, wrap in a container with @container class`]
            : []),
          `5. Test at all target breakpoints`,
          ...(responsiveConfig.allowed
            ? [
                `6. Component already supports responsiveness via: ${responsiveConfig.patterns?.join(", ")}`,
              ]
            : []),
        ],
        codeHint: `// In ${c.source?.file ?? "component.tsx"}\n// Using ${strategy}\nconst responsiveStyles = clsx(\n  baseStyles,\n  ${targetBreakpoints.map((b) => `"${b}:breakpoint-styles"`).join(",\n  ")}\n);\n\n// Props pattern\ninterface ${c.component}Props {\n  size?: 'sm' | 'md' | 'lg';\n  // Or responsive object\n  size?: { base: 'sm'; md: 'md'; lg: 'lg' };\n}`,
      });
    }
  );
}
