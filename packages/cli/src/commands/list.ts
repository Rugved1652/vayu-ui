import { Command, Flags, ux } from '@oclif/core';
import {
  componentEntries,
  hookEntries,
  type ComponentCategory,
  type HookCategory,
} from 'vayu-ui-registry';

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  'inputs', 'feedback', 'overlay', 'layout', 'data-display',
  'navigation', 'animation', 'utility', 'media', 'forms',
];

const HOOK_CATEGORIES: HookCategory[] = [
  'state', 'lifecycle', 'dom', 'animation', 'sensor',
  'side-effect', 'async', 'input',
];

export default class List extends Command {
  static summary = 'List all available Vayu UI components and hooks';

  static description =
    'Displays all components and hooks available in the Vayu UI registry, grouped by type and category.';

  static examples = [
    '<%= config.bin %> list',
    '<%= config.bin %> list --type component',
    '<%= config.bin %> list --type hook',
    '<%= config.bin %> list --category inputs',
    '<%= config.bin %> list --type component --category overlay',
  ];

  static flags = {
    type: Flags.option({
      description: 'Filter by item type',
      options: ['component', 'hook'] as const,
      required: false,
    })(),
    category: Flags.string({
      description: 'Filter by category (e.g. inputs, state, overlay)',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(List);

    const showComponents = !flags.type || flags.type === 'component';
    const showHooks = !flags.type || flags.type === 'hook';
    const categoryFilter = flags.category?.toLowerCase();

    let compCount = 0;
    let hookCount = 0;

    if (showComponents) {
      const filtered = categoryFilter
        ? componentEntries.filter((e) => e.category === categoryFilter)
        : componentEntries;

      if (filtered.length > 0) {
        this.printSection('Components', filtered, COMPONENT_CATEGORIES);
        compCount = filtered.length;
      } else if (categoryFilter && showComponents) {
        this.warn(`No components found with category "${flags.category}"`);
      }
    }

    if (showHooks) {
      const filtered = categoryFilter
        ? hookEntries.filter((e) => e.category === categoryFilter)
        : hookEntries;

      if (filtered.length > 0) {
        this.printSection('Hooks', filtered, HOOK_CATEGORIES);
        hookCount = filtered.length;
      } else if (categoryFilter && showHooks && !showComponents) {
        this.warn(`No hooks found with category "${flags.category}"`);
      }
    }

    if (compCount > 0 || hookCount > 0) {
      this.log('');
      this.log(ux.colorize('dim', `  ${compCount} components, ${hookCount} hooks`));
    }
  }

  private printSection<T extends { category: string; slug: string; description: string }>(
    title: string,
    entries: T[],
    categoryOrder: readonly string[],
  ): void {
    const separator = '  ─────────────────────────────────────────────────────';

    this.log('');
    this.log(ux.colorize('cyan', ux.colorize('bold', `  ${title}`)));
    this.log(ux.colorize('dim', separator));

    const grouped = this.groupByCategory(entries, categoryOrder);
    for (const [category, items] of grouped) {
      this.log('');
      this.log(ux.colorize('yellow', `    ${category}`));
      for (const entry of items) {
        const slug = ux.colorize('dim', entry.slug.padEnd(28));
        const desc = this.truncate(entry.description, 55);
        this.log(`      ${slug}  ${desc}`);
      }
    }
  }

  private truncate(text: string, maxLen: number): string {
    return text.length > maxLen ? text.substring(0, maxLen - 3) + '...' : text;
  }

  private groupByCategory<T extends { category: string }>(
    entries: T[],
    categoryOrder: readonly string[],
  ): Map<string, T[]> {
    const groups = new Map<string, T[]>();
    for (const category of categoryOrder) {
      const items = entries.filter((e) => e.category === category);
      if (items.length > 0) {
        groups.set(category, items);
      }
    }
    return groups;
  }
}
