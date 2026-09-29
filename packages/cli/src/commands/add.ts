import {Args, Command, Flags} from '@oclif/core'
import {allEntries} from 'vayu-ui-registry'

import {defaultConfig, resolveConfig} from '../utils/config.js'
import {installEntries, resolveEntries} from '../utils/installer.js'
import {confirm} from '../utils/project.js'

export default class Add extends Command {
  static args = {slugs: Args.string({description: 'Component or hook slugs', required: false})}
  static description =
    'Copies release-bundled sources, resolves all component, hook and utility dependencies, and installs npm packages.'
  static flags = {
    all: Flags.boolean({description: 'Add every component and hook'}),
    cwd: Flags.string({description: 'Target project or workspace directory'}),
    'dry-run': Flags.boolean({default: false, description: 'Preview without writing files'}),
    overwrite: Flags.boolean({char: 'o', default: false, description: 'Overwrite existing source files'}),
    'skip-install': Flags.boolean({
      default: false,
      description: 'Record dependencies without running the package manager',
    }),
    yes: Flags.boolean({char: 'y', default: false, description: 'Skip confirmation'}),
  }
  static strict = false
  static summary = 'Add components or hooks to your project'

  async run(): Promise<void> {
    const {argv, flags} = await this.parse(Add)
    const {config, project, root} = resolveConfig(flags.cwd)
    const slugs = flags.all ? allEntries.map((entry) => entry.slug) : (argv as string[])
    if (slugs.length === 0) this.error('Provide a slug or --all. Run vayu-ui list to browse.')
    const entries = resolveEntries(slugs)
    this.log(`  Adding ${entries.map((entry) => entry.name).join(', ')}`)
    if (!flags['dry-run'] && !flags.yes && process.stdin.isTTY && !(await confirm('  Continue?'))) return
    installEntries({
      config: config ?? defaultConfig(project),
      dryRun: flags['dry-run'],
      log: (message) => this.log(message),
      overwrite: flags.overwrite,
      packageManager: project.packageManager,
      root,
      skipInstall: flags['skip-install'],
      slugs,
    })
  }
}
