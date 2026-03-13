// ============================================================================
// fix_ui_code - Get fix suggestions for UI code issues
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { Registry } from "vayu-ui-registry";
import { ok, err, resolveComponent } from "../utils.js";

export function register(server: McpServer, registry: Registry) {
  server.tool(
    "fix_ui_code",
    "Get fix suggestions for UI code issues based on component specifications.",
    {
      component: z.string().describe("Component name or slug"),
      code: z.string().describe("Code snippet with issues to fix"),
      issues: z
        .array(z.string())
        .optional()
        .describe("Specific issues to fix (omit for auto-detection)"),
    },
    async ({ component, code, issues }) => {
      const result = resolveComponent(registry, component);
      if (!result.success) return err(result.error);

      const c = result.component;

      // Collect all props from all groups
      const propsMap: Record<string, { type: string; required?: boolean; default?: unknown }> = {};
      const requiredProps: string[] = [];
      Object.entries(c.props ?? {}).forEach(([group, props]) => {
        props.forEach((p) => {
          propsMap[p.name] = { type: p.type, required: p.required, default: p.default };
          if (p.required) {
            requiredProps.push(p.name);
          }
        });
      });

      // Detect issues if not provided
      const detectedIssues = issues ? [...issues] : [];

      // Auto-detect common issues
      requiredProps.forEach((prop) => {
        if (!code.includes(prop)) {
          detectedIssues.push(`Missing required prop: ${prop}`);
        }
      });

      // Generate fixes
      const fixes: Array<{
        issue: string;
        suggestion: string;
        codeChange?: string;
      }> = [];

      detectedIssues.forEach((issue) => {
        if (issue.includes("Missing required prop")) {
          const propName = issue.split(": ")[1];
          const propDef = propsMap[propName];
          fixes.push({
            issue,
            suggestion: `Add the required "${propName}" prop`,
            codeChange: `${propName}={${propDef?.default !== undefined ? `"${propDef.default}"` : `"value"`}}`,
          });
        }
      });

      // Check composition
      if (c.composition?.slots) {
        c.composition.slots.forEach((slot) => {
          if (!code.includes(slot)) {
            fixes.push({
              issue: `Missing compound slot: ${slot}`,
              suggestion: `Add the ${slot} component to the composition`,
              codeChange: `<${c.component}.${slot}>...</${c.component}.${slot}>`,
            });
          }
        });
      }

      // Build fixed code suggestion
      let fixedCode = code;
      fixes.forEach((fix) => {
        if (fix.codeChange && !fixedCode.includes(fix.codeChange)) {
          // Simple insertion - add props to the component tag
          fixedCode = fixedCode.replace(
            new RegExp(`<${c.component}([^>]*)>`, "g"),
            `<${c.component}$1 ${fix.codeChange}>`
          );
        }
      });

      return ok({
        component: c.component,
        originalCode: code,
        detectedIssues,
        fixes,
        fixedCode: fixes.length > 0 ? fixedCode : undefined,
        componentReference: {
          validProps: Object.keys(propsMap),
          requiredProps,
          composition: c.composition,
          examples: c.examples,
        },
      });
    }
  );
}
