import { Command, Flags, ux } from '@oclif/core';
import { homedir } from 'node:os';
import {
  TOOL_DEFINITIONS,
  ALL_TOOL_IDS,
  writeMcpConfig,
  getConfigPath,
  type ToolId,
} from '../utils/mcp-config.js';
import { confirm, findProjectRoot } from '../utils/project.js';

export default class InstallMcp extends Command {
  static summary = 'Configure the Vayu UI MCP server for AI coding tools';

  static description =
    'Configures the Vayu UI MCP server (17 tools for component discovery, props, variants, scaffolding, etc.) for your AI coding tools. No local installation needed — the server runs via npx.';

  static examples = [
    '<%= config.bin %> install-mcp',
    '<%= config.bin %> install-mcp --tool claude',
    '<%= config.bin %> install-mcp --tool claude,cursor',
    '<%= config.bin %> install-mcp --global',
    '<%= config.bin %> install-mcp --dry-run',
    '<%= config.bin %> install-mcp --tool claude --force',
  ];

  static flags = {
    tool: Flags.string({
      description: 'Comma-separated AI tools: claude, cursor, vscode, windsurf',
    }),
    global: Flags.boolean({
      description: 'Configure globally (home directory) instead of project-level',
      default: false,
    }),
    'dry-run': Flags.boolean({
      description: 'Preview changes without writing files',
      default: false,
    }),
    force: Flags.boolean({
      description: 'Skip prompts and overwrite existing config entries',
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(InstallMcp);
    const targetDir = flags.global ? homedir() : findProjectRoot(process.cwd());

    // Resolve which tools to configure
    const toolIds = await this.resolveToolIds(flags);
    if (toolIds.length === 0) {
      this.log(ux.colorize('dim', '  No tools selected. Nothing to do.'));
      return;
    }

    // Header
    this.log('');
    this.log(ux.colorize('bold', '  Vayu UI MCP Setup'));
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────────'));
    this.log('');

    // Print plan
    this.printPlan(toolIds, targetDir, flags.global);
    this.log('');

    this.log(ux.colorize('dim', '  The following entry will be added:'));
    this.log('');
    this.log(ux.colorize('dim', '    "vayu-ui": {'));
    this.log(ux.colorize('dim', '      "command": "npx",'));
    this.log(ux.colorize('dim', '      "args": ["-y", "vayu-ui-mcp"]'));
    this.log(ux.colorize('dim', '    }'));
    this.log('');

    // Confirm
    if (!flags.force && !flags['dry-run']) {
      const ok = await confirm('  Apply changes?');
      if (!ok) {
        this.log(ux.colorize('dim', '  Aborted.'));
        return;
      }
    }

    // Dry-run early exit
    if (flags['dry-run']) {
      for (const toolId of toolIds) {
        const toolDef = TOOL_DEFINITIONS[toolId];
        const result = writeMcpConfig(toolDef, targetDir, {
          dryRun: true,
          force: flags.force,
        });
        if (result.action === 'dry-run') {
          this.log(`    ${ux.colorize('cyan', 'would write')} ${toolDef.configFileName}`);
        } else if (result.action === 'skipped-exists') {
          this.log(
            `    ${ux.colorize('yellow', 'already configured')} ${toolDef.configFileName}`,
          );
        }
      }
      this.log('');
      this.log(ux.colorize('dim', '  Dry run — no files were written.'));
      this.log('');
      return;
    }

    // Write configs
    const results = [];
    for (const toolId of toolIds) {
      const toolDef = TOOL_DEFINITIONS[toolId];
      const result = writeMcpConfig(toolDef, targetDir, {
        dryRun: false,
        force: flags.force,
      });
      results.push(result);
    }

    // Summary
    this.log('');
    this.log(
      ux.colorize(
        'green',
        `  Done! Configured ${results.length} tool${results.length > 1 ? 's' : ''}:`,
      ),
    );
    this.log('');

    for (const result of results) {
      const toolDef = TOOL_DEFINITIONS[result.toolId];
      const relPath = toolDef.configFileName;
      if (result.action === 'created') {
        this.log(`    ${ux.colorize('green', 'created')}  ${toolDef.name.padEnd(16)} ${relPath}`);
      } else if (result.action === 'updated') {
        this.log(`    ${ux.colorize('green', 'updated')}  ${toolDef.name.padEnd(16)} ${relPath}`);
      } else if (result.action === 'skipped-exists') {
        this.log(
          `    ${ux.colorize('yellow', 'exists')}    ${toolDef.name.padEnd(16)} ${relPath} ${ux.colorize('dim', '(use --force to overwrite)')}`,
        );
      }
    }

    this.log('');
    this.log(
      ux.colorize(
        'dim',
        '  Restart your AI tool to load the Vayu UI MCP server (17 tools available).',
      ),
    );
    this.log('');
  }

  private async resolveToolIds(flags: {
    tool?: string;
    force: boolean;
  }): Promise<ToolId[]> {
    if (flags.tool) {
      const ids = flags.tool.split(',').map((s) => s.trim().toLowerCase() as ToolId);
      for (const id of ids) {
        if (!ALL_TOOL_IDS.includes(id)) {
          this.error(
            `Unknown tool "${id}". Valid options: ${ALL_TOOL_IDS.join(', ')}`,
          );
        }
      }
      return ids;
    }

    if (flags.force) {
      return [...ALL_TOOL_IDS];
    }

    // Interactive selection
    const selected: ToolId[] = [];
    this.log(ux.colorize('bold', '  Configure Vayu UI MCP for:'));
    this.log('');
    for (const id of ALL_TOOL_IDS) {
      const def = TOOL_DEFINITIONS[id];
      const ok = await confirm(`    ${def.name}?`);
      if (ok) selected.push(id);
    }
    return selected;
  }

  private printPlan(toolIds: ToolId[], targetDir: string, isGlobal: boolean): void {
    const scope = isGlobal ? 'global' : 'project';
    this.log(`  Configuring for (${scope}):`);
    this.log('');
    for (const id of toolIds) {
      const def = TOOL_DEFINITIONS[id];
      const configPath = getConfigPath(id, targetDir);
      this.log(`    ${def.name.padEnd(16)} ${configPath}`);
    }
  }
}
