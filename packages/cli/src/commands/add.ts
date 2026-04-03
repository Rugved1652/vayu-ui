import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'
import {findWithDependencies, findItem, type RegistryItem} from '../index.js'

import {installItem, installDependencies, detectPackageManager} from '../utils/installer'

// ============================================================================
// `vayu-ui add <hook-or-component>`
// ============================================================================

export default class Add extends Command {
  static summary = 'Add a hook or component to your project'

  static description = `
Copies a hook or component from the library into your project.
Automatically resolves and installs any required dependencies.

Examples:
  $ vayu-ui add use-battery-status
  $ vayu-ui add use-battery-status --overwrite
  $ vayu-ui add use-battery-status --path src/lib/hooks
`

  // The thing the user wants to add
  // e.g: vayu-ui add use-battery-status
  static args = {
    name: Args.string({
      name: 'name',
      required: true,
      description: 'Slug of the hook or component to add',
    }),
  }

  static flags = {
    // Force overwrite if file already exists
    overwrite: Flags.boolean({
      char: 'o',
      description: 'Overwrite existing file if it already exists',
      default: false,
    }),
    // Override the target path
    path: Flags.string({
      char: 'p',
      description: 'Custom path to write the file (overrides registry default)',
    }),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Add)
    const slug = args.name

    // ── 1. Look up the item in registry ────────────────────────────────────
    const item = findItem(slug)

    if (!item) {
      this.log(chalk.red(`\n✖ "${slug}" not found in registry.\n`))
      this.log(chalk.dim(`  Run ${chalk.white('vayu-ui list')} to see all available items.\n`))
      this.exit(1)
    }

    // ── 2. Resolve all dependencies recursively ────────────────────────────
    // e.g. if modal needs button, this returns [button, modal]
    const itemsToInstall = findWithDependencies(slug)

    // Show what's about to be installed
    this.log('')
    this.log(chalk.bold(`Adding ${chalk.cyan(item.name)}...`))

    if (itemsToInstall.length > 1) {
      const depNames = itemsToInstall
        .slice(0, -1) // everything except the requested item
        .map((d: RegistryItem) => chalk.yellow(d.name))
        .join(', ')
      this.log(chalk.dim(`  Also installing required: ${depNames}`))
    }
    this.log('')

    // ── 3. Install each item ───────────────────────────────────────────────
    const allDependencies: string[] = []

    for (const current of itemsToInstall) {
      const spinner = ora({
        text: `Copying ${chalk.cyan(current.fileName)}`,
        color: 'cyan',
      }).start()

      // Allow custom path override for the final item
      const itemToInstall = flags.path && current.slug === slug ? {...current, targetPath: flags.path} : current

      const result = await installItem(itemToInstall, {
        overwrite: flags.overwrite,
      })

      if (result.alreadyExists && !flags.overwrite) {
        spinner.warn(
          chalk.yellow(`${current.fileName} already exists — skipped`) + chalk.dim(` (use --overwrite to replace)`),
        )
      } else {
        const relativePath = path.relative(process.cwd(), result.filePath)
        spinner.succeed(chalk.green(`${current.fileName}`) + chalk.dim(` → ${relativePath}`))
      }

      // Collect npm deps
      if (current.dependencies) {
        allDependencies.push(...current.dependencies)
      }
    }

    // ── 4. Install npm dependencies (deduped) ─────────────────────────────
    const uniqueDeps = [...new Set(allDependencies)]

    if (uniqueDeps.length > 0) {
      this.log('')
      const pm = detectPackageManager()
      const spinner = ora({
        text: `Installing packages via ${chalk.bold(pm)}: ${uniqueDeps.join(', ')}`,
        color: 'cyan',
      }).start()

      try {
        installDependencies(uniqueDeps)
        spinner.succeed(chalk.green('Packages installed'))
      } catch {
        spinner.fail(chalk.red('Failed to install packages'))
        this.log(chalk.dim(`  Run manually: ${pm} install ${uniqueDeps.join(' ')}`))
      }
    }

    // ── 5. Done ────────────────────────────────────────────────────────────
    this.log('')
    this.log(chalk.bold.green('✓ Done!'))
    this.log('')
    this.log(chalk.dim('Usage:'))
    this.log(chalk.white(`  import { ${item.name} } from "@/hooks/${item.fileName.replace('.ts', '')}";`))
    this.log('')
  }
}
