import { Command, Args, Flags, ux } from '@oclif/core';
import { existsSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { allEntries } from 'vayu-ui-registry';
import type { RegistryEntry } from 'vayu-ui-registry';
import { confirm } from '../utils/project.js';
import { resolveConfig, getUiPath, markUninstalled } from '../utils/config.js';

export default class Remove extends Command {
  static strict = false;

  static summary = 'Remove installed components or hooks';

  static description =
    'Removes one or more installed components or hooks from your project. Warns if other installed items depend on what you are removing.';

  static examples = [
    '<%= config.bin %> remove button',
    '<%= config.bin %> remove button modal',
    '<%= config.bin %> remove use-debounce --force',
  ];

  static args = {
    slugs: Args.string({
      description: 'One or more component/hook slugs to remove',
      required: true,
    }),
  };

  static flags = {
    force: Flags.boolean({
      char: 'f',
      description: 'Skip confirmation prompt',
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { argv, flags } = await this.parse(Remove);
    const slugs = (argv as string[]).filter((s) => !s.startsWith('-'));

    if (slugs.length === 0) {
      this.error('Please provide at least one slug. Example: vayu-ui remove button');
    }

    const { root, config, project } = resolveConfig();
    if (!config) {
      this.error('No vayu-ui.config.json found. Run "vayu-ui init" first.');
    }

    const uiDir = getUiPath(config, project);
    const uiAbsDir = join(root, uiDir);
    const registry = new Map<string, RegistryEntry>();
    for (const entry of allEntries) registry.set(entry.slug, entry);

    // Resolve entries and validate
    const entries: RegistryEntry[] = [];
    for (const slug of slugs) {
      const entry = registry.get(slug);
      if (!entry) {
        this.warn(`Unknown slug: "${slug}". Skipping.`);
        continue;
      }
      if (!config.installed?.[slug]) {
        this.warn(`"${slug}" is not tracked as installed. Files will still be removed if they exist.`);
      }
      entries.push(entry);
    }

    if (entries.length === 0) return;

    // Check for dependents
    const installedSlugs = new Set(Object.keys(config.installed ?? {}));
    this.warnDependents(entries, installedSlugs, registry);

    // Print plan
    this.log('');
    this.log(ux.colorize('bold', '  Removing:'));
    this.log('');
    for (const entry of entries) {
      if (entry.type === 'component') {
        this.log(`    ${ux.colorize('red', entry.name)}  ${ux.colorize('dim', `→ ${uiDir}/components/${entry.directoryName}/`)}`);
      } else {
        this.log(`    ${ux.colorize('red', entry.name)}  ${ux.colorize('dim', `→ ${uiDir}/hooks/${entry.fileName}`)}`);
      }
    }
    this.log('');

    if (!flags.force) {
      const ok = await confirm('  Continue?');
      if (!ok) {
        this.log(ux.colorize('dim', '  Aborted.'));
        return;
      }
    }

    // Remove files
    for (const entry of entries) {
      if (entry.type === 'component') {
        const dir = join(uiAbsDir, 'components', entry.directoryName);
        if (existsSync(dir)) {
          rmSync(dir, { recursive: true, force: true });
          this.log(`    ${ux.colorize('dim', 'removed')} components/${entry.directoryName}/`);
        }
      } else {
        const file = join(uiAbsDir, 'hooks', entry.fileName);
        if (existsSync(file)) {
          rmSync(file, { force: true });
          this.log(`    ${ux.colorize('dim', 'removed')} hooks/${entry.fileName}`);
        }
      }
    }

    // Update config
    markUninstalled(root, config, entries.map((e) => e.slug));

    // Check if we can clean up utils
    const remainingComponents = Object.entries(config.installed ?? {})
      .filter(([, v]) => v.type === 'component');
    if (remainingComponents.length === 0) {
      const utilsFile = join(uiAbsDir, 'utils', 'index.ts');
      if (existsSync(utilsFile)) {
        rmSync(utilsFile, { force: true });
        this.log(`    ${ux.colorize('dim', 'removed')} utils/index.ts (no components remaining)`);
      }
    }

    this.log('');
    this.log(ux.colorize('green', `  Removed ${entries.length} item${entries.length > 1 ? 's' : ''}.`));
    this.log('');
  }

  private warnDependents(
    removing: RegistryEntry[],
    installedSlugs: Set<string>,
    registry: Map<string, RegistryEntry>,
  ): void {
    const removingSlugs = new Set(removing.map((e) => e.slug));

    for (const slug of installedSlugs) {
      if (removingSlugs.has(slug)) continue;
      const entry = registry.get(slug);
      if (!entry) continue;

      for (const dep of entry.registryDependencies) {
        if (removingSlugs.has(dep.slug)) {
          this.warn(
            `"${slug}" depends on "${dep.slug}" which you are removing. ` +
            `${slug} may break until you re-add ${dep.slug}.`,
          );
        }
      }
    }
  }
}
