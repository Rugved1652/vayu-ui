import type {RegistryEntry} from 'vayu-ui-registry'

import {Args, Command, Flags, ux} from '@oclif/core'
import {existsSync, rmSync} from 'node:fs'
import {findEntry} from 'vayu-ui-registry'

import {markUninstalled, projectPath, resolveConfig, sourceTarget} from '../utils/config.js'
import {confirm} from '../utils/project.js'

export default class Remove extends Command {
  static args = {
    slugs: Args.string({
      description: 'One or more component/hook slugs to remove',
      required: true,
    }),
  }
  static description =
    'Removes one or more installed components or hooks from your project. Warns if other installed items depend on what you are removing.'
  static examples = [
    '<%= config.bin %> remove button',
    '<%= config.bin %> remove button modal',
    '<%= config.bin %> remove use-debounce --force',
  ]
  static flags = {
    cwd: Flags.string({description: 'Target project or workspace directory'}),
    'dry-run': Flags.boolean({default: false, description: 'Preview removal without writing files'}),
    force: Flags.boolean({
      char: 'f',
      default: false,
      description: 'Skip confirmation prompt',
    }),
  }
  static strict = false
  static summary = 'Remove installed components or hooks'

  async run(): Promise<void> {
    const {argv, flags} = await this.parse(Remove)
    const slugs = (argv as string[]).filter((s) => !s.startsWith('-'))

    if (slugs.length === 0) {
      this.error('Please provide at least one slug. Example: vayu-ui remove button')
    }

    const {config, root} = resolveConfig(flags.cwd)
    if (!config) {
      this.error('No vayu-ui.config.json found. Run "vayu-ui init" first.')
    }

    // Resolve entries and validate
    const entries: RegistryEntry[] = []
    for (const slug of slugs) {
      const entry = findEntry(slug)
      if (!entry) {
        this.warn(`Unknown slug: "${slug}". Skipping.`)
        this.error(`Unknown slug: ${slug}`)
      }

      if (!config.installed?.[entry.slug]) {
        this.warn(`"${slug}" is not tracked as installed. Files will still be removed if they exist.`)
      }

      entries.push(entry)
    }

    if (entries.length === 0) return

    // Check for dependents
    const installedSlugs = new Set(Object.keys(config.installed ?? {}))
    this.warnDependents(entries, installedSlugs)

    // Print plan
    this.log('')
    this.log(ux.colorize('bold', '  Removing:'))
    this.log('')
    for (const entry of entries) {
      if (entry.type === 'component') {
        this.log(
          `    ${ux.colorize('red', entry.name)}  ${ux.colorize('dim', `→ ${sourceTarget(`components/${entry.directoryName}`, config)}/`)}`,
        )
      } else {
        this.log(
          `    ${ux.colorize('red', entry.name)}  ${ux.colorize('dim', `→ ${sourceTarget(`hooks/${entry.fileName}`, config)}`)}`,
        )
      }
    }

    this.log('')

    if (flags['dry-run']) return

    if (!flags.force) {
      const ok = await confirm('  Continue?')
      if (!ok) {
        this.log(ux.colorize('dim', '  Aborted.'))
        return
      }
    }

    // Remove files
    for (const entry of entries) {
      if (entry.type === 'component') {
        const dir = projectPath(root, sourceTarget(`components/${entry.directoryName}`, config))
        if (existsSync(dir)) {
          rmSync(dir, {force: true, recursive: true})
          this.log(`    ${ux.colorize('dim', 'removed')} components/${entry.directoryName}/`)
        }
      } else {
        const file = projectPath(root, sourceTarget(`hooks/${entry.fileName}`, config))
        if (existsSync(file)) {
          rmSync(file, {force: true})
          this.log(`    ${ux.colorize('dim', 'removed')} hooks/${entry.fileName}`)
        }
      }
    }

    // Update config
    markUninstalled(
      root,
      config,
      entries.map((e) => e.slug),
    )

    this.log('')
    this.log(ux.colorize('green', `  Removed ${entries.length} item${entries.length > 1 ? 's' : ''}.`))
    this.log('')
  }

  private warnDependents(removing: RegistryEntry[], installedSlugs: Set<string>): void {
    const removingSlugs = new Set(removing.map((e) => e.slug))

    for (const slug of installedSlugs) {
      if (removingSlugs.has(slug)) continue
      const entry = findEntry(slug)
      if (!entry) continue

      for (const dep of entry.registryDependencies) {
        if (removingSlugs.has(dep.slug)) {
          this.warn(
            `"${slug}" depends on "${dep.slug}" which you are removing. ` +
              `${slug} may break until you re-add ${dep.slug}.`,
          )
        }
      }
    }
  }
}
