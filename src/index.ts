import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  getUserBrowser,
  openApplication,
  openApplicationSchema,
} from "./tools";

const server = new McpServer({
  name: "villion-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool("openApplication", openApplicationSchema, openApplication);
server.tool("getUserDefaultBrowser", getUserBrowser);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
