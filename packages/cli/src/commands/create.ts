import { Args, Command, Flags, ux } from '@oclif/core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { runInit } from '../utils/init-runner.js';
import { confirm, prompt } from '../utils/project.js';

type Framework = 'next' | 'vite';

interface CreateOptions {
  appRouter: boolean;
  eslint: boolean;
  framework: Framework;
  packageManager: string;
  skipInit: boolean;
  skipInstall: boolean;
  srcDir: boolean;
  tailwind: boolean;
  typescript: boolean;
}

export default class Create extends Command {
  static args = {
    name: Args.string({
      description: 'Project name (used as directory name)',
      required: true,
    }),
  };
static description =
    'Scaffolds a new React project (Next.js or Vite) and initializes Vayu UI.';
static examples = [
    '<%= config.bin %> create my-app',
    '<%= config.bin %> create my-app --framework next',
    '<%= config.bin %> create my-app --framework vite',
    '<%= config.bin %> create my-app --force',
  ];
static flags = {
    'app-router': Flags.boolean({
      default: true,
      description: 'Use App Router (Next.js only)',
      required: false,
    }),
    eslint: Flags.boolean({
      default: true,
      description: 'Include ESLint',
      required: false,
    }),
    force: Flags.boolean({
      default: false,
      description: 'Skip all prompts, use defaults',
      required: false,
    }),
    framework: Flags.option({
      description: 'Framework to scaffold',
      options: ['next', 'vite'] as const,
      required: false,
    })(),
    'package-manager': Flags.option({
      description: 'Package manager to use',
      options: ['npm', 'pnpm', 'yarn', 'bun'] as const,
      required: false,
    })(),
    'skip-init': Flags.boolean({
      default: false,
      description: 'Skip Vayu UI initialization after scaffolding',
      required: false,
    }),
    'skip-install': Flags.boolean({
      default: false,
      description: 'Skip npm install during scaffolding',
      required: false,
    }),
    'src-dir': Flags.boolean({
      default: true,
      description: 'Use src/ directory',
      required: false,
    }),
    tailwind: Flags.boolean({
      default: true,
      description: 'Include Tailwind CSS',
      required: false,
    }),
    typescript: Flags.boolean({
      default: true,
      description: 'Use TypeScript',
      required: false,
    }),
  };
static summary = 'Create a new project with Vayu UI';

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Create);
    const projectName = args.name as string;
    const projectPath = join(process.cwd(), projectName);

    this.validateProjectName(projectName);

    if (existsSync(projectPath)) {
      this.error(`Directory "${projectName}" already exists.`);
    }

    const options = await this.resolveOptions(flags);

    this.log('');
    this.log(ux.colorize('bold', `  Creating ${projectName}`));
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────────'));
    this.log('');
    this.printOptions(options, projectName);
    this.log('');

    this.scaffold(projectName, options);

    if (!options.skipInit) {
      this.log('');
      this.log(ux.colorize('bold', '  Initializing Vayu UI...'));
      this.log('');

      await runInit({
        force: true,
        log: (m) => this.log(m),
        root: projectPath,
        skipTailwind: !options.tailwind,
      });

      this.log('');
      this.log(ux.colorize('green', '  Vayu UI initialized.'));
    }

    this.printSuccess(projectName, options);
  }

  private detectPackageManager(): string {
    const cwd = process.cwd();
    if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
    if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
    if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun';
    return 'npm';
  }

  private printOptions(options: CreateOptions, projectName: string): void {
    const dim = (s: string) => ux.colorize('dim', s);
    const bold = (s: string) => ux.colorize('bold', s);

    this.log(`  ${dim('Framework:')}       ${bold(options.framework === 'next' ? 'Next.js' : 'Vite')}`);
    this.log(`  ${dim('Package manager:')}  ${bold(options.packageManager)}`);
    this.log(`  ${dim('TypeScript:')}       ${options.typescript ? ux.colorize('green', 'yes') : dim('no')}`);
    this.log(`  ${dim('Tailwind CSS:')}     ${options.tailwind ? ux.colorize('green', 'yes') : dim('no')}`);
    if (options.framework === 'next') {
      this.log(`  ${dim('App Router:')}       ${options.appRouter ? ux.colorize('green', 'yes') : dim('no')}`);
    }

    this.log(`  ${dim('ESLint:')}           ${options.eslint ? ux.colorize('green', 'yes') : dim('no')}`);
    this.log(`  ${dim('src/ directory:')}   ${options.srcDir ? ux.colorize('green', 'yes') : dim('no')}`);
    this.log(`  ${dim('Project path:')}     ${bold(projectName)}/`);
  }

  private printSuccess(projectName: string, options: CreateOptions): void {
    this.log('');
    this.log(ux.colorize('green', `  Project created at ${projectName}/`));
    this.log('');
    this.log(ux.colorize('dim', '  Next steps:'));
    this.log(ux.colorize('dim', `    ${ux.colorize('bold', `cd ${projectName}`)}`));
    this.log(ux.colorize('dim', `    ${ux.colorize('bold', `${options.packageManager} run dev`)}`));
    if (!options.skipInit) {
      this.log('');
      this.log(ux.colorize('dim', '  Add components:'));
      this.log(ux.colorize('dim', `    ${ux.colorize('bold', 'npx vayu-ui-cli list')}       Browse available components`));
      this.log(ux.colorize('dim', `    ${ux.colorize('bold', 'npx vayu-ui-cli add button')}  Add your first component`));
    }

    this.log('');
  }

  private async promptFramework(): Promise<Framework> {
    this.log('  Select a framework:');
    this.log('    1. Next.js');
    this.log('    2. Vite');
    const answer = await prompt('  Choose', '1');
    return answer === '2' ? 'vite' : 'next';
  }

  private async resolveOptions(flags: Record<string, boolean | string | undefined>): Promise<CreateOptions> {
    const framework = (flags.framework as Framework) ?? (flags.force ? 'next' : await this.promptFramework());
    const packageManager = (flags['package-manager'] as string) ?? this.detectPackageManager();

    if (flags.force) {
      return {
        appRouter: Boolean(flags['app-router']),
        eslint: Boolean(flags.eslint),
        framework,
        packageManager,
        skipInit: Boolean(flags['skip-init']),
        skipInstall: Boolean(flags['skip-install']),
        srcDir: Boolean(flags['src-dir']),
        tailwind: Boolean(flags.tailwind),
        typescript: Boolean(flags.typescript),
      };
    }

    const typescript = Boolean(flags.typescript);
    const eslint = Boolean(flags.eslint);
    const tailwind = Boolean(flags.tailwind);
    const srcDir = Boolean(flags['src-dir']);
    let appRouter = Boolean(flags['app-router']);

    if (framework === 'next') {
      appRouter = await confirm('  Use App Router?');
    }

    return {
      appRouter,
      eslint,
      framework,
      packageManager,
      skipInit: Boolean(flags['skip-init']),
      skipInstall: Boolean(flags['skip-install']),
      srcDir,
      tailwind,
      typescript,
    };
  }

  private scaffold(projectName: string, options: CreateOptions): void {
    if (options.framework === 'next') {
      this.scaffoldNext(projectName, options);
    } else {
      this.scaffoldVite(projectName, options);
    }
  }

  private scaffoldNext(projectName: string, options: CreateOptions): void {
    const pm = options.packageManager;
    const args = [
      'create-next-app@latest',
      projectName,
      options.typescript ? '--typescript' : '--js',
      options.appRouter ? '--app' : '--no-app',
      options.eslint ? '--eslint' : '--no-eslint',
      options.tailwind ? '--tailwind' : '--no-tailwind',
      options.srcDir ? '--src-dir' : '--no-src-dir',
      '--no-import-alias',
      `--use-${pm}`,
    ];

    if (options.skipInstall) {
      args.push('--skip-install');
    }

    const cmd = `${pm} ${args.join(' ')}`;
    this.log(ux.colorize('dim', `  Running: ${cmd}`));
    this.log('');

    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch {
      this.error('Failed to scaffold Next.js project.');
    }
  }

  private scaffoldVite(projectName: string, options: CreateOptions): void {
    const pm = options.packageManager;
    const template = options.typescript ? 'react-ts' : 'react';

    const cmd = `${pm} create vite@latest ${projectName} -- --template ${template}`;
    this.log(ux.colorize('dim', `  Running: ${cmd}`));
    this.log('');

    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch {
      this.error('Failed to scaffold Vite project.');
    }

    // Vite doesn't install deps automatically
    if (!options.skipInstall) {
      const installCmd = pm === 'npm'
        ? 'npm install'
        : pm === 'pnpm'
          ? 'pnpm install'
          : pm === 'yarn'
            ? 'yarn'
            : 'bun install';

      this.log(ux.colorize('dim', `  Installing dependencies...`));
      try {
        execSync(installCmd, { cwd: join(process.cwd(), projectName), stdio: 'pipe' });
        this.log(ux.colorize('green', '  Dependencies installed.'));
      } catch {
        this.warn('Failed to install dependencies. Run manually: cd ' + projectName + ' && ' + installCmd);
      }
    }
  }

  private validateProjectName(name: string): void {
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      this.error(
        'Invalid project name. Use only letters, numbers, hyphens, and underscores.',
      );
    }
  }
}
