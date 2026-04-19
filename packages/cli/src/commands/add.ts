import { Command, Args, Flags, ux } from '@oclif/core';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { allEntries } from 'vayu-ui-registry';
import type { RegistryEntry, ComponentRegistryEntry, HookRegistryEntry } from 'vayu-ui-registry';
import { fetchComponentFiles, fetchHookFile, fetchUtils } from '../utils/fetcher.js';
import { confirm } from '../utils/project.js';
import { resolveConfig, getUiPath, markInstalled } from '../utils/config.js';
export default class Add extends Command {
  static strict = false;

  static summary = 'Add components or hooks to your project';

  static description =
    'Copies one or more components or hooks from the Vayu UI registry into your project. Automatically resolves dependencies and installs required npm packages.';

  static examples = [
    '<%= config.bin %> add button',
    '<%= config.bin %> add button modal tooltip',
    '<%= config.bin %> add use-debounce',
    '<%= config.bin %> add modal --overwrite',
    '<%= config.bin %> add button --dry-run',
  ];

  static args = {
    slugs: Args.string({
      description: 'One or more component/hook slugs to add',
      required: true,
    }),
  };

  static flags = {
    overwrite: Flags.boolean({
      char: 'o',
      description: 'Overwrite existing files',
      default: false,
    }),
    'dry-run': Flags.boolean({
      description: 'Preview what would be added without writing files',
      default: false,
    }),
    'skip-install': Flags.boolean({
      description: 'Skip npm dependency installation',
      default: false,
    }),
    yes: Flags.boolean({
      char: 'y',
      description: 'Skip confirmation prompts',
      default: false,
    }),
  };

  private registry = new Map<string, RegistryEntry>();

  async run(): Promise<void> {
    const { argv, flags } = await this.parse(Add);
    const slugs = (argv as string[]).filter((s) => !s.startsWith('-'));

    if (slugs.length === 0) {
      this.error('Please provide at least one slug. Example: vayu-ui add button');
    }

    // Build registry lookup
    for (const entry of allEntries) {
      this.registry.set(entry.slug, entry);
    }

    // Read config or detect project
    const { root, config, project } = resolveConfig();
    const uiDir = getUiPath(config, project);
    const { packageManager } = project;
    const uiAbsDir = join(root, uiDir);

    // Resolve all entries including transitive deps
    const resolved = this.resolveAll(slugs);
    const components = resolved.filter((e): e is ComponentRegistryEntry => e.type === 'component');
    const hooks = resolved.filter((e): e is HookRegistryEntry => e.type === 'hook');

    // Collect all npm deps
    const npmDeps = this.collectNpmDeps(resolved);

    // Print plan
    this.printPlan(components, hooks, npmDeps, uiDir);
    this.log('');

    if (!flags['dry-run'] && !flags.yes) {
      const ok = await confirm('  Continue?');
      if (!ok) {
        this.log(ux.colorize('dim', '  Aborted.'));
        return;
      }
    }

    if (flags['dry-run']) {
      this.log(ux.colorize('dim', '  Dry run — no files were written.'));
      return;
    }

    // Fetch and write files
    const utilsNeeded = this.needsUtils(resolved);
    if (utilsNeeded) {
      await this.writeUtils(uiAbsDir, flags.overwrite);
    }

    for (const comp of components) {
      await this.writeComponent(uiAbsDir, comp, flags.overwrite);
    }

    for (const hook of hooks) {
      await this.writeHook(uiAbsDir, hook, flags.overwrite);
    }

    // Install npm deps
    if (npmDeps.size > 0 && !flags['skip-install']) {
      await this.installDeps(npmDeps, root, packageManager);
    }

    // Success summary
    this.log('');
    this.log(ux.colorize('green', `  Added ${resolved.length} item${resolved.length > 1 ? 's' : ''}.`));

    // Track installed items in config
    markInstalled(root, config, resolved.map((e) => ({ slug: e.slug, type: e.type })));

    this.printImportHints(resolved, uiDir);
    this.log('');
  }

  private resolveAll(slugs: string[]): RegistryEntry[] {
    const visited = new Set<string>();
    const result: RegistryEntry[] = [];

    const resolve = (slug: string): void => {
      if (visited.has(slug)) return;
      visited.add(slug);

      const entry = this.registry.get(slug);
      if (!entry) {
        this.warn(`Unknown slug: "${slug}". Skipping.`);
        return;
      }

      // Resolve transitive registry deps first
      for (const dep of entry.registryDependencies) {
        resolve(dep.slug);
      }

      result.push(entry);
    };

    for (const slug of slugs) resolve(slug);
    return result;
  }

  private collectNpmDeps(entries: RegistryEntry[]): Map<string, string> {
    const deps = new Map<string, string>();
    for (const entry of entries) {
      for (const dep of entry.npmDependencies) {
        deps.set(dep.name, dep.version ?? 'latest');
      }
    }
    // Always include cn utility deps when utils are needed
    if (this.needsUtils(entries)) {
      deps.set('clsx', 'latest');
      deps.set('tailwind-merge', 'latest');
    }
    return deps;
  }

