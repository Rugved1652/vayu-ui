import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'
import fs from 'fs-extra'
import {createHash} from 'crypto'
import {registry, type RegistryItem} from '../index.js'

import {fetchFromGitHub, installDependencies, detectPackageManager} from '../utils/installer.js'

// ============================================================================
// Helpers
// ============================================================================

function contentHash(content: string): string {
  return createHash('sha256').update(content).digest('hex')
}

interface InstalledItem {
  item: RegistryItem
  localPath: string
  localContent: string
  localHash: string
}

interface UpdateResult {
  item: RegistryItem
  status: 'updated' | 'up-to-date' | 'error' | 'new-deps'
  error?: string
}

/**
 * Scan the user's project for Vayu UI files that match registry entries.
 */
function discoverInstalledItems(cwd: string): InstalledItem[] {
  const installed: InstalledItem[] = []

  for (const item of Object.values(registry)) {
    const filePath = path.join(cwd, item.targetPath, item.fileName)
    if (fs.existsSync(filePath)) {
      const localContent = fs.readFileSync(filePath, 'utf-8')
      installed.push({
        item,
        localPath: filePath,
        localContent,
        localHash: contentHash(localContent),
      })
    }
  }

  return installed
}

/**
 * Build the raw GitHub URL for a registry item.
 * Monorepo layout: components & hooks live under packages/ui.
 */
function getGitHubUrl(item: RegistryItem): string {
  const baseUrl = 'https://raw.githubusercontent.com/Rugved1652/vayu-ui/main/packages/ui'
  const sourcePath = item.type === 'hook' ? `src/hooks/${item.fileName}` : `src/components/ui/${item.fileName}`
  return `${baseUrl}/${sourcePath}`
}

// ============================================================================
// `vayu-ui update`
// ============================================================================

export default class Update extends Command {
  static summary = 'Update installed Vayu UI hooks and components to the latest version'

  static description = `
Scans your project for installed Vayu UI items, fetches the latest
versions from GitHub, and updates only the files that have changed.

Uses content hashing for efficient comparison (no unnecessary writes).
All GitHub fetches run in parallel for speed.

Examples:
  $ vayu-ui update
  $ vayu-ui update button
  $ vayu-ui update --css
  $ vayu-ui update --dry-run
`

  static args = {
    name: Args.string({
      name: 'name',
      required: false,
      description: 'Slug of a specific item to update (updates all if omitted)',
    }),
  }

  static flags = {
    css: Flags.boolean({
      description: 'Also update Vayu UI CSS design tokens (globals.css)',
      default: false,
    }),
    'dry-run': Flags.boolean({
      description: 'Show what would be updated without making changes',
      default: false,
    }),
    force: Flags.boolean({
      char: 'f',
      description: 'Force update even if content appears unchanged',
      default: false,
    }),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Update)
    const cwd = process.cwd()
    const isDryRun = flags['dry-run']

    // ── 1. Discover installed items ─────────────────────────────────────
    const scanSpinner = ora({
      text: 'Scanning project for Vayu UI items...',
      color: 'cyan',
    }).start()

    let installed = discoverInstalledItems(cwd)

    // Filter to specific item if name provided
    if (args.name) {
      installed = installed.filter((i) => i.item.slug === args.name)
      if (installed.length === 0) {
        scanSpinner.fail(chalk.red(`"${args.name}" is not installed in this project`))
        this.log(chalk.dim('  Make sure the file exists at the expected path.'))
        this.log(chalk.dim(`  Run ${chalk.white('vayu-ui list')} to see available items.`))
        this.log('')
        return
      }
    }

    if (installed.length === 0) {
      scanSpinner.warn(chalk.yellow('No Vayu UI items found in this project'))
      this.log(chalk.dim(`  Run ${chalk.white('vayu-ui add <name>')} to install items first.`))
      this.log('')
      return
    }

    scanSpinner.succeed(chalk.green(`Found ${installed.length} installed item${installed.length === 1 ? '' : 's'}`))

    // ── 2. Parallel-fetch all latest versions from GitHub ───────────────
    const fetchSpinner = ora({
      text: `Fetching latest versions from GitHub (${installed.length} item${installed.length === 1 ? '' : 's'})...`,
      color: 'cyan',
    }).start()

    const fetchResults = await Promise.allSettled(
      installed.map(async (inst) => {
        const url = getGitHubUrl(inst.item)
        const remoteContent = await fetchFromGitHub(url)
        return {inst, remoteContent, remoteHash: contentHash(remoteContent)}
      }),
    )

    fetchSpinner.succeed(chalk.green('Fetched latest versions'))

    // ── 3. Compare and update ───────────────────────────────────────────
    this.log('')
    const results: UpdateResult[] = []
    const allNewDeps: string[] = []
    let updatedCount = 0

