// ============================================================================
// validate_ui_code - Validate UI code against component specifications
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, err, resolveComponent } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "validate_ui_code",
    "Validate UI code against component specifications and best practices.",
    {
      component: z.string().describe("Component name or slug"),
      code: z.string().describe("Code snippet to validate"),
      strictMode: z
        .boolean()
        .default(false)
        .describe("Enable strict validation"),
    },
    async ({ component, code, strictMode }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;
      const validationRules = c.validation_rules ?? [];

      // Collect all props from all groups
      const allProps: string[] = [];
      const requiredProps: string[] = [];
      Object.entries(c.props ?? {}).forEach(([group, props]) => {
        props.forEach((p) => {
          allProps.push(p.name);
          if (p.required) {
            requiredProps.push(p.name);
          }
        });
      });

      // Basic validation checks
      const issues: Array<{ type: "error" | "warning" | "info"; message: string }> =
        [];

      // Check for required props
      requiredProps.forEach((prop) => {
        if (!code.includes(prop)) {
          issues.push({
            type: "error",
            message: `Missing required prop: ${prop}`,
          });
        }
      });

      // Check for invalid props (simple regex-based)
      const propPattern = /(\w+)=/g;
      let match;
      while ((match = propPattern.exec(code)) !== null) {
        const propName = match[1];
        if (
          !allProps.includes(propName) &&
          !propName.startsWith("on") &&
          !propName.startsWith("aria-") &&
          !propName.startsWith("data-") &&
          !["className", "style", "id", "key", "ref", "children"].includes(propName)
        ) {
          issues.push({
            type: strictMode ? "error" : "warning",
            message: `Unknown prop: ${propName}`,
          });
        }
      }

      // Check composition structure
      if (c.composition?.slots) {
        c.composition.slots.forEach((slot) => {
          if (!code.includes(slot)) {
            issues.push({
              type: "warning",
              message: `Missing compound slot: ${slot}`,
            });
          }
        });
      }

      // Check against validation rules
      validationRules.forEach((rule) => {
        issues.push({
          type: "info",
          message: `Rule reminder: ${rule}`,
        });
      });

      const hasErrors = issues.some((i) => i.type === "error");

      return ok({
        component: c.component,
        valid: !hasErrors,
        strictMode,
        issues,
        summary: {
          errors: issues.filter((i) => i.type === "error").length,
          warnings: issues.filter((i) => i.type === "warning").length,
          info: issues.filter((i) => i.type === "info").length,
        },
        componentSpec: {
          validProps: allProps,
          requiredProps,
          validationRules,
        },
      });
    }
  );
}
