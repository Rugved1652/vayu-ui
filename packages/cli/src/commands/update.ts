import { Command, Args, Flags, ux } from '@oclif/core';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { allEntries } from 'vayu-ui-registry';
import type { RegistryEntry, ComponentRegistryEntry, HookRegistryEntry } from 'vayu-ui-registry';
import { fetchComponentFiles, fetchHookFile, fetchUtils } from '../utils/fetcher.js';
import { resolveConfig, getUiPath } from '../utils/config.js';

export default class Update extends Command {
  static strict = false;

  static summary = 'Update installed components and hooks';

  static description =
    'Re-fetches installed components and hooks from GitHub. Compares content and only overwrites changed files.';

  static examples = [
    '<%= config.bin %> update',
    '<%= config.bin %> update button',
    '<%= config.bin %> update button modal --force',
    '<%= config.bin %> update --dry-run',
    '<%= config.bin %> update --css',
  ];

  static args = {
    slugs: Args.string({
      description: 'Specific slugs to update (updates all if omitted)',
      required: false,
    }),
  };

  static flags = {
    force: Flags.boolean({
      char: 'f',
      description: 'Overwrite all files even if content is unchanged',
      default: false,
    }),
    'dry-run': Flags.boolean({
      description: 'Preview what would be updated without writing files',
      default: false,
    }),
    css: Flags.boolean({
      description: 'Also update Vayu UI CSS design tokens',
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { argv, flags } = await this.parse(Update);
    const slugs = (argv as string[]).filter((s) => !s.startsWith('-'));

    const { root, config, project } = resolveConfig();
    if (!config) {
      this.error('No vayu-ui.config.json found. Run "vayu-ui init" first.');
    }

    const uiDir = getUiPath(config, project);
    const uiAbsDir = join(root, uiDir);
    const registry = new Map<string, RegistryEntry>();
    for (const entry of allEntries) registry.set(entry.slug, entry);

    // Determine which slugs to update
    const installed = Object.keys(config.installed ?? {});
    const targetSlugs = slugs.length > 0 ? slugs : installed;

    if (targetSlugs.length === 0) {
      this.log(ux.colorize('dim', '  No installed items found. Run "vayu-ui add" first.'));
      return;
    }

    // Resolve entries
    const entries: RegistryEntry[] = [];
    for (const slug of targetSlugs) {
      const entry = registry.get(slug);
      if (!entry) {
        this.warn(`Unknown slug: "${slug}". Skipping.`);
        continue;
      }
      entries.push(entry);
    }

    const components = entries.filter((e): e is ComponentRegistryEntry => e.type === 'component');
    const hooks = entries.filter((e): e is HookRegistryEntry => e.type === 'hook');

    this.log('');
    this.log(ux.colorize('bold', '  Checking for updates...'));
    this.log('');

    let updated = 0;
    let unchanged = 0;

    // Update utils if any components
    if (components.length > 0) {
      const result = await this.checkAndWrite(
        uiAbsDir,
        'utils/index.ts',
        async () => (await fetchUtils()).content,
        flags,
      );
      if (result === 'updated') updated++;
      else if (result === 'unchanged') unchanged++;
    }

    for (const comp of components) {
      const fileNames = comp.files.map((f) => f.name);
      const results = await fetchComponentFiles(comp.directoryName, fileNames);

      for (const { path: relPath, content } of results) {
        const result = await this.checkAndWrite(
          uiAbsDir,
          `components/${relPath}`,
          async () => content,
          flags,
        );
        if (result === 'updated') updated++;
        else if (result === 'unchanged') unchanged++;
      }
    }

    for (const hook of hooks) {
      const result = await this.checkAndWrite(
        uiAbsDir,
        `hooks/${hook.fileName}`,
        async () => (await fetchHookFile(hook.fileName)).content,
        flags,
      );
      if (result === 'updated') updated++;
      else if (result === 'unchanged') unchanged++;
    }

    // Update CSS tokens if --css flag
    if (flags.css && config.tokensFile) {
      const tokensPath = join(root, config.tokensFile);
      if (existsSync(tokensPath)) {
        this.log(ux.colorize('dim', '  CSS tokens update is not yet supported. Re-run "vayu-ui init --merge" to refresh.'));
      }
    }

    this.log('');
    if (flags['dry-run']) {
      this.log(ux.colorize('dim', `  Dry run — ${updated} file(s) would be updated, ${unchanged} unchanged.`));
    } else {
      this.log(ux.colorize('green', `  ${updated} file(s) updated, ${unchanged} unchanged.`));
    }
    this.log('');
  }

  private async checkAndWrite(
    uiAbsDir: string,
    relPath: string,
    getContent: () => Promise<string>,
    flags: { force: boolean; 'dry-run': boolean },
  ): Promise<'updated' | 'unchanged' | 'skipped'> {
    const target = join(uiAbsDir, relPath);

    if (!existsSync(target)) {
      if (flags['dry-run']) {
        this.log(`    ${ux.colorize('yellow', 'missing')} ${relPath}`);
        return 'skipped';
      }
      const content = await getContent();
      writeFileSync(target, content, 'utf-8');
      this.log(`    ${ux.colorize('green', 'created')} ${relPath}`);
      return 'updated';
    }

    const existing = readFileSync(target, 'utf-8');
    const fresh = await getContent();

    if (!flags.force && existing === fresh) {
      return 'unchanged';
    }

    if (flags['dry-run']) {
      this.log(`    ${ux.colorize('cyan', 'changed')} ${relPath}`);
      return 'updated';
    }

    writeFileSync(target, fresh, 'utf-8');
    this.log(`    ${ux.colorize('green', 'updated')} ${relPath}`);
    return 'updated';
  }
}