  private needsUtils(entries: RegistryEntry[]): boolean {
    return entries.some((e) => e.type === 'component');
  }

  private printPlan(
    components: ComponentRegistryEntry[],
    hooks: HookRegistryEntry[],
    npmDeps: Map<string, string>,
    uiDir: string,
  ): void {
    this.log('');
    this.log(ux.colorize('bold', '  Adding:'));
    this.log('');

    for (const comp of components) {
      const fileCount = comp.files.length;
      this.log(`    ${ux.colorize('green', comp.name)}  ${ux.colorize('dim', `(${fileCount} files → ${uiDir}/components/${comp.directoryName}/)`)}`);
    }

    for (const hook of hooks) {
      this.log(`    ${ux.colorize('magenta', hook.name)}  ${ux.colorize('dim', `(${hook.fileName} → ${uiDir}/hooks/)`)}`);
    }

    if (npmDeps.size > 0) {
      this.log('');
      this.log(ux.colorize('dim', `  npm packages: ${[...npmDeps.keys()].join(', ')}`));
    }
  }

  private async writeUtils(uiAbsDir: string, overwrite: boolean): Promise<void> {
    const utilsDir = join(uiAbsDir, 'utils');
    const target = join(utilsDir, 'index.ts');

    if (!overwrite && existsSync(target)) {
      this.log(ux.colorize('dim', '    utils/index.ts already exists — skipping'));
      return;
    }

    mkdirSync(utilsDir, { recursive: true });
    const result = await fetchUtils();
    writeFileSync(target, result.content);
    this.log(`    ${ux.colorize('dim', 'wrote')} utils/index.ts`);
  }

  private async writeComponent(
    uiAbsDir: string,
    entry: ComponentRegistryEntry,
    overwrite: boolean,
  ): Promise<void> {
    const compDir = join(uiAbsDir, 'components', entry.directoryName);
    mkdirSync(compDir, { recursive: true });

    const fileNames = entry.files.map((f) => f.name);
    const results = await fetchComponentFiles(entry.directoryName, fileNames);

    for (const { path: relPath, content } of results) {
      const target = join(uiAbsDir, 'components', relPath);

      if (!overwrite && existsSync(target)) {
        this.log(`    ${ux.colorize('dim', 'exists')} ${entry.directoryName}/${relPath.split('/').pop()}`);
        continue;
      }

      writeFileSync(target, content);
      this.log(`    ${ux.colorize('dim', 'wrote')} components/${relPath}`);
    }
  }

  private async writeHook(
    uiAbsDir: string,
    entry: HookRegistryEntry,
    overwrite: boolean,
  ): Promise<void> {
    const hooksDir = join(uiAbsDir, 'hooks');
    mkdirSync(hooksDir, { recursive: true });

    const target = join(hooksDir, entry.fileName);

    if (!overwrite && existsSync(target)) {
      this.log(`    ${ux.colorize('dim', 'exists')} hooks/${entry.fileName}`);
      return;
    }

    const result = await fetchHookFile(entry.fileName);
    writeFileSync(target, result.content);
    this.log(`    ${ux.colorize('dim', 'wrote')} hooks/${entry.fileName}`);
  }

  private async installDeps(
    deps: Map<string, string>,
    root: string,
    packageManager: string,
  ): Promise<void> {
    const pkgs = [...deps.entries()].map(([name, version]) =>
      version === 'latest' ? name : `${name}@${version}`,
    );

    const addCmd = packageManager === 'npm'
      ? `npm install ${pkgs.join(' ')}`
      : packageManager === 'pnpm'
        ? `pnpm add ${pkgs.join(' ')}`
        : packageManager === 'yarn'
          ? `yarn add ${pkgs.join(' ')}`
          : `bun add ${pkgs.join(' ')}`;

    this.log('');
    this.log(ux.colorize('dim', `  Installing: ${[...deps.keys()].join(', ')}`));

    try {
      execSync(addCmd, { cwd: root, stdio: 'pipe' });
      this.log(ux.colorize('green', '  Dependencies installed.'));
    } catch (err: any) {
      this.warn(`Failed to install dependencies: ${err.message}`);
      this.log(ux.colorize('dim', `  Run manually: ${addCmd}`));
    }
  }

  private printImportHints(entries: RegistryEntry[], uiDir: string): void {
    this.log('');
    this.log(ux.colorize('dim', '  Import:'));
    for (const entry of entries) {
      if (entry.type === 'component') {
        this.log(ux.colorize('dim', `    import { ${entry.name} } from '@/${uiDir}/components/${entry.directoryName}'`));
      } else {
        this.log(ux.colorize('dim', `    import { ${entry.name} } from '@/${uiDir}/hooks/${entry.fileName.replace('.ts', '')}'`));
      }
    }
  }
}
