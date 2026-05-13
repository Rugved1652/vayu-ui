import {Command, Flags, ux} from '@oclif/core'

import {runInit} from '../utils/init-runner.js'

export default class Init extends Command {
  static description = 'Sets up the Vayu UI folder structure, design tokens CSS, and Tailwind CSS v4.'
  static examples = [
    '<%= config.bin %> init',
    '<%= config.bin %> init --path src/lib/ui',
    '<%= config.bin %> init --merge',
  ]
  static flags = {
    'css-path': Flags.string({
      description: 'Custom path for the main CSS file',
      required: false,
    }),
    force: Flags.boolean({
      default: false,
      description: 'Skip all prompts and use defaults',
    }),
    merge: Flags.boolean({
      default: false,
      description: 'Merge tokens into existing CSS instead of creating a separate file',
    }),
    path: Flags.string({
      description: 'Custom path for the ui/ folder (default: auto-detect)',
      required: false,
    }),
    'skip-tailwind': Flags.boolean({
      default: false,
      description: 'Skip Tailwind CSS installation check',
    }),
  }
  static summary = 'Initialize Vayu UI in your project'

  async run(): Promise<void> {
    const {flags} = await this.parse(Init)

    this.log('')
    this.log(ux.colorize('bold', '  Vayu UI Init'))
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────────'))
    this.log('')

    await runInit({
      cssPath: flags['css-path'],
      force: flags.force,
      log: (m) => this.log(m),
      merge: flags.merge,
      root: process.cwd(),
      skipTailwind: flags['skip-tailwind'],
      uiDir: flags.path,
    })

    this.log('')
    this.log(ux.colorize('green', '  Done! Vayu UI is ready.'))
    this.log('')
    this.log(ux.colorize('dim', '  Next steps:'))
    this.log(
      ux.colorize(
        'dim',
        `    ${ux.colorize('bold', 'npx vayu-ui-cli@latest list')}       Browse available components and hooks`,
      ),
    )
    this.log(
      ux.colorize('dim', `    ${ux.colorize('bold', 'npx vayu-ui-cli@latest add button')}  Add your first component`),
    )
    this.log('')
  }
}
