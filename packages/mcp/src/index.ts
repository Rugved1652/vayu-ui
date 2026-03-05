// ============================================================================
// Vayu UI MCP Server — Bootstrap
// Tool logic lives in ./tools/handlers.ts
// ============================================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registry } from "vayu-ui-registry";
import { registerTools } from "./tools/handlers.js";

const server = new McpServer({
    name: "vayu-ui",
    version: "1.0.0",
});

registerTools(server, registry as any);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Vayu UI MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
