import { Command, Flags, ux } from '@oclif/core';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { detectProject, confirm, type ProjectInfo } from '../utils/project.js';
import { VAYU_TOKENS_CSS, TOKENS_START_MARKER, TOKENS_END_MARKER } from '../templates/tokens.js';

const CONFIG_FILE = 'vayu-ui.config.json';
const TOKENS_FILE = 'vayu-ui-tokens.css';
const UI_FOLDERS = ['components', 'hooks', 'utils'];

export default class Init extends Command {
  static summary = 'Initialize Vayu UI in your project';

  static description =
    'Sets up the Vayu UI folder structure, design tokens CSS, and Tailwind CSS v4.';

  static examples = [
    '<%= config.bin %> init',
    '<%= config.bin %> init --path src/lib/ui',
    '<%= config.bin %> init --merge',
  ];

  static flags = {
    path: Flags.string({
      description: 'Custom path for the ui/ folder (default: auto-detect)',
      required: false,
    }),
    'css-path': Flags.string({
      description: 'Custom path for the main CSS file',
      required: false,
    }),
    merge: Flags.boolean({
      description: 'Merge tokens into existing CSS instead of creating a separate file',
      default: false,
    }),
    'skip-tailwind': Flags.boolean({
      description: 'Skip Tailwind CSS installation check',
      default: false,
    }),
    force: Flags.boolean({
      description: 'Skip all prompts and use defaults',
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Init);
    const project = detectProject(process.cwd());

    this.log('');
    this.log(ux.colorize('bold', '  Vayu UI Init'));
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────────'));
    this.log('');

    // Check for existing config
    if (existsSync(join(project.root, CONFIG_FILE))) {
      this.log(ux.colorize('yellow', '  Found existing vayu-ui.config.json'));
      if (!flags.force) {
        const overwrite = await confirm('  Overwrite configuration?');
        if (!overwrite) {
          this.log(ux.colorize('dim', '  Keeping existing config. Aborting.'));
          return;
        }
      }
    }

    // Resolve paths
    const uiDir = flags.path ?? project.uiDir;
    const cssFile = this.resolveCssFile(project, flags['css-path']);

    this.printDetected(project, uiDir, cssFile);
    this.log('');

    // 1. Tailwind check
    if (!flags['skip-tailwind']) {
      await this.handleTailwind(project, flags.force);
    }

    // 2. Create folder structure
    this.createFolderStructure(project.root, uiDir);

    // 3. Handle CSS tokens
    const tokensRelPath = this.handleCssTokens(project.root, cssFile, flags.merge);

    // 4. Write config
    this.writeConfig(project.root, { uiDir, cssFile, tokensFile: tokensRelPath });

    this.log('');
    this.log(ux.colorize('green', '  Done! Vayu UI is ready.'));
    this.log('');
    this.log(ux.colorize('dim', '  Next steps:'));
    this.log(ux.colorize('dim', `    ${ux.colorize('bold', 'npx vayu-ui-cli list')}       Browse available components and hooks`));
    this.log(ux.colorize('dim', `    ${ux.colorize('bold', 'npx vayu-ui-cli add button')}  Add your first component`));
    this.log('');
  }

  private printDetected(project: ProjectInfo, uiDir: string, cssFile: string | null): void {
    const dim = (s: string) => ux.colorize('dim', s);
    const bold = (s: string) => ux.colorize('bold', s);

    this.log(`  ${dim('Framework:')}       ${bold(project.framework)}`);
    this.log(`  ${dim('Package manager:')}  ${bold(project.packageManager)}`);
    this.log(`  ${dim('Tailwind CSS:')}     ${project.hasTailwind ? ux.colorize('green', 'installed') : ux.colorize('yellow', 'not found')}`);
    this.log(`  ${dim('UI folder:')}        ${bold(uiDir)}/`);
    this.log(`  ${dim('CSS file:')}         ${cssFile ? bold(cssFile) : ux.colorize('yellow', 'not found — will create')}`);
  }

  private async handleTailwind(project: ProjectInfo, force: boolean): Promise<void> {
    if (project.hasTailwind) {
      this.log(ux.colorize('dim', '  Tailwind CSS already installed.'));
      return;
    }

    this.log(ux.colorize('yellow', '  Tailwind CSS v4 is not installed.'));
    const shouldInstall = force || await confirm('  Install tailwindcss and @tailwindcss/postcss?');
    if (!shouldInstall) {
      this.log(ux.colorize('dim', '  Skipping Tailwind installation. You can install it manually later.'));
      return;
    }

    const cmd = `${project.packageManager} ${project.packageManager === 'npm' ? 'install' : 'add'
      }${project.packageManager === 'npm' || project.packageManager === 'pnpm' ? ' -D' : ''} tailwindcss @tailwindcss/postcss postcss`;

    this.log(ux.colorize('dim', `  Running: ${cmd}`));
    try {
      execSync(cmd, { cwd: project.root, stdio: 'pipe' });
      this.log(ux.colorize('green', '  Tailwind CSS installed.'));
    } catch (err: any) {
      this.error(`Failed to install Tailwind: ${err.message}`);
    }

    // Create postcss.config.mjs if missing
    const postcssPath = join(project.root, 'postcss.config.mjs');
    if (!existsSync(postcssPath)) {
      writeFileSync(postcssPath, 'export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};\n');
      this.log(ux.colorize('dim', '  Created postcss.config.mjs'));
    }
  }

  private createFolderStructure(root: string, uiDir: string): void {
    const absUiDir = join(root, uiDir);
    for (const sub of UI_FOLDERS) {
      const dir = join(absUiDir, sub);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, '.gitkeep'), '');
      }
    }
    this.log(ux.colorize('green', `  Created ${uiDir}/ with components/, hooks/, utils/`));
  }

  private resolveCssFile(project: ProjectInfo, cssPathFlag?: string): string | null {
    if (cssPathFlag) return cssPathFlag;
    if (project.cssFile) return project.cssFile;

    switch (project.framework) {
      case 'next-app':
        return project.hasSrc ? 'src/app/globals.css' : 'app/globals.css';
      case 'next-pages':
        return project.hasSrc ? 'src/styles/globals.css' : 'styles/globals.css';
      case 'vite':
      case 'cra':
      case 'unknown':
      default:
        return project.hasSrc ? 'src/index.css' : 'index.css';
    }
  }

  private handleCssTokens(root: string, cssFile: string | null, merge: boolean): string {
    const tokensContent = `${TOKENS_START_MARKER}\n${VAYU_TOKENS_CSS}\n${TOKENS_END_MARKER}`;

    if (merge && cssFile) {
      // Merge into existing CSS file
      const absPath = join(root, cssFile);
      mkdirSync(dirname(absPath), { recursive: true });
      const existing = existsSync(absPath) ? readFileSync(absPath, 'utf-8') : '';

      if (existing.includes(TOKENS_START_MARKER)) {
        // Replace existing Vayu UI block
        const start = existing.indexOf(TOKENS_START_MARKER);
        const end = existing.indexOf(TOKENS_END_MARKER) + TOKENS_END_MARKER.length;
        const updated = existing.substring(0, start) + tokensContent + existing.substring(end);
        writeFileSync(absPath, updated);
        this.log(ux.colorize('green', `  Updated tokens in ${cssFile}`));
      } else {
        // Append to existing file
        const importLine = existing.includes("@import 'tailwindcss'") ? '' : "@import 'tailwindcss';\n";
        writeFileSync(absPath, `${importLine}${existing}\n\n${tokensContent}\n`);
        this.log(ux.colorize('green', `  Appended tokens to ${cssFile}`));
      }
      return cssFile;
    }

    // Create separate tokens file
    const cssDir = cssFile ? dirname(join(root, cssFile)) : root;
    mkdirSync(cssDir, { recursive: true });
    const tokensPath = join(cssDir, TOKENS_FILE);
    const tokensRelPath = relative(root, tokensPath);

    writeFileSync(tokensPath, `@import 'tailwindcss';\n\n${tokensContent}\n`);
    this.log(ux.colorize('green', `  Created ${tokensRelPath}`));

    // Add @import to main CSS file
    if (cssFile && !merge) {
      const absPath = join(root, cssFile);
      mkdirSync(dirname(absPath), { recursive: true });
      if (!existsSync(absPath)) {
        writeFileSync(absPath, '');
        this.log(ux.colorize('green', `  Created ${cssFile}`));
      }

      if (existsSync(absPath)) {
        const existing = readFileSync(absPath, 'utf-8');
        const importLine = `@import './${TOKENS_FILE}';`;
        if (!existing.includes(importLine)) {
          writeFileSync(absPath, `${importLine}\n${existing}`);
          this.log(ux.colorize('green', `  Added @import to ${cssFile}`));
        }
      }
    }

    return tokensRelPath;
  }

  private writeConfig(root: string, paths: { uiDir: string; cssFile: string | null; tokensFile: string }): void {
    const config = {
      $schema: 'https://vayu.design/schema/config.json',
      version: 1,
      uiPath: paths.uiDir,
      cssFile: paths.cssFile,
      tokensFile: paths.tokensFile,
    };
    writeFileSync(join(root, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n');
    this.log(ux.colorize('green', `  Created ${CONFIG_FILE}`));
  }
}
