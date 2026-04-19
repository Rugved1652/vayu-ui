import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerListComponents } from './tools/list-components.js';
import { registerFindComponent } from './tools/find-component.js';
import { registerGetComponentSummary } from './tools/get-component-summary.js';
import { registerGetComponentProps } from './tools/get-component-props.js';
import { registerGetComponentVariants } from './tools/get-component-variants.js';
import { registerGetComponentStates } from './tools/get-component-states.js';
import { registerGetComponentEvents } from './tools/get-component-events.js';
import { registerGetComponentA11y } from './tools/get-component-a11y.js';
import { registerGetComponentDoNot } from './tools/get-component-do-not.js';
import { registerGetComponentDependencies } from './tools/get-component-dependencies.js';
import { registerGetComponentPeerComponents } from './tools/get-component-peer-components.js';
import { registerGetComponentComposition } from './tools/get-component-composition.js';
import { registerGetComponentExample } from './tools/get-component-example.js';
import { registerScaffoldComponentUsage } from './tools/scaffold-component-usage.js';
import { registerGetHookDetails } from './tools/get-hook-details.js';
import { registerGetDesignTokens } from './tools/get-design-tokens.js';
import { registerGetInstallGuide } from './tools/get-install-guide.js';

const server = new McpServer({
  name: 'vayu-ui-mcp',
  version: '1.0.0',
});

// Register all tools
registerListComponents(server);
registerFindComponent(server);
registerGetComponentSummary(server);
registerGetComponentProps(server);
registerGetComponentVariants(server);
registerGetComponentStates(server);
registerGetComponentEvents(server);
registerGetComponentA11y(server);
registerGetComponentDoNot(server);
registerGetComponentDependencies(server);
registerGetComponentPeerComponents(server);
registerGetComponentComposition(server);
registerGetComponentExample(server);
registerScaffoldComponentUsage(server);
registerGetHookDetails(server);
registerGetDesignTokens(server);
registerGetInstallGuide(server);

// Start server
const transport = new StdioServerTransport();
server.connect(transport);
