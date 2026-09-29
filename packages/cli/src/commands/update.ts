import {Args, Command, Flags} from '@oclif/core'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname} from 'node:path'

import {TOKENS_END_MARKER, TOKENS_START_MARKER, VAYU_TOKENS_CSS} from '../templates/tokens.js'
import {projectPath, resolveConfig} from '../utils/config.js'
import {installEntries} from '../utils/installer.js'

export default class Update extends Command {
  static args = {slugs: Args.string({description: 'Slugs to update (default: all installed)', required: false})}
  static description =
    'Update sources and dependencies to the installed CLI release. Use npx vayu-ui-cli@latest update for the latest release.'
  static flags = {
    css: Flags.boolean({default: false, description: 'Refresh design tokens, preserving CSS outside Vayu markers'}),
    cwd: Flags.string({description: 'Target project or workspace directory'}),
    'dry-run': Flags.boolean({default: false, description: 'Preview without writing files'}),
    force: Flags.boolean({char: 'f', default: false, description: 'Overwrite changed files'}),
    'skip-install': Flags.boolean({
      default: false,
      description: 'Record dependencies without running the package manager',
    }),
  }
  static strict = false
  static summary = 'Update installed components and hooks'

  async run(): Promise<void> {
    const {argv, flags} = await this.parse(Update)
    const {config, project, root} = resolveConfig(flags.cwd)
    if (!config) this.error('No vayu-ui.config.json found. Run "vayu-ui init" first.')
    const slugs = argv.length > 0 ? (argv as string[]) : Object.keys(config.installed)
    if (slugs.length > 0)
      installEntries({
        config,
        dryRun: flags['dry-run'],
        log: (message) => this.log(message),
        overwrite: true,
        packageManager: project.packageManager,
        root,
        skipInstall: flags['skip-install'],
        slugs,
      })
    if (flags.css && config.tokensFile) {
      const target = projectPath(root, config.tokensFile)
      const existing = existsSync(target) ? readFileSync(target, 'utf8') : "@import 'tailwindcss';\n"
      const tokens = `${TOKENS_START_MARKER}\n${VAYU_TOKENS_CSS}\n${TOKENS_END_MARKER}`
      const start = existing.indexOf(TOKENS_START_MARKER)
      const end = existing.indexOf(TOKENS_END_MARKER)
      if (start !== -1 && end < start) this.error('Unclosed Vayu token markers; fix the CSS before updating.')
      const updated =
        start === -1
          ? `${existing}\n${tokens}\n`
          : existing.slice(0, start) + tokens + existing.slice(end + TOKENS_END_MARKER.length)
      if (!flags['dry-run']) {
        mkdirSync(dirname(target), {recursive: true})
        writeFileSync(target, updated)
      }

      this.log(`  ${flags['dry-run'] ? 'Would update' : 'Updated'} ${config.tokensFile}`)
    }

    if (slugs.length === 0 && !flags.css) this.log('  No installed items found. Run "vayu-ui add" first.')
  }
}
