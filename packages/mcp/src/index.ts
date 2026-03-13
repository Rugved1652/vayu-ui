// ============================================================================
// VedUI MCP Server — Bootstrap
// 16 tools for AI-native UI development
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registry } from "vayu-ui-registry";
import { registerAllTools } from "./tools/index.js";

const server = new McpServer({
  name: "vedui-mcp",
  version: "2.0.0",
});

registerAllTools(server, registry as any);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("VedUI MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
