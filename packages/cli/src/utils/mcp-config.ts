import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type ToolId = 'claude' | 'cursor' | 'vscode' | 'windsurf' | 'antigravity';

export interface ToolDefinition {
  id: ToolId;
  name: string;
  configFileName: string;
  globalConfigFileName?: string;
  topLevelKey: string;
}

export interface WriteResult {
  toolId: ToolId;
  configPath: string;
  action: 'created' | 'updated' | 'skipped-exists' | 'dry-run';
}

export const TOOL_DEFINITIONS: Record<ToolId, ToolDefinition> = {
  claude: {
    id: 'claude',
    name: 'Claude Code',
    configFileName: '.mcp.json',
    globalConfigFileName: '.claude.json',
    topLevelKey: 'mcpServers',
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    configFileName: '.cursor/mcp.json',
    topLevelKey: 'mcpServers',
  },
  vscode: {
    id: 'vscode',
    name: 'VS Code Copilot',
    configFileName: '.vscode/mcp.json',
    topLevelKey: 'servers',
  },
  windsurf: {
    id: 'windsurf',
    name: 'Windsurf',
    configFileName: '.windsurf/mcp.json',
    topLevelKey: 'mcpServers',
  },
  antigravity: {
    id: 'antigravity',
    name: 'Antigravity',
    configFileName: 'antigravity.config.json',
    topLevelKey: 'mcpServers',
  },
};

export const ALL_TOOL_IDS: ToolId[] = ['claude', 'cursor', 'vscode', 'windsurf', 'antigravity'];

export function buildServerEntry(toolId: ToolId): Record<string, unknown> {
  const base = {
    command: 'npx',
    args: ['-y', 'vayu-ui-mcp'],
  };
  if (toolId === 'vscode') {
    return { type: 'stdio', ...base };
  }
  if (toolId === 'antigravity') {
    return { ...base, transport: 'stdio' };
  }
  return base;
}

export function getConfigPath(toolId: ToolId, targetDir: string, isGlobal = false): string {
  const def = TOOL_DEFINITIONS[toolId];
  const fileName = isGlobal && def.globalConfigFileName ? def.globalConfigFileName : def.configFileName;
  return join(targetDir, fileName);
}

export function writeMcpConfig(
  toolDef: ToolDefinition,
  targetDir: string,
  options: { dryRun: boolean; force: boolean; isGlobal?: boolean },
): WriteResult {
  const fileName = options.isGlobal && toolDef.globalConfigFileName ? toolDef.globalConfigFileName : toolDef.configFileName;
  const configPath = join(targetDir, fileName);
  const serverEntry = buildServerEntry(toolDef.id);

  let json: Record<string, any> = {};

  if (existsSync(configPath)) {
    try {
      json = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch {
      throw new Error(
        `Failed to parse ${configPath}. Fix or remove the file and try again.`,
      );
    }
  }

  if (!json[toolDef.topLevelKey]) {
    json[toolDef.topLevelKey] = {};
  }

  const existing = json[toolDef.topLevelKey]['vayu-ui'];
  if (existing && !options.force) {
    return { toolId: toolDef.id, configPath, action: 'skipped-exists' };
  }

  json[toolDef.topLevelKey]['vayu-ui'] = serverEntry;

  if (options.dryRun) {
    return { toolId: toolDef.id, configPath, action: 'dry-run' };
  }

  const dir = dirname(configPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(configPath, JSON.stringify(json, null, 2) + '\n', 'utf-8');

  return {
    toolId: toolDef.id,
    configPath,
    action: existing ? 'updated' : 'created',
  };
}
