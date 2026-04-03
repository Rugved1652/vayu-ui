import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {registry, type RegistryItem} from '../index.js'

// ============================================================================
// `vayu-ui list`
// ============================================================================

export default class List extends Command {
  static summary = 'List all available hooks and components'

  static description = `
Shows everything available in the registry.
Filter by type or tag to narrow results.

Examples:
    $ vayu-ui list
    $ vayu-ui list --type hook
    $ vayu-ui list --tag browser-api
`

  static flags = {
    type: Flags.string({
      char: 't',
      description: 'Filter by type: hook or component',
      options: ['hook', 'component'],
    }),
    tag: Flags.string({
      description: 'Filter by tag',
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(List)

    let items = Object.values(registry)

    // Apply filters
    if (flags.type) {
      items = items.filter((i: RegistryItem) => i.type === flags.type)
    }
    if (flags.tag) {
      items = items.filter((i: RegistryItem) => i.tags?.includes(flags.tag!))
    }

    if (items.length === 0) {
      this.log(chalk.yellow('\n  No items found matching your filter.\n'))
      return
    }

    // Group by type for cleaner output
    const hooks = items.filter((i: RegistryItem) => i.type === 'hook')
    const components = items.filter((i: RegistryItem) => i.type === 'component' && !i.internal)

    this.log('')

    if (hooks.length > 0) {
      this.log(chalk.bold.cyan('  Hooks'))
      this.log(chalk.dim('  ─────────────────────────────────────────────'))
      for (const item of hooks) {
        this.log(`  ${chalk.white(item.slug.padEnd(30))} ${chalk.dim(item.description)}`)
      }
      this.log('')
    }

    if (components.length > 0) {
      this.log(chalk.bold.magenta('  Components'))
      this.log(chalk.dim('  ─────────────────────────────────────────────'))
      for (const item of components) {
        this.log(`  ${chalk.white(item.slug.padEnd(30))} ${chalk.dim(item.description)}`)
      }
      this.log('')
    }

    this.log(
      chalk.dim(`  ${items.length} item${items.length === 1 ? '' : 's'} total`) +
        chalk.dim(`  •  Run `) +
        chalk.white('vayu-ui add <name>') +
        chalk.dim(' to install'),
    )
    this.log('')
  }
}
