import type { ZodTypeAny } from 'zod';

/**
 * Wrapper around McpServer.tool() that avoids TS2589
 * "Type instantiation is excessively deep" errors.
 *
 * The MCP SDK's server.tool() has recursive generic inference that chokes
 * on schemas with .enum(), .array(), .optional() + .describe() chains.
 * Using `any` bypasses the inference while keeping full runtime correctness.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerTool(server: any, name: string, description: string, schema: Record<string, ZodTypeAny>, handler: (params: any) => Promise<any>) {
  server.tool(name, description, schema, handler);
}
