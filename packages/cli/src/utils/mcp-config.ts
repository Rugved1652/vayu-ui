import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

export type ToolId = 'claude' | 'cursor' | 'opencode'

/** MCP server key written inside each tool's config JSON */
export const MCP_SERVER_KEY = 'vayu-ui'

/** npm package started via npx */
export const MCP_PACKAGE_NAME = 'vayu-ui-mcp'

export interface ToolDefinition {
  id: ToolId
  name: string
  configFileName: string
  topLevelKey: string
  buildEntry: () => Record<string, unknown>
}

export interface WriteResult {
  toolId: ToolId
  configPath: string
  action: 'created' | 'updated' | 'skipped-exists' | 'dry-run'
}

function defaultEntry(): Record<string, unknown> {
  return {
    command: 'npx',
    args: ['-y', MCP_PACKAGE_NAME],
  }
}

function opencodeEntry(): Record<string, unknown> {
  return {
    type: 'local',
    command: ['npx', '-y', MCP_PACKAGE_NAME],
  }
}

/** Build the JSON fragment that will be merged into a tool's config file */
export function buildMcpPreview(
  toolDef: ToolDefinition,
  serverKey: string = MCP_SERVER_KEY,
): Record<string, unknown> {
  return {
    [toolDef.topLevelKey]: {
      [serverKey]: toolDef.buildEntry(),
    },
  }
}

export const TOOL_DEFINITIONS: Record<ToolId, ToolDefinition> = {
  claude: {
    id: 'claude',
    name: 'Claude Code',
    configFileName: '.mcp.json',
    topLevelKey: 'mcpServers',
    buildEntry: defaultEntry,
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    configFileName: '.cursor/mcp.json',
    topLevelKey: 'mcpServers',
    buildEntry: defaultEntry,
  },
  opencode: {
    id: 'opencode',
    name: 'OpenCode',
    configFileName: 'opencode.json',
    topLevelKey: 'mcp',
    buildEntry: opencodeEntry,
  },
}

export const ALL_TOOL_IDS: ToolId[] = ['claude', 'cursor', 'opencode']

export function getConfigPath(toolId: ToolId, targetDir: string): string {
  const def = TOOL_DEFINITIONS[toolId]
  return join(targetDir, def.configFileName)
}

export function writeMcpConfig(
  toolDef: ToolDefinition,
  targetDir: string,
  options: {dryRun: boolean; force: boolean},
): WriteResult {
  const configPath = join(targetDir, toolDef.configFileName)
  const serverEntry = toolDef.buildEntry()

  let json: Record<string, any> = {}

  if (existsSync(configPath)) {
    try {
      json = JSON.parse(readFileSync(configPath, 'utf-8'))
    } catch {
      throw new Error(`Failed to parse ${configPath}. Fix or remove the file and try again.`)
    }
  }

  if (!json[toolDef.topLevelKey]) {
    json[toolDef.topLevelKey] = {}
  }

  const existing = json[toolDef.topLevelKey]['vayu-ui']
  if (existing && !options.force) {
    return {toolId: toolDef.id, configPath, action: 'skipped-exists'}
  }

  json[toolDef.topLevelKey]['vayu-ui'] = serverEntry

  if (options.dryRun) {
    return {toolId: toolDef.id, configPath, action: 'dry-run'}
  }

  const dir = dirname(configPath)
  if (!existsSync(dir)) {
    mkdirSync(dir, {recursive: true})
  }

  writeFileSync(configPath, JSON.stringify(json, null, 2) + '\n', 'utf-8')

  return {
    toolId: toolDef.id,
    configPath,
    action: existing ? 'updated' : 'created',
  }
}
