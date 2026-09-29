import {applyEdits, modify, type ParseError, parse as parseJsonc} from 'jsonc-parser'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {parse as parseToml, stringify as stringifyToml} from 'smol-toml'

export type ToolId = 'claude' | 'codex' | 'cursor' | 'opencode' | 'vscode'

/** MCP server key written inside each tool's config JSON */
export const MCP_SERVER_KEY = 'vayu-ui'

/** npm package started via npx */
export const MCP_PACKAGE_NAME = 'vayu-ui-mcp'

export interface ToolDefinition {
  buildEntry: () => Record<string, unknown>
  configFileName: string
  id: ToolId
  name: string
  topLevelKey: string
}

export interface WriteResult {
  action: 'created' | 'dry-run' | 'skipped-exists' | 'updated'
  configPath: string
  toolId: ToolId
}

function defaultEntry(): Record<string, unknown> {
  return {
    args: ['-y', MCP_PACKAGE_NAME],
    command: 'npx',
  }
}

function opencodeEntry(): Record<string, unknown> {
  return {
    command: ['npx', '-y', MCP_PACKAGE_NAME],
    type: 'local',
  }
}

/** Build the JSON fragment that will be merged into a tool's config file */
export function buildMcpPreview(toolDef: ToolDefinition, serverKey: string = MCP_SERVER_KEY): Record<string, unknown> {
  return {
    [toolDef.topLevelKey]: {
      [serverKey]: toolDef.buildEntry(),
    },
  }
}

export const TOOL_DEFINITIONS: Record<ToolId, ToolDefinition> = {
  claude: {
    buildEntry: defaultEntry,
    configFileName: '.mcp.json',
    id: 'claude',
    name: 'Claude Code',
    topLevelKey: 'mcpServers',
  },
  codex: {
    buildEntry: defaultEntry,
    configFileName: '.codex/config.toml',
    id: 'codex',
    name: 'Codex',
    topLevelKey: 'mcp_servers',
  },
  cursor: {
    buildEntry: defaultEntry,
    configFileName: '.cursor/mcp.json',
    id: 'cursor',
    name: 'Cursor',
    topLevelKey: 'mcpServers',
  },
  opencode: {
    buildEntry: opencodeEntry,
    configFileName: 'opencode.json',
    id: 'opencode',
    name: 'OpenCode',
    topLevelKey: 'mcp',
  },
  vscode: {
    buildEntry: () => ({type: 'stdio', ...defaultEntry()}),
    configFileName: '.vscode/mcp.json',
    id: 'vscode',
    name: 'VS Code',
    topLevelKey: 'servers',
  },
}

export const ALL_TOOL_IDS: ToolId[] = ['claude', 'cursor', 'opencode', 'vscode', 'codex']

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

  let json: Record<string, unknown> = {}
  const original = existsSync(configPath) ? readFileSync(configPath, 'utf8') : toolDef.id === 'codex' ? '' : '{}'

  if (existsSync(configPath)) {
    try {
      if (toolDef.id === 'codex') json = parseToml(original)
      else {
        const errors: ParseError[] = []
        json = parseJsonc(original, errors, {allowTrailingComma: true})
        if (errors.length > 0) throw new Error('Invalid JSON')
      }

      if (!json || typeof json !== 'object' || Array.isArray(json)) throw new Error('Expected an object')
    } catch {
      throw new Error(`Failed to parse ${configPath}. Fix or remove the file and try again.`)
    }
  }

  if (!json[toolDef.topLevelKey]) {
    json[toolDef.topLevelKey] = {}
  }

  if (typeof json[toolDef.topLevelKey] !== 'object' || Array.isArray(json[toolDef.topLevelKey]))
    throw new Error(`Invalid ${toolDef.topLevelKey} in ${configPath}: expected an object.`)

  const servers = json[toolDef.topLevelKey] as Record<string, unknown>
  const existing = servers[MCP_SERVER_KEY]
  if (existing && !options.force) {
    return {action: 'skipped-exists', configPath, toolId: toolDef.id}
  }

  servers[MCP_SERVER_KEY] = serverEntry

  if (options.dryRun) {
    return {action: 'dry-run', configPath, toolId: toolDef.id}
  }

  const dir = dirname(configPath)
  if (!existsSync(dir)) {
    mkdirSync(dir, {recursive: true})
  }

  const output =
    toolDef.id === 'codex'
      ? existing
        ? stringifyToml(json)
        : `${original.trimEnd()}\n\n[mcp_servers."vayu-ui"]\ncommand = "npx"\nargs = ["-y", "${MCP_PACKAGE_NAME}"]\n`
      : applyEdits(
          original,
          modify(original, [toolDef.topLevelKey, MCP_SERVER_KEY], serverEntry, {
            formattingOptions: {insertSpaces: true, tabSize: 2},
          }),
        ) + '\n'
  writeFileSync(configPath, output, 'utf8')

  return {
    action: existing ? 'updated' : 'created',
    configPath,
    toolId: toolDef.id,
  }
}