    for (const result of fetchResults) {
      if (result.status === 'rejected') {
        const err = result.reason as Error
        // Try to extract item name from error
        this.log(chalk.red('  ✖ ') + chalk.dim(`Failed to fetch: ${err.message}`))
        continue
      }

      const {inst, remoteContent, remoteHash} = result.value
      const {item, localHash, localPath} = inst

      // Compare hashes
      if (localHash === remoteHash && !flags.force) {
        results.push({item, status: 'up-to-date'})
        continue
      }

      // Content has changed — update
      if (isDryRun) {
        this.log(chalk.yellow('  ↻ ') + chalk.white(item.fileName) + chalk.dim(` (${item.type}) — would update`))
        updatedCount++
      } else {
        try {
          await fs.writeFile(localPath, remoteContent, 'utf-8')
          const relativePath = path.relative(cwd, localPath)
          this.log(chalk.green('  ✔ ') + chalk.white(item.fileName) + chalk.dim(` → ${relativePath}`))
          updatedCount++
          results.push({item, status: 'updated'})

          // Collect new deps
          if (item.dependencies) {
            allNewDeps.push(...item.dependencies)
          }
        } catch (error) {
          this.log(chalk.red('  ✖ ') + chalk.white(item.fileName) + chalk.dim(` — ${(error as Error).message}`))
          results.push({item, status: 'error', error: (error as Error).message})
        }
      }
    }

    // Show up-to-date count
    const upToDate = results.filter((r) => r.status === 'up-to-date').length
    if (upToDate > 0) {
      this.log(chalk.dim(`  ─ ${upToDate} item${upToDate === 1 ? '' : 's'} already up to date`))
    }

    // ── 4. Update CSS if requested ──────────────────────────────────────
    if (flags.css) {
      this.log('')
      await this.updateCss(cwd, isDryRun)
    }

    // ── 5. Install any new dependencies ─────────────────────────────────
    if (!isDryRun) {
      const uniqueDeps = [...new Set(allNewDeps)]

      // Filter out already-installed deps
      const pkgPath = path.join(cwd, 'package.json')
      let missingDeps = uniqueDeps
      if (fs.existsSync(pkgPath)) {
        try {
          const pkg = fs.readJsonSync(pkgPath)
          const existingDeps = {...pkg.dependencies, ...pkg.devDependencies}
          missingDeps = uniqueDeps.filter((d) => !existingDeps[d])
        } catch {
          // proceed with all
        }
      }

      if (missingDeps.length > 0) {
        this.log('')
        const pm = detectPackageManager()
        const depSpinner = ora({
          text: `Installing new packages via ${chalk.bold(pm)}: ${missingDeps.join(', ')}`,
          color: 'cyan',
        }).start()

        try {
          installDependencies(missingDeps)
          depSpinner.succeed(chalk.green('New packages installed'))
        } catch {
          depSpinner.fail(chalk.red('Failed to install packages'))
          this.log(chalk.dim(`  Run manually: ${pm} install ${missingDeps.join(' ')}`))
        }
      }
    }

    // ── 6. Summary ──────────────────────────────────────────────────────
    this.log('')
    if (isDryRun) {
      if (updatedCount > 0) {
        this.log(chalk.bold.yellow(`⊙ Dry run: ${updatedCount} item${updatedCount === 1 ? '' : 's'} would be updated`))
        this.log(chalk.dim('  Run without --dry-run to apply changes.'))
      } else {
        this.log(chalk.bold.green('✓ Everything is up to date!'))
      }
    } else if (updatedCount > 0) {
      this.log(chalk.bold.green(`✓ Updated ${updatedCount} item${updatedCount === 1 ? '' : 's'}!`))
    } else {
      this.log(chalk.bold.green('✓ Everything is up to date!'))
    }
    this.log('')
  }

  /**
   * Re-run init logic to update the CSS tokens file.
   */
  private async updateCss(cwd: string, isDryRun: boolean): Promise<void> {
    // Try common CSS paths
    const candidates = ['src/app/globals.css', 'src/index.css', 'src/globals.css']

    let cssPath: string | null = null
    for (const c of candidates) {
      if (fs.existsSync(path.join(cwd, c))) {
        cssPath = c
        break
      }
    }

    if (!cssPath) {
      this.log(chalk.dim('  No Vayu UI CSS file found to update. Run `vayu-ui init` first.'))
      return
    }

    // Fetch the latest CSS by re-running init in update mode
    // We import the CSS constant from init command
    const {default: Init} = await import('./init.js')

    if (isDryRun) {
      this.log(chalk.yellow('  ↻ ') + chalk.white(cssPath) + chalk.dim(' — would update CSS tokens'))
    } else {
      // Simply re-run init with overwrite
      this.log(chalk.dim('  Updating CSS design tokens...'))
      try {
        await Init.run(['--overwrite', '--path', cssPath, '--force'])
      } catch {
        this.log(chalk.red('  ✖ Failed to update CSS tokens'))
      }
    }
  }
}
